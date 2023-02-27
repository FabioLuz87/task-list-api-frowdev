import { TaskRepository } from "../../../../src/app/features/task/repositories/task.repository";
import { CacheRepository } from "../../../../src/app/shared/database/repositories/cache.respository";
import { RedisCacheMock } from "../../../../src/main/test/RedisMockRepository";
import { ListaAllTasksUsecase } from "../../../../src/app/features/task/usecases/listaall-tasks.usecase";
import { Task } from "../../../../src/app/models/task.model";

jest.mock("ioredis", () => require("ioredis-mock"));

describe('ListAll Tasks usecase', () => {
    test('Deve conter a tarefa na list de reposta passando no cache', async () => {
        const repository = new TaskRepository();
        const cacheRepository = new RedisCacheMock() as unknown as CacheRepository;
        const sut = new ListaAllTasksUsecase(repository, cacheRepository);
        const task = new Task("any_description", "any_detail", "any_user_id");

        jest.spyOn(cacheRepository, 'get').mockResolvedValue([task]);

        const response = await sut.execute("any_user_id");

        expect(response).toContain(task);
    });

    test('Deve conter a tarefa na list de reposta passando no postgressql', async () => {
        const repository = new TaskRepository();
        const cacheRepository = new RedisCacheMock() as unknown as CacheRepository;
        const sut = new ListaAllTasksUsecase(repository, cacheRepository);
        const task = new Task("any_description", "any_detail", "any_user_id");

        jest.spyOn(cacheRepository, 'get').mockResolvedValue(null);
        jest.spyOn(cacheRepository, 'set').mockResolvedValue();
        jest.spyOn(repository, "getAll").mockResolvedValue([task])

        const response = await sut.execute("any_user_id");

        expect(response).toContain(task);
    });
});