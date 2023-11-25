import NextAuth from "next-auth"
import Options from '@app/_config/authOptions'

const handler = NextAuth(Options);

export {handler as GET, handler as POST}