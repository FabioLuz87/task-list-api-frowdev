import { AuthRepository } from '../../../../src/app/features/authentication/repositories/auth.repository';
import { LoginUser } from '../../../../src/app/features/authentication/usecases/login-user.usecase';
import { User } from '../../../../src/app/models/user.model';

describe('Login user Usecase', () => {
    test('Deve realizar login de um user', async () => {

        const repository = new AuthRepository();
        const sut = new LoginUser(repository);
        const user = new User('any_name', 'any_email', 'any_pass');

        jest.spyOn(repository, 'findUserByEmail').mockResolvedValue(user);
      
        const result = await sut.execute({
           email: 'any_email',
           pass: 'any_pass',
        });

        expect(result.id).toBeTruthy();
        expect(result.email).toBe('any_email');
        expect(result.pass).toBe('any_pass');
    });

    test('Deve cair numa exceção', async () => {

        const repository = new AuthRepository();
        const sut = new LoginUser(repository);
        const user = new User('any_name', 'any_email', 'any_pass');

        jest.spyOn(repository, 'findUserByEmail').mockResolvedValue(user);
      
        await expect(sut.execute({
            email: 'any_email',
            pass: 'diff_pass'
        })).rejects.toThrow('Senha incorreta');
    });
});