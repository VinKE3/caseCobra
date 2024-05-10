import { format } from "date-fns";

import { db } from "@/db";

import { FinishColumn } from "./components/columns";
import { FinishClient } from "./components/client";
import { formatPrice } from "@/lib/utils";

const FinishesPage = async () => {
  const finishes = await db.caseFinish.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedFinishes: FinishColumn[] = finishes.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatPrice(item.basePrice.toNumber()),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FinishClient data={formattedFinishes} />
      </div>
    </div>
  );
};

export default FinishesPage;
