import { NextAuthOptions, User, } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import EmplyeeModel from '@app/_model/employee.model';
import { NEXTAUTH_SECRET } from '@app/_config/const'
import DB from '@app/_config/database'
import { compareSync } from "bcrypt";
import { z } from "zod";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "./mongodbAdapter";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "tradingDocs",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            type:"credentials",
            async authorize(credentials, req) {
                DB()
                const result = z.object({
                    email: z.string().email({ message: "Invalid email" }),
                    password: z.string()
                })
                    .required()
                    .safeParse(credentials)

                if (!result.success) {
                    throw new Error("Email or Password may be incorrect! pls try again to login")
                }

                const employee = await EmplyeeModel.findOne({ email: credentials?.email }).select("+password");

                if (!employee) {
                    throw new Error("Email or Password may be incorrect! pls try again to login")
                }

                const compare = compareSync(credentials?.password!, employee.password)

                if (!compare) {
                    throw new Error("Email or Password may be incorrect! pls try again to login")
                }
                return {
                    role: employee.role,
                    name: employee.name,
                    email: employee.email,
                    id: employee._id,
                    department: employee.department
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: NEXTAUTH_SECRET,
    }
}



export default authOptions