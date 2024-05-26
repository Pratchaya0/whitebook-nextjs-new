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
import { Book } from "@prisma/client";
import {
  FaAngleDown,
  FaBars,
  FaCreativeCommonsNc,
  FaRedoAlt,
  FaRegCheckCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getListBooks } from "@/data/book";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteProduct, updateProductIsOnSale } from "@/actions/product";
import UpdateDialogButton from "@/components/admin/update-dialog-button";
import UpdateProductForm from "@/components/admin/products/update-product-form";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Book>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: "coverImageUrl",
    header: "Cover Image",
    cell: ({ row }) => (
      <div>
        <img
          src={row.getValue("coverImageUrl")}
          alt="Uploaded"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "writer",
    header: "Writer",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("writer")}</div>
    ),
  },
  {
    accessorKey: "publisher",
    header: "Publisher",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("publisher")}</div>
    ),
  },
  {
    accessorKey: "isOnSale",
    header: "Is On Sale",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("isOnSale") === true ? (
          <Badge variant="green">On sale</Badge>
        ) : (
          <Badge variant="outline">Off sale</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "bookUrl",
    header: "Book Url",
    cell: ({ row }) => <div className="">{row.getValue("bookUrl")}</div>,
  },
  // {
  //   accessorKey: "categoryId",
  //   header: "Category",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("categoryId")}</div>
  //   ),
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      const router = useRouter();

      return (
        <div className="flex items-right justify-end gap-x-2">
          <UpdateDialogButton title="Update">
            <UpdateProductForm book={data} />
          </UpdateDialogButton>
          <TooltipProvider>
            {data.isOnSale ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    className="h-8 p-x-2"
                    onClick={() => {
                      toast.promise(
                        new Promise((resolve) => {
                          resolve(updateProductIsOnSale(data.id, false));
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
                    <div className="flex items-center justify-center text-rose-500 gap-x-2">
                      <FaCreativeCommonsNc className="h-3 w-3" />
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Make it off sale</p>
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
                          resolve(updateProductIsOnSale(data.id, true));
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
                  <p>Make it on sale</p>
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
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  router.replace(
                    `http://localhost:3000/services/book-detail/${data.id}`
                  )
                }
              >
                View product detail
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.replace(
                    `http://localhost:3000/services/read/${data.id}`
                  )
                }
              >
                View Read
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  toast.promise(
                    new Promise((resolve) => {
                      resolve(deleteProduct(data.id));
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
                <div className="w-full flex items-center justify-between gap-x-8 text-red-500 font-bold">
                  <div>Delete</div>
                  <FaTrashAlt />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const ProductsTable = () => {
  const [data, setData] = useState<Book[]>([]);
  const book = async () => {
    const data = await getListBooks(true);
    setData(data as Book[]);
  };

  useEffect(() => {
    book();
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
      book();
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
          placeholder="Filter emails..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex justify-center items-center gap-x-4">
          {/* <Button
            variant="secondary"
            className="ml-auto"
            onClick={() => book()}
          >
            <FaRedoAlt />
          </Button> */}
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

export default ProductsTable;
