"use server";
import { db } from "@/db";
import { formatPrice } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  Order,
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";
import { stripe } from "@/lib/stripe";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });

  if (!configuration) {
    throw new Error("No such configuration found");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("You need to be logged in");
  }

  const models = await db.phoneModel.findMany();
  const fineshes = await db.caseFinish.findMany();
  const materials = await db.caseMaterial.findMany();

  const basePriceModel =
    models.find((model) => {
      const normalizedModelName = model.name.toLowerCase().trim(); // Normalize for comparison
      const normalizedConfigModel = configuration.model?.toLowerCase().trim();
      return normalizedModelName === normalizedConfigModel;
    })?.basePrice ?? 0;

  const PriceMaterial =
    materials.find((material) => {
      const normalizedMaterialName = material.name.toLowerCase().trim(); // Normalize for comparison
      const normalizedConfigMaterial = configuration.material
        ?.toLowerCase()
        .trim();
      return normalizedMaterialName === normalizedConfigMaterial;
    })?.basePrice ?? 0;

  const PriceFinish =
    fineshes.find((finish) => {
      const normalizeFinishName = finish.name.toLowerCase().trim();
      const normalizeConfigFinish = configuration.finish?.toLowerCase().trim();
      return normalizeFinishName === normalizeConfigFinish;
    })?.basePrice ?? 0;

  let price =
    Number(basePriceModel) + Number(PriceMaterial) + Number(PriceFinish);
  let order: Order | undefined = undefined;
  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });

  console.log(user.id, configuration.id, "ididididi");
  console.log(price, "precios");

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        amount: price,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  }
  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price * 100,
    },
  });
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["DE", "US"] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  return { url: stripeSession.url };
};
