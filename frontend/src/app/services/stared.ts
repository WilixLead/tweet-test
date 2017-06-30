import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment as env} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import Tweet from '../models/tweet';

@Injectable()
export class StaredService {
  constructor(private http: Http) {
  }

  /**
   * Return stared tweets
   * @return {Observable<Array<Tweet>>}
   */
  getStared(): Observable<Array<Tweet>> {
    return this.http
      .get(env.apiUrl + '/stars')
      .map((res: Response) => {
        let body = res.json();
        let result: any = body || {};
        if (!result.success && result.error) {
          throw {type: 'api', error: result.error || null};
        }
        return result.items.map(item => new Tweet(item));
      })
  }

  /**
   * Star tweet
   * @param tweetObject Tweet full object
   * @return {Observable<Boolean>}
   */
  starTweet(tweetObject: Tweet) {
    return this.http
      .post(env.apiUrl + '/stars/add', tweetObject)
      .map((res: Response) => {
        let body = res.json();
        let result: any = body || {};
        if (!result.success && result.error) {
          throw {type: 'api', error: result.error || null};
        }
        return true;
      })
  }

  /**
   * Remove stared tweet
   * @param tweetId Tweet id
   * @return {Observable<Boolean>}
   */
  unstarTweet(tweetId: number) {
    return this.http
      .get(env.apiUrl + '/stars/remove/' + tweetId)
      .map((res: Response) => {
        let body = res.json();
        let result: any = body || {};
        if (!result.success && result.error) {
          throw {type: 'api', error: result.error || null};
        }
        return true;
      })
  }
}
