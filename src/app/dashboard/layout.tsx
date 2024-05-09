import React from "react";
import Navbar from "./components/Navbar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MaxWidthWrapper className="">
      <Navbar />
      {children}
    </MaxWidthWrapper>
  );
};

export default layout;
