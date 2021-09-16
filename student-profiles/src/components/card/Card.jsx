import React from "react";
import "./Card.scss";

export default function Card({firstName, lastName, pic, email, company, grades}) {
  const sum = grades.reduce((a, b) => a + b, 0)
  const avg = sum / grades.length
  return <div className="card">
    <img src={pic} alt="pic"/>
    <div className="info">
      <h1>{firstName} {lastName}</h1>
      <p>Email: {email}</p>
      <p>Company: {company}</p>
      <p>Average: {avg}</p>
    </div>
  </div>
}