import React from "react";
import DashNavbar from "../components/DashNavbar";

const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <DashNavbar />
      </div>
    </div>
  );
};

export default Navbar;
