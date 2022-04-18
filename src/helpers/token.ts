import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const privateKey = process.env.JWT_SECRET;
export const generateToken = (userId: number): string => {
  return jwt.sign(
    {
      userId: userId,
    },
    privateKey,
  );
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, privateKey) as { userId: string };
};
