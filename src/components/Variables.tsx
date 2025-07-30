import React from "react";
import useCalculator from "../store/store";
const Variables: React.FC = () => {
  const varName = useCalculator((state) => state.varName);
  const varValue = useCalculator((state) => state.varValue);
  const setVarName = useCalculator((state) => state.setVarName);
  const setVarValue = useCalculator((state) => state.setVarValue);
  const variables = useCalculator((state) => state.variables);
  const addVariables = useCalculator((state) => state.addVariables);

  return (
    <div>
      <div className="bg-white p-2 mt-2 rounded-md shadow">
        <div className="grid grid-cols-3 gap-1">
          <input
            type="text"
            placeholder="Var Name"
            value={varName}
            onChange={(e) => setVarName(e.target.value)}
            className="p-1 rounded-lg border border-gray-300 text-xs"
          />
          <input
            type="text"
            placeholder="Var Value"
            value={varValue}
            onChange={(e) => setVarValue(e.target.value)}
            className="p-1 rounded-lg border border-gray-300 text-xs"
          />
          <button
            onClick={addVariables}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-1 rounded-lg text-xs font-medium"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {Object.entries(variables).map(([name, value]) => (
            <span
              key={name}
              className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md text-xs font-mono shadow-sm"
            >
              {name}: {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Variables;
