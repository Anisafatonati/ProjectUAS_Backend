// import PatientController
const PatientController = require('../controllers/PatientController');

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
router.get('/patients', PatientController.index);
router.post('/patients', PatientController.store);
router.put('/patients/:id', PatientController.update);
router.delete('/patients/:id', PatientController.destroy);
// menambahkan route untuk get detail resource
router.get('/patients/:id', PatientController.show);
// Rute untuk pencarian by nama
router.get('/search/:name', PatientController.search);

// Route untuk mendapatkan data patients dengan status positive
router.get('/patients/status/positive', PatientController.getPositive);

// Route untuk mendapatkan data patients dengan status recovered
router.get('/patients/status/recovered', PatientController.getRecovered);

// Route untuk mendapatkan data patients dengan status dead
router.get('/patients/status/dead', PatientController.getDead);


// export router
module.exports = router;
