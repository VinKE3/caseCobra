"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { CaseFinish } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modal/alert-modal";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Nombre es requerido",
  }),
  basePrice: z.coerce.number().min(1, { message: "Requerido" }),
});

type FinishFormValues = z.infer<typeof formSchema>;

interface FinishFormProps {
  initialData: CaseFinish | null;
}

export const FinishForm: React.FC<FinishFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Editar Terminación" : "Crear Terminación";
  const description = initialData
    ? "Editar una Terminación Existente."
    : "Agregar Nueva Terminación";
  const toastMessage = initialData
    ? "Terminación Actualizada."
    : "Terminación Creada.";
  const action = initialData ? "Guardar Cambios" : "Crear";

  const form = useForm<FinishFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          basePrice: parseFloat(String(initialData?.basePrice)),
        }
      : {
          name: "",
          basePrice: 0,
        },
  });

  const onSubmit = async (data: FinishFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/finishes/${params.finishId}`, data);
      } else {
        await axios.post(`/api/finishes`, data);
      }
      router.refresh();
      router.push(`/dashboard/finishes`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Algo Salío mal.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/finishes/${params.finishId}`);
      router.refresh();
      router.push(`/dashboard/finishes`);
      toast.success("Terminación Eliminado.");
    } catch (error: any) {
      toast.error(
        "Asegúrese de eliminar todos los productos que utilizan esta Terminación."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nombre de la Terminación"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="basePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
