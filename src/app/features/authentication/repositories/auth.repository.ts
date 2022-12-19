import { User } from "../../../../models/user.model";
import dataSource  from "../../../../main/database/database-connection";
import { UserEntity } from "../../../shared/database/entities/user.entity";

export class AuthRepository{
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
}

