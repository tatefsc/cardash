import data from './data'

const hydrate = (modelName, data) => {
  const model = require(`./models/${modelName}/model`).default;
  return new model(data);
}

class Database {
  constructor() {
    this.data = data
  }

  getById(modelName, id) {
    const m = this.data[modelName].find(x => x.id === id);
    return hydrate(modelName, m);
  }

  get(modelName) {
    return this.data[modelName].map(m => hydrate(modelName, m))
  }

  set(modelName, datum) {
    const models = this.data[modelName];
    const { id } = datum;
    let model = models.find(model => model.id == id);
    // create
    if (!model) {
      const lastRecord = models[models.length - 1]
      const lastId = lastRecord ? lastRecord.id : 0;
      model = Object.assign({}, datum, { id: lastId + 1 });
      this.data[modelName] = [...models, model];
    // update
    } else {
      // TODO: This is the only mutation of underlying data
      // Don't allow id overwrite
      Object.assign(model, datum, { id });
    }
    return hydrate(modelName, model);
  }

  delete(modelName, datum) {
    const data = this.data[modelName]
    this.data[modelName] = data.filter(obj => obj.id !== datum.id)
  }
}

export default new Database()
