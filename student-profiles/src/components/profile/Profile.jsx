import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from '../card/Card';
import "./Profile.scss";
import Search from '../search/Search';

export default function Profile(props) {

  const [profiles, setProfiles] = useState([])
  const [searchContent, setSearchContent] = useState('')
  const [searchTag, setSearchTag] = useState('')
  const [tags, setTags] = useState([])

  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/students')
    .then(res => {
      const data = Array.from(res.data.students)

      if (searchTag) {
        const tagsResult = tags.filter(tag => {
          const inputTag = tag.inputTag
          return inputTag.includes(searchTag)
        })
        const ids = tagsResult.map(tag => tag.id)
        const searchTagResult = data.filter(d => ids.includes(d.id))
        console.log(searchTagResult)
        setProfiles(searchTagResult)
      } else if (searchContent) {
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
  }, [searchContent, searchTag])

  return <div className="profile">
    <Search setSearchContent={setSearchContent} placeHolder="Search by name"/>
    <Search setSearchContent={setSearchTag} placeHolder="Search by tag"/>
    {profiles && profiles.map(profile => {
      return <Card 
        key={profile.id}
        id={profile.id}
        firstName={profile.firstName}
        lastName={profile.lastName}
        pic={profile.pic}
        email={profile.email}
        company={profile.company}
        grades={profile.grades}
        skill={profile.skill}
        tags={tags}
        setTags={setTags}
      />
    })}
  </div>
}