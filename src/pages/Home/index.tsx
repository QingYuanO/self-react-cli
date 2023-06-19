import { useState } from 'react';
import { Button, Space } from 'antd';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Space>
        <Button onClick={() => setCount(count - 1)}>减</Button>
        <span>{count}</span>
        <Button onClick={() => setCount(count + 1)}>加</Button>
      </Space>
    </div>
  );
}
