const boom = require('@hapi/boom');

class EntityManager {

  constructor() {

	}

  getStorage(entityName) {
    const entityClass = require('./../Entities/' + entityName);
    return new entityClass();
  }
  
}

module.exports = EntityManager;