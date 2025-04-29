import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class ErrorMessageService {
    private defaultMessages: { [key: string]: ErrorMessageFunction } = {
        required: (error) => `doit être renseigné`,
        emailValidation: (error) => `doit être valide (exemple@exemple.com)`,
        minlength: (error) => `doit avoir au moins ${error.requiredLength} caractères`,
        maxlength: (error) => `doit avoir au maximum ${error.requiredLength} caractères`,
        passwordMismatch: (error) => `doit être confirmé`,
    };

    getMessage(errorKey: string, errorValue?: any): string {
        const generator: ErrorMessageFunction = this.defaultMessages[errorKey];
        return generator ? generator(errorValue) : `Erreur sur le champ`;
    }

    getCombinedMessage(errors: ValidationErrors | null, nameLabel: string): string {
        console.log(errors);
        if (!errors) return '';
        const keys = Object.keys(errors);
        const label = nameLabel?.trim() || 'Ce champ';
        return `${label} ${keys.map((key) => this.getMessage(key, errors[key])).join(' et ')}`;
    }
}

type ErrorMessageFunction = (errorValue?: any) => string;
