import { UserRepository } from '../../../../src/app/features/user/repositories/user.repository';
import { ListAllUsersUsecase } from '../../../../src/app/features/user/usecases/listall-user.usecase';
import { User } from '../../../../src/app/models/user.model';

describe('ListAll user usecase', () => {
    test('Deve retornar uma lista de usuários', async () => {

        const repository = new UserRepository();
        const sut = new ListAllUsersUsecase(repository);

        jest.spyOn(repository,'findAllUsers').mockResolvedValue([])

       const response = await sut.execute();

       expect(response).toBeTruthy(); 
       expect(response).toHaveLength(0);
    });

    test('Deve retornar uma lista de usuários', async () => {

        const repository = new UserRepository();
        const sut = new ListAllUsersUsecase(repository);
        const userPosOne = new User('any_name', 'any_email', 'any_pass');

        jest.spyOn(repository,'findAllUsers').mockResolvedValue([userPosOne])

       const response = await sut.execute();

       expect(response).toBeTruthy(); 
       expect(response).toHaveLength(1);
    });
});