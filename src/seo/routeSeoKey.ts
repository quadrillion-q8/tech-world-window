export const routeSeoKey = (path: string) => path === '/' ? '_home' : path.slice(1).replaceAll('/', '__');
