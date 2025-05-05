import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { SEO } from '../../components/SEO/SEO';
import { videoData } from '../../data/videoLibrary';

export const Route = createFileRoute('/resources/video-library')({
  component: VideoLibraryPage,
});

// Define interfaces
interface Video {
  id: string;
  title: string;
  software: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  youtubeId: string;
  category: string;
}

function VideoLibraryPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSoftware, setSelectedSoftware] = useState<string>('all');
  // State for skill level filter grid
  const [selectedSkillLevels, setSelectedSkillLevels] = useState<string[]>(['all']);

  // Toggle skill level selection
  const toggleSkillLevel = (level: string) => {
    if (level === 'all') {
      setSelectedSkillLevels(['all']);
    } else {
      const newSelection = selectedSkillLevels.includes(level)
        ? selectedSkillLevels.filter(l => l !== level)
        : [...selectedSkillLevels.filter(l => l !== 'all'), level];
      
      setSelectedSkillLevels(newSelection.length ? newSelection : ['all']);
    }
    setCurrentPage(1);
  };
  const [currentPage, setCurrentPage] = useState<number>(1);
  const videosPerPage = 15; // Increased to show 15 entries

  // Map videoData to match the original structure
  const mappedVideoData: Video[] = videoData.map(video => ({
    id: video.id,
    title: video.title,
    software: video.software,
    skillLevel: video.skillLevel,
    duration: video.duration,
    youtubeId: video.youtubeId || '', // Provide empty string if youtubeId is missing
    category: video.category
  }));

  // Generate unique categories, software, and skill levels for filters
  const categories = ['all', ...new Set(mappedVideoData.map(video => video.category))];
  const software = ['all', ...new Set(mappedVideoData.map(video => video.software))];
  const skillLevels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  // Filter videos based on search term and selected filters
  const filteredVideos = mappedVideoData.filter(video => {
    const matchesSearch = 
      searchTerm === '' || 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.software.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSoftware = selectedSoftware === 'all' || video.software === selectedSoftware;
    const matchesSkillLevel = selectedSkillLevels.includes('all') || selectedSkillLevels.includes(video.skillLevel);
    
    return matchesSearch && matchesCategory && matchesSoftware && matchesSkillLevel;
  });

  // Pagination logic
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSoftware('all');
    setSelectedSkillLevels(['all']);
    setCurrentPage(1);
  };

  return (
    <>
      <SEO
        title="3D Printing Video Library | 3D Print Wiki"
        description="Browse our curated collection of 3D printing and modeling tutorial videos. Learn Blender, ZBrush, Meshmixer, and more."
        keywords="3D printing videos, Blender tutorials, ZBrush tutorials, Meshmixer guides, 3D modeling tutorials"
        url="https://3dprintwiki.com/resources/video-library"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-2 transition-colors">
        <div className="max-w-full mx-auto px-1 sm:px-2 lg:px-3">
          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              3D Printing Video Library
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Curated tutorials and guides for 3D printing and modeling software.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            {/* Left Sidebar - Search and Filters */}
            <div className="w-full md:w-1/5">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 mb-3">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Search & Filters</h2>
                
                <div className="space-y-2">
                  <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Find Videos
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        id="search"
                        type="text"
                        placeholder="Search tutorials..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-base font-medium"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="software" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
                      Software
                    </label>
                    <select
                      id="software"
                      value={selectedSoftware}
                      onChange={(e) => {
                        setSelectedSoftware(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-xs"
                    >
                      {software.map((sw) => (
                        <option key={sw} value={sw}>
                          {sw === 'all' ? 'All Software' : sw}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5">
                      Category
                    </label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-xs"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Skill Level
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div 
                        onClick={() => toggleSkillLevel('all')}
                        className={`flex flex-col items-center justify-center p-2 rounded border ${selectedSkillLevels.includes('all') ? 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500 font-bold' : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600'} cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        <span className="text-xs font-medium">All Levels</span>
                      </div>
                      
                      <div 
                        onClick={() => toggleSkillLevel('Beginner')}
                        className={`flex flex-col items-center justify-center p-2 rounded border ${selectedSkillLevels.includes('Beginner') ? 'bg-green-300 dark:bg-green-700 border-green-400 dark:border-green-600 font-bold' : 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-800'} cursor-pointer hover:bg-green-300 dark:hover:bg-green-700 transition-colors`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700 dark:text-green-300 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span className="text-xs font-medium">Beginner</span>
                      </div>
                      
                      <div 
                        onClick={() => toggleSkillLevel('Intermediate')}
                        className={`flex flex-col items-center justify-center p-2 rounded border ${selectedSkillLevels.includes('Intermediate') ? 'bg-yellow-300 dark:bg-yellow-700 border-yellow-400 dark:border-yellow-600 font-bold' : 'bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-800'} cursor-pointer hover:bg-yellow-300 dark:hover:bg-yellow-700 transition-colors`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-700 dark:text-yellow-300 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-xs font-medium">Intermediate</span>
                      </div>
                      
                      <div 
                        onClick={() => toggleSkillLevel('Advanced')}
                        className={`flex flex-col items-center justify-center p-2 rounded border ${selectedSkillLevels.includes('Advanced') ? 'bg-orange-300 dark:bg-orange-700 border-orange-400 dark:border-orange-600 font-bold' : 'bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-800'} cursor-pointer hover:bg-orange-300 dark:hover:bg-orange-700 transition-colors`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-700 dark:text-orange-300 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17l6-6" />
                        </svg>
                        <span className="text-xs font-medium">Advanced</span>
                      </div>
                      
                      <div 
                        onClick={() => toggleSkillLevel('All Levels')}
                        className={`flex flex-col items-center justify-center p-2 rounded border ${selectedSkillLevels.includes('All Levels') ? 'bg-blue-300 dark:bg-blue-700 border-blue-400 dark:border-blue-600 font-bold' : 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-800'} cursor-pointer hover:bg-blue-300 dark:hover:bg-blue-700 transition-colors`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700 dark:text-blue-300 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-xs font-medium">For Everyone</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={resetFilters}
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
                <div className="text-xs text-gray-700 dark:text-gray-300">
                  <p className="font-medium">Total videos: {filteredVideos.length}</p>
                  <p>Showing {indexOfFirstVideo + 1}-{Math.min(indexOfLastVideo, filteredVideos.length)} of {filteredVideos.length}</p>
                </div>
              </div>
            </div>

            {/* Right Content - Video Table */}
            <div className="w-full md:w-4/5">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Software
                      </th>
                      <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Level
                      </th>
                      <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Duration
                      </th>
                      <th scope="col" className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Watch
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {currentVideos.map((video) => (
                      <tr key={video.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-2 py-1.5">
                          <div className="text-xs font-medium text-gray-900 dark:text-white">
                            {video.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{video.category}</div>
                        </td>
                        <td className="px-2 py-1.5 whitespace-nowrap">
                          <div className="text-xs text-gray-900 dark:text-white">{video.software}</div>
                        </td>
                        <td className="px-2 py-1.5 whitespace-nowrap">
                          <span className={`px-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            video.skillLevel === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            video.skillLevel === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            video.skillLevel === 'Advanced' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-200'
                          }`}>
                            {video.skillLevel}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 whitespace-nowrap">
                          <div className="text-xs text-gray-900 dark:text-white">{video.duration}</div>
                        </td>
                        <td className="px-2 py-1.5 whitespace-nowrap text-xs font-medium">
                          <a
                            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <span className="flex items-center">
                              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
                              </svg>
                              Watch
                            </span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* No Results */}
                {filteredVideos.length === 0 && (
                  <div className="text-center py-12 bg-white dark:bg-gray-800">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 10.5a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0v-3.75a.75.75 0 01.75-.75zm4.5 0a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0v-3.75a.75.75 0 01.75-.75z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 16.5c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7z" />
                    </svg>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
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

              {/* Pagination */}
              {filteredVideos.length > 0 && (
                <div className="mt-2 flex justify-center">
                  <nav>
                    <ul className="flex space-x-0.5">
                      <li>
                        <button
                          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                          disabled={currentPage === 1}
                          className={`px-1.5 py-0.5 rounded-md ${
                            currentPage === 1
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          &laquo;
                        </button>
                      </li>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <li key={number}>
                          <button
                            onClick={() => paginate(number)}
                            className={`px-1.5 py-0.5 rounded-md ${
                              currentPage === number
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                            }`}
                          >
                            {number}
                          </button>
                        </li>
                      ))}
                      
                      <li>
                        <button
                          onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                          disabled={currentPage === totalPages}
                          className={`px-1.5 py-0.5 rounded-md ${
                            currentPage === totalPages
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
