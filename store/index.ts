import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  userSlice,
  dashboardSlice,
  saasSlice,
  loadingSlice,
  sidebarSlice,
  popupSlice,
} from "./slices";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  user: userSlice,
  dashboard: dashboardSlice,
  saas: saasSlice,
  loading: loadingSlice,
  sidebar: sidebarSlice,
  popup: popupSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export default store;
export type RootState = ReturnType<typeof rootReducer>;
