import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface PropertyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  content: {
    description: string;
    measurement: string;
    importance: string;
    tips?: string[];
  };
}

export const PropertyInfoModal: React.FC<PropertyInfoModalProps> = ({
  isOpen,
  onClose,
  title,
  icon,
  content
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="text-2xl">
              {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
              <p className="text-gray-600">{content.description}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Measurement</h4>
              <p className="text-gray-600">{content.measurement}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Why It's Important</h4>
              <p className="text-gray-600">{content.importance}</p>
            </div>
            
            {content.tips && content.tips.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Tips</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {content.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
