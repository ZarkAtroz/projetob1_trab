const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || '123'; // Use variável de ambiente

if (!secret) {
    console.error('JWT_SECRET não definido. Configure no arquivo .env para segurança.');
    process.exit(1);
}

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
    try {
        // Extrair o cabeçalho que contém o token JWT
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token não informado ou formato inválido' });
        }

        // Extrair o token JWT do cabeçalho
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token não informado' });
        }

        // Verificar se o token é válido
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Token inválido ou expirado' });
            }

            req.user = decoded; // Adiciona o objeto decodificado na requisição
            next();
        });
    } catch (error) {
        console.error('Erro na autenticação:', error.message);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
}

module.exports = { generateToken, verifyToken };
