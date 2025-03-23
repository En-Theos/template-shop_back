import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'
import { RegistrationDto } from 'src/modules/auth/dtos/Registration.dto'

@ValidatorConstraint({ name: 'IsPasswordsEqual', async: false })
export class IsPasswordsEqual implements ValidatorConstraintInterface {
	public validate(
		passwordСonfirmation: string,
		validationArguments?: ValidationArguments
	): Promise<boolean> | boolean {
		const dto = validationArguments?.object as RegistrationDto

		return passwordСonfirmation === dto.password
	}

	defaultMessage(): string {
		return 'Паролі не збігаються'
	}
}
