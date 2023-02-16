import {useState} from "react" ;
import Button from "./components/Button" ;

function calc(l,o,r){
  let ans = "エラー" ;
  if(o === "+"){
    ans = l+r;
  }else if(o === "-"){
    ans = l-r;
  }else if(o === "*"){
    ans = l*r;
  }else if(o === "/"){
    ans = l/r;
  }
  return ans ;
}

function App() {
  const [left, setLeft] = useState(0) ;
  const [ope, setOpe] = useState(null) ;
  const [right, setRight] = useState(0) ;

  const [ans, setAns] = useState(null);

  function keyPressed(key){
    if(Number.isInteger(key)){  //key が整数なら
      if(ope === null){
        //leftを書き換える
        setLeft(parseFloat(left*10+key));
      }else{
        //rightを書き換える
        setRight(parseFloat(right*10+key));
      }
    }else if(
      key === "+" | 
      key === "-" | 
      key === "*" | 
      key === "/"){             //keyが演算子なら
        setOpe(key);
    }else if(key === "="){      //keyが「=」なら
      setAns(calc(left,ope,right));
    }else if(key === "C"){
      setLeft(0);
      setOpe(null);
      setRight(0);
      setAns(null);
    }
  }

  return (
    <div className="calc">
      <header>電卓</header>
      <div className="display">
        {
          ans === null?
            `${left} 
             ${ope === null ? "" : ope} 
             ${ope === null ? "" : right}`
              :
            `計算結果:${ans}`
        }
      </div>
      <div className="input">
        <div className="numbers">
          {
            [7,8,9,4,5,6,1,2,3,0,"."].map(el=>(
              <Button 
                text={el} 
                disabled={ans!==null}
                onClick={()=>keyPressed(el)} key={el}/>
            ))
          }
          <Button 
            text={ans === null ? "=" : "C"} 
            onClick={()=>keyPressed(ans === null ? "=" : "C")}/>
        </div>
        <div className="operators">
          {
            ["/","*","-","+"].map(el=>(
              <Button 
                text={el} 
                disabled={ans!==null}
                onClick={()=>keyPressed(el)} key={el}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;

