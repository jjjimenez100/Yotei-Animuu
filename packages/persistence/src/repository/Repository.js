class Repository {
  constructor(database, tableName = '') {
    this.database = database;
    this.tableName = tableName;
  }

  getById(id) {
    const selectQuery = `
      SELECT * FROM ${this.tableName} 
      WHERE id = ?
    `;
    const preparedStatement = this.database.prepare(selectQuery);
    return preparedStatement.get([id]);
  }

  getAll() {
    const selectQuery = `
      SELECT * FROM ${this.tableName}
    `;
    const preparedStatement = this.database.prepare(selectQuery);
    return preparedStatement.get();
  }

  save(id, properties) {
    const columns = `(id, ${Object.keys(properties).join(',')})`;
    const values = new Array(Object.keys(properties).length).fill('?').join(',');
    const insertQuery = `
      INSERT INTO ${this.tableName} ${columns} VALUES (${values})
    `;
    const preparedStatement = this.database.prepare(insertQuery);

    return preparedStatement.run([id, ...Object.values(properties)]);
  }

  update(id, properties = {}) {
    const setQuery = Object.keys(properties).map(detailKey => `${detailKey} = ?`).join(', ');
    const updateQuery = `
      UPDATE ${this.tableName} 
      WHERE id = ? 
      SET ${setQuery}
    `;
    const preparedStatement = this.database.prepare(updateQuery);

    return preparedStatement.run(Object.values(properties));
  }

  delete(id) {
    const deleteQuery = `
      DELETE FROM ${this.tableName} 
      WHERE id = ?
    `;
    const preparedStatement = this.database.prepare(deleteQuery);
    return preparedStatement.run([id]);
  }
}

module.exports = Repository;