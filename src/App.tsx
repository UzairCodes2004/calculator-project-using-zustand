import React from "react";

import View from "./components/View";
import Variables from "./components/Variables";
import History from "./components/History";
import Buttons from "./components/Buttons";

export default function App() {
  return (
    <div className="max-w-md mx-auto p-3 bg-gray-100 rounded-xl shadow-lg h-[90vh] max-h-[700px] flex flex-col">
      <h1 className="text-xl font-bold text-center mb-3 text-gray-800">
        Scientific Calculator
      </h1>

      <View />
      <Variables />
      <History />
      <Buttons />
    </div>
  );
}
