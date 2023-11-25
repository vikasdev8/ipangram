import { NextAuthOptions, } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from 'zod';
import User from '@app/api/user/schema';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } from '@app/_config/const'
import DB from '@app/_config/database'
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "tradingDocs",
            credentials: {
                emailOrmobile: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials, req) {
                DB()

                    const user = await User.findOne({ email: credentials?.emailOrmobile });
                    console.log(user)
                if (!user) {
                    return null
                }
                return user
            },
        }),
        Google({
            clientId:GOOGLE_CLIENT_ID!,
            clientSecret:GOOGLE_CLIENT_SECRET!
        })
    ],
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: NEXTAUTH_SECRET,
    }
}



export default authOptions