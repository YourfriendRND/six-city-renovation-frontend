import { combineReducers } from "@reduxjs/toolkit";

import { placesSlice } from "./slices";

const rootReducer = combineReducers({
    places: placesSlice.reducer
});

export default rootReducer;