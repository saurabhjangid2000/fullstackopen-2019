import React from 'react'

const Statistic = ({text, value}) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )

const Statistics = ({statistics: {good, neutral, bad}}) => {
    return(
       <div>
          <h1>statistics</h1>  
        <table>
          <tbody>
              <Statistic text={'good'} value= {good} />
              <Statistic text={'neutral'} value= {neutral}/>
              <Statistic text={'bad'} value= {bad}/>
              <Statistic text={'all'} value= {good*1 + bad*1 + neutral*1}/>
              <Statistic text={'average'} value= {(good*1 + bad*-1 + neutral*0)/9}/>
              <Statistic text={'positive'} value= {((good)/9) * 100 + '%'} />
         </tbody>
        </table>
       </div>
     )
   }

   export default Statistics

   
        
         
