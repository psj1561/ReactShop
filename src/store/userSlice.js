import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name: "user",
    initialState: { name : 'kim', age: 20},
    reducers: {
        changeName(state){
            state.name = 'park'
        },
        changeAge(state, a){
            state.age += a.payload; // 파라미터로 state수정하는것
        }
    }
})

export let { changeName, changeAge} = user.actions;

export default user;
