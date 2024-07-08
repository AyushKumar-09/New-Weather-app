import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import weatherDataReducer from "./weatherSlice"
const appStore = configureStore(
    {
        reducer: {
            user:userReducer,
            weatherData:weatherDataReducer,
        }
    }
);

export default appStore;