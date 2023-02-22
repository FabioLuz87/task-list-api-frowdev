import { UserRepository } from '../../../../src/app/features/user/repositories/user.repository';
import { EditUserUsecase } from '../../../../src/app/features/user/usecases/edit-user.usecase';
import { User } from '../../../../src/app/models/user.model';

describe.only('Edit User usecase', () => {
    test('Deve editar um usuário', async () => {
        
        const repository = new UserRepository(); 
        const sut = new EditUserUsecase(repository);
        const user = new User('any_name', 'any_email', 'any_pass');
        jest.spyOn(repository, 'findUserById').mockResolvedValue(user);
        jest.spyOn(repository, 'saveUser').mockResolvedValue();

        const response = await sut.execute(user.id, 'new_name', 'new_email', 'new_pass');

        expect(response.id).toBeTruthy();
        expect(response.name).toBe('new_name');
        expect(response.email).toBe('new_email');
        expect(response.pass).toBe('new_pass');

    });

    test('Deve dar erro ao editar um usuário', async () => {
        
        const repository = new UserRepository(); 
        const sut = new EditUserUsecase(repository);
        const user = new User('any_name', 'any_email', 'any_pass');
        jest.spyOn(repository, 'findUserById').mockResolvedValue(undefined);

        await expect(sut.execute(user.id, 'new_name', 'new_email', 'new_pass')).rejects.toThrowError('Impossível editar usuário');
    });
});