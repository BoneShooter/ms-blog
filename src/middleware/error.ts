import * as Boom from '@hapi/boom';
import { Context } from 'koa';

export default async (ctx: Context, next: any) => {
    try {
        await next();
    } catch (error) {
        const boomErr = error.isBoom ? error : new Boom(error);
        const { statusCode, headers, payload } = boomErr.output;
        ctx.status = statusCode;
        ctx.set(headers);
        ctx.body = {
            code: payload.statusCode,
            message: payload.error
        };
        console.error(boomErr);
    }
};
