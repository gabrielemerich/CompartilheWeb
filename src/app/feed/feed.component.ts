import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { Feed } from './feed';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

    public feed: Feed[] = [];
    constructor(private service: FeedService) { }

  ngOnInit() {
    this.service.getShareds().subscribe(
      data=>{this.feed = data},
      err => { console.log(err)}
      
      );
  }

}
