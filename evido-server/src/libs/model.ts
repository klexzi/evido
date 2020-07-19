import DB, { Database } from '../database';

const model = (tableName: string, sqlFields: string[], _db = DB) => {
  return class Model<T> {
    private _db: Database;
    private _tableName: string;
    private _sqlFields: string[];

    constructor(obj) {
      Object.assign(this, obj);
      this._db = _db;
      this._tableName = tableName;
      this._sqlFields = sqlFields;
    }

    static fields = sqlFields;

    static async findById(id: number | string, db = _db) {
      const results = await db
        .query(tableName)
        .where('id', id)
        .select(...Model.fields);
      if (results.length > 0) {
        return new Model(results[0]);
      }

      return null;
    }

    static async findAll(db = _db) {
      const results = await db.query(tableName).select(...Model.fields);
      return results.map(result => new Model(result));
    }

    async create() {
      const result = this._db.query(tableName).insert(this);
      console.log('create result', result);
      return result;
    }
  };
};

export default model;
