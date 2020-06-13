import { combineReducers } from 'redux';

import { dashboardReducer } from 'pages/Dashboard/redux/reducer';

export const rootReducer = combineReducers({
  Dashboard: dashboardReducer,
});
