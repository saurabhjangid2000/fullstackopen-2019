import React, { useState } from "react"
import ReactDOM from "react-dom"


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const ShowAnecdote = ({ anecdote }) => <div>{anecdote}</div>
const ShowVotes = ({ votes }) => <div>has {votes} votes</div>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [totalVotes, setTotalVotes] = useState(new Array(anecdotes.length).fill(0))

  const nextAnecdoteClick = () => {
    const randnum = RandNum()
    setSelected(randnum)
  }

  const RandNum = () => {
    const random = Math.floor(Math.random() * props.anecdotes.length)
    return random
  }

  const voteAnecdoteClick = () => {
    totalVotes[selected] += 1
    setTotalVotes(totalVotes)
    console.log(totalVotes)
  }

  const mostVotedAnecdote = () => {
    let maxVotes = Math.max(...totalVotes)
    return totalVotes.indexOf(maxVotes)
  }

  return (
    <div>
      <h1>Anecdotes</h1>
      <ShowAnecdote anecdote={props.anecdotes[selected]} />
      <ShowVotes votes={totalVotes[selected]} />
      <br />
        <Button onClick={voteAnecdoteClick} text="vote" />
        <Button onClick={nextAnecdoteClick} text="next anecdote" />
      
      <h1>Anecdote with most votes</h1>
      <ShowAnecdote anecdote={props.anecdotes[mostVotedAnecdote()]} />
      <ShowVotes votes={totalVotes[mostVotedAnecdote()]} />
    </div>
  )
}

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"))
