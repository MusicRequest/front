"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/ui/data-table/data-table-view-options";
// import { DataTableFacetedFilter } from "@/components/ui/data-table/data-table-faceted-filter";
import { SearchIcon } from "lucide-react";
import React, { ReactNode, useState } from "react";

// import { priorities, statuses } from "../data/data";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  hideColumnsVisibilityButton?: boolean;
  hideSearchInput?: boolean;
  actionButtons?: ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  hideColumnsVisibilityButton = false,
  hideSearchInput = false,
  actionButtons = undefined,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [search, setSearch] = useState("");

  if (hideSearchInput && hideColumnsVisibilityButton && !actionButtons) {
    return;
  }
  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {!hideSearchInput && (
          // <div className="relative mt-2 rounded-md shadow-sm">
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon
                className="z-10 size-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <Input
              placeholder="Recherche ..."
              value={search}
              // value={(table.getColumn("Nom")?.getFilterValue() as string) ?? ""}
              onChange={
                (event) => {
                  table.setGlobalFilter(event.target.value);
                  setSearch(event.target.value);
                }
                // table.getColumn("Nom")?.setFilterValue(event.target.value)
              }
              className="w-[150px] pl-10 lg:w-[250px] "
              // className="h-8 w-[150px] lg:w-[250px] pl-10 "
            />
          </div>
        )}

        {/*{table.getColumn("location") && (*/}
        {/*  <DataTableFacetedFilter*/}
        {/*    column={table.getColumn("location")}*/}
        {/*    title="Pièce"*/}
        {/*    options={locations}*/}
        {/*  />*/}
        {/*)}*/}
        {/*{table.getColumn("priority") && (*/}
        {/*  <DataTableFacetedFilter*/}
        {/*    column={table.getColumn("priority")}*/}
        {/*    title="Priority"*/}
        {/*    options={priorities}*/}
        {/*  />*/}
        {/*)}*/}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="mt-2 h-8 px-2 lg:px-3"
          >
            Réinitialiser
            <Cross2Icon className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <div className={"flex items-center space-x-2"}>
        {!hideColumnsVisibilityButton && <DataTableViewOptions table={table} />}
        {actionButtons !== undefined && actionButtons}
      </div>
    </div>
  );
}
