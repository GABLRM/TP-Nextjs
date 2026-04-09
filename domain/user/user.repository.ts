import { User } from "./user.entity";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  create(params: { name: string; email: string; hashedPassword: string }): Promise<User>;
}
