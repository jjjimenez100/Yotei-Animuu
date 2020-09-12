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

  update(id, details = {}) {
    const setQuery = Object.keys(details).map(detailKey => `${detailKey} = ?`).join(', ');
    const updateQuery = `
      UPDATE ${this.tableName} 
      WHERE id = ? 
      SET ${setQuery}
    `;
    const preparedStatement = this.database.prepare(updateQuery);
    return preparedStatement.run(Object.values(details));
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