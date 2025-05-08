import mongoose, { model } from 'mongoose';

export interface UserDocument {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  udatedAt: Date;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is invalid'],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || model<UserDocument>('User', UserSchema);

export default User;
