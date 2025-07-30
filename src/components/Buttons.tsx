import React from "react";
import useCalculator from "../store/store";

const Buttons: React.FC = () => {
  const appendToInput = useCalculator((state) => state.appendToInput);
  const backspace = useCalculator((state) => state.backspace);
  const clearInput = useCalculator((state) => state.clearInput);
  const evaluate = useCalculator((state) => state.evaluate);
  const addToHistory = useCalculator((state) => state.addToHistory);

  const onButtonClick = (value: string): void => {
    if (value === "C") {
      clearInput();
    } else if (value === "⌫") {
      backspace();
    } else {
      appendToInput(value);
    }
  };

  return (
    <div className="flex-1 grid grid-rows-[auto_1fr] gap-1 mt-2">
      {/* Scientific Functions - First Row */}
      <div className="grid grid-cols-5 gap-1">
        <button
          onClick={() => onButtonClick("sin(")}
          className="bg-blue-200 hover:bg-blue-300 p-1 rounded text-xs font-medium"
        >
          sin
        </button>
        <button
          onClick={() => onButtonClick("cos(")}
          className="bg-blue-200 hover:bg-blue-300 p-1 rounded text-xs font-medium"
        >
          cos
        </button>
        <button
          onClick={() => onButtonClick("tan(")}
          className="bg-blue-200 hover:bg-blue-300 p-1 rounded text-xs font-medium"
        >
          tan
        </button>
        <button
          onClick={() => onButtonClick("sqrt(")}
          className="bg-blue-200 hover:bg-blue-300 p-1 rounded text-xs font-medium"
        >
          √
        </button>
        <button
          onClick={() => onButtonClick("^")}
          className="bg-blue-200 hover:bg-blue-300 p-1 rounded text-xs font-medium"
        >
          x^y
        </button>
      </div>

      {/* Main Calculator Buttons */}
      <div className="grid grid-cols-4 grid-rows-5 gap-1">
        {/* First Row */}
        <button
          onClick={() => onButtonClick("C")}
          className="bg-red-400 hover:bg-red-500 text-white p-1 rounded text-sm font-medium"
        >
          C
        </button>
        <button
          onClick={() => onButtonClick("⌫")}
          className="bg-gray-200 hover:bg-gray-300 p-1 rounded text-sm font-medium"
        >
          ⌫
        </button>
        <button
          onClick={() => onButtonClick("(")}
          className="bg-gray-200 hover:bg-gray-300 p-1 rounded text-sm font-medium"
        >
          (
        </button>
        <button
          onClick={() => onButtonClick(")")}
          className="bg-gray-200 hover:bg-gray-300 p-1 rounded text-sm font-medium"
        >
          )
        </button>

        {/* Constants */}
        <button
          onClick={() => onButtonClick("PI")}
          className="bg-blue-200 hover:bg-blue-300 p-1 rounded text-sm font-medium"
        >
          π
        </button>
        <button
          onClick={() => onButtonClick("E")}
          className="bg-blue-200 hover:bg-blue-300 p-1 rounded text-sm font-medium"
        >
          e
        </button>
        <button
          onClick={() => onButtonClick(".")}
          className="bg-white hover:bg-gray-100 p-1 rounded text-sm font-medium"
        >
          .
        </button>
        <button
          onClick={() => onButtonClick("/")}
          className="bg-yellow-400 hover:bg-yellow-500 p-1 rounded text-sm font-medium"
        >
          ÷
        </button>

        {/* Number Row 1 */}
        <button
          onClick={() => onButtonClick("7")}
          className="bg-white hover:bg-gray-100 p-1 rounded text-sm font-medium"
        >
          7
        </button>
        <button
          onClick={() => onButtonClick("8")}
          className="bg-white hover:bg-gray-100 p-1 rounded text-sm font-medium"
        >
          8
        </button>
        <button
          onClick={() => onButtonClick("9")}
          className="bg-white hover:bg-gray-100 p-1 rounded text-sm font-medium"
        >
          9
        </button>
        <button
          onClick={() => onButtonClick("*")}
          className="bg-yellow-400 hover:bg-yellow-500 p-1 rounded text-sm font-medium"
        >
          ×
        </button>

        {/* Number Row 2 */}
        <button
          onClick={() => onButtonClick("4")}
          className="bg-white hover:bg-gray-100 p-1 rounded text-sm font-medium"
        >
          4
        </button>
        <button
          onClick={() => onButtonClick("5")}
          className="bg-white hover:bg-gray-100 p-1 rounded text-sm font-medium"
        >
          5
        </button>
        <button
          onClick={() => onButtonClick("6")}
          className="bg-white hover:bg-gray-100 p-1 rounded text-sm font-medium"
        >
          6
        </button>
        <button
          onClick={() => onButtonClick("-")}
          className="bg-yellow-400 hover:bg-yellow-500 p-1 rounded text-sm font-medium"
        >
          -
        </button>

        {/* Number Row 3 */}
        <button
          onClick={() => onButtonClick("1")}
          className="bg-white hover:bg-gray-100 p-1 rounded text-sm font-medium"
        >
          1
        </button>
        <button
          onClick={() => onButtonClick("2")}
          className="bg-white hover:bg-gray-100 p-1 rounded text-sm font-medium"
        >
          2
        </button>
        <button
          onClick={() => onButtonClick("3")}
          className="bg-white hover:bg-gray-100 p-1 rounded text-sm font-medium"
        >
          3
        </button>
        <button
          onClick={() => onButtonClick("+")}
          className="bg-yellow-400 hover:bg-yellow-500 p-1 rounded text-sm font-medium"
        >
          +
        </button>

        {/* Bottom Row */}
        <button
          onClick={() => onButtonClick("0")}
          className="bg-white hover:bg-gray-100 p-1 rounded text-sm font-medium col-span-2"
        >
          0
        </button>
        <button
          onClick={() => {
            evaluate();
            addToHistory();
          }}
          className="bg-green-500 hover:bg-green-600 text-white p-1 rounded text-sm font-medium col-span-2"
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Buttons;
