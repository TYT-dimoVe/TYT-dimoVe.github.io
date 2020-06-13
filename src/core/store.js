import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epic';
import { rootReducer } from './reducer';
import { __DEV__ } from 'ultis/functions';

const epicMiddleware = createEpicMiddleware();

const applyMiddlewarePro = applyMiddleware(epicMiddleware);
const applyMiddlewareDev = applyMiddleware(logger, epicMiddleware);

export const store = createStore(rootReducer, __DEV__ ? applyMiddlewareDev : applyMiddlewarePro);

epicMiddleware.run(rootEpic);
