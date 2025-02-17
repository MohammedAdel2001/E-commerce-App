import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props) {
  const [Counter, setCounter] = useState(20);
  return (
    <CounterContext.Provider
      value={{ Counter, setCounter }}
    >
        {props.children}
    </CounterContext.Provider>
  );
}
