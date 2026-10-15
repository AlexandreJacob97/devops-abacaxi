const jwt = require('jsonwebtoken');

// Verifica o token enviado no cabeçalho "Authorization: Bearer <token>"
module.exports = function auth(req, res, next) {
  const [, token] = (req.headers.authorization || '').split(' ');
  if (!token) return res.status(401).json({ erro: 'Token não informado' });

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};
