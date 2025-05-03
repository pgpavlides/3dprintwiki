import React, { useState } from 'react';
import type { ComponentProps } from '../types/components';

interface ComponentsTableProps {
  components: ComponentProps[];
}

export const ComponentsTable: React.FC<ComponentsTableProps> = ({ components }) => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (componentId: string) => {
    setExpandedRows(prev =>
      prev.includes(componentId)
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="p-4 text-left font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">Component</th>
            <th className="p-4 text-left font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">Category</th>
            <th className="p-4 text-left font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">Description</th>
            <th className="p-4 text-left font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">Common Sizes</th>
            <th className="p-4 text-left font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">Installation</th>
            <th className="p-4 text-center font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">Details</th>
          </tr>
        </thead>
        <tbody>
          {components.map(component => (
            <React.Fragment key={component.id}>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-4 border-b dark:border-gray-700">
                  <div className="font-semibold text-gray-900 dark:text-white">{component.name}</div>
                </td>
                <td className="p-4 border-b dark:border-gray-700">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                    {component.category}
                  </span>
                </td>
                <td className="p-4 border-b dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 text-sm max-w-md">
                    {component.description}
                  </p>
                </td>
                <td className="p-4 border-b dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {component.specifications.slice(0, 2).map((spec, index) => (
                      <div key={index}>{spec.size}</div>
                    ))}
                    {component.specifications.length > 2 && (
                      <div className="text-blue-600 dark:text-blue-400">+{component.specifications.length - 2} more</div>
                    )}
                  </div>
                </td>
                <td className="p-4 border-b dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm line-clamp-2">
                    {component.installationMethod}
                  </p>
                </td>
                <td className="p-4 border-b dark:border-gray-700 text-center">
                  <button
                    onClick={() => toggleRow(component.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {expandedRows.includes(component.id) ? 'Hide' : 'Show'}
                  </button>
                </td>
              </tr>
              
              {expandedRows.includes(component.id) && (
                <tr>
                  <td colSpan={6} className="p-0">
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 border-b dark:border-gray-700">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">All Specifications</h4>
                          <div className="space-y-2">
                            {component.specifications.map((spec, index) => (
                              <div key={index} className="text-sm">
                                <div className="font-medium text-gray-700 dark:text-gray-300">{spec.size}</div>
                                <div className="text-gray-600 dark:text-gray-400">
                                  Material: {spec.material}
                                  {spec.weight && ` • Weight: ${spec.weight}`}
                                  {spec.strength && ` • Strength: ${spec.strength}`}
                                  {spec.temperature && ` • Temp: ${spec.temperature}`}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Common Uses</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            {component.commonUses.map((use, index) => (
                              <li key={index}>{use}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Design Considerations</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            {component.designConsiderations.map((consideration, index) => (
                              <li key={index}>{consideration}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {component.tips && component.tips.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Tips</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              {component.tips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="md:col-span-2 lg:col-span-3">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Installation Method</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {component.installationMethod}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
