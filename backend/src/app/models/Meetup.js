import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Meetup extends Model {
  static init(connection) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        datetime: Sequelize.DATE,
        happened: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.datetime, new Date());
          },
        },
      },
      {
        sequelize: connection,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user' });
    this.belongsTo(models.Banner, { foreignKey: 'id_banner' });
  }
}

export default Meetup;
