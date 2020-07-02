import { store } from "core/store";
import moment from "moment";
import { combineEpics, ofType } from "redux-observable";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { request } from "ultis/api";
import { PAGE } from "../constant";
import {
  ActivatePromotion,
  ActivatePromotionFailed,
  ActivatePromotionSuccess,
  CreateNewPromotion,
  CreateNewPromotionFailed,
  CreateNewPromotionSuccess,
  DeletePromotion,
  DeletePromotionFailed,
  DeletePromotionSuccess,
  EditOrderDetail,
  EditOrderDetailFailed,
  EditOrderDetailSuccess,
  GetBusOperator,
  GetBusOperatorDetail,
  GetBusOperatorDetailFailed,
  GetBusOperatorDetailSuccess,
  GetBusOperatorFailed,
  GetBusOperatorSuccess,
  GetCityData,
  GetCityDataFailed,
  GetCityDataSuccess,
  GetCustomerList,
  GetCustomerListFailed,
  GetCustomerListSuccess,
  GetDistrictData,
  GetDistrictFailed,
  GetDistrictSuccess,
  GetMapSeat,
  GetMapSeatFailed,
  GetMapSeatSuccess,
  GetOrderDetail,
  GetOrderDetailFailed,
  GetOrderDetailSuccess,
  GetOrderList,
  GetOrderListFailed,
  GetOrderListSuccess,
  GetPromotion,
  GetPromotionFailed,
  GetPromotionSuccess,
  GetStatistic,
  GetStatisticAmount,
  GetStatisticAmountFailed,
  GetStatisticAmountSuccess,
  GetStatisticFailed,
  GetStatisticSuccess,
  GetTripList,
  GetTripListFailed,
  GetTripListSuccess,
  GetWardData,
  GetWardDataFailed,
  GetWardDataSuccess,
  SetCurrentPage,
  SetTypeAccount,
  GetDetailPromotion,
  GetDetailPromotionSuccess,
  GetDetailPromotionFailed,
  AddBusOperator,
  AddBusOperatorSuccess,
  AddBusOperatorFailed,
  DeleteBusOperator,
  DeleteBusOperatorSuccess,
  DeleteBusOperatorFailed,
  GetCitiesTrip,
  GetCitiesTripSuccess,
  GetCitiesTripFailed,
} from "./actions";

const getBusOperatorEpic$ = (action$) =>
  action$.pipe(
    ofType(GetBusOperator.type),
    exhaustMap((action) => {
      return request({
        method: "GET",
        url: "busOperator",
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetBusOperatorSuccess.get(result.result);
          }
          return GetBusOperatorFailed.get(result);
        }),
        catchError((error) => {
          return GetBusOperatorFailed.get(error);
        })
      );
    })
  );

const getTripListEpic$ = (action$) =>
  action$.pipe(
    ofType(GetTripList.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "tripsList",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetTripListSuccess.get(result.result);
          }
          return GetTripListFailed.get(result);
        }),
        catchError((error) => {
          return GetTripListFailed.get(error);
        })
      );
    })
  );

const getOrderListEpic$ = (action$) =>
  action$.pipe(
    ofType(GetOrderList.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "tickets",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetOrderListSuccess.get(result.result);
          }
          return GetOrderListFailed.get(result);
        }),
        catchError((error) => {
          return GetOrderListFailed.get(error);
        })
      );
    })
  );

const getCustomerListEpic$ = (action$) =>
  action$.pipe(
    ofType(GetCustomerList.type),
    exhaustMap((action) => {
      return request({
        method: "GET",
        url: "getCustomers",
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetCustomerListSuccess.get(result.result);
          }
          return GetCustomerListFailed.get(result);
        }),
        catchError((error) => {
          return GetCustomerListFailed.get(error);
        })
      );
    })
  );

const getBusOperatorDetailEpic$ = (action$) =>
  action$.pipe(
    ofType(GetBusOperatorDetail.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "busOperatorDetail",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(SetTypeAccount.get(action.payload.busOperatorId));
            return GetBusOperatorDetailSuccess.get(result.result);
          }
          return GetBusOperatorDetailFailed.get(result);
        }),
        catchError((error) => {
          return GetBusOperatorDetailFailed.get(error);
        })
      );
    })
  );

