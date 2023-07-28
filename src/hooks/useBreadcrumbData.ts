import { useLocation } from 'react-router-dom';

import { flattenMenuData } from '../router';

export default function useBreadcrumbData() {
  const location = useLocation();
  const pathSnippets = location.pathname
    .split('/')
    .filter(item => !!item)
    .reduce((t, c) => [...t, `${t[t.length - 1]}/${c}`], [''])
    .filter(item => !!item);
  // console.log(pathSnippets);
  // console.log(flattenMenuData);

  return pathSnippets.map(r => {
    const target = flattenMenuData.find(item => item.key === r);
    if (target) {
      return {
        key: r,
        title: target.name,
      };
    }
    return {
      key: r,
      title: r.split('/').pop()!,
    };
  });
}
