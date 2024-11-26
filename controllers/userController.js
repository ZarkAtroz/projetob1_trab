// ./controllers/userController.js

class UserController{
    constructor(UserService){
        this.userService = UserService;
    }
    async createUser(req, res) {
        const { email, data_nasc, password } = req.body;
        try {
            const newUser = await this.userService.create(email, data_nasc, password);
            if (newUser) {
                res.status(201).json(newUser); // Retorna 201 Created
            } else {
                res.status(400).json({ error: 'Não foi possível criar o usuário.' });
            }
        } catch (error) {
            if (error.message === 'O e-mail já está registrado.') {
                res.status(409).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Ocorreu um erro ao gravar o novo usuário.' });
            }
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

    async findUserByPk(req, res) {
        const { id } = req.params; // Alterar de req.query para req.params
        try {
            const user = await this.userService.findByPk(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao localizar o usuário.' });
        }
    }
    
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await this.userService.login(email, password);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(401).json({ error: 'Credenciais inválidas.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao logar o usuário.' });
        }
    }
    
}

module.exports = UserController;