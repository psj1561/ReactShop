import Table from 'react-bootstrap/Table' // 부트스트랩
import { useDispatch, useSelector } from 'react-redux'; // react-redux 라이브러리
import { increment, deleteFromCart } from '../store.js'; // 수량 증가 함수

function Cart(){

    let state = useSelector((state) => state) // store.js의 state 전부 불러오기
    let dispatch = useDispatch()

    return(
        <div>

            <h6>{state.user.name}의 장바구니</h6>

            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    </tr>
                </thead>
                <tbody>
                {// store안의 상품을 불러와서 출력
                    state.jangbaguni.map((item, index) =>                   
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                            <td>
                                <button onClick={()=>{
                                    dispatch(increment(item.id))
                                }}>+</button>
                            </td>
                            <td>
                                <button onClick={()=>{
                                    dispatch(deleteFromCart(item.id))
                                }}>상품삭제</button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;