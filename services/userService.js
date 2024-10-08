// ./services/userService.js

const auth = require('../auth');
const db = require('../models');
const bcrypt = require('bcrypt');
var round_salts = 10;

class UserService{
    constructor(UserModel){
        this.User = UserModel;
    }

    async create(email, data_nasc, password){
        try{
            const hashpassword = await bcrypt.hash(password, parseInt(round_salts));
            const newUser = await this.User.create({
                email:email,
                data_nasc:data_nasc,
                password:hashpassword,
            });
            return newUser? newUser : null;
            
        }
        catch (error){
            throw error;
        }
    }

    //Metodo para buscar todos os usuários
    async findAll(){
        try{
            const AllUser = await this.User.findAll();
            return AllUser? AllUser : null;
        }
        catch (error){
            throw error;
        }
    }

    //Metodo para buscar um usuário por primary key
    async findByPk(id){
        try{
            const User = await this.User.findByPk(id);
            return User? User : null;
        }
        catch (error){
            throw error;
        }
    }

    //Metodo para login
    async login(email, password){
        try{
            const User = await this.User.findOne({
                where: {email}
            });
            //Verificar se o usuário existe
            if(User){
                //comparar a senha
                if(await bcrypt.compare(password, User.password)){
                    // gerar o token do user
                    const token = await auth.generateToken(User)
                    User.dataValues.Token = token;
                    User.dataValues.password = '';
                } else {
                    throw new Error('Senha invalida');
                }
                
            }
            return User? User:null;
        }
        catch (error){
            throw error;
        }
    }
}

module.exports = UserService;