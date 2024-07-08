import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
    name:"weatherData",
    initialState: null,
    reducers:{
        addWeather:(state, action)=>{
            return action.payload;
        },
    },

});

export const {addWeather} = weatherSlice.actions;
export default weatherSlice.reducer;