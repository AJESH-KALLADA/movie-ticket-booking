import mongoose from "mongoose";
import bookings from "../models/Bookings.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const newBooking = async(req, res, next) => {
    const {movie,date,seatNumber,user} = req.body

    let existingMovie;
    let existingUser;
    try{
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    }
    catch(err){
        return console.log(err);
    }
    if(!existingMovie){
        return res.status(404).json({message: "Movie not found"})
    }
    if(!existingUser) {
        return res.status(404).json({message: "User not found"})
    }

    let Booking;
     
    try {
        Booking = new Bookings({movie,date: new Date('${date}',seatNumber,user),});
        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);
        await existingUser.save({session});
        await existingMovie.save({session});
        await booking.save({session});
        session.commitTransaction();
        
    } catch (err) {
        return console.log(err) 
    }
    if(!newBooking){
        return res.status(500).json({message: "Booking failed" })
    }
    return res.status(201).json({Booking })
};

export const getBookingById = async (req, res, next) => {
    const id = req.params.id;

    let booking;
    try {
        booking = await Bookings.findById(id)
        } catch (err) {
            return console.log(err);
        }
    if(!booking) {
        return res.status(500).json({message: "Unexpected Error"});
    }
    return res.status(200).json({booking});
};

export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Bookings.findByIdAndRemove(id).populate("user movie");
        console.log(booking);
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.user.save({session});
        await booking.movie.save({session});
        session.commitTransaction();
        } catch (err) {
            return console.log(err);
       }
       if (!booking) {
        return res.status(500).json({message: "Unable to Delete"});
    }
    return res.status(200).json({message: "successfully Deleted"});
};