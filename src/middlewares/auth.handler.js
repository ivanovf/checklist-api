const EntityManager = require('./entity.manager');
const crypt = require('bcrypt');
const boom = require('@hapi/boom');

class Auth {

  async auth(userName, password) {
		try {
      const userStorage = EntityManager.getStorage('User');
			const user = await userStorage.findByEmail(userName);

			if (user) {
				const isValid = await crypt.compare(password, user.password);
				if (isValid) {
					return 'token';
				}
				else {
					return 'no token';
				}
			}
			else {
				return 'no user';
			}
			
		} catch (error) {
			boom.badData('Any user was found.');
		}
	}
}