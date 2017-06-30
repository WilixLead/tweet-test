import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TweetService } from './services/tweet';
import { StaredService } from './services/stared';
import { TweetComponent } from './components/tweet/tweet.component';
import { OrderByPipe } from './pipes/orderby.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpModule
  ],
  providers: [
    TweetService,
    StaredService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
