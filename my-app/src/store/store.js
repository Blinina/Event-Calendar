import { configureStore } from '@reduxjs/toolkit';
import modalReducers from './modalsSlice'

export default configureStore({
  reducer: {
    modals: modalReducers,
  },
});