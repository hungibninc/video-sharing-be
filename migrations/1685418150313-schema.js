const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Schema1685418150313 {
    name = 'Schema1685418150313'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`video\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`desc\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`admin\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`video\` ADD CONSTRAINT \`FK_74e27b13f8ac66f999400df12f6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`video\` DROP FOREIGN KEY \`FK_74e27b13f8ac66f999400df12f6\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`video\``);
    }
}
