import { prisma } from "@/lib/db/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import type { RegisterInput } from "@/lib/validation/auth";

export const UserService = {
  async findByEmail(email: string) { return prisma.user.findUnique({ where: { email } }); },
  async register(input: RegisterInput): Promise<void> {
    const existing = await this.findByEmail(input.email);
    if (existing) return;
    const passwordHash = await hashPassword(input.password);
    await prisma.user.create({ data: { email: input.email, name: input.fullName, passwordHash } });
  },
  async verifyCredentials(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user || !user.passwordHash || user.status !== "ACTIVE") return null;
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) return null;
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  },
};
