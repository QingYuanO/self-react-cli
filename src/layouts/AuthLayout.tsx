import { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthLayout({ children }: PropsWithChildren<{}>) {
  const [isLogin, ] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login', { replace: true });
    }
  }, [isLogin]);

  return <div>{isLogin && children}</div>;
}

export default AuthLayout;
