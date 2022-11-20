import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: "users"})
export class UserEntity {

    @PrimaryColumn()
    id!: string;

    @Column({length: 50})
    name!: string;

    @Column({unique: true, length: 50})
    email!: string;

    @Column({length: 50})
    pass!: string;

    @Column({name: 'created_at'})
    createdAt!: string;

    @Column({name: 'updated_at'})
    updatedAt!: string;

}