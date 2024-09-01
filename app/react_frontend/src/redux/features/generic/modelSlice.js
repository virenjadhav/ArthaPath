import { createSlice } from "@reduxjs/toolkit";

const modelSlice = createSlice({
    name: 'model',
    initialState: {
        data: null,
        isModelVisible : false,
        selectedForm: null,
        selectedRecord: null,
        records : null
    },
    reducers: {
        setDate(state, action){
            state.data = action.payload;
        },
        setIsModelVisible(state, action){
            state.isModelVisible = action.payload;
        },
        setSelectedForm(state, action){
            state.selectedForm = action.payload;
        }
    }
});

export const {setDate, setIsModelVisible} = modelSlice.actions;
export default modelSlice.reducer;