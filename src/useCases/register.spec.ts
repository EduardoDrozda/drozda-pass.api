import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-reposiory'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register User Case', () => {
  let userRepository: InMemoryUsersRepository
  let sut: RegisterUseCase

  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(userRepository)
  })

  it('it should be able to register a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'email@email.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'email@email.com',
      password: '123456',
    })

    const isPasswordCorrect = await compare('123456', user.passwordHash)

    expect(isPasswordCorrect).toBeTruthy()
  })

  it('should not allow two users with the same email', async () => {
    const email = 'email@email.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
