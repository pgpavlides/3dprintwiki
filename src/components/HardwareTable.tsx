import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import type { Hardware } from '../data/hardware/hardwareData'
import { hardwareCategories, getAllSubcategories } from '../data/hardware/hardwareCategories'

interface HardwareTableProps {
  hardware: Hardware[];
  selectedCategory?: string;
  selectedSubcategory?: string;
  searchTerm?: string;
  onCategoryChange?: (category: string) => void;
  onSubcategoryChange?: (subcategory: string) => void;
  onSearchChange?: (search: string) => void;
}

export function HardwareTable({ 
  hardware,
  selectedCategory,
  selectedSubcategory,
  searchTerm,
  onCategoryChange,
  onSubcategoryChange,
  onSearchChange 
}: HardwareTableProps) {

  // Get all subcategories
  const allSubcategories = getAllSubcategories();

  // Memoize columns to prevent recreation on each render
  const columns = useMemo<ColumnDef<Hardware>[]>(() => [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className="w-16 h-16 flex items-center justify-center">
          {row.original.image ? (
            <img
              src={row.original.image}
              alt={row.original.name}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-gray-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Hardware Name",
      cell: ({ row }) => (
        <div className="font-semibold min-w-[200px] text-gray-900 dark:text-white">
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = hardwareCategories.find(cat => cat.id === row.original.category);
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            {category?.name || row.original.category}
          </span>
        );
      },
    },
    {
      accessorKey: "subcategory",
      header: "Subcategory",
      cell: ({ row }) => {
        const subcategory = allSubcategories.find(sub => sub.id === row.original.subcategory);
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            {subcategory?.name || row.original.subcategory}
          </span>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-sm text-gray-600 dark:text-gray-300 min-w-[300px]">
          {row.original.description}
        </div>
      ),
    },
    {
      accessorKey: "specifications",
      header: "Specifications",
      cell: ({ row }) => (
        <div className="min-w-[250px]">
          {row.original.specifications && (
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
              {row.original.specifications.slice(0, 3).map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
              {row.original.specifications.length > 3 && (
                <li className="text-gray-400 dark:text-gray-500">
                  +{row.original.specifications.length - 3} more...
                </li>
              )}
            </ul>
          )}
        </div>
      ),
    },
    {
      accessorKey: "uses",
      header: "Common Uses",
      cell: ({ row }) => (
        <div className="min-w-[250px]">
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
            {row.original.uses.slice(0, 3).map((use, i) => (
              <li key={i}>{use}</li>
            ))}
            {row.original.uses.length > 3 && (
              <li className="text-gray-400 dark:text-gray-500">
                +{row.original.uses.length - 3} more...
              </li>
            )}
          </ul>
        </div>
      ),
    },
    {
      accessorKey: "recommended",
      header: "Status",
      cell: ({ row }) => (
        <div className="min-w-[100px]">
          {row.original.recommended && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Essential
            </span>
          )}
        </div>
      ),
    },
  ], [allSubcategories]);

  // Already filtered data comes from parent

  const table = useReactTable({
    data: hardware,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span>
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "asc" ? (
                            "↑"
                          ) : (
                            "↓"
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-normal text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {hardware.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No hardware items found matching your criteria.
        </div>
      )}
    </div>
  );
}
