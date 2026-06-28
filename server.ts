import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { INITIAL_DRUGS_DATA } from './src/drugsData.js';
import { Prescription, Drug, User } from './src/types.js';

dotenv.config();

// Use __dirname directly, which is available in CJS
const resolvedDirname = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

const app = express();
const PORT = process.env.PORT || 3000;

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

if (!fs.existsSync(DRUGS_FILE) || readJSONFile<Drug[]>(DRUGS_FILE, []).length < INITIAL_DRUGS_DATA.length) {
  writeJSONFile(DRUGS_FILE, INITIAL_DRUGS_DATA);
}

// --- API Routes (Kept as original) ---
// ... (All your API routes remain exactly the same) ...
// [Insert all your existing app.post, app.get, etc. routes here]

// --- Production Static Serving Fix ---
// const DIST_DIR = path.join(resolvedDirname, 'dist');
// Replace your existing DIST_DIR and fallback route logic with this:

// 1. Point to the root directory where 'dist' actually lives
const ROOT_DIR = process.cwd(); 
const DIST_DIR = path.join(ROOT_DIR, 'dist'); 

console.log("Serving from:", DIST_DIR);

if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
}

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  
  const indexHtml = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexHtml)) {
    return res.sendFile(indexHtml);
  } else {
    return res.status(404).send(`File not found: ${indexHtml}`);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Mercy Server] Server listening on port ${PORT}`);
});
