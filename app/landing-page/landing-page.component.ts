import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { Router } from '@angular/router';
import * as orientation from 'nativescript-orientation';
import { android as androidApp } from 'tns-core-modules/application';
import { device } from 'tns-core-modules/platform';
declare var android: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private page: Page, private route: Router) {
    this.page.actionBarHidden = true;
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
    orientation.setOrientation('landscape', false);
    // orientation.disableRotation();
    if (androidApp && device.sdkVersion >= '21') {
      const View = android.view.View;
      const window = androidApp.startActivity.getWindow();
      const decorView = window.getDecorView();
      decorView.setSystemUiVisibility(
          View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
          View.SYSTEM_UI_FLAG_FULLSCREEN |
          View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
      );
  }
  }

  navToHome(){
    this.route.navigate(['/home']);
  }

}
