// ./controllers/userController.js

class UserController{
    constructor(UserService){
        this.userService = UserService;
    }
    async createUser(req,res){
        //processar a request
        const {email, data_nasc, password} = req.body;
        try{
            const newUser = await this.userService.create(email, data_nasc, password);
            res.status(200).json(newUser);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao gravar o novo usuário.'});
        }
    }

    async findAllUsers(req,res){
        try{
            const AllUsers = await this.userService.findAll();
            res.status(200).json(AllUsers);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar todos os usuários.'});
        }
    }

    async findUserByPk(req,res){
        const {id} = req.query;
        try{
            const User = await this.userService.findByPk(id);
            res.status(200).json(User);
        }
        catch(error){
            res
                .status(500)
                .json({error: 'Ocorreu um erro ao localizar o usuário.'});
        }
    }

    //metodo para login
    async login(req, res){
        const{email, password} = req.body;
        try {
            const User = await this.userService.login(email, password);
            //problema de seguranca
            res.status(200).json(User);
        } catch (error) {
            res.status(500).json({error: 'Erro ao logar o usuario'});
        }
    }
}

module.exports = UserController;