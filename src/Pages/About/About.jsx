import React from "react";
import { PiPhoneCall } from "react-icons/pi";
import Navber from "../../components/share/Navber/Navber";
import { useLocation } from "react-router-dom";

const About = () => {

  const loction  = useLocation();

  return (
    <div>
      <div className='bg-gray-500 dark:bg-black '>
        {
          loction.pathname === '/about' && <Navber/>
        }
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 my-32 gap-12 px-4 ">
        <div className="space-y-8 text-gray-500">
          <p className="tracking-[0.6em]">The Cappa Luxury Hotel</p>
          <h2 className="text-4xl md:text-6xl  text-black dark:text-white">
            Enjoy a Luxury Experience
          </h2>
          <p className="text-wrap">
            Welcome to the best five-star deluxe hotel in New York. Hotel
            elementum sesue the aucan vestibulum aliquam justo in sapien rutrum
            volutpat. Donec in quis the pellentesque velit. Donec id velit ac
            arcu posuere blane.
          </p>
          <p className="text-wrap">
            Hotel ut nisl quam nestibulum ac quam nec odio elementum sceisue the
            aucan ligula. Orci varius natoque penatibus et magnis dis parturient
            monte nascete ridiculus mus nellentesque habitant morbine.
          </p>
          <div className="flex items-center gap-4 text-yellow-700">
            <PiPhoneCall size={44} />
            <div>
              <p>Reservation</p>
              <h2 className="text-2xl">855 100 4444</h2>
            </div>
          </div>
        </div>
        <div className="flex gap-4  md:gap-8 justify-center ">
          <img
            src="https://i.postimg.cc/d1vmf70g/4.jpg"
            className="w-[220px] md:w-[261px] mt-32"
            alt=""
          />
          <img
            src="https://i.postimg.cc/25n7TdC4/2.jpg"
            className="w-[220px] md:w-[261px] mb-32"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default About;
