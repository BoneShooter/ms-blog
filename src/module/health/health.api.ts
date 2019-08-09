import { Context } from 'koa';
import * as Router from 'koa-router';

const router = new Router({
    prefix: `/health`
});

router.get('/check.json', (ctx: Context) => {
    ctx.body = {
        code: 200
    };
});

export const healthRoutes = router.routes();
