const MessageTypes = require('../util/MessageTypes.js');

module.exports = {
  getRecipientPayloadObject: (recipient) => {
    if (typeof recipient === 'string' && recipient.indexOf('@') !== -1) {
      // naive check if it is an email
      return {
        email: recipient,
      };
    } else if (recipient.constructor === Array) {
      return {
        ids: recipient,
      };
    }
    return {
      id: recipient,
    };
  },
  getMessagePayloadObject: (message) => {
    const messagePayload = {
      message: {
        attachment: {
          type: message.type,
          payload: {},
        },
      },
    };
    switch (message.type) {
      case MessageTypes.IMAGE:
      case MessageTypes.VIDEO:
      case MessageTypes.AUDIO:
        if (message.isLocal) {
          messagePayload.filedata = message.filedata;
        } else {
          messagePayload.message.attachment.payload.url = message.url;
        }
        break;
      case MessageTypes.TEMPLATE:
        messagePayload.message.attachment.payload = message.payload;
        break;
      case MessageTypes.TEXT:
        return {
          message: {
            text: message.text,
          },
        };
      default:
        return null;
    }
    return messagePayload;
  },
};
