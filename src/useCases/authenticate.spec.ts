import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-reposiory'
import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  let userRepository: InMemoryUsersRepository
  let sut: AuthenticateUseCase

  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('it be able authenticate', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'email@email.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'email@email.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to athenticate with wrong email', async () => {
    expect(
      sut.execute({
        email: 'invalid@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to athenticate with wrong password', async () => {
    expect(
      sut.execute({
        email: 'email@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
