import React, { useEffect, useState } from "react";
import Navber from "../../components/share/Navber/Navber";
import RoomCard from "./RoomCard";

const AvailableRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("https://serene-stays-server-ten.vercel.app/allrooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  return (
    <div className="dark:bg-base-300 bg-[#f8f5f0]">
      <div
        className="w-full md:bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(https://i.postimg.cc/3J4t3ZxH/1.jpg)" }}
      >
        <Navber />
        <div className="container mx-auto px-4">
          <div className="space-y-4 py-32">
            <p className="text-white tracking-[7px] md:text-xl font-Barlow">
              The Cappa Luxury Hotel
            </p>
            <h1 className=" md:text-7xl text-6xl text-white font-mono">
              Rooms & Suites
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rooms.map((roomCard) => <RoomCard key={roomCard._id} roomCard={roomCard} />)}
        </div>
      </div>
    </div>
  );
};

export default AvailableRooms;
