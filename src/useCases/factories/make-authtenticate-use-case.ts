import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repostiory'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new AuthenticateUseCase(usersRepository)
}
