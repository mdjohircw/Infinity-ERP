import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomeValidatio{
   static noWhiteSpace(control:AbstractControl) :ValidationErrors |null{
        const value = control.value as string
        const isWhiteSpace = value.indexOf(' ')>0;
        return isWhiteSpace?{whitespace:true }: null;
    }
}