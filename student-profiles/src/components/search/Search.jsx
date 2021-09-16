import React from 'react'
import "./Search.scss"

export default function Search({setSearchContent, placeHolder}){
  return <input
    className="search"
    type="text"
    placeholder={placeHolder}
    onChange={e => {
      const userInput = e.target.value
      setSearchContent(userInput.toLowerCase())
    }}
  />
}