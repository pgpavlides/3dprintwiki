import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import type { Hardware } from '../routes/hardware'

interface HardwareTableProps {
  hardware: Hardware[];
}

export function HardwareTable({ hardware }: HardwareTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRecommended, setSelectedRecommended] = useState<boolean | null>(null);

  const columns: ColumnDef<Hardware>[] = [
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
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 capitalize">
          {row.original.category.replace('-', ' ')}
        </span>
      ),
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
  ];

  const filteredData = hardware.filter((item) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
    const matchesRecommended = selectedRecommended === null || item.recommended === selectedRecommended;
    return matchesCategory && matchesRecommended;
  });

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="w-full md:w-96">
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search hardware..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-wrap gap-2">
            {['fasteners', 'threaded-inserts', 'bearings', 'springs', 'electronics', 'accessories', 'seals'].map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategories(prev =>
                    prev.includes(category)
                      ? prev.filter(c => c !== category)
                      : [...prev, category]
                  );
                }}
                className={`px-3 py-1 rounded-full text-sm capitalize ${
                  selectedCategories.includes(category)
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {category.replace('-', ' ')}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setSelectedRecommended(selectedRecommended === true ? null : true)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedRecommended === true
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Essential Only
          </button>
        </div>
      </div>

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
      
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No hardware items found matching your criteria.
        </div>
      )}
    </div>
  );
}
