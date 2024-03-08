import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-reposiory'
import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Get User Profile Use Case', () => {
  let userRepository: InMemoryUsersRepository
  let sut: GetUserProfileUseCase

  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'email@email.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual(createdUser.name)
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(
      sut.execute({
        userId: 'dummy-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
