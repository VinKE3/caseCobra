import { format } from "date-fns";

import { db } from "@/db";

import { ColorColumn } from "./components/columns";
import { ColorClient } from "./components/client";

const ColorsPage = async () => {
  const colors = await db.caseColor.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "dd-MM-yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
