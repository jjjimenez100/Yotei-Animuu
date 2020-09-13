class Entity {
  columns() {
    return Object
      .keys(this)
      .map(
          columnName => columnName.slice(1, columnName.length)
      );
  }

  properties() {
    const id = this._id;
    const properties = Object
      .keys(this)
      .filter(propertyName => propertyName !== '_id')
      .map(
        propertyName => {
          const columnName = propertyName.slice(1, propertyName.length);
          return {
            [columnName]: this[propertyName]
          };
        }
      );

    return { id, properties };
  }
}

module.exports = Entity;