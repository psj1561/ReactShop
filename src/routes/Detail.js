import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useDispatch} from 'react-redux';

import { addToCart } from '../store.js'; // store의 함수 불러오기

//import styled from "styled-components"; // CSS파일 없이 style선언하게 해주는 라이브러리 HTML의 style같은
function Detail(props) {
    let dispatch = useDispatch()
    let {id} = useParams(); // url주소의 파라미터 id의 값을 가져오기


    let data = props.shoes.find((x) =>x.id == id) //props.shoes 배열중 id가 url의 파라미터값과 동일한 상품정보를 불러오기
    let [discount, setDiscount] = useState(true); //할인메세지의 On/Off 상태를 나타내는 state
    let [fade2, setFade2] = useState('') // 애니메이션 효과 state
    let [tab, setTab] = useState(0); // 몇번째 탭을 열고있는지 나타내는 state

    useEffect(() => { // 페이지 로딩후 2초후 실행되는 함수
        let a = setTimeout(() => {setDiscount(false)},2000)
        return ()=>{
            clearTimeout(a)
        }
    },)
    useEffect(() => { // 페이지 로딩후 한번만 실행되는 함수
        let localTmp = JSON.parse(localStorage.getItem('watched'))
        localTmp.push(id)
        localStorage.setItem('watched', JSON.stringify(localTmp))
        let a = setTimeout(() => {setFade2('end')}, 500);  // 0.5초 후에 코드 실행
        return()=>{ // 초기화
            clearTimeout(a)
            setFade2('')
        }
    },[])
    
    return(
        <div className={"container start "+fade2}>
            {
                discount == true ? <Discount/> : null
            }
            
        <div className="row">
            <div className="col-md-6">
            <img src= {"https://codingapple1.github.io/shop/shoes"+(Number(id)+1)+".jpg"} width="100%"  alt=""/>
            </div>
            <div className="col-md-6">
                <h4 className="pt-5">{data.title}</h4>
                <p>{data.content}</p>
                <p>{data.price} ￦</p>
                <button className="btn btn-danger" onClick={()=>{
                    dispatch(addToCart({id: 3, name: data.title, count: 1})) // store에 저장된 cart에 해당상품을 추가하는 함수
                }}>주문하기</button>
            </div>
        </div>

        <Nav variant="tabs"  defaultActiveKey="link0">
            <Nav.Item>
            <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
        <TabContent tab={tab}/>
        </div> 
    )
}
function TabContent(props){
   
    let [fade, setFade] = useState('')

    useEffect(() => {
        let a = setTimeout(() => {setFade('end')}, 100); 
        return()=>{
            clearTimeout(a)
            setFade('')
        }
    },[props.tab])

    return (
    <div className={'start '+fade}>
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab]}
    </div>)
}

function Discount(){
    return(
        <div className="alert alert-warning">
            2초이내 구매시 할인
        </div>
    )
}

export default Detail;
