import React, { useEffect, useState } from "react";
import "./Card.scss";

export default function Card({firstName, lastName, pic, email, company, grades}) {

  const [expand, setExpand] = useState(false)
  const [inlineStyle, setInlineStyle] = useState({display: "none"})

  const sum = grades.reduce((a, b) => a + b, 0)
  const avg = sum / grades.length

  useEffect(() => {
    if (expand) {
      setInlineStyle({
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginTop: "20px",
      transition: "all 1s ease-in-out"
    })} else {
      setInlineStyle({display: "none"})
    }
  }, [expand])

  return <div className="card">
    <div className="left">
      <img src={pic} alt="pic"/>
      <div className="info">
        <h1>{firstName} {lastName}</h1>
        <p>Email: {email}</p>
        <p>Company: {company}</p>
        <p>Average: {avg}</p>
        <div className="grades" style={inlineStyle}>
          {grades.map((grade, idx) => {
            return <p key={idx}>Test{idx + 1}: {grade}%</p>
          })}
        </div>
      </div>
    </div>
    <div className="right">
      <button onClick={() => setExpand(!expand)}>{expand ? "-" : "+"}</button>
    </div>
  </div>
}