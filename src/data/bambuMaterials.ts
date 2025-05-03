import type { BambuMaterialProperties } from '../types/bambuMaterials';

export const bambuMaterialData: BambuMaterialProperties[] = [
  {
    name: 'PLA',
    properties: {
      toughness: '26.6 kJ/m²',
      strength: '76 MPa',
      stiffness: '2750 MPa',
      layerAdhesion: '13.8 kJ/m²',
      heatResistance: '57 ℃',
      waterAbsorption: '0.43%'
    },
    preprinting: {
      dryingRequired: 'Optional',
      dryingCondition: 'Blast Drying Oven: 50 °C, 8 h\nX1 Series Heatbed: 60 - 70 °C, 12 h',
      amsCompatibility: 'All Size/Material'
    },
    printerSettings: {
      nozzleSizeMaterial: 'All Size/Material',
      buildPlate: [
        'Cool Plate (35 - 55 °C)',
        'Smooth PEI Plate (55 - 65 °C)',
        'Textured PEI Plate (55 - 65 °C)',
        'Cool Plate SuperTack (30 - 45 °C)'
      ],
      adhesionMethods: ['Bambu Liquid Glue', 'Glue Stick'],
      printSpeed: '< 300 mm/s',
      nozzleTemperature: '190 - 230 ℃',
      partCoolingFan: '50 - 100%',
      enclosureRequired: 'Optional'
    },
    postprinting: {
      sealWithDesiccant: 'Optional',
      annealing: '50 - 60 ℃, 6 - 12 hours'
    }
  },
  {
    name: 'PETG HF',
    properties: {
      toughness: '31.5 kJ/m²',
      strength: '64 MPa',
      stiffness: '2050 MPa',
      layerAdhesion: '10.6 kJ/m²',
      heatResistance: '69 ℃',
      waterAbsorption: '0.40%'
    },
    preprinting: {
      dryingRequired: 'Required',
      dryingCondition: 'Blast Drying Oven: 65 °C, 8 h\nX1 Series Heatbed: 75 - 85 ℃, 12 h',
      amsCompatibility: 'All Size/Material'
    },
    printerSettings: {
      nozzleSizeMaterial: 'All Size/Material',
      buildPlate: [
        'Smooth PEI Plate (60 - 80 °C)',
        'Textured PEI Plate (60 - 80 °C)',
        'Cool Plate SuperTack (60 - 70 °C)'
      ],
      adhesionMethods: ['Bambu Liquid Glue', 'Glue Stick'],
      printSpeed: '< 300 mm/s',
      nozzleTemperature: '230 - 260 ℃',
      partCoolingFan: '0 - 80%',
      enclosureRequired: 'Optional'
    },
    postprinting: {
      sealWithDesiccant: 'Optional',
      annealing: 'N/A'
    }
  },
  {
    name: 'ABS',
    properties: {
      toughness: '39.3 kJ/m²',
      strength: '62 MPa',
      stiffness: '1880 MPa',
      layerAdhesion: '7.4 kJ/m²',
      heatResistance: '87 ℃',
      waterAbsorption: '0.65%'
    },
    preprinting: {
      dryingRequired: 'Optional',
      dryingCondition: 'Blast Drying Oven: 80 °C, 8 h\nX1 Series Heatbed: 90 - 100 °C, 12 h',
      amsCompatibility: 'All Size/Material'
    },
    printerSettings: {
      nozzleSizeMaterial: 'All Size/Material',
      buildPlate: [
        'Smooth PEI Plate (90 - 100 °C)',
        'Textured PEI Plate (90 - 100 °C)'
      ],
      adhesionMethods: ['Bambu Liquid Glue', 'Glue Stick'],
      printSpeed: '< 300 mm/s',
      nozzleTemperature: '240 - 280 ℃',
      partCoolingFan: '0 - 80%',
      enclosureRequired: 'Required'
    },
    postprinting: {
      sealWithDesiccant: 'Optional',
      annealing: '80 - 90 ℃, 6 - 12 hours'
    }
  },
  {
    name: 'ABS-GF',
    properties: {
      toughness: '14.5 kJ/m²',
      strength: '68 MPa',
      stiffness: '2860 MPa',
      layerAdhesion: '5.3 kJ/m²',
      heatResistance: '99 ℃',
      waterAbsorption: '0.53%'
    },
    preprinting: {
      dryingRequired: 'Optional',
      dryingCondition: 'Blast Drying Oven: 80 °C, 8 h\nX1 Series Heatbed: 90 - 100 ℃, 13 h',
      amsCompatibility: '0.6 mm (recommended) / 0.4 mm / 0.8 mm Hardened Steel'
    },
    printerSettings: {
      nozzleSizeMaterial: '0.6 mm (recommended) / 0.4 mm / 0.8 mm Hardened Steel',
      buildPlate: [
        'Smooth PEI Plate (90 - 100 °C)',
        'Textured PEI Plate (90 - 100 °C)'
      ],
      adhesionMethods: ['Bambu Liquid Glue', 'Glue Stick'],
      printSpeed: '< 180 mm/s',
      nozzleTemperature: '240 - 280 ℃',
      partCoolingFan: '0 - 80%',
      enclosureRequired: 'Required'
    },
    postprinting: {
      sealWithDesiccant: 'Optional',
      annealing: '80 - 90 ℃, 6 - 12 hours'
    }
  },
  {
    name: 'ASA',
    properties: {
      toughness: '41.0 kJ/m²',
      strength: '65 MPa',
      stiffness: '1920 MPa',
      layerAdhesion: '4.9 kJ/m²',
      heatResistance: '100 ℃',
      waterAbsorption: '0.45%'
    },
    preprinting: {
      dryingRequired: 'Optional',
      dryingCondition: 'Blast Drying Oven: 80 °C, 8 h\nX1 Series Heatbed: 90 - 100 °C, 12 h',
      amsCompatibility: 'All Size/Material'
    },
    printerSettings: {
      nozzleSizeMaterial: 'All Size/Material',
      buildPlate: [
        'Smooth PEI Plate (90 - 100 °C)',
        'Textured PEI Plate (90 - 100 °C)'
      ],
      adhesionMethods: ['Bambu Liquid Glue', 'Glue Stick'],
      printSpeed: '< 300 mm/s',
      nozzleTemperature: '240 - 280 ℃',
      partCoolingFan: '0 - 80%',
      enclosureRequired: 'Required'
    },
    postprinting: {
      sealWithDesiccant: 'Optional',
      annealing: '80 - 90 ℃, 6 - 12 hours'
    }
  },
  {
    name: 'ASA-CF',
    properties: {
      toughness: '14.0 kJ/m²',
      strength: '72 MPa',
      stiffness: '3740 MPa',
      layerAdhesion: '9.4 kJ/m²',
      heatResistance: '110 ℃',
      waterAbsorption: '0.33%'
    },
    preprinting: {
      dryingRequired: 'Optional',
      dryingCondition: 'Blast Drying Oven: 80 °C, 8 h\nX1 Series Heatbed: 90 - 100 ℃, 12 h',
      amsCompatibility: '0.4 mm / 0.6 mm / 0.8 mm Hardened Steel'
    },
    printerSettings: {
      nozzleSizeMaterial: '0.4 mm / 0.6 mm / 0.8 mm Hardened Steel',
      buildPlate: [
        'Smooth PEI Plate (90 - 100 °C)',
        'Textured PEI Plate (90 - 100 °C)'
      ],
      adhesionMethods: ['Bambu Liquid Glue', 'Glue Stick'],
      printSpeed: '< 250 mm/s',
      nozzleTemperature: '250 - 290 ℃',
      partCoolingFan: '0 - 80%',
      enclosureRequired: 'Required'
    },
    postprinting: {
      sealWithDesiccant: 'Optional',
      annealing: '80 - 90 ℃, 6 - 12 hours'
    }
  },
  {
    name: 'PC',
    properties: {
      toughness: '34.8 kJ/m²',
      strength: '108 MPa',
      stiffness: '2310 MPa',
      layerAdhesion: '9.0 kJ/m²',
      heatResistance: '117 ℃',
      waterAbsorption: '0.25%'
    },
    preprinting: {
      dryingRequired: 'Required',
      dryingCondition: 'Blast Drying Oven: 80 °C, 8 h\nX1 Series Heatbed: 90 - 100 °C, 12 h',
      amsCompatibility: 'All Size/Material'
    },
    printerSettings: {
      nozzleSizeMaterial: 'All Size/Material',
      buildPlate: [
        'Smooth PEI Plate (90 - 110 °C)',
        'Textured PEI Plate (90 - 110 °C)'
      ],
      adhesionMethods: ['Glue Stick'],
      printSpeed: '< 300 mm/s',
      nozzleTemperature: '260 - 280 ℃',
      partCoolingFan: '0 - 60%',
      enclosureRequired: 'Required'
    },
    postprinting: {
      sealWithDesiccant: 'Required',
      annealing: '85 - 100 ℃, 6 - 12 hours'
    }
  },
  {
    name: 'PC FR',
    properties: {
      toughness: '55.0 kJ/m²',
      strength: '90 MPa',
      stiffness: '1890 MPa',
      layerAdhesion: '8.0 kJ/m²',
      heatResistance: '113 ℃',
      waterAbsorption: '0.12%'
    },
    preprinting: {
      dryingRequired: 'Required',
      dryingCondition: 'Blast Drying Oven: 80 °C, 8 h\nX1 Series Heatbed: 90 - 100 °C, 12 h',
      amsCompatibility: 'All Size/Material'
    },
    printerSettings: {
      nozzleSizeMaterial: 'All Size/Material',
      buildPlate: [
        'Smooth PEI Plate (90 - 110 °C)',
        'Textured PEI Plate (90 - 110 °C)'
      ],
      adhesionMethods: ['Glue Stick'],
      printSpeed: '< 300 mm/s',
      nozzleTemperature: '260 - 280 ℃',
      partCoolingFan: '0 - 60%',
      enclosureRequired: 'Required'
    },
    postprinting: {
      sealWithDesiccant: 'Required',
      annealing: '85 - 100 ℃, 6 - 12 hours'
    }
  },
  {
    name: 'TPU 95A HF',
    properties: {
      toughness: '123.2 kJ/m²',
      strength: 'N/A',
      stiffness: 'N/A',
      layerAdhesion: '86.3 kJ/m²',
      heatResistance: 'N/A',
      waterAbsorption: '1.08%'
    },
    preprinting: {
      dryingRequired: 'Required',
      dryingCondition: 'Blast Drying Oven: 70 °C, 8 h\nX1 Series Heatbed: 80 - 90 ℃, 12 h',
      amsCompatibility: '0.4 mm / 0.6 mm / 0.8 mm Hardened Steel / Stainless Steel'
    },
    printerSettings: {
      nozzleSizeMaterial: '0.4 mm / 0.6 mm / 0.8 mm Hardened Steel / Stainless Steel',
      buildPlate: [
        'Smooth PEI Plate (30 - 45 °C)',
        'Textured PEI Plate (30 - 45 °C)'
      ],
      adhesionMethods: ['Bambu Liquid Glue', 'Glue Stick'],
      printSpeed: '< 200 mm/s',
      nozzleTemperature: '220 - 240 ℃',
      partCoolingFan: '50 - 100%',
      enclosureRequired: 'Optional'
    },
    postprinting: {
      sealWithDesiccant: 'Required',
      annealing: 'N/A'
    }
  },
  {
    name: 'TPU for AMS',
    properties: {
      toughness: '124.3 kJ/m²',
      strength: 'N/A',
      stiffness: 'N/A',
      layerAdhesion: '9.6 kJ/m²',
      heatResistance: 'N/A',
      waterAbsorption: '1.20%'
    },
    preprinting: {
      dryingRequired: 'Required',
      dryingCondition: 'Blast Drying Oven: 70 °C, 8 h\nX1 Series Heatbed: 80 - 90 ℃, 12 h',
      amsCompatibility: '0.4 mm / 0.6 mm / 0.8 mm Hardened Steel / Stainless Steel'
    },
    printerSettings: {
      nozzleSizeMaterial: '0.4 mm / 0.6 mm / 0.8 mm Hardened Steel / Stainless Steel',
      buildPlate: [
        'Smooth PEI Plate (30 - 35 °C)',
        'Textured PEI Plate (30 - 35 °C)'
      ],
      adhesionMethods: ['Bambu Liquid Glue', 'Glue Stick'],
      printSpeed: '< 250 mm/s',
      nozzleTemperature: '220 - 240 ℃',
      partCoolingFan: '20% - 50%',
      enclosureRequired: 'Optional'
    },
    postprinting: {
      sealWithDesiccant: 'Required',
      annealing: 'N/A'
    }
  },
  {
    name: 'PLA-CF',
    properties: {
      toughness: '23.2 kJ/m²',
      strength: '89 MPa',
      stiffness: '3950 MPa',
      layerAdhesion: '7.8 kJ/m²',
      heatResistance: '55 °C',
      waterAbsorption: '0.42%'
    },
    preprinting: {
      dryingRequired: 'Optional',
      dryingCondition: 'Blast Drying Oven: 55 °C, 8 h\nX1 Series Heatbed: 65 - 75 °C, 12 h',
      amsCompatibility: '0.4 mm / 0.6 mm / 0.8 mm Hardened Steel'
    },
    printerSettings: {
      nozzleSizeMaterial: '0.4 mm / 0.6 mm / 0.8 mm Hardened Steel',
      buildPlate: [
        'Smooth PEI Plate (45 - 65 °C)',
        'Textured PEI Plate (55 - 65 °C)',
        'Cool Plate SuperTack (30 - 50 °C)'
      ],
      adhesionMethods: ['Bambu Liquid Glue', 'Glue Stick'],
      printSpeed: '< 250 mm/s',
      nozzleTemperature: '210 - 240 ℃',
      partCoolingFan: '50 - 100%',
      enclosureRequired: 'Optional'
    },
    postprinting: {
      sealWithDesiccant: 'Required',
      annealing: '55 - 60 ℃, 6 - 12 hours'
    }
  },
  {
    name: 'PETG-CF',
    properties: {
      toughness: '41.2 kJ/m²',
      strength: '70 MPa',
      stiffness: '2910 MPa',
      layerAdhesion: '10.7 kJ/m²',
      heatResistance: '74 °C',
      waterAbsorption: '0.30%'
    },
    preprinting: {
      dryingRequired: 'Optional',
      dryingCondition: 'Blast Drying Oven: 65 °C, 8 h\nX1 Series Heatbed: 75 - 85 °C, 12 h',
      amsCompatibility: '0.4 mm / 0.6 mm / 0.8 mm Hardened Steel'
    },
    printerSettings: {
      nozzleSizeMaterial: '0.4 mm / 0.6 mm / 0.8 mm Hardened Steel',
      buildPlate: [
        'Smooth PEI Plate (60 - 80 °C)',
        'Textured PEI Plate (60 - 80 °C)',
        'Cool Plate SuperTack (60 - 70 °C)'
      ],
      adhesionMethods: ['Bambu Liquid Glue', 'Glue Stick'],
      printSpeed: '< 200 mm/s',
      nozzleTemperature: '240 - 270 ℃',
      partCoolingFan: '0 - 40%',
      enclosureRequired: 'Optional'
    },
    postprinting: {
      sealWithDesiccant: 'Required',
      annealing: '65 - 70 ℃, 6 - 12 hours'
    }
  },
  {
    name: 'PET-CF',
    properties: {
      toughness: '36.0 kJ/m²',
      strength: '131 MPa',
      stiffness: '5320 MPa',
      layerAdhesion: '4.5 kJ/m²',
      heatResistance: '205 °C',
      waterAbsorption: '0.37%'
    },
    preprinting: {
      dryingRequired: 'Required',
      dryingCondition: 'Blast Drying Oven: 80 °C, 8 - 12 h\nX1 Series Heatbed: 90 - 100 °C, 12 h',
      amsCompatibility: '0.6 mm (recommended) / 0.4 mm / 0.8 mm Hardened Steel'
    },
    printerSettings: {
      nozzleSizeMaterial: '0.6 mm (recommended) / 0.4 mm / 0.8 mm Hardened Steel',
      buildPlate: [
        'Smooth PEI Plate (70 - 100 °C)',
        'Textured PEI Plate (70 - 100 °C)',
        'Cool Plate SuperTack (60 - 80 °C)'
      ],
      adhesionMethods: ['Glue Stick'],
      printSpeed: '< 100 mm/s',
      nozzleTemperature: '260 - 300 ℃',
      partCoolingFan: '0 - 40%',
      enclosureRequired: 'Optional'
    },
    postprinting: {
      sealWithDesiccant: 'Required',
      annealing: '90 - 130 ℃, 6 - 12 hours'
    }
  },
  {
    name: 'PAHT-CF',
    properties: {
      toughness: '57.5 kJ/m²',
      strength: '125 MPa',
      stiffness: '4230 MPa',
      layerAdhesion: '13.3 kJ/m²',
      heatResistance: '194 °C',
      waterAbsorption: '0.88%'
    },
    preprinting: {
      dryingRequired: 'Required',
      dryingCondition: 'Blast Drying Oven: 80 °C, 8 - 12 h\nX1 Series Heatbed: 90 - 100 °C, 12 h',
      amsCompatibility: '0.6 mm (recommended) / 0.4 mm / 0.8 mm Hardened Steel'
    },
    printerSettings: {
      nozzleSizeMaterial: '0.6 mm (recommended) / 0.4 mm / 0.8 mm Hardened Steel',
      buildPlate: [
        'Smooth PEI Plate (100 - 120 °C)',
        'Textured PEI Plate (100 - 120 °C)'
      ],
      adhesionMethods: ['Glue Stick'],
      printSpeed: '< 100 mm/s',
      nozzleTemperature: '260 - 300 ℃',
      partCoolingFan: '0 - 40%',
      enclosureRequired: 'Required'
    },
    postprinting: {
      sealWithDesiccant: 'Required',
      annealing: '90 - 130 ℃, 6 - 12 hours'
    }
  },
  {
    name: 'PA6-CF',
    properties: {
      toughness: '40.3 kJ/m²',
      strength: '151 MPa',
      stiffness: '5460 MPa',
      layerAdhesion: '15.5 kJ/m²',
      heatResistance: '186 ℃',
      waterAbsorption: '2.35%'
    },
    preprinting: {
      dryingRequired: 'Required',
      dryingCondition: 'Blast Drying Oven: 80 °C, 8 - 12 h\nX1 Series Heatbed: 90 - 100 ℃, 12 h',
      amsCompatibility: '0.6 mm (recommended) / 0.4 mm / 0.8 mm Hardened Steel'
    },
    printerSettings: {
      nozzleSizeMaterial: '0.6 mm (recommended) / 0.4 mm / 0.8 mm Hardened Steel',
      buildPlate: [
        'Smooth PEI Plate (100 - 120 °C)',
        'Textured PEI Plate (100 - 120 °C)'
      ],
      adhesionMethods: ['Glue Stick'],
      printSpeed: '< 100 mm/s',
      nozzleTemperature: '260 - 300 ℃',
      partCoolingFan: '0 - 40%',
      enclosureRequired: 'Required'
    },
    postprinting: {
      sealWithDesiccant: 'Required',
      annealing: '90 - 130 ℃, 6 - 12 hours'
    }
  },
  {
    name: 'PA6-GF',
    properties: {
      toughness: '27.2 kJ/m²',
      strength: '120 MPa',
      stiffness: '3670 MPa',
      layerAdhesion: '4.1 kJ/m²',
      heatResistance: '182 ℃',
      waterAbsorption: '2.56%'
    },
    preprinting: {
      dryingRequired: 'Required',
      dryingCondition: 'Blast Drying Oven: 80 °C, 8 - 12 h\nX1 Series Heatbed: 90 - 100 ℃, 12 h',
      amsCompatibility: '0.6 mm (recommended) / 0.4 mm / 0.8 mm Hardened Steel'
    },
    printerSettings: {
      nozzleSizeMaterial: '0.6 mm (recommended) / 0.4 mm / 0.8 mm Hardened Steel',
      buildPlate: [
        'Smooth PEI Plate (100 - 120 °C)',
        'Textured PEI Plate (100 - 120 °C)'
      ],
      adhesionMethods: ['Glue Stick'],
      printSpeed: '< 130 mm/s',
      nozzleTemperature: '260 - 290 ℃',
      partCoolingFan: '0 - 40%',
      enclosureRequired: 'Required'
    },
    postprinting: {
      sealWithDesiccant: 'Required',
      annealing: '90 - 130 ℃, 6 - 12 hours'
    }
  },
  {
    name: 'PPA-CF',
    properties: {
      toughness: '41.7 kJ/m²',
      strength: '208 MPa',
      stiffness: '9860 MPa',
      layerAdhesion: '4.3 kJ/m²',
      heatResistance: '227 ℃',
      waterAbsorption: '1.30%'
    },
    preprinting: {
      dryingRequired: 'Required',
      dryingCondition: 'Blast Drying Oven: 100 - 140 °C, 8 - 12 h (within this range, a higher temp, a better drying result)\nX1 Series Printer Heatbed: 110 - 120 °C, 12 h (not as good as a blast drying oven)',
      amsCompatibility: '0.6 mm (recommended) / 0.4 mm / 0.8 mm Hardened Steel'
    },
    printerSettings: {
      nozzleSizeMaterial: '0.6 mm (recommended) / 0.4 mm / 0.8 mm Hardened Steel',
      buildPlate: [
        'Smooth PEI Plate (100 - 120 °C)',
        'Textured PEI Plate (100 - 120 °C)'
      ],
      adhesionMethods: ['Glue Stick'],
      printSpeed: '< 100 mm/s',
      nozzleTemperature: '280 - 310 ℃',
      partCoolingFan: '0 - 40%',
      enclosureRequired: 'Required'
    },
    postprinting: {
      sealWithDesiccant: 'Required',
      annealing: '120 - 140 ℃, 6 - 12 hours'
    }
  },
  {
    name: 'PPS-CF',
    properties: {
      toughness: '27.8 kJ/m²',
      strength: '142 MPa',
      stiffness: '7160 MPa',
      layerAdhesion: '2.8 kJ/m²',
      heatResistance: '264 ℃',
      waterAbsorption: '0.05%'
    },
    preprinting: {
      dryingRequired: 'Required',
      dryingCondition: 'Blast Drying Oven: 100 - 140 °C, 8 - 12 h (within this range, a higher temp, a better drying result)\nX1 Series Printer Heatbed: 110 - 120 °C, 12 h (not as good as a blast drying oven)',
      amsCompatibility: '0.6 mm (recommended) / 0.4 mm / 0.8 mm Hardened Steel'
    },
    printerSettings: {
      nozzleSizeMaterial: '0.6 mm (recommended) / 0.4 mm / 0.8 mm Hardened Steel',
      buildPlate: [
        'Smooth PEI Plate (100 - 120 °C)',
        'Textured PEI Plate (100 - 120 °C)'
      ],
      adhesionMethods: ['Glue Stick'],
      printSpeed: '< 100 mm/s',
      nozzleTemperature: '310 - 340 ℃',
      partCoolingFan: '0 - 40%',
      enclosureRequired: 'Required'
    },
    postprinting: {
      sealWithDesiccant: 'Required',
      annealing: '180 - 220 ℃, 6 - 12 hours'
    }
  }
];
