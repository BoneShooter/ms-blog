import * as mongoose from 'mongoose';

export function connect() {
    const mongoDbUrl = 'mongodb://127.0.0.1:8001,127.0.0.1:8002,127.0.0.1:8003/db1?replicaSet=rstest';
    const maxConnectNum = 5; // 最大connect重试次数
    let connectInterval = null;
    let connectNum = 0;
    return new Promise((resolve, reject) => {
        function connectMongodb() {
            connectNum++;
            if (connectNum > maxConnectNum) {
                clearInterval(connectInterval);
                reject(`数据连接失败`);
                return;
            }
            mongoose.connect(mongoDbUrl, {
                useNewUrlParser: true,
                keepAlive: true
            });
        }

        mongoose.connection.on('connected', () => {
            console.log(`Mongoose connection success`);
            if (connectInterval) {
                clearInterval(connectInterval);
                connectInterval = null;
            }
            resolve();
        });

        mongoose.connection.on('error', () => {
            console.log(`Mongoose connection error`);
            if (!connectInterval) {
                connectNum = 0;
                connectInterval = setInterval(connectMongodb, 2000);
            }
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection disconnected');
            if (!connectInterval) {
                connectNum = 0;
                connectInterval = setInterval(connectMongodb, 2000);
            }
        });

        connectMongodb();
    });
}
