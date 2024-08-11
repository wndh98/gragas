import {useState} from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
function App() {
    const [hello, setHello] = useState('');

    return (
        <div className="App" onClick={function(){
            axios.get("/api/test")
            .then((result)=>{
                setHello(result);
            });
        }}>
            백엔드 데이터 : {hello}
        </div>
    );
}

export default App;