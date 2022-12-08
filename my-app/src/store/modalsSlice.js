import { createSlice } from "@reduxjs/toolkit";




const modalsSlice = createSlice({
    name: 'modals',
    initialState: { type: null, item: null }, 
    reducers: {
        showModal: ((state, action) => {
            const { type, itemId } = action.payload;
            state.type = type;
            state.item = itemId;
          }),
          closeModal: ((state) => {
            state.type = null;
            state.item = null;
          }),
    }
})
export const {
    showModal, closeModal,
  } = modalsSlice.actions;
  export default modalsSlice.reducer;