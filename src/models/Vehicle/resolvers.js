import db from '../../db'
import Model from './model'
import { Resolvers, } from '../../utils'

export default {
  Query: {
    vehicles: Resolvers.Query.list(Model),
  },
  Mutation: {
    createVehicle: (unusedFirstParameter, args) => {
      Model.validateMakeModel(args.input.make, args.input.model);
      return Resolvers.Mutation.set(Model)(unusedFirstParameter, args);
    },
    updateVehicle: (unusedFirstParameter, args) => {
      Model.validateMakeModel(args.input.make, args.input.model);
      return Resolvers.Mutation.set(Model)(unusedFirstParameter, args);
    }
  },
}
