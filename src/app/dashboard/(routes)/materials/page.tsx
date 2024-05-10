import { format } from "date-fns";

import { db } from "@/db";

import { MaterialColumn } from "./components/columns";
import { MaterialClient } from "./components/client";
import { formatPrice } from "@/lib/utils";

const MaterialsPage = async () => {
  const materials = await db.caseMaterial.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedMaterials: MaterialColumn[] = materials.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatPrice(item.basePrice.toNumber()),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MaterialClient data={formattedMaterials} />
      </div>
    </div>
  );
};

export default MaterialsPage;
