"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ModelColumn = {
  id: string;
  name: string;
  price: string;
  createdAt: string;
};

export const columns: ColumnDef<ModelColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "price",
    header: "Precio Base",
  },
  {
    accessorKey: "createdAt",
    header: "Dia de Creacion",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
