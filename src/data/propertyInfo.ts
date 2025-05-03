export interface PropertyInfo {
  id: string;
  title: string;
  description: string;
  measurement: string;
  importance: string;
  tips?: string[];
}

export const propertyInfoData: Record<string, PropertyInfo> = {
  // Material Properties
  toughness: {
    id: 'toughness',
    title: 'Toughness',
    description: 'Toughness measures the ability of a material to absorb energy and plastically deform without fracturing. In 3D printing, it relates to how well a printed part can withstand sudden impacts or forces.',
    measurement: 'Measured in kJ/m² (kilojoules per square meter) using impact testing methods like Charpy or Izod tests. Higher values indicate better impact resistance.',
    importance: 'Toughness is crucial for parts that may experience impacts, drops, or sudden loads. Materials with higher toughness are less likely to crack or shatter when subjected to shock.',
    tips: [
      'For functional parts that may be dropped, choose materials with toughness values above 30 kJ/m²',
      'TPU and flexible materials typically have the highest toughness values',
      'Toughness generally decreases as materials become stiffer',
      'Consider layer adhesion (Z-axis toughness) for load-bearing applications'
    ]
  },
  strength: {
    id: 'strength',
    title: 'Strength',
    description: 'Bending strength (flexural strength) measures the maximum stress a material can withstand before breaking when subjected to bending forces. This is particularly relevant for 3D printed parts that may experience flexing in use.',
    measurement: 'Measured in MPa (megapascals) using three-point or four-point bend tests. Higher values indicate greater resistance to bending forces.',
    importance: 'Critical for structural components, brackets, and any parts that experience bending loads. Higher strength materials are suitable for load-bearing applications.',
    tips: [
      'Fiber-reinforced materials (CF, GF) typically have the highest strength values',
      'Print orientation significantly affects strength - align layers with expected stress directions',
      'Post-processing like annealing can improve strength for some materials',
      'Consider both XY and Z-axis strength for complete part evaluation'
    ]
  },
  stiffness: {
    id: 'stiffness',
    title: 'Stiffness',
    description: 'Stiffness (bending modulus or flexural modulus) measures how much a material resists deformation under load. It indicates how rigid or flexible a material is.',
    measurement: 'Measured in MPa (megapascals) using flexural testing. Higher values indicate a stiffer material that deforms less under load.',
    importance: 'Essential for parts requiring dimensional stability and minimal deflection under load. Stiff materials maintain their shape better but may be more brittle.',
    tips: [
      'Carbon fiber and glass fiber reinforced materials offer the highest stiffness',
      'High stiffness is important for precision parts and structural components',
      'Balance stiffness with toughness based on application requirements',
      'Consider thermal expansion when high stiffness is required'
    ]
  },
  layerAdhesion: {
    id: 'layerAdhesion',
    title: 'Layer Adhesion',
    description: 'Layer adhesion measures how well successive layers bond to each other during 3D printing. This Z-axis strength is often the weakest point in FDM printed parts.',
    measurement: 'Measured as impact strength in the Z direction (kJ/m²). Higher values indicate better interlayer bonding and more isotropic part properties.',
    importance: 'Critical for functional parts that experience forces perpendicular to print layers. Poor layer adhesion leads to delamination and part failure.',
    tips: [
      'Higher printing temperatures generally improve layer adhesion',
      'Slower print speeds allow better layer bonding',
      'Enclosed printers help maintain consistent temperatures for better adhesion',
      'Some materials like PETG naturally have excellent layer adhesion'
    ]
  },
  heatResistance: {
    id: 'heatResistance',
    title: 'Heat Resistance',
    description: 'Heat resistance indicates the maximum temperature a material can withstand before significant deformation occurs. Measured as Heat Deflection Temperature (HDT) under specified load.',
    measurement: 'Measured in °C using standardized HDT tests at 0.45 MPa load. This represents the temperature at which the material deflects by a specific amount under load.',
    importance: 'Crucial for parts exposed to elevated temperatures or used in heated environments. Determines suitable applications for each material.',
    tips: [
      'High-performance materials like PC, PPS, and PEEK offer the best heat resistance',
      'Annealing can improve heat resistance for some materials',
      'Consider both HDT and glass transition temperature for complete thermal characterization',
      'Parts may need to be designed with thermal expansion in mind'
    ]
  },
  waterAbsorption: {
    id: 'waterAbsorption',
    title: 'Water Absorption',
    description: 'Water absorption measures how much moisture a material absorbs from the environment. This affects dimensional stability, mechanical properties, and print quality.',
    measurement: 'Measured as percentage weight gain at 25°C and 55% relative humidity. Lower values indicate better moisture resistance.',
    importance: 'High water absorption can lead to dimensional changes, warping, and degraded mechanical properties. Critical for outdoor applications or humid environments.',
    tips: [
      'Nylon materials have high water absorption and require careful storage',
      'PET, PETG, and PPS have excellent moisture resistance',
      'Store hygroscopic filaments with desiccant when not in use',
      'Dry filaments before printing for best results'
    ]
  },
  
  // Pre-printing Properties
  drying: {
    id: 'drying',
    title: 'Dry Out Before Use',
    description: 'Indicates whether filament drying is required or optional before printing. Many materials absorb moisture from the air, which can cause print defects.',
    measurement: 'Classified as "Required" or "Optional" based on material hygroscopicity and sensitivity to moisture during printing.',
    importance: 'Proper drying prevents steam bubbles, stringing, poor layer adhesion, and surface defects caused by moisture vaporization during extrusion.',
    tips: [
      'Always dry nylon, TPU, and PC materials before use',
      'Even "optional" materials benefit from drying in humid environments',
      'Use a filament dryer or food dehydrator for best results',
      'Store opened spools with desiccant to minimize moisture absorption'
    ]
  },
  dryingCondition: {
    id: 'dryingCondition',
    title: 'Drying Condition',
    description: 'Specifies the recommended temperature and duration for drying filament before printing. Different materials require different drying parameters.',
    measurement: 'Temperature in °C and time in hours for both blast drying ovens and heated print beds.',
    importance: 'Proper drying conditions ensure complete moisture removal without degrading the material. Too low temperature or short duration leaves moisture, while excessive heat can damage the filament.',
    tips: [
      'Use dedicated filament dryers for best results',
      'Heated bed drying takes longer but is gentler on materials',
      'Monitor drying progress by checking print quality improvements',
      'Some materials can be dried directly in the AMS unit'
    ]
  },
  amsCompatibility: {
    id: 'amsCompatibility',
    title: 'AMS Compatibility',
    description: 'Indicates material compatibility with Bambu Lab\'s Automatic Material System (AMS) and recommended nozzle specifications.',
    measurement: 'Specifies compatible nozzle sizes and materials (standard or hardened steel) required for each filament type.',
    importance: 'Ensures proper material feeding and prevents nozzle wear. Some materials require specific nozzle types to prevent clogging or excessive wear.',
    tips: [
      'Abrasive materials (CF, GF) require hardened steel nozzles',
      'Flexible materials may have limited AMS compatibility',
      'Check nozzle wear regularly when using abrasive filaments',
      'Some materials work better with larger nozzle diameters'
    ]
  },
  
  // Printer Settings
  nozzleSize: {
    id: 'nozzleSize',
    title: 'Nozzle Size/Material',
    description: 'Specifies compatible nozzle sizes and required nozzle materials for each filament type. Different materials have different requirements for optimal printing.',
    measurement: 'Nozzle diameter in mm and material type (brass, hardened steel, stainless steel).',
    importance: 'Using the correct nozzle prevents wear, clogging, and ensures optimal print quality. Abrasive filaments require hardened nozzles.',
    tips: [
      'Use hardened steel nozzles for carbon fiber or glass fiber filled materials',
      'Larger nozzles (0.6mm+) work better with filled materials',
      'Brass nozzles offer better thermal conductivity for standard materials',
      'Consider nozzle wear when printing abrasive materials continuously'
    ]
  },
  buildPlate: {
    id: 'buildPlate',
    title: 'Build Plate & Bed Temp',
    description: 'Recommended build plate types and their optimal temperature ranges for each material. Different surfaces provide varying levels of adhesion.',
    measurement: 'Build plate type (Cool Plate, PEI, etc.) with temperature range in °C.',
    importance: 'Proper build plate selection and temperature ensure good first layer adhesion without warping or difficulty removing prints.',
    tips: [
      'PEI plates offer excellent adhesion for most materials',
      'Textured plates help with part removal but may affect surface finish',
      'Cool Plate with SuperTack is ideal for low-temperature materials',
      'Always wait for the bed to cool before removing prints'
    ]
  },
  adhesionMethods: {
    id: 'adhesionMethods',
    title: 'Adhesion Methods',
    description: 'Recommended adhesion aids for ensuring proper bed adhesion during printing. Different materials require different adhesion solutions.',
    measurement: 'Types of adhesion aids recommended (glue stick, liquid glue, none).',
    importance: 'Proper adhesion prevents warping, lifting, and print failures, especially for materials prone to warping like ABS and Nylon.',
    tips: [
      'Apply adhesives in thin, even layers',
      'Clean the build plate between prints for consistent adhesion',
      'Some materials like PETG may bond too strongly to certain surfaces',
      'Reapply adhesives as needed when adhesion decreases'
    ]
  },
  enclosure: {
    id: 'enclosure',
    title: 'Print with Enclosure',
    description: 'Indicates whether an enclosed printing environment is required or optional for successful printing.',
    measurement: 'Classified as "Required" or "Optional" based on material warping tendency and temperature requirements.',
    importance: 'Enclosures maintain consistent temperature, reduce warping, and improve layer adhesion for temperature-sensitive materials.',
    tips: [
      'ABS, ASA, PC, and Nylon typically require enclosures',
      'Enclosures help even with "optional" materials in drafty environments',
      'Ensure adequate ventilation when printing certain materials',
      'Monitor chamber temperature for optimal results'
    ]
  },
  printSpeed: {
    id: 'printSpeed',
    title: 'Print Speed',
    description: 'Maximum recommended printing speed for each material. Speed affects print quality, layer adhesion, and overall success rate.',
    measurement: 'Speed in mm/s for optimal print quality.',
    importance: 'Printing too fast can cause poor layer adhesion, stringing, and reduced part strength. Each material has an optimal speed range.',
    tips: [
      'Reduce speed for better quality on detailed parts',
      'Flexible materials require slower speeds',
      'First layer should always be printed slower',
      'High-temperature materials may need reduced speeds'
    ]
  },
  nozzleTemp: {
    id: 'nozzleTemp',
    title: 'Nozzle Temperature',
    description: 'Recommended temperature range for the printer nozzle. This affects material flow, layer adhesion, and print quality.',
    measurement: 'Temperature range in °C for optimal extrusion.',
    importance: 'Correct nozzle temperature ensures proper material flow and layer bonding. Too low causes under-extrusion, too high causes stringing and degradation.',
    tips: [
      'Start at the middle of the recommended range',
      'Increase temperature if you see poor layer adhesion',
      'Decrease temperature if you experience stringing',
      'Different colors of the same material may need slight temperature adjustments'
    ]
  },
  partCooling: {
    id: 'partCooling',
    title: 'Part Cooling Fan',
    description: 'Recommended cooling fan speed range during printing. Cooling affects layer adhesion, warping, and detail resolution.',
    measurement: 'Fan speed as percentage (0-100%) of maximum cooling capacity.',
    importance: 'Proper cooling prevents overheating and improves overhang performance, but too much cooling can reduce layer adhesion.',
    tips: [
      'PLA typically needs high cooling for best results',
      'ABS and ASA need minimal cooling to prevent warping',
      'Reduce cooling for better layer adhesion on functional parts',
      'Increase cooling for better bridging and overhangs'
    ]
  },
  
  // Post-printing
  desiccant: {
    id: 'desiccant',
    title: 'Seal with Desiccant',
    description: 'Indicates whether the material should be stored with desiccant after opening to prevent moisture absorption.',
    measurement: 'Classified as "Required" or "Optional" based on material hygroscopicity.',
    importance: 'Proper storage prevents moisture absorption, which can degrade print quality and material properties over time.',
    tips: [
      'Use airtight containers with fresh desiccant',
      'Replace desiccant when color indicator changes',
      'Consider vacuum storage bags for long-term storage',
      'Even "optional" materials benefit from desiccant storage in humid climates'
    ]
  },
  annealing: {
    id: 'annealing',
    title: 'Annealing',
    description: 'Post-processing heat treatment to improve mechanical properties and dimensional stability of printed parts.',
    measurement: 'Temperature range in °C and duration in hours for optimal annealing.',
    importance: 'Annealing can significantly improve strength, heat resistance, and reduce internal stresses in printed parts.',
    tips: [
      'Parts will shrink during annealing - account for this in design',
      'Use controlled cooling to prevent warping',
      'Not all materials benefit from annealing',
      'Monitor temperature carefully to avoid melting or excessive deformation'
    ]
  }
};
