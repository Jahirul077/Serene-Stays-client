import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

const Modal = () => {
  const { user } = useContext(AuthContext);
  const modalLoader = useLoaderData();
  const { _id, room_type, images } = modalLoader;
  // console.log(_id);
  const roomId = _id;

  const today = new Date().toISOString().split("T")[0];

  const handleModal = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = user?.email;
    const checkIn = form.checkIn.value;
    const checkOut = form.checkOut.value;

    const bookedDate = { checkIn, checkOut };
    const bookedForm = { roomId, email, room_type, images, bookedDate };

    fetch(`https://serene-stays-server-ten.vercel.app/allrooms/${roomId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookedDate),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          fetch("https://serene-stays-server-ten.vercel.app/bookings", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookedForm),
          })
            .then((res) => res.json())
            .then((Data) => {
              console.log(Data);
              Swal.fire({
                title: "Room Book Successfuly",
                text: "You clicked the button!",
                icon: "success"
              }).then(() => {
                window.location.reload();
              });;
              document.getElementById("my_modal_3").close();
            });
        }
      });
  };

  return (
    <form onSubmit={handleModal}>
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
          defaultValue={user.email}
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
          name="checkIn"
          type="date"
          placeholder="Select date"
          defaultValue={today}
          className="py-2 px-6 bg-transparent text-black rounded-none border border-black dark:border-2 placeholder:text-black/70 outline-none"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text text-black dark:font-semibold">
            Check Out
          </span>
        </label>
        <input
          name="checkOut"
          type="date"
          placeholder="Select date"
          required
          className="py-2 px-6 bg-transparent text-black rounded-none border border-black dark:border-2 placeholder:text-black/70 outline-none"
        />
      </div>
      <button className="btn w-full mt-4 btn-primary">Confirm</button>
    </form>
  );
};

export default Modal;
