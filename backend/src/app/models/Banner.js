import 'dotenv/config';
import Sequelize, { Model } from 'sequelize';

class Banner extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/banner/${this.path}`;
          },
        },
      },
      {
        sequelize: connection,
      }
    );
    return this;
  }
}

export default Banner;
