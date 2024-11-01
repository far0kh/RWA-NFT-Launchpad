"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom_ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<GiftType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/gifts/${row.original._id}`}
        className="hover:text-red-600"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => row.original.collections.map((collection) => collection.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
  },
  {
    accessorKey: "expense",
    header: "Expense ($)",
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="gift" id={row.original._id} />,
  },
];
