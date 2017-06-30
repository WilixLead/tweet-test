import {Component, Input, OnInit, Output} from '@angular/core';
import Tweet from '../../models/tweet';
import {StaredService} from '../../services/stared';

@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  @Input() tweet: Tweet;
  @Input() onChange: Function;

  constructor(private staredService: StaredService) {
  }

  ngOnInit() {
  }

  star() {
    // Check if tweet already stared
    if (this.tweet.stared) {
      return;
    }
    this
      .staredService
      .starTweet(this.tweet)
      .subscribe(() => {
        this.tweet.stared = new Date();
        this.onChange(this.tweet);
      })
  }

  unstar() {
    // Check if tweet already stared
    if (!this.tweet.stared) {
      return;
    }
    this
      .staredService
      .unstarTweet(this.tweet.id)
      .subscribe(() => {
        delete this.tweet.stared;
        this.onChange(this.tweet);
      })
  }
}
