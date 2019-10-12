import React from 'react';


const Course = ({ courses }) => {
  const course_Details = () => courses.map(course =>
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  )
  return (
    <>
      {course_Details()}
    </>
  )
}

const Content = ({ parts }) => {
  const course_Parts = () => parts.map(part =>
    <Part 
      key={part.id} 
      name={part.name} 
      exercises={part.exercises} 
    />
  )
  // count total number of exercises of all parts
  const total_Exercise = () => parts.reduce((n, current) => 
    n + current.exercises
  , 0)
  
  return (
    <>
      {course_Parts()}
      <p>
        <b>total of {total_Exercise()} exercises</b>
      </p>
    </>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  )
}

const Header = ({ name }) => {
  return (
    <>
      <h3>
        {name}
      </h3>
    </>
  )
}



export default Course
