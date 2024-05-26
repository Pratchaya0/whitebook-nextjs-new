"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@prisma/client";
import {
  FaAngleDown,
  FaBars,
  FaCreativeCommonsNc,
  FaRedoAlt,
  FaRegCheckCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getListOrders } from "@/data/order";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { updateOrderIsPaid } from "@/actions/order";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Payment Id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount (THB)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("amount")}</div>
    ),
  },
  {
    accessorKey: "paymentImageUrl",
    header: "Payment Image Url",
    cell: ({ row }) => (
      <div className="aspect-ratio">
        <Image
          src={row.getValue("paymentImageUrl")}
          width={150}
          height={350}
          alt="Banner Image"
          className="object-contain"
          priority
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px" // Add this prop with appropriate values
        />
      </div>
    ),
  },
  {
    accessorKey: "isPaid",
    header: "Is Paid",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("isPaid") === true ? (
          <Badge variant="green">Paid</Badge>
        ) : (
          <Badge variant="outline">Pending</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "userId",
    header: "User Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("userId")}</div>
    ),
  },
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  // },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));

  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      const router = useRouter();

      return (
        <div className="flex items-right justify-end gap-x-2">
          <TooltipProvider>
            {data.isPaid ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    className="h-8 p-x-2"
                    onClick={() => {
                      toast.promise(
                        new Promise((resolve) => {
                          resolve(
                            updateOrderIsPaid(
                              data.userId as string,
                              data.id,
                              false
                            )
                          );
                        }),
                        {
                          loading: "Loading...",
                          success: (data: any) => {
                            router.refresh();
                            return `${data.res as string}`;
                          },
                          error: "Oops! what's wrong?",
                        }
                      );
                    }}
                  >
                    <div className="flex items-center justify-center text-rose-500 gap-x-2">
                      <FaCreativeCommonsNc className="h-3 w-3" />
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Payment not receipt</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    className="h-8 p-x-2"
                    onClick={() => {
                      toast.promise(
                        new Promise((resolve) => {
                          resolve(
                            updateOrderIsPaid(
                              data.userId as string,
                              data.id,
                              true
                            )
                          );
                        }),
                        {
                          loading: "Loading...",
                          success: (data: any) => {
                            return `${data.res as string}`;
                          },
                          error: "Oops! what's wrong?",
                        }
                      );
                    }}
                  >
                    <div className="flex items-center justify-center text-emerald-500 gap-x-2">
                      <FaRegCheckCircle className="h-3 w-3" />
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Payment receipt</p>
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <FaBars className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(data.id)}
              >
                Copy order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/services/order-detail/${data.id}`)}
              >
                View order detail
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const OrdersTable = () => {
  const [data, setData] = useState<Order[]>([]);
  const order = async () => {
    const data = await getListOrders();
    setData(data as Order[]);
  };

  useEffect(() => {
    order();
  }, []);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onStateChange(updater) {
      order();
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter payment id..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex justify-center items-center gap-x-4">
          <Button
            variant="secondary"
            className="ml-auto"
            onClick={() => order()}
          >
            <FaRedoAlt />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
                <FaAngleDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
