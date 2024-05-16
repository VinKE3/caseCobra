"use client";

import { useQuery } from "@tanstack/react-query";
import { getPaymentStatus } from "./actions";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import {
  Configuration,
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";
import PhoneOrder from "@/components/PhoneOrder";

interface DesignPreviewProps {
  modelsDb: PhoneModel[];
  colorsDb: CaseColor[];
  finishesDb: CaseFinish[];
  materialsDb: CaseMaterial[];
}

const ThankYou: React.FC<DesignPreviewProps> = ({
  modelsDb,
  colorsDb,
  finishesDb,
  materialsDb,
}) => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  });

  if (data === undefined) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Cargando Ordén...</h3>
          <p>No tomara mucho tiempo.</p>
        </div>
      </div>
    );
  }

  if (data === false) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Comprobación del pago...</h3>
          <p>Esto puede llevar un momento.</p>
        </div>
      </div>
    );
  }

  const { configuration, billingAddress, shippingAddress, amount } = data;
  const { color } = configuration;

  const tw =
    colorsDb.find((supportedColor) => {
      const normalizedColorName = supportedColor.name.toLowerCase().trim();
      const normalizedColor = color?.toLowerCase().trim();
      const areColorsEqual = normalizedColorName === normalizedColor;
      return areColorsEqual;
    })?.value ?? "defaultColorValue";

  return (
    <div className="bg-white dark:bg-black">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">Gracias!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Su Case está en camino.
          </h1>
          <p className="mt-2 text-base text-zinc-500 dark:text-zinc-100">
            Hemos recibido su pedido y lo estamos procesando.
          </p>

          <div className="mt-12 text-sm font-medium">
            <p className="text-zinc-900 dark:text-zinc-100">Número de orden</p>
            <p className="mt-2 text-zinc-500 dark:text-zinc-300">{orderId}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Hiciste una gran elección!
            </h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-200">
              En CaseCobra creemos que una funda de teléfono no sólo tiene que
              verse bien sino también durar muchos años. Ofrecemos garantía de
              impresión de 1 año. Si tu funda no es de la mejor calidad, te la
              cambiamos gratis.
            </p>
          </div>
        </div>

        <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
          <PhoneOrder
            croppedImageUrl={configuration.croppedImageUrl!}
            color={tw}
          />
        </div>

        <div>
          <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-400">
                Dirección de envío
              </p>
              <div className="mt-2 text-zinc-700 dark:text-zinc-300">
                <address className="not-italic">
                  <span className="block">{shippingAddress?.name}</span>
                  <span className="block">{shippingAddress?.street}</span>
                  <span className="block">
                    {shippingAddress?.postalCode} {shippingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-400">
                Dirección de facturación
              </p>
              <div className="mt-2 text-zinc-700 dark:text-zinc-300">
                <address className="not-italic">
                  <span className="block">{billingAddress?.name}</span>
                  <span className="block">{billingAddress?.street}</span>
                  <span className="block">
                    {billingAddress?.postalCode} {billingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
            <div>
              <p className="font-medium text-zinc-900 dark:text-gray-400">
                Estado del pago
              </p>
              <p className="mt-2 text-zinc-700 dark:text-zinc-300">Pagado</p>
            </div>

            <div>
              <p className="font-medium text-zinc-900 dark:text-gray-400">
                Método de envío
              </p>
              <p className="mt-2 text-zinc-700 dark:text-zinc-300">
                DHL, tarda hasta 3 días hábiles
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900 dark:text-zinc-300">
              Subtotal
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {formatPrice(amount)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900 dark:text-zinc-300">
              Envío Gratis
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">{formatPrice(0)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900 dark:text-zinc-300">
              Total
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {formatPrice(amount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
