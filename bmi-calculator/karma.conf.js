const fs = require('fs');
const path = require('path');
const os = require('os');

if (!process.env.CHROME_BIN && os.platform() === 'win32') {
  process.env.CHROME_BIN = 'C:\\Program Files\\Google\\Chrome\\Application\\new_chrome.exe';
}

const chromeUserDataDir = path.join(os.tmpdir(), 'karma-chrome-user-data');
if (!fs.existsSync(chromeUserDataDir)) {
  fs.mkdirSync(chromeUserDataDir, { recursive: true });
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        random: false
      },
      clearContext: false
    },
    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: true
  });
};
