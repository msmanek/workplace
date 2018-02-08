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

    const postToGroup = async function postToGroup(groupID, data) {
      return new Promise((resolve, reject) => {
        const path = `${groupID}/feed`;
        FB.api(path, 'post', {
          message: data.message,
        }, (res) => {
          if (res.error) {
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
    };
  })();
  module.exports = WP;
})();
