import { useLoaderData } from "react-router-dom";
import Navber from "../../components/share/Navber/Navber";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import moment from "moment";

const RoomDetails = () => {
  const roomLoader = useLoaderData();
  const {
    room_type,
    price_per_night,
    images,
    description,
    facilities,
    Availability,
  } = roomLoader;

  const [available, setAvailable] = useState(true);

  const checkIn = Availability?.checkIn || null;
  const checkOut = Availability?.checkOut || null;

  const checkInDate = moment(checkIn, "YYYY-MM-DD");
  const checkOutDate = moment(checkOut, "YYYY-MM-DD");
  const today = moment().startOf("day");

  useEffect(() => {
    if (checkInDate.isValid() && checkOutDate.isValid()) {
      const isAvailable = !today.isBetween(
        checkInDate,
        checkOutDate,
        undefined,
        "[]"
      );
      setAvailable(isAvailable);
    } else {

      setAvailable(true);
    }
  }, [checkInDate, checkOutDate, today]);

  return (
    <div>
      <div
        className="w-full bg-cover bg-center bg-fixed h-screen"
        style={{ backgroundImage: `url(${images})` }}
      >
        <Navber />
        <div className="container mx-auto px-4">
          <div className="space-y-4 flex items-center pt-40">
            <div className="p-8 bg-gradient-to-r from-black/15">
              <p className="text-white tracking-[7px] md:text-xl font-Barlow">
                The Cappa Luxury Hotel
              </p>
              <h1 className="md:text-7xl text-5xl text-white font-mono">
                Room Details
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-24 px-4 md:flex gap-24">
        <div className="w-3/4 space-y-8">
          <h2 className="text-4xl">{room_type}</h2>
          <p className="text-2xl">
            <span className="text-yellow-600 font-semibold">
              {price_per_night}$
            </span>
            Per Night
          </p>
          <p className="text-gray-500">{description}</p>

          <div className="md:flex gap-20 space-y-5 md:space-y-0">
            <div className="space-y-2">
              <h2 className="text-2xl">Check-in</h2>
              <p className="text-gray-500">Check-in from 9:00 AM - anytime</p>
              <p className="text-gray-500">
                Early check-in subject to availability
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl">Check-out</h2>
              <p className="text-gray-500">Check-out before noon</p>
              <p className="text-gray-500">Express check-out</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl">Special check-in instructions</h2>
            <p className="text-gray-500">
              Guests will receive an email 5 days before arrival with check-in
              instructions; front desk staff will greet guests on arrival. For
              more details, please contact the property using the information on
              the booking confirmation.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl">Pets</h2>
            <p className="text-gray-500">Pets not allowed</p>
          </div>

          {/* Booking Button */}

          {available ? (
            <button
              className="tracking-[6px] py-2 px-4 text-white bg-yellow-600 hover:bg-yellow-500"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              BOOK NOW
            </button>
          ) : (
            <button className="tracking-[6px] py-2 px-4 text-white bg-red-600 hover:bg-red-500">
              Booked
            </button>
          )}

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box dark:bg-white dark:text-black">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg py-4">{room_type}</h3>
              <Modal />
            </div>
          </dialog>
        </div>
        <div className="pt-32 space-y-4">
          <h2 className="text-2xl">Amenities</h2>
          <ul className="space-y-2">
            {facilities.map((fac, index) => (
              <li key={index}>{fac}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
