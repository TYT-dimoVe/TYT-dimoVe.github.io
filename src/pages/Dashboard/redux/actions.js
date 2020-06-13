import { defineAction } from 'redux-typed-actions'

export const GetBusOperator = defineAction('GET_BUS_OPERATOR_REQUEST')
export const GetBusOperatorSuccess = defineAction('GET_BUS_OPERATOR_SUCCESS')
export const GetBusOperatorFailed = defineAction('GET_BUS_OPERATOR_FAILED')

export const GetTripList = defineAction('GET_TRIP_LIST_REQUEST')
export const GetTripListSuccess = defineAction('GET_TRIP_LIST_SUCCESS')
export const GetTripListFailed = defineAction('GET_TRIP_LIST_FAILED')

export const GetOrderList = defineAction('GET_ORDER_LIST_REQUEST')
export const GetOrderListSuccess = defineAction('GET_ORDER_LIST_SUCCESS')
export const GetOrderListFailed = defineAction('GET_ORDER_LIST_FAILED')