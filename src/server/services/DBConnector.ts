import * as sequalize from 'sequelize';
import { Sequelize } from 'sequelize';

export class DBConnector {

  private static connector: DBConnector;

  public sequalize: Sequelize;

  constructor() {
    this.sequalize = new sequalize(process.env.DB_NAME!, process.env.DB_USERNAME!, process.env.DB_PASS!, {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
    });
  }

  public static getConnector(): Sequelize {
    if (!DBConnector.connector) {
      DBConnector.connector = new DBConnector();
    }
    return DBConnector.connector.sequalize;
  }
}
