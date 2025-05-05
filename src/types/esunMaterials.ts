export interface EsunMaterialProperties {
  name: string;
  properties: {
    density: string;              // Density (g/cm³)
    heatDistortion: string;       // Heat Distortion Temp (°C, 0.45MPa)
    meltFlow: string;             // Melt Flow Index (g/10min)
    tensileStrength: string;      // Tensile Strength (MPa)
    elongation: string;           // Elongation at Break (%)
    bendingStrength: string;      // Bending Strength (MPa)
    flexuralModulus: string;      // Flexural Modulus (MPa)
    izodImpact: string;           // IZOD Impact Strength (kJ/m²)
    weatherResistance: string;    // Weather Resistance (0-10)
    printability: string;         // Printability (0-10)
  };
  printerSettings: {
    printTemp: string;           // Print Temperature (°C)
    bedTemp: string;             // Bed Temperature (°C)
    fanSpeed: string;            // Fan Speed (%)
    printSpeed: string;          // Print Speed (mm/s)
    heatBedRequired: 'Required' | 'Optional'; // Heat Bed
  };
  characteristics: {
    flexibility: boolean;
    elasticity: boolean;
    impactResistance: boolean;
    soft: boolean;
    complex: boolean;
    uvResistance: boolean;
    waterproof: boolean;
    solubility: boolean;
    heatResistance: boolean;
    chemicalResistance: boolean;
    fatigueResistance: boolean;
    needToDry: boolean;
    needHeatBed: boolean;
  };
}