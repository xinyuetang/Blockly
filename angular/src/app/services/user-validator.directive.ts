import { ValidatorFn, AbstractControl } from '@angular/forms';


export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}

export function confirmPasswordValidator(passRe: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const confirmed = passRe.match(control.value);
    return confirmed ? {comfirmPassword: {value: control.value}} : null;
  };
}
