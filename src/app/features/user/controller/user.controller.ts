import { Request, response, Response} from 'express'
import { User } from '../../../../models/user.model';
import { TaskRepository } from '../../../../repositories/task.repository';
import { UserRepository } from '../../../../repositories/user.repository';

export class UserController {

    async login(request: Request, response: Response) {
        const {email, pass } = request.body;

        const repository = new UserRepository();
        const user = await repository.findUserByEmail(email);

        if(pass !== user!.pass)
            throw new Error('Senha incorreta');
        
        return { id: user!.id , name: user!.name};
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

    async remove(request: Request, response: Response) {
        const {userId} = request.params;

        const taskRepository = new TaskRepository();
        const tasksPerUser = await taskRepository.getAll(userId)

        tasksPerUser.forEach(async task => { 
            await taskRepository.delete(task.id)
        });

        const verifyTasks = await taskRepository.getAll(userId)
        if(verifyTasks.length === 0) {
            const userRepository = new UserRepository();
            await userRepository.remove(userId)    
        } else {
            return response.status(226).json({msg: 'Problemas de deleção de usuário'});
        }

        return response.status(200).json({msg: 'Usuário deletado e suas mensagens'});
    }

    async update(request: Request, response: Response) {
        const {userId} = request.params;
        const {name, email, pass} = request.body;
      
        const repository = new UserRepository();
        const user: User | undefined = await repository.findUserById(userId);

        if(!user) return response.status(404).json({ msg:'Impossível editar usuário'});

        user.update(name, email, pass);
        repository.saveUser(user)

        return response.status(200).json(user?.toJson());
    }
}