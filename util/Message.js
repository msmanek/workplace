const MessageTypes = require('./MessageTypes.js');

const media = (mediaType, mediaReference) => {
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
};

module.exports = {
  Image: imageReference => media(MessageTypes.IMAGE, imageReference),
  Video: videoReference => media(MessageTypes.VIDEO, videoReference),
  Audio: audioReference => media(MessageTypes.AUDIO, audioReference),
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
