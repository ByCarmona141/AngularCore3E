import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface FieldForm {
  builder: (string | ((control: AbstractControl) => (ValidationErrors | null))[])[];
  html: {
    field: string;
    label: string;
    type: string;
    message: string;
    items?: any;
    empty?: boolean;
    readonly?: boolean;
    icon?: boolean;
  };
}
