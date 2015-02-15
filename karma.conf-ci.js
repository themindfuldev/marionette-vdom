var browsers = {                                 // 1
  sl_chrome38_w7: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 7',
    version: '38'
  }
/*  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: '30'
  },
/*  sl_ios_safari: {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.9',
    version: '7.1'
  },*/
/*  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  },
  sl_ie_10: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '10'
  },
  sl_ie_9: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9'
  },
  sl_ie_8: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '8'
  },
  sl_ie_7: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows XP',
    version: '7'
  } */
  /*"SL_Android_4.0": {
                base: "SauceLabs",
                browserName: "Android",
                platform: "Linux",
                version: "4.0"
            },
            "SL_Android_4.1": {
                base: "SauceLabs",
                browserName: "Android",
                platform: "Linux",
                version: "4.1"
            },
            "SL_Android_4.2": {
                base: "SauceLabs",
                browserName: "Android",
                platform: "Linux",
                version: "4.2"
            },
            "SL_Android_4.3": {
                base: "SauceLabs",
                browserName: "Android",
                platform: "Linux",
                version: "4.3"
            },
            "SL_Android_4.4": {
                base: "SauceLabs",
                browserName: "Android",
                platform: "Linux",
                version: "4.4"
            },
            "SL_Android_5.0": {
                base: "SauceLabs",
                browserName: "Android",
                platform: "Linux",
                version: "5.0"
            },
            "SL_Chrome": {
                base: "SauceLabs",
                browserName: "Chrome",
                platform: "Windows 8.1"
            },
            "SL_Chrome_Linux": {
                base: "SauceLabs",
                browserName: "Chrome",
                platform: "Linux"
            },
            "SL_Chrome_OSX": {
                base: "SauceLabs",
                browserName: "Chrome",
                platform: "OS X 10.10"
            },
            "SL_Firefox": {
                base: "SauceLabs",
                browserName: "Firefox",
                platform: "Windows 8.1"
            },
            "SL_Firefox_Linux": {
                base: "SauceLabs",
                browserName: "Firefox",
                platform: "Linux"
            },
            "SL_Firefox_OSX": {
                base: "SauceLabs",
                browserName: "Firefox",
                platform: "OS X 10.10"
            },
            "SL_IE_9": {
                base: "SauceLabs",
                browserName: "Internet Explorer",
                platform: "Windows 7",
                version: "9"
            },
            "SL_IE_10": {
                base: "SauceLabs",
                browserName: "Internet Explorer",
                platform: "Windows 8",
                version: "10"
            },
            "SL_IE_11": {
                base: "SauceLabs",
                browserName: "Internet Explorer",
                platform: "Windows 8.1",
                version: "11"
            },
            "SL_IOS_6": {
                base: "SauceLabs",
                browserName: "iPhone",
                platform: "OS X 10.8",
                version: "6.1"
            },
            "SL_IOS_7": {
                base: "SauceLabs",
                browserName: "iPhone",
                platform: "OS X 10.9",
                version: "7.1"
            },
            "SL_IOS_8": {
                base: "SauceLabs",
                browserName: "iPhone",
                platform: "OS X 10.10",
                version: "8.1"
            },
            "SL_Opera": {
                base: "SauceLabs",
                browserName: "opera",
                platform: "Windows 7"
            },
            "SL_Opera_Linux": {
                base: "SauceLabs",
                browserName: "opera",
                platform: "Linux"
            },
            "SL_Safari_5": {
                base: "SauceLabs",
                browserName: "Safari",
                platform: "OS X 10.6",
                version: "5"
            },
            "SL_Safari_6": {
                base: "SauceLabs",
                browserName: "Safari",
                platform: "OS X 10.8",
                version: "6"
            },
            "SL_Safari_7": {
                base: "SauceLabs",
                browserName: "Safari",
                platform: "OS X 10.9",
                version: "7"
            },
            "SL_Safari_8": {
                base: "SauceLabs",
                browserName: "Safari",
                platform: "OS X 10.10",
                version: "8"
            }*/
};

 // Karma configuration
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'mocha'],


    // list of files / patterns to load in the browser
    files: [
      'test/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.js': ['browserify']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['saucelabs', 'progress'],


    browsers: Object.keys(browsers),


    customLaunchers: browsers,


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
