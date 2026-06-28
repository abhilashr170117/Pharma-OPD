import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { 
  Activity, Search, Plus, Printer, Share2, LogOut, Filter, 
  Calendar, User, Check, FileText, PlusCircle, Trash2, 
  AlertTriangle, Eye, Shield, Key, Sparkles, Building, Phone, 
  ArrowLeft, Pill, ClipboardList, CheckCircle, Save, Edit
} from 'lucide-react';
import { Drug, Prescription, PrescriptionMedication, User as DoctorUser, PrescriptionVitals } from './types';
import { getDosageGuidelines } from './drugsData';

export default function App() {
  // Routing and Share state
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'register' | 'dashboard' | 'prescription-builder' | 'inventory' | 'history' | 'share-view'>('landing');
  const [sharePrescription, setSharePrescription] = useState<Prescription | null>(null);
  const [shareLoading, setShareLoading] = useState<boolean>(false);
  const [shareError, setShareError] = useState<string>('');

  // Authentication State
  const [doctor, setDoctor] = useState<DoctorUser | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authSpecialization, setAuthSpecialization] = useState('General Medicine');
  const [authCode, setAuthCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Drug inventory state
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [masterDrugs, setMasterDrugs] = useState<Drug[]>([]);
  const [inventorySearch, setInventorySearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [stockFilter, setStockFilter] = useState('ALL');
  const [isAddingDrug, setIsAddingDrug] = useState(false);
  const [showBatchColumn, setShowBatchColumn] = useState(true);

  // Excel formulary importing states
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [parsedExcelData, setParsedExcelData] = useState<any[]>([]);
  const [excelError, setExcelError] = useState<string>('');
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [importSuccess, setImportSuccess] = useState<string>('');
  const [inventorySubTab, setInventorySubTab] = useState<'single' | 'excel'>('single');
  
  // Custom form validation and case editing states
  const [bypassValidation, setBypassValidation] = useState(false);
  const [editingPrescriptionId, setEditingPrescriptionId] = useState<string | null>(null);
  
  // New drug form state
  const [newDrug, setNewDrug] = useState({
    category: 'TABLETS',
    drugName: '',
    productName: '',
    quantity: 100,
    batch: '',
    expiryDate: '',
    purchaseRate: 0,
    saleRate: 0
  });

  // Prescription form state
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [patientMobile, setPatientMobile] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [vitals, setVitals] = useState<PrescriptionVitals>({
    bp: '', pulse: '', temp: '', weight: '', spo2: ''
  });
  const [advice, setAdvice] = useState('');
  const [followUpDays, setFollowUpDays] = useState('7');
  
  // Selected medications for current prescription
  const [currentMeds, setCurrentMeds] = useState<PrescriptionMedication[]>([]);
  const [medSearch, setMedSearch] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [medDosage, setMedDosage] = useState('1 Tablet');
  const [medFrequency, setMedFrequency] = useState('1-0-1');
  const [medDuration, setMedDuration] = useState('5 days');
  const [medTiming, setMedTiming] = useState<'Before Food' | 'After Food' | 'With Food' | 'As Needed'>('After Food');
  const [medInstructions, setMedInstructions] = useState('');

  // All prescriptions history state
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [historySearch, setHistorySearch] = useState('');
  const [selectedHistoryPrescription, setSelectedHistoryPrescription] = useState<Prescription | null>(null);

  // Load state and dynamic routing on mount
  useEffect(() => {
    // 1. Check for Pharmacist Share route
    const path = window.location.pathname;
    const shareMatch = path.match(/\/prescription\/(rx-[a-z0-9]+)/);
    if (shareMatch) {
      const rxId = shareMatch[1];
      fetchSharedPrescription(rxId);
      return;
    }

    // 2. Load Doctor session from localStorage
    const savedDoctor = localStorage.getItem('mercy_doctor');
    if (savedDoctor) {
      const parsed = JSON.parse(savedDoctor) as DoctorUser;
      setDoctor(parsed);
      setCurrentView('dashboard');
      fetchDrugs();
      fetchPrescriptions(parsed.email);
    }
  }, []);

  // Fetch shared prescription (for pharmacist/public view)
  const fetchSharedPrescription = async (id: string) => {
    setShareLoading(true);
    try {
      const res = await fetch(`/api/prescriptions/${id}`);
      if (res.ok) {
        const data = await res.json() as Prescription;
        setSharePrescription(data);
        setCurrentView('share-view');
      } else {
        setShareError('Prescription not found or expired. Please contact the clinic doctor.');
        setCurrentView('share-view');
      }
    } catch (err) {
      setShareError('Failed to load prescription. Connection error.');
      setCurrentView('share-view');
    } finally {
      setShareLoading(false);
    }
  };

  // Fetch inventory drugs
  const fetchDrugs = async () => {
    try {
      const res = await fetch('/api/drugs');
      if (res.ok) {
        const data = await res.json() as Drug[];
        setDrugs(data);
      }
      // Also fetch master Excel-imported drugs
      fetchMasterDrugs();
    } catch (err) {
      console.error('Error fetching inventory:', err);
    }
  };

  // Fetch Master drugs
  const fetchMasterDrugs = async () => {
    try {
      const res = await fetch('/api/master-drugs');
      if (res.ok) {
        const data = await res.json() as Drug[];
        setMasterDrugs(data);
      }
    } catch (err) {
      console.error('Error fetching master drugs:', err);
    }
  };

  // Fetch prescription history
  const fetchPrescriptions = async (email: string) => {
    try {
      const res = await fetch(`/api/prescriptions?doctorEmail=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json() as Prescription[];
        setPrescriptions(data);
      }
    } catch (err) {
      console.error('Error fetching prescriptions:', err);
    }
  };

  // Auth: Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (authCode !== 'REGISTER_MERCY') {
      setAuthError('Unauthorized! Access code is incorrect.');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: authEmail,
          password: authPassword,
          name: authName,
          specialization: authSpecialization,
          code: authCode
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAuthSuccess('Registration successful! Please login.');
        // Reset fields
        setAuthEmail('');
        setAuthPassword('');
        setAuthName('');
        setAuthCode('');
        setTimeout(() => setCurrentView('login'), 1500);
      } else {
        setAuthError(data.error || 'Registration failed');
      }
    } catch (err) {
      setAuthError('Server error, please try again.');
    }
  };

  // Auth: Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDoctor(data.user);
        localStorage.setItem('mercy_doctor', JSON.stringify(data.user));
        fetchDrugs();
        fetchPrescriptions(data.user.email);
        setCurrentView('dashboard');
        setAuthEmail('');
        setAuthPassword('');
      } else {
        setAuthError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setAuthError('Server error, please try again.');
    }
  };

  // Auth: Logout
  const handleLogout = () => {
    localStorage.removeItem('mercy_doctor');
    setDoctor(null);
    setCurrentView('landing');
  };

  // Add custom drug to inventory
  const handleAddDrug = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/drugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDrug)
      });
      if (res.ok) {
        fetchDrugs();
        setIsAddingDrug(false);
        setNewDrug({
          category: 'TABLETS',
          drugName: '',
          productName: '',
          quantity: 100,
          batch: '',
          expiryDate: '',
          purchaseRate: 0,
          saleRate: 0
        });
      }
    } catch (err) {
      console.error('Error adding drug:', err);
    }
  };

  // Excel File reading and parsing
  const handleExcelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setExcelFile(file);
    setExcelError('');
    setImportSuccess('');

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet) as any[];

        if (!json || json.length === 0) {
          setExcelError('The Excel file is empty.');
          return;
        }

        // Map columns dynamically based on fuzzy matching
        const mapped = json.map((row, index) => {
          // Look for matching keys
          const keys = Object.keys(row);
          
          const findVal = (possibleKeys: string[], defaultVal = '') => {
            const key = keys.find(k => possibleKeys.some(pk => k.toLowerCase().includes(pk.toLowerCase())));
            return key ? String(row[key]) : defaultVal;
          };

          const productName = findVal(['product', 'brand', 'medicine name', 'drug name'], `Drug #${index + 1}`);
          const drugName = findVal(['composition', 'generic', 'formula', 'content'], 'N/A');
          const category = findVal(['category', 'type', 'rack', 'form'], 'TABLETS').toUpperCase();
          const saleRate = parseFloat(findVal(['mrp', 'rate', 'price', 'sale'], '0')) || 0;

          return {
            id: `master-${index}-${Date.now()}`,
            category: category || 'TABLETS',
            drugName: drugName,
            productName: productName,
            quantity: 0,
            batch: 'NA',
            expiryDate: 'NA',
            purchaseRate: 0,
            saleRate: saleRate
          };
        });

        setParsedExcelData(mapped);
      } catch (err) {
        console.error('Error parsing Excel:', err);
        setExcelError('Failed to parse Excel file. Please ensure it is a valid format.');
      }
    };
    reader.readAsBinaryString(file);
  };

  // Submit parsed Excel master drugs catalog to backend
  const handleImportMasterCatalog = async () => {
    if (parsedExcelData.length === 0) return;
    setIsImporting(true);
    setExcelError('');
    setImportSuccess('');

    try {
      const res = await fetch('/api/master-drugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drugs: parsedExcelData })
      });

      if (res.ok) {
        setImportSuccess(`Successfully imported ${parsedExcelData.length} master drugs into clinic search formulary!`);
        setParsedExcelData([]);
        setExcelFile(null);
        fetchMasterDrugs();
      } else {
        const errData = await res.json();
        setExcelError(errData.error || 'Failed to save master catalog on server.');
      }
    } catch (err) {
      console.error('Error importing master drugs:', err);
      setExcelError('Network error importing master drugs.');
    } finally {
      setIsImporting(false);
    }
  };

  // Quick adjust drug stock quantity
  const handleAdjustStock = async (id: string, newQty: number) => {
    try {
      const res = await fetch(`/api/drugs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQty })
      });
      if (res.ok) {
        setDrugs(prev => prev.map(d => d.id === id ? { ...d, quantity: newQty } : d));
      }
    } catch (err) {
      console.error('Error adjusting stock:', err);
    }
  };

  // Add medication to current prescription state list
  const handleAddMedication = () => {
    if (!medSearch && !selectedDrug) return;

    const drugName = selectedDrug ? selectedDrug.drugName : medSearch;
    const productName = selectedDrug ? selectedDrug.productName : 'Generic / Custom';
    const category = selectedDrug ? selectedDrug.category : 'CUSTOM';
    const drugId = selectedDrug ? selectedDrug.id : 'custom';

    const newMed: PrescriptionMedication = {
      drugId,
      drugName,
      productName,
      category,
      dosage: medDosage,
      frequency: medFrequency,
      duration: medDuration,
      timing: medTiming,
      instructions: medInstructions
    };

    setCurrentMeds([...currentMeds, newMed]);
    
    // Clear med addition inputs
    setMedSearch('');
    setSelectedDrug(null);
    setMedInstructions('');
  };

  // Save full prescription
  const handleSavePrescription = async () => {
    // 1. Form Validation (Can be bypassed using state)
    if (!bypassValidation) {
      if (!patientName.trim()) {
        alert('Validation Error: Patient Name is required.');
        return;
      }
      if (patientName.trim().length < 2) {
        alert('Validation Error: Patient Name must be at least 2 characters.');
        return;
      }
      if (!patientAge.trim()) {
        alert('Validation Error: Patient Age is required.');
        return;
      }
      const ageNum = parseFloat(patientAge);
      if (isNaN(ageNum) || ageNum <= 0) {
        alert('Validation Error: Patient Age must be a positive number (e.g., "30" or "8 months").');
        return;
      }
      if (patientMobile.trim() && !/^\+?[\d\s-]{10,15}$/.test(patientMobile.trim())) {
        alert('Validation Error: Please enter a valid 10-to-15 digit mobile number.');
        return;
      }
      if (currentMeds.length === 0) {
        alert('Validation Error: Please add at least one medication to prescribe.');
        return;
      }
    } else {
      // If bypass is on, ensure patientName is at least "Patient" to avoid UI breaks
      if (!patientName.trim()) {
        setPatientName('Patient');
      }
    }

    if (!doctor) return;

    const followUpText = followUpDays ? `After ${followUpDays} days` : 'As needed';

    const payload = {
      patientName: patientName.trim() || 'Patient',
      patientAge: patientAge.trim() || 'N/A',
      patientGender,
      patientMobile: patientMobile.trim() || 'N/A',
      symptoms,
      diagnosis,
      vitals,
      medications: currentMeds,
      advice,
      followUpDate: followUpText,
      doctorEmail: doctor.email,
      doctorName: doctor.name
    };

    try {
      const url = editingPrescriptionId ? `/api/prescriptions/${editingPrescriptionId}` : '/api/prescriptions';
      const method = editingPrescriptionId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchPrescriptions(doctor.email);
        fetchDrugs(); // refresh drug stocks as they might be updated
        
        // Open the saved prescription in full detail
        setSelectedHistoryPrescription(data.prescription);
        setCurrentView('history');

        // Reset builder form
        setPatientName('');
        setPatientAge('');
        setPatientGender('Male');
        setPatientMobile('');
        setSymptoms('');
        setDiagnosis('');
        setVitals({ bp: '', pulse: '', temp: '', weight: '', spo2: '' });
        setAdvice('');
        setFollowUpDays('7');
        setCurrentMeds([]);
        setEditingPrescriptionId(null);
      } else {
        alert('Failed to save prescription: ' + (data.error || 'Server error'));
      }
    } catch (err) {
      alert('Network error saving prescription.');
    }
  };

  // Filter drugs for selection and listing
  const filteredDrugs = drugs.filter(drug => {
    const matchesSearch = 
      drug.drugName.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      drug.productName.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      drug.category.toLowerCase().includes(inventorySearch.toLowerCase());
    
    const matchesCategory = categoryFilter === 'ALL' || drug.category === categoryFilter;
    
    let matchesStock = true;
    if (stockFilter === 'LOW') {
      matchesStock = drug.quantity > 0 && drug.quantity < 15;
    } else if (stockFilter === 'OUT') {
      matchesStock = drug.quantity === 0;
    } else if (stockFilter === 'OK') {
      matchesStock = drug.quantity >= 15;
    }
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  // Unique categories list
  const categoriesList = Array.from(new Set(drugs.map(d => d.category))).sort();

  // Low stock alert list for dashboard
  const lowStockDrugs = drugs.filter(d => d.quantity < 15);

  // Group history by Date to show cases per day
  const prescriptionsGroupedByDate = prescriptions.reduce((acc, rx) => {
    const dateStr = new Date(rx.date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(rx);
    return acc;
  }, {} as { [date: string]: Prescription[] });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* 1. Header/Navigation */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => doctor ? setCurrentView('dashboard') : setCurrentView('landing')}>
            <div className="bg-white p-2 rounded-full shadow-inner flex items-center justify-center w-10 h-10">
              <span className="text-blue-700 font-black text-xl">m</span>
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight leading-none">MERCY CLINIC</h1>
              <span className="text-xs text-blue-200 uppercase font-semibold">Unit of YBSS</span>
            </div>
          </div>

          <nav className="flex items-center space-x-1 sm:space-x-4">
            {doctor ? (
              <>
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentView === 'dashboard' ? 'bg-white/15 text-white' : 'hover:bg-white/10 text-blue-100'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setCurrentView('prescription-builder')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${currentView === 'prescription-builder' ? 'bg-white/15 text-white' : 'hover:bg-white/10 text-blue-100'}`}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>OPD Prescribe</span>
                </button>
                <button 
                  onClick={() => { setCurrentView('inventory'); fetchDrugs(); }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentView === 'inventory' ? 'bg-white/15 text-white' : 'hover:bg-white/10 text-blue-100'}`}
                >
                  Drug Inventory
                </button>
                <button 
                  onClick={() => { setCurrentView('history'); setSelectedHistoryPrescription(null); }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentView === 'history' ? 'bg-white/15 text-white' : 'hover:bg-white/10 text-blue-100'}`}
                >
                  Cases History
                </button>
                <div className="border-l border-white/20 pl-4 flex items-center space-x-3">
                  <div className="text-right hidden md:block">
                    <p className="text-xs text-blue-200">Dr. {doctor.name}</p>
                    <p className="text-[10px] text-blue-300 font-mono italic">{doctor.specialization}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    title="Log out"
                    className="p-1.5 rounded-lg hover:bg-red-600/30 text-red-100 hover:text-white transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              currentView !== 'share-view' && (
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setCurrentView('login')}
                    className="px-4 py-1.5 text-sm font-medium hover:text-white text-blue-100 transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setCurrentView('register')}
                    className="bg-white text-blue-700 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all shadow"
                  >
                    Register
                  </button>
                </div>
              )
            )}
          </nav>
        </div>
      </header>

      {/* 2. Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        
        {/* ================= LANDING SCREEN ================= */}
        {currentView === 'landing' && (
          <div className="py-12 flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-6 shadow-inner">
              <Building className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Mercy Clinic OPD Portal
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-xl">
              Welcome to the digital prescription builder, case history tracker, and smart medication search console for Mercy Clinic. Securely manage OPD treatments offline and share digital files instantly with the pharma store.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 w-full max-w-lg mb-12">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
                <CheckCircle className="w-8 h-8 text-emerald-500 mb-3" />
                <h3 className="font-semibold text-slate-800">Check Store Stocks</h3>
                <p className="text-xs text-slate-500 text-center mt-1">Cross-reference drugs live during consultation without running to the pharmacist.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
                <Printer className="w-8 h-8 text-blue-500 mb-3" />
                <h3 className="font-semibold text-slate-800">Print or Link Prescriptions</h3>
                <p className="text-xs text-slate-500 text-center mt-1">Instantly hand over a beautiful slip or WhatsApp a direct link for mobile viewing.</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={() => setCurrentView('login')}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Access Doctor Console
              </button>
              <button 
                onClick={() => setCurrentView('register')}
                className="bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all shadow-sm"
              >
                Register New Account
              </button>
            </div>
          </div>
        )}

        {/* ================= REGISTER SCREEN ================= */}
        {currentView === 'register' && (
          <div className="max-w-md mx-auto my-8 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white text-center">
              <Shield className="w-10 h-10 mx-auto mb-2 text-blue-200" />
              <h2 className="text-2xl font-bold">Doctor Registration</h2>
              <p className="text-xs text-blue-200 mt-1">Mercy Clinic Private OPD Network</p>
            </div>
            
            <form onSubmit={handleRegister} className="p-6 space-y-4">
              {authError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs border border-red-100 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
              {authSuccess && (
                <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl text-xs border border-emerald-100 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{authSuccess}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Clinic Authorization Access Code</label>
                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter secure clinical registration code"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    className="pl-9 pr-3 py-2 w-full border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">Contact manager for the clinical authorization code.</p>
              </div>

              <div className="border-t border-slate-100 my-4 pt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name (Prefix with Dr.)</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Dr. John Doe"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="px-3 py-2 w-full border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address (Gmail)</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="yourname@gmail.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="px-3 py-2 w-full border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Specialization / Department</label>
                  <input 
                    type="text" 
                    placeholder="Pediatrician, General Medicine, Ortho etc."
                    value={authSpecialization}
                    onChange={(e) => setAuthSpecialization(e.target.value)}
                    className="px-3 py-2 w-full border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Secure Password</label>
                  <input 
                    type="password" 
                    required 
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="px-3 py-2 w-full border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md"
              >
                Sign Up as Doctor
              </button>

              <div className="text-center pt-2">
                <button 
                  type="button" 
                  onClick={() => setCurrentView('login')}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Already have an account? Login here
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= LOGIN SCREEN ================= */}
        {currentView === 'login' && (
          <div className="max-w-md mx-auto my-12 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white text-center">
              <Building className="w-10 h-10 mx-auto mb-2 text-blue-200" />
              <h2 className="text-2xl font-bold">Doctor Login</h2>
              <p className="text-xs text-blue-200 mt-1">Access secure clinical system</p>
            </div>
            
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              {authError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs border border-red-100 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{authError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  placeholder="name@gmail.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="px-3 py-2 w-full border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="px-3 py-2 w-full border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md"
              >
                Log In
              </button>

              <div className="text-center pt-2">
                <button 
                  type="button" 
                  onClick={() => setCurrentView('register')}
                  className="text-xs text-blue-600 hover:underline"
                >
                  New to Mercy? Register here with code
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= DASHBOARD SCREEN ================= */}
        {currentView === 'dashboard' && doctor && (
          <div className="space-y-6">
            {/* Top Row Overview Card */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white rounded-3xl p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full w-fit">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-semibold tracking-wide">Live OPD Session</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold">Welcome back, Dr. {doctor.name}!</h2>
                <p className="text-sm text-blue-100 max-w-xl">
                  Specialization: <strong className="text-white">{doctor.specialization}</strong> | Managing cases from the port-free local cloud file-engine.
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setCurrentView('prescription-builder')}
                  className="bg-white text-blue-800 font-bold px-6 py-3 rounded-2xl text-sm flex items-center space-x-2 shadow-md hover:bg-blue-50 hover:scale-[1.02] transition-all"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>New OPD Prescription</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-xs text-slate-400 font-semibold uppercase">Total Cases Managed</p>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-3xl font-bold text-slate-900">{prescriptions.length}</span>
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-xl">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-xs text-slate-400 font-semibold uppercase">Cases Today</p>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-3xl font-bold text-slate-900">
                    {prescriptions.filter(p => new Date(p.date).toDateString() === new Date().toDateString()).length}
                  </span>
                  <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-xs text-slate-400 font-semibold uppercase">In-Clinic Meds Checked</p>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-3xl font-bold text-slate-900">{drugs.length}</span>
                  <div className="bg-indigo-50 text-indigo-600 p-2 rounded-xl">
                    <Pill className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-xs text-slate-400 font-semibold uppercase">Short Stock Warning</p>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-3xl font-bold text-amber-600">
                    {drugs.filter(d => d.quantity < 15).length}
                  </span>
                  <div className="bg-amber-50 text-amber-600 p-2 rounded-xl">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Panels */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Panel: Recent Patients (2 cols) */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Recent Consultations</h3>
                  <button 
                    onClick={() => setCurrentView('history')}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    View All
                  </button>
                </div>

                {prescriptions.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 space-y-2">
                    <FileText className="w-12 h-12 mx-auto opacity-40" />
                    <p className="text-sm">No prescriptions written yet.</p>
                    <button 
                      onClick={() => setCurrentView('prescription-builder')}
                      className="text-xs text-blue-600 font-bold hover:underline"
                    >
                      Write your first prescription now
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {prescriptions.slice(0, 5).map(rx => (
                      <div key={rx.id} className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-all">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-800 text-sm">{rx.patientName}</p>
                          <p className="text-xs text-slate-400 flex items-center space-x-2">
                            <span>{rx.patientAge} yrs • {rx.patientGender}</span>
                            <span>•</span>
                            <span>{new Date(rx.date).toLocaleDateString()}</span>
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-slate-500 font-mono italic bg-slate-100 px-2 py-0.5 rounded">
                            {rx.medications.length} meds
                          </span>
                          <button 
                            onClick={() => { setSelectedHistoryPrescription(rx); setCurrentView('history'); }}
                            className="p-1.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-slate-400 transition-colors"
                            title="View Prescription"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Panel: Stock Alerts & Fast Search */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span>Clinic Store Stock Alerts</span>
                </h3>

                <p className="text-xs text-slate-500">
                  These medicines are running very low in the pharmacist rack. Inform pharmacist to restock.
                </p>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {lowStockDrugs.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-1" />
                      All initial inventory stocks are healthy.
                    </div>
                  ) : (
                    lowStockDrugs.map(drug => (
                      <div key={drug.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-slate-700">{drug.productName}</p>
                          <p className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">{drug.drugName}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded font-bold ${drug.quantity === 0 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                          {drug.quantity} Left
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <button 
                  onClick={() => setCurrentView('inventory')}
                  className="w-full text-center text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 py-2.5 rounded-xl transition-all"
                >
                  Manage Full Store Inventory
                </button>
              </div>
            </div>

            {/* Publishing & Client Access Playbook */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Clinic Publishing & Client Access Playbook</h3>
                  <p className="text-[11px] text-blue-300">Learn how to easily give access to your patients, pharmacists, and clients.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-2">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-2">
                  <div className="text-xs font-bold text-blue-400 flex items-center space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] text-blue-300">1</span>
                    <span>Direct Live Link Sharing</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    This workspace runs on a high-availability server behind an Nginx proxy. You can **simply copy your current browser URL** (or the Prescription Link generated after saving a case) and send it to your pharmacist, clients, or assistant!
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-2">
                  <div className="text-xs font-bold text-blue-400 flex items-center space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] text-blue-300">2</span>
                    <span>Shareable Pharmacist Portals</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    When you save an OPD case, click **&quot;Copy Patient Link&quot;**. Your pharmacist can view the prescription on any smartphone or tablet instantly, print it out, or download it as a saved PDF with zero setup!
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-2">
                  <div className="text-xs font-bold text-blue-400 flex items-center space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] text-blue-300">3</span>
                    <span>Standard Port-free Deployment</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    To host this permanently for your clinic: Go to **Settings &gt; Export to GitHub or ZIP**. Since the app uses standard Node.js on port 3000, it deploys seamlessly onto Vercel, Render, or any standard VM with a single click!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PRESCRIPTION BUILDER SCREEN ================= */}
        {currentView === 'prescription-builder' && doctor && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingPrescriptionId ? 'Edit Saved Prescription Case' : 'New OPD Digital Prescription'}
                </h2>
                <p className="text-xs text-slate-500">
                  {editingPrescriptionId ? 'Updating an existing case. Saves historical timeline and stock balance.' : 'Auto-saves local case log and automatically deducts medicine stock upon completion.'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="flex items-center space-x-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-all">
                  <input
                    type="checkbox"
                    checked={bypassValidation}
                    onChange={(e) => setBypassValidation(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>Ignore Form Validations</span>
                </label>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      if(confirm("Discard current draft?")) {
                        setEditingPrescriptionId(null);
                        setCurrentView('dashboard');
                      }
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSavePrescription}
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow flex items-center space-x-1"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingPrescriptionId ? 'Update & Print Rx' : 'Save & Print Rx'}</span>
                  </button>
                </div>
              </div>
            </div>

            {editingPrescriptionId && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                    <span>Active Edit Session</span>
                  </h4>
                  <p className="text-xs text-amber-700 mt-0.5">You are modifying a saved case. Saving will update the existing prescription, log the revision timestamp, and flag it as edited in records.</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Cancel edit session and reset prescription form?')) {
                      setPatientName('');
                      setPatientAge('');
                      setPatientGender('Male');
                      setPatientMobile('');
                      setSymptoms('');
                      setDiagnosis('');
                      setVitals({ bp: '', pulse: '', temp: '', weight: '', spo2: '' });
                      setAdvice('');
                      setFollowUpDays('7');
                      setCurrentMeds([]);
                      setEditingPrescriptionId(null);
                    }
                  }}
                  className="bg-amber-100 text-amber-800 hover:bg-amber-200 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0"
                >
                  Cancel Edit
                </button>
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column: Patient Info & Vitals (1 col) */}
              <div className="space-y-6">
                {/* Patient Demographics */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Patient Information</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Patient Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Ramesh Kumar"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Age (e.g. 45 or 8m)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 24"
                          value={patientAge}
                          onChange={(e) => setPatientAge(e.target.value)}
                          className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Gender</label>
                        <select 
                          value={patientGender}
                          onChange={(e) => setPatientGender(e.target.value as any)}
                          className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:border-blue-500"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Mobile No.</label>
                      <input 
                        type="tel" 
                        placeholder="e.g. 99897 99947"
                        value={patientMobile}
                        onChange={(e) => setPatientMobile(e.target.value)}
                        className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Vitals */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span>Patient Vitals</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Blood Pressure</label>
                      <input 
                        type="text" 
                        placeholder="120/80 mmHg"
                        value={vitals.bp}
                        onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
                        className="px-2 py-1.5 w-full border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Pulse Rate</label>
                      <input 
                        type="text" 
                        placeholder="72 bpm"
                        value={vitals.pulse}
                        onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
                        className="px-2 py-1.5 w-full border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Temperature</label>
                      <input 
                        type="text" 
                        placeholder="98.6 °F"
                        value={vitals.temp}
                        onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
                        className="px-2 py-1.5 w-full border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Weight (Kg)</label>
                      <input 
                        type="text" 
                        placeholder="65 kg"
                        value={vitals.weight}
                        onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                        className="px-2 py-1.5 w-full border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">SpO2 (%)</label>
                      <input 
                        type="text" 
                        placeholder="98 %"
                        value={vitals.spo2}
                        onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })}
                        className="px-2 py-1.5 w-full border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Symptoms and Diagnosis */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider">Clinical Notes</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Chief Complaints / Symptoms</label>
                      <textarea 
                        rows={2}
                        placeholder="Fever, cough for 3 days, body pain..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Diagnosis</label>
                      <input 
                        type="text" 
                        placeholder="Acute Viral Fever / Bronchitis"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Medications prescription list (2 cols) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Add Medication Search & Form */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider flex items-center space-x-2">
                    <PlusCircle className="w-4 h-4" />
                    <span>Search & Prescribe Medication</span>
                  </h3>

                  {/* Real-time search in inventory */}
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Search live store inventory by product brand or generic name..."
                      value={medSearch}
                      onChange={(e) => {
                        setMedSearch(e.target.value);
                        if (selectedDrug) setSelectedDrug(null);
                      }}
                      className="pl-9 pr-4 py-3 w-full border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-blue-500"
                    />
                    
                    {/* Floating Dropdown Result */}
                    {medSearch && !selectedDrug && (() => {
                      const localMatches = drugs.filter(d => 
                        d.productName.toLowerCase().includes(medSearch.toLowerCase()) || 
                        d.drugName.toLowerCase().includes(medSearch.toLowerCase())
                      );
                      const masterMatches = masterDrugs.filter(d => 
                        d.productName.toLowerCase().includes(medSearch.toLowerCase()) || 
                        d.drugName.toLowerCase().includes(medSearch.toLowerCase())
                      );
                      const uniqueMasterMatches = masterMatches.filter(m => 
                        !localMatches.some(l => l.productName.toLowerCase() === m.productName.toLowerCase())
                      );

                      const totalResults = localMatches.length + uniqueMasterMatches.length;

                      return (
                        <div className="absolute z-10 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto divide-y divide-slate-100">
                          {localMatches.length > 0 && (
                            <div>
                              <div className="bg-slate-50 px-3 py-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider sticky top-0 border-b border-slate-100">
                                Clinic Stock Matches ({localMatches.length})
                              </div>
                              {localMatches.map(d => (
                                <div 
                                  key={d.id}
                                  onClick={() => {
                                    setSelectedDrug(d);
                                    setMedSearch(d.productName);
                                  }}
                                  className="p-3 text-xs hover:bg-slate-50 cursor-pointer flex justify-between items-center"
                                >
                                  <div>
                                    <span className="font-semibold text-slate-800">{d.productName}</span>
                                    <span className="text-slate-400 ml-2">({d.drugName})</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">
                                      Rack: {d.category}
                                    </span>
                                    {d.quantity === 0 ? (
                                      <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">Out of Stock</span>
                                    ) : (
                                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">In Stock ({d.quantity})</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {uniqueMasterMatches.length > 0 && (
                            <div>
                              <div className="bg-blue-50/50 px-3 py-1.5 text-[9px] font-bold text-blue-500 uppercase tracking-wider sticky top-0 border-b border-slate-100 flex items-center justify-between">
                                <span>Master Excel Formulary Matches ({uniqueMasterMatches.length})</span>
                                <span className="text-[8px] bg-blue-100 text-blue-600 px-1 rounded">No Local Stock</span>
                              </div>
                              {uniqueMasterMatches.map(d => (
                                <div 
                                  key={d.id}
                                  onClick={() => {
                                    setSelectedDrug(d);
                                    setMedSearch(d.productName);
                                  }}
                                  className="p-3 text-xs hover:bg-slate-50 cursor-pointer flex justify-between items-center"
                                >
                                  <div>
                                    <span className="font-semibold text-slate-800">{d.productName}</span>
                                    <span className="text-slate-400 ml-2">({d.drugName})</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                                      {d.category}
                                    </span>
                                    <span className="text-[10px] text-blue-500 font-semibold font-mono bg-blue-50/40 px-1.5 py-0.5 rounded">
                                      Excel Sheet
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {totalResults === 0 && (
                            <div 
                              onClick={() => {
                                setSelectedDrug({
                                  id: 'custom-prescribed',
                                  category: 'CUSTOM',
                                  drugName: medSearch,
                                  productName: medSearch,
                                  quantity: 0,
                                  batch: 'NA',
                                  expiryDate: 'NA',
                                  purchaseRate: 0,
                                  saleRate: 0
                                });
                              }}
                              className="p-3 text-xs text-blue-600 hover:bg-blue-50 cursor-pointer flex items-center justify-between font-semibold"
                            >
                              <span>Add &apos;{medSearch}&apos; as a custom external prescription</span>
                              <Plus className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Stock Availability Indicator badge */}
                  {selectedDrug && (() => {
                    const isLocal = drugs.some(d => d.id === selectedDrug.id || d.productName.toLowerCase() === selectedDrug.productName.toLowerCase());
                    if (!isLocal && selectedDrug.id !== 'custom-prescribed') {
                      return (
                        <div className="p-3 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100 text-xs flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="font-semibold">{selectedDrug.productName} (from Master Excel Catalog)</p>
                            <p className="text-[10px] opacity-80">Generic: {selectedDrug.drugName} | Category/Rack: {selectedDrug.category}</p>
                          </div>
                          <span className="font-bold text-[10px] bg-blue-100 text-blue-700 px-2.5 py-1 rounded-xl shrink-0 uppercase tracking-wider">
                            Excel Record Only
                          </span>
                        </div>
                      );
                    } else if (selectedDrug.id === 'custom-prescribed') {
                      return (
                        <div className="p-3 rounded-2xl bg-slate-50 text-slate-700 border border-slate-100 text-xs flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="font-semibold">{selectedDrug.productName} (Custom Prescribed)</p>
                            <p className="text-[10px] opacity-80">Generic: {selectedDrug.drugName}</p>
                          </div>
                          <span className="font-bold text-[10px] bg-slate-200 text-slate-600 px-2.5 py-1 rounded-xl shrink-0 uppercase tracking-wider">
                            External Drug
                          </span>
                        </div>
                      );
                    } else {
                      return (
                        <div className={`p-3 rounded-2xl flex items-center justify-between text-xs border ${
                          selectedDrug.quantity === 0 
                            ? 'bg-red-50 text-red-700 border-red-100' 
                            : selectedDrug.quantity < 15 
                              ? 'bg-amber-50 text-amber-700 border-amber-100' 
                              : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                          <div className="space-y-0.5">
                            <p className="font-semibold">{selectedDrug.productName} is registered in Clinic.</p>
                            <p className="text-[10px] opacity-80">Generic: {selectedDrug.drugName} | Expiry: {selectedDrug.expiryDate} (Batch: {selectedDrug.batch})</p>
                          </div>
                          <span className="font-bold text-sm shrink-0">
                            {selectedDrug.quantity === 0 ? 'OUT OF STOCK' : `${selectedDrug.quantity} Units Left`}
                          </span>
                        </div>
                      );
                    }
                  })()}

                  {/* Age-Based Dosage Advisor Panel */}
                  {selectedDrug && patientAge && (
                    <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs flex items-start space-x-2">
                      <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">OPD Smart Dosage Guide (for Age {patientAge}):</p>
                        <p className="mt-0.5">{getDosageGuidelines(selectedDrug.drugName || selectedDrug.productName, patientAge)}</p>
                      </div>
                    </div>
                  )}

                  {/* Dosage settings form */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Dosage Form</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 1 Tablet / 5ml"
                        value={medDosage}
                        onChange={(e) => setMedDosage(e.target.value)}
                        className="px-2.5 py-2 w-full border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Frequency</label>
                      <select 
                        value={medFrequency}
                        onChange={(e) => setMedFrequency(e.target.value)}
                        className="px-2.5 py-2 w-full border border-slate-200 rounded-xl bg-white"
                      >
                        <option value="1-0-1">1-0-1 (BD)</option>
                        <option value="1-1-1">1-1-1 (TDS)</option>
                        <option value="1-0-0">1-0-0 (OD Morning)</option>
                        <option value="0-0-1">0-0-1 (OD Night)</option>
                        <option value="1-1-1-1">1-1-1-1 (QID)</option>
                        <option value="SOS">SOS (As needed)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Duration</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 5 days"
                        value={medDuration}
                        onChange={(e) => setMedDuration(e.target.value)}
                        className="px-2.5 py-2 w-full border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Timing</label>
                      <select 
                        value={medTiming}
                        onChange={(e) => setMedTiming(e.target.value as any)}
                        className="px-2.5 py-2 w-full border border-slate-200 rounded-xl bg-white"
                      >
                        <option value="After Food">After Food</option>
                        <option value="Before Food">Before Food</option>
                        <option value="With Food">With Food</option>
                        <option value="As Needed">As Needed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Special Instructions</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Take with warm water, avoid cold drinks..."
                      value={medInstructions}
                      onChange={(e) => setMedInstructions(e.target.value)}
                      className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none"
                    />
                  </div>

                  <button 
                    type="button"
                    onClick={handleAddMedication}
                    className="w-full bg-slate-900 text-white font-bold py-2 rounded-xl text-xs hover:bg-slate-800 transition-all flex items-center justify-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Medicine to Prescription</span>
                  </button>
                </div>

                {/* Added Prescription Table view */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Prescribed Medications</h3>

                  {currentMeds.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">
                      No medications added to the slip yet. Use search above to populate.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {currentMeds.map((med, index) => (
                        <div key={index} className="p-3 border border-slate-100 rounded-xl flex items-center justify-between text-xs hover:bg-slate-50 transition-all">
                          <div>
                            <p className="font-bold text-slate-800">{med.productName}</p>
                            <p className="text-[10px] text-slate-400">Comp: {med.drugName}</p>
                            <p className="text-[10px] text-indigo-600 font-semibold mt-1">
                              {med.dosage} | {med.frequency} | {med.duration} ({med.timing})
                            </p>
                            {med.instructions && <p className="text-[10px] italic text-slate-500 mt-0.5">Instructions: {med.instructions}</p>}
                          </div>
                          <button 
                            type="button"
                            onClick={() => setCurrentMeds(currentMeds.filter((_, i) => i !== index))}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-slate-100 pt-4 space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Doctor&apos;s Advice / Diet Instructions</label>
                      <textarea 
                        rows={2}
                        placeholder="Avoid oily/spicy foods. Drink plenty of water. Bed rest recommended."
                        value={advice}
                        onChange={(e) => setAdvice(e.target.value)}
                        className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Follow up clinic visit</label>
                        <select 
                          value={followUpDays}
                          onChange={(e) => setFollowUpDays(e.target.value)}
                          className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs bg-white"
                        >
                          <option value="3">After 3 days</option>
                          <option value="5">After 5 days</option>
                          <option value="7">After 7 days (1 week)</option>
                          <option value="15">After 15 days (2 weeks)</option>
                          <option value="30">After 30 days (1 month)</option>
                          <option value="">No follow-up required</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Panel */}
                <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-3 text-center">
                  <h4 className="font-bold text-sm">Digitize Patient Records</h4>
                  <p className="text-xs text-slate-400">Completing this generates a pristine online link for pharmacists and prepares a PDF copy.</p>
                  <button 
                    type="button"
                    onClick={handleSavePrescription}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold text-sm transition-all shadow"
                  >
                    Save & Generate Prescription ID
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= INVENTORY SCREEN ================= */}
        {currentView === 'inventory' && doctor && (() => {
          // Computed inventory analytics
          const totalUniqueDrugs = drugs.length;
          const totalPhysicalQuantity = drugs.reduce((acc, d) => acc + d.quantity, 0);
          const totalBatchesTracked = Array.from(new Set(drugs.map(d => d.batch).filter(b => b && b.trim() !== '' && b !== 'N/A' && b !== 'NA'))).length;
          const lowStockCount = drugs.filter(d => d.quantity > 0 && d.quantity < 15).length;
          const outOfStockCount = drugs.filter(d => d.quantity === 0).length;

          const categoryCounts = drugs.reduce((acc, d) => {
            acc[d.category] = (acc[d.category] || 0) + 1;
            return acc;
          }, {} as { [cat: string]: number });

          return (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 font-sans">Clinic Store Medicine Inventory</h2>
                  <p className="text-xs text-slate-500">Add, track, and update active medicine levels present in clinic racks.</p>
                </div>
                <button 
                  onClick={() => setIsAddingDrug(!isAddingDrug)}
                  className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingDrug ? 'View Inventory List' : 'Add New Drug Stock'}</span>
                </button>
              </div>

              {/* Analytics Cards Grid */}
              {!isAddingDrug && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <Pill className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unique Medicines</p>
                        <p className="text-xl font-black text-slate-800">{totalUniqueDrugs}</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Inventory Stock</p>
                        <p className="text-xl font-black text-slate-800">{totalPhysicalQuantity.toLocaleString()} Units</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
                      <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                        <Key className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tracked Batches</p>
                        <p className="text-xl font-black text-slate-800">{totalBatchesTracked}</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
                      <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                        <AlertTriangle className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stock Shortage Alerts</p>
                        <p className="text-xl font-black text-slate-800">
                          <span className="text-red-600 font-extrabold">{outOfStockCount} Out</span>
                          <span className="text-slate-300 mx-1.5">/</span>
                          <span className="text-amber-600 font-extrabold">{lowStockCount} Low</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category wise counter grid */}
                  <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 space-y-3">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                      <ClipboardList className="w-4 h-4 text-slate-400" />
                      <span>Medicine Distribution Category-Wise (Rack Counts)</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                      {Object.entries(categoryCounts).map(([cat, count]) => (
                        <div key={cat} className="bg-white p-2.5 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs hover:shadow-xs transition-all">
                          <span className="font-semibold text-slate-500 truncate">{cat}</span>
                          <span className="bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-lg text-[10px]">
                            {count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {isAddingDrug ? (
              /* Add Drug Form with Subtabs */
              <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex border-b border-slate-100 pb-px">
                  <button 
                    type="button"
                    onClick={() => setInventorySubTab('single')}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 px-4 transition-all ${
                      inventorySubTab === 'single' 
                        ? 'border-blue-600 text-blue-600' 
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Single Clinic Stock
                  </button>
                  <button 
                    type="button"
                    onClick={() => setInventorySubTab('excel')}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 px-4 transition-all ${
                      inventorySubTab === 'excel' 
                        ? 'border-blue-600 text-blue-600' 
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Bulk Master Excel Formulary
                  </button>
                </div>

                {inventorySubTab === 'excel' ? (
                  /* Excel Uploader Layout */
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-800">Import Master Excel Formulary</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Import thousands of medicines from an Excel spreadsheet. This catalog will be scanned live in the Prescription Builder.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 text-center space-y-3">
                      <div className="p-3 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm mx-auto text-blue-600">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-700">Choose your master Excel/CSV spreadsheet</p>
                        <p className="text-[10px] text-slate-400">Supported columns (fuzzy matched): Product Name, Generic Name, Category, MRP Rate</p>
                      </div>
                      <input 
                        type="file" 
                        accept=".xlsx, .xls, .csv" 
                        onChange={handleExcelFileChange} 
                        className="hidden" 
                        id="excel-file-upload-input"
                      />
                      <label 
                        htmlFor="excel-file-upload-input"
                        className="inline-block bg-white border border-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer hover:bg-slate-50 shadow-sm transition-all"
                      >
                        Select Spreadsheet
                      </label>
                      {excelFile && (
                        <p className="text-xs font-mono text-slate-600 mt-2">Selected file: {excelFile.name}</p>
                      )}
                    </div>

                    {excelError && (
                      <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-100 text-xs font-medium">
                        {excelError}
                      </div>
                    )}

                    {importSuccess && (
                      <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-medium">
                        {importSuccess}
                      </div>
                    )}

                    {parsedExcelData.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-700">Parsed Formulary Preview:</span>
                          <span className="text-emerald-600 font-semibold">{parsedExcelData.length} records parsed</span>
                        </div>
                        <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-50 max-h-48 overflow-y-auto">
                          {parsedExcelData.slice(0, 5).map((row, idx) => (
                            <div key={idx} className="p-2.5 text-[11px] flex justify-between items-center bg-white hover:bg-slate-50">
                              <div className="truncate pr-4">
                                <span className="font-bold text-slate-800">{row.productName}</span>
                                <span className="text-slate-400 ml-1.5">({row.drugName})</span>
                              </div>
                              <div className="shrink-0 flex items-center space-x-2">
                                <span className="bg-slate-100 text-slate-500 font-mono px-1.5 py-0.5 rounded text-[9px] font-bold">{row.category}</span>
                                <span className="text-slate-600 font-bold font-mono">₹{row.saleRate}</span>
                              </div>
                            </div>
                          ))}
                          {parsedExcelData.length > 5 && (
                            <div className="p-2 text-center text-[10px] text-slate-400 italic bg-slate-50/50">
                              And {parsedExcelData.length - 5} more records...
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={handleImportMasterCatalog}
                          disabled={isImporting}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center space-x-2"
                        >
                          {isImporting ? (
                            <span>Importing formulary...</span>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>Commit & Import {parsedExcelData.length} drugs to search formulary</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Single Register Form */
                  <form onSubmit={handleAddDrug} className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Drug Category (Rack)</label>
                      <select 
                        value={newDrug.category}
                        onChange={(e) => setNewDrug({ ...newDrug, category: e.target.value })}
                        className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs bg-white"
                      >
                        <option value="TABLETS">TABLETS</option>
                        <option value="CAPSULES">CAPSULES</option>
                        <option value="SYRUP">SYRUP</option>
                        <option value="CREAM">CREAM</option>
                        <option value="OINTMENT">OINTMENT</option>
                        <option value="DROPS">DROPS</option>
                        <option value="INJECTION">INJECTION</option>
                        <option value="IV-FLUID">IV-FLUID</option>
                        <option value="BANDAGE">BANDAGE</option>
                        <option value="WOOL">WOOL</option>
                        <option value="SYRINGES">SYRINGES</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Product Name (Brand Name)</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. DOLO-650 TAB"
                        value={newDrug.productName}
                        onChange={(e) => setNewDrug({ ...newDrug, productName: e.target.value })}
                        className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Composition (Generic Name)</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. PARACETAMOL TAB 650MG"
                        value={newDrug.drugName}
                        onChange={(e) => setNewDrug({ ...newDrug, drugName: e.target.value })}
                        className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Batch Code</label>
                      <input 
                        type="text" 
                        placeholder="e.g. DOB54353"
                        value={newDrug.batch}
                        onChange={(e) => setNewDrug({ ...newDrug, batch: e.target.value })}
                        className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Dec-29"
                        value={newDrug.expiryDate}
                        onChange={(e) => setNewDrug({ ...newDrug, expiryDate: e.target.value })}
                        className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Stock Quantity</label>
                      <input 
                        type="number" 
                        required 
                        value={newDrug.quantity}
                        onChange={(e) => setNewDrug({ ...newDrug, quantity: parseInt(e.target.value) || 0 })}
                        className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Selling Rate (per Tablet/Unit)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        required 
                        value={newDrug.saleRate}
                        onChange={(e) => setNewDrug({ ...newDrug, saleRate: parseFloat(e.target.value) || 0 })}
                        className="px-3 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none"
                      />
                    </div>

                    <div className="col-span-2 pt-4 border-t border-slate-100 flex justify-end space-x-2">
                      <button 
                        type="button" 
                        onClick={() => setIsAddingDrug(false)}
                        className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 shadow"
                      >
                        Save Drug to Clinic Inventory
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* Inventory List view with Filters */
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                  {/* Search */}
                  <div className="relative w-full md:max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search drugs by product brand or composition name..."
                      value={inventorySearch}
                      onChange={(e) => setInventorySearch(e.target.value)}
                      className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Filter Selects */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center space-x-1.5 text-xs">
                      <Filter className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-500">Rack Category:</span>
                    </div>
                    <select 
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="px-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none"
                    >
                      <option value="ALL">ALL CATEGORIES</option>
                      {categoriesList.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>

                    <select 
                      value={stockFilter}
                      onChange={(e) => setStockFilter(e.target.value)}
                      className="px-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none"
                    >
                      <option value="ALL">ALL STOCK STATUS</option>
                      <option value="LOW">Low Stock (&lt; 15 units)</option>
                      <option value="OUT">Out of Stock (0 units)</option>
                      <option value="OK">Healthy Stock</option>
                    </select>

                    <label className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-all">
                      <input 
                        type="checkbox"
                        checked={showBatchColumn}
                        onChange={(e) => setShowBatchColumn(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                      />
                      <span>Show Batch Column</span>
                    </label>
                  </div>
                </div>

                <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                  <table className="w-full text-left text-xs text-slate-600 divide-y divide-slate-100">
                    <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Product (Brand Name)</th>
                        <th className="px-4 py-3">Generic Composition</th>
                        <th className="px-4 py-3 text-center">In-Clinic Stock</th>
                        {showBatchColumn && <th className="px-4 py-3">Batch Info</th>}
                        <th className="px-4 py-3">Expiry</th>
                        <th className="px-4 py-3">Rack/Category</th>
                        <th className="px-4 py-3 text-right">Sale Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredDrugs.map(drug => (
                        <tr key={drug.id} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-semibold text-slate-800">{drug.productName}</td>
                          <td className="px-4 py-3 max-w-[200px] truncate" title={drug.drugName}>{drug.drugName}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <input 
                                type="number" 
                                value={drug.quantity} 
                                onChange={(e) => handleAdjustStock(drug.id, parseInt(e.target.value) || 0)}
                                className="w-14 text-center px-1 py-0.5 border border-slate-200 rounded font-bold font-mono focus:outline-none focus:border-blue-500"
                              />
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                drug.quantity === 0 
                                  ? 'bg-red-100 text-red-700' 
                                  : drug.quantity < 15 
                                    ? 'bg-amber-100 text-amber-700' 
                                    : 'bg-emerald-100 text-emerald-700'
                              }`}>
                                {drug.quantity === 0 ? 'Out' : drug.quantity < 15 ? 'Low' : 'OK'}
                              </span>
                            </div>
                          </td>
                          {showBatchColumn && <td className="px-4 py-3 font-mono">{drug.batch || 'N/A'}</td>}
                          <td className="px-4 py-3">{drug.expiryDate || 'N/A'}</td>
                          <td className="px-4 py-3">
                            <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold">
                              {drug.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-mono font-semibold text-slate-800">
                            ₹{drug.saleRate.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      {filteredDrugs.length === 0 && (
                        <tr>
                          <td colSpan={showBatchColumn ? 7 : 6} className="text-center py-12 text-slate-400">
                            No drugs found matching the current search parameters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
      })()}

        {/* ================= PRESCRIPTION HISTORY SCREEN ================= */}
        {currentView === 'history' && doctor && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Mercy OPD Patient Records & Case Log</h2>
              <p className="text-xs text-slate-500">History log auto-categorized per day to help clinic with volume auditing and file sharing.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* History list (1 col) */}
              <div className="space-y-4 lg:col-span-1">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search past cases by patient name..."
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                {/* Day-by-Day history list */}
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                  {Object.keys(prescriptionsGroupedByDate).length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      No prescriptions written yet.
                    </div>
                  ) : (
                    Object.keys(prescriptionsGroupedByDate).map(dateStr => {
                      // Filter prescriptions in this date group if search is active
                      const rxList = prescriptionsGroupedByDate[dateStr].filter(p => 
                        p.patientName.toLowerCase().includes(historySearch.toLowerCase())
                      );
                      
                      if (rxList.length === 0) return null;

                      return (
                        <div key={dateStr} className="space-y-1.5">
                          <div className="flex items-center justify-between px-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{dateStr}</span>
                            <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded font-semibold">{rxList.length} cases</span>
                          </div>
                          
                          <div className="space-y-1">
                            {rxList.map(rx => (
                              <div 
                                key={rx.id}
                                onClick={() => setSelectedHistoryPrescription(rx)}
                                className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                                  selectedHistoryPrescription?.id === rx.id 
                                    ? 'bg-blue-50 border-blue-200 shadow-sm' 
                                    : 'bg-white border-slate-100 hover:border-slate-200 shadow-xs'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-slate-800 text-xs">{rx.patientName}</h4>
                                  <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-50 px-1.5 rounded">{rx.id}</span>
                                </div>
                                <p className="text-[10px] text-slate-500 mt-0.5">
                                  {rx.patientAge} yrs • {rx.patientGender} • {rx.medications.length} meds
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Prescription Detail & Print/Share Preview (2 cols) */}
              <div className="lg:col-span-2">
                {selectedHistoryPrescription ? (
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
                    {/* Action Panel */}
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 print:hidden">
                      <div className="flex items-center space-x-2 text-xs">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-slate-600 font-medium">
                          {selectedHistoryPrescription.isEdited ? 'Prescription updated successfully!' : 'Prescription created successfully!'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 flex-wrap gap-2">
                        <button 
                          onClick={() => {
                            // Populate builder states for editing
                            setPatientName(selectedHistoryPrescription.patientName || '');
                            setPatientAge(selectedHistoryPrescription.patientAge || '');
                            setPatientGender(selectedHistoryPrescription.patientGender || 'Male');
                            setPatientMobile(selectedHistoryPrescription.patientMobile || '');
                            setSymptoms(selectedHistoryPrescription.symptoms || '');
                            setDiagnosis(selectedHistoryPrescription.diagnosis || '');
                            setVitals(selectedHistoryPrescription.vitals || { bp: '', pulse: '', temp: '', weight: '', spo2: '' });
                            setAdvice(selectedHistoryPrescription.advice || '');
                            
                            if (selectedHistoryPrescription.followUpDate) {
                              const match = selectedHistoryPrescription.followUpDate.match(/\d+/);
                              if (match) {
                                setFollowUpDays(match[0]);
                              } else {
                                setFollowUpDays('7');
                              }
                            } else {
                              setFollowUpDays('7');
                            }

                            setCurrentMeds(selectedHistoryPrescription.medications || []);
                            setEditingPrescriptionId(selectedHistoryPrescription.id);
                            
                            // Switch view to builder
                            setCurrentView('prescription-builder');
                          }}
                          className="bg-amber-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-amber-600 transition-all flex items-center space-x-1.5 shadow"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit Case</span>
                        </button>

                        <button 
                          onClick={() => {
                            const url = `${window.location.origin}/prescription/${selectedHistoryPrescription.id}`;
                            navigator.clipboard.writeText(url);
                            alert('Pharmacist Direct Mobile Link copied to clipboard!\n\nLink: ' + url);
                          }}
                          className="bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center space-x-1.5"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Copy Mobile Link</span>
                        </button>

                        <button 
                          onClick={() => window.print()}
                          className="bg-blue-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all flex items-center space-x-1.5 shadow"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print slip</span>
                        </button>
                      </div>
                    </div>

                    {/* Official Prescription Slip Print Area */}
                    <div className="border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-inner bg-white select-all text-slate-900 relative overflow-hidden">
                      
                      {/* Medical Cross Watermark overlay */}
                      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none scale-150 transform translate-x-1/4 translate-y-1/4">
                        <Building className="w-96 h-96 text-slate-800" />
                      </div>

                      {/* Header Letterhead */}
                      <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-slate-800 pb-4 gap-4">
                        <div className="flex items-center space-x-3 text-center sm:text-left">
                          <div className="bg-blue-700 text-white p-2 rounded-full w-12 h-12 flex items-center justify-center shadow font-black text-2xl">
                            <span>m</span>
                          </div>
                          <div>
                            <h3 className="font-extrabold text-xl tracking-tight text-slate-900 leading-none uppercase">MERCY CLINIC</h3>
                            <p className="text-xs text-slate-500 font-semibold uppercase mt-0.5 tracking-wide">Unit of YBSS</p>
                            <p className="text-[10px] text-slate-400">Multispeciality OPD, Patient Digitization Wing</p>
                          </div>
                        </div>

                        <div className="text-center sm:text-right text-xs">
                          <p className="font-bold text-slate-800">Dr. {selectedHistoryPrescription.doctorName}</p>
                          <p className="text-slate-500 font-mono italic">{doctor.specialization}</p>
                          <p className="text-[10px] text-slate-400 mt-1">Mercy Clinic General OPD Ward</p>
                          <p className="text-[10px] text-slate-400">Cell: 99897 99947, 63040 12412</p>
                        </div>
                      </div>

                      {selectedHistoryPrescription.isEdited && (
                        <div className="bg-amber-50 text-amber-800 border border-amber-200 px-3.5 py-2.5 rounded-2xl text-[11px] font-medium flex items-center gap-2 print:bg-slate-100 print:text-slate-800 print:border-slate-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse print:bg-slate-500"></span>
                          <span>
                            <strong>Edited Case:</strong> Modified on {new Date(selectedHistoryPrescription.lastEditedDate || '').toLocaleDateString()} {new Date(selectedHistoryPrescription.lastEditedDate || '').toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}. Original Rx Date: {new Date(selectedHistoryPrescription.originalDate || selectedHistoryPrescription.date).toLocaleDateString()}.
                          </span>
                        </div>
                      )}

                      {/* Patient Details metadata */}
                      <div className="bg-slate-50 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border border-slate-100">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Patient Name</span>
                          <span className="font-bold text-slate-800">{selectedHistoryPrescription.patientName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Age / Gender</span>
                          <span className="font-semibold text-slate-800">{selectedHistoryPrescription.patientAge} / {selectedHistoryPrescription.patientGender}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Mobile No.</span>
                          <span className="font-mono text-slate-800">{selectedHistoryPrescription.patientMobile || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">
                            {selectedHistoryPrescription.isEdited ? 'Last Edited' : 'Rx Date'}
                          </span>
                          <span className="font-semibold text-slate-800">
                            {new Date(selectedHistoryPrescription.isEdited && selectedHistoryPrescription.lastEditedDate ? selectedHistoryPrescription.lastEditedDate : selectedHistoryPrescription.date).toLocaleDateString()}
                          </span>
                          {selectedHistoryPrescription.isEdited && (
                            <span className="text-[9px] text-amber-600 block print:text-slate-500 font-mono">
                              (Orig: {new Date(selectedHistoryPrescription.originalDate || selectedHistoryPrescription.date).toLocaleDateString()})
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Vitals summary if present */}
                      {Object.values(selectedHistoryPrescription.vitals).some(v => v) && (
                        <div className="border-b border-slate-100 pb-4">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Vitals Recorded</h4>
                          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                            {selectedHistoryPrescription.vitals.bp && (
                              <span className="bg-slate-100 px-2.5 py-1 rounded-lg">B.P: <span className="text-slate-900">{selectedHistoryPrescription.vitals.bp}</span></span>
                            )}
                            {selectedHistoryPrescription.vitals.pulse && (
                              <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Pulse: <span className="text-slate-900">{selectedHistoryPrescription.vitals.pulse} bpm</span></span>
                            )}
                            {selectedHistoryPrescription.vitals.temp && (
                              <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Temp: <span className="text-slate-900">{selectedHistoryPrescription.vitals.temp} °F</span></span>
                            )}
                            {selectedHistoryPrescription.vitals.weight && (
                              <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Weight: <span className="text-slate-900">{selectedHistoryPrescription.vitals.weight} Kg</span></span>
                            )}
                            {selectedHistoryPrescription.vitals.spo2 && (
                              <span className="bg-slate-100 px-2.5 py-1 rounded-lg">SpO2: <span className="text-slate-900">{selectedHistoryPrescription.vitals.spo2} %</span></span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Symptoms & Diagnosis */}
                      <div className="grid sm:grid-cols-2 gap-4 text-xs border-b border-slate-100 pb-4">
                        {selectedHistoryPrescription.symptoms && (
                          <div>
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Chief Complaints</h4>
                            <p className="text-slate-700 whitespace-pre-line leading-relaxed">{selectedHistoryPrescription.symptoms}</p>
                          </div>
                        )}
                        {selectedHistoryPrescription.diagnosis && (
                          <div>
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Diagnosis</h4>
                            <p className="text-slate-800 font-bold leading-relaxed">{selectedHistoryPrescription.diagnosis}</p>
                          </div>
                        )}
                      </div>

                      {/* Rx Medicine List */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-1">
                          <span className="font-serif italic text-2xl font-black text-slate-800 leading-none">Rx</span>
                          <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Medications</span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs divide-y divide-slate-200">
                            <thead>
                              <tr className="text-slate-400 uppercase text-[9px] tracking-wider font-bold">
                                <th className="py-2">Medication (Brand Name & Generic Comp)</th>
                                <th className="py-2">Frequency</th>
                                <th className="py-2">Duration</th>
                                <th className="py-2 text-right">Timing</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium">
                              {selectedHistoryPrescription.medications.map((med, idx) => (
                                <tr key={idx} className="text-slate-800">
                                  <td className="py-3">
                                    <p className="font-bold text-sm text-slate-900">{med.productName}</p>
                                    <p className="text-[10px] text-slate-500 italic">Composition: {med.drugName}</p>
                                    {med.instructions && <p className="text-[10px] font-semibold text-indigo-600 mt-0.5">Note: {med.instructions}</p>}
                                  </td>
                                  <td className="py-3 font-semibold text-slate-700">
                                    {med.dosage} • <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">{med.frequency}</span>
                                  </td>
                                  <td className="py-3 text-slate-600">{med.duration}</td>
                                  <td className="py-3 text-right text-slate-700 font-bold">{med.timing}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Advice and Diet instructions */}
                      {selectedHistoryPrescription.advice && (
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Doctor&apos;s Advice & General Instructions</h4>
                          <p className="text-slate-700 leading-relaxed whitespace-pre-line">{selectedHistoryPrescription.advice}</p>
                        </div>
                      )}

                      {/* Footer Sign-off and Follow Up */}
                      <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
                        <div>
                          {selectedHistoryPrescription.followUpDate && (
                            <p className="text-slate-700 font-semibold flex items-center space-x-1">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              <span>Follow up visit required: <strong className="text-blue-700 underline">{selectedHistoryPrescription.followUpDate}</strong></span>
                            </p>
                          )}
                          <p className="text-[10px] text-slate-400 mt-1">Get well soon. Thank you for visiting Mercy Clinic.</p>
                        </div>

                        <div className="text-center sm:text-right space-y-4 pt-4 sm:pt-0">
                          <div className="font-serif italic text-slate-500">Dr. Signature Area</div>
                          <div className="border-t border-dashed border-slate-300 w-36 mx-auto sm:mr-0 pt-1 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                            Registered Clinician
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center text-slate-400 space-y-3">
                    <FileText className="w-16 h-16 mx-auto opacity-30 text-blue-600" />
                    <h3 className="font-bold text-lg text-slate-700">No Patient Record Selected</h3>
                    <p className="text-xs max-w-sm mx-auto">
                      Select a prescription from the case logs on the left sidebar to view digital details, copy links, or print copies.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= PUBLIC SHAREABLE VIEW FOR PHARMACISTS ================= */}
        {currentView === 'share-view' && (
          <div className="max-w-3xl mx-auto my-4 space-y-6">
            
            {shareLoading && (
              <div className="text-center py-12 space-y-3 bg-white rounded-3xl border border-slate-100 shadow p-6">
                <Activity className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
                <p className="text-sm text-slate-500 font-semibold">Loading Mercy Clinic Digital Prescription...</p>
              </div>
            )}

            {shareError && (
              <div className="bg-red-50 text-red-700 p-6 rounded-3xl border border-red-200 text-center space-y-3">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
                <h3 className="text-lg font-bold">Prescription Access Denied</h3>
                <p className="text-sm">{shareError}</p>
                <div className="pt-2">
                  <button 
                    onClick={() => window.location.reload()}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold"
                  >
                    Retry loading
                  </button>
                </div>
              </div>
            )}

            {sharePrescription && (
              <div className="space-y-6">
                {/* Information Header card for pharmacist */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4 print:hidden">
                  <div className="space-y-1">
                    <div className="bg-white/20 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit flex items-center space-x-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Authenticated Digitized Prescription</span>
                    </div>
                    <h3 className="text-base font-bold">Pharmacist Verification Hub</h3>
                    <p className="text-xs text-emerald-100 max-w-xl">
                      You are viewing a direct authenticated Rx slip issued live by Mercy Clinic. Print, copy, or write from this secure window.
                    </p>
                  </div>
                  <button 
                    onClick={() => window.print()}
                    className="bg-white text-emerald-800 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shrink-0 shadow hover:bg-emerald-50 transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Rx</span>
                  </button>
                </div>

                {/* Printable prescription card */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-md text-slate-900 relative overflow-hidden">
                  
                  {/* Cross icon watermark */}
                  <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none scale-150 transform translate-x-1/4 translate-y-1/4">
                    <Building className="w-96 h-96 text-slate-800" />
                  </div>

                  {/* Header Letterhead */}
                  <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-slate-800 pb-4 gap-4">
                    <div className="flex items-center space-x-3 text-center sm:text-left">
                      <div className="bg-blue-700 text-white p-2 rounded-full w-12 h-12 flex items-center justify-center shadow font-black text-2xl">
                        <span>m</span>
                      </div>
                      <div>
                        <h3 className="font-extrabold text-xl tracking-tight text-slate-900 leading-none uppercase">MERCY CLINIC</h3>
                        <p className="text-xs text-slate-500 font-semibold uppercase mt-0.5 tracking-wide">Unit of YBSS</p>
                        <p className="text-[10px] text-slate-400">Multispeciality OPD, Patient Digitization Wing</p>
                      </div>
                    </div>

                    <div className="text-center sm:text-right text-xs">
                      <p className="font-bold text-slate-800">Dr. {sharePrescription.doctorName}</p>
                      <p className="text-[10px] text-slate-400 mt-1">Mercy Clinic General OPD Ward</p>
                      <p className="text-[10px] text-slate-400">Cell: 99897 99947, 63040 12412</p>
                    </div>
                  </div>

                  {/* Patient Details metadata */}
                  <div className="bg-slate-50 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Patient Name</span>
                      <span className="font-bold text-slate-800">{sharePrescription.patientName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Age / Gender</span>
                      <span className="font-semibold text-slate-800">{sharePrescription.patientAge} yrs / {sharePrescription.patientGender}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Mobile No.</span>
                      <span className="font-mono text-slate-800">{sharePrescription.patientMobile || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Rx Date</span>
                      <span className="font-semibold text-slate-800">{new Date(sharePrescription.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Vitals summary if present */}
                  {Object.values(sharePrescription.vitals).some(v => v) && (
                    <div className="border-b border-slate-100 pb-4">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Vitals Recorded</h4>
                      <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                        {sharePrescription.vitals.bp && (
                          <span className="bg-slate-100 px-2.5 py-1 rounded-lg">B.P: <span className="text-slate-900">{sharePrescription.vitals.bp}</span></span>
                        )}
                        {sharePrescription.vitals.pulse && (
                          <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Pulse: <span className="text-slate-900">{sharePrescription.vitals.pulse} bpm</span></span>
                        )}
                        {sharePrescription.vitals.temp && (
                          <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Temp: <span className="text-slate-900">{sharePrescription.vitals.temp} °F</span></span>
                        )}
                        {sharePrescription.vitals.weight && (
                          <span className="bg-slate-100 px-2.5 py-1 rounded-lg">Weight: <span className="text-slate-900">{sharePrescription.vitals.weight} Kg</span></span>
                        )}
                        {sharePrescription.vitals.spo2 && (
                          <span className="bg-slate-100 px-2.5 py-1 rounded-lg">SpO2: <span className="text-slate-900">{sharePrescription.vitals.spo2} %</span></span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Symptoms & Diagnosis */}
                  <div className="grid sm:grid-cols-2 gap-4 text-xs border-b border-slate-100 pb-4">
                    {sharePrescription.symptoms && (
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Chief Complaints</h4>
                        <p className="text-slate-700 whitespace-pre-line leading-relaxed">{sharePrescription.symptoms}</p>
                      </div>
                    )}
                    {sharePrescription.diagnosis && (
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Diagnosis</h4>
                        <p className="text-slate-800 font-bold leading-relaxed">{sharePrescription.diagnosis}</p>
                      </div>
                    )}
                  </div>

                  {/* Rx Medicine List */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-1">
                      <span className="font-serif italic text-2xl font-black text-slate-800 leading-none">Rx</span>
                      <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Medications</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs divide-y divide-slate-200">
                        <thead>
                          <tr className="text-slate-400 uppercase text-[9px] tracking-wider font-bold">
                            <th className="py-2">Medication (Brand Name & Generic Comp)</th>
                            <th className="py-2">Frequency</th>
                            <th className="py-2">Duration</th>
                            <th className="py-2 text-right">Timing</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {sharePrescription.medications.map((med, idx) => (
                            <tr key={idx} className="text-slate-800">
                              <td className="py-3">
                                <p className="font-bold text-sm text-slate-900">{med.productName}</p>
                                <p className="text-[10px] text-slate-500 italic">Composition: {med.drugName}</p>
                                {med.instructions && <p className="text-[10px] font-semibold text-indigo-600 mt-0.5 font-sans">Note: {med.instructions}</p>}
                              </td>
                              <td className="py-3 font-semibold text-slate-700">
                                {med.dosage} • <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">{med.frequency}</span>
                              </td>
                              <td className="py-3 text-slate-600">{med.duration}</td>
                              <td className="py-3 text-right text-slate-700 font-bold">{med.timing}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Advice and Diet instructions */}
                  {sharePrescription.advice && (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Doctor&apos;s Advice & General Instructions</h4>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line">{sharePrescription.advice}</p>
                    </div>
                  )}

                  {/* Footer Sign-off and Follow Up */}
                  <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
                    <div>
                      {sharePrescription.followUpDate && (
                        <p className="text-slate-700 font-semibold flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>Follow up visit required: <strong className="text-blue-700 underline">{sharePrescription.followUpDate}</strong></span>
                        </p>
                      )}
                      <p className="text-[10px] text-slate-400 mt-1">Mercy Clinic Patient Records Portal | Digitized Verification System.</p>
                    </div>

                    <div className="text-center sm:text-right space-y-4 pt-4 sm:pt-0">
                      <div className="font-serif italic text-slate-500">Dr. Signature Area</div>
                      <div className="border-t border-dashed border-slate-300 w-36 mx-auto sm:mr-0 pt-1 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        Registered Clinician
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* 3. Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-black text-white text-base tracking-tight">MERCY Clinic</span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded uppercase font-semibold">Unit of YBSS</span>
          </div>
          <p className="text-center sm:text-right text-[10px]">
            &copy; {new Date().getFullYear()} Mercy Clinic. All rights reserved. Powered by portable offline files.
          </p>
        </div>
      </footer>
    </div>
  );
}
