import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { INITIAL_DRUGS_DATA } from './src/drugsData.js';
import { Prescription, Drug, User } from './src/types.js';

dotenv.config();

let customFilename = '';
let customDirname = '';

try {
  if (typeof __filename !== 'undefined') {
    customFilename = __filename;
  }
} catch (e) {}

try {
  if (typeof __dirname !== 'undefined') {
    customDirname = __dirname;
  }
} catch (e) {}

if (!customFilename) {
  try {
    if (typeof import.meta !== 'undefined' && import.meta && import.meta.url) {
      customFilename = fileURLToPath(import.meta.url);
    }
  } catch (e) {}
}

if (!customDirname && customFilename) {
  customDirname = path.dirname(customFilename);
}

const resolvedDirname = customDirname || process.cwd();

const app = express();
const PORT = 3000;

app.use(express.json());

// Ensure data folder exists
const DATA_DIR = path.join(resolvedDirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Database file paths
const DOCTORS_FILE = path.join(DATA_DIR, 'doctors.json');
const PRESCRIPTIONS_FILE = path.join(DATA_DIR, 'prescriptions.json');
const DRUGS_FILE = path.join(DATA_DIR, 'drugs.json');
const MASTER_DRUGS_FILE = path.join(DATA_DIR, 'master_drugs.json');

// Helper to read JSON safely
function readJSONFile<T>(filePath: string, defaultValue: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
      return defaultValue;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return defaultValue;
  }
}

// Helper to write JSON safely
function writeJSONFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
  }
}

// Initialize database files
const getDoctors = () => readJSONFile<{ [email: string]: User & { passwordHash: string } }>(DOCTORS_FILE, {});
const getPrescriptions = () => readJSONFile<Prescription[]>(PRESCRIPTIONS_FILE, []);
const getDrugs = () => {
  const loaded = readJSONFile<Drug[]>(DRUGS_FILE, INITIAL_DRUGS_DATA);
  if (loaded.length < INITIAL_DRUGS_DATA.length) {
    writeJSONFile(DRUGS_FILE, INITIAL_DRUGS_DATA);
    return INITIAL_DRUGS_DATA;
  }
  return loaded;
};
const getMasterDrugs = () => readJSONFile<Drug[]>(MASTER_DRUGS_FILE, []);

// Save initial drugs to file if not exists or is smaller
if (!fs.existsSync(DRUGS_FILE) || readJSONFile<Drug[]>(DRUGS_FILE, []).length < INITIAL_DRUGS_DATA.length) {
  writeJSONFile(DRUGS_FILE, INITIAL_DRUGS_DATA);
}

// API Routes

// Register Doctor
app.post('/api/auth/register', (req, res) => {
  const { email, password, name, specialization, code } = req.body;
  
  if (!email || !password || !name || !code) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (code !== 'REGISTER_MERCY') {
    return res.status(400).json({ error: 'Invalid registration code' });
  }

  const doctors = getDoctors();
  const normalizedEmail = email.toLowerCase().trim();

  if (doctors[normalizedEmail]) {
    return res.status(400).json({ error: 'Doctor already registered with this email' });
  }

  doctors[normalizedEmail] = {
    email: normalizedEmail,
    name,
    specialization: specialization || 'General Practitioner',
    passwordHash: password, // simple storage as per lightweight local instructions
  };

  writeJSONFile(DOCTORS_FILE, doctors);
  return res.json({ success: true, user: { email: normalizedEmail, name, specialization } });
});

// Login Doctor
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const doctors = getDoctors();
  const normalizedEmail = email.toLowerCase().trim();
  const doctor = doctors[normalizedEmail];

  if (!doctor || doctor.passwordHash !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  return res.json({
    success: true,
    user: {
      email: doctor.email,
      name: doctor.name,
      specialization: doctor.specialization
    }
  });
});

// Get Drug Inventory
app.get('/api/drugs', (req, res) => {
  return res.json(getDrugs());
});

// Get Master Drug Catalog (Excel-imported)
app.get('/api/master-drugs', (req, res) => {
  return res.json(getMasterDrugs());
});

// Update or Import Master Drug Catalog from Excel/CSV payload
app.post('/api/master-drugs', (req, res) => {
  let payload = req.body;
  if (payload && !Array.isArray(payload) && Array.isArray(payload.drugs)) {
    payload = payload.drugs;
  }

  if (!Array.isArray(payload)) {
    return res.status(400).json({ error: 'Payload must be an array of drugs or an object with a drugs array' });
  }

  // Validate and clean imported drugs
  const cleaned: Drug[] = payload.map((item: any, idx) => {
    return {
      id: item.id || `master-${Date.now()}-${idx}`,
      category: String(item.category || 'GENERAL').toUpperCase().trim(),
      drugName: String(item.drugName || item.composition || item.genericName || 'Unknown Composition').trim(),
      productName: String(item.productName || item.brandName || item.name || 'Unknown Brand').trim(),
      quantity: Number(item.quantity) || 0,
      batch: String(item.batch || 'N/A').trim(),
      expiryDate: String(item.expiryDate || 'N/A').trim(),
      purchaseRate: Number(item.purchaseRate) || 0,
      saleRate: Number(item.saleRate) || 0
    };
  });

  writeJSONFile(MASTER_DRUGS_FILE, cleaned);
  return res.json({ success: true, count: cleaned.length });
});

