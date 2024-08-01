import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1722546447408 implements MigrationInterface {
    name = 'Migration1722546447408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transportation" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, "carboneEmissionsByGrPerKm" integer NOT NULL, CONSTRAINT "PK_d7f91167cda8f3f83929b7892fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_session" ("id" character varying(32) NOT NULL, "userId" uuid, CONSTRAINT "PK_adf3b49590842ac3cf54cac451a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "AppUser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "hashedPassword" character varying NOT NULL, CONSTRAINT "UQ_fc9d46269ef4c91e17262748f9f" UNIQUE ("email"), CONSTRAINT "PK_616b1af76abd9437231bc736ca6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ride" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "label" character varying NOT NULL, "distance" integer NOT NULL, "date" TIMESTAMP NOT NULL, "ownerId" uuid, "transportationId" integer, CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_session" ADD CONSTRAINT "FK_b5eb7aa08382591e7c2d1244fe5" FOREIGN KEY ("userId") REFERENCES "AppUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_5f4bd4790ad311d97bb8e116f0a" FOREIGN KEY ("ownerId") REFERENCES "AppUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_bd688ebfce39741d767ca10a751" FOREIGN KEY ("transportationId") REFERENCES "transportation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_bd688ebfce39741d767ca10a751"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_5f4bd4790ad311d97bb8e116f0a"`);
        await queryRunner.query(`ALTER TABLE "user_session" DROP CONSTRAINT "FK_b5eb7aa08382591e7c2d1244fe5"`);
        await queryRunner.query(`DROP TABLE "ride"`);
        await queryRunner.query(`DROP TABLE "AppUser"`);
        await queryRunner.query(`DROP TABLE "user_session"`);
        await queryRunner.query(`DROP TABLE "transportation"`);
    }

}
