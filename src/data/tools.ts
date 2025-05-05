export interface Tool {
  id: string
  name: string
  description: string
  uses: string[]
  category: 'maintenance' | 'post-processing' | 'safety' | 'measurement' | 'cleaning' | 'lubrication' | 'general'
  image?: string
  price?: string
  recommended?: boolean
}

export const toolsData: Tool[] = [
  {
    id: 'nitrile-gloves',
    name: 'Nitrile Gloves',
    description: 'Disposable protective gloves for handling chemicals, resin, and maintaining cleanliness during printing operations',
    uses: ['Chemical handling', 'Resin printing safety', 'Preventing fingerprints on prints', 'Maintaining cleanliness'],
    category: 'safety',
    recommended: true,
    image: '/tool_images/nitrile_gloves.webp'
  },
  {
    id: 'hobby-torch',
    name: 'Hobby Torch',
    description: 'Small handheld torch for removing stringing, smoothing surfaces, and heat-treating prints',
    uses: ['Remove stringing and wisps', 'Smooth surfaces', 'Heat treating parts', 'Welding small plastic parts'],
    category: 'post-processing',
    recommended: true,
    image: '/tool_images/hobby_torch.webp'
  },
  {
    id: 'ipa',
    name: 'Isopropyl Alcohol (IPA)',
    description: 'Essential cleaning solvent for 3D printing maintenance and surface preparation',
    uses: ['Clean build plate', 'Remove residue', 'Surface preparation', 'Clean printer components'],
    category: 'cleaning',
    recommended: true,
    image: '/tool_images/isopropyl_alcohol.webp'
  },
  {
    id: 'microfiber-cloth',
    name: 'Microfiber Cloth',
    description: 'Lint-free cloth for cleaning and maintaining 3D printer components',
    uses: ['Clean build surfaces', 'Wipe down printer', 'Polish prints', 'Apply cleaning solutions'],
    category: 'cleaning',
    recommended: true,
    image: '/tool_images/microfiber_cloth.webp'
  },
  {
    id: 'deburring-tool',
    name: 'Deburring Tool',
    description: 'Specialized tool for removing sharp edges and excess material from printed parts',
    uses: ['Remove sharp edges', 'Clean up holes', 'Smooth edges', 'Remove support marks'],
    category: 'post-processing',
    recommended: true,
    image: '/tool_images/deburring_tool.webp'
  },
  {
    id: 'glue-stick',
    name: 'Purple Glue Stick',
    description: 'Water-soluble adhesive for improving bed adhesion on glass or metal build plates',
    uses: ['Improve bed adhesion', 'Prevent warping', 'Easy to clean', 'Works with PLA, PETG, ABS'],
    category: 'maintenance',
    recommended: true,
    image: '/tool_images/purple_stick_glue.webp'
  },
  {
    id: 'plier-set',
    name: 'Plier Set',
    description: 'Various pliers for support removal, part handling, and maintenance tasks',
    uses: ['Remove supports', 'Hold hot parts', 'Maintenance tasks', 'Part assembly'],
    category: 'general',
    recommended: true,
    image: '/tool_images/plier_set.webp'
  },
  {
    id: 'file-set',
    name: 'File Set',
    description: 'Different file shapes and grits for smoothing and shaping printed parts',
    uses: ['Smooth surfaces', 'Shape parts', 'Remove layer lines', 'Fit adjustments'],
    category: 'post-processing',
    image: '/tool_images/file_set.webp'
  },
  {
    id: 'super-lube',
    name: 'Super Lube',
    description: 'Synthetic grease for lubricating 3D printer rails, bearings, and lead screws',
    uses: ['Lubricate linear rails', 'Grease bearings', 'Maintain lead screws', 'Reduce friction'],
    category: 'lubrication',
    recommended: true,
    image: '/tool_images/super_lube.webp'
  },
  {
    id: 'nozzle-cleaning',
    name: 'Nozzle Cleaning Tools',
    description: 'Needles and brushes specifically designed for cleaning 3D printer nozzles',
    uses: ['Clear clogs', 'Maintain nozzles', 'Remove debris', 'Prevent jams'],
    category: 'maintenance',
    recommended: true,
    image: '/tool_images/nozzle_cleaning_tools.webp'
  },
  {
    id: 'hygrometer',
    name: 'Hygrometer',
    description: 'Measures humidity levels to monitor filament storage conditions',
    uses: ['Monitor humidity', 'Check storage conditions', 'Prevent filament moisture', 'Calibrate dry boxes'],
    category: 'measurement',
    image: '/tool_images/hygrometer.webp'
  },
  {
    id: 'vacuum-bags',
    name: 'Vacuum Storage Bags',
    description: 'Airtight bags for storing filament and preventing moisture absorption',
    uses: ['Store filament', 'Prevent moisture', 'Long-term storage', 'Save space'],
    category: 'general',
    image: '/tool_images/vacuum_storage_bags.webp'
  },
  {
    id: 'silica-gel',
    name: 'Reusable Silica Gel Packages',
    description: 'Moisture-absorbing packets that can be recharged for filament storage',
    uses: ['Absorb moisture', 'Protect filament', 'Reusable desiccant', 'Dry storage'],
    category: 'general',
    recommended: true,
    image: '/tool_images/resusable_silica_gel_packages.webp'
  },
  {
    id: 'flush-cutters',
    name: 'Flush Cutters',
    description: 'Precision cutting tool for clean removal of supports and excess material',
    uses: ['Remove supports', 'Cut filament', 'Clean cuts', 'Precise trimming'],
    category: 'post-processing',
    recommended: true,
    image: '/tool_images/flush_cutters.webp'
  },
  {
    id: 'allen-key-set',
    name: 'Allen Key Set (Hex Keys)',
    description: 'Essential for 3D printer assembly, maintenance, and adjustments',
    uses: ['Printer assembly', 'Maintenance', 'Adjustments', 'Repairs'],
    category: 'maintenance',
    recommended: true,
    image: '/tool_images/allen_key_set.webp'
  },
  {
    id: 'low-profile-wrench',
    name: 'Low Profile Wrench',
    description: 'Thin wrench for adjusting nozzles and reaching tight spaces',
    uses: ['Nozzle changes', 'Tight spaces', 'Hotend maintenance', 'Bed leveling'],
    category: 'maintenance',
    image: '/tool_images/low_profile_wrench.webp'
  },
  {
    id: 'print-scraper',
    name: 'Print Bed Scraper',
    description: 'Tool for safely removing prints from the build surface',
    uses: ['Remove prints', 'Clean build plate', 'Avoid damage', 'Safe removal'],
    category: 'general',
    recommended: true,
    image: '/tool_images/print_bed_scraper.webp'
  },
  {
    id: 'scalpel-knife',
    name: 'Scalpel/X-ACTO Knife',
    description: 'Precision cutting tool for detailed post-processing work',
    uses: ['Detail work', 'Support removal', 'Precision cuts', 'Model cleanup'],
    category: 'post-processing',
    recommended: true,
    image: '/tool_images/scalpel_knife.webp'
  },
  {
    id: 'calipers',
    name: 'Digital Calipers',
    description: 'Precision measuring tool for checking print dimensions and calibration',
    uses: ['Measure prints', 'Check accuracy', 'Calibration', 'Design verification'],
    category: 'measurement',
    recommended: true,
    image: '/tool_images/digital_calipers.webp'
  },
  {
    id: 'wire-brush',
    name: 'Wire Brush',
    description: 'Brass or steel wire brush for cleaning nozzles and print surfaces',
    uses: ['Clean nozzles', 'Remove debris', 'Surface cleaning', 'Maintenance'],
    category: 'cleaning',
    image: '/tool_images/wire_brush.webp'
  },
  {
    id: 'dremel',
    name: 'Dremel/Rotary Tool',
    description: 'Versatile rotary tool for detailed post-processing and modifications',
    uses: ['Sanding', 'Cutting', 'Polishing', 'Drilling'],
    category: 'post-processing',
    image: '/tool_images/rotary_tool.webp'
  },
  {
    id: 'cr2032',
    name: 'CR2032 Batteries',
    description: 'Common battery for digital calipers and other measurement tools',
    uses: ['Power calipers', 'Backup power', 'Measurement tools', 'Electronics'],
    category: 'general',
    image: '/tool_images/cr2032_battery.webp'
  },
  {
    id: 'plastic-paint',
    name: 'Plastic-Safe Paint',
    description: 'Paint specifically formulated for adhesion to 3D printed plastics',
    uses: ['Paint prints', 'Color models', 'Finishing', 'Aesthetics'],
    category: 'post-processing',
    image: '/tool_images/plastic_safe_paint.webp'
  },
  {
    id: '3d-gloop',
    name: '3D Gloop',
    description: 'Specialized adhesive for bonding 3D printed parts together',
    uses: ['Bond prints', 'Assembly', 'Repairs', 'Strong adhesion'],
    category: 'post-processing',
    image: '/tool_images/3d_gloop.webp'
  },
  {
    id: 'respirator',
    name: 'Respirator Mask',
    description: 'Safety equipment for protection against fumes and particles',
    uses: ['Fume protection', 'Dust protection', 'Painting safety', 'Resin printing'],
    category: 'safety',
    recommended: true,
    image: '/tool_images/respirator_mask.webp'
  },
  {
    id: 'foam-sander',
    name: 'Sanding Strips',
    description: 'Various grit sanding strips for smoothing printed surfaces',
    uses: ['Surface finishing', 'Remove layer lines', 'Smooth prints', 'Progressive sanding'],
    category: 'post-processing',
    image: '/tool_images/sanding_paper.webp'
  },
  {
    id: 'foot-sander',
    name: 'Electronic Foot Sander',
    description: 'Electric sanding tool with various grits for efficient surface finishing',
    uses: ['Quick sanding', 'Surface smoothing', 'Heavy material removal', 'Large area finishing'],
    category: 'post-processing',
    image: '/tool_images/electronic_foot_grinder.webp'
  },
  {
    id: 'drill-press',
    name: 'Mini Drill Press',
    description: 'Precision drilling tool for accurate holes in printed parts',
    uses: ['Precise holes', 'Part modification', 'Assembly prep', 'Consistent drilling'],
    category: 'post-processing',
    image: '/tool_images/mini_drill.webp'
  },
  {
    id: 'ultrasonic-cleaner',
    name: 'Ultrasonic Cleaner',
    description: 'Provides deeper cleaning of resin prints using ultrasonic waves to remove resin from intricate details and hard-to-reach areas',
    uses: ['Deep cleaning of prints', 'Reaching small crevices', 'Thorough resin removal', 'Batch cleaning of small parts'],
    category: 'cleaning',
    image: '/tool_images/ultrasonic_cleaner.webp', // Resin printing tool
  },
  {
    id: 'uv-curing-station',
    name: 'UV Curing Station',
    description: 'Dedicated device for post-processing resin prints after washing to ensure complete and even UV curing',
    uses: ['Post-wash curing', 'Even UV exposure', 'Final hardening', 'Controlled curing environment'],
    category: 'post-processing',
    recommended: true,
    image: '/tool_images/uv_curing_station.webp'
  },
  {
    id: 'resin-filters',
    name: 'Resin Filters',
    description: 'For filtering resin when returning it to bottles, removing cured particles that could affect future prints',
    uses: ['Filter used resin', 'Remove cured particles', 'Clean resin transfer', 'Prevent print failures'],
    category: 'cleaning',
    image: '/tool_images/resin_filters.webp'
  },
  {
    id: 'fep-film-replacement',
    name: 'FEP Film Replacement',
    description: 'Essential spare part for replacing worn or damaged FEP film in the resin vat',
    uses: ['Vat maintenance', 'Prevent leaks', 'Improve print quality', 'Repair damaged vats'],
    category: 'maintenance',
    recommended: true,
    image: '/tool_images/fep_film.webp'
  },
  {
    id: 'wash-containers',
    name: 'Plastic Wash Containers',
    description: 'Dedicated containers for the resin washing process, ideally with baskets or platforms to hold prints during cleaning',
    uses: ['IPA washing', 'Print cleaning', 'Safe chemical handling', 'Batch processing'],
    category: 'cleaning',
    image: '/tool_images/wash_containers.webp'
  },
  {
    id: 'soft-brushes',
    name: 'Soft Brushes',
    description: 'For gently cleaning intricate details without damaging fragile parts of resin prints',
    uses: ['Clean detailed prints', 'Remove uncured resin', 'Reach small areas', 'Gentle cleaning'],
    category: 'cleaning',
    image: '/tool_images/soft_brushes.webp'
  },
  {
    id: 'heat-gun',
    name: 'Heat Gun or Hairdryer',
    description: 'Low-heat tool for warming resin to improve flow characteristics and reduce bubbles',
    uses: ['Remove resin bubbles', 'Improve resin flow', 'Temperature control', 'Pre-print preparation'],
    category: 'maintenance',
    image: '/tool_images/heat_gun.webp'
  }
]