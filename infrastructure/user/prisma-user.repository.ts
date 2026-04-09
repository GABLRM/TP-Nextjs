import { User, UserRole } from "@/domain/user/user.entity";
import { IUserRepository } from "@/domain/user/user.repository";
import { prisma } from "@/lib/prisma";

type RawUser = {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  role: string;
  createdAt: Date;
};

function mapToEntity(raw: RawUser): User {
  return new User({
    id: raw.id,
    name: raw.name ?? "",
    email: raw.email,
    hashedPassword: raw.password ?? "",
    role: (raw.role as UserRole) ?? "user",
    createdAt: raw.createdAt,
  });
}

export class PrismaUserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    const rows = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
    return rows.map(mapToEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = await prisma.user.findUnique({ where: { email } });
    return row ? mapToEntity(row) : null;
  }

  async create(params: {
    name: string;
    email: string;
    hashedPassword: string;
  }): Promise<User> {
    const row = await prisma.user.create({
      data: {
        name: params.name,
        email: params.email,
        password: params.hashedPassword,
      },
    });
    return mapToEntity(row);
  }
}
