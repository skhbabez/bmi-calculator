import { useState } from "react";
import ResultBar from "./components/ResultBar/ResultBar";

function App() {
  const [input, setInput] = useState<number>();

  return (
    <>
      <input
        onChange={(event) => setInput(Number(event.currentTarget.value))}
      />        
      <ResultBar bmi={input}></ResultBar>;
    </>
  );
}

export default App;
