import Model from './model'
import { Resolvers, } from '../../utils'
import db from '../../db'
import _ from 'lodash'


export default {
  Query: {
    user: Resolvers.Query.find(Model),
    users: Resolvers.Query.list(Model),
    profitableUsers: (unusedFirstParameter, args, context) => {
      const users = db.get('User');
      const vehicles = db.get('Vehicle');
      const orders = db.get('Order');
      const orderMap = _.zipObject(orders.map(o => o.id), orders);
      const vehicleMap = _.zipObject(vehicles.map(v => v.id), vehicles);
      const ordersForUser = _.groupBy(orders, o =>
        vehicleMap[orderMap[o.id].vehicleId].userId
      );

      const usersWithSpend = users.map(user => ({
        user,
        spend: _.sumBy(ordersForUser[user.id], o => o.price)
      }));

      return _.sortBy(usersWithSpend, u => u.spend)
        .reverse()
        .slice(0, args.top);
    }
  },
  Mutation: {
    deleteUser: Resolvers.Mutation.delete(Model),
  },
  User: {
    vehicles: (obj, args, context) => {
      return db.get('Vehicle').filter(vehicle => vehicle.userId === obj.id)
    },
    displayName: (obj, args, context) => {
      return `${obj.firstName} ${obj.lastName[0]}.`;
    }
  },
}
