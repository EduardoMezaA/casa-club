const express = require("express");
const router = express.Router();
const reservacionController = require("../../controllers/reservacionController");

router
    .get("/", reservacionController.getAllReservaciones)

    .get("/:reservacionId", reservacionController.getOneReservacion)

    .post("/", reservacionController.createReservacion)

    .patch("/:reservacionId", reservacionController.updateOneReservacion)

    .delete("/:reservacionId", reservacionController.deleteOneReservacion);

    module.exports = router;