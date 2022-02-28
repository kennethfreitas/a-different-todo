import { User } from '@core/user/interfaces/User';
import { model, Schema } from 'mongoose';

const userSchema = new Schema<User>(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    penalties: {
      type: Number,
      required: true,
    },
  },
  {
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        const {_id, __v, ...obj} = ret
        return obj;
      },
    },
  }
);

export const UserModel = model<User>('users', userSchema);
