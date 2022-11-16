/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable linebreak-style */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategories1668521778070 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
						name: 'id',
						type: 'uuid',
						isPrimary: true,
          },
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'description',
						type: 'varchar',
					},
					{
						name: 'createdAt',
						type: 'timestamp',
						default: 'now()',
					},
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('categories');
  }
}
