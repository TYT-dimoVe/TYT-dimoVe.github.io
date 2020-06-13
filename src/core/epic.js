import { combineEpics } from 'redux-observable';
import { dashboardEpics } from 'pages/Dashboard/redux/epics';

export const rootEpic = combineEpics(dashboardEpics);
