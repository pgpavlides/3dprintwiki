export interface Hardware {
  id: string
  name: string
  description: string
  uses: string[]
  category: string
  subcategory: string
  specifications?: string[]
  recommended?: boolean
  image?: string
  relatedItems?: string[]
  buyingTips?: string[]
}

export const hardwareData: Hardware[] = [
  // Fasteners - Screws
  {
    id: 'm3-screws',
    name: 'M3 Screw Assortment',
    description: 'Common metric screws used in 3D printers and printed projects',
    uses: ['Printer assembly', 'Project assembly', 'Repairs', 'Modifications'],
    specifications: [
      'M3 x 6mm to 30mm lengths',
      'Thread diameter: 3mm',
      'Thread pitch: 0.5mm standard',
      'Head diameter: 5.5mm (socket), 5.7mm (button)',
      'Socket size: 2.5mm hex',
      'Socket head cap screws (SHCS)',
      'Stainless steel or black oxide finish'
    ],
    category: 'fasteners',
    subcategory: 'screws',
    recommended: true,
    buyingTips: ['Buy in assortment kits', 'Stainless steel for corrosion resistance', 'Black oxide for aesthetics']
  },
  {
    id: 'm4-screws',
    name: 'M4 Screw Assortment',
    description: 'Larger metric screws for structural assemblies and frame connections',
    uses: ['Frame assembly', 'Structural connections', 'Heavy-duty applications', 'Printer frames'],
    specifications: [
      'M4 x 8mm to 40mm lengths',
      'Thread diameter: 4mm',
      'Thread pitch: 0.7mm standard',
      'Head diameter: 7mm (socket), 7.6mm (button)',
      'Socket size: 3mm hex',
      'Socket head and button head options',
      'Steel with zinc plating or stainless'
    ],
    category: 'fasteners',
    subcategory: 'screws',
    recommended: true
  },
  {
    id: 'm5-screws',
    name: 'M5 Screw Assortment',
    description: 'Heavy-duty screws for frame construction and load-bearing assemblies',
    uses: ['Frame construction', 'Load-bearing joints', 'Heavy assemblies', 'Structural support'],
    specifications: [
      'M5 x 8mm to 50mm lengths',
      'Thread diameter: 5mm',
      'Thread pitch: 0.8mm standard',
      'Head diameter: 8.5mm (socket), 9.5mm (button)',
      'Socket size: 4mm hex',
      'Various head types available',
      'High-strength steel grade 8.8 or 10.9'
    ],
    category: 'fasteners',
    subcategory: 'screws'
  },
  {
    id: 'm2-screws',
    name: 'M2 Screw Assortment',
    description: 'Small screws for electronics, sensors, and delicate components',
    uses: ['Electronics mounting', 'PCB assembly', 'Small components', 'Sensor mounting'],
    specifications: [
      'M2 x 4mm to 20mm lengths',
      'Thread diameter: 2mm',
      'Thread pitch: 0.4mm standard',
      'Head diameter: 3.8mm (socket), 3.5mm (button)',
      'Socket size: 1.5mm hex',
      'Phillips and socket heads available',
      'Stainless steel or black oxide finish'
    ],
    category: 'fasteners',
    subcategory: 'screws',
    recommended: true
  },
  {
    id: 'm6-screws',
    name: 'M6 Screw Assortment',
    description: 'Medium-large screws for heavy-duty structural applications',
    uses: ['Heavy frame construction', 'Industrial machinery', 'Structural joints', 'Large format printers'],
    specifications: [
      'M6 x 10mm to 60mm lengths',
      'Thread diameter: 6mm',
      'Thread pitch: 1.0mm standard',
      'Head diameter: 10mm (socket), 10.5mm (button)',
      'Socket size: 5mm hex',
      'Socket head and hex head options',
      'High-strength steel grade 8.8 or 10.9'
    ],
    category: 'fasteners',
    subcategory: 'screws',
    recommended: true
  },
  {
    id: 'm8-screws',
    name: 'M8 Screw Assortment',
    description: 'Large screws for heavy machinery and structural applications',
    uses: ['Heavy machinery', 'Large CNC frames', 'Industrial equipment', 'Structural steel'],
    specifications: [
      'M8 x 12mm to 80mm lengths',
      'Thread diameter: 8mm',
      'Thread pitch: 1.25mm standard',
      'Head diameter: 13mm (socket), 14mm (button)',
      'Socket size: 6mm hex',
      'Various head types available',
      'High-strength steel grade 8.8 or 10.9'
    ],
    category: 'fasteners',
    subcategory: 'screws'
  },
  {
    id: 'm10-screws',
    name: 'M10 Screw Assortment',
    description: 'Extra large screws for heavy industrial applications',
    uses: ['Heavy industrial machinery', 'Large structural connections', 'Bridge construction', 'Heavy equipment'],
    specifications: [
      'M10 x 16mm to 100mm lengths',
      'Thread diameter: 10mm',
      'Thread pitch: 1.5mm standard',
      'Head diameter: 16mm (socket), 17mm (button)',
      'Socket size: 8mm hex',
      'Hex head and socket head options',
      'High-strength steel grade 8.8, 10.9, or 12.9'
    ],
    category: 'fasteners',
    subcategory: 'screws'
  },
  {
    id: 'self-tapping-screws',
    name: 'Self-Tapping Screws',
    description: 'Screws that create their own threads in plastic and soft materials',
    uses: ['Direct plastic assembly', 'Sheet metal work', 'Quick assembly', 'Repair work'],
    specifications: [
      'Common sizes: M2.2, M2.6, M3.5',
      'Thread type: Type A (sharp), Type B (blunt)',
      'Length range: 6mm to 25mm',
      'Head types: Pan, flat, countersunk',
      'Phillips or Torx drive',
      'Hardened steel with zinc plating',
      'Sharp threads for cutting into material'
    ],
    category: 'fasteners',
    subcategory: 'screws'
  },
  {
    id: 'm1-6-screws',
    name: 'M1.6 Miniature Screws',
    description: 'Ultra-small screws for miniature electronics and precision devices',
    uses: ['Micro electronics', 'Watch repair', 'Precision instruments', 'Small RC components'],
    specifications: [
      'M1.6 x 2mm to 10mm lengths',
      'Thread diameter: 1.6mm',
      'Thread pitch: 0.35mm standard',
      'Head diameter: 3mm (pan), 2.5mm (button)',
      'Socket size: 1.27mm hex or Phillips',
      'Precision machined',
      'Stainless steel construction'
    ],
    category: 'fasteners',
    subcategory: 'screws'
  },
  {
    id: 'm2-5-screws',
    name: 'M2.5 Screw Assortment',
    description: 'In-between size screws for electronics and small mechanical assemblies',
    uses: ['Electronics enclosures', 'Small sensors', 'Raspberry Pi mounting', 'Light duty assemblies'],
    specifications: [
      'M2.5 x 4mm to 20mm lengths',
      'Thread diameter: 2.5mm',
      'Thread pitch: 0.45mm standard',
      'Head diameter: 4.5mm (socket), 4.7mm (button)',
      'Socket size: 2mm hex',
      'Common in electronics',
      'Stainless steel or nickel plated'
    ],
    category: 'fasteners',
    subcategory: 'screws',
    recommended: true
  },

  // Fasteners - Nuts
  {
    id: 'hex-nuts',
    name: 'Hex Nut Assortment',
    description: 'Standard hex nuts in various metric sizes for general assembly',
    uses: ['General assembly', 'Securing bolts', 'Mechanical connections', 'Repairs'],
    specifications: ['M2 to M8 sizes', 'Steel with zinc plating', 'DIN 934 standard'],
    category: 'fasteners',
    subcategory: 'nuts',
    recommended: true
  },
  {
    id: 'nyloc-nuts',
    name: 'Nyloc Nuts (Lock Nuts)',
    description: 'Self-locking nuts with nylon insert to prevent loosening from vibration',
    uses: ['Vibration resistance', 'Secure connections', 'Moving parts', 'Critical assemblies'],
    specifications: ['M3 to M8 sizes', 'Nylon insert', 'Zinc-plated steel'],
    category: 'fasteners',
    subcategory: 'nuts',
    recommended: true
  },
  {
    id: 'wing-nuts',
    name: 'Wing Nuts',
    description: 'Hand-tightened nuts for quick assembly and adjustment',
    uses: ['Tool-free adjustment', 'Temporary fixtures', 'Quick release', 'Bed leveling'],
    specifications: ['M3 to M6 sizes', 'Steel or brass', 'Large wings for grip'],
    category: 'fasteners',
    subcategory: 'nuts'
  },
  {
    id: 'flange-nuts',
    name: 'Flange Nuts',
    description: 'Nuts with integrated washer flange for better load distribution',
    uses: ['High-stress applications', 'Soft material assembly', 'Better clamping', 'Frame assembly'],
    specifications: ['M3 to M8 sizes', 'Serrated flange', 'Steel construction'],
    category: 'fasteners',
    subcategory: 'nuts'
  },

  // Fasteners - Washers
  {
    id: 'flat-washers',
    name: 'Flat Washer Assortment',
    description: 'Standard flat washers for load distribution and surface protection',
    uses: ['Load distribution', 'Surface protection', 'Spacing', 'Assembly'],
    specifications: ['M2 to M8 sizes', 'DIN 125 standard', 'Stainless steel'],
    category: 'fasteners',
    subcategory: 'washers',
    recommended: true
  },
  {
    id: 'spring-washers',
    name: 'Spring Washers',
    description: 'Split lock washers to prevent loosening under vibration',
    uses: ['Vibration resistance', 'Prevent loosening', 'Dynamic loads', 'Critical joints'],
    specifications: ['M3 to M8 sizes', 'Spring steel', 'Split design'],
    category: 'fasteners',
    subcategory: 'washers',
    recommended: true
  },
  {
    id: 'fender-washers',
    name: 'Fender Washers',
    description: 'Large diameter washers for extra load distribution',
    uses: ['Large hole coverage', 'Soft material support', 'Load spreading', 'Oversized holes'],
    specifications: ['Large outer diameter', 'M3 to M8 inner hole', 'Zinc plated steel'],
    category: 'fasteners',
    subcategory: 'washers'
  },

  // Fasteners - Threaded Inserts
  {
    id: 'brass-inserts',
    name: 'Brass Threaded Inserts',
    description: 'Heat-set threaded inserts for creating strong, reusable threads in 3D printed parts',
    uses: ['Create durable threads', 'Reusable screw holes', 'Stronger assemblies', 'Professional finish'],
    specifications: ['M2, M2.5, M3, M4, M5 sizes', 'Heat-set installation', 'Knurled exterior for grip'],
    category: 'fasteners',
    subcategory: 'threaded-inserts',
    recommended: true,
    buyingTips: ['Buy variety pack for different sizes', 'Ensure soldering iron compatibility', 'Check knurl pattern for your material']
  },
  {
    id: 'helical-inserts',
    name: 'Helical Thread Inserts',
    description: 'Coiled wire thread inserts for thread repair and reinforcement',
    uses: ['Thread repair', 'Strengthen threads', 'Metal assemblies', 'High-strength applications'],
    specifications: ['Stainless steel wire', 'Various thread sizes', 'Requires installation tool'],
    category: 'fasteners',
    subcategory: 'threaded-inserts'
  },
  {
    id: 'press-fit-inserts',
    name: 'Press-Fit Inserts',
    description: 'Mechanical press-in inserts for plastics and soft materials',
    uses: ['Cold installation', 'Production assemblies', 'No heat required', 'Consistent installation'],
    specifications: ['Barbed exterior', 'Various sizes', 'Brass or steel'],
    category: 'fasteners',
    subcategory: 'threaded-inserts'
  },

  // Fasteners - Extrusion Hardware
  {
    id: 't-nuts',
    name: 'T-Nuts for 2020/3030 Extrusion',
    description: 'Sliding T-nuts for aluminum extrusion assembly and modifications',
    uses: ['Extrusion assembly', 'Frame modifications', 'Mounting accessories', 'Adjustable connections'],
    specifications: ['M3, M4, M5 thread sizes', 'Drop-in and slide-in types', 'Steel construction'],
    category: 'fasteners',
    subcategory: 'extrusion-hardware',
    recommended: true
  },
  {
    id: 'corner-brackets',
    name: 'Corner Brackets',
    description: 'Right-angle brackets for joining aluminum extrusions',
    uses: ['Frame corners', '90-degree joints', 'Structural reinforcement', 'Frame assembly'],
    specifications: ['Cast aluminum', 'Various sizes for 2020/3030/4040', 'Includes mounting hardware'],
    category: 'fasteners',
    subcategory: 'extrusion-hardware',
    recommended: true
  },
  {
    id: 'drop-in-nuts',
    name: 'Drop-In T-Nuts',
    description: 'Spring-loaded T-nuts that can be inserted anywhere in the extrusion',
    uses: ['Post-assembly additions', 'Retrofitting', 'Quick modifications', 'Flexible mounting'],
    specifications: ['Spring-loaded ball', 'M3, M4, M5 threads', 'Steel construction'],
    category: 'fasteners',
    subcategory: 'extrusion-hardware'
  },

  // Motion Components - Bearings
  {
    id: 'lm8uu-bearings',
    name: 'Linear Bearings (LM8UU)',
    description: 'Linear ball bearings for smooth motion on 8mm rods',
    uses: ['Linear motion', 'Printer upgrades', 'CNC projects', 'Smooth movement'],
    specifications: ['8mm bore', 'Standard LM8UU dimensions', 'Chrome steel balls'],
    category: 'motion-components',
    subcategory: 'bearings',
    recommended: true
  },
  {
    id: '608-bearings',
    name: '608 Bearings',
    description: 'Common skateboard bearings used in many 3D printer designs',
    uses: ['Spool holders', 'Idler pulleys', 'Rotary motion', 'V-slot wheels'],
    specifications: ['8mm bore, 22mm OD, 7mm width', 'ABEC rated', 'Sealed design'],
    category: 'motion-components',
    subcategory: 'bearings',
    recommended: true
  },
  {
    id: '625-bearings',
    name: '625 Bearings',
    description: 'Small precision bearings for idler pulleys and small assemblies',
    uses: ['Idler pulleys', 'Small mechanisms', 'Belt tensioners', 'Precision applications'],
    specifications: ['5mm bore, 16mm OD, 5mm width', 'Sealed 2RS', 'Chrome steel'],
    category: 'motion-components',
    subcategory: 'bearings'
  },
  {
    id: 'thrust-bearings',
    name: 'Thrust Bearings',
    description: 'Bearings designed for axial loads',
    uses: ['Z-axis support', 'Rotary tables', 'Axial load applications', 'Turntables'],
    specifications: ['Various sizes', 'Ball or roller type', 'Steel construction'],
    category: 'motion-components',
    subcategory: 'bearings'
  },
  {
    id: 'flanged-bearings',
    name: 'Flanged Bearings',
    description: 'Bearings with integrated flange for easy mounting',
    uses: ['Direct mounting', 'Pulley systems', 'Guide wheels', 'Belt tensioners'],
    specifications: ['Various sizes', 'Integrated flange', 'Sealed design'],
    category: 'motion-components',
    subcategory: 'bearings'
  },

  // Motion Components - Linear Rails
  {
    id: 'mgn12-rails',
    name: 'MGN12 Linear Rails',
    description: 'Precision linear rails for high-accuracy motion systems',
    uses: ['CoreXY printers', 'High-precision motion', 'CNC machines', 'Upgrade projects'],
    specifications: ['12mm width', 'Hardened steel', 'Preload adjustable'],
    category: 'motion-components',
    subcategory: 'linear-rails',
    recommended: true
  },
  {
    id: 'smooth-rods-8mm',
    name: '8mm Precision Smooth Rods',
    description: 'Hardened steel rods for linear motion systems',
    uses: ['Linear guides', 'Motion systems', 'Printer frames', 'Precision alignment'],
    specifications: ['8mm diameter', 'Chrome plated', 'H6 tolerance'],
    category: 'motion-components',
    subcategory: 'linear-rails',
    recommended: true
  },
  {
    id: 'sbr-rails',
    name: 'SBR Supported Rails',
    description: 'Fully supported linear rails for heavy-duty applications',
    uses: ['Heavy loads', 'CNC routers', 'Large format printers', 'Industrial applications'],
    specifications: ['Various sizes', 'Full support', 'Open bearing blocks'],
    category: 'motion-components',
    subcategory: 'linear-rails'
  },

  // Motion Components - Lead Screws
  {
    id: 'lead-screws-t8',
    name: 'T8 Lead Screws with Nuts',
    description: 'Trapezoidal lead screws for linear motion in Z-axis',
    uses: ['Z-axis motion', 'Linear actuators', 'Precise positioning', 'Heavy lifting'],
    specifications: ['8mm diameter', '2mm or 8mm pitch', 'Brass nuts included'],
    category: 'motion-components',
    subcategory: 'lead-screws',
    recommended: true
  },
  {
    id: 'anti-backlash-nuts',
    name: 'Anti-Backlash Nuts',
    description: 'Spring-loaded nuts to eliminate backlash in lead screws',
    uses: ['Precision positioning', 'CNC applications', 'Z-axis accuracy', 'Backlash elimination'],
    specifications: ['Spring preload', 'Brass construction', 'T8 compatible'],
    category: 'motion-components',
    subcategory: 'lead-screws',
    recommended: true
  },
  {
    id: 'ball-screws',
    name: 'Ball Screws',
    description: 'High-precision screws with recirculating ball nuts',
    uses: ['High-precision CNC', 'Industrial automation', 'High-speed motion', 'Low friction'],
    specifications: ['Various diameters', 'Precision ground', 'Preloaded nuts'],
    category: 'motion-components',
    subcategory: 'lead-screws'
  },

  // Motion Components - Couplers
  {
    id: 'flexible-couplers',
    name: 'Flexible Shaft Couplers',
    description: 'Flexible couplings for connecting motor shafts to lead screws',
    uses: ['Z-axis coupling', 'Motor connections', 'Misalignment compensation', 'Vibration dampening'],
    specifications: ['5mm to 8mm', 'Aluminum with rubber spider', 'Various sizes available'],
    category: 'motion-components',
    subcategory: 'couplers',
    recommended: true
  },
  {
    id: 'rigid-couplers',
    name: 'Rigid Shaft Couplers',
    description: 'Solid couplers for precise shaft alignment',
    uses: ['Precise alignment', 'High torque', 'No backlash', 'Direct drive'],
    specifications: ['Aluminum construction', 'Set screw locking', 'Various bore sizes'],
    category: 'motion-components',
    subcategory: 'couplers'
  },
  {
    id: 'oldham-couplers',
    name: 'Oldham Couplers',
    description: 'Three-piece couplers for parallel misalignment compensation',
    uses: ['Parallel misalignment', 'Zero backlash', 'Precision motion', 'Servo applications'],
    specifications: ['Three-piece design', 'Various sizes', 'Aluminum or plastic'],
    category: 'motion-components',
    subcategory: 'couplers'
  },

  // Motion Components - Pulleys & Belts
  {
    id: 'gt2-belts',
    name: 'GT2 Timing Belts',
    description: 'Reinforced rubber timing belts for precise motion control',
    uses: ['Motion systems', 'Printer upgrades', 'CNC machines', 'Precise positioning'],
    specifications: ['2mm pitch', '6mm width standard', 'Fiberglass reinforced'],
    category: 'motion-components',
    subcategory: 'pulleys-belts',
    recommended: true
  },
  {
    id: 'gt2-pulleys',
    name: 'GT2 Timing Pulleys',
    description: 'Aluminum timing pulleys for GT2 belts',
    uses: ['Belt drive systems', 'Motion control', 'Printer upgrades', 'Power transmission'],
    specifications: ['20 tooth standard', '5mm bore', 'Aluminum construction'],
    category: 'motion-components',
    subcategory: 'pulleys-belts',
    recommended: true
  },
  {
    id: 'idler-pulleys',
    name: 'Idler Pulleys',
    description: 'Smooth or toothed idler pulleys for belt routing',
    uses: ['Belt tensioning', 'Belt routing', 'Direction changes', 'Tension systems'],
    specifications: ['Various sizes', 'With or without teeth', 'Bearing mounted'],
    category: 'motion-components',
    subcategory: 'pulleys-belts',
    recommended: true
  },
  {
    id: 'belt-tensioners',
    name: 'Belt Tensioners',
    description: 'Adjustable tensioning systems for timing belts',
    uses: ['Belt tension adjustment', 'Maintenance', 'Performance tuning', 'Vibration reduction'],
    specifications: ['Spring loaded or manual', 'Various designs', 'Mounting hardware included'],
    category: 'motion-components',
    subcategory: 'pulleys-belts'
  },

  // Electronics - Motors
  {
    id: 'nema17-steppers',
    name: 'NEMA 17 Stepper Motors',
    description: 'Standard stepper motors for 3D printer motion control',
    uses: ['X/Y/Z axis motion', 'Extruder drive', 'CNC machines', 'Automation projects'],
    specifications: ['1.8° step angle', '1.5A-2A rating', '40-50 N⋅cm holding torque'],
    category: 'electronics',
    subcategory: 'motors',
    recommended: true
  },
  {
    id: 'nema14-steppers',
    name: 'NEMA 14 Stepper Motors',
    description: 'Compact stepper motors for small printers and extruders',
    uses: ['Compact printers', 'Direct drive extruders', 'Small CNC', 'Space-limited applications'],
    specifications: ['1.8° step angle', '0.8A-1.2A rating', 'Smaller footprint'],
    category: 'electronics',
    subcategory: 'motors'
  },
  {
    id: 'nema23-steppers',
    name: 'NEMA 23 Stepper Motors',
    description: 'High-torque stepper motors for large format printers',
    uses: ['Large printers', 'CNC routers', 'High-torque applications', 'Heavy loads'],
    specifications: ['1.8° step angle', '2.8A-4.2A rating', 'High torque output'],
    category: 'electronics',
    subcategory: 'motors'
  },
  {
    id: 'servo-motors',
    name: 'Servo Motors',
    description: 'Closed-loop servo motors for precise positioning',
    uses: ['High-precision motion', 'Closed-loop control', 'Industrial applications', 'Fast positioning'],
    specifications: ['Integrated encoder', 'Various sizes', 'High accuracy'],
    category: 'electronics',
    subcategory: 'motors'
  },

  // Electronics - Controllers
  {
    id: 'control-boards',
    name: '3D Printer Control Boards',
    description: 'Main control boards for 3D printers (SKR, Duet, etc.)',
    uses: ['Printer control', 'Motion coordination', 'Temperature management', 'User interface'],
    specifications: ['32-bit processors', 'Multiple stepper drivers', 'Various connectivity options'],
    category: 'electronics',
    subcategory: 'controllers',
    recommended: true
  },
  {
    id: 'stepper-drivers',
    name: 'Stepper Motor Drivers',
    description: 'TMC2209, A4988, and other stepper driver modules',
    uses: ['Motor control', 'Current regulation', 'Microstepping', 'Silent operation'],
    specifications: ['Various models', 'Plug-in modules', 'Different current ratings'],
    category: 'electronics',
    subcategory: 'controllers',
    recommended: true
  },
  {
    id: 'raspberry-pi',
    name: 'Raspberry Pi',
    description: 'Single-board computer for OctoPrint and printer control',
    uses: ['Remote control', 'Web interface', 'Camera monitoring', 'Plugin support'],
    specifications: ['Various models', 'WiFi capable', 'Multiple USB ports'],
    category: 'electronics',
    subcategory: 'controllers',
    recommended: true
  },

  // Electronics - Sensors
  {
    id: 'endstops',
    name: 'Mechanical Endstops',
    description: 'Limit switches for homing and position detection',
    uses: ['Axis homing', 'Position limits', 'Safety stops', 'Calibration'],
    specifications: ['Microswitch based', 'NO/NC contacts', 'With PCB mount'],
    category: 'electronics',
    subcategory: 'sensors',
    recommended: true
  },
  {
    id: 'optical-endstops',
    name: 'Optical Endstops',
    description: 'Non-contact optical sensors for position detection',
    uses: ['Precise homing', 'Non-contact sensing', 'High repeatability', 'Dust-sensitive areas'],
    specifications: ['Infrared sensors', 'LED indicators', 'Adjustable sensitivity'],
    category: 'electronics',
    subcategory: 'sensors'
  },
  {
    id: 'thermistors',
    name: 'Thermistors',
    description: 'Temperature sensors for hotend and heated bed monitoring',
    uses: ['Temperature monitoring', 'Hotend sensing', 'Bed temperature', 'Thermal protection'],
    specifications: ['100K NTC', '3950 Beta value', 'Glass bead type'],
    category: 'electronics',
    subcategory: 'sensors',
    recommended: true
  },
  {
    id: 'bl-touch',
    name: 'BLTouch Auto Bed Leveling Sensor',
    description: 'Precision probe for automatic bed leveling',
    uses: ['Auto bed leveling', 'Mesh compensation', 'Z-offset calibration', 'Surface mapping'],
    specifications: ['High accuracy', 'All surface types', 'Smart probe technology'],
    category: 'electronics',
    subcategory: 'sensors',
    recommended: true
  },
  {
    id: 'filament-sensors',
    name: 'Filament Runout Sensors',
    description: 'Sensors to detect filament presence and motion',
    uses: ['Filament detection', 'Runout protection', 'Jam detection', 'Smart printing'],
    specifications: ['Optical or mechanical', 'Various designs', 'Easy integration'],
    category: 'electronics',
    subcategory: 'sensors'
  },

  // Electronics - Heating Elements
  {
    id: 'heater-cartridges',
    name: 'Heater Cartridges',
    description: 'Heating elements for hotend temperature control',
    uses: ['Hotend heating', 'Temperature control', 'Filament melting', 'Part replacement'],
    specifications: ['12V/24V options', '40W standard', '6mm diameter'],
    category: 'electronics',
    subcategory: 'heating-elements',
    recommended: true
  },
  {
    id: 'heated-beds',
    name: 'Heated Bed Assemblies',
    description: 'Complete heated bed systems for 3D printers',
    uses: ['Print adhesion', 'Warping prevention', 'Material compatibility', 'Temperature control'],
    specifications: ['Various sizes', 'Aluminum or PCB', '12V/24V operation'],
    category: 'electronics',
    subcategory: 'heating-elements',
    recommended: true
  },
  {
    id: 'silicone-heaters',
    name: 'Silicone Heating Pads',
    description: 'Flexible silicone heaters for heated beds and chambers',
    uses: ['Bed heating', 'Chamber heating', 'Custom applications', 'Even heat distribution'],
    specifications: ['Various sizes', 'AC or DC powered', 'Adhesive backing'],
    category: 'electronics',
    subcategory: 'heating-elements'
  },

  // Continue with more hardware items...
  // Tools & Accessories - Adhesives
  {
    id: 'thread-locker',
    name: 'Thread Locker',
    description: 'Liquid adhesive to prevent screws from loosening',
    uses: ['Prevent loosening', 'Vibration resistance', 'Critical assemblies', 'Semi-permanent fixing'],
    specifications: ['Blue (removable)', 'Red (permanent)', 'Various strengths'],
    category: 'tools-accessories',
    subcategory: 'adhesives',
    recommended: true
  },
  {
    id: 'super-glue',
    name: 'Cyanoacrylate (Super Glue)',
    description: 'Fast-acting adhesive for quick repairs and bonding',
    uses: ['Quick repairs', 'Small part bonding', 'Emergency fixes', 'Various materials'],
    specifications: ['Various viscosities', 'Fast setting', 'Strong bond'],
    category: 'tools-accessories',
    subcategory: 'adhesives',
    recommended: true
  },
  {
    id: 'epoxy',
    name: '2-Part Epoxy',
    description: 'Strong structural adhesive for permanent bonding',
    uses: ['Structural bonding', 'Gap filling', 'High-strength repairs', 'Mixed material bonding'],
    specifications: ['Various cure times', 'High strength', 'Chemical resistant'],
    category: 'tools-accessories',
    subcategory: 'adhesives'
  },

  // Tools & Accessories - Lubricants
  {
    id: 'ptfe-lubricant',
    name: 'PTFE Dry Lubricant',
    description: 'Dry lubricant for low-friction applications',
    uses: ['Linear rails', 'Lead screws', 'Low dust attraction', 'Clean applications'],
    specifications: ['Dry film', 'PTFE based', 'Temperature resistant'],
    category: 'tools-accessories',
    subcategory: 'lubricants',
    recommended: true
  },
  {
    id: 'white-lithium-grease',
    name: 'White Lithium Grease',
    description: 'Multi-purpose grease for bearings and gears',
    uses: ['Bearing lubrication', 'Gear lubrication', 'Long-lasting protection', 'Water resistant'],
    specifications: ['White lithium base', 'Temperature stable', 'Water resistant'],
    category: 'tools-accessories',
    subcategory: 'lubricants',
    recommended: true
  },
  {
    id: 'silicone-oil',
    name: 'Silicone Oil',
    description: 'High-temperature lubricant for various applications',
    uses: ['High-temp applications', 'Plastic-safe', 'O-ring lubrication', 'Smooth operation'],
    specifications: ['Various viscosities', 'Temperature resistant', 'Non-reactive'],
    category: 'tools-accessories',
    subcategory: 'lubricants'
  },

  // Filament Handling - Extruder Parts
  {
    id: 'drive-gears',
    name: 'Extruder Drive Gears',
    description: 'Precision machined gears for filament feeding',
    uses: ['Filament gripping', 'Consistent feeding', 'Extruder upgrades', 'Better grip'],
    specifications: ['Hardened steel', 'Various tooth patterns', 'Multiple bore sizes'],
    category: 'filament-handling',
    subcategory: 'extruder-parts',
    recommended: true
  },
  {
    id: 'extruder-springs',
    name: 'Extruder Tension Springs',
    description: 'Springs for maintaining proper extruder tension',
    uses: ['Tension adjustment', 'Consistent pressure', 'Filament grip', 'Feed reliability'],
    specifications: ['Various spring rates', 'Stainless steel', 'Compression type'],
    category: 'filament-handling',
    subcategory: 'extruder-parts'
  },

  // Filament Handling - Hotend Parts
  {
    id: 'nozzles',
    name: 'Hotend Nozzles',
    description: 'Various nozzles for different printing applications',
    uses: ['Layer resolution', 'Material compatibility', 'Different print speeds', 'Special applications'],
    specifications: ['0.2mm to 1.0mm', 'Brass, steel, hardened', 'Various materials'],
    category: 'filament-handling',
    subcategory: 'hotend-parts',
    recommended: true
  },
  {
    id: 'heat-breaks',
    name: 'Heat Break Tubes',
    description: 'Thermal barrier tubes for hotend assemblies',
    uses: ['Heat isolation', 'Prevent heat creep', 'All-metal hotends', 'Temperature control'],
    specifications: ['Stainless steel', 'Titanium options', 'PTFE lined or all-metal'],
    category: 'filament-handling',
    subcategory: 'hotend-parts',
    recommended: true
  },
  {
    id: 'heat-blocks',
    name: 'Hotend Heat Blocks',
    description: 'Aluminum blocks for hotend heating elements',
    uses: ['Heat distribution', 'Nozzle mounting', 'Thermistor mounting', 'Heater cartridge housing'],
    specifications: ['Aluminum alloy', 'Various designs', 'Silicone sock compatible'],
    category: 'filament-handling',
    subcategory: 'hotend-parts'
  }
]

// Helper functions
export const getHardwareByCategory = (category: string): Hardware[] => {
  return hardwareData.filter(item => item.category === category)
}

export const getHardwareBySubcategory = (subcategory: string): Hardware[] => {
  return hardwareData.filter(item => item.subcategory === subcategory)
}

export const getRecommendedHardware = (): Hardware[] => {
  return hardwareData.filter(item => item.recommended === true)
}

export const getHardwareById = (id: string): Hardware | undefined => {
  return hardwareData.find(item => item.id === id)
}

export const searchHardware = (searchTerm: string): Hardware[] => {
  const lowercaseSearch = searchTerm.toLowerCase()
  return hardwareData.filter(item => 
    item.name.toLowerCase().includes(lowercaseSearch) ||
    item.description.toLowerCase().includes(lowercaseSearch) ||
    item.uses.some(use => use.toLowerCase().includes(lowercaseSearch)) ||
    (item.specifications && item.specifications.some(spec => spec.toLowerCase().includes(lowercaseSearch)))
  )
}
