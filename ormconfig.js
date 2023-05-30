var dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'mysql',
      host: '127.0.0.1',
      database: 'videosharing',
      username: 'root',
      password: '',
      port: 3306,
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRun: true,
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'mysql',
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: 3306,
      entities: ['**/*.entity.js'],
      migrationsRun: true,
    });
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
