const { CronJob } = require('cron');

class Scheduler {
  static stopJob(jobInstance) {
    jobInstance.stop();
  }

  static startJob(jobInstance) {
    jobInstance.start();
  }

  static overrideTime(jobInstance, time) {
    jobInstance.setTime(time);
  }

  constructor() {
    this.time = null;
    this.handler = () => {};
    this.onComplete = () => {};
    this.start = true;
  }

  setTime(time) {
    this.time = time;
    return this;
  }

  setHandler(handler) {
    this.handler = handler;
    return this;
  }

  setOnComplete(onComplete) {
    this.onComplete = onComplete;
    return this;
  }

  startByDefault(start) {
    this.start = start;
    return this;
  }

  trigger() {
    return new CronJob(
        this.time,
        this.handler,
        this.onComplete,
        this.start
    );
  }
}

module.exports = Scheduler;