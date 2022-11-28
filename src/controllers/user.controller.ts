import { Request, response, Response} from 'express'
import { database } from '../db/database';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
export class UserController {

    async login(request: Request, response: Response) {
        const {email, pass } = request.body;

        const repository = new UserRepository();
        const user = await repository.findUserByEmail(email);

        if(pass === user!.pass)
            return response.status(202).json({ id: user!.id , name: user!.name});

        return response.status(403).json({msg:'Senha incorreta'});
    }

    async create(request: Request, response: Response) {
        const {name, email, pass} = request.body;
        const newUser = new User(name, email, pass);
        
        const repository = new UserRepository();
        await repository.saveUser(newUser);
        
        return response.status(201).json(
            {
                msg:'Usuário criado com sucesso',
                id: newUser.id,
                name: newUser.name
            }
        );
    };

    async getById(request: Request, response: Response) {
        const {userId} = request.params;
        
        const repository = new UserRepository();
        const user = await repository.findUserById(userId);

        if(!user) return response.status(400).json({error: "Usuário não encontrado"})

        return response.status(200).json(user.toJson());
    };

    async getAll(request: Request, response: Response) {
        const { name, email } = request.query;

        const repository = new UserRepository();
        let allUsersFounded = await repository.findAllUsers();


        if(allUsersFounded.length === 0) return response.status(404).json({err: "Nenhum usuário cadastrado"});
       
        if(name) {
            allUsersFounded = allUsersFounded.filter(user => {
                return user.name.toLowerCase().includes(name.toString().toLowerCase())
            });
        }

        if(email) {
            allUsersFounded = allUsersFounded.filter(user => {
                return user.email.toLowerCase().includes(email.toString().toLowerCase())
            })
        }

        if(allUsersFounded.length === 0) return response.status(404).json({err: "Nenhum usuário encontrado"});

        return response.status(200).json(allUsersFounded)
    }

    remove(request: Request, response: Response) {
        const {userId} = request.params;

        const repository = new UserRepository();
        repository.remove(userId)


        return response.json({msg: 'Usuário deletado'});
    }

    update(request: Request, response: Response) {
        const {userId} = request.params;
        const {name, cpf, email, age} = request.body;
        const user = database.find(u => u.id === userId) as User;

        user.update(name, email);

        return response.json(user?.toJson());
    }
}