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

    const postToGroup = (groupID, data, callback) => {
      const safeCallback = callback || function () {};
      const path = `${groupID}/feed`;
      FB.api(path, 'post', {
        message: data.message,
      }, safeCallback);
    };

    return {
      setAccessToken,
      postToGroup,
    };
  })();
  module.exports = WP;
})();
