import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    password: String,
    createTime: Number,
    createUserId: String,
    updateTime: Number,
    updateUserId: String
});

interface IUser {
    id?: any;
    phone: string;
    password: string;
    createTime: number;
    createUserId: string;
    updateTime: number;
    updateUserId: string;
}

interface IUserModel extends IUser, mongoose.Document {
    getInstance: () => User;
}

class User {
    id?: string;
    phone: string;
    password: string;
    createTime: number;
    createUserId: string;
    updateTime: number;
    updateUserId: string;
    constructor(doc?: IUserModel) {
        this.id = doc.id;
        this.phone = doc.phone; // 不返回password
        this.createTime = doc.createTime;
        this.createUserId = doc.createUserId;
        this.updateTime = doc.updateTime;
        this.updateUserId = doc.updateUserId;
    }
}

UserSchema.methods.getInstance = function() {
    const user = new User(this);
    return user;
};

/**
 * 如果设置第三个参数user，数据库会创建一个叫 user 的集合；如果不设置，会创建一个叫 users 的集合
 * 解释：https://mongoosedoc.top/docs/models.html
 * 第一个参数是跟 model 对应的集合（ collection ）名字的 单数 形式
 * Mongoose 会自动找到名称是 model 名字 复数 形式的 collection
 * 对于user这个model来说，就对应数据库中 users 这个 collection
 */
const UserModel = mongoose.model<IUserModel>('user', UserSchema, 'user');

export { IUser, User, IUserModel, UserModel };
