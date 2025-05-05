// Video Library Data Structure
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  software: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  youtubeId: string;
  description?: string;
  keywords: string[];
  dateAdded: string; // ISO format: YYYY-MM-DD
}

// Helper function to use YouTube thumbnails
const getYouTubeThumbnail = (videoId: string) => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// Placeholder for videos without YouTube IDs yet
const placeholderImage = '/video_thumbnails/placeholder.svg';

// Function to extract YouTube ID from URL


// Updated video data with all entries
export const videoData: Video[] = [
  // Original Videos
  {
    id: 'blender-1',
    title: 'Beginner Blender 4.0 Tutorial - Full Course',
    thumbnail: getYouTubeThumbnail('4haAdmHqGOw'),
    category: '3D Modeling',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '2:15:30',
    youtubeId: '4haAdmHqGOw', 
    description: 'A comprehensive beginner course for Blender 4.0, covering all the basics you need to know.',
    keywords: ['blender', 'beginner', 'tutorial', 'modeling', '3d', 'course'],
    dateAdded: '2025-05-01'
  },
  {
    id: 'blender-2',
    title: 'How to Model at LIGHTSPEED in Blender 3D',
    thumbnail: getYouTubeThumbnail('Wxr67hkGxk0'),
    category: '3D Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '25:40',
    youtubeId: 'Wxr67hkGxk0', 
    description: 'Learn advanced techniques to dramatically speed up your modeling workflow in Blender.',
    keywords: ['blender', 'speed', 'modeling', 'efficiency', 'workflow', 'productivity'],
    dateAdded: '2025-04-15'
  },
  {
    id: 'blender-3',
    title: 'Easily create 3D Characters for Blender FAST',
    thumbnail: getYouTubeThumbnail('axkgDt55fJE'),
    category: '3D Modeling',
    software: 'Blender',
    skillLevel: 'Advanced',
    duration: '18:22',
    youtubeId: 'axkgDt55fJE', 
    description: 'Advanced tutorial on creating detailed 3D characters efficiently in Blender.',
    keywords: ['blender', 'characters', '3d', 'modeling', 'character creation', 'fast workflow'],
    dateAdded: '2025-03-20'
  },
  {
    id: 'zbrush-1',
    title: 'Learn Zbrush in 8 Minutes - Zbrush Beginner Tutorial',
    thumbnail: getYouTubeThumbnail('pCjzgYuS6WQ'),
    category: '3D Modeling',
    software: 'ZBrush',
    skillLevel: 'Beginner',
    duration: '8:12',
    youtubeId: 'pCjzgYuS6WQ', 
    description: 'Quick crash course covering the essential ZBrush tools and concepts for beginners.',
    keywords: ['zbrush', 'beginner', 'quick', 'tutorial', 'sculpting', 'basics'],
    dateAdded: '2025-04-28'
  },
  {
    id: 'zbrush-2',
    title: 'Top 10 Tips ALL Zbrush Artists Should Know',
    thumbnail: getYouTubeThumbnail('xsyCV6s4CoM'),
    category: '3D Modeling',
    software: 'ZBrush',
    skillLevel: 'Intermediate',
    duration: '15:45',
    youtubeId: 'xsyCV6s4CoM', 
    description: 'Ten essential ZBrush techniques that will improve your digital sculpting workflow.',
    keywords: ['zbrush', 'tips', 'sculpting', 'tricks', 'workflow', 'techniques'],
    dateAdded: '2025-04-05'
  },
  {
    id: 'zbrush-3',
    title: 'Using the ZBrush Pose Tools Plugin & Character Creator to Animate',
    thumbnail: getYouTubeThumbnail('liqM9NZyv7E'),
    category: '3D Modeling',
    software: 'ZBrush',
    skillLevel: 'Advanced',
    duration: '32:18',
    youtubeId: 'liqM9NZyv7E', 
    description: 'Learn how to use ZBrush Pose Tools to efficiently animate and pose your character models.',
    keywords: ['zbrush', 'pose', 'character creator', 'animation', 'plugin', 'rigging'],
    dateAdded: '2025-03-12'
  },
  {
    id: 'zbrush-4',
    title: 'Posing a Custom ZBrush Character in Character Creator',
    thumbnail: getYouTubeThumbnail('DcZiNITD1cI'),
    category: '3D Modeling',
    software: 'ZBrush',
    skillLevel: 'Advanced',
    duration: '28:45',
    youtubeId: 'DcZiNITD1cI', 
    description: 'Comprehensive guide on posing ZBrush characters using Character Creator.',
    keywords: ['zbrush', 'character creator', 'posing', 'animation', 'custom character'],
    dateAdded: '2025-02-20'
  },
  {
    id: 'zbrush-5',
    title: '3D Printing and Character Posing with ZBrush & Character Creator',
    thumbnail: getYouTubeThumbnail('jg-7mYHSosg'),
    category: '3D Modeling',
    software: 'ZBrush',
    skillLevel: 'Advanced',
    duration: '40:15',
    youtubeId: 'jg-7mYHSosg', 
    description: 'Learn to prepare and pose your ZBrush characters for 3D printing using Character Creator.',
    keywords: ['zbrush', 'character creator', '3d printing', 'posing', 'preparation'],
    dateAdded: '2025-02-05'
  },
  {
    id: 'zbrush-6',
    title: 'Posing ZBrush Characters with Character Creator & AccuRiG',
    thumbnail: getYouTubeThumbnail('um-Q_HaGJPs'),
    category: '3D Modeling',
    software: 'ZBrush',
    skillLevel: 'Advanced',
    duration: '35:22',
    youtubeId: 'um-Q_HaGJPs', 
    description: 'Advanced tutorial on using AccuRiG with ZBrush and Character Creator for advanced posing.',
    keywords: ['zbrush', 'character creator', 'accurig', 'pose tools', 'rigging', 'link tutorial'],
    dateAdded: '2025-01-15'
  },
  {
    id: 'cc4-1',
    title: '3D Character Garment Creator Free For All! [FULL TUTORIAL]',
    thumbnail: placeholderImage,
    category: '3D Modeling',
    software: 'CC4',
    skillLevel: 'All Levels',
    duration: '45:30',
    youtubeId: '', 
    description: 'Complete guide to creating realistic 3D garments in Character Creator 4.',
    keywords: ['character creator', 'cc4', 'garment', 'clothing', 'tutorial', 'cloth simulation'],
    dateAdded: '2025-04-10'
  },
  {
    id: 'daz-1',
    title: 'How to Make 3D Characters Without Modeling in 2025 (FREE & EASY!)',
    thumbnail: placeholderImage,
    category: '3D Modeling',
    software: 'Daz',
    skillLevel: 'Beginner',
    duration: '22:15',
    youtubeId: '', 
    description: 'Tutorial showing how to create stunning 3D characters in Daz without advanced modeling skills.',
    keywords: ['daz', 'characters', 'easy', 'free', 'no modeling', 'beginners'],
    dateAdded: '2025-05-02'
  },
  {
    id: 'meshmixer-1',
    title: 'How to cut STL models for 3D printing in Meshmixer',
    thumbnail: placeholderImage,
    category: 'Utility Tools',
    software: 'Meshmixer',
    skillLevel: 'Beginner',
    duration: '12:45',
    youtubeId: '', 
    description: 'Learn the basics of cutting and slicing STL models in Meshmixer for better 3D printing results.',
    keywords: ['meshmixer', 'stl', 'cutting', '3d printing', 'model preparation', 'slicing'],
    dateAdded: '2025-04-22'
  },
  {
    id: 'meshmixer-2',
    title: 'How to cut STL files when they don\'t fit your printer AND to save material',
    thumbnail: placeholderImage,
    category: 'Utility Tools',
    software: 'Meshmixer',
    skillLevel: 'Intermediate',
    duration: '18:33',
    youtubeId: '', 
    description: 'Advanced techniques for splitting large models to fit smaller print beds while minimizing material use.',
    keywords: ['meshmixer', 'stl', 'printer size', 'material saving', 'optimization', 'splitting'],
    dateAdded: '2025-03-18'
  },
  {
    id: 'meshmixer-3',
    title: 'How to Make Perfect Alignment Pins With Meshmixer!',
    thumbnail: placeholderImage,
    category: 'Utility Tools',
    software: 'Meshmixer',
    skillLevel: 'Advanced',
    duration: '14:20',
    youtubeId: '', 
    description: 'Create precise alignment pins in Meshmixer to perfectly assemble multi-part 3D printed models.',
    keywords: ['meshmixer', 'alignment', 'pins', 'assembly', 'precision', 'multi-part', 'joining'],
    dateAdded: '2025-02-25'
  },

  // New Videos from Document
  {
    id: 'blender-bend-1',
    title: 'Blender Bend Object using Curve Modifier',
    thumbnail: getYouTubeThumbnail('oHkzyH9dpv4'),
    category: 'Modifiers',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '10:00',
    youtubeId: 'oHkzyH9dpv4', 
    description: 'Learn how to bend objects in Blender using the curve modifier for flexible model manipulation.',
    keywords: ['blender', 'curve', 'modifier', 'bend', 'deform', 'tutorial'],
    dateAdded: '2025-01-15'
  },
  {
    id: 'blender-deform-1',
    title: 'Blender Simple Deform Bend Modifier',
    thumbnail: getYouTubeThumbnail('iq2_goboheo'),
    category: 'Modifiers',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '8:45',
    youtubeId: 'iq2_goboheo', 
    description: 'Master the Simple Deform modifier in Blender to create bends, twists, and other deformations.',
    keywords: ['blender', 'simple deform', 'modifier', 'bend', 'twist', 'tutorial'],
    dateAdded: '2025-01-18'
  },
  {
    id: 'walls-methods-1',
    title: '5 Common Methods of Creating Walls',
    thumbnail: getYouTubeThumbnail('c5eqgkkXhHk'),
    category: 'Architecture',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '15:20',
    youtubeId: 'c5eqgkkXhHk', 
    description: 'Explore five different techniques for creating architectural walls in 3D modeling.',
    keywords: ['blender', 'walls', 'architecture', 'modeling', 'techniques', '3d construction'],
    dateAdded: '2025-01-22'
  },
  {
    id: 'blender-isometric-1',
    title: 'Blender 3D - 3D Isometric Bedroom',
    thumbnail: getYouTubeThumbnail('yCHT23A6aJA'),
    category: 'Architecture',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '25:15',
    youtubeId: 'yCHT23A6aJA', 
    description: 'Create a detailed isometric bedroom scene in Blender with this step-by-step tutorial.',
    keywords: ['blender', 'isometric', 'bedroom', 'interior', 'modeling', '3d greenhorn'],
    dateAdded: '2025-01-25'
  },
  {
    id: 'blender-selection-1',
    title: 'Object Selection and Transformation Gizmo',
    thumbnail: getYouTubeThumbnail('jSXJTL7gDCc'),
    category: 'Basics',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '12:30',
    youtubeId: 'jSXJTL7gDCc', 
    description: 'Learn essential object selection techniques and how to use transformation gizmos effectively in Blender.',
    keywords: ['blender', 'selection', 'transform', 'gizmo', 'basics', 'tutorial'],
    dateAdded: '2025-01-28'
  },
  {
    id: 'blender-beginner-1',
    title: 'Blender 2.8 Begginers Tutorial',
    thumbnail: getYouTubeThumbnail('pVqv1NBI-Co'),
    category: 'Basics',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '45:15',
    youtubeId: 'pVqv1NBI-Co', 
    description: 'Comprehensive tutorial series for complete beginners to learn Blender fundamentals.',
    keywords: ['blender', 'beginner', 'tutorial', 'basics', 'chocofur', 'series'],
    dateAdded: '2025-01-27'
  },
  {
    id: 'blender-shortcuts-1',
    title: 'Shortcuts EVERY Blender Beginner should KNOW',
    thumbnail: getYouTubeThumbnail('JHigHbGkWAg'),
    category: 'Basics',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '18:40',
    youtubeId: 'JHigHbGkWAg', 
    description: 'Essential keyboard shortcuts that will drastically improve your workflow efficiency in Blender.',
    keywords: ['blender', 'shortcuts', 'hotkeys', 'beginner', 'workflow', 'productivity'],
    dateAdded: '2025-02-01'
  },
  {
    id: 'blender-trees-1',
    title: 'How to create Ghibly Trees in 3D',
    thumbnail: getYouTubeThumbnail('DEgzuMmJtu8'),
    category: 'Stylized',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '22:15',
    youtubeId: 'DEgzuMmJtu8', 
    description: 'Create stylized Ghibli-inspired trees in Blender with this detailed tutorial.',
    keywords: ['blender', 'trees', 'stylized', 'ghibli', 'modeling', 'nature'],
    dateAdded: '2025-02-05'
  },
  {
    id: 'blender-creator-1',
    title: 'Imphenzia : Youtuber with Timelapse',
    thumbnail: placeholderImage,
    category: 'Creators',
    software: 'Blender',
    skillLevel: 'All Levels',
    duration: '0:00',
    youtubeId: '', 
    description: 'Imphenzia YouTube channel featuring time-lapse Blender modeling videos and tutorials.',
    keywords: ['blender', 'imphenzia', 'youtuber', 'timelapse', 'modeling', 'tutorial'],
    dateAdded: '2025-02-04'
  },
  {
    id: 'blender-spin-1',
    title: 'Using Spin Tool to Create Curves',
    thumbnail: getYouTubeThumbnail('KBespCef5zo'),
    category: 'Tools',
    software: 'Blender',
    skillLevel: 'Advanced',
    duration: '14:25',
    youtubeId: 'KBespCef5zo', 
    description: 'Advanced techniques for creating curved surfaces using the spin tool in Blender.',
    keywords: ['blender', 'spin tool', 'curves', 'modeling', 'advanced', 'tutorial'],
    dateAdded: '2025-02-08'
  },
  {
    id: 'blender-bezier-1',
    title: 'Blender Bezier Curve',
    thumbnail: getYouTubeThumbnail('PqjGsvzPnXg'),
    category: 'Curves',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '16:40',
    youtubeId: 'PqjGsvzPnXg', 
    description: 'Master Bezier curves in Blender for creating smooth, precise curved objects and paths.',
    keywords: ['blender', 'bezier', 'curves', 'modeling', 'paths', 'tutorial'],
    dateAdded: '2025-02-12'
  },
  {
    id: 'blender-bezier-2',
    title: 'How to work with Bezier Curve',
    thumbnail: getYouTubeThumbnail('syK0TvNx08E'),
    category: 'Curves',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '13:20',
    youtubeId: 'syK0TvNx08E', 
    description: 'Practical workflow tips for efficiently working with Bezier curves in Blender projects.',
    keywords: ['blender', 'bezier', 'curves', 'workflow', 'modeling', 'tutorial'],
    dateAdded: '2025-02-15'
  },
  {
    id: 'blender-creator-2',
    title: '25 Games : Youtuber with amazing short Tutorials',
    thumbnail: placeholderImage,
    category: 'Creators',
    software: 'Blender',
    skillLevel: 'All Levels',
    duration: '0:00',
    youtubeId: '', 
    description: '25 Games YouTube channel featuring concise, effective Blender tutorial videos.',
    keywords: ['blender', '25 games', 'youtuber', 'tutorials', 'short', 'effective'],
    dateAdded: '2025-02-14'
  },
  
  // Continuing with videos from hard surface series and others...
  // [Additional videos in original file...]

  // Additional videos from your list
  {
    id: 'blender-focus-1',
    title: 'Focus on anything in Blender',
    thumbnail: getYouTubeThumbnail('8hHSPhgWSV0'),
    category: 'Basics',
    software: 'Blender',
    skillLevel: 'Beginner', 
    duration: '8:30',
    youtubeId: '8hHSPhgWSV0',
    description: 'Learn how to efficiently navigate and focus on specific objects in your Blender scene.',
    keywords: ['blender', 'navigation', 'focus', 'viewport', 'selection', 'basics'],
    dateAdded: '2025-01-10'
  },
  {
    id: 'blender-arrays-advanced-1',
    title: 'Advanced Arrays',
    thumbnail: getYouTubeThumbnail('MBvT6RiSEj0'),
    category: 'Modifiers',
    software: 'Blender',
    skillLevel: 'Advanced',
    duration: '18:45',
    youtubeId: 'MBvT6RiSEj0',
    description: 'Master advanced array techniques in Blender for complex pattern creation and modeling efficiency.',
    keywords: ['blender', 'array', 'modifiers', 'patterns', 'advanced', 'modeling'],
    dateAdded: '2025-01-11'
  },
  {
    id: 'blender-fence-1',
    title: 'Create CrissCross Fence',
    thumbnail: getYouTubeThumbnail('udiL9VllksQ'),
    category: 'Architecture',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '15:30',
    youtubeId: 'udiL9VllksQ',
    description: 'Step-by-step tutorial on creating realistic criss-cross fence patterns in Blender.',
    keywords: ['blender', 'fence', 'criss-cross', 'architecture', 'modeling', 'pattern'],
    dateAdded: '2025-01-12'
  },
  {
    id: 'blender-logo-3d-1',
    title: 'Make 3D Logos In Blender',
    thumbnail: getYouTubeThumbnail('hwTfNmFpCs0'),
    category: 'Text',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '24:15',
    youtubeId: 'hwTfNmFpCs0',
    description: 'Create professional 3D logos for branding and presentations using Blender\'s powerful tools.',
    keywords: ['blender', 'logo', '3d', 'branding', 'text', 'modeling'],
    dateAdded: '2025-01-13'
  },
  {
    id: 'blender-nodes-beginner-1',
    title: 'Beginners Guide to Nodes',
    thumbnail: getYouTubeThumbnail('moKFSMJwpmE'),
    category: 'Materials',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '32:20',
    youtubeId: 'moKFSMJwpmE',
    description: 'Comprehensive introduction to the node system in Blender for materials, textures and more.',
    keywords: ['blender', 'nodes', 'beginner', 'materials', 'shader', 'tutorial'],
    dateAdded: '2025-01-14'
  },
  {
    id: 'blender-flower-1',
    title: 'How to make flower in Blender',
    thumbnail: getYouTubeThumbnail('mX-nh0BLzXI'),
    category: 'Nature',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '17:45',
    youtubeId: 'mX-nh0BLzXI',
    description: 'Create detailed flower models in Blender with natural-looking petals and structures.',
    keywords: ['blender', 'flower', 'nature', 'modeling', 'organic', 'tutorial'],
    dateAdded: '2025-01-16'
  },
  {
    id: 'blender-radial-array-1',
    title: 'Radial Array Modifier',
    thumbnail: getYouTubeThumbnail('N8vCyn60Wkk'),
    category: 'Modifiers',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '12:30',
    youtubeId: 'N8vCyn60Wkk',
    description: 'Learn how to create circular patterns and radial designs using Blender\'s array modifier.',
    keywords: ['blender', 'radial', 'array', 'circular', 'pattern', 'modifier'],
    dateAdded: '2025-01-17'
  },
  {
    id: 'blender-tips-100-1',
    title: '100+ Tips to improve in Blender',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Workflow',
    software: 'Blender',
    skillLevel: 'All Levels',
    duration: '2:10:15',
    youtubeId: 'JMBMHSca_j0',
    description: 'Over 100 essential tips and tricks to drastically improve your Blender workflow efficiency.',
    keywords: ['blender', 'tips', 'workflow', 'productivity', 'techniques', 'shortcuts'],
    dateAdded: '2025-01-19'
  },
  {
    id: 'blender-wooden-texture-1',
    title: 'How to make Wooden Texture',
    thumbnail: getYouTubeThumbnail('CHxelgYdBaI'),
    category: 'Materials',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '18:40',
    youtubeId: 'CHxelgYdBaI',
    description: 'Create realistic wood textures and materials in Blender using procedural techniques.',
    keywords: ['blender', 'wood', 'texture', 'material', 'procedural', 'shader'],
    dateAdded: '2025-01-20'
  },
  {
    id: 'blender-lowpoly-trees-1',
    title: 'Make Low Poly Trees',
    thumbnail: getYouTubeThumbnail('p-9pgZI3inI'),
    category: 'Low Poly',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '14:25',
    youtubeId: 'p-9pgZI3inI',
    description: 'Create stylized low-poly trees for games and stylized environments in Blender.',
    keywords: ['blender', 'low poly', 'trees', 'stylized', 'game asset', 'nature'],
    dateAdded: '2025-01-21'
  },
  {
    id: 'blender-lowpoly-environment-1',
    title: 'Easy Low Poly environment in Eevee',
    thumbnail: getYouTubeThumbnail('_gyts71XMtw'),
    category: 'Low Poly',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '28:15',
    youtubeId: '_gyts71XMtw',
    description: 'Create complete low-poly environments in Blender using the Eevee rendering engine.',
    keywords: ['blender', 'low poly', 'environment', 'eevee', 'stylized', 'landscape'],
    dateAdded: '2025-01-23'
  },
  {
    id: 'blender-exercises-8-1',
    title: 'Beginner Exercises / Hard Surface / Part 8',
    thumbnail: getYouTubeThumbnail('qHtxFntZfLM'),
    category: 'Hard Surface',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '32:10',
    youtubeId: 'qHtxFntZfLM',
    description: 'Part 8 of a beginner-friendly series focusing on hard surface modeling exercises in Blender.',
    keywords: ['blender', 'hard surface', 'beginner', 'exercises', 'modeling', 'tutorial'],
    dateAdded: '2025-01-24'
  },
  {
    id: 'blender-camera-movement-1',
    title: 'How to Move Camera in Blender',
    thumbnail: getYouTubeThumbnail('4HAHY4bWe_E'),
    category: 'Basics',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '10:15',
    youtubeId: '4HAHY4bWe_E',
    description: 'Learn the fundamentals of camera movement and positioning in Blender for better renders and animations.',
    keywords: ['blender', 'camera', 'movement', 'positioning', 'basics', 'animation'],
    dateAdded: '2025-01-26'
  },
  {
    id: 'blender-water-animation-1',
    title: 'Quick Water Animation / From Pipe',
    thumbnail: getYouTubeThumbnail('xIxUZpRk4Ac'),
    category: 'Animation',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '18:30',
    youtubeId: 'xIxUZpRk4Ac',
    description: 'Create a realistic water flow animation from a pipe using Blender\'s fluid simulation.',
    keywords: ['blender', 'water', 'animation', 'pipe', 'fluid', 'simulation'],
    dateAdded: '2025-01-29'
  },
  {
    id: 'blender-exercises-1-1',
    title: 'Beginner Exercises / Hard Surface / Part 1',
    thumbnail: getYouTubeThumbnail('98FkRIbihyQ'),
    category: 'Hard Surface',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '35:20',
    youtubeId: '98FkRIbihyQ',
    description: 'First part of a beginner-friendly series focusing on hard surface modeling exercises in Blender.',
    keywords: ['blender', 'hard surface', 'beginner', 'exercises', 'modeling', 'tutorial'],
    dateAdded: '2025-01-30'
  },
  {
    id: 'blender-exercises-2-1',
    title: 'Beginner Exercises / Hard Surface / Part 2',
    thumbnail: getYouTubeThumbnail('51SdWI-yof4'),
    category: 'Hard Surface',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '38:15',
    youtubeId: '51SdWI-yof4',
    description: 'Second part of a beginner-friendly series focusing on hard surface modeling exercises in Blender.',
    keywords: ['blender', 'hard surface', 'beginner', 'exercises', 'modeling', 'tutorial'],
    dateAdded: '2025-01-31'
  },
  {
    id: 'blender-exercises-3-1',
    title: 'Beginner Exercises / Hard Surface / Part 3',
    thumbnail: getYouTubeThumbnail('-0tMeMZpeXE'),
    category: 'Hard Surface',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '34:10',
    youtubeId: '-0tMeMZpeXE',
    description: 'Third part of a beginner-friendly series focusing on hard surface modeling exercises in Blender.',
    keywords: ['blender', 'hard surface', 'beginner', 'exercises', 'modeling', 'tutorial'],
    dateAdded: '2025-02-02'
  },
  {
    id: 'blender-exercises-4-1',
    title: 'Beginner Exercises / Hard Surface / Part 4',
    thumbnail: getYouTubeThumbnail('Syq6JjMdyhI'),
    category: 'Hard Surface',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '37:25',
    youtubeId: 'Syq6JjMdyhI',
    description: 'Fourth part of a beginner-friendly series focusing on hard surface modeling exercises in Blender.',
    keywords: ['blender', 'hard surface', 'beginner', 'exercises', 'modeling', 'tutorial'],
    dateAdded: '2025-02-03'
  },
  {
    id: 'blender-boolean-modifier-1',
    title: 'Boolean Modifier',
    thumbnail: getYouTubeThumbnail('KTWo-iEvEB8'),
    category: 'Modifiers',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '15:45',
    youtubeId: 'KTWo-iEvEB8',
    description: 'Master the Boolean modifier in Blender for creating complex shapes through combining and cutting operations.',
    keywords: ['blender', 'boolean', 'modifier', 'cutting', 'combining', 'tutorial'],
    dateAdded: '2025-02-06'
  },
  {
    id: 'blender-glow-item-1',
    title: 'How to make an item glow in Blender',
    thumbnail: getYouTubeThumbnail('WTFj9B6eFgk'),
    category: 'Materials',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '12:30',
    youtubeId: 'WTFj9B6eFgk',
    description: 'Create realistic glowing and emissive objects in Blender using emission shaders and compositing.',
    keywords: ['blender', 'glow', 'emission', 'shader', 'materials', 'lighting'],
    dateAdded: '2025-02-07'
  },
  {
    id: 'blender-glow-item-2',
    title: 'How to make an item glow in Blender 2',
    thumbnail: getYouTubeThumbnail('qW1Kh1B_vFY'),
    category: 'Materials',
    software: 'Blender',
    skillLevel: 'Advanced',
    duration: '18:15',
    youtubeId: 'qW1Kh1B_vFY',
    description: 'Advanced techniques for creating stylized and realistic glowing effects in Blender.',
    keywords: ['blender', 'glow', 'emission', 'advanced', 'bloom', 'compositing'],
    dateAdded: '2025-02-09'
  },
  {
    id: 'blender-exercises-5-1',
    title: 'Beginner Exercises / Hard Surface / Part 5',
    thumbnail: getYouTubeThumbnail('DG9hlltg2HA'),
    category: 'Hard Surface',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '36:45',
    youtubeId: 'DG9hlltg2HA',
    description: 'Fifth part of a beginner-friendly series focusing on hard surface modeling exercises in Blender.',
    keywords: ['blender', 'hard surface', 'beginner', 'exercises', 'modeling', 'tutorial'],
    dateAdded: '2025-02-10'
  },
  {
    id: 'blender-increase-undo-1',
    title: 'How to increase Undo Steps in Blender',
    thumbnail: placeholderImage,
    category: 'Workflow',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '5:30',
    youtubeId: '',
    description: 'Learn how to increase the undo history steps in Blender to improve your workflow.',
    keywords: ['blender', 'undo', 'preferences', 'workflow', 'settings', 'tutorial'],
    dateAdded: '2025-02-11'
  },
  {
    id: 'blender-tips-modeling-1',
    title: '100+ Tips to Boost Modeling',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Workflow',
    software: 'Blender',
    skillLevel: 'All Levels',
    duration: '1:50:30',
    youtubeId: 'JMBMHSca_j0',
    description: 'Comprehensive collection of tips and techniques to significantly improve your 3D modeling workflow in Blender.',
    keywords: ['blender', 'modeling', 'tips', 'workflow', 'productivity', 'techniques'],
    dateAdded: '2025-02-13'
  },
  {
    id: 'blender-random-colors-1',
    title: 'Random Colors',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'User Interface',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '4:15',
    youtubeId: 'JMBMHSca_j0',
    description: 'Use random colors in Blender to better visualize and distinguish different objects and elements.',
    keywords: ['blender', 'random colors', 'visualization', 'interface', 'organization', 'workflow'],
    dateAdded: '2025-02-16'
  },
  {
    id: 'blender-snap-objects-1',
    title: 'Snap Objects to Other Objects',
    thumbnail: getYouTubeThumbnail('Dt0PfqOc0ls'),
    category: 'Tools',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '10:45',
    youtubeId: 'Dt0PfqOc0ls',
    description: 'Master Blender\'s various snapping tools to precisely position objects relative to others.',
    keywords: ['blender', 'snap', 'align', 'position', 'precision', 'workflow'],
    dateAdded: '2025-02-17'
  },
  {
    id: 'blender-addons-new-1',
    title: 'Brand New Blender Addons',
    thumbnail: getYouTubeThumbnail('6yhUB9UuEXw'),
    category: 'Addons',
    software: 'Blender',
    skillLevel: 'All Levels',
    duration: '24:30',
    youtubeId: '6yhUB9UuEXw',
    description: 'Showcase of the latest and most useful Blender addons to enhance your workflow.',
    keywords: ['blender', 'addons', 'plugins', 'workflow', 'tools', 'extension'],
    dateAdded: '2025-02-19'
  },
  {
    id: 'blender-randomize-transform-1',
    title: 'Randomize Transform',
    thumbnail: getYouTubeThumbnail('S1XiO-TCxNc'),
    category: 'Tools',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '8:45',
    youtubeId: 'S1XiO-TCxNc',
    description: 'Learn how to add natural variation to multiple objects using Blender\'s randomize transform tools.',
    keywords: ['blender', 'randomize', 'transform', 'variation', 'natural', 'scatter'],
    dateAdded: '2025-02-20'
  },
  {
    id: 'blender-magic-wand-1',
    title: 'Magic Wand Tutorial',
    thumbnail: getYouTubeThumbnail('LCrFYYgSKXc'),
    category: 'Tools',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '14:15',
    youtubeId: 'LCrFYYgSKXc',
    description: 'Use the magic wand selection tool in Blender to quickly select similar geometry.',
    keywords: ['blender', 'magic wand', 'selection', 'tool', 'similar', 'workflow'],
    dateAdded: '2025-02-21'
  },
  {
    id: 'blender-join-materials-1',
    title: 'Join Objects with multiple Materials',
    thumbnail: getYouTubeThumbnail('jnPbAr_kzK8'),
    category: 'Materials',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '12:35',
    youtubeId: 'jnPbAr_kzK8',
    description: 'Learn how to properly join objects while maintaining their individual materials in Blender.',
    keywords: ['blender', 'join', 'objects', 'materials', 'preserve', 'workflow'],
    dateAdded: '2025-02-23'
  },
  {
    id: 'blender-join-uv-1',
    title: 'How to Join Object without Losing the UV',
    thumbnail: getYouTubeThumbnail('RaIxZT_gLw0'),
    category: 'UV Mapping',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '15:20',
    youtubeId: 'RaIxZT_gLw0',
    description: 'Techniques for joining objects in Blender while preserving UV maps and unwrapping.',
    keywords: ['blender', 'uv', 'join', 'preserve', 'unwrap', 'texture'],
    dateAdded: '2025-02-24'
  },
  {
    id: 'blender-keyframes-1',
    title: 'Blender Keyframes for Beginners',
    thumbnail: getYouTubeThumbnail('LCrFYYgSKXc'),
    category: 'Animation',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '28:45',
    youtubeId: 'LCrFYYgSKXc',
    description: 'Introduction to keyframe animation in Blender for beginners - learn the fundamentals of animation.',
    keywords: ['blender', 'keyframes', 'animation', 'beginner', 'basics', 'timeline'],
    dateAdded: '2025-02-26'
  },
  {
    id: 'blender-export-video-1',
    title: 'Export to Video Format in Blender',
    thumbnail: getYouTubeThumbnail('URhyUmi0SRU'),
    category: 'Rendering',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '12:15',
    youtubeId: 'URhyUmi0SRU',
    description: 'Learn how to properly render and export your Blender animations to various video formats.',
    keywords: ['blender', 'render', 'export', 'video', 'format', 'animation'],
    dateAdded: '2025-02-27'
  },
  {
    id: 'blender-energy-sphere-1',
    title: 'Blender Stylized Energy Sphere',
    thumbnail: getYouTubeThumbnail('Zb52QdC087I'),
    category: 'Effects',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '22:10',
    youtubeId: 'Zb52QdC087I',
    description: 'Create a stylized energy sphere effect in Blender for games and motion graphics.',
    keywords: ['blender', 'energy', 'sphere', 'stylized', 'effect', 'shader'],
    dateAdded: '2025-02-28'
  },
  {
    id: 'blender-energy-sphere-2',
    title: 'Blender Stylized Energy Sphere 2',
    thumbnail: getYouTubeThumbnail('9ehbb93atqo'),
    category: 'Effects',
    software: 'Blender',
    skillLevel: 'Advanced',
    duration: '28:40',
    youtubeId: '9ehbb93atqo',
    description: 'Advanced techniques for creating dynamic, animated energy spheres with complex shaders in Blender.',
    keywords: ['blender', 'energy', 'sphere', 'advanced', 'animation', 'particles'],
    dateAdded: '2025-03-07'
  },
  {
    id: 'blender-cinematic-orbs-1',
    title: 'Cinematic Orbs in Blender',
    thumbnail: getYouTubeThumbnail('7wICrFnznK8'),
    category: 'Effects',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '32:15',
    youtubeId: '7wICrFnznK8',
    description: 'Create cinematic-quality glowing orbs and energy effects in Blender.',
    keywords: ['blender', 'orbs', 'cinematic', 'effects', 'glow', 'energy'],
    dateAdded: '2025-03-09'
  },
  {
    id: 'blender-addons-minutes-1',
    title: '3 minutes is all you need. ADDONS',
    thumbnail: getYouTubeThumbnail('jnmiJBAgBvA'),
    category: 'Addons',
    software: 'Blender',
    skillLevel: 'All Levels',
    duration: '3:15',
    youtubeId: 'jnmiJBAgBvA',
    description: 'Quick overview of essential Blender addons that can drastically improve your workflow.',
    keywords: ['blender', 'addons', 'quick', 'essential', 'workflow', 'productivity'],
    dateAdded: '2025-03-10'
  },
  {
    id: 'blender-tips-50-1',
    title: '50 Blender tips into 1 video',
    thumbnail: getYouTubeThumbnail('4YDf_ctubbI'),
    category: 'Workflow',
    software: 'Blender',
    skillLevel: 'All Levels',
    duration: '42:30',
    youtubeId: '4YDf_ctubbI',
    description: 'Comprehensive collection of 50 essential Blender tips and tricks to improve your workflow.',
    keywords: ['blender', 'tips', 'workflow', 'productivity', 'tricks', 'techniques'],
    dateAdded: '2025-03-11'
  },
  {
    id: 'blender-strawberry-1',
    title: 'Strawberry Blender Tutorial',
    thumbnail: getYouTubeThumbnail('B1tfGZExhUA'),
    category: 'Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '25:40',
    youtubeId: 'B1tfGZExhUA',
    description: 'Create a photorealistic strawberry model with detailed textures in Blender.',
    keywords: ['blender', 'strawberry', 'fruit', 'modeling', 'texturing', 'realistic'],
    dateAdded: '2025-03-13'
  },
  {
    id: 'blender-rusted-texture-1',
    title: 'Rusted Texture Tutorial',
    thumbnail: getYouTubeThumbnail('iaPf5GDBfTs'),
    category: 'Materials',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '18:25',
    youtubeId: 'iaPf5GDBfTs',
    description: 'Create realistic rusted metal materials and textures in Blender.',
    keywords: ['blender', 'rust', 'texture', 'material', 'metal', 'weathering'],
    dateAdded: '2025-03-14'
  },
  {
    id: 'blender-blend-objects-1',
    title: 'Blender Blend Objects',
    thumbnail: getYouTubeThumbnail('Tw16zVjjtqw'),
    category: 'Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '14:50',
    youtubeId: 'Tw16zVjjtqw',
    description: 'Learn techniques for smoothly blending between different objects and shapes in Blender.',
    keywords: ['blender', 'blend', 'objects', 'smooth', 'transition', 'modeling'],
    dateAdded: '2025-03-15'
  },
  {
    id: 'blender-wood-material-1',
    title: 'Blender Wood Material',
    thumbnail: getYouTubeThumbnail('EoQgq7n9Rwk'),
    category: 'Materials',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '22:15',
    youtubeId: 'EoQgq7n9Rwk',
    description: 'Create realistic procedural wood materials with proper grain patterns in Blender.',
    keywords: ['blender', 'wood', 'material', 'procedural', 'grain', 'texture'],
    dateAdded: '2025-03-16'
  },
  {
    id: 'blender-design-rule-1',
    title: 'The most important rule in 3D / Visual Design',
    thumbnail: getYouTubeThumbnail('UroW_RKVsYc'),
    category: 'Design',
    software: 'Blender',
    skillLevel: 'All Levels',
    duration: '16:45',
    youtubeId: 'UroW_RKVsYc',
    description: 'Discover the fundamental design principles that make 3D models and visual designs successful.',
    keywords: ['blender', 'design', 'principles', 'visual', '3d', 'theory'],
    dateAdded: '2025-03-17'
  },
  {
    id: 'blender-garage-door-1',
    title: 'Rigging a Garage Door in Blender',
    thumbnail: getYouTubeThumbnail('J3kEAncTKSw'),
    category: 'Rigging',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '28:30',
    youtubeId: 'J3kEAncTKSw',
    description: 'Learn how to properly rig and animate a realistic garage door mechanism in Blender.',
    keywords: ['blender', 'garage door', 'rigging', 'animation', 'mechanical', 'constraints'],
    dateAdded: '2025-03-19'
  },
  {
    id: 'blender-scifi-door-1',
    title: 'Build a Sci Fi Animated Door',
    thumbnail: getYouTubeThumbnail('irYrSG3QK8k'),
    category: 'Animation',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '32:15',
    youtubeId: 'irYrSG3QK8k',
    description: 'Create and animate a futuristic sci-fi door with custom mechanics and effects in Blender.',
    keywords: ['blender', 'sci-fi', 'door', 'animation', 'futuristic', 'mechanical'],
    dateAdded: '2025-03-21'
  },
  {
    id: 'blender-save-selections-1',
    title: 'How to Save Selections',
    thumbnail: getYouTubeThumbnail('-mUqdk2qCkw'),
    category: 'Workflow',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '8:30',
    youtubeId: '-mUqdk2qCkw',
    description: 'Learn how to save and reuse selections in Blender to improve your modeling workflow.',
    keywords: ['blender', 'selection', 'save', 'workflow', 'productivity', 'technique'],
    dateAdded: '2025-03-23'
  },
  {
    id: 'blender-circular-arrays-1',
    title: 'Blender Circular Arrays',
    thumbnail: getYouTubeThumbnail('bLGYsd4lEjY'),
    category: 'Modifiers',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '14:25',
    youtubeId: 'bLGYsd4lEjY',
    description: 'Master circular array techniques in Blender for creating radial patterns and designs.',
    keywords: ['blender', 'circular', 'array', 'radial', 'pattern', 'modifiers'],
    dateAdded: '2025-03-24'
  },
  {
    id: 'blender-radial-arrays-1',
    title: 'Creating Radial Arrays',
    thumbnail: getYouTubeThumbnail('0fiJVTmw5Wc'),
    category: 'Modifiers',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '16:30',
    youtubeId: '0fiJVTmw5Wc',
    description: 'Comprehensive guide to creating and manipulating radial array patterns in Blender.',
    keywords: ['blender', 'radial', 'array', 'pattern', 'circular', 'modifiers'],
    dateAdded: '2025-03-26'
  },
  {
    id: 'blender-plant-animation-1',
    title: 'Growing Plant Animation Part 1',
    thumbnail: getYouTubeThumbnail('3x6n0dQL0jU'),
    category: 'Animation',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '24:45',
    youtubeId: '3x6n0dQL0jU',
    description: 'First part of a tutorial on creating realistic growing plant animations in Blender.',
    keywords: ['blender', 'plant', 'growth', 'animation', 'nature', 'tutorial'],
    dateAdded: '2025-03-27'
  },
  {
    id: 'blender-plant-animation-2',
    title: 'Growing Plant Animation Part 2',
    thumbnail: getYouTubeThumbnail('qJgbhKcHKsY'),
    category: 'Animation',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '26:15',
    youtubeId: 'qJgbhKcHKsY',
    description: 'Second part of a tutorial on creating realistic growing plant animations in Blender.',
    keywords: ['blender', 'plant', 'growth', 'animation', 'nature', 'tutorial'],
    dateAdded: '2025-03-29'
  },
  {
    id: 'blender-secrets-channel-1',
    title: 'BlenderSecrets : Youtuber with Timelapse',
    thumbnail: placeholderImage,
    category: 'Creators',
    software: 'Blender',
    skillLevel: 'All Levels',
    duration: '0:00',
    youtubeId: '',
    description: 'BlenderSecrets YouTube channel featuring useful tips, tricks and timelapses for Blender users.',
    keywords: ['blender', 'secrets', 'youtuber', 'timelapse', 'tips', 'tricks'],
    dateAdded: '2025-03-30'
  },
  {
    id: 'blender-grid-fill-1',
    title: 'The Magic Grid Fill',
    thumbnail: getYouTubeThumbnail('IMCsWxVvU5Q'),
    category: 'Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '12:35',
    youtubeId: 'IMCsWxVvU5Q',
    description: 'Master the powerful grid fill tool in Blender for efficiently filling complex holes and gaps.',
    keywords: ['blender', 'grid fill', 'modeling', 'holes', 'topology', 'technique'],
    dateAdded: '2025-03-31'
  },
  {
    id: 'blender-ornaments-1',
    title: 'Drawing Tempered Ornaments',
    thumbnail: getYouTubeThumbnail('IQrLlJFdwTY'),
    category: 'Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '18:45',
    youtubeId: 'IQrLlJFdwTY',
    description: 'Create detailed ornamental designs and patterns in Blender for architectural and decorative elements.',
    keywords: ['blender', 'ornaments', 'patterns', 'decorative', 'modeling', 'architecture'],
    dateAdded: '2025-04-01'
  },
  
  // Additional videos from the latest list
  {
    id: 'blender-draw-cables-1',
    title: 'Draw Cables',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '15:20',
    youtubeId: 'JMBMHSca_j0',
    description: 'Learn efficient techniques for creating realistic cable and wire models in Blender.',
    keywords: ['blender', 'cables', 'wires', 'modeling', 'hard surface', 'tutorial'],
    dateAdded: '2025-03-28'
  },
  {
    id: 'blender-sticky-notes-1',
    title: '3D Sticky Notes',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Workflow',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '8:45',
    youtubeId: 'JMBMHSca_j0',
    description: 'Create virtual sticky notes in your Blender scene to organize your workflow and annotate your models.',
    keywords: ['blender', 'sticky notes', 'organization', 'workflow', 'annotation', 'productivity'],
    dateAdded: '2025-03-29'
  },
  {
    id: 'blender-retopology-tips-1',
    title: 'Retopology Tips and Tricks',
    thumbnail: getYouTubeThumbnail('JAVuPYCcd1k'),
    category: 'Retopology',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '24:15',
    youtubeId: 'JAVuPYCcd1k',
    description: 'Master essential retopology techniques for creating clean, efficient topology from sculpted meshes.',
    keywords: ['blender', 'retopology', 'topology', 'modeling', 'optimization', 'workflow'],
    dateAdded: '2025-04-01'
  },
  {
    id: 'blender-loop-tools-retopology-1',
    title: 'Loop Tools - Smoothing Methods - Retopology',
    thumbnail: getYouTubeThumbnail('AJ3NHU6uXvk'),
    category: 'Retopology',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '18:30',
    youtubeId: 'AJ3NHU6uXvk',
    description: 'Using Loop Tools add-on for efficient topology editing and smoothing in Blender.',
    keywords: ['blender', 'loop tools', 'smoothing', 'retopology', 'add-on', 'workflow'],
    dateAdded: '2025-04-02'
  },
  {
    id: 'blender-retopo-settings-1',
    title: 'Retopo Settings',
    thumbnail: getYouTubeThumbnail('OY7FlJ8xTz0'),
    category: 'Retopology',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '15:40',
    youtubeId: 'OY7FlJ8xTz0',
    description: 'Optimize your retopology workflow with the best settings and configurations in Blender.',
    keywords: ['blender', 'retopology', 'settings', 'optimization', 'workflow', 'configuration'],
    dateAdded: '2025-04-03'
  },
  {
    id: 'blender-isometric-room-1',
    title: 'Create your 1st isometric Room',
    thumbnail: getYouTubeThumbnail('b3hI38dAaI0'),
    category: 'Architecture',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '32:15',
    youtubeId: 'b3hI38dAaI0',
    description: 'Step-by-step guide to creating your first isometric room in Blender - perfect for beginners.',
    keywords: ['blender', 'isometric', 'room', 'beginner', 'architecture', 'interior'],
    dateAdded: '2025-04-04'
  },
  {
    id: 'blender-addons-updates-1',
    title: '10 New Addons & Updates',
    thumbnail: placeholderImage,
    category: 'Addons',
    software: 'Blender',
    skillLevel: 'All Levels',
    duration: '22:15',
    youtubeId: '',
    description: 'Overview of 10 newly released and updated Blender addons to enhance your workflow.',
    keywords: ['blender', 'addons', 'updates', 'new', 'workflow', 'tools'],
    dateAdded: '2025-04-05'
  },
  {
    id: 'blender-edge-loops-methods-1',
    title: '5 Methods to add Edge Loops',
    thumbnail: getYouTubeThumbnail('WPn-vH3l694'),
    category: 'Modeling',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '14:20',
    youtubeId: 'WPn-vH3l694',
    description: 'Learn five different techniques for adding edge loops to your models in Blender.',
    keywords: ['blender', 'edge loops', 'modeling', 'topology', 'techniques', 'workflow'],
    dateAdded: '2025-04-06'
  },
  {
    id: 'blender-scaling-tips-1',
    title: '3 Scaling tips you may not know',
    thumbnail: getYouTubeThumbnail('qW1Kh1B_vFY'),
    category: 'Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '8:45',
    youtubeId: 'qW1Kh1B_vFY',
    description: 'Discover three lesser-known but powerful scaling techniques for precise modeling in Blender.',
    keywords: ['blender', 'scaling', 'tips', 'modeling', 'precision', 'techniques'],
    dateAdded: '2025-04-07'
  },
  {
    id: 'blender-curved-topology-1',
    title: 'Perfect topology on Curved surfaces using Shrinkwrap and Base Objects',
    thumbnail: placeholderImage,
    category: 'Topology',
    software: 'Blender',
    skillLevel: 'Advanced',
    duration: '22:30',
    youtubeId: '',
    description: 'Advanced techniques for creating clean topology on curved surfaces using shrinkwrap modifier.',
    keywords: ['blender', 'topology', 'curved surfaces', 'shrinkwrap', 'base objects', 'advanced'],
    dateAdded: '2025-04-08'
  },
  {
    id: 'blender-daily-secrets-2-1',
    title: 'Blender daily secrets part 2',
    thumbnail: getYouTubeThumbnail('4AttSorvirM'),
    category: 'Tips & Tricks',
    software: 'Blender',
    skillLevel: 'All Levels',
    duration: '15:40',
    youtubeId: '4AttSorvirM',
    description: 'Second part of the daily Blender secrets series with quick tips and techniques.',
    keywords: ['blender', 'secrets', 'tips', 'daily', 'tricks', 'workflow'],
    dateAdded: '2025-04-09'
  },
  {
    id: 'blender-curtain-1',
    title: 'How to make a curtain',
    thumbnail: getYouTubeThumbnail('YvvQcfGuy-U'),
    category: 'Cloth',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '18:35',
    youtubeId: 'YvvQcfGuy-U',
    description: 'Create realistic curtains with proper cloth physics and materials in Blender.',
    keywords: ['blender', 'curtain', 'cloth', 'simulation', 'material', 'interior'],
    dateAdded: '2025-04-10'
  },
  {
    id: 'blender-propeller-1',
    title: 'Easy Propeller',
    thumbnail: getYouTubeThumbnail('ZmI1gBAyUok'),
    category: 'Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '12:15',
    youtubeId: 'ZmI1gBAyUok',
    description: 'Learn to model and animate a realistic propeller in Blender with efficient techniques.',
    keywords: ['blender', 'propeller', 'modeling', 'animation', 'mechanical', 'tutorial'],
    dateAdded: '2025-04-11'
  },
  {
    id: 'blender-seamless-details-1',
    title: 'Seamless Details no Booleans Shrinkwrap & Snapping',
    thumbnail: getYouTubeThumbnail('l1AZybSzl8w'),
    category: 'Hard Surface',
    software: 'Blender',
    skillLevel: 'Advanced',
    duration: '24:30',
    youtubeId: 'l1AZybSzl8w',
    description: 'Create detailed hard surface models without boolean operations using shrinkwrap and snapping techniques.',
    keywords: ['blender', 'hard surface', 'details', 'shrinkwrap', 'snapping', 'no boolean'],
    dateAdded: '2025-04-12'
  },
  {
    id: 'blender-2d-to-3d-1',
    title: 'Turn 2D Images into 3D',
    thumbnail: getYouTubeThumbnail('4k8QReCNPNI'),
    category: 'Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '22:15',
    youtubeId: '4k8QReCNPNI',
    description: 'Convert 2D images into detailed 3D models in Blender using various techniques.',
    keywords: ['blender', '2d to 3d', 'conversion', 'modeling', 'images', 'reference'],
    dateAdded: '2025-04-13'
  },
  {
    id: 'blender-owl-tutorial-1-1',
    title: 'Default Cube Owl Tutorial 1/4 | Blocking',
    thumbnail: getYouTubeThumbnail('4xLdisAvjx8'),
    category: 'Character Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '28:15',
    youtubeId: '4xLdisAvjx8',
    description: 'First part of a four-part tutorial series on modeling a stylized owl - focusing on blocking out the basic shapes.',
    keywords: ['blender', 'owl', 'character', 'blocking', 'modeling', 'default cube'],
    dateAdded: '2025-04-14'
  },
  {
    id: 'blender-owl-tutorial-2-1',
    title: 'Default Cube Owl Tutorial 2/4 | Modeling',
    thumbnail: getYouTubeThumbnail('LbQ6_D-wLQs'),
    category: 'Character Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '32:20',
    youtubeId: 'LbQ6_D-wLQs',
    description: 'Second part of the owl modeling tutorial series - focusing on detailed modeling techniques.',
    keywords: ['blender', 'owl', 'character', 'modeling', 'details', 'default cube'],
    dateAdded: '2025-04-15'
  },
  {
    id: 'blender-owl-tutorial-3-1',
    title: 'Default Cube Owl Tutorial 3/4 | Shading',
    thumbnail: getYouTubeThumbnail('eX3skhOOmco'),
    category: 'Materials',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '26:45',
    youtubeId: 'eX3skhOOmco',
    description: 'Third part of the owl modeling series - focusing on materials, textures and shading.',
    keywords: ['blender', 'owl', 'shading', 'materials', 'textures', 'default cube'],
    dateAdded: '2025-04-16'
  },
  {
    id: 'blender-fix-artifacts-1',
    title: 'How to Fix Artifacts',
    thumbnail: getYouTubeThumbnail('0T3QdLJOBF8'),
    category: 'Troubleshooting',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '14:15',
    youtubeId: '0T3QdLJOBF8',
    description: 'Learn how to identify and fix common rendering artifacts and mesh issues in Blender.',
    keywords: ['blender', 'artifacts', 'fix', 'rendering', 'mesh', 'troubleshooting'],
    dateAdded: '2025-04-17'
  },
  
  // User Interface Tips
  {
    id: 'blender-tip-mod-pie-menu',
    title: 'Mod Pie Menu',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'User Interface',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '2:15',
    youtubeId: 'JMBMHSca_j0',
    description: 'Learn how to use Blender\'s Mod Pie Menu for faster access to common tools and functions.',
    keywords: ['blender', 'pie menu', 'interface', 'workflow', 'shortcut', 'ui'],
    dateAdded: '2025-04-18'
  },
  {
    id: 'blender-tip-viewport-shading-pie',
    title: 'Viewport Shading Pie Menu',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'User Interface',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '2:00',
    youtubeId: 'JMBMHSca_j0',
    description: 'Access viewport shading options quickly using Blender\'s pie menu system.',
    keywords: ['blender', 'viewport', 'shading', 'pie menu', 'interface', 'visualization'],
    dateAdded: '2025-04-18'
  },
  {
    id: 'blender-tip-toggle-xray',
    title: 'Toggle X-Ray Shortcut',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'User Interface',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '1:45',
    youtubeId: 'JMBMHSca_j0',
    description: 'Quickly toggle X-ray mode in Blender for better visibility through objects.',
    keywords: ['blender', 'x-ray', 'shortcut', 'visibility', 'viewport', 'interface'],
    dateAdded: '2025-04-18'
  },
  {
    id: 'blender-tip-matcaps',
    title: 'Inspect Surfaces Using MatCaps',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'User Interface',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '2:30',
    youtubeId: 'JMBMHSca_j0',
    description: 'Use MatCaps in Blender to better visualize surface details and model quality.',
    keywords: ['blender', 'matcaps', 'materials', 'visualization', 'inspection', 'viewport'],
    dateAdded: '2025-04-18'
  },
  {
    id: 'blender-tip-cavity',
    title: 'Cavity Visualization',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'User Interface',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '2:20',
    youtubeId: 'JMBMHSca_j0',
    description: 'Enhance model detail visibility using cavity shading in Blender\'s viewport.',
    keywords: ['blender', 'cavity', 'shading', 'viewport', 'details', 'visualization'],
    dateAdded: '2025-04-18'
  },
  {
    id: 'blender-tip-quad-view',
    title: 'Quad View',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'User Interface',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '2:30',
    youtubeId: 'JMBMHSca_j0',
    description: 'Maximize your modeling efficiency using Blender\'s quad view layout system.',
    keywords: ['blender', 'quad view', 'viewport', 'layout', 'multiple views', 'workflow'],
    dateAdded: '2025-04-18'
  },
  
  // Selection Tips
  {
    id: 'blender-tip-select-more-less',
    title: 'Select More/Less',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Selection',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '1:45',
    youtubeId: 'JMBMHSca_j0',
    description: 'Efficiently expand or contract your selection in Blender using Select More/Less commands.',
    keywords: ['blender', 'selection', 'select more', 'select less', 'modeling', 'workflow'],
    dateAdded: '2025-04-18'
  },
  {
    id: 'blender-tip-select-linked',
    title: 'Select Linked',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Selection',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '2:00',
    youtubeId: 'JMBMHSca_j0',
    description: 'Quickly select connected geometry in Blender using the Select Linked command.',
    keywords: ['blender', 'selection', 'linked', 'connected', 'modeling', 'workflow'],
    dateAdded: '2025-04-18'
  },
  {
    id: 'blender-tip-checker-deselect',
    title: 'Checker Deselect',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Selection',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '1:45',
    youtubeId: 'JMBMHSca_j0',
    description: 'Create alternating selection patterns with Checker Deselect for advanced modeling techniques.',
    keywords: ['blender', 'checker deselect', 'selection', 'pattern', 'modeling', 'technique'],
    dateAdded: '2025-04-18'
  },
  
  // Mesh Modeling Tips
  {
    id: 'blender-tip-edit-multiple',
    title: 'Edit Multiple Objects at Once',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '2:15',
    youtubeId: 'JMBMHSca_j0',
    description: 'Edit multiple objects simultaneously in Blender for efficient modeling workflow.',
    keywords: ['blender', 'multiple objects', 'edit mode', 'simultaneous', 'modeling', 'technique'],
    dateAdded: '2025-04-19'
  },
  {
    id: 'blender-tip-connect-vertex',
    title: 'Connect Vertex Path',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '2:30',
    youtubeId: 'JMBMHSca_j0',
    description: 'Create edge connections between vertices using the Connect Vertex Path tool in Blender.',
    keywords: ['blender', 'connect', 'vertex', 'path', 'edge', 'topology'],
    dateAdded: '2025-04-19'
  },
  {
    id: 'blender-tip-edge-vertex-slide',
    title: 'Edge / Vertex Slide',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '2:15',
    youtubeId: 'JMBMHSca_j0',
    description: 'Precisely reposition vertices and edges along existing geometry with the slide tools.',
    keywords: ['blender', 'edge slide', 'vertex slide', 'modeling', 'technique', 'precision'],
    dateAdded: '2025-04-19'
  },
  {
    id: 'blender-tip-boolean-edit-mode',
    title: 'Boolean in Edit Mode',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '2:45',
    youtubeId: 'JMBMHSca_j0',
    description: 'Perform boolean operations directly in edit mode for more control over the result.',
    keywords: ['blender', 'boolean', 'edit mode', 'modeling', 'technique', 'operation'],
    dateAdded: '2025-04-19'
  },
  {
    id: 'blender-tip-knife-project',
    title: 'Knife Project',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Modeling',
    software: 'Blender',
    skillLevel: 'Advanced',
    duration: '3:00',
    youtubeId: 'JMBMHSca_j0',
    description: 'Use the Knife Project tool to cut complex shapes into your models in Blender.',
    keywords: ['blender', 'knife project', 'cutting', 'modeling', 'advanced', 'technique'],
    dateAdded: '2025-04-19'
  },
  
  // Transformation Tips
  {
    id: 'blender-tip-reset-transforms',
    title: 'Reset Transforms',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Transformation',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '1:30',
    youtubeId: 'JMBMHSca_j0',
    description: 'Learn how to properly reset object transformations in Blender for clean modeling workflow.',
    keywords: ['blender', 'reset', 'transform', 'position', 'rotation', 'scale'],
    dateAdded: '2025-04-20'
  },
  {
    id: 'blender-tip-adjust-origins',
    title: 'Quickly Adjust Origins',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Transformation',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '2:15',
    youtubeId: 'JMBMHSca_j0',
    description: 'Efficiently modify object origin points in Blender for better control over transformations.',
    keywords: ['blender', 'origin', 'adjust', 'pivot', 'transformation', 'workflow'],
    dateAdded: '2025-04-20'
  },
  {
    id: 'blender-tip-transform-parents',
    title: 'Transform Parents without affecting Children',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Transformation',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '2:45',
    youtubeId: 'JMBMHSca_j0',
    description: 'Learn techniques to modify parent objects without affecting their children in Blender.',
    keywords: ['blender', 'parent', 'transform', 'hierarchy', 'children', 'technique'],
    dateAdded: '2025-04-20'
  },
  
  // Modifiers Tips
  {
    id: 'blender-tip-quick-favorites',
    title: 'Add Modifiers to Quick Favorites',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Modifiers',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '2:00',
    youtubeId: 'JMBMHSca_j0',
    description: 'Optimize your workflow by adding frequently used modifiers to Blender\'s Quick Favorites menu.',
    keywords: ['blender', 'modifiers', 'quick favorites', 'workflow', 'efficiency', 'shortcut'],
    dateAdded: '2025-04-21'
  },
  {
    id: 'blender-tip-apply-all-modifiers',
    title: 'Apply All Modifiers',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Modifiers',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '1:45',
    youtubeId: 'JMBMHSca_j0',
    description: 'Learn how to efficiently apply multiple modifiers at once in Blender.',
    keywords: ['blender', 'apply', 'modifiers', 'workflow', 'efficiency', 'finalize'],
    dateAdded: '2025-04-21'
  },
  {
    id: 'blender-tip-bevel-modifiers',
    title: 'Bevel Modifiers and Harden Normals',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Modifiers',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '3:00',
    youtubeId: 'JMBMHSca_j0',
    description: 'Create professional-looking bevels with proper normal handling in Blender.',
    keywords: ['blender', 'bevel', 'modifier', 'normals', 'harden', 'hard surface'],
    dateAdded: '2025-04-21'
  },
  {
    id: 'blender-tip-multiple-bevel',
    title: 'Multiple Bevel Modifiers',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Modifiers',
    software: 'Blender',
    skillLevel: 'Advanced',
    duration: '4:30',
    youtubeId: 'JMBMHSca_j0',
    description: 'Create complex edge detailing using multiple stacked bevel modifiers in Blender.',
    keywords: ['blender', 'bevel', 'multiple', 'stacking', 'hard surface', 'detail'],
    dateAdded: '2025-04-21'
  },
  {
    id: 'blender-tip-circular-array',
    title: 'Circular Array Shapes',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Modifiers',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '3:45',
    youtubeId: 'JMBMHSca_j0',
    description: 'Create circular patterns and shapes using array modifiers with rotation in Blender.',
    keywords: ['blender', 'circular', 'array', 'modifier', 'pattern', 'rotation'],
    dateAdded: '2025-04-21'
  },
  {
    id: 'blender-tip-robot-tentacle',
    title: 'Robot Tentacle Arms',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Modifiers',
    software: 'Blender',
    skillLevel: 'Advanced',
    duration: '5:15',
    youtubeId: 'JMBMHSca_j0',
    description: 'Create articulated robot tentacle arms using modifiers and constraints in Blender.',
    keywords: ['blender', 'tentacle', 'robot', 'arm', 'modifiers', 'mechanical'],
    dateAdded: '2025-04-21'
  },
  
  // Organization Tips
  {
    id: 'blender-tip-batch-rename',
    title: 'Quickly Rename and Batch Rename',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Organization',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '2:15',
    youtubeId: 'JMBMHSca_j0',
    description: 'Efficiently rename single or multiple objects at once in Blender for better organization.',
    keywords: ['blender', 'rename', 'batch', 'organization', 'workflow', 'efficiency'],
    dateAdded: '2025-04-22'
  },
  {
    id: 'blender-tip-collections',
    title: 'Collection Galore',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Organization',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '2:30',
    youtubeId: 'JMBMHSca_j0',
    description: 'Master Blender\'s collection system for better scene organization and management.',
    keywords: ['blender', 'collections', 'organization', 'management', 'scene', 'workflow'],
    dateAdded: '2025-04-22'
  },
  {
    id: 'blender-tip-collection-instance',
    title: 'Instancing Collection',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Organization',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '3:15',
    youtubeId: 'JMBMHSca_j0',
    description: 'Use collection instances to create multiple copies of object groups that update simultaneously.',
    keywords: ['blender', 'collection', 'instance', 'duplicate', 'linked', 'organization'],
    dateAdded: '2025-04-22'
  },
  {
    id: 'blender-tip-parent-outliner',
    title: 'Parent in Outliner',
    thumbnail: getYouTubeThumbnail('JMBMHSca_j0'),
    category: 'Organization',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '2:00',
    youtubeId: 'JMBMHSca_j0',
    description: 'Learn efficient parenting techniques using Blender\'s outliner for better object hierarchy.',
    keywords: ['blender', 'parent', 'outliner', 'hierarchy', 'organization', 'workflow'],
    dateAdded: '2025-04-22'
  },
  
  // Helper functions for filtering and searching videos
  // [These remain the same as in your original file]

];

