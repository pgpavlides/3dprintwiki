import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { materialData } from "../data/materials";
import { bambuMaterialData } from "../data/bambuMaterials";
import { esunMaterialData } from "../data/esunMaterials";
import { MaterialsGrid } from "../components/MaterialsGrid";
import { MaterialsTable } from "../components/MaterialsTable";
import { BambuMaterialsTable } from "../components/BambuMaterialsTable";
import { BambuMaterialsGrid } from "../components/BambuMaterialsGrid";
import { EsunMaterialsTable } from "../components/EsunMaterialsTable";
import { EsunMaterialsGrid } from "../components/EsunMaterialsGrid";
import { SEO } from "../components/SEO/SEO";

export const Route = createFileRoute("/materials")({
  component: MaterialsPage,
});

function MaterialsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [tableType, setTableType] = useState<"generic" | "bambu" | "esun">("bambu");
  const [gridType, setGridType] = useState<"generic" | "bambu" | "esun">("generic");

  return (
    <>
      <SEO 
        title="3D Printing Materials Guide | 3D Print Wiki"
        description="Complete guide to 3D printing materials including PLA, ABS, PETG, TPU, and more. Compare properties, print settings, and choose the right material for your project."
        keywords="3D printing materials, PLA, ABS, PETG, TPU, resin, filament properties, print settings, material comparison, Bambu Lab materials"
        url="https://3dprintwiki.com/materials"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div
        className={`${viewMode === "table" ? "w-full" : "max-w-full mx-2"}`}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            3D Printing Materials Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive guide to 3D printing materials: PLA, ABS, PETG, TPU,
            and more. Compare properties, print settings, and choose the right
            material for your project.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg font-medium ${
                viewMode === "grid"
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => {
                setViewMode("table");
                setTableType("bambu");
              }}
              className={`px-4 py-2 rounded-lg font-medium ${
                viewMode === "table"
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
              }`}
            >
              Table View
            </button>
          </div>

          {viewMode === "table" ? (
            <div className="flex gap-2">
              <button
                onClick={() => setTableType("generic")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  tableType === "generic"
                    ? "bg-green-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                }`}
              >
                Generic Materials
              </button>
              <button
                onClick={() => setTableType("bambu")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  tableType === "bambu"
                    ? "bg-green-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                }`}
              >
                Bambu Materials
              </button>
              <button
                onClick={() => setTableType("esun")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  tableType === "esun"
                    ? "bg-green-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                }`}
              >
                eSun Materials
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setGridType("generic")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  gridType === "generic"
                    ? "bg-green-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                }`}
              >
                Generic Materials
              </button>
              <button
                onClick={() => setGridType("bambu")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  gridType === "bambu"
                    ? "bg-green-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                }`}
              >
                Bambu Materials
              </button>
              <button
                onClick={() => setGridType("esun")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  gridType === "esun"
                    ? "bg-green-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                }`}
              >
                eSun Materials
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {viewMode === "grid" ? (
          gridType === "generic" ? (
            <MaterialsGrid materials={materialData} />
          ) : gridType === "bambu" ? (
            <BambuMaterialsGrid materials={bambuMaterialData} />
          ) : (
            <EsunMaterialsGrid materials={esunMaterialData} />
          )
        ) : tableType === "generic" ? (
          <MaterialsTable materials={materialData} />
        ) : tableType === "bambu" ? (
          <BambuMaterialsTable materials={bambuMaterialData} />
        ) : (
          <EsunMaterialsTable materials={esunMaterialData} />
        )}

        {/* Additional Info */}
      </div>
      </div>
    </>
  );
}
