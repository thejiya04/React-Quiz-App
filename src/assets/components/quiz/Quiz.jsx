import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../data'

const quiz = () => {
const [index, setIndex] = useState(0);
const question = data[index];
const [lock, setLock] = useState(false);
const [score, setScore] = useState(0)
const [result, setResult] = useState(false)

let option1 = useRef(null);
let option2 = useRef(null);
let option3 = useRef(null);
let option4 = useRef(null);

let option_array =[option1 , option2 , option3 , option4] ;

const checkAns =(e, ans)=>{
    if(lock ===false){
    if(question.ans===ans){
        e.target.classList.add("correct")
        setLock(true)
        setScore(prev => prev +1)
    }else{
        e.target.classList.add("incorrect")
        setLock(true)
        option_array[question.ans-1].current.classList.add("correct");
    }
}
}

// const next =()=>{
//     if(lock ===true){
//         setIndex(++index)
//         setQuestion(data[index])
//         setLock(false)
//         option_array.map((option)=>{
//             option.current.classList.remove("incorrect");
//             option.current.classList.remove("correct");
//             return(null)
//         })
//     }
// }


const next = () => {
  if (lock) {
    if(index === data.length - 1){
       setResult(true)
       return 0;
    }
    setIndex(prev => prev + 1);
    setLock(false);
    option_array.forEach(option => {
      option.current.classList.remove("correct", "incorrect");
    });
  }
};


// const reset =()=>{
//     setIndex(0);
//     setQuestion(data[0]);
//     setScore(0)
//     setResult(false);
//     setLock(false)
// }

const reset = () => {
  setIndex(0);
  setScore(0);
  setResult(false);
  setLock(false);

  option_array.forEach(option => {
    option.current.classList.remove("correct", "incorrect");
  });
};

  return (
        <div id="container">
            <h1>QUIZ APP</h1>
            <hr/>
            {result?<></>:<>
            <h2>{index+1}. {question.Question}</h2>
            <ul>
                <li ref={option1} onClick={(e)=>checkAns(e,1)}>{question.Option1}</li>
                <li ref={option2} onClick={(e)=>checkAns(e,2)}>{question.Option2}</li>
                <li ref={option3} onClick={(e)=>checkAns(e,3)}>{question.Option3}</li>
                <li ref={option4} onClick={(e)=>checkAns(e,4)}>{question.Option4}</li>
            </ul>
            <button onClick={next}>NEXT</button>
            <div className="footer">{index+1} of {data.length} Questions</div></>}
             {result?<>
        <h2>You Scored {score} out of {data.length}</h2>
            <button onClick={reset}>Reset</button>
            </>:<></>}
    </div>
  )
  
}

export default quiz;