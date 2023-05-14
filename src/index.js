const express = require('express');
const v1ReservacionRouter = require("./v1/routes/reservacionRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/reservaciones", v1ReservacionRouter);

app.listen(PORT, () =>{console.log(`Server listening on port ${PORT}`)});