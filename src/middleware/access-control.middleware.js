const AccessControl = require('accesscontrol');

const grants = {
    admin: {
        users: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*'],
        }
    },
    user: {
        users: {
            'create:own': ['*'],
            'read:own': ['*'],
            'update:own': ['*'],
        }
    },
    editor: {
        users: {
            'read:own': ['*'],
            'update:own': ['*'],
        }
    }
}

const ac = new AccessControl(grants);

/**
 * 
 * @param {string} role 
 * @param {string} resource -- value: posts, users
 * @param {string} possession  -- value: own, any
 * @param {string} action  -- value: create, read, delete, update
 */
function hasAccess (req, res, next, options) {
    try {
        let permission = null;
    
        const { resource, possession, action } = options;
        const role = req?.user?.role ? req?.user?.role : '';
    
        if (possession === 'own') {
            switch(action) {
                case 'read':
                    permission = ac.can(role).readOwn(resource);
                    break;
                    
                case 'create':
                    permission = ac.can(role).createOwn(resource);
                    break;
    
                case 'update':
                    permission = ac.can(role).updateOwn(resource);
                    break;
    
                case 'delete':
                    permission = ac.can(role).deleteOwn(resource);
                    break;
            } 
    
        } else if (possession === 'any') {
            switch(action) {
                case 'read':
                    permission = ac.can(role).readAny(resource);
                    break;
                    
                case 'create':
                    permission = ac.can(role).createAny(resource);
                    break;
    
                case 'update':
                    permission = ac.can(role).updateAny(resource);
                    break;
    
                case 'delete':
                    permission = ac.can(role).deleteAny(resource);
                    break;
            } 
        }
        
        if (! permission.granted) {
            // not access
            return res.status(403).end();
        }
    
        next();
    } catch (err) {
        console.log({err})
        const error = new Error();
        error.message = 'Not Access This Content';
        error.status = 403;
        next(error);
    }

}

module.exports = hasAccess;