const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Schema1685679078410 {
    name = 'Schema1685679078410'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`video\` DROP FOREIGN KEY \`FK_74e27b13f8ac66f999400df12f6\``);
        await queryRunner.query(`ALTER TABLE \`video\` DROP COLUMN \`desc\``);
        await queryRunner.query(`ALTER TABLE \`video\` ADD \`desc\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`video\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`video\` ADD CONSTRAINT \`FK_74e27b13f8ac66f999400df12f6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`video\` DROP FOREIGN KEY \`FK_74e27b13f8ac66f999400df12f6\``);
        await queryRunner.query(`ALTER TABLE \`video\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`video\` DROP COLUMN \`desc\``);
        await queryRunner.query(`ALTER TABLE \`video\` ADD \`desc\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`video\` ADD CONSTRAINT \`FK_74e27b13f8ac66f999400df12f6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
