import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    count:0,
    count2:0,
    counters:[]
}
const counterSlice =createSlice({
    name: "counter",
    initialState,
    reducers:{
        increment1(state , action){
            state.count += action.payload
        },
        increment2(state , action){
            state.count2 += action.payload
        },
        increment3: (state, action) => {
            state.counters[action.payload]++;
          },
          decrement3: (state, action) => {
            state.counters[action.payload]--;
          },
       addCounter(state, action){
            state.counters.push(action.payload)
       }
    }
})
export const {increment1,decrement3,increment2,increment3,addCounter} = counterSlice.actions
export default counterSlice.reducer