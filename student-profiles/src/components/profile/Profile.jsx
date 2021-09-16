import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from '../card/Card';
import "./Profile.scss";
import Search from '../search/Search';

export default function Profile(props) {

  const [profiles, setProfiles] = useState([])
  const [searchContent, setSearchContent] = useState('')

  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/students')
    .then(res => {
      const data = Array.from(res.data.students)
      if (searchContent) {
        const searchResult = data.filter(d => {
          const first = d.firstName
          const last = d.lastName
          const lowerFirst = first.toLowerCase()
          const lowerLast = last.toLowerCase()
          return lowerFirst.includes(searchContent) || lowerLast.includes(searchContent)
        })
        setProfiles(searchResult)
      } else {
        setProfiles(data)
      }
    })
  }, [searchContent])

  return <div className="profile">
    <Search setSearchContent={setSearchContent}/>
    {profiles && profiles.map((profile, idx) => {
      return <Card 
        key={idx}
        firstName={profile.firstName}
        lastName={profile.lastName}
        pic={profile.pic}
        email={profile.email}
        company={profile.company}
        grades={profile.grades}
      />
    })}
  </div>
}