import { runtimeIsDebug } from './runtime';

/**
 * Wrapper for `console`
 */
export const logger = console;

// Only allow `debug` in debug mode
if (!runtimeIsDebug) {
  logger.debug = (): undefined => undefined;
}
