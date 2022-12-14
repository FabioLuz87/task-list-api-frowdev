import { UserEntity } from "../app/shared/database/entities/user.entity";
import dataSource from "../main/database/database-connection"
import { User } from "../models/user.model";

export class UserRepository {

    async saveUser(user: User): Promise<void> {
        const manager = dataSource.manager;
        
        const userEntity = manager.create(UserEntity, {
            id: user.id,
            name: user.name,
            email: user.email,
            pass: user.pass,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        });

        await manager.save(userEntity);
    }

    async findUserById(id: string): Promise<User | undefined> {
        const manager = dataSource.manager;

        const userEntity = await manager.findOne(UserEntity, {
            where: { id },
        })

        if(!userEntity) return undefined;

        const user = User.create(
            userEntity.id,
            userEntity.name,
            userEntity.email,
            userEntity.pass
        )

        return user;
    }

    async findUserByEmail(email: string): Promise<User | undefined> {
        const manager = dataSource.manager;

        const userEntity = await manager.findOne(UserEntity, {
            where: { email },
        })

        if(!userEntity) return undefined;

        const user = User.create(
            userEntity.id,
            userEntity.name,
            userEntity.email,
            userEntity.pass
        )
        return user;
    }

    async findAllUsers(): Promise<User[]> {
        const manager = dataSource.manager;

        const usersEntities = await manager.find(UserEntity);

        return usersEntities.map(row => {
            return User.create(
                row.id,
                row.name,
                row.email,
                row.pass
            )
        });        
    }

    async remove(id: string) {
        const manager = dataSource.manager;
        manager.delete(UserEntity, id);
    }
}