import { PlainObject } from '../../interface/object';
import { AesDecrypt, AesEncrypt } from '../../util/crypto/crypto-aes';
import { UUID } from '../../util/uuid';
import { IUser, User, UserModel } from './user.schema';

function findOneById(id: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await UserModel.findOne({ id });
            if (doc) {
                resolve(doc.getInstance());
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
}

function findOneByPhone(phone: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await UserModel.findOne({ phone });
            if (doc) {
                const userInstance = doc.getInstance();
                resolve(userInstance);
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
}

function create(user: IUser): Promise<User> {
    return new Promise(async (resolve, reject) => {
        try {
            user.id = UUID();
            user.password = AesEncrypt(user.password);
            const doc = await UserModel.create(user);
            const userInstance = doc.getInstance();
            resolve(userInstance);
        } catch (e) {
            reject(e);
        }
    });
}

function checkOneByPhoneAndPassword(phone: string, password: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await UserModel.findOne({ phone });
            let result: boolean = false;
            if (doc) {
                const decryptPassword = AesDecrypt(doc.password);
                if (password === decryptPassword) {
                    result = true;
                }
            }
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

function deleteOneById(id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            await UserModel.deleteOne({ id });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}

function findByParams(params: PlainObject): Promise<User[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const docParams: PlainObject = {};
            if (params.phone) {
                const phoneQueryReg = new RegExp(params.phone, 'i');
                docParams.phone = {
                    $regex: phoneQueryReg
                };
            }
            let query = UserModel.find(docParams);
            if (typeof params.page === 'number' && typeof params.size === 'number' && params.page >= 1 && params.size >= 0) {
                query = query.skip((params.page - 1) * params.size);
                query = query.limit(params.size);
            }
            query = query.sort({ createTime: -1 });
            const docList = await query.exec();
            const userList = docList.map((doc) => {
                return doc.getInstance();
            });
            resolve(userList);
        } catch (e) {
            reject(e);
        }
    });
}

function countByParams(params: PlainObject): Promise<number> {
    return new Promise(async (resolve, reject) => {
        try {
            const docParams: PlainObject = {};
            if (params.phone) {
                const phoneQueryReg = new RegExp(params.phone, 'i');
                docParams.phone = {
                    $regex: phoneQueryReg
                };
            }
            const query = UserModel.count(docParams);
            const count = await query.exec();
            resolve(count);
        } catch (e) {
            reject(e);
        }
    });
}

export { countByParams, create, deleteOneById, findByParams, findOneById, findOneByPhone, checkOneByPhoneAndPassword };
