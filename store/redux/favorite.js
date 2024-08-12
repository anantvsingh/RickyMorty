import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ids:[]
}

export const favslice=createSlice({
    name:'favorites',
    initialState,
    reducers:{
        addFavorite:(state,action)=>{
            state.ids.push(action.payload.id);
        },
        removefavorite:(state,action)=>{
            state.ids.splice(state.ids.indexOf(action.payload.id),1);
        }
    }
})
export const addFavorite=favslice.actions.addFavorite;
export const removeFavorite=favslice.actions.removefavorite;
export default favslice.reducer;