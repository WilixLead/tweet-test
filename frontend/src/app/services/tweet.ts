import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { environment as env } from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import Tweet from '../models/tweet';

@Injectable()
export class TweetService {
  constructor(private http: Http) {
  }

  /**
   * Return tweets
   * @param count
   * @return {Observable<Array<Tweet>>}
   */
  getTweets(count: number = 20): Observable<Array<Tweet>> {
    return this.http
      .get(env.apiUrl + '/tweets/?count=' + count)
      .map((res: Response) => {
        let body = res.json();
        let result: any = body || {};
        if (!result.success && result.error) {
          throw {type: 'api', error: result.error || null};
        }
        return result.items.map(item => new Tweet(item));
      })
  }
}

