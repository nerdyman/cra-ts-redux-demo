/* eslint-disable no-console */
import { logger } from '../logger';

describe('[logger.debug]', () => {
  test('calls debug', () => {
    Object.defineProperty(window, 'location', {
      value: {
        search: '?debug=true',
      },
      writable: true,
    });

    console.debug = jest.fn();
    logger.debug('testaroo');
    // The first argument of the first call to the function was 'hello'
    expect(console.debug).toHaveBeenCalledWith('testaroo');
  });
});
