import db from '../../db'

export const Resolvers = {
  Query: {
    find: (Model) => (unusedFirstParameter, args, context) => {
      return db.getById(Model.name, args.id);
    },
    list: (Model) => (unusedFirstParameter, args, context) => {
      return db.get(Model.name)
    },
  },
  Mutation: {
    set: (Model) => (unusedFirstParameter, args) => {
      const { input, } = args
      return {
        [Model.name.toLowerCase()]: db.set(Model.name, input)
      };
    },
    delete: (Model) => (unusedFirstParameter, args) => {
      const { input, } = args
      db.delete(Model.name, input)
      return {
        id: input.id,
      }
    }
  }
}
