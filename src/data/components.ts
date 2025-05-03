import type { ComponentProps } from '../types/components';

export const componentData: ComponentProps[] = [
  {
    id: 'heat-set-inserts',
    name: 'Heat-Set Threaded Inserts',
    category: 'Fasteners',
    description: 'Brass threaded inserts designed to be heat-set into 3D printed plastic parts, providing strong, reusable threads.',
    image: '/images/components/heat-set-inserts.jpg',
    specifications: [
      { size: 'M2 x 3.5mm', material: 'Brass', weight: '0.2g' },
      { size: 'M3 x 5.0mm', material: 'Brass', weight: '0.5g' },
      { size: 'M3 x 5.7mm', material: 'Brass', weight: '0.6g' },
      { size: 'M4 x 6.3mm', material: 'Brass', weight: '0.9g' },
      { size: 'M5 x 7.0mm', material: 'Brass', weight: '1.5g' }
    ],
    commonUses: [
      'Creating reusable screw threads in 3D prints',
      'Assembling multi-part prints',
      'Mounting components to 3D printed enclosures',
      'Reinforcing high-stress connection points'
    ],
    installationMethod: 'Heat the insert with a soldering iron or specialized tool and press into a properly sized hole. The plastic melts and flows around the knurled exterior, creating a strong mechanical bond.',
    designConsiderations: [
      'Hole diameter should be 0.1-0.2mm smaller than insert OD',
      'Minimum wall thickness of 2x insert diameter',
      'Avoid placing inserts too close to edges or other inserts',
      'Consider tapered entry holes for easier alignment'
    ],
    tips: [
      'Use a temperature-controlled soldering iron (200-250°C)',
      'Install inserts straight to avoid cross-threading',
      'Allow inserts to cool completely before use',
      'Use installation tips designed for specific insert sizes'
    ]
  },
  {
    id: 'm3-screws',
    name: 'M3 Machine Screws',
    category: 'Fasteners',
    description: 'Standard metric machine screws commonly used in 3D printing projects. Available in various head styles and lengths.',
    image: '/images/components/m3-screws.jpg',
    specifications: [
      { size: 'M3 x 6mm', material: 'Steel (zinc plated)', strength: 'Class 8.8' },
      { size: 'M3 x 8mm', material: 'Steel (zinc plated)', strength: 'Class 8.8' },
      { size: 'M3 x 10mm', material: 'Steel (zinc plated)', strength: 'Class 8.8' },
      { size: 'M3 x 12mm', material: 'Steel (zinc plated)', strength: 'Class 8.8' },
      { size: 'M3 x 16mm', material: 'Steel (zinc plated)', strength: 'Class 8.8' },
      { size: 'M3 x 20mm', material: 'Steel (zinc plated)', strength: 'Class 8.8' },
      { size: 'M3 x 8mm', material: 'Stainless Steel 304', strength: 'A2-70' },
      { size: 'M3 x 10mm', material: 'Stainless Steel 304', strength: 'A2-70' }
    ],
    commonUses: [
      'Assembling 3D printed parts',
      'Mounting electronics and motors',
      'Securing linear rails and bearings',
      'General mechanical assembly'
    ],
    installationMethod: 'Thread into tapped holes, threaded inserts, or use with nuts. Apply appropriate torque based on material and application.',
    designConsiderations: [
      'Clearance holes should be 3.2-3.4mm diameter',
      'Consider counterbore for flush mounting',
      'Account for screw head height in design',
      'Use washers to distribute load on plastic'
    ],
    tips: [
      'Don\'t overtighten screws in plastic - strip easily',
      'Use thread-locking compound for vibration resistance',
      'Stainless steel prevents corrosion but can gall',
      'Keep a variety of lengths in your parts bin'
    ]
  },
  {
    id: '608-bearings',
    name: '608 Ball Bearings',
    category: 'Motion',
    description: 'Common skateboard bearings often used in 3D printing for pulleys, rollers, and rotary motion.',
    image: '/images/components/608-bearing.jpg',
    specifications: [
      { size: '8mm ID x 22mm OD x 7mm W', material: 'Chrome Steel', weight: '12g' },
      { size: '8mm ID x 22mm OD x 7mm W', material: 'Stainless Steel', weight: '12g' },
      { size: '8mm ID x 22mm OD x 7mm W', material: 'Ceramic Hybrid', weight: '10g' }
    ],
    commonUses: [
      'Filament spool holders',
      'Pulley systems',
      'Rotary encoders',
      'V-slot roller wheels'
    ],
    installationMethod: 'Press-fit into holders or mount on shafts. Use appropriate tolerances for desired fit (slip-fit or press-fit).',
    designConsiderations: [
      'Design press-fit holes 0.1-0.2mm undersized',
      'Include bearing shoulders to prevent over-insertion',
      'Consider axial load requirements',
      'Account for thermal expansion in design'
    ],
    tips: [
      'Clean and re-lubricate for smooth operation',
      'Use bearing press tools to avoid damage',
      'Shield bearings protect from debris',
      'Match bearing quality to application needs'
    ]
  }
];
