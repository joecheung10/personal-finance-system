export const SUPPORTED_CURRENCIES = {
	HKD: { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
	USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
	EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
	GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
	CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
	JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
} as const

export type CurrencyCode = keyof typeof SUPPORTED_CURRENCIES