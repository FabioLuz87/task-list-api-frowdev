import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({name: "tasks"})
export class TaskEntity {

    @PrimaryColumn()
    id!: string;

    @Column()
    description!: string;

    @Column()
    detail!: string;

    @Column({ name: "user_id" })
    userId!: string;

    @Column({ name: "is_it_archived" })
    isItArchived!: boolean;

    @Column({name: 'created_at'})
    createdAt!: string;

    @Column({name: 'updated_at'})
    updatedAt!: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    userEntity?: UserEntity;
}