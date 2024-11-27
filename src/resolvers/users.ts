import { authenticateUser, generateToken } from "../utils/auth";

export const userResolvers = {
  Mutation: {
    login: async (parent: any, args: { email: string; password: string }) => {
      const user = await authenticateUser(args.email, args.password);
      const token = generateToken({ id: user.id, role: user.role });

      return {
        token,
        user: { id: user.id, email: user.email, role: user.role },
      };
    },
  },
};
