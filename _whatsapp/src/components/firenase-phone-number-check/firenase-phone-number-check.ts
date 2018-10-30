import { Component } from '@angular/core';

/**
 * Generated class for the FirenasePhoneNumberCheckComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'firenase-phone-number-check',
  templateUrl: 'firenase-phone-number-check.html'
})
export class FirenasePhoneNumberCheckComponent {

  countryCode = "55";
  verificationId = '';

  constructor() {
  }
  
  verififyPhoneNumber(){
      this.verificationId = '111';
  }
  
  cancel(){
      this.verificationId = '';
  }

}
