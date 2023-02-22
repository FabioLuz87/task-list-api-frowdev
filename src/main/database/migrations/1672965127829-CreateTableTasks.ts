import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTableTasks1672965127829 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tasks",
                columns: [
                    { name: "id", type: "uuid", isPrimary: true, isNullable: false },
                    { name: "description", type: "varchar", length: "50", isNullable: false },
                    { name: "detail", type: "varchar", length: "255", isNullable: false },
                    { name: "is_it_archived", type: "boolean", isNullable: false, default: false },
                    { name: "user_id", type: "uuid", isNullable: false },
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
                    default:  "now()",
                    },
                ],
                foreignKeys: [
                    new TableForeignKey({
                    name: "fk_user_id",
                    columnNames: ["user_id"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    }),
                ]

            })
        
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks", true, true, true);
    }

}
