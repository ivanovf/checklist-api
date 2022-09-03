const roles = {
  anonymous: {
    label: 'Anonymous',
    id: 'anonymous',
  },
  authenticated: {
    label: 'Authenticated',
    id: 'authenticated'
  },
  administrator: {
    label: 'Administrator',
    id: 'administrator'
  }
};

const routes = [
  {  
    id: 'base',
    path: '/api/v1',
  },
  {
    id: 'login',
    path: '/login',
    dataValidator: './../middlewares/data.validators/login.schema',
    methods: {
      'POST': {
        roles: [
          roles.anonymous,
          roles.authenticated,
          roles.administrator,
        ]
      },
    }
  },
  {
    id: 'logout',
    path: '/logout',
    methods: {
      'GET': {
        roles: [
          roles.anonymous,
          roles.authenticated,
          roles.administrator,
        ]
      },
    }
  },
  {
    id: 'items',
    path: '/items',
    entity: 'Item',
    dataValidator: './../middlewares/data.validators/item.schema',
    methods: {
      'POST': {
        roles: [
          roles.administrator
        ]
      },
      'GET': {
        roles: [
          roles.authenticated,
          roles.administrator,
        ]
      },
      'PATCH': {
        roles: [
          roles.administrator
        ]
      },
      'DELETE': {
        roles: [
          roles.administrator
        ]
      }
    }
  },
  {
    id: 'users',
    path: '/users',
    entity: 'User',
    dataValidator: './../middlewares/data.validators/user.schema',
    methods: {
      'POST': {
        roles: [
          roles.administrator
        ]
      },
      'GET': {
        roles: [
          roles.administrator,
        ]
      },
      'PATCH': {
        roles: [
          roles.administrator
        ]
      },
      'DELETE': {
        roles: [
          roles.administrator
        ]
      }
    }
  },
  {
    id: 'checklist',
    path: '/checklist',
    entity: 'Checklist',
    dataValidator: './../middlewares/data.validators/checklist.schema',
    methods: {
      'POST': {
        roles: [
          roles.authenticated,
          roles.administrator
        ]
      },
      'GET': {
        roles: [
          roles.authenticated,
          roles.administrator,
        ]
      },
      'PATCH': {
        roles: [
          roles.authenticated,
          roles.administrator
        ]
      },
      'DELETE': {
        roles: [
          roles.authenticated,
          roles.administrator
        ]
      }
    }
  },
  {
    id: 'reservations',
    path: '/reservations',
    entity: 'Reservation',
    dataValidator: './../middlewares/data.validators/reservation.schema',
    methods: {
      'POST': {
        roles: [
          roles.authenticated,
          roles.administrator
        ]
      },
      'GET': {
        roles: [
          roles.authenticated,
          roles.administrator,
        ]
      },
      'PATCH': {
        roles: [
          roles.authenticated,
          roles.administrator
        ]
      },
      'DELETE': {
        roles: [
          roles.authenticated,
          roles.administrator
        ]
      }
    }
  }
];

module.exports = {
  routes,
  roles
};