import NextAuth from "next-auth";
import { authConfig } from "@/server/auth/config";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { GET, POST } = NextAuth(authConfig);

export { GET, POST };
