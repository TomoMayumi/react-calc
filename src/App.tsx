import {useState} from "react" ;
import Button from "./components/Button" ;

function calc(l:number,o:string,r:number){
  let ans = "エラー" ;
  if(o === "+"){
    ans = String(l+r);
  }else if(o === "-"){
    ans = String(l-r);
  }else if(o === "*"){
    ans = String(l*r);
  }else if(o === "/"){
    ans = String(l/r);
  }
  return ans ;
}

function App() {
  const [left, setLeft] = useState(0) ;
  const [ope, setOpe] = useState("") ;
  const [right, setRight] = useState(0) ;

  const [ans, setAns] = useState("");

  function keyPressed(key:any){
    if(Number.isInteger(key)){  //key が整数なら
      if(ope === ""){
        //leftを書き換える
        setLeft(parseFloat(left*10+key));
      }else{
        //rightを書き換える
        setRight(parseFloat(right*10+key));
      }
    }else if(
      key === "+" ||
      key === "-" ||
      key === "*" ||
      key === "/"){             //keyが演算子なら
        setOpe(key);
    }else if(key === "="){      //keyが「=」なら
      setAns(calc(left,ope,right));
    }else if(key === "C"){
      setLeft(0);
      setOpe("");
      setRight(0);
      setAns("");
    }
  }

  return (
    <div className="calc">
      <header>電卓</header>
      <div className="display">
        {
          ans === ""?
            `${left} 
             ${ope} 
             ${ope === "" ? "" : right}`
              :
            `${ans}`
        }
      </div>
      <div className="input">
        <div className="numbers">
          {
            [7,8,9,4,5,6,1,2,3,0,"."].map(el=>(
              <Button 
                text={el} 
                disabled={ans!==""}
                onClick={()=>keyPressed(el)} key={el}/>
            ))
          }
          <Button 
            text={ans === "" ? "=" : "C"} 
            onClick={()=>keyPressed(ans === "" ? "=" : "C")}/>
        </div>
        <div className="operators">
          {
            ["/","*","-","+"].map(el=>(
              <Button 
                text={el} 
                disabled={ans!==""}
                onClick={()=>keyPressed(el)} key={el}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;

