// models/User.js
import Adapters, { TypeORMUserModel } from 'next-auth/adapters'

export default class User extends ((Adapters.TypeORM.Models.User.model as unknown) as typeof TypeORMUserModel) {
  // You can extend the options in a model but you should not remove the base
  // properties or change the order of the built-in options on the constructor
  constructor(name: string, email: string, image: string, emailVerified: Date) {
    super(name, email, image, emailVerified)
  }
}

export const UserSchema = {
  name: 'User',
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
    // Add your own properties to the User schema
  },
}
