import Sequelize from 'sequelize';
import dbConfig from '../config/dbconfig';

import User from '../app/models/User';
import Meetup from '../app/models/Meetup';
import Banner from '../app/models/Banner';
import Subscription from '../app/models/Subscription';

const models = [User, Meetup, Banner, Subscription];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
