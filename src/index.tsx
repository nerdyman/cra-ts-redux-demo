import React from 'react';
import ReactDOM from 'react-dom';
import './critical.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { logger } from './utilities/logger';
import { runtimeIsDebug } from './utilities/runtime';

logger.debug(`[index] runtimeIsDebug: ${runtimeIsDebug}`);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
