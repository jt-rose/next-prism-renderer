import { useState } from "react";
import CodeSample from "./CodeSample";

export const Hello = () => {
  const [count, setCount] = useState(0);
  return (
    <section>
      <h1>Hello from React! the current count is {count}</h1>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <CodeSample
        sample={{
          language: "elixir",
          code: `
    defmodule Hello do
        def say_hi(name) do
            IO.puts "Hello, #{name}!"
        end
    end
    `,
        }}
      />
    </section>
  );
};
