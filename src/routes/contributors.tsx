import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '../components/SEO/SEO'
import { useState } from 'react'
import { useNavigation } from '../contexts/NavigationContext'
import React from 'react'

export const Route = createFileRoute('/contributors')({
  component: ContributorsPage,
})

function ContributorsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { setCustomBackHandler } = useNavigation()

  // Set custom back handler when a category is active
  React.useEffect(() => {
    if (activeCategory) {
      setCustomBackHandler(() => () => setActiveCategory(null))
    } else {
      setCustomBackHandler(null)
    }
    
    return () => setCustomBackHandler(null)
  }, [activeCategory, setCustomBackHandler])

  const categoryCards = [
    {
      icon: '📺',
      title: 'YouTube Channels',
      description: 'Educational 3D printing content creators and channels',
      id: 'youtube-channels',
      gradient: 'from-red-500 to-red-600',
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-500'
    },
    {
      icon: '📦',
      title: '3D Resources',
      description: 'Platforms for downloading and sharing 3D models',
      id: '3d-resources',
      gradient: 'from-green-500 to-green-600',
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-500'
    },
    {
      icon: '👥',
      title: 'Communities',
      description: 'Online communities and forums for 3D printing enthusiasts',
      id: 'communities',
      gradient: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500'
    },
    {
      icon: '🛠️',
      title: 'Tools & Software',
      description: 'Essential software for 3D modeling, slicing, and design',
      id: 'tools-software',
      gradient: 'from-orange-500 to-orange-600',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-500'
    }
  ]

  const youtubeChannels = [
    {
      name: "CNC Kitchen",
      channelUrl: "https://www.youtube.com/@CNCKitchen"
    },
    {
      name: "Loyal Moses",
      channelUrl: "https://www.youtube.com/@LoyalMoses"
    },
    {
      name: "The Next Layer",
      channelUrl: "https://www.youtube.com/@thenextlayer"
    },
    {
      name: "Maker's Muse",
      channelUrl: "https://www.youtube.com/@MakersMuse"
    },
    {
      name: "Arne Bornheim",
      channelUrl: "https://www.youtube.com/@arnebornheim"
    },
    {
      name: "Rist Innovations",
      channelUrl: "https://www.youtube.com/@ristinnovations"
    },
    {
      name: "3D Printer Academy",
      channelUrl: "https://www.youtube.com/@3DPrinterAcademy"
    },
    {
      name: "Made with Layers (Thomas Sanladerer)",
      channelUrl: "https://www.youtube.com/@MadeWithLayers"
    },
    {
      name: "The Swedish Maker",
      channelUrl: "https://www.youtube.com/@TheSwedishMaker"
    },
    {
      name: "The 3D Printing Zone",
      channelUrl: "https://www.youtube.com/@The3DPrintingZone"
    },
    {
      name: "Daniel Henry",
      channelUrl: "https://www.youtube.com/@MisterHenry"
    },
    {
      name: "Lost In Tech",
      channelUrl: "https://www.youtube.com/@LostInTech3D"
    },
    {
      name: "3D Printing Nerd",
      channelUrl: "https://www.youtube.com/@3DPrintingNerd"
    },
    {
      name: "Uncle Jessy",
      channelUrl: "https://www.youtube.com/@UncleJessy"
    },
    {
      name: "Ivan Miranda",
      channelUrl: "https://www.youtube.com/@ivanmirandawastaken"
    },
    {
      name: "MandicReally",
      channelUrl: "https://www.youtube.com/@MandicReally"
    },
    {
      name: "Teaching Tech",
      channelUrl: "https://www.youtube.com/@TeachingTech"
    },
    {
      name: "Tom Stanton",
      channelUrl: "https://www.youtube.com/tomstantonengineering"
    },
    {
      name: "James Bruton",
      channelUrl: "https://www.youtube.com/@jamesbruton"
    },
    {
      name: "Matt Denton",
      channelUrl: "https://www.youtube.com/@MattDenton"
    },
    {
      name: "Macy Makes 3d",
      channelUrl: "https://www.youtube.com/@macymakes3d"
    }
  ]



  const modelRepositories = [
    {
      name: "Thingiverse",
      description: "One of the largest repositories for 3D printable models and designs",
      url: "https://www.thingiverse.com/"
    },
    {
      name: "CGTrader",
      description: "Marketplace for 3D models including free and paid content",
      url: "https://www.cgtrader.com/"
    },
    {
      name: "MyMiniFactory",
      description: "Curated platform for high-quality 3D printable designs",
      url: "https://www.myminifactory.com/"
    },
    {
      name: "Pinshape",
      description: "Community-driven platform for sharing 3D printable designs",
      url: "https://pinshape.com/"
    },
    {
      name: "Cults 3D",
      description: "Digital marketplace for 3D printer files and creative designs",
      url: "https://cults3d.com/en"
    },
    {
      name: "YouMagine",
      description: "Open source platform for sharing 3D designs",
      url: "https://youmagine.com/"
    },
    {
      name: "Yeggi",
      description: "Search engine for 3D printable models across multiple platforms",
      url: "https://www.yeggi.com/"
    },
    {
      name: "Threeding",
      description: "Marketplace for premium 3D printable models",
      url: "https://www.threeding.com/"
    },
    {
      name: "Thangs",
      description: "Geometric search engine and repository for 3D models",
      url: "https://thangs.com/?sort=trending"
    },
    {
      name: "Printables",
      description: "3D model sharing platform by Prusa Research",
      url: "https://www.printables.com/"
    },
    {
      name: "STLflix",
      description: "Subscription-based platform for premium STL files",
      url: "https://platform.stlflix.com/"
    },
    {
      name: "MakerWorld",
      description: "3D model repository by Bambu Lab for sharing and discovering designs",
      url: "https://makerworld.com/"
    }
  ]

  const communities = [
    {
      name: "Reddit - r/3Dprinting",
      description: "Large 3D printing community on Reddit",
      url: "https://www.reddit.com/r/3Dprinting/"
    },
    {
      name: "Reddit - r/functionalprint",
      description: "Community focused on functional 3D printed objects",
      url: "https://www.reddit.com/r/functionalprint/"
    },
    {
      name: "3D Printing Discord",
      description: "Active Discord community for 3D printing enthusiasts",
      url: "https://discord.gg/3dprinting"
    }
  ]

  const tools = [
    {
      name: "PrusaSlicer",
      description: "Free, open-source slicer software",
      url: "https://www.prusa3d.com/prusaslicer/"
    },
    {
      name: "Cura",
      description: "Popular slicer by Ultimaker",
      url: "https://ultimaker.com/software/ultimaker-cura"
    },
    {
      name: "OrcaSlicer",
      description: "Fork of PrusaSlicer with advanced features",
      url: "https://github.com/SoftFever/OrcaSlicer"
    },
    {
      name: "Fusion 360",
      description: "Professional CAD software with free version for personal use",
      url: "https://www.autodesk.com/products/fusion-360/"
    },
    {
      name: "TinkerCAD",
      description: "Browser-based 3D design tool for beginners",
      url: "https://www.tinkercad.com/"
    }
  ]

  const renderCategory = (categoryId: string) => {
    switch (categoryId) {
      case 'youtube-channels':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeChannels.map((channel) => (
              <div key={channel.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {channel.name}
                  </h3>
                  <a 
                    href={channel.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
        )
      case '3d-resources':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modelRepositories.map((repo) => (
              <div key={repo.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {repo.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {repo.description}
                </p>
                <a 
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm"
                >
                  Visit Site
                  <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        )
      case 'communities':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {communities.map((community) => (
              <div key={community.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {community.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {community.description}
                </p>
                <a 
                  href={community.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-sm"
                >
                  Join
                  <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        )
      case 'tools-software':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <div key={tool.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {tool.description}
                </p>
                <a 
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors text-sm"
                >
                  Download
                  <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <SEO 
        title="3D Printing Resources | 3D Print Wiki"
        description="Discover top 3D printing YouTubers, content creators, and valuable resources. Find expert guides, reviews, and educational content from the 3D printing community."
        keywords="3D printing YouTubers, 3D printing resources, maker community, 3D printing guides, content creators"
        url="https://3dprintwiki.com/contributors"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Resources
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive collection of 3D printing resources, communities, and content creators.
            </p>
          </div>

          {/* Category Cards Grid */}
          {!activeCategory && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {categoryCards.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${category.iconBg}`}>
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {category.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                      View Resources
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Active Category Content */}
          {activeCategory && (
            <div className="mb-16">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="text-3xl">
                    {categoryCards.find(c => c.id === activeCategory)?.icon}
                  </span>
                  {categoryCards.find(c => c.id === activeCategory)?.title}
                </h2>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                {renderCategory(activeCategory)}
              </div>
            </div>
          )}

          {/* Attribution Section */}
          <section className="mt-16 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 max-w-3xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700 dark:text-blue-200">
                    This is a growing list. If you know of other valuable resources that should be included, please let us know!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
