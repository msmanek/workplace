const FB = require('fb');

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
          data.hasOwnProperty('url') ? `${groupID}/photos` : `${groupID}/feed`;

        FB.api(path, 'post', data, (res) => {
          res.hasOwnProperty('error') ? reject(res.error) : resolve(res);
        });
      });
    };

    return {
      setAccessToken,
      postToGroup,
    };
  })();
  module.exports = WP;
})();
