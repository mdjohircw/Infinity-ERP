import { AbstractControl, ValidationErrors } from "@angular/forms";
import { promises } from "dns";
import { Observable, of } from "rxjs";

export class CustomeValidatio{
   static noWhiteSpace(control:AbstractControl) :ValidationErrors |null{
        const value = control.value as string
        const isWhiteSpace = value.indexOf(' ')>0;
        return isWhiteSpace?{whitespace:true }: null;
    }

    static userNameExistAsync(control:AbstractControl) : Promise <ValidationErrors | null> | Observable <ValidationErrors |null>
    {
        const userName = [
            'rashed',
            'johirull',
            'imon'
        ]
        const value =control.value as string;
        const IsExist  = userName.includes(value);
        return IsExist? of({userExist:true}) : of (null);
    }
}