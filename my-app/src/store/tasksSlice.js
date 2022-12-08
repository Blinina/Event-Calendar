import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const tasksAdapter = createEntityAdapter();

const initialState = {
  ...tasksAdapter.getInitialState(),
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState, 
    reducers: {
        addTask: tasksAdapter.addOne,
        deleteTask: (state, { payload }) => tasksAdapter.removeOne(state, payload.id),
        renameTask: (state, { payload }) => tasksAdapter.updateOne(state, {
            id: payload.id,
            changes: { taskName: payload.taskName, dateStart: payload.dateStart, dateEnd: payload.dateEnd },
          }),
    }
})

export const selectors = tasksAdapter.getSelectors((state) => state.tasks);
export const getTasks = (state) => selectors.selectAll(state);

export const {
    addTask, deleteTask, renameTask
} = tasksSlice.actions;
export default tasksSlice.reducer;