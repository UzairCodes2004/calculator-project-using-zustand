import { create } from "zustand";
import { Parser } from "expr-eval";

export interface HistoryEntry {
  id: number;
  historyInput: string;
  historyResult: string;
}

export interface CalculatorState {
  input: string;
  result: string;

  varName: string;
  varValue: string;

  variables: Record<string, number>;
  history: HistoryEntry[];

  setInput: (value: string) => void;
  appendToInput: (value: string) => void;
  backspace: () => void;
  clearInput: () => void;

  setVarName: (name: string) => void;
  setVarValue: (value: string) => void;
  addVariables: () => void;

  evaluate: () => void;

  addToHistory: () => void;
  removeHistoryItem: (id: number) => void;
}

const parser = new Parser();

const useCalculator = create<CalculatorState>((set, get) => ({
  input: "",
  result: "",

  varName: "",
  varValue: "",

  variables: {},
  history: [],

  setInput: (value: string) => set({ input: value }),
  appendToInput: (value: string) =>
    set((state) => ({ input: state.input + value })),
  backspace: () => set((state) => ({ input: state.input.slice(0, -1) })),
  clearInput: () => set({ input: "" }),

  setVarName: (name: string) => set({ varName: name }),
  setVarValue: (value: string) => set({ varValue: value }),
addVariables: () => {
    const { varName, varValue, variables } = get();

    if (!varName || !varValue) {
      return alert("Variable name and value are required.");
    }

    if (["pi", "PI", "e", "E"].includes(varName)) {
      return alert(`Cannot override built-in constant: ${varName}`);
    }

    if (!isNaN(Number(varName))) {
      return alert("Cannot take an integer as variable name");
    }

    if (/^[a-zA-Z]+$/.test(varValue) && !(varValue in variables)) {
      return alert(`Variable '${varValue}' is not defined.`);
    }

    const evaluatedValue = parser.evaluate(varValue, variables);

    set({
      variables: {
        ...variables,
        [varName]: evaluatedValue,
      },
      varName: "",
      varValue: "",
    });
  },

  evaluate: () => {
    const { input, variables } = get();
    try {
      const value = parser.evaluate(input, variables);
      set({ result: value.toFixed(4) });
    } catch (error) {
      console.error("Evaluation error:", error);
      set({ result: "Invalid Expression" });
    }
  },

  addToHistory: () => {
    const { input, result } = get();
    const ID = Date.now();
    set((state) => ({
      history: [
        ...state.history,
        { id: ID, historyInput: input, historyResult: result },
      ],
    }));
  },

  removeHistoryItem: (id: number) =>
    set((state) => ({
      history: state.history.filter((item) => item.id !== id),
    })),
}));

export default useCalculator;
