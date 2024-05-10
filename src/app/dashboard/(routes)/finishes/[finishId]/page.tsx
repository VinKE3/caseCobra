import { db } from "@/db";

import { FinishForm } from "./components/finish-form";

const FinishPage = async ({ params }: { params: { finishId: string } }) => {
  const finish = await db.caseFinish.findUnique({
    where: {
      id: params.finishId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FinishForm initialData={finish} />
      </div>
    </div>
  );
};

export default FinishPage;
