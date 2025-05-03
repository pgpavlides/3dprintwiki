export interface BambuMaterialProperties {
  name: string;
  properties: {
    toughness: string;        // Impact Strength - XY
    strength: string;         // Bending Strength - XY
    stiffness: string;        // Bending Modulus - XY
    layerAdhesion: string;    // Impact Strength - Z
    heatResistance: string;   // HDT, 0.45 MPa
    waterAbsorption: string;  // Saturated Water Absorption Rate
  };
  preprinting: {
    dryingRequired: 'Required' | 'Optional';
    dryingCondition: string;
    amsCompatibility: string;
  };
  printerSettings: {
    nozzleSizeMaterial: string;
    buildPlate: string[];
    adhesionMethods: string[];
    printSpeed: string;
    nozzleTemperature: string;
    partCoolingFan: string;
    enclosureRequired: 'Required' | 'Optional';
  };
  postprinting: {
    sealWithDesiccant: 'Required' | 'Optional';
    annealing: string;
  };
}
