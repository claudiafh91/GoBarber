import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import Banner from '../models/Banner';
import Subscription from '../models/Subscription';
import User from '../models/User';

import Queue from '../../lib/Queue';
import SubscriptionEmail from '../jobs/subscriptionsEmail';

class SubscriptionsController {
  async index(req, res) {
    const suscriptions = await Subscription.findAll({
      where: { id_user: req.userId },
      include: [
        {
          model: Meetup,
          order: ['datetime'],
          where: {
            datetime: {
              [Op.gt]: new Date(),
            },
          },
          include: [
            {
              model: Banner,
              attributes: ['id', 'path', 'url'],
            },
            {
              model: User,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
    return res.json(suscriptions);
  }

  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    if (meetup.id_user === req.userId) {
      return res.status(401).json({
        error:
          'You can not subscribe to this meetup. The user is the organizer of the meetup .',
      });
    }

    if (meetup.happened) {
      return res.status(400).json({
        error: 'This meetup have already happened. You can not subscribe.',
      });
    }

    const sameDate = await Subscription.findOne({
      where: {
        id_user: req.userId,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            datetime: meetup.datetime,
          },
        },
      ],
    });

    if (sameDate) {
      return res.status(400).json({
        error:
          'You can not subscribe. Date match with another meetup or you are already subscribed.',
      });
    }

    const subscription = await Subscription.create({
      id_user: req.userId,
      id_meetup: meetup.id,
    });

    const user = await User.findByPk(req.userId);

    await Queue.add(SubscriptionEmail.key, {
      user,
      meetup,
      subscription,
    });

    return res.json(subscription);
  }

  /** Remove a subscription from the database. */
  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    // Check if the user requesting the delete (logged-in user)
    // is the organizer of the meetup.
    if (subscription.id_user !== req.userId) {
      return res.status(401).json({
        error: 'You dont have permission to cancel this subscription',
      });
    }

    await subscription.destroy();
    return res.send();
  }
}

export default new SubscriptionsController();
