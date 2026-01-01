import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1766744730024 implements MigrationInterface {
    name = 'Migration1766744730024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tenants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "name" character varying(255) NOT NULL, "slug" character varying(100) NOT NULL, "domain" character varying(100) NOT NULL, "schema_name" character varying(100) NOT NULL, "status" character varying(50) NOT NULL DEFAULT 'active', "metadata" jsonb NOT NULL DEFAULT '{}', "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_2310ecc5cb8be427097154b18fc" UNIQUE ("slug"), CONSTRAINT "UQ_da4054294eaae43ec7f85b6a3a1" UNIQUE ("domain"), CONSTRAINT "UQ_c2a961556326eec0e3b19f3ced5" UNIQUE ("schema_name"), CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_32731f181236a46182a38c992a" ON "tenants" ("name") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2310ecc5cb8be427097154b18f" ON "tenants" ("slug") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_da4054294eaae43ec7f85b6a3a" ON "tenants" ("domain") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c2a961556326eec0e3b19f3ced" ON "tenants" ("schema_name") `);
        await queryRunner.query(`CREATE INDEX "IDX_c59559e7872bc9726adef4669f" ON "tenants" ("status") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c59559e7872bc9726adef4669f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c2a961556326eec0e3b19f3ced"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da4054294eaae43ec7f85b6a3a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2310ecc5cb8be427097154b18f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_32731f181236a46182a38c992a"`);
        await queryRunner.query(`DROP TABLE "tenants"`);
    }

}
