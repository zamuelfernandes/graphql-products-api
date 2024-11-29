import { ApolloError } from "apollo-server";
import winston from "winston";

// Configuração do formato do log
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Configuração do logger
export const logger = winston.createLogger({
  level: "info", // Níveis: error, warn, info, http, verbose, debug, silly
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "logs/errors.log",
      level: "error",
    }), // Logs de erro
    new winston.transports.File({
      filename: "logs/combined.log",
      level: "info",
    }), // Todos os logs
  ],
});

export const loggingMiddleware = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const start = Date.now();
  try {
    const result = await resolve(parent, args, context, info);
    logger.info(
      `${info.parentType.name}.${info.fieldName} - Tempo de execução: ${
        Date.now() - start
      }ms`
    );
    return result;
  } catch (error) {
    // Tratamento de Erro
    if (error instanceof ApolloError) {
      logger.error(`Erro no resolver '${info.fieldName}': ${error.message}`);
      throw error;
    }

    const err = new ApolloError(
      "Erro interno no servidor.",
      "INTERNAL_SERVER_ERROR",
      {
        http: { status: 500 },
      }
    );
    logger.error(`Erro no resolver 'product': ${err.message}`);

    throw err;
  }
};
