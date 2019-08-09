import * as mongoose from 'mongoose';

function UUID(): string {
    return new mongoose.Types.ObjectId().toHexString();
}

export { UUID };
