import { User } from "@/domain/user/user.entity";
import { IUserRepository } from "@/domain/user/user.repository";

export class GetAllUsersUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.repository.findAll();
  }
}
