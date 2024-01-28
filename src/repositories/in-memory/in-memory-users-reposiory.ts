import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    return user || null
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'mock id',
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(user)

    return user
  }
}
