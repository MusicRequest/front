import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { EditIcon } from "@/components/ui/icon-display";
import { Visitor } from "@/lib/types";

export default function columnsVisitor({
  editVisitor,
}: {
  editVisitor: (el: Visitor) => void;
}): ColumnDef<any>[] {
  return [
    {
      id: "Nom",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nom" />
      ),
    },
    {
      id: "Vote",
      accessorKey: "countVoting",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Compteur vote" />
      ),
    },
    {
      id: "Droit",
      accessorKey: "isNotAllowed",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Droit" />
      ),
      cell: ({ row }) => {
        const visitor = row.original;

        if (visitor.isNotAllowed) {
          return <Badge variant={"destructive"}>Suspendu</Badge>;
        }
        return <Badge variant={"outline"}>ok</Badge>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className={"flex justify-end"}>
          <div
            className="mr-3 flex cursor-pointer justify-end hover:text-gray-500"
            onClick={() => {
              editVisitor(row.original);
            }}
          >
            <EditIcon />
          </div>
        </div>
      ),
    },
  ];
}
