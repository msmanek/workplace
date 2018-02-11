const MessageTypes = require('./MessageTypes.js');
const fs = require('fs');

/*
*  Base media message wrapper that is private and only locally consumed
*/
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

/*
*  This returns message wrappers that can be passed to the sendMessage function.
*  The key goal here is to abstract as much of the logic of constructing a
*  message payload as possible. So, the user does not need to worry about how
*  to handle different types of messages.
*/
module.exports = {
  Image: imageURL => media(MessageTypes.IMAGE, imageURL),
  LocalImage: imagePath => media(MessageTypes.IMAGE, fs.createReadStream(imagePath)),
  Video: videoURL => media(MessageTypes.VIDEO, videoURL),
  LocalVideo: videoPath => media(MessageTypes.VIDEO, fs.createReadStream(videoPath)),
  Audio: audioURL => media(MessageTypes.AUDIO, audioURL),
  LocalAudio: audioPath => media(MessageTypes.AUDIO, fs.createReadStream(audioPath)),
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
