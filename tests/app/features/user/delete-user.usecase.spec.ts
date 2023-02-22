import { TaskRepository } from '../../../../src/app/features/task/repositories/task.repository';
import { UserRepository } from '../../../../src/app/features/user/repositories/user.repository';
import { DeleteUserUsecase } from '../../../../src/app/features/user/usecases/delete-user.usecase';
import { Task } from '../../../../src/app/models/task.model';
import { User } from '../../../../src/app/models/user.model';

describe('Delete user Usecase', () => {
    test('Deve deletar um user', async () => {
        const userRepository = new UserRepository();
        const taskRepository = new TaskRepository();
        const sut = new DeleteUserUsecase(userRepository, taskRepository);
        const userPosOne = new User('any_name', 'any_email', 'any_pass');
        const task = new Task('any_desc', 'any_detail', userPosOne.id);

        const testSpy = 
            jest.spyOn(taskRepository, 'getAll').mockResolvedValue([]) &&
            jest.spyOn(userRepository, 'remove').mockResolvedValue()
        ;
        
        await sut.execute(userPosOne.id);

        expect(testSpy).toHaveBeenCalledTimes(1);
        expect(testSpy).toHaveBeenCalledWith(userPosOne.id);
    });

    test('Deve deletar as tasks do usuário', async () => {
        const userRepository = new UserRepository();
        const taskRepository = new TaskRepository();
        const sut = new DeleteUserUsecase(userRepository, taskRepository);
        const userPosOne = new User('any_name', 'any_email', 'any_pass');
        const task = new Task('any_desc', 'any_detail', userPosOne.id);

        const testSpy = 
            jest.spyOn(taskRepository, 'getAll').mockResolvedValue([task]) &&
            jest.spyOn(taskRepository, "delete").mockResolvedValue() &&
            jest.spyOn(userRepository, 'remove').mockResolvedValue() 
        ;
        
        await sut.execute(userPosOne.id);

        expect(testSpy).toHaveBeenCalledTimes(1);
        expect(testSpy).toHaveBeenCalledWith(userPosOne.id);
    });
});