import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/app';
import 'firebase/auth';

type GoogleButtonState = 'normal' | 'focused' | 'pressed' | 'disabled';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  firebaseApp = firebase.initializeApp(environment.firebaseConfig);
  firebaseProvider = new firebase.auth.GoogleAuthProvider();

  googleButton = {
    normal: 'url(/assets/google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png)',
    focused: 'url(/assets/google_signin_buttons/web/1x/btn_google_signin_light_focused_web.png)',
    pressed: 'url(/assets/google_signin_buttons/web/1x/btn_google_signin_light_pressed_web.png)',
    disabled: 'url(/assets/google_signin_buttons/web/1x/btn_google_signin_light_disabled_web.png)',
  };
  googleButtonCurrentState = this.googleButton.normal;

  constructor() { }

  ngOnInit(): void {

  }

  onClick(): void {
    const obs =  from(this.firebaseApp.auth().signInWithPopup(this.firebaseProvider));
    obs.subscribe(res => console.log(res));
  }

  changeGoogleButton(state: GoogleButtonState): void {
    this.googleButtonCurrentState = this.googleButton[state];
  }
}