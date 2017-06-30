import { Component } from '@angular/core';
import { OrderByPipe } from './pipes/orderby.pipe';
import { TweetService } from './services/tweet';
import { StaredService } from './services/stared';
import Tweet from './models/tweet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tweets: Array<Tweet> = [];
  staredTweets: Array<Tweet> = [];

  constructor(private tweetService: TweetService,
              private staredService: StaredService) {
  }

  ngOnInit(){
    this.updateTweets();
    this.updateStared();
  }

  updateTweets() {
    return this
      .tweetService
      .getTweets()
      .subscribe(items => {
        this.tweets = items;
      }, err => {
        console.error(err);
      })
  }

  updateStared() {
    return this
      .staredService
      .getStared()
      .subscribe(items => {
        this.staredTweets = items;
      }, err => {
        console.error(err);
      })
  }

  onTweetChanged(tweet) {
    if (tweet.stared) {
      this.staredTweets.push(tweet);
    } else {
      this.staredTweets.splice(this.staredTweets.indexOf(tweet), 1);
    }
  }
}
