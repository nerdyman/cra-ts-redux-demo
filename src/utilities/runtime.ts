/**
 * Determine if runtime is in debug mode
 */
export const getRuntimeIsDebug = (): boolean => {
  // Always enable debug in devleopment environment
  if (process.env.NODE_ENV === 'development') return true;

  // Don't attempt to get URL params on legacy browsers
  if (!URLSearchParams) return false;

  // Get `debug` param from URL params
  const debugParam = new URLSearchParams(window.location.search).get('debug');

  if (debugParam === null || debugParam === 'false') {
    return false;
  }

  return true;
};

/**
 * Is runtime in debug mode
 */
export const runtimeIsDebug = getRuntimeIsDebug();
