import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { SEO } from '../components/SEO/SEO'

export const Route = createFileRoute('/calculator')({
  component: PrintCostCalculator,
})

function PrintCostCalculator() {
  // Basic inputs
  const [weight, setWeight] = useState<number>(0)
  const [filamentCost, setFilamentCost] = useState<number>(22.99)
  const [printTimeHours, setPrintTimeHours] = useState<number>(0)
  const [printTimeMinutes, setPrintTimeMinutes] = useState<number>(0)
  const [powerConsumption, setPowerConsumption] = useState<number>(0.105)
  const [electricityCost, setElectricityCost] = useState<number>(0.14620)
  
  // Advanced inputs
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [setupTimeHours, setSetupTimeHours] = useState<number>(0)
  const [setupTimeMinutes, setSetupTimeMinutes] = useState<number>(15)
  const [hourlyRate, setHourlyRate] = useState<number>(15)
  const [failureRate, setFailureRate] = useState<number>(5)
  const [markup, setMarkup] = useState<number>(30)
  const [postProcessingHours, setPostProcessingHours] = useState<number>(0)
  const [postProcessingMinutes, setPostProcessingMinutes] = useState<number>(0)
  
  // Convert all times to hours
  const printTime = printTimeHours + (printTimeMinutes / 60)
  const setupTime = setupTimeHours + (setupTimeMinutes / 60)
  const postProcessingTime = postProcessingHours + (postProcessingMinutes / 60)
  
  // Calculate material cost
  const materialCost = (weight * filamentCost) / 1000

  // Calculate electricity cost
  const electricityCostTotal = printTime * powerConsumption * electricityCost

  // Calculate labor cost (only for setup and post-processing, not print time)
  const laborCost = showAdvanced ? (setupTime + postProcessingTime) * hourlyRate : 0

  // Calculate failure cost
  const failureCost = showAdvanced ? (materialCost + electricityCostTotal) * (failureRate / 100) : 0

  // Calculate total cost
  const totalCost = materialCost + electricityCostTotal + laborCost + failureCost
  const finalPrice = showAdvanced ? totalCost * (1 + markup / 100) : totalCost

  return (
    <>
      <SEO 
        title="3D Print Cost Calculator | 3D Print Wiki"
        description="Calculate the exact cost of your 3D prints. Include material costs, electricity, labor, failure rates, and profit margins. Free online 3D printing cost calculator."
        keywords="3D print cost calculator, filament cost calculator, 3D printing price calculator, print cost estimation, FDM cost calculator, 3D print pricing tool"
        url="https://3dprintwiki.com/calculator"
      />
      <div className="min-h-screen relative">
      <div className="fixed inset-0">
        <AnimatedBackground />
      </div>
      <div className="min-h-screen bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative z-10">
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
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Filament Cost (€ per kg)
                    </label>
                    <input
                      type="number"
                      value={filamentCost}
                      onChange={(e) => setFilamentCost(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Print Time
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Hours</label>
                        <input
                          type="number"
                          value={printTimeHours}
                          onChange={(e) => setPrintTimeHours(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                          min="0"
                          max="999"
                          step="1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Minutes</label>
                        <input
                          type="number"
                          value={printTimeMinutes}
                          onChange={(e) => setPrintTimeMinutes(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                          min="0"
                          max="59"
                          step="1"
                        />
                      </div>
                    </div>
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
                      step="0.001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Electricity Cost (€ per kWh)
                    </label>
                    <input
                      type="number"
                      value={electricityCost}
                      onChange={(e) => setElectricityCost(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                      min="0"
                      step="0.00001"
                    />
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="bg-white dark:bg-slate-950 rounded-xl shadow-lg p-6">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Advanced Settings
                  </h2>
                  <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <svg 
                      className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${showAdvanced ? 'rotate-90' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </button>
                
                {showAdvanced && (
                  <div className="space-y-4 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Setup Time
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Hours</label>
                          <input
                            type="number"
                            value={setupTimeHours}
                            onChange={(e) => setSetupTimeHours(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            min="0"
                            max="24"
                            step="1"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Minutes</label>
                          <input
                            type="number"
                            value={setupTimeMinutes}
                            onChange={(e) => setSetupTimeMinutes(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            min="0"
                            max="59"
                            step="1"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Post-Processing Time
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Hours</label>
                          <input
                            type="number"
                            value={postProcessingHours}
                            onChange={(e) => setPostProcessingHours(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            min="0"
                            max="48"
                            step="1"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Minutes</label>
                          <input
                            type="number"
                            value={postProcessingMinutes}
                            onChange={(e) => setPostProcessingMinutes(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            min="0"
                            max="59"
                            step="1"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Hourly Labor Rate (€)
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
                    <span className="text-gray-600 dark:text-gray-400">Print Time:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {printTimeHours}h {printTimeMinutes}m
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Material Cost:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      €{materialCost.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Electricity Cost:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      €{electricityCostTotal.toFixed(2)}
                    </span>
                  </div>
                  
                  {showAdvanced && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Labor Cost:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          €{laborCost.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Failure Risk Cost:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          €{failureCost.toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}
                  
                  <hr className="my-4 border-gray-200 dark:border-gray-700" />
                  
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-green-600 dark:text-green-400">Total Cost:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      €{totalCost.toFixed(2)}
                    </span>
                  </div>
                  
                  {showAdvanced && (
                    <div className="flex justify-between text-xl pt-4">
                      <span className="font-semibold text-green-600 dark:text-green-400">Final Price:</span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        €{finalPrice.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
