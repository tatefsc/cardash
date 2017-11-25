import BaseModel from '../BaseModel'

export default class Vehicle extends BaseModel {
  static get makes() {
    return {
      Acura: ['MDX', 'RDX', 'ILX'],
      Audi: ['A4', 'Q5', 'Q7'],
      BMW: ['325', '750'],
      Ford: ['Taurus', 'F150'],
      Honda: ['CR-V', 'Accord'],
      Jaguar: ['XJ', 'XF', 'XE'],
      Jeep: ['Grand Cherokee'],
      Toyota: ['RAV4', 'Corolla', 'Camry'],
    }
  }
  static validateMakeModel(make, model) {
    if (Vehicle.makes[make] && Vehicle.makes[make].includes(model)) {
      return;
    }
    throw new Error('Invalid make / model pair');
  }

  static async isValidConfiguration(params) {
    const results = await vehicleSearch({
      vehicleId: params.vehicleId,
      engineConfigId: params.engineConfigId,
      transmissionControlTypeId: params.transmissionControlTypeId,
    })
    return results.length > 0
  }
}
