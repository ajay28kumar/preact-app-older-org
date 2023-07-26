import { Component } from 'preact';
import Rollbar from 'rollbar';

class RollbarComponent extends Component {
  componentDidMount() {
    new Rollbar({
      accessToken: process.env.PREACT_APP_ROLLBAR_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
      scrubTelemetryInputs: true,
      payload: {
        appName: 'Preact App',
        appVersion: process.env.PREACT_APP_VERSION_NAME, //gets updated during build process via Jenkins
        environment: process.env.PREACT_APP_ENV_NAME,
      },
      ignoredMessages: [
        "You can't have a focus-trap without at least one focusable element",
        "Cannot read property 'title' of null",
        'vid_mate_check is not defined',
        'Symbol is not defined',
        'Uncaught SyntaxError: missing ) after argument list',
        "Uncaught TypeError: Cannot read property '2' of null",
        "Rollbar: Error while reading your configuration's ignoredMessages option. Removing custom ignoredMessages.",
        'ReferenceError: __show__deepen is not defined',
        "TypeError: Cannot get property 'querySelector' of undefined or null",
        'TypeError: Failed to register a ServiceWorker: ServiceWorker script evaluation failed',
        '(unknown): Script error.',
        'ReferenceError: tgetT is not defined',
        "TypeError: Cannot get property 'root_' of undefined or null",
        'ReferenceError: vid_mate_check is not defined',
        'Uncaught Error: timeout of 0ms exceeded',
        'ReferenceError: GK is not defined',
        'Uncaught SyntaxError: missing ) after argument list',
      ],
    });
  }
  render() {
    return null;
  }
}

export default RollbarComponent;
