import { User } from "../../entities/user";

export interface UserRepository {
  createUser(user: Omit<User, 'id'>): Promise<User>;
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
}