const getOrderDetailEpic$ = (action$) =>
  action$.pipe(
    ofType(GetOrderDetail.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "findTicketWeb",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(
              SetCurrentPage.get({
                currentPage: PAGE.ORDER_LIST,
                detailPage: PAGE.ORDER_DETAIL,
              })
            );
            return GetOrderDetailSuccess.get(result.result);
          }
          return GetOrderDetailFailed.get(result);
        }),
        catchError((error) => {
          return GetOrderDetailFailed.get(error);
        })
      );
    })
  );

const editOrderDetailEpic$ = (action$) =>
  action$.pipe(
    ofType(EditOrderDetail.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "editTickets",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return EditOrderDetailSuccess.get(result.message);
          }
          return EditOrderDetailFailed.get(result);
        }),
        catchError((error) => {
          return EditOrderDetailFailed.get(error);
        })
      );
    })
  );

const getMapSeatEpic$ = (action$) =>
  action$.pipe(
    ofType(GetMapSeat.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "getSeatWeb",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetMapSeatSuccess.get(result.result);
          }
          return GetMapSeatFailed.get(result);
        }),
        catchError((error) => {
          return GetMapSeatFailed.get(error);
        })
      );
    })
  );

const getStatisticEpic$ = (action$) =>
  action$.pipe(
    ofType(GetStatistic.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "getTotal",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(
              GetStatisticAmount.get({
                busOperatorId: action.payload.busOperatorId,
                from: moment(new Date()).add(-7, "days").format("DD/MM/YYYY"),
                to: moment(new Date()).format("DD/MM/YYYY"),
              })
            );
            return GetStatisticSuccess.get(result.result);
          }
          return GetStatisticFailed.get(result);
        }),
        catchError((error) => {
          return GetStatisticFailed.get(error);
        })
      );
    })
  );

const getStatisticAmountEpic$ = (action$) =>
  action$.pipe(
    ofType(GetStatisticAmount.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "getStatistic",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetStatisticAmountSuccess.get(result.result);
          }
          return GetStatisticAmountFailed.get(result);
        }),
        catchError((error) => {
          return GetStatisticAmountFailed.get(error);
        })
      );
    })
  );

const getCityDataEpic$ = (action$) =>
  action$.pipe(
    ofType(GetCityData.type),
    exhaustMap((action) => {
      return request({
        method: "GET",
        url: "locationCity",
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetCityDataSuccess.get(result.result);
          }
          return GetCityDataFailed.get(result);
        }),
        catchError((error) => {
          return GetCityDataFailed.get(error);
        })
      );
    })
  );

const getDistrictDataEpic$ = (action$) =>
  action$.pipe(
    ofType(GetDistrictData.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "locationDistrict",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetDistrictSuccess.get(result.result);
          }
          return GetDistrictFailed.get(result);
        }),
        catchError((error) => {
          return GetDistrictFailed.get(error);
        })
      );
    })
  );

const getWardDataEpic$ = (action$) =>
  action$.pipe(
    ofType(GetWardData.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "locationWard",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetWardDataSuccess.get(result.result);
          }
          return GetWardDataFailed.get(result);
        }),
        catchError((error) => {
          return GetWardDataFailed.get(error);
        })
      );
    })
  );

const getPromotionEpic$ = (action$) =>
  action$.pipe(
    ofType(GetPromotion.type),
    exhaustMap((action) => {
      return request({
        method: "GET",
        url: "promotion",
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            return GetPromotionSuccess.get(result.result);
          }
          return GetPromotionFailed.get(result);
        }),
        catchError((error) => {
          return GetPromotionFailed.get(error);
        })
      );
    })
  );

const createNewPromotionEpic$ = (action$) =>
  action$.pipe(
    ofType(CreateNewPromotion.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "newPromotion",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(GetPromotion.get());
            store.dispatch(
              SetCurrentPage.get({ currentPage: PAGE.PROMOTIONS })
            );
            return CreateNewPromotionSuccess.get(result.result);
          }
          return CreateNewPromotionFailed.get(result);
        }),
        catchError((error) => {
          return CreateNewPromotionFailed.get(error);
        })
      );
    })
  );

const deletePromotionEpic$ = (action$) =>
  action$.pipe(
    ofType(DeletePromotion.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "deletePromotion",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(GetPromotion.get());
            return DeletePromotionSuccess.get(result.result);
          }
          return DeletePromotionFailed.get(result);
        }),
        catchError((error) => {
          return DeletePromotionFailed.get(error);
        })
      );
    })
  );

