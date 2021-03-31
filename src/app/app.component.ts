import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './auth/signin/shared/user.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(translate: TranslateService, private service: UserService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit(): void {
    this.service.getUsLogado().subscribe(
      data=>{
          this.service.loggedIn.next(true);
          console.log('ok')
    },
      error=>{
        this.service.loggedIn.next(false);
      }
    )
    
  }
}
