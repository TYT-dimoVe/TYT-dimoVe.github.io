import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { GetBusOperator, GetBusOperatorFailed, GetBusOperatorSuccess } from './actions'

const getBusOperatorEpic$ = (action$) =>
  action$.pipe(
    ofType(GetBusOperator.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'busOperator'
      }).pipe(
        map((result) => {
          console.log(result.result)
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

export const dashboardEpics = combineEpics(getBusOperatorEpic$)
