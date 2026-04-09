import { User } from "@/domain/user/user.entity";
import { IUserRepository } from "@/domain/user/user.repository";
import bcrypt from "bcryptjs";

export class RegisterUserUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(params: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const existing = await this.repository.findByEmail(params.email);
    if (existing) {
      throw new Error("Un compte existe déjà avec cet email");
    }

    const hashedPassword = await bcrypt.hash(params.password, 12);

    return this.repository.create({
      name: params.name,
      email: params.email,
      hashedPassword,
    });
  }
}
