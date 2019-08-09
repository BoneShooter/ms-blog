import Boom = require('@hapi/boom');
import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import { healthRoutes } from './health/health.api';
import { userRouters } from './user/user.api';

const router = new Router();
router.use(healthRoutes);
router.use(userRouters);

export default compose([
    router.routes(),
    router.allowedMethods({
        throw: true,
        notImplemented: () => Boom.notImplemented(),
        methodNotAllowed: () => Boom.methodNotAllowed()
    })
]);
