import { Request, response, Response} from 'express'
import { database } from '../db/database';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
export class UserController {

    login(request: Request, response: Response) {
        const {email, pass } = request.body;

        
        const user = database.find((user) => user.email === email) as User;

        if(pass === user.pass)
            return response.status(202).json({id: user.id});

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

    getById(request: Request, response: Response) {
        const {userId} = request.params;
        const user = database.find((user) => user.id === userId) as User;

        return response.json(user.toJson());
    };

    getAll(request: Request, response: Response) {
        const { name, email } = request.query;

        let allUsersFounded = database.map(user => {
            return user.toJson();
        });

        if(allUsersFounded.length === 0)
           return response.send("Nenhum usuário cadastrado");
       
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

        return response.json(allUsersFounded)
    }

    remove(request: Request, response: Response) {
        const {userId} = request.params;
        const index = database.findIndex(user => user.id === userId);

        database.splice(index, 1);

        return response.json({msg: 'user deleted'});
    }

    update(request: Request, response: Response) {
        const {userId} = request.params;
        const {name, cpf, email, age} = request.body;
        const user = database.find(u => u.id === userId) as User;

        user.update(name, email);

        return response.json(user?.toJson());
    }
}