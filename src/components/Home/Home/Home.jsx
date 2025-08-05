import React from 'react'
import Banner from '../Banner/Banner'
import About from '../../../Pages/About/About'
import Rooms from '../Rooms/Rooms'
import Map from '../Map/Map'

const Home = () => {
  return (
    <div>
      <Banner/>
      <About/>
      <Rooms/>
      <Map/>
    </div>
  )
}

export default Home