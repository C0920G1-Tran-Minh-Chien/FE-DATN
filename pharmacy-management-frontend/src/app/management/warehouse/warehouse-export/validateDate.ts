import {AbstractControl, FormControl, ValidationErrors} from '@angular/forms';

export function validateDate(control: AbstractControl):ValidationErrors | null {
  let currentDay = new Date();
  let date = new Date(control.value);
  if(!control.value.match('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')){
    return { dateValid : true };
  }
  if (date > currentDay) {
    return { dateValid : true };
  }
  return null;
}
