import { configureStore, createSlice } from "@reduxjs/toolkit"

import user from './store/userSlice.js' // 코드가 너무길어 파일을 분할

let jangbaguni = createSlice({
    name: "jangbaguni",
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ],
    reducers: {
        increment: (state, action) => { // 버튼누르면 카운트 증가하는 함수
            let tmp = state.findIndex(item => item.id === action.payload)
            //console.log(tmp)
            state[tmp].count++
        },
        addToCart: (state, action) => { // 장바구니에 해주는 함수
            let tmp = state.findIndex(item => item.id === action.payload.id)
            console.log("tmp "+tmp)
            if (tmp == -1){
                state.push(action.payload)
                console.log(state.length)
            }
            else{
                console.log("중복된 상품입니다")
                state[tmp].count++
            }
            console.log(state.length)
        },
        deleteFromCart: (state, action) => { // 장바구니에서 삭제하는 함수
            let tmp = state.findIndex(item => item.id === action.payload)
            state.splice(tmp, 1)
        }
    }
})

export let {increment, addToCart, deleteFromCart} = jangbaguni.actions;


export default configureStore({
    reducer: {
        user : user.reducer,
        jangbaguni : jangbaguni.reducer 
    }
})