import { Request, response, Response} from 'express'
import { User } from '../../../models/user.model';
import { TaskRepository } from '../../task/usecases/repositories/task.repository';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserUsecase } from '../usecases/create-user.usecase';
import { DeleteUserUsecase } from '../usecases/delete-user.usecase';
import { ListAllUsersUsecase } from '../usecases/listall-user.usecase';
import { EditUserUsecase } from '../usecases/edit-user.usecase';

export class UserController {

    async create(request: Request, response: Response) {
        try {
            const usecase = new CreateUserUsecase(new UserRepository());
            const userToCreate = await usecase.execute(request.body)
            return response.status(201).json(userToCreate)
        } catch (error: any) {
            return response.status(422).json({error: error.message, stack: error});
        }

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

        const usecase = new ListAllUsersUsecase();
        let allUsersFounded = await usecase.execute();

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

        const usecase = new DeleteUserUsecase();
        
        try {
            usecase.execute(userId);
            return response.status(200).json({msg: 'Usuário deletado e suas mensagens'});
        } catch (error) { 
            return response.status(226).json({msg: 'Problemas de deleção de usuário'});
        }     
    }

    async update(request: Request, response: Response) {
        const {userId} = request.params;
        const {name, email, pass} = request.body;

        try {
            const usecase = new EditUserUsecase();
            const user = await usecase.execute(userId, name, email, pass);
            return response.status(200).json(user?.toJson());
        } catch (error: any) {
            return response.status(422).json({ error: error.message, stack: error });
        }
    }
}