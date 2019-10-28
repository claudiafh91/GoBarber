import { Op } from 'sequelize';
import { parseISO, startOfDay, endOfDay } from 'date-fns';

import Meetup from '../models/Meetup';
import Banner from '../models/Banner';
import User from '../models/User';
import Subscriptions from '../models/Subscription';

class EventsController {
  /** Retrieve all the meetup registered in the database corresponding to
   * the date specified in the query and where the user is not subscribe.
   * If no date is specified in the query, all the database meetups are returned.
   * */
  async index(req, res) {
    const { date, page = 1 } = req.query;

    const result = await Subscriptions.findAll({
      where: { id_user: req.userId },
      attributes: ['id_meetup'],
      raw: true,
    });

    let subscriptions = [];
    if (result) {
      subscriptions = result.map(elem => {
        return elem.id_meetup;
      });
    }

    let filter = {};
    if (date) {
      const parseDate = parseISO(date);
      filter = {
        datetime: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
        id: {
          [Op.notIn]: subscriptions,
        },
      };
    }

    const meetups = await Meetup.findAll({
      where: filter,
      order: ['datetime'],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: [
        'id',
        'title',
        'description',
        'location',
        'datetime',
        'happened',
      ],
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
    });
    return res.json(meetups);
  }
}

export default new EventsController();
