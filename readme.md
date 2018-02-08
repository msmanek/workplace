# Workplace

This is a wrapper for the Workplace Platform API. It has been designed to be easily used with promises. The api docs can be seen at: https://developers.facebook.com/docs/workplace/integrations/custom-integrations/reference

## Getting Started

To install the package, simply run:
```
npm install workplace --save
```
Then, simply load up the package and set the access token:
```
const WP = require('workplace');
WP.setAccessToken(<ACCESS_TOKEN_HERE>);
```
## API Reference
Once the package is set up, you can post to a group like this:
```
const groupID = <YOUR_GROUP_ID>;
const data = {
  message: 'text body of the message',
  url: 'example.com/my_photo.jpg' // optional photo url with your post
};
let response = await WP.postToGroup(groupID, data);
```

Made with <3 in London
