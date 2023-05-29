var dbConfig = {
  migrations: ['migrations/*.js'],
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      synchronize: true,
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
      synchronize: false,
      migrationsRun: true,
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      synchronize: false,
      migrationsRun: true,
      type: 'mysql',
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: 3306,
      entities: ['**/*.entity.js'],
    });
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
