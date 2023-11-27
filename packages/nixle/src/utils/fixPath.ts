export const fixPath = (path: string) => {
  const _path = path.startsWith('/') ? path : `/${path}`;
  return _path.endsWith('/') ? _path.slice(0, -1) : _path;
};
