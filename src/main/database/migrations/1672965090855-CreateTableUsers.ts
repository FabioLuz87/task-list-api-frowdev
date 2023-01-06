import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm"

export class CreateTableUsers1672965090855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    { name: "id", type: "uuid", isPrimary: true, isNullable: false },
                    { name: "name", type: "varchar", length: "50", isNullable: false },
                    { name: "email", type: "varchar", length: "50", isNullable: false },
                    { name: "pass", type: "varchar", length: "50", isNullable: false },
                    {
                    name: "created_at",
                    type: "timestamp",
                    isNullable: false,
                    default: "now()",
                    },
                    {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: false,
                    default: "now()",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
