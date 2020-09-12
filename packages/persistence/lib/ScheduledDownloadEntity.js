const { v4: generateUniqueId } = require('uuid');

class ScheduledDownloadEntity {
  constructor() {
    this.id = generateUniqueId();
    this.animeName = null;
    this.scheduledTime = null;
    this.isDone = null;
  }

  setId(id) {
    this.id = id;
    return this;
  }

  setAnimeName(animeName) {
    this.animeName = animeName;
    return this;
  }

  setScheduledTime(scheduledTime) {
    this.scheduledTime = scheduledTime;
    return this;
  }

  setIsDone(isDone) {
    this.isDone = isDone;
    return this;
  }

  build() {
    return {
      id: this.id,
      animeName: this.animeName,
      scheduledTime: this.scheduledTime,
      isDone: this.isDone,
    };
  }
}

module.exports = ScheduledDownloadEntity;