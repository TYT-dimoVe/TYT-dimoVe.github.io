import { store } from 'core/store'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { PAGE } from '../constant'
import { EditOrderDetail, EditOrderDetailFailed, EditOrderDetailSuccess, GetBusOperator, GetBusOperatorDetail, GetBusOperatorDetailFailed, GetBusOperatorDetailSuccess, GetBusOperatorFailed, GetBusOperatorSuccess, GetCustomerList, GetCustomerListFailed, GetCustomerListSuccess, GetMapSeat, GetMapSeatFailed, GetMapSeatSuccess, GetOrderDetail, GetOrderDetailFailed, GetOrderDetailSuccess, GetOrderList, GetOrderListFailed, GetOrderListSuccess, GetStatistic, GetStatisticFailed, GetStatisticSuccess, GetTripList, GetTripListFailed, GetTripListSuccess, SetCurrentPage, SetTypeAccount } from './actions'

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
        method: 'POST',
        url: 'tripsList',
        param: action.payload
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
        method: 'POST',
        url: 'tickets',
        param: action.payload
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

const getCustomerListEpic$ = (action$) =>
  action$.pipe(
    ofType(GetCustomerList.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'getCustomers',
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetCustomerListSuccess.get(result.result)
          }
          return GetCustomerListFailed.get(result)
        }),
        catchError((error) => {
          return GetCustomerListFailed.get(error)
        }
        )
      )
    }))

const getBusOperatorDetailEpic$ = (action$) =>
  action$.pipe(
    ofType(GetBusOperatorDetail.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'busOperatorDetail',
        param: action.payload
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(SetTypeAccount.get(action.payload.busOperatorId))
            return GetBusOperatorDetailSuccess.get(result.result)
          }
          return GetBusOperatorDetailFailed.get(result)
        }),
        catchError((error) => {
          return GetBusOperatorDetailFailed.get(error)
        }
        )
      )
    }))

const getOrderDetailEpic$ = (action$) =>
  action$.pipe(
    ofType(GetOrderDetail.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'findTicketWeb',
        param: action.payload
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(SetCurrentPage.get({ currentPage: PAGE.ORDER_LIST, detailPage: PAGE.ORDER_DETAIL }))
            return GetOrderDetailSuccess.get(result.result)
          }
          return GetOrderDetailFailed.get(result)
        }),
        catchError((error) => {
          return GetOrderDetailFailed.get(error)
        }
        )
      )
    }))

const editOrderDetailEpic$ = (action$) =>
  action$.pipe(
    ofType(EditOrderDetail.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'editTickets',
        param: action.payload
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return EditOrderDetailSuccess.get(result.message)
          }
          return EditOrderDetailFailed.get(result)
        }),
        catchError((error) => {
          return EditOrderDetailFailed.get(error)
        }
        )
      )
    }))

const getMapSeatEpic$ = (action$) =>
  action$.pipe(
    ofType(GetMapSeat.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'getSeatWeb',
        param: action.payload
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetMapSeatSuccess.get(result.result)
          }
          return GetMapSeatFailed.get(result)
        }),
        catchError((error) => {
          return GetMapSeatFailed.get(error)
        }
        )
      )
    }))

const getStatisticEpic$ = (action$) =>
  action$.pipe(
    ofType(GetStatistic.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'getTotal',
        param: action.payload
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetStatisticSuccess.get(result.result)
          }
          return GetStatisticFailed.get(result)
        }),
        catchError((error) => {
          return GetStatisticFailed.get(error)
        }
        )
      )
    }))

export const dashboardEpics = combineEpics(getBusOperatorEpic$, getTripListEpic$, getOrderListEpic$, getCustomerListEpic$, getBusOperatorDetailEpic$, getOrderDetailEpic$, editOrderDetailEpic$, getMapSeatEpic$, getStatisticEpic$)
