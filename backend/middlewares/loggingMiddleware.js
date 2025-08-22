export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const userAgent = req.get('User-Agent') || '';
  
  console.log(`[${timestamp}] ${method} ${url} - User: Muhammad-Irfanum`);
  
  next();
};