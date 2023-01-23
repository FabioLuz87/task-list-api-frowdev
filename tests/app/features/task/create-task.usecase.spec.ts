import { TaskRepository } from '../../../../src/app/features/task/repositories/task.repository';
import { CreateTaskUsecase } from '../../../../src/app/features/task/usecases/create-task.usecase';
import { CacheRepository } from '../../../../src/app/shared/database/repositories/cache.respository';
import { Task } from '../../../../src/app/models/task.model';

jest.mock("ioredis", () => require("ioredis-mock"))

describe("Crate Task Usecase", () => {
    test("deve criar uma tarefa", async () => {
        const repository = new TaskRepository();
        const cacheRepository = new CacheRepository();
        const sut = new CreateTaskUsecase(repository, cacheRepository);
        const task = new Task('any_description', 'any_detail', 'any_user_id');

        jest.spyOn(repository, 'saveTask').mockResolvedValue();

        const result = await sut.execute(task);

        expect(result?.id).toBeTruthy();
        expect(result?.description).toEqual('any_description');
        expect(result?.detail).toEqual('any_detail');
        expect(result?.userId).toEqual('any_user_id');
        expect(result?.isItArchived).toBeFalsy();
    });
});