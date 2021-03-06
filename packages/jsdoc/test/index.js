const ConsoleReporter = require('jasmine-console-reporter');
const env = require('jsdoc/env');
const Jasmine = require('jasmine');

const SCHEMA_SPEC = 'packages/jsdoc/test/specs/jsdoc/schema.js';
const SPEC_FILES = [
    `!${SCHEMA_SPEC}`,
    '!node_modules',
    'packages/**/test/specs/**/*.js',
    SCHEMA_SPEC
];

module.exports = () => {
    const jasmine = new Jasmine();
    const matcher = env.opts.matcher;
    /* eslint-disable no-empty-function */
    const promise = new Promise(() => {});
    /* eslint-enable no-empty-function */
    const reporter = new ConsoleReporter({
        beep: false,
        verbosity: {
            disabled: false,
            pending: false,
            specs: false,
            summary: true
        }
    });

    jasmine.loadConfig({
        helpers: [
            'node_modules/jasmine-expect/index.js',
            'packages/jsdoc/test/helpers/**/*.js'
        ],
        random: false,
        stopSpecOnExpectationFailure: false
    });
    jasmine.env.clearReporters();
    jasmine.addReporter(reporter);

    jasmine.onComplete(() => promise.resolve());
    jasmine.execute(SPEC_FILES, matcher);

    return promise;
};

