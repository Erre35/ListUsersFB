import { UserRepository } from "../../domain/interfaces/repositories/userRepository";
import { User } from "../../domain/entities/user";
import { db } from "../datasources/firestore";
import { FirestoreUser } from "../models/firestoreUser";

export class UserRepositoryImpl implements UserRepository {
  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const docRef = await db.collection('users').add(this.toFirestore(user));
    return { id: docRef.id, ...user };
  }

  async getUsers(): Promise<User[]> {
    const users = await db.collection('users').get();
    return users.docs.map(doc => this.fromFirestore(doc));
  }

  async getUserById(id: string): Promise<User | null> {
    const doc = await db.collection('users').doc(id).get();
    console.log('doc', doc.exists());
    return doc.exists() ? this.fromFirestore(doc) : null;
  }

  private toFirestore(user: Omit<User, 'id'>): FirestoreUser {
    return {
      name: user.name,
      email: user.email,
      address: user.address,
      city: user.city,
      company: user.company,
      phone: user.phone
    };
  }

  private fromFirestore(doc: any): User {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      email: data.email,
      address: data.address,
      city: data.city,
      company: data.company,
      phone: data.phone
    };
  }
}