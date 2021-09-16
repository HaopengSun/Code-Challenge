import React, { useState } from 'react'
import "./Search.scss"

export default function Search({setSearchContent}){
  return <input
    className="search"
    type="text"
    placeholder="Search by name"
    onChange={e => {
      const userInput = e.target.value
      setSearchContent(userInput.toLowerCase())
    }}
  />
}