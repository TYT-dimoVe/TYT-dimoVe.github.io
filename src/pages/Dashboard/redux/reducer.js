import { GetBusOperator, GetBusOperatorFailed, GetBusOperatorSuccess } from './actions'

const initialState = {
  busOperator: [],
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
    default:
      return state
  }
}