const reservacionService = require("../services/reservacionService");

const getAllReservaciones = (req, res) =>{
    const allReservaciones = reservacionService.getAllReservaciones();
    res.send({status: "OK", data: allReservaciones});
};

const getOneReservacion = (req, res) =>{
    const {
        params: { reservacionId },
      } = req;
    
      if (!reservacionId) {
        res.status(400).send({
          status: "FAILED",
          data: { error: "Parameter ':reservacionId' can not be empty" },
        });
        return;
      }
    
      try {
        const reservacion = reservacionService.getOneReservacion(req.params.reservacionId);
        res.send({ status: "OK", data: reservacion });
      } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }

};

const createReservacion = (req, res) =>{
    const{body} = req;

    if(!body.fecha_reservacion || !body.numero_invitados || !body.tipo_evento || !body.condominio){
        res.status(400).send({
            status: "FAILED",
            data: {
              error:
                "FALTAN PARAMETROS",
            },
          });
        return;
    }

    const newReservacion = {
        fecha_reservacion: body.fecha_reservacion,
        numero_invitados: body.numero_invitados,
        tipo_evento: body.tipo_evento,
        condominio: body.condominio
    };

    try {
        const createdReservacion = reservacionService.createReservacion(newReservacion);
        res.status(201).send({status: "OK", data: createdReservacion});
    } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILDED", data: { error: error?.message || error } });
      }
};

const updateOneReservacion = (req, res) =>{
    const {
        body,
        params: {reservacionId},
      } = req;
    
      if (!reservacionId) {
        res.status(400).send({
          status: "FAILED",
          data: { error: "Parameter ':reservacionId' can not be empty" },
        });
      }
    
      try {
        const updatedReservacion = reservacionService.updateOneReservacion(reservacionId,body);
        res.send({ status: "OK", data: updatedReservacion });
      } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
};

const deleteOneReservacion = (req, res) =>{
    const {
        params: {reservacionId},
      } = req;
    
      if (!reservacionId) {
        res.status(400).send({
          status: "FAILED",
          data: { error: "Parameter ':reservacionId' can not be empty" },
        });
      }
    
      try {
        reservacionService.deleteOneReservacion(reservacionId);
        res.status(204).send({ status: "OK" });
      } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
};

module.exports = {
    getAllReservaciones,
    getOneReservacion,
    createReservacion,
    updateOneReservacion,
    deleteOneReservacion,
};