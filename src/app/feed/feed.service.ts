import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { conf } from '../config/app.config';
import { Feed } from './feed';

@Injectable()
export class FeedService {
    constructor(private http: HttpClient) { }

    getShareds() {
        return this.http.get<Feed[]>(conf.apiUrl + "feed").map(res => res);
    }

    newShared(ideia: Feed) {
        return this.http.post(conf.apiUrl + "feed", JSON.stringify(ideia), { observe: "response", responseType: "text" });
    }
}