import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repostiory'
import { AuthenticateUseCase } from '@/useCases/authenticate'
import { InvalidCredentialsError } from '@/useCases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

    await authenticateUseCase.execute({
      email,
      password,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
