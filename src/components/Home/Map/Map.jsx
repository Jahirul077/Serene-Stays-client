import React from "react";

const Map = () => {
  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.504835964591!2d90.41564787592942!3d23.836200785475885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c700023fd427%3A0x641522159780e7e2!2sLe%20M%C3%A9ridien%20Dhaka!5e0!3m2!1sen!2sbd!4v1732008638034!5m2!1sen!2sbd`;

  return (
    <div className="dark:bg-base-300">
      <div
        className="w-full md:bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url(https://i.postimg.cc/8kxvfKVz/maps.jpg)",
        }}
      >
        <div className="container mx-auto py-32 px-4 grid grid-cols-1 md:grid-cols-3  gap-8">
          <div className="w-full md:h-[250px] lg:h-[400px] col-span-2">
            <iframe
              src={googleMapsUrl}
              className="w-full h-full"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="flex items-center">
            <div>
              <h1 className="text-xl text-white">
                Please subscribe to our newsletter for updates, deals, and
                exclusive offers.
              </h1>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
