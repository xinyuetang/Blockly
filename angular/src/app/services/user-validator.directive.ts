import { ValidatorFn, AbstractControl } from '@angular/forms';


export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}

export function confirmPasswordValidator(passRe: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return passRe === control.value ? null : {comfirmPassword: {value: control.value}};
    // 返回null值，则不会被捕捉验证错误
  };
}
