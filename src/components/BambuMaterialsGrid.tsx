import React from 'react';
import type { BambuMaterialProperties } from '../types/bambuMaterials';
import { BambuMaterialCard } from './BambuMaterialCard';

interface BambuMaterialsGridProps {
  materials: BambuMaterialProperties[];
}

export const BambuMaterialsGrid: React.FC<BambuMaterialsGridProps> = ({ materials }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {materials.map(material => (
          <BambuMaterialCard
            key={material.name}
            material={material}
          />
        ))}
      </div>
    </div>
  );
};
