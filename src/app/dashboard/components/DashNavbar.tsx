"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const DashNavbar = () => {
  const pathname = usePathname();
  const routes = [
    {
      href: `/dashboard`,
      label: "General",
      active: pathname === `/dashboard`,
    },
    {
      href: `/dashboard/models`,
      label: "Tamaños",
      active: pathname === `/dashboard/models`,
    },
    {
      href: `/dashboard/colors`,
      label: "Colores",
      active: pathname === `/dashboard/colors`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6")}>
      <div className={`w-full md:block md:w-auto`}>
        <div className="flex space-x-3  md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default DashNavbar;
