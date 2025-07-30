import React from "react";
import useCalculator from "../store/store";
const View: React.FC = () => {
  const input = useCalculator((state) => state.input);
  const result = useCalculator((state) => state.result);
  const setInput = useCalculator((state) => state.setInput);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };
  return (
    <div>
      <div className="mb-3">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Enter Expression"
          className="border border-gray-300 p-2 w-full mb-1 rounded-lg text-right text-lg bg-white shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-300"
        />
        <div className="text-right p-2 text-xl font-mono bg-white rounded-lg border border-gray-300 min-h-12 break-all shadow-inner">
          <span className="text-gray-500 text-xs">Result:</span>
          <span className="font-bold block mt-0.5 truncate">{result}</span>
        </div>
      </div>
    </div>
  );
};

export default View;
