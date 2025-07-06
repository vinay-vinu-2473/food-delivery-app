import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const setAuthCookie = (res, token) => {
  res.setHeader(
    'Set-Cookie',
    `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400; ${
      process.env.NODE_ENV === 'production' ? 'Secure' : ''
    }`
  );
};

export const clearAuthCookie = (res) => {
  res.setHeader(
    'Set-Cookie',
    `token=; Path=/; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${
      process.env.NODE_ENV === 'production' ? 'Secure' : ''
    }`
  );
};