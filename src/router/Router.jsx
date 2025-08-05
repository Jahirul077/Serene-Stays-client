import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root/Root";
import ErrorPage from './ErrorPage';
import Home from "../components/Home/Home/Home";
import Bookings from "../Pages/Bookings/Bookings";
import About from "../Pages/About/About";
import AvailableRooms from './../Pages/AvailableRooms/AvailableRooms';
import RoomDetails from "../Pages/AvailableRooms/RoomDetails";
import LogIn from "../components/LogIn/LogIn";
import SignUp from "../components/SignUp/SignUp";
import RoomCard from "../Pages/AvailableRooms/RoomCard";
import PrivetRouter from "./PrivetRouter";
import Modal from "../Pages/AvailableRooms/Modal";
import BookingUpdate from './../Pages/Bookings/BookingUpdate';
import Map from "../components/Home/Map/Map";




const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/availableRooms',
                element: <AvailableRooms />,

            },
            {
                path: '/roomCard',
                element: <RoomCard />,

            },
            {
                path: '/roomDetails/:id',
                element: <PrivetRouter><RoomDetails /></PrivetRouter>,
                loader: ({ params }) => fetch(`https://serene-stays-server-ten.vercel.app/allrooms/${params.id}`)
            },
            {
                path: '/modal',
                element: <PrivetRouter><Modal /></PrivetRouter>,
                loader: ({ params }) => fetch(`https://serene-stays-server-ten.vercel.app/allrooms/${params.id}`)
            },
            {
                path: '/bookings',
                element: <PrivetRouter><Bookings /></PrivetRouter>,
            },
            {
                path: '/bookingUpdate',
                element: <PrivetRouter><BookingUpdate /></PrivetRouter>,
            },
            {
                path: '/map',
                element: <Map/>,
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/logIn',
                element: <LogIn />
            },
            {
                path: '/signUp',
                element: <SignUp />
            },
        ]
    },
]);

export default router