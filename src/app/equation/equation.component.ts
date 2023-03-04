import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter } from 'rxjs/operators';

import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent {
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('answer', 'a', 'b')]
  );

  get a() {
    return this.mathForm.value.a;
  }
  get b() {
    return this.mathForm.value.b;
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  ngOnInit() {
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(200)
      )
      .subscribe(() => {
        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      });
  }
}
