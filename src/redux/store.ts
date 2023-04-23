import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import gssEmployeeWeebudgetSlice from '../pages/gssEmployeeWeeklyBudget/EmployeeWeeklySlide';
import orderElementSlide from "@app/pages/orderElement/orderElementSlide";

const combinedReducer = combineReducers({
  gssEmployeeWeebudget : gssEmployeeWeebudgetSlice,
  orderElement: orderElementSlide,
});

// const resetStateType = ["authenticate/logout", "authenticate/userSelectTenant"];

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  // if (resetStateType.includes(action.type)) {
  //   state = { ...{}, common: state.common } as RootState;
  // }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
