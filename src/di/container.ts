import { UserRepositoryImpl } from "../data/repositories/userRepositoryImpl";
import { UserUseCases } from "../domain/usecases/userUseCases";
import { UserRepository } from "../domain/interfaces/repositories/userRepository";

class Container {
  private static instance: Container;
  private userRepository: UserRepository;
  private userUseCases: UserUseCases;

  private constructor() {
    this.userRepository = new UserRepositoryImpl();
    this.userUseCases = new UserUseCases(this.userRepository);
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  public getUserUseCases(): UserUseCases {
    return this.userUseCases;
  }
}

export const container = Container.getInstance();