(() => {
  var WP = (() => {
    const FB = require('fb');

    /*
    *  Initialize the workplace API as a wrapper on the request package
    *
    *  @param access_token: the bearer auth token for the API
    */
    var setAccessToken = (access_token) => {
      FB.setAccessToken(access_token);
    }

    var postToGroup = (group_id, data, callback) => {
      callback = callback || () => {};
      FB.api(group_id + '/feed', 'post', {
        message: data.message,
      }, callback);
    }

    return {
      setAccessToken: setAccessToken,
      postToGroup: postToGroup,
    }){};
  };
  module.exports = WP;
})();
