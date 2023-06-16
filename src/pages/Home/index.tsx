import React, { useEffect, useState } from 'react';
import { Button, Space, Steps } from 'antd';

const description = 'This is a description.';
export default function Home() {
  const [a, setA] = useState(1);
  useEffect(() => {
    console.log(a);
  }, [a]);
  return (
    <div className="text-red-300">
      <span>1aa</span>
      <Space wrap>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Space>
      <Steps
        current={1}
        items={[
          {
            title: 'Finished',
            description,
          },
          {
            title: 'In Progress',
            description, 
            subTitle: 'Left 00:00:08',
          },
          {
            title: 'Waiting',
            description,
          },
        ]}
      />
    </div>
  );
}
