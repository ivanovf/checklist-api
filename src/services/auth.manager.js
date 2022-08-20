const EntityManager = require('./entity.manager');
const crypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

class Auth {

  constructor(secret) {
    this.secret = secret;
    this.role = null;
	}

  async getAuth(userName, password) {
    try {
      const entityManager = new EntityManager();
      const userStorage = entityManager.getStorage('User');
			const user = await userStorage.findByEmail(userName);

			if (user) {
				const isValid = await crypt.compare(password, user.password);
				if (isValid) {
					return this.sign({
            id: user.id,
            email: user.email,
            role: user.role,
          });
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

  sign(data) {
    return jwt.sign(data, this.secret);
  }

  validateToken() {
    return (req, res, next) => {
      const authorization = req.headers.authorization || '';
      const token = authorization.replace('Bearer ', '');

      if (token) {
        try {
          const data = jwt.verify(token, this.secret);
          if (data) {
            this.role = data?.role;
            next();
          }
        } catch (error) {
          next(res.status(403).json({message: error}));
        }
      }
      else {
        next(res.status(403).json({message: 'Not token in headers.'}));
      }
    }
  }

  hasPermissions(method, routeRoles) {
    return (req, res, next) => {

      const currentRole = this.role || 'anonymous';

      console.log(routeRoles[method].roles);
      console.log(currentRole);

      if (routeRoles[method]) {
        const hasRole = routeRoles[method].roles.find(r => r.id == currentRole);
        if (hasRole) {
          next();
        }
        else {
          next(res.status(403).json({message: 'The user is not authorized.'}));
        }
      }
      else {
        next(res.status(403).json({message: 'No method available.'}));
      }
    }
  }
}

module.exports = Auth;