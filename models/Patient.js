// Import database
const db = require('../config/database');

// Create Patient class
class Patient {
  // Retrieve all patients
  static all() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM patients`;
      db.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  // Create a new patient
  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO patients SET ?";
      db.query(sql, data, (err, results) => {
        if (err) {
          return reject(err);
        }
        const newPatientId = results.insertId;
  
        const getNewPatientQuery = "SELECT * FROM patients WHERE id = ?";
        db.query(getNewPatientQuery, newPatientId, (err, results) => {
          if (err) {
            return reject(err);
          }
          const newPatient = results[0];
          resolve(newPatient);
        });
      });
    });
  }
  

  // Update patient by ID
  static async update(id, data) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE patients SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) {
          return reject(err);
        }

        const getUpdatedPatientQuery = "SELECT * FROM patients WHERE id = ?";
        db.query(getUpdatedPatientQuery, id, (err, results) => {
          if (err) {
            return reject(err);
          }

          const updatedPatient = results[0];
          resolve(updatedPatient);
        });
      });
    });
  }

  

  // Delete patient by ID
static delete(id) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM patients WHERE id = ?';
    db.query(sql, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

  
  

  // Find patient by ID
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        if (err) {
          return reject(err);
        }
        const patient = results[0];
        resolve(patient);
      });
    });
  }

  // Search patients by name
  static search(name) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM patients WHERE name LIKE ?`;
      db.query(query, [`%${name}%`], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE status = ?";
      db.query(query, [status], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}

// Export the Patient class
module.exports = Patient;
