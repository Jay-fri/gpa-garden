import React, { useState } from "react";
import { Coffee, X } from "lucide-react";

const BuyMeCoffeeOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Floating button */}
      <button
        onClick={toggleOverlay}
        className="fixed bottom-4 right-4 bg-yellow-400 rounded-full p-3 shadow-lg hover:bg-yellow-300 transition-all duration-300 flex items-center gap-2"
      >
        <Coffee size={24} />
        <span className="font-medium">Buy me a coffee</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
            <button
              onClick={toggleOverlay}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <div className="text-center">
              <Coffee size={48} className="mx-auto mb-4 text-yellow-400" />
              <h2 className="text-2xl font-bold mb-2">Support My Work</h2>
              <p className="text-gray-600 mb-6">
                If you find this GPA calculator helpful, consider buying me a
                coffee!
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[1, 3, 5].map((price) => (
                  <button
                    key={price}
                    className="bg-yellow-50 hover:bg-yellow-100 py-3 rounded-lg border-2 border-yellow-400"
                  >
                    <div className="font-bold text-xl">${price}</div>
                    <div className="text-sm text-gray-600">
                      {price === 4
                        ? "1 coffee"
                        : `${Math.floor(price / 1)} coffees`}
                    </div>
                  </button>
                ))}
              </div>

              <a
                href="https://buymeacoffee.com/jayfri
"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-yellow-400 py-3 rounded-lg font-bold hover:bg-yellow-300"
              >
                Support Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyMeCoffeeOverlay;
