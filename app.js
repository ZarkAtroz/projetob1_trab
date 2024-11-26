var express = require('express'); // Para as rotas
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importando o Sequelize e o modelo User
var sequelize = require('./models').sequelize;

var indexRouter = require('./routes/index'); // Para a rota principal do app
var usersRouter = require('./routes/users'); // Para a rota users ./routes/users.js

// Importando as rotas antes de usá-las
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payment');

// Importando o CORS
const cors = require('cors');

var app = express(); // Ativa a API com o Express

app.use(logger('dev'));
app.use(express.json()); // Permite o uso de JSon
app.use(express.urlencoded({ extended: true })); // Permite o uso de URL
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permitir apenas o frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true // Permitir cookies, se necessário
}));

// Lidando com requisições pré-flight
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200); // Responde com sucesso às requisições OPTIONS
});

app.use('/', indexRouter); // Cria a rota app/
app.use('/users', usersRouter); // Cria a rota app/users

// Usando as rotas corretamente após importá-las
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/payment', paymentRoutes);

// Sincronizando o Sequelize (em dev)
const db = require('./models');

async function applyDataStructure() {
    await db.sequelize.sync();
}

app.get('/test', (req, res) => {
    res.send('Rota de teste funcionando!');
});

applyDataStructure();

// Iniciar o servidor com o app.js na porta 8080
var port = 5000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;