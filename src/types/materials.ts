export interface MaterialProperties {
  name: string;
  description: string;
  image?: string;
  ultimateStrength: {
    value: string;
    unit: string;
    barValue: number;
    barMax: number;
  };
  stiffness: {
    value: number;
    unit: string;
  };
  durability: {
    value: number;
    unit: string;
  };
  maxServiceTemp: {
    value: string;
    unit: string;
  };
  thermalExpansion: {
    value: string;
    unit: string;
  };
  density: {
    value: string;
    unit: string;
  };
  price: {
    range: string;
    currency: string;
  };
  printability: {
    value: number;
    unit: string;
  };
  extruderTemp: {
    range: string;
    unit: string;
  };
  bedTemp: {
    range: string;
    unit: string;
  };
  heatedBed: 'Required' | 'Optional';
  buildSurfaces: string[];
  otherRequirements: string[];
  characteristics: {
    flexible?: boolean;
    elastic?: boolean;
    impactResistant?: boolean;
    soft?: boolean;
    composite?: boolean;
    uvResistant?: boolean;
    waterResistant?: boolean;
    dissolvable?: boolean;
    heatResistant?: boolean;
    chemicallyResistant?: boolean;
    fatigueResistant?: boolean;
    heatedBedNotRequired?: boolean;
  };
}
