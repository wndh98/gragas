import React, { useEffect, useState } from "react";
import axios from "axios";
import Routers from "./Routers";
// function App() {
//   return <Routers />;
// }

function Test() {
  const [hello, setHello] = useState([{ userName: "1", userId: "2" }])
  console.log(hello);
  /*  const [test,setTest]=useState(<Test></Test>); */

    axios.get('/user/view')
      .then(response => {
        setHello(response.data); console.log(hello);
      })
      .catch(error => console.log(error))

  return (
    hello.map(user => {
      return (
        <div>{user.userId}</div>
      );
    })

  );
}

function App(user) {
  return (
    <div>
      백엔드에서 가져온 데이터입니다 :
      <Test/>
    </div>

  )
}

export default App;
