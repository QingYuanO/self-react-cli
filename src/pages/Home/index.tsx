import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <div className="flex items-center gap-x-3">
        <button onClick={() => setCount(count - 1)} type="button">
          减
        </button>
        <div>{count}</div>
        <button onClick={() => setCount(count + 1)} type="button">
          加
        </button>
      </div>
    </div>
  );
}
