import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col justify-center h-screen items-center bg-gray-200">
      <h1 className="text-3xl font-bold text-blue-800">
        Install & Setup Tailwind CSS + React 18+ Typescript
      </h1>
      <div className="my-4">
        <Button onClick={() => setCount(count + 1)}>Count is {count}</Button>
      </div>
    </div>
  );
}

export default App;
