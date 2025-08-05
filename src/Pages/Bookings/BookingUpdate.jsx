import React, { useState } from "react";
import Swal from "sweetalert2";


const BookingUpdate = ({ book }) => {
  const { _id, roomId, bookedDate } = book;
  // console.log(book);
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(
    bookedDate?.checkIn ? new Date(bookedDate.checkIn) : null
  );
  const [endDate, setEndDate] = useState(
    bookedDate?.checkOut ? new Date(bookedDate.checkOut) : null
  );


  const handleBookingUpdateForm = (e) => {
    e.preventDefault();

    const checkIn = startDate ? new Date(startDate).toISOString().slice(0, 10) : null;
    const checkOut = endDate ? new Date(endDate).toISOString().slice(0, 10) : null;

    const updateBookedDate = { checkIn, checkOut };

    fetch(`https://serene-stays-server-ten.vercel.app/allrooms/${roomId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateBookedDate),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          fetch(`https://serene-stays-server-ten.vercel.app/bookings/${_id}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updateBookedDate),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.modifiedCount) {
                document.getElementById("my_modal_3").close();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your Room book has been Updated",
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                  window.location.reload();
                });
              }              
            });
        }
      });
  };


  return (
    <div>
      <div>
        <form onSubmit={handleBookingUpdateForm}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black dark:font-semibold">
                Email
              </span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
              defaultValue={book.email}
              className="py-2 px-6 bg-transparent text-black rounded-none border border-black dark:border-2 placeholder:text-black/70 outline-none"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black dark:font-semibold">
                Check In
              </span>
            </label>
            <input
              onChange={(e) => setStartDate(new Date(e.target.value))}
              name="checkIn"
              type="date"
              placeholder="Select date"
              disabled
              defaultValue={today}
              className="disabled:opacity-30 py-2 px-6 bg-transparent text-black rounded-none border border-black dark:border-2 placeholder:text-black/70 outline-none"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-black dark:font-semibold">
                Check Out
              </span>
            </label>
            <input
              onChange={(e) => setEndDate(new Date(e.target.value))}
              name="checkOut"
              type="date"
              placeholder="Select date"
              required
              className="py-2 px-6 bg-transparent text-black rounded-none border border-black dark:border-2 placeholder:text-black/70 outline-none"
            />
          </div>
          <button className="btn w-full mt-4 btn-primary">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default BookingUpdate;
