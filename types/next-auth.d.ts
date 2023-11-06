import { access } from 'fs';
import NextAuth from 'next-auth'


declare module 'next-auth' {
    interface Session {
    user:{
        username:string;
        email:string;
        role:string;
        accessToken:string;
        refreshToken:string;
    }
}
}
// if want to make changes in the session user object than do it here