import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import modalReducers from './modalsSlice';
import tasksReducers from './tasksSlice';

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducers = combineReducers({
  modals: modalReducers,
  tasks: tasksReducers, 
})
const persistedReducer = persistReducer(persistConfig, rootReducers)

const store =  configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
export const persistor = persistStore(store);
export default store;
