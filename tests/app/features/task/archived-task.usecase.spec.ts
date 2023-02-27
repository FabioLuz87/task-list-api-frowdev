import { TaskRepository } from "../../../../src/app/features/task/repositories/task.repository";
import { CacheRepository } from "../../../../src/app/shared/database/repositories/cache.respository";
import { RedisCacheMock } from "../../../../src/main/test/RedisMockRepository";
import { ArchivedTaskUsecase } from "../../../../src/app/features/task/usecases/archived-task.usecase";
import { Task } from "../../../../src/app/models/task.model";


describe("Archived task usecase", () => {
    test("Deve arquivar uma tarefa", async () => {
        const repository = new TaskRepository();
        const cacheRepository = new RedisCacheMock() as unknown as CacheRepository;
        const task = new Task("any_description", "any_detail", "any_user_id")

        const sut = new ArchivedTaskUsecase(repository, cacheRepository);

        jest.spyOn(repository, 'findTaskById').mockResolvedValue(task);
        jest.spyOn(repository, 'update').mockResolvedValue();
        jest.spyOn(cacheRepository, 'delete').mockResolvedValue();

        await sut.execute("any_user_id");

        expect(repository.findTaskById).toHaveBeenCalledTimes(1);
        expect(repository.update).toHaveBeenCalledTimes(1);
        expect(cacheRepository.delete).toHaveBeenCalledTimes(1);
    });

    test("Deve retornar erro ao arquivar uma tarefa", async () => {
        const repository = new TaskRepository();
        const cacheRepository = new RedisCacheMock() as unknown as CacheRepository;

        const sut = new ArchivedTaskUsecase(repository, cacheRepository);

        jest.spyOn(repository, 'findTaskById').mockResolvedValue(null);

        await expect(() => sut.execute("any_user_id")).rejects.toThrow(Error);        
    });
});