// Add Custom Drug to Inventory
app.post('/api/drugs', (req, res) => {
  const newDrug: Omit<Drug, 'id'> = req.body;
  if (!newDrug.drugName || !newDrug.productName || !newDrug.category) {
    return res.status(400).json({ error: 'Drug name, Product name and Category are required' });
  }

  const drugs = getDrugs();
  const drugToAdd: Drug = {
    ...newDrug,
    id: 'custom-' + Date.now(),
    quantity: Number(newDrug.quantity) || 0,
    purchaseRate: Number(newDrug.purchaseRate) || 0,
    saleRate: Number(newDrug.saleRate) || 0
  };

  drugs.push(drugToAdd);
  writeJSONFile(DRUGS_FILE, drugs);
  return res.json({ success: true, drug: drugToAdd });
});

// Update Drug Quantity (Restock or Adjust)
app.patch('/api/drugs/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  if (quantity === undefined) {
    return res.status(400).json({ error: 'Quantity is required' });
  }

  const drugs = getDrugs();
  const drugIndex = drugs.findIndex(d => d.id === id);
  if (drugIndex === -1) {
    return res.status(404).json({ error: 'Drug not found' });
  }

  drugs[drugIndex].quantity = Number(quantity);
  writeJSONFile(DRUGS_FILE, drugs);
  return res.json({ success: true, drug: drugs[drugIndex] });
});

// Create Prescription
app.post('/api/prescriptions', (req, res) => {
  const prescriptionData: Omit<Prescription, 'id' | 'date'> = req.body;
  if (!prescriptionData.patientName || !prescriptionData.doctorEmail) {
    return res.status(400).json({ error: 'Patient name and Doctor email are required' });
  }

  const prescriptions = getPrescriptions();
  const id = 'rx-' + Math.random().toString(36).substr(2, 9);
  
  const newPrescription: Prescription = {
    ...prescriptionData,
    id,
    date: new Date().toISOString()
  };

  prescriptions.push(newPrescription);
  writeJSONFile(PRESCRIPTIONS_FILE, prescriptions);

  // Deduct stock if drugs are from the inventory list
  const drugs = getDrugs();
  let stockUpdated = false;

  newPrescription.medications.forEach(med => {
    const drug = drugs.find(d => d.id === med.drugId || d.productName.toLowerCase() === med.productName.toLowerCase());
    if (drug) {
      // deduclt standard dosage amount, e.g. 1 unit or try parsing instructions
      const durationNum = parseInt(med.duration) || 5;
      let dailyQty = 2; // default
      if (med.frequency.includes('-')) {
        dailyQty = med.frequency.split('-').reduce((acc, val) => acc + (parseInt(val) || 0), 0);
      } else if (med.frequency === 'OD') {
        dailyQty = 1;
      } else if (med.frequency === 'BD') {
        dailyQty = 2;
      } else if (med.frequency === 'TDS') {
        dailyQty = 3;
      }
      const totalRequired = dailyQty * durationNum;
      drug.quantity = Math.max(0, drug.quantity - totalRequired);
      stockUpdated = true;
    }
  });

  if (stockUpdated) {
    writeJSONFile(DRUGS_FILE, drugs);
  }

  return res.json({ success: true, prescription: newPrescription });
});

// Edit Prescription
app.put('/api/prescriptions/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const prescriptions = getPrescriptions();
  const index = prescriptions.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Prescription not found' });
  }

  const originalPrescription = prescriptions[index];
  const originalDate = originalPrescription.originalDate || originalPrescription.date;

  prescriptions[index] = {
    ...originalPrescription,
    ...updatedData,
    id, // ensure ID is preserved
    isEdited: true,
    originalDate,
    lastEditedDate: new Date().toISOString()
  };

  writeJSONFile(PRESCRIPTIONS_FILE, prescriptions);
  return res.json({ success: true, prescription: prescriptions[index] });
});

// Get Prescriptions (for current doctor history)
app.get('/api/prescriptions', (req, res) => {
  const { doctorEmail } = req.query;
  const prescriptions = getPrescriptions();
  
  if (doctorEmail) {
    const filtered = prescriptions.filter(p => p.doctorEmail.toLowerCase() === (doctorEmail as string).toLowerCase());
    return res.json(filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }

  return res.json(prescriptions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
});

// Get Single Prescription (Public share route for Pharmacists!)
app.get('/api/prescriptions/:id', (req, res) => {
  const { id } = req.params;
  const prescriptions = getPrescriptions();
  const prescription = prescriptions.find(p => p.id === id);
  
  if (!prescription) {
    return res.status(404).json({ error: 'Prescription not found' });
  }

  return res.json(prescription);
});

// Delete a prescription from history
app.delete('/api/prescriptions/:id', (req, res) => {
  const { id } = req.params;
  let prescriptions = getPrescriptions();
  const initialLength = prescriptions.length;
  prescriptions = prescriptions.filter(p => p.id !== id);
  
  if (prescriptions.length === initialLength) {
    return res.status(404).json({ error: 'Prescription not found' });
  }

  writeJSONFile(PRESCRIPTIONS_FILE, prescriptions);
  return res.json({ success: true });
});

// Serve static assets from Vite build in production
const DIST_DIR = path.join(resolvedDirname, 'dist');
app.use(express.static(DIST_DIR));

// Fallback all routes to index.html for React SPA
app.get('*', (req, res, next) => {
  // Ignore API requests
  if (req.path.startsWith('/api')) {
    return next();
  }
  
  const indexHtml = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexHtml)) {
    return res.sendFile(indexHtml);
  } else {
    // Development fallback
    return res.status(200).send('Mercy Clinic Backend Server running. Client dist not built yet. Please build before serving.');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Mercy Server] Server listening on http://0.0.0.0:${PORT}`);
});
