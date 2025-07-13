import { combineReducers } from "@reduxjs/toolkit";

import { placesSlice, authSlice } from "./slices";

const rootReducer = combineReducers({
    places: placesSlice.reducer,
    auth: authSlice.reducer
});

export default rootReducer;
