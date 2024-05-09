import { db } from "@/db";

import { ModelForm } from "./components/model-form";

const ColorPage = async ({ params }: { params: { modelId: string } }) => {
  const model = await db.phoneModel.findUnique({
    where: {
      id: params.modelId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ModelForm initialData={model} />
      </div>
    </div>
  );
};

export default ColorPage;
