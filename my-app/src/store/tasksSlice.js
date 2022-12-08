import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const tasksAdapter = createEntityAdapter();
// const initialState = channelsAdapter.getInitialState();
const initialState = {
  ...tasksAdapter.getInitialState(),
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState, 
    reducers: {
        addTask: tasksAdapter.addOne,
    }
})

export const selectors = tasksAdapter.getSelectors((state) => state.tasks);
export const getTasks = (state) => selectors.selectAll(state);

export const {
    addTask
} = tasksSlice.actions;
export default tasksSlice.reducer;