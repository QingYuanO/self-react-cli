import { useLocation } from 'react-router-dom';

export default function useActiveMenu({ dep }: { dep: number } = { dep: 2 }) {
  const location = useLocation();

  const activeParentKeys = location.pathname
    .split('/')
    .slice(1, dep)
    .reduce((t, c) => [...t, `${t[t.length - 1]}/${c}`], [''])
    .filter(item => !!item);
  const activeKey = location.pathname;

  return {
    activeParentKeys,
    activeKey,
  };
}
