'use server';

import { connectDB } from '@/app/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const register = async (values: any) => {
  const { name, email, password } = values;

  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        error: 'Email already exists!',
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
  } catch (error) {
    console.log(error);
  }
};
