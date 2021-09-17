import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import "./Card.scss";

export default function Card({id, firstName, lastName, pic, email, company, grades, skill, tags, setTags}) {

  const [expand, setExpand] = useState(false)
  const [inlineStyle, setInlineStyle] = useState({display: "none"})
  const [inputTag, setInputTag] = useState('')

  const sum = grades.reduce((a, b) => Number(a) + Number(b), 0)
  const avg = sum / grades.length + "%"

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const tag = {id, inputTag}
    setTags([...tags, tag])
    setInputTag('')
  }

  const current = tags.filter(tag => tag.id === id)

  return <div className="card">
    <div className="left">
      <img src={pic} alt="pic"/>
      <div className="info">
        <h1>{firstName} {lastName}</h1>
        <p>Email: {email}</p>
        <p>Company: {company}</p>
        <p>Skill: {skill}</p>
        <p>Average: {avg}</p>
        <div className="grades" style={inlineStyle}>
          {grades.map((grade, idx) => {
            return <p key={idx}>Test{idx + 1}: {grade}%</p>
          })}
        </div>
        <div className="tags">
          {current && current.map((c, idx) => <p className="tag" key={idx} style={{color: "black"}}>{c.inputTag}</p>)}
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={e => setInputTag(e.target.value)} value={inputTag} placeholder="Add a tag"/>
        </form>
      </div>
    </div>
    <div className="right">
      <button onClick={() => setExpand(!expand)}>{expand ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} /> }</button>
    </div>
  </div>
}