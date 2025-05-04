export interface ScrewDimension {
  size: string;
  threadDiameter: number;
  threadPitch: number;
  socketHeadDiameter: number;
  buttonHeadDiameter: number;
  hexHeadWidth: number;
  socketSize: number;
  commonLengths: string;
  typicalApplications: string[];
}

export const metricScrewDimensions: ScrewDimension[] = [
  {
    size: 'M1.6',
    threadDiameter: 1.6,
    threadPitch: 0.35,
    socketHeadDiameter: 3.0,
    buttonHeadDiameter: 2.5,
    hexHeadWidth: 3.2,
    socketSize: 1.27,
    commonLengths: '2-10mm',
    typicalApplications: ['Micro electronics', 'Watch repair', 'Precision instruments']
  },
  {
    size: 'M2',
    threadDiameter: 2.0,
    threadPitch: 0.4,
    socketHeadDiameter: 3.8,
    buttonHeadDiameter: 3.5,
    hexHeadWidth: 4.0,
    socketSize: 1.5,
    commonLengths: '4-20mm',
    typicalApplications: ['Electronics', 'PCB mounting', 'Small sensors']
  },
  {
    size: 'M2.5',
    threadDiameter: 2.5,
    threadPitch: 0.45,
    socketHeadDiameter: 4.5,
    buttonHeadDiameter: 4.7,
    hexHeadWidth: 5.0,
    socketSize: 2.0,
    commonLengths: '4-20mm',
    typicalApplications: ['Raspberry Pi', 'Electronics enclosures', 'Small assemblies']
  },
  {
    size: 'M3',
    threadDiameter: 3.0,
    threadPitch: 0.5,
    socketHeadDiameter: 5.5,
    buttonHeadDiameter: 5.7,
    hexHeadWidth: 5.5,
    socketSize: 2.5,
    commonLengths: '6-30mm',
    typicalApplications: ['3D printers', 'General assembly', 'Project construction']
  },
  {
    size: 'M4',
    threadDiameter: 4.0,
    threadPitch: 0.7,
    socketHeadDiameter: 7.0,
    buttonHeadDiameter: 7.6,
    hexHeadWidth: 7.0,
    socketSize: 3.0,
    commonLengths: '8-40mm',
    typicalApplications: ['Frame assembly', 'Structural connections', 'Medium-duty applications']
  },
  {
    size: 'M5',
    threadDiameter: 5.0,
    threadPitch: 0.8,
    socketHeadDiameter: 8.5,
    buttonHeadDiameter: 9.5,
    hexHeadWidth: 8.0,
    socketSize: 4.0,
    commonLengths: '8-50mm',
    typicalApplications: ['Frame construction', 'Load-bearing joints', 'Heavy assemblies']
  },
  {
    size: 'M6',
    threadDiameter: 6.0,
    threadPitch: 1.0,
    socketHeadDiameter: 10.0,
    buttonHeadDiameter: 10.5,
    hexHeadWidth: 10.0,
    socketSize: 5.0,
    commonLengths: '10-60mm',
    typicalApplications: ['Heavy frames', 'Industrial machinery', 'Large format printers']
  },
  {
    size: 'M8',
    threadDiameter: 8.0,
    threadPitch: 1.25,
    socketHeadDiameter: 13.0,
    buttonHeadDiameter: 14.0,
    hexHeadWidth: 13.0,
    socketSize: 6.0,
    commonLengths: '12-80mm',
    typicalApplications: ['Heavy machinery', 'Large CNC frames', 'Industrial equipment']
  },
  {
    size: 'M10',
    threadDiameter: 10.0,
    threadPitch: 1.5,
    socketHeadDiameter: 16.0,
    buttonHeadDiameter: 17.0,
    hexHeadWidth: 16.0,
    socketSize: 8.0,
    commonLengths: '16-100mm',
    typicalApplications: ['Heavy industrial', 'Large structural connections', 'Heavy equipment']
  },
  {
    size: 'M12',
    threadDiameter: 12.0,
    threadPitch: 1.75,
    socketHeadDiameter: 18.0,
    buttonHeadDiameter: 19.5,
    hexHeadWidth: 18.0,
    socketSize: 10.0,
    commonLengths: '20-120mm',
    typicalApplications: ['Large machinery', 'Structural steel', 'Heavy construction']
  }
];

export const getScrewDimensions = (size: string): ScrewDimension | undefined => {
  return metricScrewDimensions.find(dim => dim.size === size);
};

export const hexKeySizes = [
  { screwSize: 'M1.6', hexKeySize: '1.27mm' },
  { screwSize: 'M2', hexKeySize: '1.5mm' },
  { screwSize: 'M2.5', hexKeySize: '2.0mm' },
  { screwSize: 'M3', hexKeySize: '2.5mm' },
  { screwSize: 'M4', hexKeySize: '3.0mm' },
  { screwSize: 'M5', hexKeySize: '4.0mm' },
  { screwSize: 'M6', hexKeySize: '5.0mm' },
  { screwSize: 'M8', hexKeySize: '6.0mm' },
  { screwSize: 'M10', hexKeySize: '8.0mm' },
  { screwSize: 'M12', hexKeySize: '10.0mm' }
];

export const threadPitchInfo = {
  coarse: 'Coarse thread (standard) - Most common, better for general use',
  fine: 'Fine thread - Better holding power, used in precision applications',
  common: [
    { size: 'M3', coarse: '0.5mm', fine: '0.35mm' },
    { size: 'M4', coarse: '0.7mm', fine: '0.5mm' },
    { size: 'M5', coarse: '0.8mm', fine: '0.5mm' },
    { size: 'M6', coarse: '1.0mm', fine: '0.75mm' },
    { size: 'M8', coarse: '1.25mm', fine: '1.0mm' },
    { size: 'M10', coarse: '1.5mm', fine: '1.25mm' }
  ]
};

export const screwMaterialInfo = {
  stainlessSteel: {
    name: 'Stainless Steel (A2/304)',
    properties: ['Corrosion resistant', 'Non-magnetic', 'Good for outdoor use'],
    strength: 'Grade 70 (700 N/mm²)'
  },
  blackOxide: {
    name: 'Black Oxide Steel',
    properties: ['Mild corrosion resistance', 'Aesthetic black finish', 'Good for indoor use'],
    strength: 'Grade 8.8 or 10.9'
  },
  zincPlated: {
    name: 'Zinc Plated Steel',
    properties: ['Good corrosion resistance', 'Economical', 'Bright finish'],
    strength: 'Grade 8.8 typical'
  },
  titanium: {
    name: 'Titanium',
    properties: ['Lightweight', 'Excellent corrosion resistance', 'High strength-to-weight'],
    strength: 'Grade 5 (Ti-6Al-4V)'
  }
};

export const screwStrengthGrades = [
  { grade: '4.6', tensileStrength: '400 N/mm²', yieldStrength: '240 N/mm²', application: 'Light duty' },
  { grade: '8.8', tensileStrength: '800 N/mm²', yieldStrength: '640 N/mm²', application: 'General purpose' },
  { grade: '10.9', tensileStrength: '1000 N/mm²', yieldStrength: '900 N/mm²', application: 'High strength' },
  { grade: '12.9', tensileStrength: '1200 N/mm²', yieldStrength: '1080 N/mm²', application: 'Ultra high strength' }
];
