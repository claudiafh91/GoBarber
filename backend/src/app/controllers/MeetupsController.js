import * as Yup from 'yup';
import { parseISO, isBefore } from 'date-fns';

import Meetup from '../models/Meetup';
import Banner from '../models/Banner';

class MeetupsController {
  /** Returns the meetup of which the logged-in user is an organizer */
  async index(req, res) {
    const { page = 1 } = req.query;

    const meetups = await Meetup.findAll({
      where: { id_user: req.userId },
      order: ['datetime'],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'title', 'description', 'location', 'datetime', 'happened'],
      include: [
        {
          model: Banner,
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(meetups);
  }

  /** Register a new meetup in the database.
   * Returns the meetup data */
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      datetime: Yup.date().required(),
      bannerId: Yup.number().required(),
    });

    const isValid = await schema.isValid(req.body);

    if (!isValid) {
      return res.status(400).json({ error: 'Validation invalid' });
    }

    const { title, description, location, datetime, bannerId } = req.body;

    const date = parseISO(datetime);

    // Check if the date specified by the user is not earlier than the current date.
    if (isBefore(date, new Date())) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const meetup = await Meetup.create({
      title,
      description,
      location,
      datetime,
      id_user: req.userId,
      id_banner: bannerId,
    });
    return res.json(meetup);
  }

  /** Update the data of a meetup registered in the database. */
  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      datetime: Yup.date(),
      bannerId: Yup.number(),
    });

    const isValid = await schema.isValid(req.body);

    if (!isValid) {
      return res.status(400).json({ error: 'Validation invalid' });
    }

    const meetup = await Meetup.findByPk(req.params.id);

    // Check if the user requesting the update (logged-in user)
    // is the organizer of the meetup.
    if (meetup.id_user !== req.userId) {
      return res.status(401).json({
        error: 'You dont have permission to update this meetup',
      });
    }

    // Check if the meetup has already happened,
    // its date is before the current date.
    if (meetup.happened) {
      return res.status(400).json({
        error: 'You can not update this meetup.',
      });
    }

    // Check if you want to update the date
    // that it is not earlier than the current date.
    if (
      req.body.datetime &&
      isBefore(parseISO(req.body.datetime), new Date())
    ) {
      return res.status(400).json({ error: 'Meetup date invalid' });
    }

    const updateMeetup = await meetup.update(req.body);

    return res.json(updateMeetup);
  }

  /** Remove a meetup from the database. */
  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    // Check if the user requesting the delete (logged-in user)
    // is the organizer of the meetup.
    if (meetup.id_user !== req.userId) {
      return res.status(401).json({
        error: 'You dont have permission to cancel this meetup',
      });
    }

    // Check if the meetup has already happened,
    // its date is before the current date.
    if (meetup.happened) {
      return res.status(400).json({
        error: 'You can not canceled this meetup.',
      });
    }

    await meetup.destroy();
    return res.send();
  }
}

export default new MeetupsController();
