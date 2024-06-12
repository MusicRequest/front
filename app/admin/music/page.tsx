"use client";
import React from "react";
import { VerticalSpacer } from "@/components/ui/vertical-spacer";
import { DataTable } from "@/components/ui/data-table/data-table";
import { columnsMusic } from "@/app/admin/music/columns-music";
import PageHeading from "@/components/ui/page-heading";

const page = () => {
  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];

  return (
    <VerticalSpacer>
      <PageHeading title={"Musique"} />
      <DataTable columns={columnsMusic} data={data} />
    </VerticalSpacer>
  );
};

export default page;
