import {createLogger, format, Logger, transports} from 'winston'
import path from 'path';

class SetLogging {

  public static myLog() : Logger {
    return createLogger({
        level: 'silly',
        format: format.combine(
          format.label({label: path.basename(process.mainModule?.filename!)}), //( ! ) mean non-null assertion operator
          format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
          format.printf((info: any) => `${info.timestamp} ${info.level} [${info.label}] : ${info.message}`)
        ) ,
        transports: [new transports.Console]
      }
    )
  } // ended

}

export default SetLogging.myLog() // when use just import my.logging.ts then can call any method for logging
