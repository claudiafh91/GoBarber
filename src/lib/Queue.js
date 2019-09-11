import Bee from 'bee-queue';
import SubscriptionEmail from '../app/jobs/subscriptionsEmail';
import RedisConfig from '../config/redisconfig';

const jobs = [SubscriptionEmail];

class Queue {
  constructor() {
    this.queue = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queue[key] = {
        bee: new Bee(key, {
          redis: RedisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queue[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queue[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    // eslint-disable-next-line no-console
    console.log(`Queue ${job.queue.name}: Failed`, err);
  }
}

export default new Queue();
