import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { SEO } from '../../components/SEO/SEO';
import { videoData, Video } from '../../data/videoLibrary';

export const Route = createFileRoute('/resources/video-library')({
  component: VideoLibraryPage,
});

function VideoLibraryPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSoftware, setSelectedSoftware] = useState<string>('all');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Generate unique categories, software, and skill levels for filters
  const categories = ['all', ...new Set(videoData.map(video => video.category))];
  const software = ['all', ...new Set(videoData.map(video => video.software))];
  const skillLevels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  // Filter videos based on search term and selected filters
  const filteredVideos = videoData.filter(video => {
    const matchesSearch = 
      searchTerm === '' || 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSoftware = selectedSoftware === 'all' || video.software === selectedSoftware;
    const matchesSkillLevel = selectedSkillLevel === 'all' || video.skillLevel === selectedSkillLevel;
    
    return matchesSearch && matchesCategory && matchesSoftware && matchesSkillLevel;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSoftware('all');
    setSelectedSkillLevel('all');
  };

  return (
    <>
      <SEO
        title="3D Printing Video Library | 3D Print Wiki"
        description="Browse our curated collection of 3D printing and modeling tutorial videos. Learn Blender, ZBrush, Meshmixer, and more."
        keywords="3D printing videos, Blender tutorials, ZBrush tutorials, Meshmixer guides, 3D modeling tutorials"
        url="https://3dprintwiki.com/resources/video-library"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              3D Printing Video Library
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Curated tutorials and guides for 3D printing and modeling software.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search by title or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="font-medium">Filters</span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Software
                    </label>
                    <select
                      value={selectedSoftware}
                      onChange={(e) => setSelectedSoftware(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {software.map((sw) => (
                        <option key={sw} value={sw}>
                          {sw === 'all' ? 'All Software' : sw}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Skill Level
                    </label>
                    <select
                      value={selectedSkillLevel}
                      onChange={(e) => setSelectedSkillLevel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {skillLevels.map((level) => (
                        <option key={level} value={level}>
                          {level === 'all' ? 'All Skill Levels' : level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative pb-[56.25%] h-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="absolute h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/video_thumbnails/placeholder.svg';
                    }}
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs font-medium px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      video.skillLevel === 'Beginner' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      video.skillLevel === 'Intermediate' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                      video.skillLevel === 'Advanced' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}>
                      {video.skillLevel}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">
                      {video.software}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {video.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {video.keywords.slice(0, 3).map((keyword, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                      >
                        #{keyword}
                      </span>
                    ))}
                    {video.keywords.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{video.keywords.length - 3} more
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank')}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
                    </svg>
                    Watch Video
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 10.5a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0v-3.75a.75.75 0 01.75-.75zm4.5 0a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0v-3.75a.75.75 0 01.75-.75z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 16.5c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7z" />
              </svg>
              <p className="text-xl text-gray-500 dark:text-gray-400">
                No videos found matching your criteria.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}