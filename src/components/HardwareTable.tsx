import { useState, useMemo } from "react";
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
}

export function HardwareTable({ hardware }: HardwareTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedRecommended, setSelectedRecommended] = useState<boolean | null>(null);

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

  // Memoize filtered data to prevent unnecessary recalculations
  const filteredData = useMemo(() => {
    return hardware.filter((item) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      const matchesSubcategory = selectedSubcategories.length === 0 || selectedSubcategories.includes(item.subcategory);
      const matchesRecommended = selectedRecommended === null || item.recommended === selectedRecommended;
      
      if (!matchesCategory || !matchesSubcategory || !matchesRecommended) return false;
      
      // Only check search if other filters pass
      if (globalFilter === "") return true;
      
      const searchLower = globalFilter.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower) ||
        item.subcategory.toLowerCase().includes(searchLower) ||
        item.uses.some(use => use.toLowerCase().includes(searchLower)) ||
        (item.specifications?.some(spec => spec.toLowerCase().includes(searchLower)) || false)
      );
    });
  }, [hardware, selectedCategories, selectedSubcategories, selectedRecommended, globalFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Get subcategories for selected categories
  const availableSubcategories = selectedCategories.length > 0
    ? allSubcategories.filter(sub => selectedCategories.includes(sub.parentCategory))
    : allSubcategories;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="w-full">
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search hardware..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Category filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {hardwareCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategories(prev =>
                      prev.includes(category.id)
                        ? prev.filter(c => c !== category.id)
                        : [...prev, category.id]
                    );
                    // Clear subcategories when category selection changes
                    if (!selectedCategories.includes(category.id)) {
                      setSelectedSubcategories(prev => 
                        prev.filter(sc => !category.subcategories.find(s => s.id === sc))
                      );
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategories.includes(category.id)
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory filter - only show if categories are selected */}
          {availableSubcategories.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subcategories</h3>
              <div className="flex flex-wrap gap-2">
                {availableSubcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => {
                      setSelectedSubcategories(prev =>
                        prev.includes(subcategory.id)
                          ? prev.filter(s => s !== subcategory.id)
                          : [...prev, subcategory.id]
                      );
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedSubcategories.includes(subcategory.id)
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Essential filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter</h3>
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
