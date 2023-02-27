import { TaskRepository } from '../../../../src/app/features/task/repositories/task.repository';
import { RemoveTaskUsecase } from '../../../../src/app/features/task/usecases/remove-task.usecase';
import { CacheRepository } from '../../../../src/app/shared/database/repositories/cache.respository';
import { Task } from '../../../../src/app/models/task.model';
import { RedisCacheMock } from '../../../../src/main/test/RedisMockRepository';

jest.mock("ioredis", () => require("ioredis-mock"));

describe("Remove Task Usecase", () => {
    test("Deve remover uma tarefa", async () => {
        const repository = new TaskRepository();
        const cacheRepository = new RedisCacheMock() as unknown as CacheRepository;
        const sut = new RemoveTaskUsecase(repository, cacheRepository);
        const task = new Task("any_description", "any_detail", "any_userId");

        jest.spyOn(repository, 'findTaskById').mockResolvedValue(task);
        jest.spyOn(repository, 'delete').mockResolvedValue();
        jest.spyOn(cacheRepository, 'delete').mockResolvedValue();

        await sut.execute(task.id);
        
        expect(repository.delete).toHaveBeenCalledTimes(1);
        expect(repository.delete).toHaveBeenCalledWith(task.id);
        expect(cacheRepository.delete).toHaveBeenCalledTimes(1);
    });

    test("Deve retornar erro ao apagar uma tarefa", async () => {
        const repository = new TaskRepository();
        const cacheRepository = new RedisCacheMock() as unknown as CacheRepository;
        const sut = new RemoveTaskUsecase(repository, cacheRepository);

        jest.spyOn(repository, 'findTaskById').mockResolvedValue(null);

        await expect(() => sut.execute('any_id')).rejects.toThrow(Error);
    });
});