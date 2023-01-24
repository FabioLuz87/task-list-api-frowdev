import { UserRepository } from '../../../../src/app/features/user/repositories/user.repository';
import { CreateUserUsecase } from '../../../../src/app/features/user/usecases/create-user.usecase';

describe('Create user Usecase', () => {
    test('Deve salvar um user', async () => {

        const repository = new UserRepository();
        const sut = new CreateUserUsecase(repository);

        jest.spyOn(repository, 'verifyUserExistsByEmail').mockResolvedValue(false);
        jest.spyOn(repository, 'saveUser').mockResolvedValue();

        const result = await sut.execute({
           name: 'any_name',
           email: 'any_email',
           pass: 'any_pass',
        });

        expect(result.name).toBe('any_name');
    });
});