import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        selectedOption:null
    },
    reducers: {
        openModal(state,action) {
            state.isOpen = true;
            state.donationType = action.payload
        },
        closeModal(state) {
            state.isOpen = false;
            state.donationType=null
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;