// Helper functions for filtering and searching videos
export const getUniqueCategories = (): string[] => {
  return ['All', ...new Set(videoData.map(video => video.category))];
};

export const getUniqueSoftware = (): string[] => {
  return ['All', ...new Set(videoData.map(video => video.software))];
};

export const getVideosByCategory = (category: string): Video[] => {
  if (category.toLowerCase() === 'all') {
    return videoData;
  }
  return videoData.filter(video => video.category === category);
};

export const getVideosBySoftware = (software: string): Video[] => {
  if (software.toLowerCase() === 'all') {
    return videoData;
  }
  return videoData.filter(video => video.software === software);
};

export const getVideosBySkillLevel = (skillLevel: string): Video[] => {
  if (skillLevel.toLowerCase() === 'all') {
    return videoData;
  }
  return videoData.filter(video => video.skillLevel === skillLevel);
};

export const searchVideos = (searchTerm: string): Video[] => {
  const term = searchTerm.toLowerCase();
  return videoData.filter(video => 
    video.title.toLowerCase().includes(term) || 
    video.keywords.some(keyword => keyword.toLowerCase().includes(term)) ||
    (video.description && video.description.toLowerCase().includes(term))
  );
};

export const getMostRecentVideos = (count: number = 6): Video[] => {
  return [...videoData]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, count);
};