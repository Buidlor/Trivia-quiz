
import './Styles.css';
import Start from './components/Start'
import React from 'react';
import Questions from './components/Questions';
import { nanoid } from 'nanoid'
import AllAnswers from './components/AllAnswers';
import Confetti from 'react-confetti'

function App() {
  const [start, setStart] = React.useState(true)
  const [quizData, setQuizData] = React.useState({})
  const [quiz, setQuiz] = React.useState([{}])
  const [won, setWon] = React.useState(false)

  
  React.useEffect(()=> {     
    fetch("https://opentdb.com/api.php?amount=5")
    .then(res => res.json())
    .then(data => setQuizData(data.results))
   
    },[quiz]
  )


  function getQuizData(){
    const newArray = quizData.map(obj => ({
      question: obj.question,
      correct: obj.correct_answer,
      isCorrect: false,
      questionId: nanoid(),
      totalAnswers: 
      [...obj.incorrect_answers, obj.correct_answer]
        .sort(() => Math.random() - 0.5)
        .map( (answer) => ({
          answerId: nanoid(),
          value: answer,
          isHeld: false
        })),
    }))
    setQuiz(newArray)

  }
    
  function clickStart(){
    setStart(prevStart => !prevStart)
    getQuizData()
  }

  function selected(aId, qId){
    setQuiz(prevQuiz => prevQuiz.map( items => ({
      ...items,
      totalAnswers: items.totalAnswers.map(answer => {
        if(answer.answerId === aId){
          return ({...answer, isHeld: !answer.isHeld})
        } 
        else if(items.questionId === qId){
          return({...answer, isHeld: false})
        }
        else return answer
      })
    })))

    setQuiz(prevQuiz => prevQuiz.map(items => ({
      ...items,
      isCorrect: items.totalAnswers.find(x=> x.isHeld) && items.totalAnswers.find(x=> x.isHeld).value === items.correct ?
        true:false
    })))
  }
  
  function finish(){
    const allCorrect = quiz.every(quiz => quiz.isCorrect)
    if (allCorrect && !won){
      setWon(true)
    }
    else if(won){
      getQuizData()
      setWon(false)
    }
    else{console.log("wrong answer")}
  }

  return (
    <div className="main">
      {won && <Confetti />}
      {!start ?
        <div className='questionContainer'>
          { quiz.map(ele => (
            <>
              <Questions
                key={ele.questionId}
                question={ele.question}
                correct={ele.correct}
              />
              {ele.totalAnswers.map(answ => (
              <AllAnswers 
                key={answ.answerId}
                value={answ.value}
                isHeld={answ.isHeld}
                selected={() => selected(answ.answerId, ele.questionId)}
                />
              ))}
              <hr/>
            </>
          ))}
          <button className='finishButton' onClick={finish}>{!won ? "Finish": "New game" }</button>
        </div>
        :
      <Start 
        key = {nanoid()}    
        clickStart={clickStart}/>}
    </div>
  );
}

export default App;
