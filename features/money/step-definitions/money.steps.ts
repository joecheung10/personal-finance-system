import { Given, When, Then, Before } from '@cucumber/cucumber'
import assert from 'node:assert'
// We import the Money class from our domain package. 
// (TypeScript will show an error here until we create Money.ts in the next step!)
import { Money } from '../../../packages/domain/src/value-objects/Money'

// --- World State ---
// These variables hold state between the Given, When, and Then steps of a single scenario.
let money: any
let money2: any
let result: any
let caughtError: Error | null = null

// Reset the state before every scenario so they don't interfere with each other
Before(() => {
	money = undefined
	money2 = undefined
	result = undefined
	caughtError = null
})

// --- Given Steps ---

Given('the system supports currencies HKD, USD, EUR, GBP, CNY, JPY', () => {
	// This is enforced by our TypeScript types, so this step is just a pass-through
})

Given('I have an amount of {int} cents in {string}', (cents: number, currency: string) => {
	money = Money.of(cents, currency as any)
})

Given('I have another amount of {int} cents in {string}', (cents: number, currency: string) => {
	money2 = Money.of(cents, currency as any)
})

// --- When Steps ---

// Notice we use {float} here to catch the "42.5" non-integer test
When('I create an amount of {float} cents in {string}', (cents: number, currency: string) => {
	try {
		money = Money.of(cents, currency as any)
	} catch (error) {
		caughtError = error as Error
	}
})

When('I add them together', () => {
	try {
		result = money.add(money2)
	} catch (error) {
		caughtError = error as Error
	}
})

When('I subtract {int} cents in {string}', (cents: number, currency: string) => {
	try {
		const amountToSubtract = Money.of(cents, currency as any)
		result = money.subtract(amountToSubtract)
	} catch (error) {
		caughtError = error as Error
	}
})

When('I compare it with {int} cents in {string}', (cents: number, currency: string) => {
	try {
		const compareTo = Money.of(cents, currency as any)
		money.equals(compareTo)
	} catch (error) {
		caughtError = error as Error
	}
})

// --- Then Steps ---

Then('the amount should have {int} cents', (expectedCents: number) => {
	assert.strictEqual(money.cents, expectedCents)
})

Then('the currency should be {string}', (expectedCurrency: string) => {
	assert.strictEqual(money.currency, expectedCurrency)
})

Then('it should display as {string}', (expectedDisplay: string) => {
	assert.strictEqual(money.display(), expectedDisplay)
})

Then('I should receive a/an {string}', (expectedErrorName: string) => {
	assert.notStrictEqual(caughtError, null, 'Expected an error to be thrown, but none was')
	assert.strictEqual(caughtError?.name, expectedErrorName)
})

Then('the result should have {int} cents in {string}', (expectedCents: number, expectedCurrency: string) => {
	assert.strictEqual(result.cents, expectedCents)
	assert.strictEqual(result.currency, expectedCurrency)
})

Then('it should be greater than {int} cents in {string}', (cents: number, currency: string) => {
	const compareTo = Money.of(cents, currency as any)
	assert.strictEqual(money.isGreaterThan(compareTo), true)
})

Then('it should be less than {int} cents in {string}', (cents: number, currency: string) => {
	const compareTo = Money.of(cents, currency as any)
	assert.strictEqual(money.isLessThan(compareTo), true)
})

Then('it should equal {int} cents in {string}', (cents: number, currency: string) => {
	const compareTo = Money.of(cents, currency as any)
	assert.strictEqual(money.equals(compareTo), true)
})

Then('it should not equal {int} cents in {string}', (cents: number, currency: string) => {
	const compareTo = Money.of(cents, currency as any)
	assert.strictEqual(money.equals(compareTo), false)
})