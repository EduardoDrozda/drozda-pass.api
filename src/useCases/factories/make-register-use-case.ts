import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repostiory'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase(): RegisterUseCase {
  const usersRepository = new PrismaUsersRepository()
  return new RegisterUseCase(usersRepository)
}
