import { createFileRoute, Link } from '@tanstack/react-router'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { SEO } from '../components/SEO/SEO'
import { isAuthenticated, getCurrentUser } from '../utils/auth'
import { useState } from 'react'
import { supabase } from '../utils/supabase/client'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  // Get current admin user if authenticated
  const username = isAuthenticated() ? getCurrentUser() : null;
  
  // Suggestion modal state
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false)
  const [suggestionType, setSuggestionType] = useState('feature')
  const [suggestionText, setSuggestionText] = useState('')
  const [submittingFeedback, setSubmittingFeedback] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  
  // Submit suggestion to admin
  const submitSuggestion = async () => {
    if (!suggestionText.trim()) return;
    
    setSubmittingFeedback(true);
    
    try {
      // Insert suggestion into Supabase database
      const { data, error } = await supabase
        .from('suggestions')
        .insert([
          {
            type: suggestionType,
            text: suggestionText,
            page: 'home', // Page where suggestion was submitted
            status: 'new' // Default status for new suggestions
          }
        ]);
      
      if (error) {
        console.error('Error saving suggestion:', error);
        throw error;
      }
      
      console.log('Suggestion saved successfully to database');
      
      // Show success message
      setFeedbackSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setIsSuggestionModalOpen(false);
        setSuggestionText('');
        setFeedbackSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Error in suggestion submission:', error);
      alert('Failed to save your suggestion. Please try again later.');
    } finally {
      setSubmittingFeedback(false);
    }
  };
  
  const menuItems = [
    {
      icon: '💰',
      title: 'Print Cost Calculator',
      description: 'Calculate the exact cost of your 3D prints based on material, electricity, and other factors',
      path: '/calculator',
      gradient: 'from-emerald-500 to-teal-500',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500'
    },
    {
      icon: '🧬',
      title: 'Material Guide',
      description: 'Comprehensive guide to 3D printing materials: PLA, ABS, PETG, TPU, and more',
      path: '/materials',
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500'
    },
    {
      icon: '🔩',
      title: 'Hardware Guide',
      description: 'Essential hardware for 3D printing projects: screws, nuts, bolts, threaded inserts, bearings, and more',
      path: '/hardware',
      gradient: 'from-indigo-500 to-purple-500',
      iconBg: 'bg-indigo-500/10',
      iconColor: 'text-indigo-500'
    },
    {
      icon: '🛠️',
      title: 'Tools & Equipment',
      description: '3D printer maintenance tools, calibration equipment, post-processing tools, and safety gear',
      path: '/tools',
      gradient: 'from-orange-500 to-red-500',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-500'
    },
    {
      icon: '⚙️',
      title: 'Setup, Electronics & Upgrades',
      description: 'Complete guides for printer setup, calibration, maintenance, electronics, firmware configuration, and upgrade paths',
      path: '/setup-electronics',
      gradient: 'from-purple-500 to-indigo-500',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500'
    },
    {
      icon: '📆',
      title: 'Calendar',
      description: 'Important dates and holidays to help you plan your 3D printing projects and special occasion prints',
      path: '/calendar',
      gradient: 'from-rose-500 to-pink-500',
      iconBg: 'bg-rose-500/10',
      iconColor: 'text-rose-500'
    },
    {
      icon: '🌟',
      title: 'Links',
      description: 'Featured 3D printing YouTubers, content creators, and valuable community resources',
      path: '/links',
      gradient: 'from-yellow-500 to-orange-500',
      iconBg: 'bg-yellow-500/10',
      iconColor: 'text-yellow-500'
    },
    {
      icon: '📺',
      title: 'Video Library',
      description: 'Curated collection of tutorials and guides for 3D modeling and printing software',
      path: '/resources/video-library',
      gradient: 'from-red-500 to-pink-500',
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-500'
    },
    {
      icon: '🎨',
      title: 'Design & Modeling',
      description: 'CAD software guides, design tips, model optimization, and file preparation techniques',
      path: '/design-and-postprocessing',
      gradient: 'from-sky-500 to-blue-500',
      iconBg: 'bg-sky-500/10',
      iconColor: 'text-sky-500'
    },
    {
      icon: '✨',
      title: 'Post-Processing',
      description: 'Finishing techniques, painting guides, assembly tips, and surface treatment methods',
      path: '/design-and-postprocessing',
      gradient: 'from-violet-500 to-purple-500',
      iconBg: 'bg-violet-500/10',
      iconColor: 'text-violet-500'
    }
  ]

  return (
    <>
      <SEO 
        title="3D Print Wiki - Home | Your Complete 3D Printing Resource"
        description="Explore comprehensive 3D printing guides, material databases, cost calculators, and troubleshooting resources. Learn everything about FDM, SLA, and resin printing in one place."
        keywords="3D printing guide, 3D print wiki, FDM printing, SLA printing, resin printing, 3D printer materials, 3D printing cost calculator, 3D printing troubleshooting"
      />
      <div className="min-h-screen overflow-hidden">
      <div className="fixed inset-0">
        <AnimatedBackground />
      </div>
      <div className="min-h-screen bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm flex flex-col justify-center items-center transition-colors relative z-10 py-8 px-1 overflow-hidden">
        {/* Social Links - top left corner */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          {username && (
            <Link
              to="/admin"
              className="bg-blue-600/90 hover:bg-blue-700 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 text-white font-medium flex items-center cursor-pointer"
              title="Go to Admin Panel"
            >
              <span>{username}</span>
            </Link>
          )}
          <a
            href="https://github.com/pgpavlides"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800/90 hover:bg-gray-700 dark:bg-gray-700/90 dark:hover:bg-gray-600 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
            title="GitHub"
          >
            <img src="/svg/github.svg" alt="GitHub" className="w-6 h-6" />
          </a>
          <a
            href="https://buymeacoffee.com/broccolidev"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FFDD00]/90 hover:bg-[#FFEE00] p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
            title="Buy Me a Coffee"
          >
            <img src="/svg/buymeacoffee.svg" alt="Buy Me a Coffee" className="w-6 h-6" />
          </a>
        </div>

        <div className="max-w-full mx-auto px-2 sm:px-3 lg:px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="mb-6">
              <img 
                src="/logo/logo.svg" 
                alt="3D Print Wiki Logo" 
                className="h-32 w-32 mx-auto"
              />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
              3D Print Wiki
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Where Knowledge Takes Shape
            </p>
          </div>

          {/* Grid Menu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 auto-rows-fr">
            {menuItems.map((item, index) => (
              <div key={index} className="group relative w-full h-full">
                <Link
                  to={item.path}
                  className="block relative overflow-hidden rounded-2xl bg-white dark:bg-slate-950 shadow-lg dark:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-blue-500/10 h-full min-h-[160px]"
                >
                  {/* Background gradients */}
                  <div className={`absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br ${item.gradient} opacity-20 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70`} />
                  <div className={`absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-gradient-to-br ${item.gradient} opacity-20 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70`} />

                  <div className="relative p-4 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}>
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 flex-grow">
                      {item.description}
                    </p>
                    
                    <div className={`group/btn relative overflow-hidden rounded-lg bg-gradient-to-r ${item.gradient} p-px font-semibold text-white mt-auto`}>
                      <div className="relative rounded-lg bg-white dark:bg-slate-950 px-3 py-2 text-sm transition-all duration-300 group-hover/btn:bg-opacity-0 dark:group-hover/btn:bg-opacity-0">
                        <span className="relative flex items-center justify-center gap-2 bg-gradient-to-r bg-clip-text text-transparent group-hover/btn:text-white ${item.gradient}">
                          Explore Now
                          <svg className="h-3 w-3 text-gray-900 dark:text-white group-hover/btn:text-white transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          {/* Very subtle admin link at bottom */}
          <div className="text-center mt-16">
            <p className="text-base text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} 3D Print Wiki • <button 
                onClick={() => setIsSuggestionModalOpen(true)}
                className="text-blue-600 dark:text-blue-400 hover:underline text-base font-medium px-1 py-1 inline-block"
              >Leave Suggestions and additions here!</button>
            </p>
          </div>
        </div>
      </div>
      </div>
      
      {/* Suggestion Modal */}
      {isSuggestionModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
          <div className="relative p-4 bg-white dark:bg-gray-800 w-full max-w-md m-auto rounded-lg shadow-xl">
            {/* Modal header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {feedbackSubmitted ? "Thank you!" : "Leave a Suggestion"}
              </h3>
              {!submittingFeedback && (
                <button 
                  onClick={() => setIsSuggestionModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Modal content */}
            {feedbackSubmitted ? (
              <div className="text-center py-4">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700 dark:text-gray-300">Your suggestion has been submitted successfully!</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Suggestion Type
                  </label>
                  <select
                    value={suggestionType}
                    onChange={(e) => setSuggestionType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="feature">New Feature</option>
                    <option value="bug">Bug Report</option>
                    <option value="content">Content Addition</option>
                    <option value="improvement">Improvement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Suggestion
                  </label>
                  <textarea
                    value={suggestionText}
                    onChange={(e) => setSuggestionText(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Please describe your suggestion or report in detail..."
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsSuggestionModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
                    disabled={submittingFeedback}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={submitSuggestion}
                    className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition duration-150 flex items-center"
                    disabled={submittingFeedback || !suggestionText.trim()}
                  >
                    {submittingFeedback ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
