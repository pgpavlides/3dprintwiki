import { createFileRoute, Link } from '@tanstack/react-router'
import { ShaderBackground } from '../components/ShaderBackground'
import { ThemeToggle } from '../components/ThemeToggle'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
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
      icon: '🖨️',
      title: 'Setup, Calibration & Maintenance',
      description: 'Printer setup, calibration guides, troubleshooting, and maintenance schedules',
      path: '/setup',
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500'
    },
    {
      icon: '🎨',
      title: 'Post-Processing',
      description: 'Sanding, painting, vapor smoothing, support removal, and surface finishing techniques',
      path: '/postprocessing',
      gradient: 'from-pink-500 to-rose-500',
      iconBg: 'bg-pink-500/10',
      iconColor: 'text-pink-500'
    },
    {
      icon: '⚡',
      title: 'Electronics & Upgrades',
      description: 'Firmware guides, motherboard upgrades, sensor installations, and wiring diagrams',
      path: '/electronics',
      gradient: 'from-yellow-500 to-amber-500',
      iconBg: 'bg-yellow-500/10',
      iconColor: 'text-yellow-500'
    },
    {
      icon: '📐',
      title: 'Design & Modeling',
      description: 'CAD software guides, design tips, model optimization, and file preparation',
      path: '/design',
      gradient: 'from-sky-500 to-blue-500',
      iconBg: 'bg-sky-500/10',
      iconColor: 'text-sky-500'
    }
  ]

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0">
        <ShaderBackground />
      </div>
      <div className="min-h-screen bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm flex flex-col justify-center items-center transition-colors relative z-10">
        {/* Theme Toggle in top right corner */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
            {menuItems.map((item, index) => (
              <div key={index} className="group relative w-full h-full">
                <Link
                  to={item.path}
                  className="block relative overflow-hidden rounded-2xl bg-white dark:bg-slate-950 shadow-lg dark:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-blue-500/10 h-full min-h-[180px]"
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
                        <span className="relative flex items-center justify-center gap-2">
                          Explore Now
                          <svg className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        </div>
      </div>
    </div>
  )
}
