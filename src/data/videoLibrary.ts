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

// Helper function to use a placeholder image for all thumbnails
const placeholderImage = '/video_thumbnails/placeholder.svg';

// Updated video data with placeholder images for all entries
export const videoData: Video[] = [
  // Blender Videos
  {
    id: 'blender-1',
    title: 'Beginner Blender 4.0 Tutorial - Full Course',
    thumbnail: placeholderImage,
    category: '3D Modeling',
    software: 'Blender',
    skillLevel: 'Beginner',
    duration: '2:15:30',
    youtubeId: '', // You'll need to add the actual YouTube ID
    description: 'A comprehensive beginner course for Blender 4.0, covering all the basics you need to know.',
    keywords: ['blender', 'beginner', 'tutorial', 'modeling', '3d', 'course'],
    dateAdded: '2025-05-01'
  },
  {
    id: 'blender-2',
    title: 'How to Model at LIGHTSPEED in Blender 3D',
    thumbnail: placeholderImage,
    category: '3D Modeling',
    software: 'Blender',
    skillLevel: 'Intermediate',
    duration: '25:40',
    youtubeId: '', // You'll need to add the actual YouTube ID
    description: 'Learn advanced techniques to dramatically speed up your modeling workflow in Blender.',
    keywords: ['blender', 'speed', 'modeling', 'efficiency', 'workflow', 'productivity'],
    dateAdded: '2025-04-15'
  },
  {
    id: 'blender-3',
    title: 'Easily create 3D Characters for Blender FAST',
    thumbnail: placeholderImage,
    category: '3D Modeling',
    software: 'Blender',
    skillLevel: 'Advanced',
    duration: '18:22',
    youtubeId: '', // You'll need to add the actual YouTube ID
    description: 'Advanced tutorial on creating detailed 3D characters efficiently in Blender.',
    keywords: ['blender', 'characters', '3d', 'modeling', 'character creation', 'fast workflow'],
    dateAdded: '2025-03-20'
  },

  // ZBrush Videos
  {
    id: 'zbrush-1',
    title: 'Learn Zbrush in 8 Minutes - Zbrush Beginner Tutorial',
    thumbnail: placeholderImage,
    category: '3D Modeling',
    software: 'ZBrush',
    skillLevel: 'Beginner',
    duration: '8:12',
    youtubeId: '', // You'll need to add the actual YouTube ID
    description: 'Quick crash course covering the essential ZBrush tools and concepts for beginners.',
    keywords: ['zbrush', 'beginner', 'quick', 'tutorial', 'sculpting', 'basics'],
    dateAdded: '2025-04-28'
  },
  {
    id: 'zbrush-2',
    title: 'Top 10 Tips ALL Zbrush Artists Should Know',
    thumbnail: placeholderImage,
    category: '3D Modeling',
    software: 'ZBrush',
    skillLevel: 'Intermediate',
    duration: '15:45',
    youtubeId: '', // You'll need to add the actual YouTube ID
    description: 'Ten essential ZBrush techniques that will improve your digital sculpting workflow.',
    keywords: ['zbrush', 'tips', 'sculpting', 'tricks', 'workflow', 'techniques'],
    dateAdded: '2025-04-05'
  },
  {
    id: 'zbrush-3',
    title: 'Using the ZBrush Pose Tools Plugin & Character Creator to Animate',
    thumbnail: placeholderImage,
    category: '3D Modeling',
    software: 'ZBrush',
    skillLevel: 'Advanced',
    duration: '32:18',
    youtubeId: '', // You'll need to add the actual YouTube ID
    description: 'Learn how to use ZBrush Pose Tools to efficiently animate and pose your character models.',
    keywords: ['zbrush', 'pose', 'character creator', 'animation', 'plugin', 'rigging'],
    dateAdded: '2025-03-12'
  },
  {
    id: 'zbrush-4',
    title: 'Posing a Custom ZBrush Character in Character Creator',
    thumbnail: placeholderImage,
    category: '3D Modeling',
    software: 'ZBrush',
    skillLevel: 'Advanced',
    duration: '28:45',
    youtubeId: '', // You'll need to add the actual YouTube ID
    description: 'Comprehensive guide on posing ZBrush characters using Character Creator.',
    keywords: ['zbrush', 'character creator', 'posing', 'animation', 'custom character'],
    dateAdded: '2025-02-20'
  },
  {
    id: 'zbrush-5',
    title: '3D Printing and Character Posing with ZBrush & Character Creator',
    thumbnail: placeholderImage,
    category: '3D Modeling',
    software: 'ZBrush',
    skillLevel: 'Advanced',
    duration: '40:15',
    youtubeId: '', // You'll need to add the actual YouTube ID
    description: 'Learn to prepare and pose your ZBrush characters for 3D printing using Character Creator.',
    keywords: ['zbrush', 'character creator', '3d printing', 'posing', 'preparation'],
    dateAdded: '2025-02-05'
  },
  {
    id: 'zbrush-6',
    title: 'Posing ZBrush Characters with Character Creator & AccuRiG',
    thumbnail: placeholderImage,
    category: '3D Modeling',
    software: 'ZBrush',
    skillLevel: 'Advanced',
    duration: '35:22',
    youtubeId: '', // You'll need to add the actual YouTube ID
    description: 'Advanced tutorial on using AccuRiG with ZBrush and Character Creator for advanced posing.',
    keywords: ['zbrush', 'character creator', 'accurig', 'pose tools', 'rigging', 'link tutorial'],
    dateAdded: '2025-01-15'
  },

  // Character Creator (CC4) Videos
  {
    id: 'cc4-1',
    title: '3D Character Garment Creator Free For All! [FULL TUTORIAL]',
    thumbnail: placeholderImage,
    category: '3D Modeling',
    software: 'CC4',
    skillLevel: 'All Levels',
    duration: '45:30',
    youtubeId: '', // You'll need to add the actual YouTube ID
    description: 'Complete guide to creating realistic 3D garments in Character Creator 4.',
    keywords: ['character creator', 'cc4', 'garment', 'clothing', 'tutorial', 'cloth simulation'],
    dateAdded: '2025-04-10'
  },

  // Daz Videos
  {
    id: 'daz-1',
    title: 'How to Make 3D Characters Without Modeling in 2025 (FREE & EASY!)',
    thumbnail: placeholderImage,
    category: '3D Modeling',
    software: 'Daz',
    skillLevel: 'Beginner',
    duration: '22:15',
    youtubeId: '', // You'll need to add the actual YouTube ID
    description: 'Tutorial showing how to create stunning 3D characters in Daz without advanced modeling skills.',
    keywords: ['daz', 'characters', 'easy', 'free', 'no modeling', 'beginners'],
    dateAdded: '2025-05-02'
  },

  // Meshmixer Videos
  {
    id: 'meshmixer-1',
    title: 'How to cut STL models for 3D printing in Meshmixer',
    thumbnail: placeholderImage,
    category: 'Utility Tools',
    software: 'Meshmixer',
    skillLevel: 'Beginner',
    duration: '12:45',
    youtubeId: '', // You'll need to add the actual YouTube ID
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
    youtubeId: '', // You'll need to add the actual YouTube ID
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
    youtubeId: '', // You'll need to add the actual YouTube ID
    description: 'Create precise alignment pins in Meshmixer to perfectly assemble multi-part 3D printed models.',
    keywords: ['meshmixer', 'alignment', 'pins', 'assembly', 'precision', 'multi-part', 'joining'],
    dateAdded: '2025-02-25'
  }
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