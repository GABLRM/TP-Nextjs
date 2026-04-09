import { User } from "@/domain/user/user.entity";
import { IUserRepository } from "@/domain/user/user.repository";

export class FindUserByEmailUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }
}
