import React from "react";
import Navbar from "./components/Navbar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full mx-auto w-full px-2.5 md:px-20">
      <div className="flex justify-center items-center">
        {" "}
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default layout;
