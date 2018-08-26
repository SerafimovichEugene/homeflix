import * as sequalize from 'sequelize';

export class DBConnector {

  private static connector: DBConnector;
  public sequalize: any;
  constructor() {
    this.sequalize = new sequalize('database', 'username', 'password', {
      host: 'localhost',
      dialect: 'mysql',
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
    });
  }
  public static getConnector(): DBConnector {
      if (!DBConnector.connector) {
          DBConnector.connector = new DBConnector();
      }
      return DBConnector.connector;
  }
}
