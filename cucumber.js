export default {
	paths: ['features/**/*.feature'],
	import: ['features/**/step-definitions/**/*.ts'],
	format: ['progress-bar', 'html:reports/cucumber-report.html']
}