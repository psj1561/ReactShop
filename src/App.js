import {createContext, useEffect, useState } from "react";
import {Container, Nav, Navbar, Row, Col} from 'react-bootstrap'; // 리액트 부트스트랩
import {Routes, Route, useNavigate, Outlet} from 'react-router-dom'
import axios from "axios" // ajax 선언
import './App.css'; // CSS
import data from './data.js'; // 상품정보 불러오기
import Detail from './routes/Detail.js' // Detail 컴포넌트
import Cart from './routes/cart.js' // Cart 컴포넌트
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query' 

function App() {

  useEffect(()=>{ // 페이지 처음 로딩시 localStorage에 저장된 데이터 확인후 초기화
    if (localStorage.getItem('watched') == null){
      localStorage.setItem('watched', JSON.stringify([]))
    }
  },[])

  let result = useQuery({ // react-query 호출
    queryKey : ['작명'],
    queryFn : ()=>
    axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      console.log("굳")
      return a.data
    })
  })

  let [shoes,setShoes] = useState(data) // 불러온 data를 state로 지정
  let navigate = useNavigate(); // react-router-dom용 href대신 사용하는 함수
  
  let [btnCnt,setBtnCnt] = useState(2); // 더보기버튼 누른횟수

  return (
    <div className="App">
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">천둥장터</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={()=>{navigate('./detail/0')}}>Detail</Nav.Link>
          <Nav.Link onClick={()=>{navigate('./cart')}}>Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading && '로딩중'}
            {result.error && '에러남ㅋ'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={ // 메인페이지
          <>
            <div className='main-bg'></div>
            <Container fluid>
            <Row>
            {
              shoes.map((a,i)=>{
                return(
                  <Product shoes={shoes} i={i} key={i}/>
                )
              })
            }
            </Row>
            </Container>
            
            <button onClick={()=> { // ajax로 상품정보 추가 로딩하는 버튼
              let copy = btnCnt
              ++copy;
              setBtnCnt(copy)
              if (btnCnt < 4){
                axios.get('https://codingapple1.github.io/shop/data'+btnCnt+'.json')
                .then((result)=>{
                  let copy = [...shoes, ...result.data];
                  setShoes(copy);
                  console.log(shoes);
                })
                .catch((err)=>{
                   console.log(err);
                 })
              }
              else{
                alert("상품이 더없습니다!")
              }
            }}>더보기버튼</button>
          </>
        }/>
        <Route path="/detail/:id" element={
            <Detail shoes={shoes}/>
        }/>
        <Route path="/cart" element={<Cart/>}/>

        <Route path="*" element={<div>404 not founded</div>}/>
      </Routes>

    </div>
  );
}

function Product(props){
  let navigate = useNavigate(); // react-router-dom용 href대신 사용하는 함수
  return (
    <Col md={4} onClick={()=>{
      navigate('/detail/'+props.shoes[props.i].id);
    }}>
      <img src = {"https://codingapple1.github.io/shop/shoes"+(props.i+1)+".jpg"} width="80%" alt=""/>
      <h4>{props.shoes[props.i].title}</h4>
      <p>{props.shoes[props.i].price}￦</p>
    </Col>
  )
}

export default App;
