import React from "react";

export interface Column<T> {
  header: string;
  key: keyof T | string;
  render?: (item?: T, index?: number) => React.ReactNode;
}

interface TableProps<T> {
  data?: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
}

export default function Table<T extends { id?: number | string }>({
  data,
  columns,
  onRowClick,
  isLoading,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-900"
              >
                {col?.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {/* SKELETON */}
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <tr
                key={`skeleton-${i}`}
                className="animate-pulse"
                data-testid="skeleton"
              >
                {columns.map((_, j) => (
                  <td key={`cell-${j}`} className="px-4 py-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                ))}
              </tr>
            ))
          ) : Number(data?.length) > 0 ? (
            data?.map((item, index) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={`
                  transition-colors duration-200
                  ${onRowClick ? "cursor-pointer hover:bg-blue-50/50" : "hover:bg-gray-50/80"}
                `}
              >
                {columns?.map((col, idx) => (
                  <td
                    key={idx}
                    className="whitespace-nowrap px-4 py-3 text-gray-700"
                  >
                    {col?.render
                      ? col?.render(item, index)
                      : (item[col?.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns?.length}
                className="px-4 py-12 text-center text-gray-500 italic"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