const activatePromotionEpic$ = (action$) =>
  action$.pipe(
    ofType(ActivatePromotion.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "activatePromotion",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(GetPromotion.get());
            return ActivatePromotionSuccess.get(result.result);
          }
          return ActivatePromotionFailed.get(result);
        }),
        catchError((error) => {
          return ActivatePromotionFailed.get(error);
        })
      );
    })
  );

const getDetailPromotionEpic$ = (action$) =>
  action$.pipe(
    ofType(GetDetailPromotion.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "promotionDetail",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(
              SetCurrentPage.get({
                currentPage: PAGE.PROMOTIONS,
                detailPage: PAGE.DETAIL_PROMOTION,
              })
            );
            return GetDetailPromotionSuccess.get(result.result);
          }
          return GetDetailPromotionFailed.get(result);
        }),
        catchError((error) => {
          return GetDetailPromotionFailed.get(error);
        })
      );
    })
  );

const addBusOperatorEpic$ = (action$) =>
  action$.pipe(
    ofType(AddBusOperator.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "newBusOperator",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(GetBusOperator.get());
            store.dispatch(
              SetCurrentPage.get({ currentPage: PAGE.BUS_OPERATOR })
            );
            return AddBusOperatorSuccess.get(result.result);
          }
          return AddBusOperatorFailed.get(result);
        }),
        catchError((error) => {
          return AddBusOperatorFailed.get(error);
        })
      );
    })
  );

const deleteBusOperatorEpic$ = (action$) =>
  action$.pipe(
    ofType(DeleteBusOperator.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "deleteBusOperator",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(GetBusOperator.get());
            store.dispatch(
              SetCurrentPage.get({ currentPage: PAGE.BUS_OPERATOR })
            );
            return DeleteBusOperatorSuccess.get(result.result);
          }
          return DeleteBusOperatorFailed.get(result);
        }),
        catchError((error) => {
          return DeleteBusOperatorFailed.get(error);
        })
      );
    })
  );

const deleteTripEpic$ = (action$) =>
  action$.pipe(
    ofType(DeleteBusOperator.type),
    exhaustMap((action) => {
      return request({
        method: "POST",
        url: "deleteTrip",
        param: action.payload,
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            const { accountType } = store.getState().Dashboard;
            store.dispatch(
              GetTripList.get(
                accountType !== "admin" ? { busOperatorId: accountType } : {}
              )
            );
            store.dispatch(SetCurrentPage.get({ currentPage: PAGE.TRIP_LIST }));
            return DeleteBusOperatorSuccess.get(result.result);
          }
          return DeleteBusOperatorFailed.get(result);
        }),
        catchError((error) => {
          return DeleteBusOperatorFailed.get(error);
        })
      );
    })
  );

const getCitiesTripEpic$ = (action$) =>
  action$.pipe(
    ofType(GetCitiesTrip.type),
    exhaustMap((action) => {
      return request({
        method: "GET",
        url: "cities",
      }).pipe(
        map((result) => {
          if (result.status === 200) {
            store.dispatch(SetCurrentPage.get({ currentPage: PAGE.TRIP_LIST, detailPage: PAGE.ADD_TRIP }));
            return GetCitiesTripSuccess.get(result.result);
          }
          return GetCitiesTripFailed.get(result);
        }),
        catchError((error) => {
          return GetCitiesTripFailed.get(error);
        })
      );
    })
  );

export const dashboardEpics = combineEpics(
  deleteBusOperatorEpic$,
  deleteTripEpic$,
  addBusOperatorEpic$,
  getDetailPromotionEpic$,
  activatePromotionEpic$,
  deletePromotionEpic$,
  getCityDataEpic$,
  getWardDataEpic$,
  getDistrictDataEpic$,
  getBusOperatorEpic$,
  getTripListEpic$,
  getOrderListEpic$,
  getCustomerListEpic$,
  getBusOperatorDetailEpic$,
  getOrderDetailEpic$,
  editOrderDetailEpic$,
  getMapSeatEpic$,
  getStatisticEpic$,
  getStatisticAmountEpic$,
  getPromotionEpic$,
  createNewPromotionEpic$,
  getCitiesTripEpic$
);
