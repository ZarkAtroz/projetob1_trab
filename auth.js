const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || '123'; // Use variável de ambiente

// Função para gerar token de autenticação
async function generateToken(user) {
    const id = user.id;
    const email = user.email;
    const token = jwt.sign({ id, email }, secret, {
        expiresIn: '1h',
    });

    return token;
}

// Middleware para verificar se o token JWT é válido
async function verifyToken(req, res, next) {
    // Extrair o cabeçalho que contém o token JWT
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não informado' });
    }

    // Extrair o token JWT do cabeçalho
    const token = authHeader.split(' ')[1]; // Separar o token do Bearer
    if (!token) {
        return res.status(401).json({ error: 'Token não informado' });
    }

    // Verificar se o token é válido
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = decoded; // Adiciona o objeto decodificado na requisição (opcional)
        next();
    });
}

module.exports = { generateToken, verifyToken };
