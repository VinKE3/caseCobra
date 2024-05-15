import { Suspense } from "react";
import ThankYou from "./ThankYou";
import { db } from "@/db";

const Page = async () => {
  const models = await db.phoneModel.findMany();
  const colors = await db.caseColor.findMany();
  const fineshes = await db.caseFinish.findMany();
  const materials = await db.caseMaterial.findMany();
  return (
    <Suspense>
      <ThankYou
        modelsDb={models}
        colorsDb={colors}
        finishesDb={fineshes}
        materialsDb={materials}
      />
    </Suspense>
  );
};

export default Page;
