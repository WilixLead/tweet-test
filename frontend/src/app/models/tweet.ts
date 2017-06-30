export default class Tweet {
  "created_at": string;
  "id": number;
  "id_str": string;
  "text": string;
  "source": string;
  "user": {
    "id": number;
    "id_str": string;
    "name": string;
    "screen_name": string;
    "profile_image_url": string;
    "profile_image_url_https": string;
  };
  "media": [
    {
      "id": number;
      "id_str": string;
      "media_url": string;
      "media_url_https": string;
      "url": string;
      "display_url": string;
      "expanded_url": string;
      "type": string;
      "sizes": any;
    }
  ];
  "timestamp_ms": string;
  "stared": Date;

  constructor(tweetObj) {
    Object.assign(this, tweetObj);
    this.stared = tweetObj.stared ? new Date(tweetObj.stared) : null;
  }
}
