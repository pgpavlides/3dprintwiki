import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ShaderBackground } from '../components/ShaderBackground'
import { ThemeToggle } from '../components/ThemeToggle'

export const Route = createFileRoute('/calculator')({
  component: PrintCostCalculator,
})

function PrintCostCalculator() {
  // Basic inputs
  const [weight, setWeight] = useState<number>(0)
  const [filamentCost, setFilamentCost] = useState<number>(20)
  const [printTime, setPrintTime] = useState<number>(0)
  const [powerConsumption, setPowerConsumption] = useState<number>(0.15)
  const [electricityCost, setElectricityCost] = useState<number>(0.15)
  
  // Advanced inputs
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [setupTime, setSetupTime] = useState<number>(0.25)
  const [hourlyRate, setHourlyRate] = useState<number>(15)
  const [failureRate, setFailureRate] = useState<number>(5)
  const [markup, setMarkup] = useState<number>(30)
  const [postProcessingTime, setPostProcessingTime] = useState<number>(0)
  
  // Calculate material cost
  const materialCost = (weight * filamentCost) / 1000

  // Calculate electricity cost
  const electricityCostTotal = printTime * powerConsumption * electricityCost

  // Calculate labor cost
  const laborCost = (setupTime + printTime + postProcessingTime) * hourlyRate

  // Calculate failure cost
  const failureCost = (materialCost + electricityCostTotal) * (failureRate / 100)

  // Calculate total cost
  const totalCost = materialCost + electricityCostTotal + laborCost + failureCost
  const finalPrice = totalCost * (1 + markup / 100)

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0">
        <ShaderBackground />
      </div>
      <div className="min-h-screen bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative z-10">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              3D Print Cost Calculator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Calculate the true cost of your 3D prints
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-950 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Basic Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Print Weight (g)
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Filament Cost ($ per kg)
                    </label>
                    <input
                      type="number"
                      value={filamentCost}
                      onChange={(e) => setFilamentCost(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Print Time (hours)
                    </label>
                    <input
                      type="number"
                      value={printTime}
                      onChange={(e) => setPrintTime(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                      min="0"
                      step="0.25"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Printer Power Consumption (kW)
                    </label>
                    <input
                      type="number"
                      value={powerConsumption}
                      onChange={(e) => setPowerConsumption(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Electricity Cost ($ per kWh)
                    </label>
                    <input
                      type="number"
                      value={electricityCost}
                      onChange={(e) => setElectricityCost(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="bg-white dark:bg-slate-950 rounded-xl shadow-lg p-6">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full text-xl font-semibold text-gray-900 dark:text-white mb-4"
                >
                  <span>Advanced Settings</span>
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showAdvanced && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Setup Time (hours)
                      </label>
                      <input
                        type="number"
                        value={setupTime}
                        onChange={(e) => setSetupTime(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        min="0"
                        step="0.25"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Post-Processing Time (hours)
                      </label>
                      <input
                        type="number"
                        value={postProcessingTime}
                        onChange={(e) => setPostProcessingTime(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        min="0"
                        step="0.25"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Hourly Labor Rate ($)
                      </label>
                      <input
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Failure Rate (%)
                      </label>
                      <input
                        type="number"
                        value={failureRate}
                        onChange={(e) => setFailureRate(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        min="0"
                        max="100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Profit Markup (%)
                      </label>
                      <input
                        type="number"
                        value={markup}
                        onChange={(e) => setMarkup(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        min="0"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-950 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Cost Breakdown
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Material Cost:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${materialCost.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Electricity Cost:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${electricityCostTotal.toFixed(2)}
                    </span>
                  </div>
                  
                  {showAdvanced && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Labor Cost:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          ${laborCost.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Failure Risk Cost:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          ${failureCost.toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}
                  
                  <hr className="my-4 border-gray-200 dark:border-gray-700" />
                  
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-gray-900 dark:text-white">Total Cost:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${totalCost.toFixed(2)}
                    </span>
                  </div>
                  
                  {showAdvanced && (
                    <div className="flex justify-between text-xl pt-4">
                      <span className="font-semibold text-green-600 dark:text-green-400">Final Price:</span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        ${finalPrice.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  💡 Quick Tips
                </h3>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li>• Typical FDM printer power consumption: 0.1-0.3 kW</li>
                  <li>• Standard PLA filament cost: $15-30 per kg</li>
                  <li>• Consider post-processing time for complex prints</li>
                  <li>• Factor in failure rates for new or complex designs</li>
                  <li>• Add markup to cover maintenance and business costs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
