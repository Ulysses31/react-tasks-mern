export const forPublish = false;
export const port = '3001';
export const apiDomain = forPublish
  ? 'http://orbiesapi.dev.gr'
  : `http://localhost:${port}`;
