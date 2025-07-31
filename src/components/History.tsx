import React, { useState } from "react";
import useCalculator from "../store/store";

const History: React.FC = () => {
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const history = useCalculator((state) => state.history);
  const appendToInput = useCalculator((state) => state.appendToInput);
  const removeHistoryItem = useCalculator((state) => state.removeHistoryItem);

  return (
    <div>
      <div className="mt-2">
        <button
          className="w-full px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          onClick={() => setShowHistory((prev) => !prev)}
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>
        {showHistory && (
          <div className="mt-2 border p-2 rounded shadow bg-gray-100 text-sm max-h-[120px] overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-gray-500">No history yet.</p>
            ) : (
              <ol className="list-decimal list-inside space-y-1">
                {history.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <span>
                      <button className="hover:underline"onClick={() => appendToInput(item.historyInput)}>
                        {item.historyInput}
                      </button>
                      =  
                      <button className="hover:underline" onClick={() => appendToInput(item.historyResult)}>
                        {item.historyResult}
                      </button>
                    </span>
                    <button
                      onClick={() => removeHistoryItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      🚫
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
