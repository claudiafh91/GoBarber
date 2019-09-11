import { Op } from 'sequelize';
import { parseISO, startOfDay, endOfDay } from 'date-fns';

import Meetup from '../models/Meetup';
import Banner from '../models/Banner';

class EventsController {
  /** Retrieve all the meetup registered in the database corresponding to
   * the date specified in the query.
   * If no date is specified in the query, all the database meetups are returned.
   * */
  async index(req, res) {
    const { date, page = 1 } = req.query;

    let filter = {};
    if (date) {
      const parseDate = parseISO(date);
      filter = {
        datetime: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      };
    }

    const meetups = await Meetup.findAll({
      where: filter,
      order: ['datetime'],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'title', 'description', 'location', 'datetime'],
      include: [
        {
          model: Banner,
          attributes: ['id', 'path'],
        },
      ],
    });
    return res.json(meetups);
  }
}

export default new EventsController();
