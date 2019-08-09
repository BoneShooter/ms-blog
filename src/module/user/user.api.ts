import { Context } from 'koa';
import * as Router from 'koa-router';
import { AjaxPaginationResult, AjaxResult, AjaxResultError } from '../../util/ajax-result';
import { checkOneByPhoneAndPassword, countByParams, create, deleteOneById, findByParams, findOneById, findOneByPhone } from './user.service';

const router = new Router({
    prefix: `/user`
});

/**
 * 创建用户
 * @params phone:string
 * @params password:string
 * @params createTime?:number
 * @params createUserId?:string
 * @params updateTime?:number
 * @params updateUserId?:string
 * @return createUser:User
 */
router.post('/create.json', async (ctx: Context) => {
    const params = ctx.request.body;
    const user = {
        phone: params.phone,
        password: params.password,
        createTime: params.createTime,
        createUserId: params.createUserId,
        updateTime: params.updateTime,
        updateUserId: params.updateUserId
    };
    const u = await findOneByPhone(user.phone);
    if (u) {
        ctx.body = AjaxResultError(500, '该手机号已被注册');
    } else {
        const createUser = await create(user);
        ctx.body = AjaxResult(createUser);
    }
});

/**
 * 查询用户详情
 * @params id:string
 * @return u:User
 */
router.post('/detail.json', async (ctx: Context) => {
    const params = ctx.request.body;
    const userId = params.id;
    const u = await findOneById(userId);
    if (!u) {
        ctx.body = AjaxResultError(500, '用户不存在');
    } else {
        ctx.body = AjaxResult(u);
    }
});

/**
 * 查询用户的手机号与密码是否匹配
 * @params phone:string
 * @params password:string
 * @return result:boolean
 */
router.post('/check.json', async (ctx: Context) => {
    const params = ctx.request.body;
    const phone = params.phone;
    const password = params.password;
    const result = await checkOneByPhoneAndPassword(phone, password);
    ctx.body = AjaxResult(result);
});

/**
 * 分页查询用户列表
 * @params phone:string
 * @params page:number
 * @params size:number
 * @return userList:PaginationResult
 */
router.post('/list.json', async (ctx: Context) => {
    const params = ctx.request.body;
    const queryParams = {
        phone: params.phone || undefined,
        page: params.page || 1,
        size: params.size || -1
    };
    const list = await findByParams(queryParams);
    const total = await countByParams(queryParams);
    ctx.body = AjaxPaginationResult(queryParams.page, queryParams.size, total, list);
});

/**
 * 删除用户
 * @params id:string
 * @return
 */
router.post('/delete.json', async (ctx: Context) => {
    const params = ctx.request.body;
    const userId = params.id;
    const u = await findOneById(userId);
    if (!u) {
        ctx.body = AjaxResultError(500, '用户不存在');
    } else {
        await deleteOneById(userId);
        ctx.body = AjaxResult();
    }
});

export const userRouters = router.routes();
