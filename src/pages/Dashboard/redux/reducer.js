import { GetBusOperator, GetBusOperatorFailed, GetBusOperatorSuccess, GetTripList, GetTripListSuccess, GetTripListFailed, GetOrderList, GetOrderListSuccess, GetOrderListFailed } from './actions'

const initialState = {
  busOperator: [],
  tripList: [],
  orderList: [],
  customerList: [],
  isLoading: false
}

export function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GetBusOperator.type:
      return { ...state, isLoading: true }
    case GetBusOperatorSuccess.type:
      return { ...state, busOperator: action.payload.data, isLoading: false }
    case GetBusOperatorFailed.type:
      return { ...state, isLoading: false }
    case GetTripList.type:
      return { ...state, isLoading: true }
    case GetTripListSuccess.type:
      return { ...state, tripList: action.payload, isLoading: false }
    case GetTripListFailed.type:
      return { ...state, isLoading: false }
    case GetOrderList.type:
      return { ...state, isLoading: true }
    case GetOrderListSuccess.type:
      return { ...state, orderList: action.payload, isLoading: false }
    case GetOrderListFailed.type:
      return { ...state, isLoading: false }
    default:
      return state
  }
}