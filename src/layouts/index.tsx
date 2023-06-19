import { PropsWithChildren } from 'react';

import AuthLayout from './AuthLayout';

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <AuthLayout>
      <div className="bg-blue-300">{children}</div>
    </AuthLayout>
  );
}
