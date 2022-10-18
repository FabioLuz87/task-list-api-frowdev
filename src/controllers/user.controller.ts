import { Request, response, Response} from 'express'
import { database } from '../db/database';
import { User } from '../models/user.model';
export class UserController {
    create(request: Request, response: Response) {
        const {name, email, pass} = request.body;
        const newUser = new User(name, email, pass);
        database.push(newUser);

        if(!name)   
            return response.status(403).send('Não foi informado nome de usuário');
        
        return response.status(200).json(
            {
                msg:'Usuário criado com sucesso',
                id: newUser.id
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