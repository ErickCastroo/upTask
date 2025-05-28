import { hash, genSalt, compare } from 'bcrypt'

const HashPasword = async (password: string) => {
  const salt = await genSalt(10)
  return await hash(password, salt)
}

export { HashPasword }

const cheackPassword = async (password: string, hash: string) => {
  return await compare(password, hash)
}

export { cheackPassword }