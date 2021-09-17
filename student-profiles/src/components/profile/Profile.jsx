import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from '../card/Card';
import "./Profile.scss";
import Search from '../search/Search';

export default function Profile() {

  const [data, setData] = useState([])
  const [profiles, setProfiles] = useState([])
  const [searchContent, setSearchContent] = useState('')
  const [searchTag, setSearchTag] = useState('')
  const [tags, setTags] = useState([])

  const filterTag = () => {
    return tags.filter(tag => {
      const inputTag = tag.inputTag
      return inputTag.includes(searchTag)
    })
  }

  const filterName = (data) => {
    return data.filter(d => {
      const first = d.firstName
      const last = d.lastName
      const name = first.toLowerCase() + ' ' + last.toLowerCase()
      return name.includes(searchContent)
    })
  }

  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/students')
    .then(res => {
      const inportData = Array.from(res.data.students)
      setData(inportData)
    })
  }, [])

  useEffect(() => {
    if (searchTag && setSearchContent){
      const tagsResult = filterTag()
      const ids = tagsResult.map(tag => tag.id)
      const searchTagResult = data.filter(d => ids.includes(d.id))
      setProfiles(filterName(searchTagResult))
    } else if (searchTag) {
      const tagsResult = filterTag()
      const ids = tagsResult.map(tag => tag.id)
      const searchTagResult = data.filter(d => ids.includes(d.id))
      setProfiles(searchTagResult)
    } else if (searchContent) {
      setProfiles(filterName(data))
    } else {
      setProfiles(data)
    }
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