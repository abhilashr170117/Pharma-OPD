import { Drug } from './types';

export const INITIAL_DRUGS_DATA: Drug[] = [
  // --- TABLETS (75 Items) ---
  { id: 't1', category: 'TABLETS', drugName: 'PARACETAMOL TAB 650MG', productName: 'DOLO-650 TAB', quantity: 250, batch: 'DL50431', expiryDate: 'Dec-29', purchaseRate: 1.64, saleRate: 2.14 },
  { id: 't2', category: 'TABLETS', drugName: 'ACECLOFENAC 100MG AND PARACETAMOL 325MGTAB', productName: 'ZERODOL-P TAB', quantity: 180, batch: 'ZD12845', expiryDate: 'Feb-28', purchaseRate: 5.83, saleRate: 7.59 },
  { id: 't3', category: 'TABLETS', drugName: 'ACECLOFENAC 100MG, SERRATIOPEPTIDASE 15MG AND PARACETAMOL 325MG', productName: 'ZERODOL-SP TAB', quantity: 200, batch: 'FND0826016', expiryDate: 'Aug-28', purchaseRate: 10.73, saleRate: 13.96 },
  { id: 't4', category: 'TABLETS', drugName: 'AMOXICILLIN AND POTASSIUM CLAVULANATE 625MG', productName: 'MEGA-CV 625MG TAB', quantity: 150, batch: 'MPM254705', expiryDate: 'May-27', purchaseRate: 14.57, saleRate: 18.97 },
  { id: 't5', category: 'TABLETS', drugName: 'CETIRIZINE HYDROCHLORIDE TAB 10MG', productName: 'OKACET-TAB', quantity: 300, batch: 'AMQ25CPB', expiryDate: 'Jan-29', purchaseRate: 0.59, saleRate: 2.00 },
  { id: 't6', category: 'TABLETS', drugName: 'TELMISARTAN TAB-40', productName: 'TELMA-40 TAB', quantity: 120, batch: '18240805', expiryDate: 'Sep-27', purchaseRate: 5.45, saleRate: 7.57 },
  { id: 't7', category: 'TABLETS', drugName: 'PANTOPRAZOLE GASTRO-RESISTANT TAB 40MG', productName: 'PANTOP-40 TAB', quantity: 350, batch: 'SPB260314', expiryDate: 'Jul-28', purchaseRate: 8.93, saleRate: 11.63 },
  { id: 't8', category: 'TABLETS', drugName: 'VITAMIN C 500MG CHEWABLE', productName: 'LIMCEE-CHEWBLE TAB', quantity: 500, batch: 'LIA26071', expiryDate: 'Feb-28', purchaseRate: 1.26, saleRate: 1.64 },
  { id: 't9', category: 'TABLETS', drugName: 'VITAMIN B COMPLEX WITH B12', productName: 'NEUROBION FORTE TAB', quantity: 600, batch: '6073CB3907', expiryDate: 'Aug-27', purchaseRate: 1.28, saleRate: 1.58 },
  { id: 't10', category: 'TABLETS', drugName: 'AZITHROMYCIN TAB 500MG', productName: 'AZICIP 500-TAB', quantity: 140, batch: 'SN40749', expiryDate: 'Sep-28', purchaseRate: 15.11, saleRate: 25.17 },
  { id: 't11', category: 'TABLETS', drugName: 'BISACODYL 5MG TAB', productName: 'DULCOFLEX TAB', quantity: 120, batch: 'DLA26004', expiryDate: 'Dec-28', purchaseRate: 1.00, saleRate: 1.23 },
  { id: 't12', category: 'TABLETS', drugName: 'METFORMIN HYDROCHLORIDE TAB 500MG', productName: 'GLYCOMET 500 TAB', quantity: 400, batch: 'MT5002', expiryDate: 'Nov-28', purchaseRate: 1.50, saleRate: 2.10 },
  { id: 't13', category: 'TABLETS', drugName: 'GLIMEPIRIDE 2MG AND METFORMIN 500MG SR', productName: 'GLYCOMET GP 2 TAB', quantity: 280, batch: 'GP2549', expiryDate: 'Mar-28', purchaseRate: 4.80, saleRate: 6.50 },
  { id: 't14', category: 'TABLETS', drugName: 'ATORVASTATIN TAB 10MG', productName: 'ATORVA-10 TAB', quantity: 300, batch: 'AT1034', expiryDate: 'Oct-28', purchaseRate: 3.20, saleRate: 4.50 },
  { id: 't15', category: 'TABLETS', drugName: 'AMLODIPINE TAB 5MG', productName: 'STAMLO-5 TAB', quantity: 240, batch: 'ST5001', expiryDate: 'Jan-29', purchaseRate: 2.10, saleRate: 3.00 },
  { id: 't16', category: 'TABLETS', drugName: 'IBUPROFEN 400MG AND PARACETAMOL 325MG', productName: 'COMBIFLAM TAB', quantity: 500, batch: 'CF7729', expiryDate: 'Jul-29', purchaseRate: 1.10, saleRate: 1.80 },
  { id: 't17', category: 'TABLETS', drugName: 'FEXOFENADINE HYDROCHLORIDE 120MG', productName: 'ALLEGRA 120MG TAB', quantity: 150, batch: 'AL1205', expiryDate: 'Apr-28', purchaseRate: 11.20, saleRate: 14.80 },
  { id: 't18', category: 'TABLETS', drugName: 'FEXOFENADINE HYDROCHLORIDE 180MG', productName: 'ALLEGRA 180MG TAB', quantity: 120, batch: 'AL1809', expiryDate: 'Jun-28', purchaseRate: 14.10, saleRate: 18.90 },
  { id: 't19', category: 'TABLETS', drugName: 'MONTELUKAST 10MG AND LEVOCETIRIZINE 5MG', productName: 'MONTEK-LC TAB', quantity: 250, batch: 'MLC908', expiryDate: 'Oct-28', purchaseRate: 8.50, saleRate: 12.00 },
  { id: 't20', category: 'TABLETS', drugName: 'LEVOCETIRIZINE TAB 5MG', productName: 'L-HIST TAB', quantity: 350, batch: 'LH5012', expiryDate: 'Feb-29', purchaseRate: 1.10, saleRate: 2.50 },
  { id: 't21', category: 'TABLETS', drugName: 'MEFENAMIC ACID 250MG AND DICYCLOMINE HCL 10MG', productName: 'MEFTAL-SPAS TAB', quantity: 200, batch: 'MS3829', expiryDate: 'Aug-28', purchaseRate: 2.40, saleRate: 3.80 },
  { id: 't22', category: 'TABLETS', drugName: 'DICYCLOMINE 20MG AND PARACETAMOL 325MG', productName: 'CYCLOPAM TAB', quantity: 180, batch: 'CY2812', expiryDate: 'Nov-28', purchaseRate: 3.10, saleRate: 4.60 },
  { id: 't23', category: 'TABLETS', drugName: 'RANITIDINE GASTRO-RESISTANT TAB 150MG', productName: 'ACILOC-150 TAB', quantity: 450, batch: 'AC1502', expiryDate: 'May-28', purchaseRate: 0.60, saleRate: 1.10 },
  { id: 't24', category: 'TABLETS', drugName: 'RANITIDINE TAB 150MG', productName: 'RANTAC-150 TAB', quantity: 400, batch: 'RT1504', expiryDate: 'Jun-28', purchaseRate: 0.62, saleRate: 1.15 },
  { id: 't25', category: 'TABLETS', drugName: 'PANTOPRAZOLE 40MG AND DOMPERIDONE 30MG SR', productName: 'PAN-D TAB', quantity: 320, batch: 'PD8841', expiryDate: 'Mar-29', purchaseRate: 9.20, saleRate: 13.50 },
  { id: 't26', category: 'TABLETS', drugName: 'RABEPRAZOLE 20MG AND DOMPERIDONE 30MG SR', productName: 'RABIUM-DSR CAP', quantity: 200, batch: 'RDSR241', expiryDate: 'Jul-28', purchaseRate: 10.10, saleRate: 14.90 },
  { id: 't27', category: 'TABLETS', drugName: 'SITAGLIPTIN 50MG AND METFORMIN 500MG', productName: 'JANUMET 50/500 TAB', quantity: 160, batch: 'JM5002', expiryDate: 'Dec-27', purchaseRate: 18.50, saleRate: 24.00 },
  { id: 't28', category: 'TABLETS', drugName: 'VILDAGLIPTIN 50MG AND METFORMIN 500MG', productName: 'GALVUS MET 50/500 TAB', quantity: 190, batch: 'GV5004', expiryDate: 'Jan-28', purchaseRate: 12.40, saleRate: 16.80 },
  { id: 't29', category: 'TABLETS', drugName: 'MULTIVITAMINS, MINERALS AND GINSENG', productName: 'REVITAL H CAP', quantity: 300, batch: 'RH1024', expiryDate: 'Nov-28', purchaseRate: 6.20, saleRate: 8.50 },
  { id: 't30', category: 'TABLETS', drugName: 'MULTIVITAMINS AND MULTIMINERALS', productName: 'ZINCOVIT TAB', quantity: 500, batch: 'ZV5092', expiryDate: 'Aug-28', purchaseRate: 2.10, saleRate: 3.50 },
  { id: 't31', category: 'TABLETS', drugName: 'CALCIUM 500MG AND VITAMIN D3 250IU', productName: 'SHELCAL-500 TAB', quantity: 450, batch: 'SC5001', expiryDate: 'May-29', purchaseRate: 3.10, saleRate: 4.80 },
  { id: 't32', category: 'TABLETS', drugName: 'FERROUS ASCORBATE AND FOLIC ACID TAB', productName: 'OROFER-XT TAB', quantity: 240, batch: 'OX2591', expiryDate: 'Sep-28', purchaseRate: 8.40, saleRate: 11.50 },
  { id: 't33', category: 'TABLETS', drugName: 'FOLIC ACID TAB 5MG', productName: 'FOLVITE TAB', quantity: 300, batch: 'FV5043', expiryDate: 'Mar-29', purchaseRate: 0.80, saleRate: 1.50 },
  { id: 't34', category: 'TABLETS', drugName: 'ROSUVASTATIN TAB 10MG', productName: 'ROSUVAS-10 TAB', quantity: 180, batch: 'RS1024', expiryDate: 'Jul-28', purchaseRate: 7.20, saleRate: 10.50 },
  { id: 't35', category: 'TABLETS', drugName: 'BISOPROLOL FUMARATE 5MG', productName: 'CONCOR 5 TAB', quantity: 150, batch: 'CC5009', expiryDate: 'Aug-28', purchaseRate: 4.10, saleRate: 6.20 },
  { id: 't36', category: 'TABLETS', drugName: 'CIPROFLOXACIN TAB 500MG', productName: 'CIPLOX-500 TAB', quantity: 220, batch: 'CX5001', expiryDate: 'Dec-28', purchaseRate: 2.80, saleRate: 4.20 },
  { id: 't37', category: 'TABLETS', drugName: 'OFLOXACIN TAB 200MG', productName: 'OFLOX-200 TAB', quantity: 210, batch: 'OF2002', expiryDate: 'Nov-28', purchaseRate: 2.10, saleRate: 3.50 },
  { id: 't38', category: 'TABLETS', drugName: 'OFLOXACIN 200MG AND ORNIDAZOLE 500MG', productName: 'OFLOX-OZ TAB', quantity: 240, batch: 'OOZ342', expiryDate: 'Jan-29', purchaseRate: 5.50, saleRate: 8.20 },
  { id: 't39', category: 'TABLETS', drugName: 'METRONIDAZOLE TAB 400MG', productName: 'METROGYL-400 TAB', quantity: 350, batch: 'MG4004', expiryDate: 'Oct-28', purchaseRate: 0.60, saleRate: 1.20 },
  { id: 't40', category: 'TABLETS', drugName: 'NORFLOXACIN 400MG AND TINIDAZOLE 600MG', productName: 'NORFLOX-TZ TAB', quantity: 200, batch: 'NTZ890', expiryDate: 'Feb-29', purchaseRate: 4.50, saleRate: 6.80 },
  { id: 't41', category: 'TABLETS', drugName: 'ALBENDAZOLE TAB 400MG CHEWABLE', productName: 'BANDY TAB', quantity: 150, batch: 'BY4001', expiryDate: 'Jun-29', purchaseRate: 3.40, saleRate: 8.50 },
  { id: 't42', category: 'TABLETS', drugName: 'CLOPIDOGREL TAB 75MG', productName: 'CLOPLET-75 TAB', quantity: 180, batch: 'CP7502', expiryDate: 'Jul-28', purchaseRate: 4.20, saleRate: 6.50 },
  { id: 't43', category: 'TABLETS', drugName: 'ASPIRIN TAB 75MG', productName: 'ECOSPRIN-75 TAB', quantity: 400, batch: 'ES7501', expiryDate: 'Mar-29', purchaseRate: 0.30, saleRate: 0.80 },
  { id: 't44', category: 'TABLETS', drugName: 'ASPIRIN TAB 150MG', productName: 'ECOSPRIN-150 TAB', quantity: 350, batch: 'ES1509', expiryDate: 'Apr-29', purchaseRate: 0.40, saleRate: 1.00 },
  { id: 't45', category: 'TABLETS', drugName: 'LEVOTHYROXINE SODIUM 50MCG', productName: 'THYRONORM 50MCG TAB', quantity: 360, batch: 'TN5021', expiryDate: 'Sep-28', purchaseRate: 1.20, saleRate: 1.80 },
  { id: 't46', category: 'TABLETS', drugName: 'LEVOTHYROXINE SODIUM 100MCG', productName: 'THYRONORM 100MCG TAB', quantity: 360, batch: 'TN1005', expiryDate: 'Sep-28', purchaseRate: 1.40, saleRate: 2.20 },
  { id: 't47', category: 'TABLETS', drugName: 'SPORLAC GASTRO-RESISTANT PROBIOTICS', productName: 'SPORLAC-DS TAB', quantity: 450, batch: 'SP4920', expiryDate: 'Oct-28', purchaseRate: 1.50, saleRate: 2.50 },
  { id: 't48', category: 'TABLETS', drugName: 'KETOROLAC TROMETHAMINE 10MG DISPERSIBLE', productName: 'KETOROL-DT TAB', quantity: 200, batch: 'KT1043', expiryDate: 'Dec-28', purchaseRate: 2.10, saleRate: 3.80 },
  { id: 't49', category: 'TABLETS', drugName: 'PREDNISOLONE TAB 5MG', productName: 'WYSOLONE 5MG TAB', quantity: 300, batch: 'WY501', expiryDate: 'Jan-29', purchaseRate: 0.40, saleRate: 1.00 },
  { id: 't50', category: 'TABLETS', drugName: 'PREDNISOLONE TAB 10MG', productName: 'WYSOLONE 10MG TAB', quantity: 250, batch: 'WY102', expiryDate: 'Jan-29', purchaseRate: 0.60, saleRate: 1.50 },
  { id: 't51', category: 'TABLETS', drugName: 'HYDROXYZINE HYDROCHLORIDE 25MG', productName: 'ATARAX 25MG TAB', quantity: 180, batch: 'AX2504', expiryDate: 'May-28', purchaseRate: 4.80, saleRate: 7.20 },
  { id: 't52', category: 'TABLETS', drugName: 'DOXYCYCLINE 100MG AND LACTIC ACID BACILLUS', productName: 'DOXT-SL CAP', quantity: 220, batch: 'DSL902', expiryDate: 'Nov-28', purchaseRate: 3.80, saleRate: 5.50 },
  { id: 't53', category: 'TABLETS', drugName: 'FLUCONAZOLE TAB 150MG', productName: 'FORCAN-150 TAB', quantity: 100, batch: 'FC1502', expiryDate: 'Aug-29', purchaseRate: 6.50, saleRate: 14.50 },
  { id: 't54', category: 'TABLETS', drugName: 'TERBINAFINE HYDROCHLORIDE TAB 250MG', productName: 'TYZA-250 TAB', quantity: 120, batch: 'TZ2501', expiryDate: 'Mar-28', purchaseRate: 12.40, saleRate: 18.00 },
  { id: 't55', category: 'TABLETS', drugName: 'ONDANSETRON ORALLY DISPERSIBLE TAB 4MG', productName: 'EMESET-4 TAB', quantity: 280, batch: 'EM4024', expiryDate: 'Jul-29', purchaseRate: 2.20, saleRate: 4.10 },
  { id: 't56', category: 'TABLETS', drugName: 'DOMPERIDONE TAB 10MG', productName: 'DOMSTAL 10MG TAB', quantity: 300, batch: 'DS1015', expiryDate: 'May-28', purchaseRate: 1.10, saleRate: 2.20 },
  { id: 't57', category: 'TABLETS', drugName: 'LOPERAMIDE HYDROCHLORIDE TAB 2MG', productName: 'ELDOPER-2 TAB', quantity: 350, batch: 'ED2001', expiryDate: 'Sep-28', purchaseRate: 0.30, saleRate: 0.90 },
  { id: 't58', category: 'TABLETS', drugName: 'SPIRONOLACTONE TAB 25MG', productName: 'ALDACTONE 25MG TAB', quantity: 150, batch: 'AD2508', expiryDate: 'Apr-28', purchaseRate: 1.80, saleRate: 2.90 },
  { id: 't59', category: 'TABLETS', drugName: 'FUROSEMIDE TAB 40MG', productName: 'LASIX 40MG TAB', quantity: 200, batch: 'LX4021', expiryDate: 'Feb-29', purchaseRate: 0.40, saleRate: 0.95 },
  { id: 't60', category: 'TABLETS', drugName: 'DICLOFENAC SODIUM SR TAB 100MG', productName: 'VOVERAN-SR 100 TAB', quantity: 250, batch: 'VV1002', expiryDate: 'Jun-28', purchaseRate: 4.80, saleRate: 7.10 },
  { id: 't61', category: 'TABLETS', drugName: 'ETORICOXIB TAB 90MG', productName: 'NUCXIB-90 TAB', quantity: 180, batch: 'NC9001', expiryDate: 'Jul-28', purchaseRate: 6.20, saleRate: 9.80 },
  { id: 't62', category: 'TABLETS', drugName: 'ETORICOXIB TAB 120MG', productName: 'NUCXIB-120 TAB', quantity: 140, batch: 'NC1205', expiryDate: 'Aug-28', purchaseRate: 8.10, saleRate: 12.50 },
  { id: 't63', category: 'TABLETS', drugName: 'TRAMADOL 37.5MG AND PARACETAMOL 325MG', productName: 'ULTRACET TAB', quantity: 190, batch: 'UC3752', expiryDate: 'Oct-28', purchaseRate: 8.90, saleRate: 13.20 },
  { id: 't64', category: 'TABLETS', drugName: 'SENNACID LAXATIVE FORMULA', productName: 'SENOKOT TAB', quantity: 120, batch: 'SK2041', expiryDate: 'Mar-29', purchaseRate: 1.80, saleRate: 3.00 },
  { id: 't65', category: 'TABLETS', drugName: 'CHLORPHENIRAMINE MALEATE TAB 4MG', productName: 'CADISTIN 4MG TAB', quantity: 400, batch: 'CD4019', expiryDate: 'May-29', purchaseRate: 0.20, saleRate: 0.60 },
  { id: 't66', category: 'TABLETS', drugName: 'AMILORIDE AND HYDROCHLOROTHIAZIDE TAB', productName: 'BIDURET TAB', quantity: 150, batch: 'BD2918', expiryDate: 'Jan-28', purchaseRate: 2.10, saleRate: 3.50 },
  { id: 't67', category: 'TABLETS', drugName: 'IMIPRAMINE HYDROCHLORIDE TAB 25MG', productName: 'TOFRANIL 25MG TAB', quantity: 100, batch: 'TF2501', expiryDate: 'Sep-27', purchaseRate: 3.80, saleRate: 5.40 },
  { id: 't68', category: 'TABLETS', drugName: 'ALPRAZOLAM TAB 0.25MG', productName: 'ALPREX 0.25 TAB', quantity: 180, batch: 'AP2501', expiryDate: 'Dec-28', purchaseRate: 1.10, saleRate: 2.50 },
  { id: 't69', category: 'TABLETS', drugName: 'ALPRAZOLAM TAB 0.5MG', productName: 'ALPREX 0.5 TAB', quantity: 180, batch: 'AP5002', expiryDate: 'Jan-29', purchaseRate: 1.40, saleRate: 3.10 },
  { id: 't70', category: 'TABLETS', drugName: 'CLONAZEPAM TAB 0.5MG', productName: 'LONAZEP 0.5 TAB', quantity: 200, batch: 'LZ5004', expiryDate: 'Jun-28', purchaseRate: 1.60, saleRate: 3.20 },
  { id: 't71', category: 'TABLETS', drugName: 'GABAPENTIN 300MG AND METHYLCOBALAMIN 500MCG', productName: 'GABAPIN-ME TAB', quantity: 150, batch: 'GM3002', expiryDate: 'May-28', purchaseRate: 11.20, saleRate: 16.50 },
  { id: 't72', category: 'TABLETS', drugName: 'GLYCLAZIDE 80MG TAB', productName: 'DIMICRON 80 TAB', quantity: 200, batch: 'DM8012', expiryDate: 'Nov-28', purchaseRate: 3.40, saleRate: 5.10 },
  { id: 't73', category: 'TABLETS', drugName: 'TELMISARTAN 40MG AND HYDROCHLOROTHIAZIDE 12.5MG', productName: 'TELMA-H TAB', quantity: 220, batch: 'TH4019', expiryDate: 'Aug-28', purchaseRate: 7.10, saleRate: 10.20 },
  { id: 't74', category: 'TABLETS', drugName: 'LOSARTAN POTASSIUM TAB 50MG', productName: 'LOSACAR-50 TAB', quantity: 160, batch: 'LC5014', expiryDate: 'Jul-28', purchaseRate: 4.80, saleRate: 7.20 },
  { id: 't75', category: 'TABLETS', drugName: 'SACCHAROMYCES BOULARDII PROBIOTIC', productName: 'ECONORM SACHET 1G', quantity: 120, batch: 'EN1005', expiryDate: 'Mar-28', purchaseRate: 14.50, saleRate: 22.00 },

  // --- CAPSULES (25 Items) ---
  { id: 'c1', category: 'CAPSULES', drugName: 'AMOXYCILLIN TRIHYDRATE CAP 500MG', productName: 'CIPMOX-500 CAP', quantity: 200, batch: '4K00478', expiryDate: 'Aug-26', purchaseRate: 4.45, saleRate: 8.24 },
  { id: 'c2', category: 'CAPSULES', drugName: 'OMEPRAZOLE GASTRO-RESISTANT CAP 20MG', productName: 'OMEZ-CAP', quantity: 350, batch: 'E2600751', expiryDate: 'Feb-28', purchaseRate: 2.35, saleRate: 3.06 },
  { id: 'c3', category: 'CAPSULES', drugName: 'PREBIOTIC AND PROBIOTICS CAPSULES', productName: 'MARKBIOTICS CAP', quantity: 180, batch: 'RHFC-0258', expiryDate: 'Jun-27', purchaseRate: 2.05, saleRate: 15.00 },
  { id: 'c4', category: 'CAPSULES', drugName: 'RABEPRAZOLE 20MG AND GASTRO-RESISTANT DOMPERIDONE 30MG SR', productName: 'VELOZ-D CAP', quantity: 220, batch: 'VD1095', expiryDate: 'Oct-28', purchaseRate: 9.80, saleRate: 13.90 },
  { id: 'c5', category: 'CAPSULES', drugName: 'ESOMEPRAZOLE 40MG AND DOMPERIDONE 30MG SR', productName: 'NEXPRO-RD 40 CAP', quantity: 250, batch: 'NPRD20', expiryDate: 'Nov-28', purchaseRate: 11.40, saleRate: 16.50 },
  { id: 'c6', category: 'CAPSULES', drugName: 'AMOXYCILLIN 250MG AND CLOXACILLIN 250MG CAP', productName: 'AMPILOX CAP', quantity: 180, batch: 'AL5001', expiryDate: 'Dec-27', purchaseRate: 3.80, saleRate: 6.20 },
  { id: 'c7', category: 'CAPSULES', drugName: 'VITAMIN E CAPSULE 400MG', productName: 'EVION 400 CAP', quantity: 400, batch: 'EV4009', expiryDate: 'May-29', purchaseRate: 1.80, saleRate: 3.20 },
  { id: 'c8', category: 'CAPSULES', drugName: 'CALCITRIOL, CALCIUM CARBONATE AND ZINC CAP', productName: 'CALCIROL CAP', quantity: 240, batch: 'CR8819', expiryDate: 'Aug-28', purchaseRate: 5.50, saleRate: 8.90 },
  { id: 'c9', category: 'CAPSULES', drugName: 'ITRACONAZOLE CAPSULES 100MG', productName: 'ITRASYS-100 CAP', quantity: 150, batch: 'IS1002', expiryDate: 'Jun-28', purchaseRate: 9.50, saleRate: 14.80 },
  { id: 'c10', category: 'CAPSULES', drugName: 'ITRACONAZOLE CAPSULES 200MG', productName: 'ITRASYS-200 CAP', quantity: 150, batch: 'IS2005', expiryDate: 'Jul-28', purchaseRate: 16.20, saleRate: 24.50 },
  { id: 'c11', category: 'CAPSULES', drugName: 'LYCOPENE, MULTIVITAMINS AND MINERALS CAP', productName: 'LYCORED CAP', quantity: 200, batch: 'LR4021', expiryDate: 'Nov-28', purchaseRate: 7.20, saleRate: 11.50 },
  { id: 'c12', category: 'CAPSULES', drugName: 'TAMSULOSIN HYDROCHLORIDE PR 0.4MG', productName: 'URIMAX 0.4 CAP', quantity: 180, batch: 'UM0419', expiryDate: 'Apr-28', purchaseRate: 12.10, saleRate: 18.20 },
  { id: 'c13', category: 'CAPSULES', drugName: 'TAMSULOSIN 0.4MG AND DUTASTERIDE 0.5MG CAP', productName: 'URIMAX-D CAP', quantity: 120, batch: 'UMD052', expiryDate: 'Aug-28', purchaseRate: 18.50, saleRate: 26.00 },
  { id: 'c14', category: 'CAPSULES', drugName: 'DOXYCYCLINE HYCLATE CAP 100MG', productName: 'MICRODOX 100 CAP', quantity: 280, batch: 'MD1009', expiryDate: 'Feb-29', purchaseRate: 2.10, saleRate: 4.20 },
  { id: 'c15', category: 'CAPSULES', drugName: 'CARBONYL IRON, FOLIC ACID AND VITAMIN B12 CAP', productName: 'FEFOL CAP', quantity: 250, batch: 'FF5018', expiryDate: 'Oct-28', purchaseRate: 2.80, saleRate: 4.50 },
  { id: 'c16', category: 'CAPSULES', drugName: 'ORLISTAT CAPSULES 120MG', productName: 'OBELIT-120 CAP', quantity: 100, batch: 'OL1204', expiryDate: 'Jul-28', purchaseRate: 22.00, saleRate: 36.00 },
  { id: 'c17', category: 'CAPSULES', drugName: 'B-COMPLEX WITH LYSINE & LACTO', productName: 'COBAMIDE CAP', quantity: 180, batch: 'CB205', expiryDate: 'Jan-28', purchaseRate: 2.40, saleRate: 4.80 },
  { id: 'c18', category: 'CAPSULES', drugName: 'METHYLCOBALAMIN, ALPHA LIPOIC ACID & ALC CAP', productName: 'METHYCOBAL AL CAP', quantity: 220, batch: 'MCAL9', expiryDate: 'Sep-28', purchaseRate: 9.10, saleRate: 13.90 },
  { id: 'c19', category: 'CAPSULES', drugName: 'ORAL REHYDRATION SALTS ORAL FORMULA', productName: 'ELECTRAL ENVELOPE', quantity: 500, batch: 'EC9912', expiryDate: 'Dec-30', purchaseRate: 4.50, saleRate: 22.00 },
  { id: 'c20', category: 'CAPSULES', drugName: 'DUSPATALIN CAP 200MG', productName: 'COLOSPA RETARD 200 CAP', quantity: 150, batch: 'CS2004', expiryDate: 'Oct-28', purchaseRate: 15.50, saleRate: 23.00 },
  { id: 'c21', category: 'CAPSULES', drugName: 'PREGABALIN 75MG AND METHYLCOBALAMIN 750MCG', productName: 'PREGAB-M 75 CAP', quantity: 210, batch: 'PGM75', expiryDate: 'Mar-28', purchaseRate: 11.20, saleRate: 16.50 },
  { id: 'c22', category: 'CAPSULES', drugName: 'SPORE LACTOBACILLUS PROBIOTIC CAP', productName: 'DAROLAC CAP', quantity: 240, batch: 'DL3002', expiryDate: 'Jun-28', purchaseRate: 5.10, saleRate: 8.00 },
  { id: 'c23', category: 'CAPSULES', drugName: 'CHLORDIAZEPOXIDE 5MG AND MEBEVERINE HCL 135MG', productName: 'LIBRAX CAP', quantity: 180, batch: 'LB124', expiryDate: 'Sep-27', purchaseRate: 6.20, saleRate: 9.80 },
  { id: 'c24', category: 'CAPSULES', drugName: 'GINGSENG ROOT EXTRACT WITH MULTIVITAMINS', productName: 'GERIATRIC PHARM CAP', quantity: 120, batch: 'GP542', expiryDate: 'Aug-28', purchaseRate: 14.50, saleRate: 21.00 },
  { id: 'c25', category: 'CAPSULES', drugName: 'GABAPENTIN CAPSULES 100MG', productName: 'GABAPIN 100 CAP', quantity: 150, batch: 'GP1002', expiryDate: 'Jan-28', purchaseRate: 6.50, saleRate: 9.50 },

  // --- SYRUP (25 Items) ---
  { id: 's1', category: 'SYRUP', drugName: 'ANTACID LIQUID MAGALDRATE AND SIMETHICONE', productName: 'DIGENE SYRUP 200ML', quantity: 45, batch: 'DEM24100', expiryDate: 'Oct-26', purchaseRate: 134.62, saleRate: 175.28 },
  { id: 's2', category: 'SYRUP', drugName: 'LEVOSALBUTAMOL, AMBROXOL AND GUAIPHENESIN EXPECTORANT', productName: 'ASCORIL LS SYRUP 100ML', quantity: 38, batch: '11251558', expiryDate: 'Nov-27', purchaseRate: 111.24, saleRate: 144.85 },
  { id: 's3', category: 'SYRUP', drugName: 'HYDROXYZINE HYDROCHLORIDE SYRUP', productName: 'ATARAX SYRUP 100ML', quantity: 24, batch: 'D240906', expiryDate: 'Nov-27', purchaseRate: 102.34, saleRate: 133.25 },
  { id: 's4', category: 'SYRUP', drugName: 'MULTIVITAMIN AND MULTIMINERAL SYRUP', productName: 'ZINCOVIT SYRUP 200ML', quantity: 42, batch: 'ZVS26030', expiryDate: 'Aug-27', purchaseRate: 123.01, saleRate: 160.17 },
  { id: 's5', category: 'SYRUP', drugName: 'DOMPERIDONE SUSPENSION 5MG/5ML IP', productName: 'DOMSTAL 30ML SYP', quantity: 35, batch: 'TLK3M018', expiryDate: 'Jul-27', purchaseRate: 30.47, saleRate: 42.33 },
  { id: 's6', category: 'SYRUP', drugName: 'DEXTROMETHORPHAN HBR, PHENYLEPHRINE AND CPM', productName: 'ALEX COUGH SYRUP 100ML', quantity: 50, batch: 'AXC104', expiryDate: 'May-28', purchaseRate: 98.40, saleRate: 128.00 },
  { id: 's7', category: 'SYRUP', drugName: 'DEXTROMETHORPHAN HYDROBROMIDE AND CPM SYRUP', productName: 'BENADRYL DR SYRUP 100ML', quantity: 48, batch: 'BDC209', expiryDate: 'Jul-28', purchaseRate: 105.20, saleRate: 139.00 },
  { id: 's8', category: 'SYRUP', drugName: 'TERBUTALINE SULPHATE, BROMHEXINE AND GUAIPHENESIN', productName: 'GRILINCTUS-BM SYRUP 100ML', quantity: 40, batch: 'GLB501', expiryDate: 'Jun-28', purchaseRate: 85.50, saleRate: 112.00 },
  { id: 's9', category: 'SYRUP', drugName: 'PARACETAMOL PEDIATRIC SUSPENSION 250MG/5ML', productName: 'CALPOL 250MG PEDIATRIC SYP', quantity: 60, batch: 'CP2504', expiryDate: 'Mar-28', purchaseRate: 32.40, saleRate: 45.00 },
  { id: 's10', category: 'SYRUP', drugName: 'IBUPROFEN 100MG AND PARACETAMOL 162.5MG/5ML SUSP', productName: 'COMBIFLAM SYRUP 60ML', quantity: 55, batch: 'CFS202', expiryDate: 'Apr-28', purchaseRate: 34.10, saleRate: 48.00 },
  { id: 's11', category: 'SYRUP', drugName: 'AMOXICILLIN 125MG AND CLAVULANATE 31.25MG ORAL SUSP', productName: 'CLAVAM FORTE DRY SYRUP', quantity: 30, batch: 'CVF301', expiryDate: 'Dec-27', purchaseRate: 75.20, saleRate: 98.50 },
  { id: 's12', category: 'SYRUP', drugName: 'OFLOXACIN 50MG AND METRONIDAZOLE 120MG/5ML SUSP', productName: 'OFLOX-M SYRUP 60ML', quantity: 45, batch: 'OFM24', expiryDate: 'Jan-28', purchaseRate: 42.10, saleRate: 58.00 },
  { id: 's13', category: 'SYRUP', drugName: 'CYPROHEPTADINE AND TRICHOLINE CITRATE SYRUP', productName: 'CYPON SYRUP 200ML', quantity: 32, batch: 'CS2004', expiryDate: 'Aug-27', purchaseRate: 94.20, saleRate: 125.00 },
  { id: 's14', category: 'SYRUP', drugName: 'LACTULOSE SOLUTION USP LIQUID laxative', productName: 'DUPHALAC SYRUP 150ML', quantity: 28, batch: 'DP1504', expiryDate: 'Feb-28', purchaseRate: 145.80, saleRate: 198.00 },
  { id: 's15', category: 'SYRUP', drugName: 'SODIUM PICOSULFATE ORAL SOLUTION', productName: 'CREMAFFIN LIQUID 225ML', quantity: 25, batch: 'CF2251', expiryDate: 'Sep-27', purchaseRate: 165.40, saleRate: 220.00 },
  { id: 's16', category: 'SYRUP', drugName: 'FOLIC ACID, VITAMIN B12 AND IRON SYRUP', productName: 'DEXORANGE SYRUP 200ML', quantity: 50, batch: 'DO2001', expiryDate: 'Jul-28', purchaseRate: 118.50, saleRate: 154.00 },
  { id: 's17', category: 'SYRUP', drugName: 'CALCIUM CARBONATE AND VITAMIN D3 SUSPENSION', productName: 'OSTEOCALCIUM SYRUP 200ML', quantity: 40, batch: 'OC2003', expiryDate: 'May-28', purchaseRate: 124.10, saleRate: 162.00 },
  { id: 's18', category: 'SYRUP', drugName: 'FUNGAL DIASTASE AND PEPSIN ENZYME LIQUID', productName: 'ARISTOZYME SYRUP 200ML', quantity: 45, batch: 'AZ2005', expiryDate: 'Jun-28', purchaseRate: 98.20, saleRate: 132.00 },
  { id: 's19', category: 'SYRUP', drugName: 'METOCLOPRAMIDE HYDROCHLORIDE SYRUP', productName: 'REGLAN SYRUP 30ML', quantity: 24, batch: 'RG301', expiryDate: 'Mar-28', purchaseRate: 24.50, saleRate: 35.00 },
  { id: 's20', category: 'SYRUP', drugName: 'CETIRIZINE HYDROCHLORIDE ORAL SOLUTION', productName: 'ZENTEC SYRUP 60ML', quantity: 40, batch: 'ZT602', expiryDate: 'Jan-28', purchaseRate: 38.10, saleRate: 52.00 },
  { id: 's21', category: 'SYRUP', drugName: 'SILYMARIN WITH VITAMIN B COMPLEX SYRUP', productName: 'MARILIV SYRUP 200ML', quantity: 30, batch: 'ML200', expiryDate: 'Aug-27', purchaseRate: 115.00, saleRate: 155.00 },
  { id: 's22', category: 'SYRUP', drugName: 'AZITHROMYCIN ORAL SUSPENSION 200MG/5ML', productName: 'AZITHRAL SUSPENSION 30ML', quantity: 35, batch: 'AL302', expiryDate: 'Nov-27', purchaseRate: 48.20, saleRate: 64.00 },
  { id: 's23', category: 'SYRUP', drugName: 'ARTEMETHER AND LUMEFANTRINE SUSPENSION', productName: 'LUMERAX DRY SYRUP 60ML', quantity: 20, batch: 'LX602', expiryDate: 'Oct-27', purchaseRate: 98.40, saleRate: 132.00 },
  { id: 's24', category: 'SYRUP', drugName: 'OFLOXACIN SUSPENSION 50MG/5ML', productName: 'ZENFLOX SUSPENSION 60ML', quantity: 36, batch: 'ZF601', expiryDate: 'Apr-28', purchaseRate: 38.40, saleRate: 52.00 },
  { id: 's25', category: 'SYRUP', drugName: 'BACILLUS CLAUSII SPORES SUSPENSION', productName: 'ENTEROGERMINA 5ML MINI FLASK', quantity: 150, batch: 'EG5ML', expiryDate: 'Dec-27', purchaseRate: 42.00, saleRate: 58.00 },

  // --- CREAM (15 Items) ---
  { id: 'cr1', category: 'CREAM', drugName: 'FRAMYCETIN SULPHATE SKIN CREAM 30G', productName: 'SOFRAMYCIN CREAM', quantity: 50, batch: 'ISCH166', expiryDate: 'Jan-28', purchaseRate: 40.85, saleRate: 56.74 },
  { id: 'cr2', category: 'CREAM', drugName: 'MOMETASONE FUROATE CREAM 20GM', productName: 'MOMATE CREAM 20GM', quantity: 30, batch: '11241547', expiryDate: 'Oct-27', purchaseRate: 233.99, saleRate: 325.00 },
  { id: 'cr3', category: 'CREAM', drugName: 'CLOTRIMAZOLE ANTISEPTIC CREAM 15G', productName: 'CLOCIP 15G-CREAM', quantity: 45, batch: 'EL38', expiryDate: 'Apr-28', purchaseRate: 36.89, saleRate: 51.24 },
  { id: 'cr4', category: 'CREAM', drugName: 'MUPIROCIN SKIN CREAM 5GM', productName: 'T-BACT CREAM 5G', quantity: 35, batch: 'TB5012', expiryDate: 'Jun-28', purchaseRate: 110.20, saleRate: 142.00 },
  { id: 'cr5', category: 'CREAM', drugName: 'KETOCONAZOLE ANTIMYCOTIC CREAM 15G', productName: 'KETODERM CREAM 15G', quantity: 40, batch: 'KD1504', expiryDate: 'Feb-28', purchaseRate: 65.40, saleRate: 88.00 },
  { id: 'cr6', category: 'CREAM', drugName: 'BETAMETHASONE, NEOMYCIN AND CLOTRIMAZOLE', productName: 'BETNOVATE-C CREAM 30G', quantity: 80, batch: 'BNVC20', expiryDate: 'Sep-28', purchaseRate: 28.50, saleRate: 38.00 },
  { id: 'cr7', category: 'CREAM', drugName: 'BETAMETHASONE VALERATE SKIN CREAM 20G', productName: 'BETNOVATE-N CREAM', quantity: 90, batch: 'BNVN34', expiryDate: 'Oct-28', purchaseRate: 24.20, saleRate: 32.00 },
  { id: 'cr8', category: 'CREAM', drugName: 'CLOBETASOL PROPIONATE GENTAMICIN SKIN', productName: 'TENOVATE CREAM 15G', quantity: 60, batch: 'TN1502', expiryDate: 'Dec-27', purchaseRate: 22.10, saleRate: 30.00 },
  { id: 'cr9', category: 'CREAM', drugName: 'PERMETHRIN ANTISEPTIC LOUSE SCABIES 30G', productName: 'SCABIGARD CREAM', quantity: 30, batch: 'SG3012', expiryDate: 'Mar-28', purchaseRate: 55.40, saleRate: 78.00 },
  { id: 'cr10', category: 'CREAM', drugName: 'LULICONAZOLE FUNGAL CREAM 30G', productName: 'LULIFIN CREAM 30G', quantity: 25, batch: 'LF3004', expiryDate: 'Jan-28', purchaseRate: 198.00, saleRate: 260.00 },
  { id: 'cr11', category: 'CREAM', drugName: 'SILVER SULFADIAZINE BURN ANTISEPTIC 15G', productName: 'BURNHEAL CREAM', quantity: 40, batch: 'BH150', expiryDate: 'Jul-28', purchaseRate: 35.80, saleRate: 48.00 },
  { id: 'cr12', category: 'CREAM', drugName: 'FUSIDIC ACID DERMATOLOGICAL CREAM 10G', productName: 'FUSIGEN CREAM 10G', quantity: 35, batch: 'FG102', expiryDate: 'Aug-28', purchaseRate: 68.20, saleRate: 88.00 },
  { id: 'cr13', category: 'CREAM', drugName: 'HYDROQUINONE, TRETINOIN AND MOMETASONE', productName: 'MELACARE CREAM 15G', quantity: 50, batch: 'MC152', expiryDate: 'Sep-27', purchaseRate: 110.00, saleRate: 145.00 },
  { id: 'cr14', category: 'CREAM', drugName: 'DICLOFENAC SODIUM PAIN RELIEVING GEL 30G', productName: 'VOLINI GEL 30G', quantity: 70, batch: 'VL3025', expiryDate: 'Dec-28', purchaseRate: 85.20, saleRate: 115.00 },
  { id: 'cr15', category: 'CREAM', drugName: 'PAIN RELIEF FAST ACTING BALM 30G', productName: 'AMRUTANJAN STRONG BALM', quantity: 100, batch: 'AJ302', expiryDate: 'Dec-29', purchaseRate: 32.00, saleRate: 45.00 },

  // --- OINTMENT (10 Items) ---
  { id: 'o1', category: 'OINTMENT', drugName: 'MUPIROCIN OINTMENT 2% IP', productName: 'MUPIMET-OINT', quantity: 45, batch: 'N2579', expiryDate: 'Aug-27', purchaseRate: 82.17, saleRate: 107.00 },
  { id: 'o2', category: 'OINTMENT', drugName: 'POVIDONE-IODINE ANTISEPTIC OINTMENT 15G', productName: 'BETADINE OINTMENT 15G', quantity: 120, batch: 'BT1504', expiryDate: 'Dec-28', purchaseRate: 28.50, saleRate: 39.00 },
  { id: 'o3', category: 'OINTMENT', drugName: 'SALICYLIC ACID AND COAL TAR OINTMENT', productName: 'SALYTAR OINTMENT 20G', quantity: 25, batch: 'ST2012', expiryDate: 'Jul-27', purchaseRate: 74.20, saleRate: 98.00 },
  { id: 'o4', category: 'OINTMENT', drugName: 'TACROLIMUS OINTMENT 0.03% IP', productName: 'TACROZ OINTMENT 10G', quantity: 20, batch: 'TRZ101', expiryDate: 'Apr-28', purchaseRate: 145.10, saleRate: 198.00 },
  { id: 'o5', category: 'OINTMENT', drugName: 'AMOROLFINE HYDROCHLORIDE OINTMENT', productName: 'AMOROL OINTMENT 15G', quantity: 30, batch: 'AM150', expiryDate: 'Oct-27', purchaseRate: 124.50, saleRate: 165.00 },
  { id: 'o6', category: 'OINTMENT', drugName: 'RETINOIC ACID VITAMIN A OINT 15G', productName: 'RETINO-A OINT 15G', quantity: 40, batch: 'RA150', expiryDate: 'May-28', purchaseRate: 112.50, saleRate: 154.00 },
  { id: 'o7', category: 'OINTMENT', drugName: 'NEOMYCIN AND BACITRACIN ANTISEPTIC OINT', productName: 'NEOSPORIN OINTMENT 15G', quantity: 80, batch: 'NS1509', expiryDate: 'Jan-29', purchaseRate: 48.50, saleRate: 65.00 },
  { id: 'o8', category: 'OINTMENT', drugName: 'BECLOMETHASONE GENTAMICIN ANTISEPTIC', productName: 'BECLODERM OINT 15G', quantity: 60, batch: 'BD1504', expiryDate: 'Feb-28', purchaseRate: 24.10, saleRate: 32.00 },
  { id: 'o9', category: 'OINTMENT', drugName: 'NITROGLYCERIN RECTAL PAIN OINTMENT 30G', productName: 'RECTOCARE OINTMENT 30G', quantity: 15, batch: 'RC304', expiryDate: 'Nov-27', purchaseRate: 210.00, saleRate: 280.00 },
  { id: 'o10', category: 'OINTMENT', drugName: 'HEPARIN SODIUM TOPICAL ANTI COAGULANT OINT', productName: 'THROMBOPHOB OINT 20G', quantity: 50, batch: 'TP201', expiryDate: 'Oct-28', purchaseRate: 72.40, saleRate: 98.00 },

  // --- DROPS (12 Items) ---
  { id: 'd1', category: 'DROPS', drugName: 'SODIUM CHLORIDE ISOTONIC NASAL SPRAY', productName: 'NASOCLEAR-DROPS', quantity: 35, batch: 'TA0470A', expiryDate: 'Jun-28', purchaseRate: 50.96, saleRate: 70.78 },
  { id: 'd2', category: 'DROPS', drugName: 'CARBOXYMETHYLCELLULOSE SODIUM EYE DROPS', productName: 'REFRESH TEARS-DROPS', quantity: 42, batch: '121863', expiryDate: 'Aug-27', purchaseRate: 108.64, saleRate: 131.27 },
  { id: 'd3', category: 'DROPS', drugName: 'CIPROFLOXACIN OPHTHALMIC EYE/EAR DROPS', productName: 'CIPLOX EYE-EAR DROPS', quantity: 80, batch: 'CEE9021', expiryDate: 'Mar-28', purchaseRate: 12.50, saleRate: 18.00 },
  { id: 'd4', category: 'DROPS', drugName: 'TOBRAMYCIN OPHTHALMIC EYE DROPS 5ML', productName: 'TOBA EYE DROPS 5ML', quantity: 50, batch: 'TB502', expiryDate: 'Sep-27', purchaseRate: 48.50, saleRate: 65.00 },
  { id: 'd5', category: 'DROPS', drugName: 'MOXIFLOXACIN OPHTHALMIC EYE DROPS 5ML', productName: 'MOXICIP EYE DROPS 5ML', quantity: 65, batch: 'MC5012', expiryDate: 'Nov-27', purchaseRate: 75.20, saleRate: 98.00 },
  { id: 'd6', category: 'DROPS', drugName: 'FLURBIPROFEN AND GENTAMICIN EYE DROPS', productName: 'FLUR EYE DROPS 5ML', quantity: 30, batch: 'FL502', expiryDate: 'Jan-28', purchaseRate: 35.40, saleRate: 48.00 },
  { id: 'd7', category: 'DROPS', drugName: 'TIMOLOL MALEATE OPHTHALMIC SOLUTION 0.5%', productName: 'TIMOLOL EYE DROPS 5ML', quantity: 40, batch: 'TL504', expiryDate: 'Dec-27', purchaseRate: 45.10, saleRate: 62.00 },
  { id: 'd8', category: 'DROPS', drugName: 'PARADICHLOROBENZENE EAR WAX SOLVENT DROPS', productName: 'SOLUWAX EAR DROPS 10ML', quantity: 45, batch: 'SW102', expiryDate: 'Jun-28', purchaseRate: 62.40, saleRate: 85.00 },
  { id: 'd9', category: 'DROPS', drugName: 'XYLOMETAZOLINE HYDROCHLORIDE NASAL DROPS', productName: 'OTRIVIN ADULT NASAL DROPS', quantity: 70, batch: 'OV542', expiryDate: 'Dec-28', purchaseRate: 58.20, saleRate: 78.00 },
  { id: 'd10', category: 'DROPS', drugName: 'XYLOMETAZOLINE PEDIATRIC NASAL DROPS', productName: 'OTRIVIN PEDIATRIC DROPS', quantity: 50, batch: 'OVP102', expiryDate: 'Jan-28', purchaseRate: 52.40, saleRate: 72.00 },
  { id: 'd11', category: 'DROPS', drugName: 'BECLOMETHASONE DIPROPIONATE NASAL SPRAY', productName: 'BECONASE SPRAY', quantity: 25, batch: 'BN104', expiryDate: 'Sep-27', purchaseRate: 185.00, saleRate: 240.00 },
  { id: 'd12', category: 'DROPS', drugName: 'PEDIATRIC VITAMIN D3 ORAL DROPS 15ML', productName: 'MINI SHELCAL DROPS', quantity: 60, batch: 'MSD15', expiryDate: 'Apr-28', purchaseRate: 42.10, saleRate: 58.00 },

  // --- INJECTION (12 Items) ---
  { id: 'i1', category: 'INJECTION', drugName: 'CEFOTAXIME SODIUM INJECTION IP 1GM', productName: 'TAXIM INJ-1GM', quantity: 80, batch: '25180541', expiryDate: 'Dec-27', purchaseRate: 32.77, saleRate: 45.52 },
  { id: 'i2', category: 'INJECTION', drugName: 'PANTOPRAZOLE FOR INJECTION 40MG', productName: 'PANTOP-40 INJ', quantity: 100, batch: 'MPC260840', expiryDate: 'Feb-28', purchaseRate: 41.38, saleRate: 53.88 },
  { id: 'i3', category: 'INJECTION', drugName: 'CEFTRIAXONE SODIUM INJECTION 1GM', productName: 'MONOCEF-1GM INJ', quantity: 120, batch: 'MC1G24', expiryDate: 'Nov-27', purchaseRate: 48.50, saleRate: 62.00 },
  { id: 'i4', category: 'INJECTION', drugName: 'DICLOFENAC SODIUM INJECTION 75MG/3ML', productName: 'VOVERAN AQ INJ', quantity: 150, batch: 'VV209', expiryDate: 'Jan-28', purchaseRate: 15.20, saleRate: 22.00 },
  { id: 'i5', category: 'INJECTION', drugName: 'AMIKACIN SULPHATE INJECTION 500MG/2ML', productName: 'AMIKACIN 500 INJ', quantity: 90, batch: 'AK5004', expiryDate: 'Aug-27', purchaseRate: 38.40, saleRate: 51.00 },
  { id: 'i6', category: 'INJECTION', drugName: 'GENTAMICIN INJECTION 80MG/2ML', productName: 'GARAMYCIN INJ', quantity: 110, batch: 'GR802', expiryDate: 'Dec-27', purchaseRate: 8.50, saleRate: 14.00 },
  { id: 'i7', category: 'INJECTION', drugName: 'METHYLCOBALAMIN INJECTION 1500MCG', productName: 'MECOFAL INJ', quantity: 95, batch: 'MF152', expiryDate: 'Oct-27', purchaseRate: 22.40, saleRate: 35.00 },
  { id: 'i8', category: 'INJECTION', drugName: 'RANITIDINE INJECTION 25MG/ML 2ML', productName: 'ACILOC INJ', quantity: 130, batch: 'AC2ML', expiryDate: 'May-28', purchaseRate: 5.40, saleRate: 9.00 },
  { id: 'i9', category: 'INJECTION', drugName: 'ONDANSETRON HYDROCHLORIDE INJ 2MG/ML', productName: 'EMESET INJ 2ML', quantity: 110, batch: 'ES2ML', expiryDate: 'Jul-28', purchaseRate: 12.50, saleRate: 18.00 },
  { id: 'i10', category: 'INJECTION', drugName: 'HYOSCINE BUTYLBROMIDE INJECTION 20MG/ML', productName: 'BUSCOPAN INJ 1ML', quantity: 60, batch: 'BC1ML', expiryDate: 'Apr-27', purchaseRate: 28.10, saleRate: 38.00 },
  { id: 'i11', category: 'INJECTION', drugName: 'HYDROCORTISONE INJECTION 100MG', productName: 'PRIMACORT 100 INJ', quantity: 70, batch: 'PC102', expiryDate: 'Sep-27', purchaseRate: 35.20, saleRate: 48.00 },
  { id: 'i12', category: 'INJECTION', drugName: 'DEXAMETHASONE INJECTION 4MG/ML', productName: 'DECADRON INJ', quantity: 150, batch: 'DC2ML', expiryDate: 'Jun-28', purchaseRate: 6.20, saleRate: 11.00 },

  // --- IV-FLUID (8 Items) ---
  { id: 'iv1', category: 'IV-FLUID', drugName: 'SODIUM CHLORIDE INJECTION 500ML', productName: 'NS 500ML', quantity: 45, batch: '6C340386', expiryDate: 'Feb-29', purchaseRate: 23.94, saleRate: 37.25 },
  { id: 'iv2', category: 'IV-FLUID', drugName: 'COMPOUND SODIUM LACTATE INJECTION IP 500ML', productName: 'RL 500ML', quantity: 48, batch: 'SD340574', expiryDate: 'Aug-28', purchaseRate: 33.60, saleRate: 60.35 },
  { id: 'iv3', category: 'IV-FLUID', drugName: 'DEXTROSE 5% AND SODIUM CHLORIDE 0.9%', productName: 'DNS 500ML', quantity: 50, batch: 'DN2834', expiryDate: 'Nov-28', purchaseRate: 25.10, saleRate: 38.00 },
  { id: 'iv4', category: 'IV-FLUID', drugName: 'DEXTROSE INJECTION USP 5% 500ML', productName: 'D5 500ML', quantity: 30, batch: 'D5X20', expiryDate: 'Dec-28', purchaseRate: 22.40, saleRate: 35.00 },
  { id: 'iv5', category: 'IV-FLUID', drugName: 'DEXTROSE INJECTION USP 10% 500ML', productName: 'D10 500ML', quantity: 25, batch: 'D10X54', expiryDate: 'Jan-29', purchaseRate: 24.80, saleRate: 39.00 },
  { id: 'iv6', category: 'IV-FLUID', drugName: 'MANNITOL INJECTION IP 20% 100ML', productName: 'MANNITOL 100ML', quantity: 40, batch: 'MN100', expiryDate: 'Sep-27', purchaseRate: 48.50, saleRate: 75.00 },
  { id: 'iv7', category: 'IV-FLUID', drugName: 'PARACETAMOL IV INFUSION 100ML 1GM', productName: 'FEBRINIL IV 100ML', quantity: 60, batch: 'FB1004', expiryDate: 'Jul-28', purchaseRate: 85.20, saleRate: 120.00 },
  { id: 'iv8', category: 'IV-FLUID', drugName: 'METRONIDAZOLE IV INFUSION 100ML 500MG', productName: 'METROGYL IV 100ML', quantity: 80, batch: 'MGI102', expiryDate: 'May-28', purchaseRate: 18.40, saleRate: 28.00 },

  // --- GENERAL SUPPLIES (BANDAGE, WOOL, SYRINGES, ANKLE BINDER - 16 Items) ---
  { id: 'b1', category: 'BANDAGE', drugName: 'COTTON CREPE BANDAGE BP', productName: 'TOPCREPE BANDAGE', quantity: 25, batch: 'ND251070', expiryDate: 'May-30', purchaseRate: 102.90, saleRate: 341.00 },
  { id: 'b2', category: 'BANDAGE', drugName: 'SURGICAL ADHESIVE PLASTER TAPE 2 INCH', productName: 'MICROPORE TAPE 2INCH', quantity: 50, batch: 'MP501', expiryDate: 'Dec-30', purchaseRate: 42.00, saleRate: 65.00 },
  { id: 'b3', category: 'BANDAGE', drugName: 'SURGICAL ADHESIVE TAPE 1 INCH', productName: 'MICROPORE TAPE 1INCH', quantity: 60, batch: 'MP105', expiryDate: 'Dec-30', purchaseRate: 22.00, saleRate: 35.00 },
  { id: 'b4', category: 'BANDAGE', drugName: 'STERILE ROLLED GAUZE BANDAGE 3 INCH', productName: 'STERILE GAUZE ROLL 3INCH', quantity: 150, batch: 'GR304', expiryDate: 'Nov-30', purchaseRate: 5.50, saleRate: 12.00 },
  { id: 'b5', category: 'BANDAGE', drugName: 'STERILE ROLLED GAUZE BANDAGE 4 INCH', productName: 'STERILE GAUZE ROLL 4INCH', quantity: 120, batch: 'GR409', expiryDate: 'Nov-30', purchaseRate: 7.20, saleRate: 15.00 },
  
  { id: 'w1', category: 'WOOL', drugName: 'ABSORBENT COTTON WOOL 50G', productName: 'ABSORBENT COTTON-SMALL', quantity: 60, batch: '1177', expiryDate: 'Sep-27', purchaseRate: 12.80, saleRate: 25.00 },
  { id: 'w2', category: 'WOOL', drugName: 'ABSORBENT COTTON WOOL 100G', productName: 'ABSORBENT COTTON-MEDIUM', quantity: 45, batch: '1178', expiryDate: 'Sep-27', purchaseRate: 22.50, saleRate: 45.00 },
  { id: 'w3', category: 'WOOL', drugName: 'ABSORBENT COTTON WOOL 500G', productName: 'ABSORBENT COTTON-LARGE', quantity: 20, batch: '1179', expiryDate: 'Sep-27', purchaseRate: 98.00, saleRate: 150.00 },
  
  { id: 'sy1', category: 'SYRINGES', drugName: 'SINGLE USE STERILE SYRINGE-2ML', productName: 'DISPOVAN SYRINGE-2ML', quantity: 300, batch: 'R2476', expiryDate: 'Nov-28', purchaseRate: 2.31, saleRate: 9.84 },
  { id: 'sy2', category: 'SYRINGES', drugName: 'SINGLE USE STERILE SYRINGE-5ML', productName: 'DISPOVAN SYRINGE-5ML', quantity: 250, batch: 'R504', expiryDate: 'Nov-28', purchaseRate: 3.10, saleRate: 12.00 },
  { id: 'sy3', category: 'SYRINGES', drugName: 'SINGLE USE STERILE SYRINGE-10ML', productName: 'DISPOVAN SYRINGE-10ML', quantity: 150, batch: 'R102', expiryDate: 'Nov-28', purchaseRate: 4.80, saleRate: 18.00 },
  { id: 'sy4', category: 'SYRINGES', drugName: 'STERILE INSULIN SYRINGE 1ML 40 UNIT', productName: 'INSULIN SYRINGE 1ML', quantity: 200, batch: 'IS40', expiryDate: 'Oct-28', purchaseRate: 3.50, saleRate: 10.00 },
  { id: 'sy5', category: 'SYRINGES', drugName: 'SCALP VEIN INFUSION BUTTERFLY SET 24G', productName: 'BUTTERFLY NEEDLE SET 24G', quantity: 120, batch: 'BF24', expiryDate: 'Mar-28', purchaseRate: 14.20, saleRate: 25.00 },
  
  { id: 'ab1', category: 'ANKLE BINDER', drugName: 'ELASTIC ANKLE BINDER SUPPORT', productName: 'ANKLE BINDER S-SIZE', quantity: 15, batch: 'S01-0925', expiryDate: 'Aug-30', purchaseRate: 144.90, saleRate: 230.00 },
  { id: 'ab2', category: 'ANKLE BINDER', drugName: 'ELASTIC ANKLE BINDER SUPPORT MEDIUM', productName: 'ANKLE BINDER M-SIZE', quantity: 18, batch: 'M01-0925', expiryDate: 'Aug-30', purchaseRate: 155.00, saleRate: 245.00 },
  { id: 'ab3', category: 'ANKLE BINDER', drugName: 'ELASTIC ANKLE BINDER SUPPORT LARGE', productName: 'ANKLE BINDER L-SIZE', quantity: 12, batch: 'L01-0925', expiryDate: 'Aug-30', purchaseRate: 165.00, saleRate: 260.00 }
];

