# Workplace

This is a wrapper for the Workplace Platform API. It has been designed to be easily used with promises. The api docs can be seen at: https://developers.facebook.com/docs/workplace/integrations/custom-integrations/reference

## Table of Contents

- [Getting Started](#getting-started)
- [API Reference](#api-reference)
  - [Making a Post](#making-a-post)
  - [Sending Messages](#sending-messages)

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

### Making a Post

Once the package is set up, you can post to a group like this:
```
const groupID = <YOUR_GROUP_ID>;
const data = {
  message: 'text body of the message',
  url: 'example.com/my_photo.jpg' // optional photo url with your post
};
let response = await WP.postToGroup(groupID, data);
```

### Sending Messages

Workplace integrations have the ability to send a variety of message types directly or to groups of individuals. Specifically, you can send:

- Text
- Images
- Videos
- Audio
- Templates

This wrapper includes a few useful abstractions to make sending a message simple.


Use the `WP.Message` namespace to construct a message of various types:

To send a text message, use the `WP.Message.Text` wrapper to generate your message
```
// text messages
const message = WP.Message.Text('hello, world');

// hosted and local images
const imageMessageFromURL = WP.Message.Image('example.com/image.jpg');
const localImageMessage = WP.Message.Image(fs.createReadStream('path/to/file.jpg'));

// hosted and local videos
const videoMessageFromURL = WP.Message.Video('example.com/video.mp4');
const localVideoMessage = WP.Message.Video(fs.createReadStream('path/to/file.mp4'));

// hosted and local audio files
const audioMessageFromURL = WP.Message.Audio('example.com/video.mp3');
const localAudioMessage = WP.Message.Audio(fs.createReadStream('path/to/file.mp3'));

// send a custom json message template
const messageTemplate = WP.Message.Template(payload)
```

Then specify IDs and send the message away!
```
await WP.sendMessage(<id(s)>, message);
```

Made with <3 in London
