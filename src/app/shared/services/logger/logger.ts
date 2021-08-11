import env from '@/env/env';

type LogFunc = (...data: unknown[]) => void;

interface Logger {
  log: LogFunc;
  debug: LogFunc;
  info: LogFunc;
  warn: LogFunc;
  error: LogFunc;
  logToServer: LogFunc;
}
/**
 * @description Logger class
 * This is responsible for logging of all kind of stuff in the application
 * Default, we are using the console api for logging and this provides the basic level of logging such as
 * you can use the available method of console in developement but in production these will be replaced with empty methods
 * This can be extended with the help of adding Log level functionality
 */
class AppLogger implements Logger {
  log: LogFunc;

  debug: LogFunc;

  info: LogFunc;

  warn: LogFunc;

  error: LogFunc;

  logToServer: LogFunc;

  /**
   * @constructor AppLogger
   */
  constructor() {
    // noop by default
    this.log =
      this.debug =
      this.info =
      this.warn =
      this.error =
      this.logToServer =
        () => undefined;

    /** Initializing the configuration of logger */
    this.initLogger();
  }

  /**
   * @description Initializing the configuration such as if environment is production then all log method will be replaced with empty methods
   * except logToServer, which will be responsible for logging the important stuff on server
   */
  initLogger() {
    const { environment } = env;
    /** Checking the environment */
    if (environment !== 'production') {
      this.log = console.log.bind(console);

      this.debug = console.debug.bind(console);

      this.info = console.info.bind(console);

      this.warn = console.warn.bind(console);

      this.error = console.error.bind(console);

      this.logToServer = this.error;
    } else {
      /** FIXME: temp added to print in the console during production */
      this.logToServer = (err) => {
        console.error(err); //
        /** TODO: API integration for logging to server or any custom logic in case of Production environment */
      };
    }
  }
}

/** Creating the instance of logger */
const logger = new AppLogger();

export { logger };
