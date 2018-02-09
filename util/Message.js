const MessageTypes = require('./MessageTypes.js');

module.exports = {
  Media: (mediaType, mediaReference) => {
    if (
      mediaType !== MessageTypes.IMAGE
      && mediaType !== MessageTypes.VIDEO
      && mediaType !== MessageTypes.AUDIO
    ) {
      return null;
    }
    const message = {
      type: mediaType,
      isLocal: typeof mediaReference !== 'string',
    };
    if (message.isLocal) {
      message.filedata = mediaReference;
    } else {
      message.url = mediaReference;
    }
    return message;
  },
  Text: (text, isMarkdown = false) => ({
    type: MessageTypes.TEXT,
    text,
    isMarkdown,
  }),
  Template: payload => ({
    type: MessageTypes.TEMPLATE,
    payload,
  }),
};
