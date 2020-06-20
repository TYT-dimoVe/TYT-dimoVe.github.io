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

export const SetTypeAccount = defineAction('SET_TYPE_ACCOUNT')

export const GetCustomerList = defineAction('GET_CUSTOMER_LIST_REQUEST')
export const GetCustomerListSuccess = defineAction('GET_CUSTOMER_LIST_SUCCESS')
export const GetCustomerListFailed = defineAction('GET_CUSTOMER_LIST_FAILED')

export const GetBusOperatorDetail = defineAction('GET_BUS_OPERATOR_DETAIL_REQUEST')
export const GetBusOperatorDetailSuccess = defineAction('GET_BUS_OPERATOR_DETAIL_SUCCESS')
export const GetBusOperatorDetailFailed = defineAction('GET_BUS_OPERATOR_DETAIL_FAILED')

export const GetAccountType = defineAction('GET_TYPE_ACCOUNT')

export const GetOrderDetail = defineAction('GET_ORDER_DETAIL_REQUEST')
export const GetOrderDetailSuccess = defineAction('GET_ORDER_DETAIL_SUCCESS')
export const GetOrderDetailFailed = defineAction('GET_ORDER_DETAIL_FAILED')

export const GetTripDetail = defineAction('GET_TRIP_DETAIL_REQUEST')
export const GetTripDetailSuccess = defineAction('GET_TRIP_DETAIL_SUCCESS')
export const GetTripDetailFailed = defineAction('GET_TRIP_DETAIL_FAILED')

export const EditOrderDetail = defineAction('EDIT_ORDER_DETAIL_REQUEST')
export const EditOrderDetailSuccess = defineAction('EDIT_ORDER_DETAIL_SUCCESS')
export const EditOrderDetailFailed = defineAction('EDIT_ORDER_DETAIL_FAILED')

export const GetMapSeat = defineAction('GET_MAP_SEAT_REQUEST')
export const GetMapSeatSuccess = defineAction('GET_MAP_SEAT_SUCCESS')
export const GetMapSeatFailed = defineAction('GET_MAP_SEAT_FAILED')

export const SetCurrentPage = defineAction('SET_CURRENT_PAGE')
export const ResetDashboard = defineAction('RESET_DASHBOARD')

export const GetStatistic = defineAction('GET_STATISTIC_REQUEST')
export const GetStatisticSuccess = defineAction('GET_STATISTIC_SUCCESS')
export const GetStatisticFailed = defineAction('GET_STATISTIC_FAILED')