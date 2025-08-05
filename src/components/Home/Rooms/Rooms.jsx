import React, { useEffect, useState } from "react";
import RoomCard from "../../../Pages/AvailableRooms/RoomCard";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [cardToShow, setCardToShow] = useState(3)
  const [fade, serFade] = useState(false);

  useEffect(() => {
    fetch("https://serene-stays-server-ten.vercel.app/allrooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  useEffect(() => {
    const updateCardsT0show = () => {
      if (window.innerWidth < 650) {
        setCardToShow(1)
      }
      else if (window.innerWidth < 1024) {
        setCardToShow(2);
      }
      else {
        setCardToShow(3)
      }
    }

    updateCardsT0show();
    window.addEventListener('resize', updateCardsT0show)

    return () => window.addEventListener('resize', updateCardsT0show)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      serFade(true)
      setTimeout(() => {
        setCurrentCard((prevCard) =>
          prevCard + cardToShow >= rooms.length ? 0 : prevCard + cardToShow
        );
        serFade(false)
      }, 800);
    }, 5000)

    return () => clearInterval(interval);
  }, [rooms,cardToShow]);

  const visibleRooms = rooms.slice(currentCard, currentCard + cardToShow);

  return (
    <div className="bg-[#f8f5f0] dark:bg-base-200 py-32 h-[900px]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="space-y-4">
          <p className="tracking-[0.4em] font-Barlow">The Cappa Luxury Hotel</p>
          <h2 className="text-5xl ">Rooms & Suites</h2>
        </div>
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-24 py-8 transition-opacity duration-500 ease-in-out ${fade ? 'opacity-0' : 'opacity-100'}`}>
          {visibleRooms.map((roomCard) => (
            <RoomCard key={roomCard._id} roomCard={roomCard} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
