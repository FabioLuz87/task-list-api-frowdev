import { UserEntity } from "../database/entities/user.entity";
import { pgHelper } from "../database/pg-helper";
import { User } from "../models/user.model";

export class UserRepository {

    async saveUser(user: User): Promise<void> {
        console.log(">>>>> ", pgHelper);
        const manager = pgHelper.client.manager;
     
        
       
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
    
}