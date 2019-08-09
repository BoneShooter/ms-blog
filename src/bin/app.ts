import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as logger from 'koa-logger';
import { port } from '../conf';
import { connect } from '../db/mongodb';
import errorHandler from '../middleware/error';
import businessRoutes from '../module';

const app = new Koa();

// 允许代理模式
app.proxy = true;

// log
app.use(logger());

// 异常处理
app.use(errorHandler);

app.use(
    koaBody({
        textLimit: '1mb',
        jsonLimit: '1mb',
        formLimit: '1mb'
    })
);

// 业务模块
app.use(businessRoutes);

connect().then(() => {
    app.listen(port).addListener('listening', () => {
        console.log('server is started on port: ' + port);
    });
}).catch((e) => {
    console.error(`服务启动失败:${e.message}`);
});
