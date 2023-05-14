const {v4:uuid} = require('uuid');
const Reservacion = require("../database/Reservacion");

const getAllReservaciones = () =>{
    const allReservaciones = Reservacion.getAllReservaciones();
    return allReservaciones;
};

const getOneReservacion = (reservacionId) =>{
    try {
        const reservacion = Reservacion.getOneReservacion(reservacionId);
        return reservacion;
      } catch (error) {
        throw error;
      }
};
    
const createReservacion = (newReservacion) =>{
    const reservacionToInsert = {
        ...newReservacion,
        id: uuid(),
        createdAt: new Date().toLocaleString("es-ES",{timezone: "UTC-07:00"}),
        updatedAt: new Date().toLocaleString("es-ES",{timezone: "UTC-07:00"}),
    };

    try {
        const createdReservacion = Reservacion.createReservacion(reservacionToInsert);
        return createdReservacion;
    } catch (error) {
        throw error;
    }
};

const updateOneReservacion = (reservacionId, changes) =>{
    try {
        const updatedReservacion = Reservacion.updateOneReservacion(reservacionId, changes);
        return updatedReservacion;
      } catch (error) {
        throw error;
      }
};

const deleteOneReservacion = (reservacionId) =>{
    try {
        Reservacion.deleteOneReservacion(reservacionId);
      } catch (error) {
        throw error;
      }
};

module.exports = {
    getAllReservaciones,
    getOneReservacion,
    createReservacion,
    updateOneReservacion,
    deleteOneReservacion,
}