import type { EsunMaterialProperties } from '../types/esunMaterials';

export const esunMaterialData: EsunMaterialProperties[] = [
  {
    name: 'ePLA-HS',
    properties: {
      density: '1.24',
      heatDistortion: '53',
      meltFlow: '5.2(190°C/2.16kg)',
      tensileStrength: '60',
      elongation: '18.3',
      bendingStrength: '79',
      flexuralModulus: '2700',
      izodImpact: '4.3',
      weatherResistance: '4/10',
      printability: '9/10'
    },
    printerSettings: {
      printTemp: '210-230',
      bedTemp: '45-60',
      fanSpeed: '100',
      printSpeed: '50-350',
      heatBedRequired: 'Optional'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: false,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: false,
      chemicalResistance: false,
      fatigueResistance: false,
      needToDry: false,
      needHeatBed: false
    }
  },
  {
    name: 'ePLA+HS',
    properties: {
      density: '1.24',
      heatDistortion: '54',
      meltFlow: '5.2(190°C/2.16kg)',
      tensileStrength: '59',
      elongation: '17.5',
      bendingStrength: '78',
      flexuralModulus: '2695',
      izodImpact: '4.1',
      weatherResistance: '4/10',
      printability: '9/10'
    },
    printerSettings: {
      printTemp: '210-230',
      bedTemp: '45-60',
      fanSpeed: '100',
      printSpeed: '50-350',
      heatBedRequired: 'Optional'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: false,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: false,
      chemicalResistance: false,
      fatigueResistance: false,
      needToDry: false,
      needHeatBed: false
    }
  },
  {
    name: 'ePETG-HS',
    properties: {
      density: '1.27',
      heatDistortion: '64',
      meltFlow: '20(250°C/2.16kg)',
      tensileStrength: '52.2',
      elongation: '83',
      bendingStrength: '58',
      flexuralModulus: '1073',
      izodImpact: '4.7',
      weatherResistance: '4/10',
      printability: '9/10'
    },
    printerSettings: {
      printTemp: '220-250',
      bedTemp: '75-90',
      fanSpeed: '100',
      printSpeed: '50-350',
      heatBedRequired: 'Optional'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: false,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: false,
      chemicalResistance: false,
      fatigueResistance: false,
      needToDry: false,
      needHeatBed: false
    }
  },
  {
    name: 'eABS-HS',
    properties: {
      density: '1.04',
      heatDistortion: '89',
      meltFlow: '6(220°C/10kg)',
      tensileStrength: '39',
      elongation: '21',
      bendingStrength: '58',
      flexuralModulus: '1906',
      izodImpact: '4.1',
      weatherResistance: '8/10',
      printability: '8/10'
    },
    printerSettings: {
      printTemp: '230-270',
      bedTemp: '100-110',
      fanSpeed: '0',
      printSpeed: '50-300',
      heatBedRequired: 'Optional'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: true,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: true,
      chemicalResistance: false,
      fatigueResistance: false,
      needToDry: false,
      needHeatBed: true
    }
  },
  {
    name: 'eTPU-HS',
    properties: {
      density: '1.21',
      heatDistortion: '/',
      meltFlow: '1.2(190°C/2.16kg)',
      tensileStrength: '35',
      elongation: '>800',
      bendingStrength: '/',
      flexuralModulus: '/',
      izodImpact: '/',
      weatherResistance: '9/10',
      printability: '6/10'
    },
    printerSettings: {
      printTemp: '220-250',
      bedTemp: '45-60',
      fanSpeed: '100',
      printSpeed: '50-200',
      heatBedRequired: 'Optional'
    },
    characteristics: {
      flexibility: true,
      elasticity: true,
      impactResistance: true,
      soft: true,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: false,
      chemicalResistance: false,
      fatigueResistance: true,
      needToDry: false,
      needHeatBed: false
    }
  },
  {
    name: 'ePLA-CF',
    properties: {
      density: '1.21',
      heatDistortion: '53',
      meltFlow: '5.37(190°C/2.16kg)',
      tensileStrength: '39',
      elongation: '4.27',
      bendingStrength: '103',
      flexuralModulus: '5005',
      izodImpact: '5.08',
      weatherResistance: '4/10',
      printability: '9/10'
    },
    printerSettings: {
      printTemp: '190-230',
      bedTemp: '45-60',
      fanSpeed: '100',
      printSpeed: '50-300',
      heatBedRequired: 'Optional'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: false,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: false,
      chemicalResistance: false,
      fatigueResistance: false,
      needToDry: false,
      needHeatBed: false
    }
  },
  {
    name: 'PLA+',
    properties: {
      density: '1.23',
      heatDistortion: '53',
      meltFlow: '5(190°C/2.16kg)',
      tensileStrength: '63',
      elongation: '20',
      bendingStrength: '74',
      flexuralModulus: '1973',
      izodImpact: '9',
      weatherResistance: '4/10',
      printability: '9/10'
    },
    printerSettings: {
      printTemp: '210-230',
      bedTemp: '45-60',
      fanSpeed: '100',
      printSpeed: '40-350',
      heatBedRequired: 'Optional'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: true,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: false,
      chemicalResistance: false,
      fatigueResistance: false,
      needToDry: false,
      needHeatBed: false
    }
  },
  {
    name: 'ePLA-ST',
    properties: {
      density: '1.25',
      heatDistortion: '52',
      meltFlow: '3.2(190°C/2.16kg)',
      tensileStrength: '34.3',
      elongation: '90',
      bendingStrength: '43',
      flexuralModulus: '1477',
      izodImpact: '63',
      weatherResistance: '4/10',
      printability: '9/10'
    },
    printerSettings: {
      printTemp: '200-230',
      bedTemp: '45-60',
      fanSpeed: '100',
      printSpeed: '40-100',
      heatBedRequired: 'Optional'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: true,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: false,
      chemicalResistance: false,
      fatigueResistance: false,
      needToDry: false,
      needHeatBed: false
    }
  },
  {
    name: 'ePLA-Silk',
    properties: {
      density: '1.21',
      heatDistortion: '50',
      meltFlow: '4.8(190°C/2.16kg)',
      tensileStrength: '52',
      elongation: '14.4',
      bendingStrength: '65',
      flexuralModulus: '1447',
      izodImpact: '5.86',
      weatherResistance: '4/10',
      printability: '9/10'
    },
    printerSettings: {
      printTemp: '190-230',
      bedTemp: '45-60',
      fanSpeed: '100',
      printSpeed: '40-100',
      heatBedRequired: 'Optional'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: false,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: false,
      chemicalResistance: false,
      fatigueResistance: false,
      needToDry: false,
      needHeatBed: false
    }
  },
  {
    name: 'eTwinkling',
    properties: {
      density: '1.41',
      heatDistortion: '67',
      meltFlow: '2.5(190°C/2.16kg)',
      tensileStrength: '58',
      elongation: '/',
      bendingStrength: '70',
      flexuralModulus: '2100',
      izodImpact: '4',
      weatherResistance: '4/10',
      printability: '9/10'
    },
    printerSettings: {
      printTemp: '200-230',
      bedTemp: '45-60',
      fanSpeed: '100',
      printSpeed: '40-100',
      heatBedRequired: 'Optional'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: false,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: false,
      chemicalResistance: false,
      fatigueResistance: false,
      needToDry: false,
      needHeatBed: false
    }
  },
  {
    name: 'eMarble',
    properties: {
      density: '1.24',
      heatDistortion: '/',
      meltFlow: '/',
      tensileStrength: '53',
      elongation: '/',
      bendingStrength: '/',
      flexuralModulus: '/',
      izodImpact: '/',
      weatherResistance: '4/10',
      printability: '9/10'
    },
    printerSettings: {
      printTemp: '190-230',
      bedTemp: '45-60',
      fanSpeed: '100',
      printSpeed: '40-100',
      heatBedRequired: 'Optional'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: false,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: false,
      chemicalResistance: false,
      fatigueResistance: false,
      needToDry: false,
      needHeatBed: false
    }
  },
  {
    name: 'ePLA-Matte',
    properties: {
      density: '1.32',
      heatDistortion: '51',
      meltFlow: '5.8(190°C/2.16kg)',
      tensileStrength: '42',
      elongation: '50',
      bendingStrength: '59',
      flexuralModulus: '2878',
      izodImpact: '6.2',
      weatherResistance: '4/10',
      printability: '9/10'
    },
    printerSettings: {
      printTemp: '190-230',
      bedTemp: '45-60',
      fanSpeed: '100',
      printSpeed: '40-100',
      heatBedRequired: 'Optional'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: false,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: false,
      chemicalResistance: false,
      fatigueResistance: false,
      needToDry: false,
      needHeatBed: false
    }
  },
  {
    name: 'PETG',
    properties: {
      density: '1.27',
      heatDistortion: '64',
      meltFlow: '20(250°C/2.16kg)',
      tensileStrength: '52.2',
      elongation: '83',
      bendingStrength: '58.1',
      flexuralModulus: '1073',
      izodImpact: '4.7',
      weatherResistance: '4/10',
      printability: '9/10'
    },
    printerSettings: {
      printTemp: '230-250',
      bedTemp: '75-90',
      fanSpeed: '100',
      printSpeed: '40-100',
      heatBedRequired: 'Required'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: false,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: true,
      solubility: false,
      heatResistance: false,
      chemicalResistance: true,
      fatigueResistance: true,
      needToDry: false,
      needHeatBed: true
    }
  },
  {
    name: 'ABS',
    properties: {
      density: '1.04',
      heatDistortion: '78',
      meltFlow: '12(220°C/10kg)',
      tensileStrength: '43',
      elongation: '22',
      bendingStrength: '66',
      flexuralModulus: '1177',
      izodImpact: '29',
      weatherResistance: '8/10',
      printability: '8/10'
    },
    printerSettings: {
      printTemp: '230-270',
      bedTemp: '95-110',
      fanSpeed: '0',
      printSpeed: '40-100',
      heatBedRequired: 'Required'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: true,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: true,
      chemicalResistance: false,
      fatigueResistance: false,
      needToDry: false,
      needHeatBed: true
    }
  },
  // Add additional filaments from second image
  {
    name: 'ABS+',
    properties: {
      density: '1.06',
      heatDistortion: '73',
      meltFlow: '15(220°C/10kg)',
      tensileStrength: '40',
      elongation: '30',
      bendingStrength: '68',
      flexuralModulus: '1203',
      izodImpact: '42',
      weatherResistance: '8/10',
      printability: '8/10'
    },
    printerSettings: {
      printTemp: '230-270',
      bedTemp: '95-110',
      fanSpeed: '0',
      printSpeed: '40-100',
      heatBedRequired: 'Required'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: true,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: true,
      chemicalResistance: false,
      fatigueResistance: false,
      needToDry: false,
      needHeatBed: true
    }
  },
  {
    name: 'eABS-Max',
    properties: {
      density: '1.05',
      heatDistortion: '85',
      meltFlow: '60(220°C/10kg)',
      tensileStrength: '45',
      elongation: '30',
      bendingStrength: '58',
      flexuralModulus: '2400',
      izodImpact: '48',
      weatherResistance: '8/10',
      printability: '8/10'
    },
    printerSettings: {
      printTemp: '240-270',
      bedTemp: '95-110',
      fanSpeed: '0',
      printSpeed: '40-100',
      heatBedRequired: 'Required'
    },
    characteristics: {
      flexibility: false,
      elasticity: false,
      impactResistance: true,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: true,
      chemicalResistance: false,
      fatigueResistance: false,
      needToDry: true,
      needHeatBed: true
    }
  },
  {
    name: 'eTPU-95A',
    properties: {
      density: '1.21',
      heatDistortion: '/',
      meltFlow: '1.2(190°C/2.16kg)',
      tensileStrength: '35',
      elongation: '>800',
      bendingStrength: '/',
      flexuralModulus: '/',
      izodImpact: '/',
      weatherResistance: '9/10',
      printability: '6/10'
    },
    printerSettings: {
      printTemp: '220-250',
      bedTemp: '45-60',
      fanSpeed: '100',
      printSpeed: '20-50',
      heatBedRequired: 'Optional'
    },
    characteristics: {
      flexibility: true,
      elasticity: true,
      impactResistance: true,
      soft: true,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: false,
      chemicalResistance: false,
      fatigueResistance: true,
      needToDry: false,
      needHeatBed: false
    }
  },
  {
    name: 'ePA',
    properties: {
      density: '1.12',
      heatDistortion: '50',
      meltFlow: '12.3(230°C/2.16kg)',
      tensileStrength: '52.45',
      elongation: '175.32',
      bendingStrength: '58',
      flexuralModulus: '1370',
      izodImpact: '18.4',
      weatherResistance: '10/10',
      printability: '8/10'
    },
    printerSettings: {
      printTemp: '250-290',
      bedTemp: '70-90',
      fanSpeed: '0',
      printSpeed: '40-100',
      heatBedRequired: 'Required'
    },
    characteristics: {
      flexibility: true,
      elasticity: false,
      impactResistance: false,
      soft: false,
      complex: false,
      uvResistance: false,
      waterproof: false,
      solubility: false,
      heatResistance: false,
      chemicalResistance: false,
      fatigueResistance: true,
      needToDry: false,
      needHeatBed: true
    }
  }
];
