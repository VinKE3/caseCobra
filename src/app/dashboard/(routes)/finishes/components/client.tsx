"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, FinishColumn } from "./columns";

interface FinishClientProps {
  data: FinishColumn[];
}

export const FinishClient: React.FC<FinishClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Terminaciones (${data.length})`}
          description="Gestioná las Terminaciones de los cases."
        />
        <Button onClick={() => router.push(`/dashboard/finishes/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
