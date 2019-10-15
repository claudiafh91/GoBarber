module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('subscriptions', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
        },
        id_user: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        id_meetup: {
          type: Sequelize.INTEGER,
          references: { model: 'meetups', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      })
      .then(() => {
        return queryInterface.addConstraint(
          'subscriptions',
          ['id_user', 'id_meetup'],
          {
            type: 'primary key',
            name: 'subscription_pkey',
          }
        );
      });
  },

  down: queryInterface => {
    return queryInterface.dropTable('subscriptions');
  },
};
