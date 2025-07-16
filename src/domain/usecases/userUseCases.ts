import { UserRepository } from "../interfaces/repositories/userRepository";
import { User } from "../entities/user";

export class UserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    return this.userRepository.createUser(userData);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async getUserDetails(userId: string): Promise<User | null> {
    return this.userRepository.getUserById(userId);
  }
}