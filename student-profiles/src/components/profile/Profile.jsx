import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from '../card/Card';
import "./Profile.scss";

export default function Profile(props) {

  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/students')
    .then(res => {
      setProfiles(Array.from(res.data.students))
    })
  }, [])

  return <div className="profile">
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