export const CATEGORIES = Array.from(new Set(INITIAL_DRUGS_DATA.map(d => d.category))).sort();

// Helper to provide simple pediatric and geriatric warnings/dosage guidelines
export function getDosageGuidelines(drugName: string, ageStr: string): string {
  const age = parseFloat(ageStr);
  const isMonths = ageStr.toLowerCase().includes('month') || ageStr.toLowerCase().includes('m');
  
  const generic = drugName.toUpperCase();
  const brand = drugName.toUpperCase();
  const full = `${generic} ${brand}`;
  
  if (full.includes('PARACETAMOL') || full.includes('DOLO') || full.includes('CALPOL') || full.includes('FEBRINIL')) {
    if (isMonths || age < 1) {
      return 'Pediatric (Infant): 10-15 mg/kg per dose. Use paracetamol pediatric drops with precise dropper measuring.';
    } else if (age < 12) {
      return 'Pediatric (Child 1-12 yrs): 120mg to 250mg oral suspension. Max 4 times daily (interval 4-6 hours).';
    } else {
      return 'Adult: 500mg - 650mg every 4-6 hours. Max dosage limit is 4000mg/day to prevent hepatotoxicity.';
    }
  }
  
  if (full.includes('AMOXICILLIN') || full.includes('MEGA-CV') || full.includes('CLAVAM')) {
    if (isMonths || age < 1) {
      return 'Pediatric: Use extreme caution. Dry Syrup 1.25ml - 2.5ml twice daily depending on body weight.';
    } else if (age < 12) {
      return 'Pediatric: 20-40 mg/kg/day in 2 or 3 divided doses. Recommended to use 228.5mg or 457mg Dry Syrup.';
    } else {
      return 'Adult: 625mg (Amoxicillin 500mg + Clavulanate 125mg) twice or thrice daily for 5-7 days.';
    }
  }

  if (full.includes('CETIRIZINE') || full.includes('OKACET') || full.includes('ALERID') || full.includes('XYZAL') || full.includes('L-HIST')) {
    if (age < 2 && !isMonths) {
      return 'Pediatric (under 2 yrs): Consult specialist. Standard is 2.5ml oral solution (2.5mg) once daily.';
    } else if (age < 6) {
      return 'Pediatric (2-5 yrs): 2.5mg oral syrup once or twice daily.';
    } else if (age < 12) {
      return 'Pediatric (6-11 yrs): 5mg tablet once daily or divided into two doses.';
    } else {
      return 'Adult: 10mg Cetirizine (or 5mg Levocetirizine) once daily, preferably in the evening/night.';
    }
  }

  if (full.includes('PANTOPRAZOLE') || full.includes('PANTOP') || full.includes('PAN-D') || full.includes('OMEZ') || full.includes('OMEPRAZOLE')) {
    if (age < 12) {
      return 'Pediatric (under 12): Safety not fully established for generic PPIs. Dosage must be calculated by pediatrician.';
    } else {
      return 'Adult: 40mg Pantoprazole (or 20mg Omeprazole) once daily, strictly 30-45 minutes before breakfast.';
    }
  }

  if (full.includes('AZITHROMYCIN') || full.includes('AZICIP') || full.includes('AZITHRAL')) {
    if (age < 12) {
      return 'Pediatric: 10 mg/kg/day once daily for 3 days. Use Azithromycin suspension.';
    } else {
      return 'Adult: 500mg once daily on an empty stomach for 3 days (Total 1.5g course).';
    }
  }

  if (full.includes('METFORMIN') || full.includes('GLYCOMET') || full.includes('GLIMEPIRIDE')) {
    if (age < 18) {
      return 'Pediatric (under 18): Anti-diabetics require close pediatric endocrinologist oversight. Metformin approved >10 yrs.';
    } else {
      return 'Adult: Initial Metformin 500mg once or twice daily with meals. Escalate gradually under sugar monitoring.';
    }
  }

  if (full.includes('COMBIFLAM') || full.includes('IBUPROFEN') || full.includes('BRUFEN')) {
    if (isMonths || age < 1) {
      return 'Pediatric (under 1 yr): Ibuprofen is not recommended unless prescribed for juvenile arthritis/specific fevers.';
    } else if (age < 12) {
      return 'Pediatric: 5-10 mg/kg/dose. Use suspension form. Administer with food or milk to prevent GI distress.';
    } else {
      return 'Adult: 400mg Ibuprofen 2 to 3 times daily after food. Max 1200mg/day.';
    }
  }

  return 'Standard clinical dosage. For geriatric or pediatric patients, adjust intervals or consult specialized guidelines.';
}
