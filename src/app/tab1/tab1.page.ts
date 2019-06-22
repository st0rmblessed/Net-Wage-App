import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  result = '';

  clickButton(btn) {
    if (btn == 'C') {
        this.result = '';
    }
    else if (btn == '=') {
        this.result = eval(this.result);
    }
    else if (btn == '%') {
      this.result = eval(this.result + '/100');
  }
    else if (btn == 'R') {
      this.result = this.result.substring(0, this.result.length - 1);
      console.log(this.result);
  }
    else {
        this.result += btn;
    }
}

}
