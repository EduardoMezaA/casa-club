//const { createReservacion } = require('../services/reservacionService');
const DB = require('./db.json');
const {saveToDatabase} = require("./utils");

const getAllReservaciones = () =>{
    return DB.reservaciones;
};

const createReservacion = (newReservacion) =>{
    try {
        const isAlreadyAdded = DB.reservaciones.findIndex(
            (reservacion) => reservacion.fecha_reservacion === newReservacion.fecha_reservacion) > -1;

        if(isAlreadyAdded){
            throw {
                status: 400,
                message: `Reservacion con fecha '${newReservacion.fecha_reservacion}' ya existe`,
            };
        }

        DB.reservaciones.push(newReservacion);
        saveToDatabase(DB);
        return newReservacion;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
      }
};

const getOneReservacion = (reservacionId) => {
    try {
      const reservacion = DB.reservaciones.find((reservacion) => reservacion.id === reservacionId);
  
      if (!reservacion) {
        throw {
          status: 400,
          message: `No se encuentra reservacion con id '${reservacionId}'`,
        };
      }
  
      return reservacion;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

const updateOneReservacion = (reservacionId, changes) => {
    try {
      const isAlreadyAdded =
        DB.reservaciones.findIndex((reservacion) => reservacion.fecha_reservacion === changes.fecha_reservacion) > -1;
  
      if (isAlreadyAdded) {
        throw {
          status: 400,
          message: `Reservacion con misma fecha '${changes.fecha_reservacion}' ya existe`,
        };
      }
  
      const indexForUpdate = DB.reservaciones.findIndex(
        (reservacion) => reservacion.id === reservacionId
      );
  
      if (indexForUpdate === -1) {
        throw {
          status: 400,
          message: `No se encuentra reservacion con id '${reservacionId}'`,
        };
      }
  
      const updatedReservacion = {
        ...DB.reservaciones[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString("es-ES",{timezone: "UTC-07:00"}),
      };
  
      DB.reservaciones[indexForUpdate] = updatedReservacion;
      saveToDatabase(DB);
  
      return updatedReservacion;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
};

const deleteOneReservacion = (reservacionId) => {
    try {
      const indexForDeletion = DB.reservaciones.findIndex(
        (reservacion) => reservacion.id === reservacionId
      );
      if (indexForDeletion === -1) {
        throw {
          status: 400,
          message: `No se encuentra reservacion con id '${reservacionId}'`,
        };
      }
      DB.reservaciones.splice(indexForDeletion, 1);
      saveToDatabase(DB);
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {
    getAllReservaciones,
    createReservacion,
    getOneReservacion,
    updateOneReservacion,
    deleteOneReservacion,
};