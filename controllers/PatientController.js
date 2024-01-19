// Import Model Patient
const Patient = require('../models/Patient');

// Buat class PatientController
class PatientController {
  // Fungsi untuk menampilkan semua patients
  async index(req, res) {
    const patients = await Patient.all();

    if (patients.length > 0) {
      const data = {
        message: "Menampilkan semua patient",
        data: patients
      };

      return res.status(200).json(data);
    } else {
      const data = {
        message: "patients is empty",
      };

      return res.status(200).json(data);
    }
  }

  // Fungsi untuk menyimpan data patient baru
  async store(req, res) {
    try {
      const newPatient = await Patient.create(req.body);
      const data = {
        message: `Menambahkan data Patient`,
        data: newPatient,
      };
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

  // Fungsi untuk mengupdate data patient berdasarkan ID
  async update(req, res) {
    const { id } = req.params;
  
    try {
      const updatedPatient = await Patient.update(id, req.body);
      const data = {
        message: `Mengedit data patients`,
        data: updatedPatient,
      };
      res.status(200).json(data);
    } catch (error) {
      const data = {
        message: `Error updating patient data`,
        error: error.message,
      };
      res.status(500).json(data);
    }
  }


  // Fungsi untuk menghapus data patient berdasarkan ID
  async destroy(req, res) {
    const { id } = req.params;
  
    try {
      const existingPatient = await Patient.find(id);
  
      if (existingPatient) {
        await Patient.delete(id);
        res.status(200).json({ message: 'Menghapus data patients' });
      } else {
        res.status(404).json({ message: 'Patient not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Fungsi untuk menampilkan detail patient berdasarkan ID
  async show(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      const data = {
        message: `Menampilkan detail Patient`,
        data: patient,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Patient not found`,
      };

      res.status(404).json(data);
    }
  }
  async search(req, res) {
    const { name } = req.params;

    try {
      const searchResults = await Patient.search(name);
      res.status(200).json({
        message: `Search results for '${name}'`,
        data: searchResults,
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async getPositive(req, res) {
    try {
      const positivePatients = await Patient.findByStatus('positive');
      const data = {
        message: 'Menampilkan data patients dengan status positive',
        data: positivePatients,
      };
      res.status(200).json(data);
    } catch (error) {
      const data = {
        message: 'Error fetching positive patients data',
        error: error.message,
      };
      res.status(500).json(data);
    }
  }

  async getRecovered(req, res) {
    try {
      const recoveredPatients = await Patient.findByStatus('recovered');
      const data = {
        message: 'Menampilkan data patients dengan status recovered',
        data: recoveredPatients,
      };
      res.status(200).json(data);
    } catch (error) {
      const data = {
        message: 'Error fetching recovered patients data',
        error: error.message,
      };
      res.status(500).json(data);
    }
  }

  async getDead(req, res) {
    try {
      const deadPatients = await Patient.findByStatus('dead');
      const data = {
        message: 'Menampilkan data patients dengan status dead',
        data: deadPatients,
      };
      res.status(200).json(data);
    } catch (error) {
      const data = {
        message: 'Error fetching dead patients data',
        error: error.message,
      };
      res.status(500).json(data);
    }
  }

}

// Membuat object PatientController
const object = new PatientController();

// Export object PatientController
module.exports = object;
