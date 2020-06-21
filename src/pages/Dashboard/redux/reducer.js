import { GetBusOperator, GetBusOperatorFailed, GetBusOperatorSuccess, GetTripList, GetTripListSuccess, GetTripListFailed, GetOrderList, GetOrderListSuccess, GetOrderListFailed, SetTypeAccount, GetCustomerList, GetCustomerListSuccess, GetCustomerListFailed, GetBusOperatorDetail, GetBusOperatorDetailSuccess, GetBusOperatorDetailFailed, GetAccountType, GetOrderDetail, GetOrderDetailSuccess, GetOrderDetailFailed, GetMapSeat, GetMapSeatSuccess, GetMapSeatFailed, SetCurrentPage, ResetDashboard, GetStatistic, GetStatisticSuccess, GetStatisticFailed, GetStatisticAmountSuccess, GetStatisticAmountFailed } from './actions'
import { PAGE } from 'pages/Dashboard/constant'
const initialState = {
  busOperator: [],
  tripList: [],
  orderList: [],
  customerList: [],
  accountType: null,
  isLoading: false,
  isLoadingDashboard: false,
  accountDetail: null,
  orderDetail: {},
  tripDetail: {},
  currentPage: PAGE.HOME,
  detailPage: null,
  stastic: null,
  statisticData: null
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
    case SetTypeAccount.type:
      return { ...state, accountType: action.payload }
    case GetCustomerList.type:
      return { ...state, isLoading: true }
    case GetCustomerListSuccess.type:
      return { ...state, customerList: action.payload, isLoading: false }
    case GetCustomerListFailed.type:
      return { ...state, isLoading: false }
    case GetBusOperatorDetail.type:
      return { ...state, isLoadingDashboard: true }
    case GetBusOperatorDetailSuccess.type:
      return { ...state, accountDetail: action.payload, isLoadingDashboard: false }
    case GetBusOperatorDetailFailed.type:
      return { ...state, isLoadingDashboard: false }
    case GetAccountType.type:
      return { ...state, isLoadingDashboard: true }
    case GetOrderDetail.type:
      return { ...state, isLoading: true }
    case GetOrderDetailSuccess.type:
      return { ...state, orderDetail: action.payload, isLoading: false }
    case GetOrderDetailFailed.type:
      return { ...state, isLoading: false }
    case GetMapSeat.type:
      return { ...state, isLoading: true }
    case GetMapSeatSuccess.type:
      return { ...state, tripDetail: action.payload, isLoading: false }
    case GetMapSeatFailed.type:
      return { ...state, isLoading: false }
    case SetCurrentPage.type:
      return { ...state, currentPage: action.payload.currentPage, detailPage: action.payload.detailPage }
    case ResetDashboard.type:
      return { ...initialState }
    case GetStatistic.type:
      return { ...state, isLoading: true }
    case GetStatisticSuccess.type:
      return { ...state, stastic: action.payload }
    case GetStatisticFailed.type:
      return { ...state, isLoading: false }
    case GetStatisticAmountSuccess.type:
      return { ...state, statisticData: action.payload, isLoading: false }
    case GetStatisticAmountFailed.type:
      return { ...state, isLoading: false }
    default:
      return state
  }
}