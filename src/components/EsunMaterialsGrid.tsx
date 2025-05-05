import React from 'react';
import type { EsunMaterialProperties } from '../types/esunMaterials';
import { EsunMaterialCard } from './EsunMaterialCard';

interface EsunMaterialsGridProps {
  materials: EsunMaterialProperties[];
}

export const EsunMaterialsGrid: React.FC<EsunMaterialsGridProps> = ({ materials }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {materials.map(material => (
          <EsunMaterialCard
            key={material.name}
            material={material}
          />
        ))}
      </div>
    </div>
  );
};
