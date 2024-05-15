"use client";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-dom-confetti";
import {
  Configuration,
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import PhonePreview from "@/components/PhonePreview";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModal from "@/components/LoginModal";
interface DesignPreviewProps {
  configuration: Configuration;
  modelsDb: PhoneModel[];
  colorsDb: CaseColor[];
  finishesDb: CaseFinish[];
  materialsDb: CaseMaterial[];
}

const DesignPreview: React.FC<DesignPreviewProps> = ({
  configuration,
  modelsDb,
  colorsDb,
  finishesDb,
  materialsDb,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);
  const { id } = configuration;
  const { user } = useKindeBrowserClient();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => setShowConfetti(true));

  const { color, model, finish, material } = configuration;

  const tw =
    colorsDb.find((supportedColor) => {
      const normalizedColorName = supportedColor.name.toLowerCase().trim();
      const normalizedColor = color?.toLowerCase().trim();
      const areColorsEqual = normalizedColorName === normalizedColor;
      return areColorsEqual;
    })?.value ?? "defaultColorValue";

  const basePriceModel =
    modelsDb.find((model) => {
      const normalizedModelName = model.name.toLowerCase().trim(); // Normalize for comparison
      const normalizedConfigModel = configuration.model?.toLowerCase().trim();
      return normalizedModelName === normalizedConfigModel;
    })?.basePrice ?? 0;

  const imageModel =
    modelsDb.find((model) => {
      const normalizedModelName = model.name.toLowerCase().trim(); // Normalize for comparison
      const normalizedConfigModel = configuration.model?.toLowerCase().trim();
      return normalizedModelName === normalizedConfigModel;
    })?.imageId ?? "sinImage";

  const PriceMaterial =
    materialsDb.find((material) => {
      const normalizedMaterialName = material.name.toLowerCase().trim(); // Normalize for comparison
      const normalizedConfigMaterial = configuration.material
        ?.toLowerCase()
        .trim();
      return normalizedMaterialName === normalizedConfigMaterial;
    })?.basePrice ?? 0;

  const PriceFinish =
    finishesDb.find((finish) => {
      const normalizeFinishName = finish.name.toLowerCase().trim();
      const normalizeConfigFinish = configuration.finish?.toLowerCase().trim();
      return normalizeFinishName === normalizeConfigFinish;
    })?.basePrice ?? 0;

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("Unable to retrieve payment URL.");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCheckout = () => {
    if (user) {
      // create payment session
      createPaymentSession({ configId: id });
    } else {
      // need to log in
      localStorage.setItem("configurationId", id);
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className="mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
          <PhonePreview
            style={{ backgroundColor: tw }}
            className="max-w-[150px] md:max-w-full"
            imgSrc={configuration.croppedImageUrl!}
            imgModel={imageModel}
          />
        </div>
        <div className="mt-6 sm:col-span-9 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Tu {model} Case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <Check className="h-4 w-4 text-green-500" />
            En stock y listo para enviar
          </div>
        </div>
        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950 dark:text-zinc-50">
                Highlights
              </p>
              <ol className="mt-3 text-zinc-700 dark:text-zinc-200 list-disc list-inside">
                <li>Compatible con carga inalámbrica</li>
                <li>Amortiguación TPU</li>
                <li>Packaging fabricado con materiales reciclados</li>
                <li>Garantía de impresión de 1 año Materiales</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950 dark:text-zinc-50">
                Materiales
              </p>
              <ol className="mt-3 text-zinc-700 dark:text-zinc-200 list-disc list-inside">
                <li>Material duradero de alta calidad</li>
                <li>
                  Revestimiento resistente a arañazos y huellas dactilares
                </li>
              </ol>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-gray-50 dark:bg-black dark:border dark:border-white p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600 dark:text-gray-50">Precio Base</p>
                  <p className="font-medium text-gray-900 dark:text-gray-200">
                    {formatPrice(Number(basePriceModel))}
                  </p>
                </div>

                {material ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600 dark:text-gray-50">
                      {configuration.material}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-gray-200">
                      {formatPrice(Number(PriceMaterial))}
                    </p>
                  </div>
                ) : null}

                {finish ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600 dark:text-gray-50">
                      {configuration.finish}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-gray-200">
                      {formatPrice(Number(PriceFinish))}
                    </p>
                  </div>
                ) : null}

                <div className="my-2 h-px bg-gray-200" />

                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    Orden total
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {formatPrice(
                      Number(basePriceModel) +
                        Number(PriceMaterial) +
                        Number(PriceFinish)
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end pb-12">
              <Button
                onClick={() => handleCheckout()}
                className="px-4 sm:px-6 lg:px-8"
                isLoading={false}
                loadingText="Procesando"
              >
                Pagar <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
