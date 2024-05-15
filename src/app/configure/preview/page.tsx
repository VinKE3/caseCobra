import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  const models = await db.phoneModel.findMany();
  const colors = await db.caseColor.findMany();
  const fineshes = await db.caseFinish.findMany();
  const materials = await db.caseMaterial.findMany();

  return (
    <DesignPreview
      configuration={configuration}
      modelsDb={models}
      colorsDb={colors}
      finishesDb={fineshes}
      materialsDb={materials}
    />
  );
};

export default Page;
