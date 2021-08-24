export const forPublish = true;
export const port = '3001';
export const apiDomain = forPublish
  ? 'https://blooming-everglades-84982.herokuapp.com'
  : `http://localhost:${port}`;
