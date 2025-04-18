import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    _id?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    role?: string;
  }
}