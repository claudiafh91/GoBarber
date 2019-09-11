import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SubscriptionEmail {
  get key() {
    return 'subscriptionsEmail';
  }

  async handle({ data }) {
    const { meetup, user, subscription } = data;

    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: 'Novo inscrição',
      template: 'subscription',
      context: {
        organizer: meetup.User.name,
        name: meetup.title,
        user: user.name,
        email: user.email,
        date: format(
          parseISO(subscription.createdAt),
          "dd 'de' MMMM', das' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new SubscriptionEmail();
