import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RoomCard = ({ roomCard }) => {
  const {
    _id,
    room_type,
    price_per_night,
    special_offers,
    images,
    Availability,
  } = roomCard;

  const [available, setAvailable] = useState(true);

  // Ensure Availability exists
  const checkIn = Availability?.checkIn || null;
  const checkOut = Availability?.checkOut || null;

  const checkInDate = moment(checkIn, "YYYY-MM-DD");
  const checkOutDate = moment(checkOut, "YYYY-MM-DD");
  const today = moment().startOf("day"); // Specify the unit

  useEffect(() => {
    if (checkInDate.isValid() && checkOutDate.isValid()) {
      today.isBetween(checkInDate, checkOutDate, undefined, "[]")
        ? setAvailable(false)
        : setAvailable(true);
    } else {
      setAvailable(true); // Default to available if dates are invalid
    }
  }, [checkInDate, checkOutDate, today]);

  return (
    <div className="bg-base-100  md:w-96 shadow-xl group hover:shadow-2xl transition duration-300 ease-in-out">
      <figure className="overflow-hidden relative ">
        <img
          src={images}
          alt=""
          className=" group-hover:scale-110 transition-transform duration-300 ease-in-out"
        />
        <div className="">
          {available ? 
            <p className="bg-green-600/80 text-white font-bold btn btn-sm absolute z-20 top-0 right-0 py-2 px-4 border-none rounded-none">
              Available
            </p>
           : 
            <p className="bg-red-600/80 text-white font-bold btn btn-sm absolute z-20 top-0 right-0 py-2 px-4 border-none rounded-none ">
              Booked
            </p>
          }
        </div>
      </figure>

      <div className="card-body space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{room_type}</h2>
          <h2>
            <span className="font-semibold text-yellow-700">
              {price_per_night}$
            </span>
            /NIGHT
          </h2>
        </div>
        <div className="text-lg">
          <h2 className="font-semibold">Special Offers: </h2>
          {special_offers === null ? (
            <p className="text-red-500 font-semibold">No offers</p>
          ) : (
            special_offers
          )}
        </div>
        <div className="card-actions">
          <Link to={`/roomDetails/${_id}`}>
            <button className="btn bg-lime-200 text-lime-700 dark:bg-slate-700 uppercase">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
