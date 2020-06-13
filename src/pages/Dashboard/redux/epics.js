import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { GetBusOperator, GetBusOperatorFailed, GetBusOperatorSuccess, GetTripList, GetTripListSuccess, GetTripListFailed, GetOrderList, GetOrderListSuccess, GetOrderListFailed } from './actions'

const getBusOperatorEpic$ = (action$) =>
  action$.pipe(
    ofType(GetBusOperator.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'busOperator'
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetBusOperatorSuccess.get(result.result)
          }
          return GetBusOperatorFailed.get(result)
        }),
        catchError((error) => {
          return GetBusOperatorFailed.get(error)
        }
        )
      )
    }))

const getTripListEpic$ = (action$) =>
  action$.pipe(
    ofType(GetTripList.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'tripsList'
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetTripListSuccess.get(result.result)
          }
          return GetTripListFailed.get(result)
        }),
        catchError((error) => {
          return GetTripListFailed.get(error)
        }
        )
      )
    }))

const getOrderListEpic$ = (action$) =>
  action$.pipe(
    ofType(GetOrderList.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'tickets'
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetOrderListSuccess.get(result.result)
          }
          return GetOrderListFailed.get(result)
        }),
        catchError((error) => {
          return GetOrderListFailed.get(error)
        }
        )
      )
    }))

export const dashboardEpics = combineEpics(getBusOperatorEpic$, getTripListEpic$, getOrderListEpic$)
