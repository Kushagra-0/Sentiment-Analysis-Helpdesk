export interface User extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
  }
  