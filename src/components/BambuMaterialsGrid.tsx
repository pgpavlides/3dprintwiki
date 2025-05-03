import React from 'react';
import type { BambuMaterialProperties } from '../types/bambuMaterials';
import { BambuMaterialCard } from './BambuMaterialCard';

interface BambuMaterialsGridProps {
  materials: BambuMaterialProperties[];
}

export const BambuMaterialsGrid: React.FC<BambuMaterialsGridProps> = ({ materials }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
