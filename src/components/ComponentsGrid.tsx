import React from 'react';
import type { ComponentProps } from '../types/components';
import { ComponentCard } from './ComponentCard';

interface ComponentsGridProps {
  components: ComponentProps[];
}

export const ComponentsGrid: React.FC<ComponentsGridProps> = ({ components }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map(component => (
          <ComponentCard
            key={component.name}
            component={component}
          />
        ))}
      </div>
    </div>
  );
};
