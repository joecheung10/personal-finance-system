import { SUPPORTED_CURRENCIES, CurrencyCode } from "./Currency";

// Custom Domain Error
export class InvalidMoneyAmountError extends Error {
	constructor(message = 'Amount must be an integer') {
		super(message);
		this.name = 'InvalidMoneyAmountError';
	}
}

export class UnsupportedCurrencyError extends Error {
	constructor(currency: string) {
		super(`Unsupported currency: ${currency}`);
		this.name = 'UnsupportedCurrencyError';
	}
}

export class CurrencyMismatchError extends Error {
	constructor(message = 'Cannot perform math across different currencies') {
		super(message);
		this.name = 'CurrencyMismatchError';
	}
}

// Value Object
export class Money {
	private constructor(
		public readonly cents: number,
		public readonly currency: CurrencyCode
	) { }

	static of(cents: number, currency: CurrencyCode): Money {
		if (!Number.isInteger(cents) || cents < 0) {
			throw new InvalidMoneyAmountError();
		}

		if (!(currency in SUPPORTED_CURRENCIES)) {
			throw new UnsupportedCurrencyError(currency);
		}

		return new Money(cents, currency);
	}

	add(other: Money): Money {
		this.assertSameCurrency(other);
		return Money.of(this.cents + other.cents, this.currency);
	}

	subtract(other: Money): Money {
		this.assertSameCurrency(other);
		return Money.of(this.cents - other.cents, this.currency);
	}

	equals(other: Money): boolean {
		if (this.currency !== other.currency) {
			return false;
		}
		return this.cents === other.cents;
	}

	isGreaterThan(other: Money): boolean {
		this.assertSameCurrency(other);
		return this.cents > other.cents;
	}

	isLessThan(other: Money): boolean {
		this.assertSameCurrency(other);
		return this.cents < other.cents;
	}

	display(): string {
		const divisor = this.currency === 'JPY' ? 1 : 100;
		const amount = this.cents / divisor;

		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: this.currency,
			minimumFractionDigits: this.currency === 'JPY' ? 0 : 2
		}).format(amount);
	}

	private assertSameCurrency(other: Money): void {
		if (this.currency !== other.currency) {
			throw new CurrencyMismatchError();
		}
	}
}	