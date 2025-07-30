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
    <div>
      <div className="flex-1 grid grid-rows-[auto_1fr] gap-1 mt-2">
        {/* Scientific Functions */}
        <div className="grid grid-cols-5 gap-1">
          {["sin(", "cos(", "tan(", "√", "x^y"].map((func) => (
            <button
              key={func}
              onClick={() => onButtonClick(func)}
              className="bg-blue-200 hover:bg-blue-300 p-1 rounded text-xs font-medium"
            >
              {func === "√"
                ? "√"
                : func === "x^y"
                ? "x^y"
                : func.replace("(", "")}
            </button>
          ))}
        </div>

        {/* Main Calculator Buttons */}
        <div className="grid grid-cols-4 grid-rows-5 gap-1">
          {/* First Row - Functions */}
          {["C", "⌫", "(", ")"].map((btn) => (
            <button
              key={btn}
              onClick={() => onButtonClick(btn)}
              className={`p-1 rounded text-sm font-medium ${
                btn === "C"
                  ? "bg-red-400 hover:bg-red-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {btn}
            </button>
          ))}

          {/* Second Row - Constants */}
          {["π", "e", ".", "÷"].map((btn) => (
            <button
              key={btn}
              onClick={() =>
                onButtonClick(
                  btn === "π"
                    ? "PI"
                    : btn === "÷"
                    ? "/"
                    : btn === "e"
                    ? "E"
                    : btn
                )
              }
              className={`p-1 rounded text-sm font-medium ${
                btn === "÷"
                  ? "bg-yellow-400 hover:bg-yellow-500"
                  : btn === "π" || btn === "e"
                  ? "bg-blue-200 hover:bg-blue-300"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {btn}
            </button>
          ))}

          {/* Number Rows */}
          {[
            ["7", "8", "9", "×"],
            ["4", "5", "6", "-"],
            ["1", "2", "3", "+"],
          ].flatMap((row) =>
            row.map((btn) => (
              <button
                key={btn}
                onClick={() => onButtonClick(btn === "×" ? "*" : btn)}
                className={`p-1 rounded text-sm font-medium ${
                  ["×", "-", "+"].includes(btn)
                    ? "bg-yellow-400 hover:bg-yellow-500"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {btn}
              </button>
            ))
          )}

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
    </div>
  );
};

export default Buttons;
