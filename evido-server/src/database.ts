import Knex from 'knex';
import { merge } from 'lodash';
import knexFile from '../knexfile';

export class Database {
  private knexInstance: Knex;
  private config: object;

  connect(options = {}) {
    if (this.knexInstance) {
      return;
    }

    this.config = merge({}, knexFile, options);
    this.knexInstance = Knex(this.config);
  }

  get query(): Knex {
    if (!this.knexInstance) {
      this.connect();
    }

    return this.knexInstance;
  }

  close(cb) {
    if (!this.knexInstance) {
      cb();
      return;
    }

    this.knexInstance.destroy(cb);
  }
}

export default new Database();
