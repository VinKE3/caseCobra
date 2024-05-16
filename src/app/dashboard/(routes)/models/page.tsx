import { format } from "date-fns";

import { db } from "@/db";

import { ModelColumn } from "./components/columns";
import { ModelClient } from "./components/client";
import { formatPrice } from "@/lib/utils";

const ModelsPage = async () => {
  const models = await db.phoneModel.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedModels: ModelColumn[] = models.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatPrice(item.basePrice.toNumber()),
    createdAt: format(item.createdAt, "dd-MM-yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ModelClient data={formattedModels} />
      </div>
    </div>
  );
};

export default ModelsPage;
