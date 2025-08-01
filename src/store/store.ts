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

const parser: Parser = new Parser();

const useCalculator = create<CalculatorState>((set, get) => ({
  input: "",
  result: "",

  varName: "",
  varValue: "",

  variables: {},
  history: [],

  setInput: (value: string): void => set({ input: value }),

  appendToInput: (value: string): void =>
    set((state) => ({ input: state.input + value })),

  backspace: (): void => set((state) => ({ input: state.input.slice(0, -1) })),

  clearInput: (): void => set({ input: "" }),

  setVarName: (name: string): void => set({ varName: name }),
  setVarValue: (value: string): void => set({ varValue: value }),

  addVariables: (): void => {
    const { varName, varValue, variables } = get();

    if (!varName || !varValue) {
      alert("Variable name and value are required.");
      return;
    }

    if (["pi", "PI", "e", "E"].includes(varName)) {
      alert(`Cannot override built-in constant: ${varName}`);
      return;
    }

    if (!isNaN(Number(varName))) {
      alert("Cannot take an integer as variable name");
      return;
    }

    if (/^[a-zA-Z]+$/.test(varValue) && !(varValue in variables)) {
      alert(
        `Variable '${varValue}' is not defined. Assign valid value or variable that already has a value.`
      );
      return;
    }

    try {
      const evaluatedValue: number = parser.evaluate(varValue, variables);
      set({
        variables: {
          ...variables,
          [varName]: evaluatedValue,
        },
        varName: "",
        varValue: "",
      });
    } catch (error) {
      console.error("Variable evaluation error:", error);
      alert("Error evaluating variable value. Please check your input.");
    }
  },

  evaluate: (): void => {
    const { input, variables } = get();
    try {
      const value: number = parser.evaluate(input, variables); // ✅ Type cast
      set({ result: value.toFixed(4) });
    } catch (error) {
      alert(` ${error}`);
      set({ result: "Invalid Expression" });
    }
  },

  addToHistory: (): void => {
    const { input, result } = get();
    const ID: number = Date.now();
    set((state) => ({
      history: [
        ...state.history,
        { id: ID, historyInput: input, historyResult: result },
      ],
    }));
  },

  removeHistoryItem: (id: number): void =>
    set((state) => ({
      history: state.history.filter((item) => item.id !== id),
    })),
}));

export default useCalculator;
