export interface HardwareCategory {
  id: string
  name: string
  description: string
  subcategories: HardwareSubcategory[]
}

export interface HardwareSubcategory {
  id: string
  name: string
  description: string
  parentCategory: string
}

export const hardwareCategories: HardwareCategory[] = [
  {
    id: 'fasteners',
    name: 'Fasteners',
    description: 'Screws, nuts, bolts, washers, and other mechanical fastening components',
    subcategories: [
      {
        id: 'screws',
        name: 'Screws',
        description: 'Machine screws, self-tapping screws, and specialty screws in various sizes',
        parentCategory: 'fasteners'
      },
      {
        id: 'nuts',
        name: 'Nuts',
        description: 'Hex nuts, nyloc nuts, wing nuts, and specialized nuts',
        parentCategory: 'fasteners'
      },
      {
        id: 'washers',
        name: 'Washers',
        description: 'Flat washers, lock washers, spring washers, and specialty washers',
        parentCategory: 'fasteners'
      },
      {
        id: 'threaded-inserts',
        name: 'Threaded Inserts',
        description: 'Heat-set brass inserts, helical inserts, and other threaded inserts',
        parentCategory: 'fasteners'
      },
      {
        id: 'bolts',
        name: 'Bolts',
        description: 'Hex bolts, carriage bolts, shoulder bolts, and specialty bolts',
        parentCategory: 'fasteners'
      },
      {
        id: 'extrusion-hardware',
        name: 'Extrusion Hardware',
        description: 'T-nuts, drop-in nuts, corner brackets, and other aluminum extrusion hardware',
        parentCategory: 'fasteners'
      },
      {
        id: 'specialty-fasteners',
        name: 'Specialty Fasteners',
        description: 'Thumb screws, set screws, grub screws, and other specialized fasteners',
        parentCategory: 'fasteners'
      }
    ]
  },
  {
    id: 'motion-components',
    name: 'Motion Components',
    description: 'Components for linear and rotational motion systems',
    subcategories: [
      {
        id: 'bearings',
        name: 'Bearings',
        description: 'Ball bearings, linear bearings, thrust bearings, and specialty bearings',
        parentCategory: 'motion-components'
      },
      {
        id: 'linear-rails',
        name: 'Linear Rails & Guides',
        description: 'Linear rails, guide blocks, smooth rods, and linear rail accessories',
        parentCategory: 'motion-components'
      },
      {
        id: 'lead-screws',
        name: 'Lead Screws & Ball Screws',
        description: 'Lead screws, ball screws, nuts, and anti-backlash components',
        parentCategory: 'motion-components'
      },
      {
        id: 'couplers',
        name: 'Shaft Couplers',
        description: 'Flexible couplers, rigid couplers, and specialty shaft couplings',
        parentCategory: 'motion-components'
      },
      {
        id: 'pulleys-belts',
        name: 'Pulleys & Belts',
        description: 'Timing pulleys, idler pulleys, GT2/GT3 belts, and belt tensioners',
        parentCategory: 'motion-components'
      },
      {
        id: 'gears',
        name: 'Gears',
        description: 'Spur gears, bevel gears, rack and pinion, and gear accessories',
        parentCategory: 'motion-components'
      }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Electrical and electronic components for 3D printers and projects',
    subcategories: [
      {
        id: 'motors',
        name: 'Motors',
        description: 'Stepper motors, servo motors, DC motors, and motor accessories',
        parentCategory: 'electronics'
      },
      {
        id: 'controllers',
        name: 'Controllers & Boards',
        description: 'Control boards, driver boards, microcontrollers, and expansion boards',
        parentCategory: 'electronics'
      },
      {
        id: 'sensors',
        name: 'Sensors',
        description: 'Endstops, proximity sensors, thermistors, and other sensing devices',
        parentCategory: 'electronics'
      },
      {
        id: 'heating-elements',
        name: 'Heating Elements',
        description: 'Heater cartridges, heating pads, heat beds, and temperature control',
        parentCategory: 'electronics'
      },
      {
        id: 'cooling',
        name: 'Cooling Systems',
        description: 'Fans, heatsinks, water cooling components, and thermal management',
        parentCategory: 'electronics'
      },
      {
        id: 'wiring',
        name: 'Wiring & Connectors',
        description: 'Wires, cables, connectors, terminals, and cable management',
        parentCategory: 'electronics'
      },
      {
        id: 'power-supply',
        name: 'Power Supply',
        description: 'PSUs, voltage regulators, power switches, and power distribution',
        parentCategory: 'electronics'
      },
      {
        id: 'displays',
        name: 'Displays & Interfaces',
        description: 'LCD screens, control panels, touch screens, and user interfaces',
        parentCategory: 'electronics'
      }
    ]
  },
  {
    id: 'springs-rubber',
    name: 'Springs & Rubber Components',
    description: 'Elastic and flexible components for mechanical systems',
    subcategories: [
      {
        id: 'compression-springs',
        name: 'Compression Springs',
        description: 'Bed leveling springs, die springs, and standard compression springs',
        parentCategory: 'springs-rubber'
      },
      {
        id: 'tension-springs',
        name: 'Tension Springs',
        description: 'Extension springs for tensioning and pulling applications',
        parentCategory: 'springs-rubber'
      },
      {
        id: 'torsion-springs',
        name: 'Torsion Springs',
        description: 'Springs for rotational force and torque applications',
        parentCategory: 'springs-rubber'
      },
      {
        id: 'o-rings',
        name: 'O-Rings & Seals',
        description: 'O-rings, gaskets, oil seals, and other sealing components',
        parentCategory: 'springs-rubber'
      },
      {
        id: 'rubber-dampers',
        name: 'Vibration Dampers',
        description: 'Rubber feet, dampers, isolators, and vibration reduction components',
        parentCategory: 'springs-rubber'
      },
      {
        id: 'rubber-bands',
        name: 'Elastic Bands & Belts',
        description: 'Rubber bands, elastic cords, and flexible tensioning elements',
        parentCategory: 'springs-rubber'
      }
    ]
  },
  {
    id: 'pneumatics-hydraulics',
    name: 'Pneumatics & Hydraulics',
    description: 'Components for air and fluid systems',
    subcategories: [
      {
        id: 'fittings',
        name: 'Fittings & Connectors',
        description: 'Push-to-connect fittings, barbed fittings, and specialty connectors',
        parentCategory: 'pneumatics-hydraulics'
      },
      {
        id: 'tubing',
        name: 'Tubing & Hoses',
        description: 'PTFE tubes, silicone tubing, pneumatic hoses, and fluid lines',
        parentCategory: 'pneumatics-hydraulics'
      },
      {
        id: 'valves',
        name: 'Valves',
        description: 'Check valves, solenoid valves, flow control valves, and regulators',
        parentCategory: 'pneumatics-hydraulics'
      },
      {
        id: 'pumps',
        name: 'Pumps & Compressors',
        description: 'Air pumps, water pumps, vacuum pumps, and compression systems',
        parentCategory: 'pneumatics-hydraulics'
      }
    ]
  },
  {
    id: 'structural',
    name: 'Structural Components',
    description: 'Frame materials and structural support elements',
    subcategories: [
      {
        id: 'aluminum-extrusion',
        name: 'Aluminum Extrusion',
        description: '2020, 3030, 4040 extrusions and custom profiles',
        parentCategory: 'structural'
      },
      {
        id: 'brackets',
        name: 'Brackets & Plates',
        description: 'Corner brackets, mounting plates, gussets, and reinforcement plates',
        parentCategory: 'structural'
      },
      {
        id: 'linear-shafts',
        name: 'Shafts & Rods',
        description: 'Precision rods, threaded rods, drive shafts, and shaft supports',
        parentCategory: 'structural'
      },
      {
        id: 'panels',
        name: 'Panels & Enclosures',
        description: 'Acrylic panels, metal sheets, enclosure components, and covers',
        parentCategory: 'structural'
      }
    ]
  },
  {
    id: 'tools-accessories',
    name: 'Tools & Accessories',
    description: 'Tools, accessories, and consumables for assembly and maintenance',
    subcategories: [
      {
        id: 'hand-tools',
        name: 'Hand Tools',
        description: 'Hex keys, screwdrivers, pliers, and specialized hand tools',
        parentCategory: 'tools-accessories'
      },
      {
        id: 'measurement',
        name: 'Measurement Tools',
        description: 'Calipers, micrometers, squares, and precision measuring devices',
        parentCategory: 'tools-accessories'
      },
      {
        id: 'adhesives',
        name: 'Adhesives & Tapes',
        description: 'Thread locker, super glue, epoxy, double-sided tape, and specialty adhesives',
        parentCategory: 'tools-accessories'
      },
      {
        id: 'lubricants',
        name: 'Lubricants',
        description: 'Greases, oils, dry lubricants, and specialized lubrication products',
        parentCategory: 'tools-accessories'
      },
      {
        id: 'cable-management',
        name: 'Cable Management',
        description: 'Cable chains, zip ties, cable sleeves, and wire organization solutions',
        parentCategory: 'tools-accessories'
      },
      {
        id: 'safety-equipment',
        name: 'Safety Equipment',
        description: 'Safety glasses, gloves, ventilation filters, and protection equipment',
        parentCategory: 'tools-accessories'
      }
    ]
  },
  {
    id: 'filament-handling',
    name: 'Filament Handling',
    description: 'Components for filament management and feeding systems',
    subcategories: [
      {
        id: 'extruder-parts',
        name: 'Extruder Components',
        description: 'Drive gears, idler bearings, tension springs, and extruder hardware',
        parentCategory: 'filament-handling'
      },
      {
        id: 'hotend-parts',
        name: 'Hotend Components',
        description: 'Nozzles, heat breaks, heat blocks, and hotend accessories',
        parentCategory: 'filament-handling'
      },
      {
        id: 'filament-guides',
        name: 'Filament Guides',
        description: 'PTFE tubes, filament sensors, guide rollers, and path components',
        parentCategory: 'filament-handling'
      },
      {
        id: 'spool-holders',
        name: 'Spool Management',
        description: 'Bearings for spool holders, dry boxes, and filament storage solutions',
        parentCategory: 'filament-handling'
      }
    ]
  }
]

export const getAllSubcategories = (): HardwareSubcategory[] => {
  return hardwareCategories.flatMap(category => category.subcategories)
}

export const getSubcategoriesByCategory = (categoryId: string): HardwareSubcategory[] => {
  const category = hardwareCategories.find(cat => cat.id === categoryId)
  return category ? category.subcategories : []
}

export const getCategoryById = (categoryId: string): HardwareCategory | undefined => {
  return hardwareCategories.find(cat => cat.id === categoryId)
}

export const getSubcategoryById = (subcategoryId: string): HardwareSubcategory | undefined => {
  return getAllSubcategories().find(subcat => subcat.id === subcategoryId)
}
