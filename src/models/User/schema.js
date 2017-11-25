
export default `
type User {
  id: Int!
  firstName: String
  lastName: String
  email: String
  vehicles: [Vehicle]
  displayName: String
}

type ProfitableUser {
  user: User!
  spend: Int!
}

type Query {
  users: [User]
  user(id: Int!): User
  profitableUsers(top: Int = 5): [ProfitableUser]
}

type Mutation {
  deleteUser(input: DeleteUserInput!): DeleteUserPayload
}

input DeleteUserInput {
  id: Int!
}

type DeleteUserPayload {
  id: Int!
  error: String
}`
