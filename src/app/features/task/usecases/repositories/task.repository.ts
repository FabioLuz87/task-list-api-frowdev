import { TaskEntity } from "../../../../shared/database/entities/task.entity";
import dataSource from "../../../../../main/database/database-connection"
import { Task } from "../../../../models/task.model";

export class TaskRepository {

    async saveTask(task: Task): Promise<void> {
        const manager = dataSource.manager;
        
        const taskEntity = manager.create(TaskEntity, {
            id: task.id,
            description: task.description,
            detail: task.detail,
            userId: task.userId,
            isItArchived: task.isItArchived,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        });

        await manager.save(taskEntity);
    }

    async getAll(userId: string): Promise<Task[]> {
        const manager = dataSource.manager;

        const tasksEntities = await manager.find(TaskEntity, {
            where: { userId },
            order: { isItArchived: 'ASC', updatedAt: 'DESC' }
        });
        
        return tasksEntities.map(row => {
            return Task.create(
                row.id,
                row.description,
                row.detail,
                row.userId,
                row.isItArchived,
            )
        });
    }

    async findTaskById(id: string) {
        const manager = dataSource.manager;

        const taskEntity = await manager.findOne(TaskEntity, {
            where: { id }
        });

        if(!taskEntity) return null;
        
        return Task.create(
            taskEntity.id,
            taskEntity.description,
            taskEntity.detail,
            taskEntity.userId,
            taskEntity.isItArchived
        )
    }

    async update(task: Task): Promise<void> {
        const manager = dataSource.manager;
        
        const taskEntity = manager.create(TaskEntity, {
            id: task.id,
            description: task.description,
            detail: task.detail,
            userId: task.userId,
            isItArchived: task.isItArchived,
            updatedAt: new Date().toISOString(),
        });
        
        await manager.save(taskEntity);
    }

    async delete(id: string) {
        const manager = dataSource.manager;

        await manager.delete(TaskEntity, id);
    }

}