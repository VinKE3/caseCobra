"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, MaterialColumn } from "./columns";

interface MaterialClientProps {
  data: MaterialColumn[];
}

export const MaterialClient: React.FC<MaterialClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Materiales (${data.length})`}
          description="Gestioná los materiales de los cases."
        />
        <Button onClick={() => router.push(`/dashboard/materials/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
