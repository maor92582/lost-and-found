import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumn1791303362443 implements MigrationInterface {
  name = 'RenameColumn1791303362443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. הסרת הקשרים הישנים
    await queryRunner.query(
      `ALTER TABLE "report" DROP CONSTRAINT "FK_e347c56b008c2057c9887e230aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_1cffb00d43787a8f9c4114223e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`,
    );

    // 2. שינוי שם לעמודת username
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "username" TO "user_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" TO "UQ_d34106f8ec1ebaf66f4f8609dd6"`,
    );

    // 3. החלפת המחיקות בשינוי שם לטבלת report
    await queryRunner.query(
      `ALTER TABLE "report" RENAME COLUMN "createdAt" TO "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "report" RENAME COLUMN "eventDate" TO "event_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "report" RENAME COLUMN "userId" TO "user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "report" RENAME COLUMN "isResolved" TO "is_resolved"`,
    );

    // 4. החלפת המחיקות בשינוי שם לטבלת comment
    await queryRunner.query(
      `ALTER TABLE "comment" RENAME COLUMN "createdAt" TO "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" RENAME COLUMN "reportId" TO "report_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" RENAME COLUMN "userId" TO "user_id"`,
    );

    // 5. הוספת הקשרים החדשים
    await queryRunner.query(
      `ALTER TABLE "report" ADD CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_6c4ddf5b4b438eff30ef1bf1fad" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. הסרת הקשרים החדשים
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_6c4ddf5b4b438eff30ef1bf1fad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "report" DROP CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8"`,
    );

    // 2. ביטול שינויי השם לטבלת comment
    await queryRunner.query(
      `ALTER TABLE "comment" RENAME COLUMN "report_id" TO "reportId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" RENAME COLUMN "user_id" TO "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" RENAME COLUMN "created_at" TO "createdAt"`,
    );

    // 3. ביטול שינויי השם לטבלת report
    await queryRunner.query(
      `ALTER TABLE "report" RENAME COLUMN "user_id" TO "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "report" RENAME COLUMN "is_resolved" TO "isResolved"`,
    );
    await queryRunner.query(
      `ALTER TABLE "report" RENAME COLUMN "event_date" TO "eventDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "report" RENAME COLUMN "created_at" TO "createdAt"`,
    );

    // 4. ביטול שינוי השם ל-username
    await queryRunner.query(
      `ALTER TABLE "user" RENAME CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" TO "UQ_78a916df40e02a9deb1c4b75edb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "user_name" TO "username"`,
    );

    // 5. הוספת הקשרים הישנים בחזרה
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_1cffb00d43787a8f9c4114223e1" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "report" ADD CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
