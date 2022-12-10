/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTypeDataOfLicensePlate1670680255622 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cars" ALTER COLUMN "license_plate" TYPE VARCHAR`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cars" ALTER COLUMN "license_plate TYPE NUMERIC"`,
    );
  }
}
