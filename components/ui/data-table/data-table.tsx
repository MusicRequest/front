"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/ui/data-table/data-table-toolbar";
import { ReactNode, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectedItems?: TData[];
  setSelectedItems?: any;
  loading?: boolean;
  hideColumnsVisibilityButton?: boolean;
  hideSearchInput?: boolean;
  initialSorting?: SortingState;
  actionButtons?: ReactNode;
  hidePagination?: boolean;
  initialColumnVisibility?: VisibilityState;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setSelectedItems = void 0,
  loading = false,
  hideColumnsVisibilityButton = false,
  hideSearchInput = false,
  initialSorting,
  actionButtons = undefined,
  hidePagination = false,
  initialColumnVisibility = {},
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialColumnVisibility);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>(
    initialSorting ?? [],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection: rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    const selectedItemsTemp: TData[] = [];
    for (const [index, value] of Object.entries(rowSelection)) {
      if (value) {
        selectedItemsTemp.push(data[parseInt(index)]);
      }
    }
    if (setSelectedItems) {
      setSelectedItems(selectedItemsTemp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

  useEffect(() => {
    if (hidePagination) {
      if (data.length > 0) {
        table.setPageSize(data.length);
      } else {
        table.setPageSize(5);
      }
    } else {
      table.setPageSize(30);
    }
    /* eslint-disable-next-line */
  }, [data, hidePagination]);

  return (
    <div className={cn("space-y-4")}>
      <DataTableToolbar
        table={table}
        hideColumnsVisibilityButton={hideColumnsVisibilityButton}
        hideSearchInput={hideSearchInput}
        actionButtons={!actionButtons ? undefined : actionButtons}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader className={"bg-gray-50 dark:bg-background"}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              SkeletonRows(columns.length, table.getState().pagination.pageSize)
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={"border-b bg-white dark:bg-background"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!hidePagination && <DataTablePagination table={table} />}
    </div>
  );
}

function SkeletonRows(columns: number, number: number) {
  let rows = [];
  for (let i = 0; i < number; i++) {
    rows.push(
      <TableRow key={`skeleton-${i}`}>
        <TableCell colSpan={columns} className={"py-3"}>
          <Skeleton className={"h-5 w-full"} />
        </TableCell>
      </TableRow>,
    );
  }
  return rows;
}
