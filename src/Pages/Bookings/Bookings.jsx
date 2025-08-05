import React, { useContext, useEffect, useState } from "react";
import Navber from "../../components/share/Navber/Navber";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import moment from "moment";
import BookingUpdate from "./BookingUpdate";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Bookings = () => {

  const { user, } = useContext(AuthContext);
  const [booking, setBooking] = useState([]);
  const axisoSecure = useAxiosSecure()

  const url = `/bookings?email=${user?.email}`

  useEffect(() => {

    axisoSecure.get(url)
    .then(res => {
      setBooking(res.data)
    })

    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => {
    //     setBooking(data);
    //   })
  }, [])


  const formetDate = (dateString) => {
    return moment(dateString).format('DD MMMM YYYY')
  }

  const handleDelete = (id, roomId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://serene-stays-server-ten.vercel.app/allrooms/${roomId}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            if (data.modifiedCount) {
              fetch(`https://serene-stays-server-ten.vercel.app/bookings/${id}`, {
                method: 'DELETE'
              })
                .then(res => res.json())
                .then(data => {
                  console.log(data);
                  if (data.deletedCount) {
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success"
                    });

                    const remaing = booking.filter(booked => booked._id !== id)
                    setBooking(remaing);
                  }
                })
            }
          });


      }
    });
  };





  return (
    <div className="dark:bg-base-300 bg-[#f8f5f0]">
      <div
        className="w-full md:bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(https://i.postimg.cc/y6rfqGBP/2.jpg)" }}
      >
        <Navber />
        <div className="container mx-auto px-4">
          <div className="space-y-4 py-32">
            <p className="text-white tracking-[7px] md:text-xl font-Barlow">
              Availabilitiy
            </p>
            <h1 className=" md:text-7xl text-6xl text-white font-mono">
              Booked by Your Rooms
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {
            booking.map(book =>

              <section key={book._id}>

                <div className=" bg-base-100 dark:bg-base-200  md:w-96 shadow-xl group hover:shadow-2xl transition duration-300 ease-in-out">
                  <figure className="overflow-hidden">
                    <div className="flex justify-end">
                      <div className="absolute z-10 ">
                        <button onClick={() => handleDelete(book._id, book.roomId)} className="btn btn-sm btn-circle m-2 text-white  bg-red-500 rounded-full">✕</button>
                      </div>
                    </div>
                    <img
                      src={book.images}
                      alt=""
                      className="  group-hover:scale-110 transition-transform duration-300 ease-in-out"
                    />
                  </figure>
                  <div className="card-body space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">{book.room_type}</h2>
                    </div>
                    <h2>Check In: {formetDate(book.bookedDate.checkIn)}</h2>
                    <h2>Check Out: {formetDate(book.bookedDate.checkOut)}</h2>
                    <div className="card-actions flex justify-between">
                      <Link to={`/roomDetails/${book.roomId}`}>
                        <button className=" py-2 px-4 bg-green-800 hover:bg-green-500 text-white uppercase ">
                          Details
                        </button>
                      </Link>
                      <button
                        className=" py-2 px-4 text-white bg-cyan-700 hover:bg-cyan-500"
                        onClick={() => document.getElementById('my_modal_3').showModal()}
                      >
                        UPDATE
                      </button>

                      <dialog id="my_modal_3" className="modal">
                        <div className="modal-box dark:bg-white dark:text-black">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <h3 className="font-bold text-lg py-4">{book.room_type}</h3>
                          <BookingUpdate book={book} />
                        </div>
                      </dialog>
                    </div>
                  </div>
                </div>
              </section>

            )
          }
        </div>
      </div>
    </div>
  );
};

export default Bookings;
