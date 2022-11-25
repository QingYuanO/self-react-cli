import React, { useEffect, useState } from 'react';
import './app.css';
export default function App() {
  const [a, setA] = useState(1);
  useEffect(() => {
    console.log(a);
  }, [a]);
  return <div className="text-red-300"> test111</div>;
}
