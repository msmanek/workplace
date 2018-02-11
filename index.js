const FB = require('fb');
const Message = require('./util/Message.js');
const MessageTypes = require('./util/MessageTypes.js');
const SendMessageHelpers = require('./helpers/SendMessage.js');

(() => {
  const WP = (() => {
    /*
    *  Initialize the workplace API as a wrapper on the request package
    *
    *  @param accessToken: the bearer auth token for the API
    */
    const setAccessToken = (accessToken) => {
      FB.setAccessToken(accessToken);
    };

    /*
    *  Posts something to a group as a bot user. To do this, your API token must
    *  have the "Manage group content" permission.
    *
    *  @param groupID: The fbid of the group that you would like to post to.
    *                  Typically, you can find it by going to the group on
    *                  Workplace and looking at the url - groups/<groupID>
    *  @param data: Data is an object that contains information on what is to be
    *               posted to workplace.
    *  @param data.url: The url of the photo that is to be posted
    *  @param data.message: The body of the post to the group in a string.
    */
    const postToGroup = async function postToGroup(groupID, data) {
      return new Promise((resolve, reject) => {
        const path =
          Object.prototype.hasOwnProperty.call(data, 'url') ? `${groupID}/photos` : `${groupID}/feed`;

        FB.api(path, 'post', data, (res) => {
          if (Object.prototype.hasOwnProperty.call(res, 'error')) {
            reject(res.error);
          } else {
            resolve(res);
          }
        });
      });
    };

    const sendMessage = async function sendMessage(recipient, message) {
      return new Promise((resolve, reject) => {
        const messagePayload =
          SendMessageHelpers.getMessagePayloadObject(message);
        messagePayload.recipient =
          SendMessageHelpers.getRecipientPayloadObject(recipient);

        const path = '/me/messages';

        FB.api(path, 'post', messagePayload, (res) => {
          if (Object.prototype.hasOwnProperty.call(res, 'error')) {
            reject(res.error);
          } else {
            resolve(res);
          }
        });
      });
    };


    return {
      setAccessToken,
      postToGroup,
      sendMessage,
      MessageTypes,
      Message,
      api: FB.api,
    };
  })();
  module.exports = WP;
})();
