export type UserRole = "user" | "admin";

export class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly hashedPassword: string;
  readonly role: UserRole;
  readonly createdAt: Date;

  constructor(params: {
    id: string;
    name: string;
    email: string;
    hashedPassword: string;
    role: UserRole;
    createdAt: Date;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.hashedPassword = params.hashedPassword;
    this.role = params.role;
    this.createdAt = params.createdAt;
  }

  isAdmin(): boolean {
    return this.role === "admin";
  }
}
