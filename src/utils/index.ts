import { hash, genSalt } from 'bcrypt'

const HashPasword = async (password: string) => {
  const salt = await genSalt(10)
  return await hash(password, salt)
}

export { HashPasword }