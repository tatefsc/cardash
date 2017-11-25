
export default `
type Vehicle {
  id: Int!
  model: String
  make: String
  year: Int
}

type Query {
  vehicles: [Vehicle]
}

input VehicleInput {
  id: Int
  model: String
  make: String
  year: Int
}

type UpdatedVehicle {
  vehicle: Vehicle
}

type Mutation {
  createVehicle(input: VehicleInput!): UpdatedVehicle
  updateVehicle(input: VehicleInput!): UpdatedVehicle
}
`
