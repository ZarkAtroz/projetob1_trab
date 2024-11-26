// ./services/userService.js

const auth = require('../auth');
const db = require('../models');
const bcrypt = require('bcrypt');
const ROUND_SALTS = 10; // Definir round_salts como constante
var round_salts = 10;

class UserService{
    constructor(UserModel){
        this.User = UserModel;
    }

    async create(email, data_nasc, password) {
        try {
            const hashpassword = await bcrypt.hash(password, ROUND_SALTS);
            const newUser = await this.User.create({
                email,
                data_nasc,
                password: hashpassword,
            });
    
            if (newUser) {
                newUser.password = undefined; // Removendo a senha do retorno
                return newUser;
            } else {
                return null;
            }
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new Error('O e-mail já está registrado.');
            }
            throw error;
        }
    }
    
    //Metodo para buscar todos os usuários
    async findAll() {
        try {
            const AllUser = await this.User.findAll({
                attributes: { exclude: ['password'] }
            });
            return AllUser ? AllUser : null;
        } catch (error) {
            throw error;
        }
    }
    
    async findByPk(id) {
        try {
            const User = await this.User.findByPk(id, {
                attributes: { exclude: ['password'] }
            });
            return User ? User : null;
        } catch (error) {
            throw error;
        }
    }
    
    async login(email, password) {
        try {
            const User = await this.User.findOne({
                where: { email }
            });
    
            // Verificar se o usuário existe
            if (!User) {
                throw new Error('Credenciais inválidas.');
            }
    
            // Comparar a senha
            const isPasswordValid = await bcrypt.compare(password, User.password);
            if (!isPasswordValid) {
                throw new Error('Credenciais inválidas.');
            }
    
            // Gerar o token do usuário
            const token = await auth.generateToken(User);
            User.dataValues.Token = token;
            User.dataValues.password = '';
    
            return User;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = UserService;