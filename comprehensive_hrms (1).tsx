import React, { useState } from 'react';
import {
  Users, DollarSign, Clock, Calendar, Briefcase, Award, FileText,
  CalendarDays, BarChart2, Settings, Home, User, Megaphone, Shield,
  Menu, X, Plus, Search, Check, Download,
  Upload, AlertCircle, CreditCard,
  Edit3, Trash2, ZoomIn, ZoomOut, Network,
  Package, Printer, Receipt, Paperclip, Lock, Mail, LogOut, ShieldCheck, KeyRound
} from 'lucide-react';

// Navigation Items Definition
const navItems = {
  'admin-dashboard': { id: 'admin-dashboard', label: 'HR Dashboard', icon: Home },
  'employee-mgmt': { id: 'employee-mgmt', label: 'Employee Mgmt', icon: Users },
  'payroll-mgmt': { id: 'payroll-mgmt', label: 'Payroll Mgmt', icon: DollarSign },
  'claims-mgmt': { id: 'claims-mgmt', label: 'Claims Management', icon: CreditCard },
  'attendance-mgmt': { id: 'attendance-mgmt', label: 'Attendance', icon: Clock },
  'leave-mgmt': { id: 'leave-mgmt', label: 'Leave Mgmt', icon: Calendar },
  'asset-mgmt': { id: 'asset-mgmt', label: 'Company Assets', icon: Package },
  'admin-announcements': { id: 'admin-announcements', label: 'Announcements', icon: Megaphone },
  'org-chart': { id: 'org-chart', label: 'Org Chart', icon: Network },
  'recruitment': { id: 'recruitment', label: 'Recruitment', icon: Briefcase },
  'performance-mgmt': { id: 'performance-mgmt', label: 'Performance', icon: Award },
  'doc-mgmt': { id: 'doc-mgmt', label: 'Documents & Letters', icon: FileText },
  'shift-mgmt': { id: 'shift-mgmt', label: 'Shift & Roster', icon: CalendarDays },
  'reports': { id: 'reports', label: 'Reports & Analytics', icon: BarChart2 },
  'user-roles': { id: 'user-roles', label: 'User & Role Mgmt', icon: Shield },
  'system-settings': { id: 'system-settings', label: 'Settings', icon: Settings },

  'emp-dashboard': { id: 'emp-dashboard', label: 'My Dashboard', icon: Home },
  'emp-profile': { id: 'emp-profile', label: 'My Profile', icon: User },
  'emp-attendance': { id: 'emp-attendance', label: 'My Attendance', icon: Clock },
  'emp-leave': { id: 'emp-leave', label: 'My Leave', icon: Calendar },
  'emp-payroll': { id: 'emp-payroll', label: 'My Payroll', icon: DollarSign },
  'emp-schedule': { id: 'emp-schedule', label: 'My Schedule', icon: CalendarDays },
  'emp-claims': { id: 'emp-claims', label: 'My Claims', icon: Receipt },
  'emp-assets': { id: 'emp-assets', label: 'My Assets', icon: Package },
  'emp-org-chart': { id: 'emp-org-chart', label: 'Org Chart', icon: Network },
  'emp-announcements': { id: 'emp-announcements', label: 'Announcements', icon: Megaphone },
  'emp-performance': { id: 'emp-performance', label: 'My Performance', icon: Award },
};

const roleNavMap = {
  'Super Admin': [
    'admin-dashboard', 'employee-mgmt', 'user-roles', 'payroll-mgmt', 'claims-mgmt', 'attendance-mgmt', 'leave-mgmt', 'asset-mgmt', 'admin-announcements', 'org-chart', 'recruitment', 'performance-mgmt', 'doc-mgmt', 'shift-mgmt', 'reports', 'system-settings',
    'emp-profile', 'emp-attendance', 'emp-leave', 'emp-payroll', 'emp-schedule', 'emp-claims', 'emp-assets', 'emp-performance'
  ],
  'HR Admin': [
    'admin-dashboard', 'employee-mgmt', 'user-roles', 'claims-mgmt', 'attendance-mgmt', 'leave-mgmt', 'asset-mgmt', 'admin-announcements', 'org-chart', 'recruitment', 'performance-mgmt', 'doc-mgmt', 'reports',
    'emp-profile', 'emp-attendance', 'emp-leave', 'emp-payroll', 'emp-schedule', 'emp-claims', 'emp-assets', 'emp-performance'
  ],
  'Manager / Supervisor': [
    'admin-dashboard', 'claims-mgmt', 'attendance-mgmt', 'leave-mgmt', 'performance-mgmt', 'org-chart', 'shift-mgmt',
    'emp-profile', 'emp-attendance', 'emp-leave', 'emp-payroll', 'emp-schedule', 'emp-claims', 'emp-assets', 'emp-announcements', 'emp-performance'
  ],
  'Finance': [
    'admin-dashboard', 'payroll-mgmt', 'claims-mgmt', 'org-chart', 'reports',
    'emp-profile', 'emp-attendance', 'emp-leave', 'emp-payroll', 'emp-schedule', 'emp-claims', 'emp-assets', 'emp-announcements', 'emp-performance'
  ],
  'Employee': ['emp-dashboard', 'emp-profile', 'emp-attendance', 'emp-leave', 'emp-payroll', 'emp-schedule', 'emp-claims', 'emp-assets', 'emp-org-chart', 'emp-announcements', 'emp-performance'],
};

const formatMoney = (val) => {
  const num = Number(val);
  return isNaN(num) ? '0.00' : num.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSentMsg, setResetSentMsg] = useState('');
  const [activeTab, setActiveTab] = useState('admin-dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentRole = loggedInUser?.systemRole || 'Employee';

  // Core Employees State with Assigned RBAC Credentials
  const [employees, setEmployees] = useState([
    {
      id: 'EMP-001',
      name: 'Tan Sri Azman',
      preferredName: 'Azman',
      ic: '720514-14-5521',
      dob: '14/05/1972',
      gender: 'Male',
      nationality: 'Malaysian',
      maritalStatus: 'Married',
      workEmail: 'azman@bengkelpro.my',
      password: 'password123',
      systemRole: 'Super Admin',
      personalEmail: 'azman.ceo@bengkelpro.my',
      phone: '+60 12-200 1111',
      address: 'No. 1, Bukit Tunku, 50480 Kuala Lumpur',
      department: 'Executive',
      role: 'Chief Executive Officer (CEO)',
      employmentType: 'Full-time',
      joinDate: '01/01/2018',
      managerId: null,
      location: 'HQ',
      status: 'Active',
      basicSalary: 18000,
      alBalance: 24,
      mcBalance: 14,
      emergencyName: 'Puan Sri Zarina',
      emergencyRelation: 'Spouse',
      emergencyPhone: '+60 12-200 2222',
      emergencyAddress: 'No. 1, Bukit Tunku, 50480 Kuala Lumpur',
      bankName: 'Maybank',
      accountHolder: 'AZMAN BIN ABDULLAH',
      bankAccount: '**** **** 8821'
    },
    {
      id: 'EMP-002',
      name: 'Ahmad Albab',
      preferredName: 'Ahmad',
      ic: '850820-10-5123',
      dob: '20/08/1985',
      gender: 'Male',
      nationality: 'Malaysian',
      maritalStatus: 'Married',
      workEmail: 'ahmad@bengkelpro.my',
      password: 'password123',
      systemRole: 'Manager / Supervisor',
      personalEmail: 'ahmad.albab@gmail.com',
      phone: '+60 13-345 6789',
      address: 'No. 45, Jalan Setiawangsa 12, 54200 Kuala Lumpur',
      department: 'Workshop Operations',
      role: 'Head Foreman & Service Manager',
      employmentType: 'Full-time',
      joinDate: '15/03/2020',
      managerId: 'EMP-001',
      location: 'HQ',
      status: 'Active',
      basicSalary: 5800,
      alBalance: 14,
      mcBalance: 12,
      emergencyName: 'Siti Aminah',
      emergencyRelation: 'Spouse',
      emergencyPhone: '+60 19-876 5432',
      emergencyAddress: 'No. 45, Jalan Setiawangsa 12, 54200 Kuala Lumpur',
      bankName: 'CIMB Bank',
      accountHolder: 'AHMAD ALBAB BIN ISMAIL',
      bankAccount: '**** **** 4410'
    },
    {
      id: 'EMP-003',
      name: 'Sarah Lee',
      preferredName: 'Sarah',
      ic: '900312-07-5882',
      dob: '12/03/1990',
      gender: 'Female',
      nationality: 'Malaysian',
      maritalStatus: 'Single',
      workEmail: 'sarah@bengkelpro.my',
      password: 'password123',
      systemRole: 'HR Admin',
      personalEmail: 'sarah.lee@gmail.com',
      phone: '+60 16-778 9900',
      address: 'B-12-04, Residensi Harmoni, 47500 Subang Jaya',
      department: 'Human Resources & Admin',
      role: 'HR & Finance Manager',
      employmentType: 'Full-time',
      joinDate: '10/06/2021',
      managerId: 'EMP-001',
      location: 'HQ',
      status: 'Active',
      basicSalary: 5200,
      alBalance: 16,
      mcBalance: 14,
      emergencyName: 'Lee Chong Wei',
      emergencyRelation: 'Father',
      emergencyPhone: '+60 12-334 5566',
      emergencyAddress: 'No. 88, Jalan SS15/4, 47500 Subang Jaya',
      bankName: 'Public Bank',
      accountHolder: 'SARAH LEE MEI LING',
      bankAccount: '**** **** 9012'
    },
    {
      id: 'EMP-004',
      name: 'David Chen',
      preferredName: 'David',
      ic: '941105-08-6129',
      dob: '05/11/1994',
      gender: 'Male',
      nationality: 'Malaysian',
      maritalStatus: 'Single',
      workEmail: 'david@bengkelpro.my',
      password: 'password123',
      systemRole: 'Employee',
      personalEmail: 'david.chen@gmail.com',
      phone: '+60 17-554 3321',
      address: 'No. 18, Jalan USJ 11/3, 47620 Subang Jaya',
      department: 'Marketing',
      role: 'Marketing Executive',
      employmentType: 'Full-time',
      joinDate: '01/02/2023',
      managerId: 'EMP-003',
      location: 'Branch A',
      status: 'Active',
      basicSalary: 3600,
      alBalance: 11,
      mcBalance: 13,
      emergencyName: 'Grace Chen',
      emergencyRelation: 'Sister',
      emergencyPhone: '+60 17-998 7766',
      emergencyAddress: 'No. 18, Jalan USJ 11/3, 47620 Subang Jaya',
      bankName: 'Maybank',
      accountHolder: 'DAVID CHEN WEI MING',
      bankAccount: '**** **** 3319'
    },
    {
      id: 'EMP-005',
      name: 'Muthu Kumar',
      preferredName: 'Muthu',
      ic: '960719-05-5431',
      dob: '19/07/1996',
      gender: 'Male',
      nationality: 'Malaysian',
      maritalStatus: 'Married',
      workEmail: 'muthu@bengkelpro.my',
      password: 'password123',
      systemRole: 'Employee',
      personalEmail: 'muthu.mech@gmail.com',
      phone: '+60 14-662 1188',
      address: 'No. 9, Taman Sri Muda, 40400 Shah Alam',
      department: 'Workshop Operations',
      role: 'Senior Mechanic',
      employmentType: 'Full-time',
      joinDate: '15/08/2022',
      managerId: 'EMP-002',
      location: 'HQ',
      status: 'Active',
      basicSalary: 3400,
      alBalance: 10,
      mcBalance: 11,
      emergencyName: 'Kavitha Devi',
      emergencyRelation: 'Spouse',
      emergencyPhone: '+60 14-662 9900',
      emergencyAddress: 'No. 9, Taman Sri Muda, 40400 Shah Alam',
      bankName: 'RHB Bank',
      accountHolder: 'MUTHU KUMAR A/L RAJU',
      bankAccount: '**** **** 7745'
    }
  ]);

  // Payslips State
  const [payslips, setPayslips] = useState([
    { id: 101, empId: 'EMP-004', empName: 'David Chen', month: 'October 2026', basic: 3600, allowance: 300, commission: 450, ot: 120, deductions: 435, netPay: 4035, status: 'Paid', fileName: 'Payslip_EMP004_Oct2026.pdf' },
    { id: 102, empId: 'EMP-002', empName: 'Ahmad Albab', month: 'October 2026', basic: 5800, allowance: 500, commission: 1150, ot: 320, deductions: 790, netPay: 6980, status: 'Paid', fileName: 'Payslip_EMP002_Oct2026.pdf' },
    { id: 103, empId: 'EMP-005', empName: 'Muthu Kumar', month: 'October 2026', basic: 3400, allowance: 250, commission: 880, ot: 280, deductions: 410, netPay: 4400, status: 'Paid', fileName: 'Payslip_EMP005_Oct2026.pdf' },
  ]);

  // Leaves & Dynamic Leave Types State
  const [leaveTypes, setLeaveTypes] = useState([
    { id: 1, name: 'Annual Leave', paidType: 'Paid', deductBalance: 'Yes', defaultDays: 14, requireDoc: false, status: 'Active' },
    { id: 2, name: 'Medical Leave', paidType: 'Paid', deductBalance: 'Yes', defaultDays: 14, requireDoc: true, status: 'Active' },
    { id: 3, name: 'Hospitalisation Leave', paidType: 'Paid', deductBalance: 'Yes', defaultDays: 60, requireDoc: true, status: 'Active' },
    { id: 4, name: 'Emergency Leave', paidType: 'Configurable', deductBalance: 'Configurable', defaultDays: 3, requireDoc: false, status: 'Active' },
    { id: 5, name: 'Unpaid Leave', paidType: 'Unpaid', deductBalance: 'No paid balance', defaultDays: 0, requireDoc: false, status: 'Active' },
    { id: 6, name: 'Maternity Leave', paidType: 'Paid', deductBalance: 'Separate entitlement', defaultDays: 98, requireDoc: true, status: 'Active' },
    { id: 7, name: 'Paternity Leave', paidType: 'Paid', deductBalance: 'Separate entitlement', defaultDays: 7, requireDoc: true, status: 'Active' },
    { id: 8, name: 'Marriage Leave', paidType: 'Configurable', deductBalance: 'Configurable', defaultDays: 3, requireDoc: true, status: 'Active' },
    { id: 9, name: 'Compassionate Leave', paidType: 'Configurable', deductBalance: 'Configurable', defaultDays: 3, requireDoc: false, status: 'Active' },
    { id: 10, name: 'Pilgrimage Leave', paidType: 'Configurable', deductBalance: 'Configurable', defaultDays: 14, requireDoc: true, status: 'Active' },
    { id: 11, name: 'Medical Appointment', paidType: 'Configurable', deductBalance: 'Configurable', defaultDays: 2, requireDoc: true, status: 'Active' },
  ]);

  const [leaves, setLeaves] = useState([
    { id: 1, empId: 'EMP-004', empName: 'David Chen', type: 'Annual Leave', startDate: '2026-11-20', endDate: '2026-11-22', days: 3, reason: 'Family trip to Melaka', attachment: '', status: 'Pending' },
    { id: 2, empId: 'EMP-005', empName: 'Muthu Kumar', type: 'Medical Leave', startDate: '2026-11-10', endDate: '2026-11-11', days: 2, reason: 'High fever & flu', attachment: 'MC_Klinik_Mediviron.pdf', status: 'Approved' },
  ]);

  // Claims State
  const [claims, setClaims] = useState([
    {
      id: 1,
      refNo: 'CLM-2026-1001',
      empId: 'EMP-004',
      empName: 'David Chen',
      department: 'Marketing',
      branch: 'Branch A',
      type: 'Mileage, Toll & Petrol',
      amount: 145.50,
      projectCode: 'CC-MKT-01',
      receiptName: 'petronas_toll_nov.pdf',
      remarks: 'Client site visits in Shah Alam & Klang',
      submissionDate: '2026-11-05',
      monthYear: '2026-11',
      status: 'Approved',
      rejectionReason: ''
    },
    {
      id: 2,
      refNo: 'CLM-2026-1002',
      empId: 'EMP-002',
      empName: 'Ahmad Albab',
      department: 'Workshop Operations',
      branch: 'HQ',
      type: 'Urgent Workshop Parts / Tools',
      amount: 235.50,
      projectCode: 'CC-WS-HQ',
      receiptName: 'spare_parts_urgent.jpg',
      remarks: 'Emergency OBD2 diagnostic cable replacement',
      submissionDate: '2026-11-10',
      monthYear: '2026-11',
      status: 'Pending',
      rejectionReason: ''
    },
    {
      id: 3,
      refNo: 'CLM-2026-1003',
      empId: 'EMP-004',
      empName: 'David Chen',
      department: 'Marketing',
      branch: 'Branch A',
      type: 'Client Entertainment',
      amount: 180.00,
      projectCode: 'CC-MKT-01',
      receiptName: 'dinner_slip.jpg',
      remarks: 'Vendor meeting dinner',
      submissionDate: '2026-10-18',
      monthYear: '2026-10',
      status: 'Rejected',
      rejectionReason: 'Missing itemized tax invoice. Only credit card slip was attached.'
    },
    {
      id: 4,
      refNo: 'CLM-2026-1005',
      empId: 'EMP-004',
      empName: 'David Chen',
      department: 'Marketing',
      branch: 'Branch A',
      type: 'Outstation Meal Allowance',
      amount: 120.00,
      projectCode: 'CC-MKT-02',
      receiptName: 'client_lunch_receipt.pdf',
      remarks: 'Outstation client lunch meeting in Penang',
      submissionDate: '2026-11-12',
      monthYear: '2026-11',
      status: 'Paid',
      rejectionReason: ''
    }
  ]);

  const [claimPolicies, setClaimPolicies] = useState([
    { id: 1, category: 'Medical & Dental', monthlyLimit: 300, yearlyLimit: 1500, requireReceipt: true, status: 'Active' },
    { id: 2, category: 'Mileage, Toll & Petrol', monthlyLimit: 500, yearlyLimit: 6000, requireReceipt: true, status: 'Active' },
    { id: 3, category: 'Outstation Meal Allowance', monthlyLimit: 400, yearlyLimit: 4800, requireReceipt: true, status: 'Active' },
    { id: 4, category: 'Urgent Workshop Parts / Tools', monthlyLimit: 1000, yearlyLimit: 10000, requireReceipt: true, status: 'Active' },
    { id: 5, category: 'Client Entertainment', monthlyLimit: 600, yearlyLimit: 5000, requireReceipt: true, status: 'Active' },
  ]);

  const [employeeClaimLimits, setEmployeeClaimLimits] = useState([
    { empId: 'EMP-001', annualLimit: 15000, usedAmount: 1200 },
    { empId: 'EMP-002', annualLimit: 8000, usedAmount: 235.50 },
    { empId: 'EMP-003', annualLimit: 8000, usedAmount: 950 },
    { empId: 'EMP-004', annualLimit: 4000, usedAmount: 120 },
    { empId: 'EMP-005', annualLimit: 3500, usedAmount: 0 },
  ]);

  // Announcements State
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Annual Workshop Stocktake & Safety Audit',
      category: 'Policy',
      priority: 'Urgent',
      date: '2026-11-12',
      author: 'Sarah Lee (HR Manager)',
      content: 'All workshop mechanics and service advisors are required to attend the mandatory safety briefing and tool inventory audit this Friday at 9:00 AM.',
      acknowledgedBy: ['EMP-002', 'EMP-005']
    },
    {
      id: 2,
      title: 'Year-End Company Dinner & Awards Night',
      category: 'Event',
      priority: 'Normal',
      date: '2026-11-08',
      author: 'Tan Sri Azman (CEO)',
      content: 'Join us for our annual appreciation dinner on December 18th at Grand Hyatt KL. Please RSVP via HR by end of this month.',
      acknowledgedBy: ['EMP-001', 'EMP-003', 'EMP-004']
    }
  ]);

  // Company Assets State
  const [assets, setAssets] = useState([
    { id: 'AST-001', name: 'MacBook Pro 14"', category: 'Laptop / Computer', serialNo: 'C02X9182MD6R', assignedTo: 'EMP-004', assignedDate: '2023-02-01', returnDate: '', condition: 'Good', status: 'Assigned' },
    { id: 'AST-002', name: 'Samsung Galaxy S23 (Service Line)', category: 'Mobile Phone', serialNo: 'R58T90123KL', assignedTo: 'EMP-002', assignedDate: '2023-05-15', returnDate: '', condition: 'Good', status: 'Assigned' },
    { id: 'AST-003', name: 'HQ Bay 1-4 Master Keys', category: 'Company Keys', serialNo: 'KEY-HQ-01', assignedTo: 'EMP-002', assignedDate: '2020-03-15', returnDate: '', condition: 'Good', status: 'Assigned' },
    { id: 'AST-004', name: 'RFID Door Access Card', category: 'Access Card', serialNo: 'ACC-8841', assignedTo: 'EMP-003', assignedDate: '2021-06-10', returnDate: '', condition: 'Good', status: 'Assigned' },
    { id: 'AST-005', name: 'Dell Latitude 5430', category: 'Laptop / Computer', serialNo: 'DL-99210-MY', assignedTo: '', assignedDate: '', returnDate: '', condition: 'Good', status: 'Available' }
  ]);

  // Employee Claims Modal & Filter States
  const [editingClaim, setEditingClaim] = useState(null);
  const [claimMonthFilter, setClaimMonthFilter] = useState('All');
  const [claimStatusFilter, setClaimStatusFilter] = useState('All');
  const [selectedRejectionModal, setSelectedRejectionModal] = useState(null);
  const [claimToast, setClaimToast] = useState('');

  // Admin Claim Management States
  const [adminClaimTab, setAdminClaimTab] = useState('All Claims');
  const [adminClaimEmpFilter, setAdminClaimEmpFilter] = useState('All');
  const [adminClaimDeptFilter, setAdminClaimDeptFilter] = useState('All');
  const [adminClaimBranchFilter, setAdminClaimBranchFilter] = useState('All');
  const [adminClaimSearch, setAdminClaimSearch] = useState('');
  const [adminClaimActionModal, setAdminClaimActionModal] = useState(null);
  const [adminActionReason, setAdminActionReason] = useState('');
  const [viewingReceiptClaim, setViewingReceiptClaim] = useState(null);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [editingEmpLimit, setEditingEmpLimit] = useState(null);
  const [adminClaimToast, setAdminClaimToast] = useState('');
  const [reportPeriod, setReportPeriod] = useState('2026-11');

  // Document & Letter Generator States
  const [selectedLetterType, setSelectedLetterType] = useState('Employment Offer Letter');
  const [selectedLetterEmpId, setSelectedLetterEmpId] = useState('EMP-004');
  const [letterEffectiveDate, setLetterEffectiveDate] = useState('2026-12-01');
  const [letterNewSalary, setLetterNewSalary] = useState('4200');
  const [letterNewPosition, setLetterNewPosition] = useState('Senior Marketing Executive');
  const [letterWarningReason, setLetterWarningReason] = useState('Repeated late attendance without prior notice');
  const [generatedLetters, setGeneratedLetters] = useState([
    { id: 1, refNo: 'HR/LTR/2026/001', type: 'Employment Offer Letter', empName: 'David Chen', empId: 'EMP-004', date: '2023-01-15', issuedBy: 'Sarah Lee' }
  ]);
  const [docToast, setDocToast] = useState('');

  // Additional UI States for Core Modules
  const [editingEmp, setEditingEmp] = useState(null);
  const [empSearch, setEmpSearch] = useState('');
  const [payrollModalOpen, setPayrollModalOpen] = useState(false);
  const [newPayslip, setNewPayslip] = useState({ empId: 'EMP-004', month: 'November 2026', allowance: 300, commission: 450, ot: 100, deductions: 400 });
  const [leaveSubTab, setLeaveSubTab] = useState('Requests');
  const [empLeaveModal, setEmpLeaveModal] = useState(false);
  const [newLeaveReq, setNewLeaveReq] = useState({ type: 'Annual Leave', startDate: '2026-12-10', endDate: '2026-12-11', days: 2, reason: '', attachment: '' });
  const [profileSubTab, setProfileSubTab] = useState('Profile Details');
  const [orgZoom, setOrgZoom] = useState(1);
  const [orgSearch, setOrgSearch] = useState('');
  const [orgDeptFilter, setOrgDeptFilter] = useState('All');
  const [orgLocFilter, setOrgLocFilter] = useState('All');
  const [selectedOrgEmp, setSelectedOrgEmp] = useState(null);
  const [orgEditMode, setOrgEditMode] = useState(false);
  const [newAnnounceModal, setNewAnnounceModal] = useState(false);
  const [newAnnounce, setNewAnnounce] = useState({ title: '', category: 'General', priority: 'Normal', content: '' });
  const [assetModalOpen, setAssetModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [editingUserRole, setEditingUserRole] = useState(null);
  const [userRoleSearch, setUserRoleSearch] = useState('');
  const [clockedIn, setClockedIn] = useState(true);
  const [clockInTime] = useState('08:52 AM');
  const [globalToast, setGlobalToast] = useState('');

  const showToast = (msg) => {
    setGlobalToast(msg);
    setTimeout(() => setGlobalToast(''), 3500);
  };

  // Active Authenticated User Synced with Database
  const activeEmployeeRecord = employees.find(e => e.id === loggedInUser?.id) || employees[0];

  // RBAC Email & Password Authentication Handler
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const matchedUser = employees.find(
      emp => emp.workEmail.toLowerCase() === loginEmail.trim().toLowerCase() && emp.password === loginPassword
    );

    if (!matchedUser) {
      setLoginError('Invalid company email or password. Please verify your credentials.');
      return;
    }

    if (matchedUser.status !== 'Active') {
      setLoginError('Your account is currently inactive. Please contact HR Admin.');
      return;
    }

    setLoggedInUser(matchedUser);
    const allowed = roleNavMap[matchedUser.systemRole] || ['emp-dashboard'];
    setActiveTab(allowed[0]);
    setLoginEmail('');
    setLoginPassword('');
    showToast(`Signed in as ${matchedUser.name} • Role detected: ${matchedUser.systemRole}`);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setLoginError('');
  };

  // ================= EMPLOYEE CLAIMS MODULE =================
  const renderEmployeeClaims = () => {
    const currentUser = activeEmployeeRecord;

    const triggerClaimToast = (msg) => {
      setClaimToast(msg);
      setTimeout(() => setClaimToast(''), 3500);
    };

    const getClaimStatusStyle = (status) => {
      switch (status) {
        case 'Approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'Paid': return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
        case 'Amendment Required': return 'bg-purple-50 text-purple-700 border-purple-200';
        case 'Rejected': return 'bg-rose-50 text-rose-700 border-rose-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
    };

    const openNewClaimModal = () => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setEditingClaim({
        isNew: true,
        refNo: `CLM-2026-${randomNum}`,
        empId: currentUser.id,
        empName: currentUser.name,
        department: currentUser.department,
        branch: currentUser.location,
        type: claimPolicies[0]?.category || 'Mileage, Toll & Petrol',
        amount: '',
        projectCode: '',
        receiptName: '',
        remarks: '',
        submissionDate: new Date().toISOString().split('T')[0],
      });
    };

    const openEditClaimModal = (claim) => {
      setEditingClaim({ ...claim, isNew: false });
    };

    const handleCancelClaim = (claim) => {
      setClaims(claims.filter(c => c.id !== claim.id));
      triggerClaimToast(`Claim ${claim.refNo} has been cancelled.`);
    };

    const myAllClaims = claims.filter(c => c.empId === currentUser.id);
    const myClaims = myAllClaims.filter(c => {
      const matchMonth = claimMonthFilter === 'All' || c.monthYear === claimMonthFilter;
      const matchStatus = claimStatusFilter === 'All' || c.status === claimStatusFilter;
      return matchMonth && matchStatus;
    });

    const totalByMonth = myClaims.reduce((sum, c) => sum + Number(c.amount || 0), 0);
    const approvedPayout = myAllClaims.filter(c => c.status === 'Approved' || c.status === 'Paid').reduce((sum, c) => sum + Number(c.amount || 0), 0);
    const pendingCount = myAllClaims.filter(c => c.status === 'Pending' || c.status === 'Amendment Required').length;

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">My Expense Claims</h2>
            <p className="text-gray-500 text-sm mt-1">Submit claims, upload receipts, and track reimbursement status.</p>
          </div>
          <button
            onClick={openNewClaimModal}
            className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center font-medium hover:bg-blue-700 shadow-sm text-sm"
          >
            <Plus size={18} className="mr-2" /> Submit New Claim
          </button>
        </div>

        {claimToast && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between shadow-sm">
            <span className="flex items-center"><Check size={18} className="mr-2 text-emerald-600" /> {claimToast}</span>
            <button onClick={() => setClaimToast('')} className="text-emerald-600 hover:text-emerald-800"><X size={16}/></button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Claim ({claimMonthFilter === 'All' ? 'All Months' : claimMonthFilter})</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">RM {formatMoney(totalByMonth)}</p>
            <p className="text-xs text-gray-500 mt-2">{myClaims.length} claim(s) in current filter</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Approved & Paid</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">RM {formatMoney(approvedPayout)}</p>
            <p className="text-xs text-emerald-600 mt-2 font-medium">Verified for reimbursement</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Pending / Action Needed</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{pendingCount}</p>
            <p className="text-xs text-gray-500 mt-2">Awaiting Finance / HR review</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200/75 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={claimMonthFilter}
              onChange={e => setClaimMonthFilter(e.target.value)}
              className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 outline-none"
            >
              <option value="All">All Months</option>
              <option value="2026-11">November 2026</option>
              <option value="2026-10">October 2026</option>
            </select>
            <select
              value={claimStatusFilter}
              onChange={e => setClaimStatusFilter(e.target.value)}
              className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Amendment Required">Amendment Required</option>
              <option value="Approved">Approved</option>
              <option value="Paid">Paid</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <span className="text-xs text-gray-500">Staff: <strong className="text-gray-800">{currentUser.name} ({currentUser.id})</strong></span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  <th className="p-4">Ref No & Date</th>
                  <th className="p-4">Category & Cost Centre</th>
                  <th className="p-4">Receipt & Remarks</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {myClaims.map(claim => (
                  <tr key={claim.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-xs font-semibold bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-200">
                        {claim.refNo}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{claim.submissionDate}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-sm text-gray-900">{claim.type}</p>
                      <p className="text-xs text-gray-500">{claim.projectCode || 'General Cost Centre'}</p>
                    </td>
                    <td className="p-4">
                      {claim.receiptName ? (
                        <span className="inline-flex items-center text-xs text-blue-600 font-medium">
                          <Paperclip size={12} className="mr-1" /> {claim.receiptName}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No receipt</span>
                      )}
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-xs">{claim.remarks || '—'}</p>
                    </td>
                    <td className="p-4 font-bold text-sm text-gray-900">RM {formatMoney(claim.amount)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getClaimStatusStyle(claim.status)}`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {(claim.status === 'Pending' || claim.status === 'Amendment Required') && (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => openEditClaimModal(claim)}
                            className="px-2.5 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors"
                          >
                            {claim.status === 'Amendment Required' ? 'Amend & Resubmit' : 'Edit'}
                          </button>
                          <button
                            onClick={() => handleCancelClaim(claim)}
                            className="px-2.5 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      {claim.status === 'Rejected' && (
                        <button
                          onClick={() => setSelectedRejectionModal(claim)}
                          className="px-2.5 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-medium transition-colors"
                        >
                          View Reason
                        </button>
                      )}
                      {(claim.status === 'Approved' || claim.status === 'Paid') && (
                        <button
                          onClick={() => triggerClaimToast(`Downloaded Claim Statement (${claim.refNo}) PDF!`)}
                          className="px-2.5 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg text-xs font-medium transition-colors inline-flex items-center"
                        >
                          <Download size={12} className="mr-1" /> Statement
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {myClaims.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500 text-sm">No claims found for the selected filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedRejectionModal && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedRejectionModal(null)}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 bg-rose-50/60 flex justify-between items-center">
                <h3 className="font-bold text-rose-900 text-sm flex items-center">
                  <AlertCircle size={16} className="mr-2 text-rose-600" /> Claim Rejection Reason ({selectedRejectionModal.refNo})
                </h3>
                <button onClick={() => setSelectedRejectionModal(null)} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-700 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  {selectedRejectionModal.rejectionReason || 'No specific reason provided by Finance/HR.'}
                </p>
                <div className="flex justify-end">
                  <button onClick={() => setSelectedRejectionModal(null)} className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-medium">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {editingClaim && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditingClaim(null)}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm">{editingClaim.isNew ? 'Submit New Expense Claim' : `Edit Claim (${editingClaim.refNo})`}</h3>
                <button onClick={() => setEditingClaim(null)} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const monthYear = (editingClaim.submissionDate || '2026-11').slice(0, 7);
                  const formattedClaim = {
                    ...editingClaim,
                    id: editingClaim.isNew ? Date.now() : editingClaim.id,
                    amount: Number(editingClaim.amount),
                    status: 'Pending',
                    rejectionReason: '',
                    monthYear
                  };
                  delete formattedClaim.isNew;
                  if (editingClaim.isNew) {
                    setClaims([formattedClaim, ...claims]);
                    triggerClaimToast(`Claim ${formattedClaim.refNo} submitted for approval!`);
                  } else {
                    setClaims(claims.map(c => c.id === formattedClaim.id ? formattedClaim : c));
                    triggerClaimToast(`Claim ${formattedClaim.refNo} updated and resubmitted!`);
                  }
                  setEditingClaim(null);
                }}
                className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
              >
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200/80 text-xs">
                  <div>
                    <span className="text-gray-400 block">Claim Ref No</span>
                    <span className="font-mono font-bold text-gray-800">{editingClaim.refNo}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Employee & Branch</span>
                    <span className="font-semibold text-gray-800">{editingClaim.empName} ({editingClaim.branch})</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Claim Category *</label>
                    <select
                      value={editingClaim.type}
                      onChange={e => setEditingClaim({ ...editingClaim, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white"
                      required
                    >
                      {claimPolicies.filter(p => p.status === 'Active').map(p => (
                        <option key={p.id} value={p.category}>{p.category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Amount (RM) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      value={editingClaim.amount}
                      onChange={e => setEditingClaim({ ...editingClaim, amount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm font-semibold"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Submission Date</label>
                    <input
                      type="date"
                      value={editingClaim.submissionDate}
                      onChange={e => setEditingClaim({ ...editingClaim, submissionDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Project / Cost Centre</label>
                    <input
                      type="text"
                      placeholder="e.g. CC-WS-HQ"
                      value={editingClaim.projectCode}
                      onChange={e => setEditingClaim({ ...editingClaim, projectCode: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Receipt Attachment (Image / PDF)</label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) setEditingClaim({ ...editingClaim, receiptName: file.name });
                    }}
                    className="w-full text-xs text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {editingClaim.receiptName && (
                    <p className="text-xs text-emerald-600 mt-1 flex items-center">
                      <Paperclip size={12} className="mr-1" /> Attached: {editingClaim.receiptName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Remarks / Purpose</label>
                  <textarea
                    rows="2"
                    placeholder="Describe business purpose of expense..."
                    value={editingClaim.remarks}
                    onChange={e => setEditingClaim({ ...editingClaim, remarks: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
                  <button type="button" onClick={() => setEditingClaim(null)} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700">
                    {editingClaim.isNew ? 'Submit Claim' : 'Save & Resubmit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ================= ADMIN CLAIM MANAGEMENT MODULE =================
  const renderAdminClaimsManagement = () => {
    const triggerAdminToast = (msg) => {
      setAdminClaimToast(msg);
      setTimeout(() => setAdminClaimToast(''), 3500);
    };

    const canApproveClaims = ['Super Admin', 'HR Admin', 'Manager / Supervisor', 'Finance'].includes(currentRole);
    const canPayClaims = ['Super Admin', 'Finance'].includes(currentRole);
    const departments = ['All', ...new Set(employees.map(e => e.department))];
    const branches = ['All', ...new Set(employees.map(e => e.location))];

    const subTabs = [
      'All Claims',
      'Pending Approval',
      'Approved Claims',
      'Rejected Claims',
      'Paid Claims',
      'Claim Policy',
      'Employee Claim Limit',
      'Claim Reports'
    ];

    const getStatusBadge = (status) => {
      switch (status) {
        case 'Approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'Paid': return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
        case 'Amendment Required': return 'bg-purple-50 text-purple-700 border-purple-200';
        case 'Rejected': return 'bg-rose-50 text-rose-700 border-rose-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
    };

    const handleApproveClaim = (claim) => {
      setClaims(claims.map(c => c.id === claim.id ? { ...c, status: 'Approved', rejectionReason: '' } : c));
      triggerAdminToast(`Claim ${claim.refNo} (${claim.empName}) has been Approved.`);
    };

    const handleMarkAsPaid = (claim) => {
      setClaims(claims.map(c => c.id === claim.id ? { ...c, status: 'Paid' } : c));
      triggerAdminToast(`Claim ${claim.refNo} marked as Paid (RM ${formatMoney(claim.amount)}).`);
    };

    const handleConfirmRejectOrAmend = () => {
      if (!adminClaimActionModal || !adminActionReason.trim()) return;
      const { claim, action } = adminClaimActionModal;
      const newStatus = action === 'Reject' ? 'Rejected' : 'Amendment Required';
      setClaims(claims.map(c => c.id === claim.id ? { ...c, status: newStatus, rejectionReason: adminActionReason } : c));
      triggerAdminToast(
        action === 'Reject'
          ? `Claim ${claim.refNo} has been Rejected.`
          : `Claim ${claim.refNo} returned to ${claim.empName} for amendment.`
      );
      setAdminClaimActionModal(null);
      setAdminActionReason('');
    };

    const filteredAdminClaims = claims.filter(c => {
      if (adminClaimTab === 'Pending Approval' && c.status !== 'Pending' && c.status !== 'Amendment Required') return false;
      if (adminClaimTab === 'Approved Claims' && c.status !== 'Approved') return false;
      if (adminClaimTab === 'Rejected Claims' && c.status !== 'Rejected') return false;
      if (adminClaimTab === 'Paid Claims' && c.status !== 'Paid') return false;

      const matchEmp = adminClaimEmpFilter === 'All' || c.empId === adminClaimEmpFilter;
      const matchDept = adminClaimDeptFilter === 'All' || c.department === adminClaimDeptFilter;
      const matchBranch = adminClaimBranchFilter === 'All' || c.branch === adminClaimBranchFilter;
      const matchSearch =
        c.empName.toLowerCase().includes(adminClaimSearch.toLowerCase()) ||
        c.empId.toLowerCase().includes(adminClaimSearch.toLowerCase()) ||
        c.refNo.toLowerCase().includes(adminClaimSearch.toLowerCase()) ||
        c.type.toLowerCase().includes(adminClaimSearch.toLowerCase());
      return matchEmp && matchDept && matchBranch && matchSearch;
    });

    const isListTab = ['All Claims', 'Pending Approval', 'Approved Claims', 'Rejected Claims', 'Paid Claims'].includes(adminClaimTab);

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Claims Management Dashboard</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {canApproveClaims ? `Approval Authority: ${currentRole}` : 'View Only'}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">Review staff expense claims, verify receipts, set claim policies, and export financial reports.</p>
          </div>
          {adminClaimTab === 'Claim Policy' && (
            <button
              onClick={() => setEditingPolicy({ isNew: true, id: Date.now(), category: '', monthlyLimit: 500, yearlyLimit: 5000, requireReceipt: true, status: 'Active' })}
              className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center font-medium hover:bg-blue-700 shadow-sm text-sm"
            >
              <Plus size={18} className="mr-2" /> Add Claim Category
            </button>
          )}
        </div>

        {adminClaimToast && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between shadow-sm">
            <span className="flex items-center"><Check size={18} className="mr-2 text-emerald-600" /> {adminClaimToast}</span>
            <button onClick={() => setAdminClaimToast('')} className="text-emerald-600 hover:text-emerald-800"><X size={16}/></button>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">All Claims</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{claims.length}</p>
            <p className="text-xs text-gray-400 mt-1">RM {formatMoney(claims.reduce((s, c) => s + Number(c.amount || 0), 0))}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Pending Approval</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{claims.filter(c => c.status === 'Pending' || c.status === 'Amendment Required').length}</p>
            <p className="text-xs text-amber-600 mt-1 font-medium">Awaiting verification</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Approved</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{claims.filter(c => c.status === 'Approved').length}</p>
            <p className="text-xs text-gray-500 mt-1">RM {formatMoney(claims.filter(c => c.status === 'Approved').reduce((s, c) => s + Number(c.amount || 0), 0))}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Paid Claims</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{claims.filter(c => c.status === 'Paid').length}</p>
            <p className="text-xs text-gray-500 mt-1">RM {formatMoney(claims.filter(c => c.status === 'Paid').reduce((s, c) => s + Number(c.amount || 0), 0))}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider">Rejected</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{claims.filter(c => c.status === 'Rejected').length}</p>
            <p className="text-xs text-gray-400 mt-1">Declined submissions</p>
          </div>
        </div>

        <div className="flex overflow-x-auto space-x-1 bg-gray-100 p-1.5 rounded-2xl">
          {subTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setAdminClaimTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                adminClaimTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {isListTab && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200/75 flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 min-w-[220px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by employee name, ID, Ref No, or category..."
                  value={adminClaimSearch}
                  onChange={e => setAdminClaimSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={adminClaimEmpFilter}
                  onChange={e => setAdminClaimEmpFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 outline-none"
                >
                  <option value="All">All Employees</option>
                  {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>)}
                </select>
                <select
                  value={adminClaimDeptFilter}
                  onChange={e => setAdminClaimDeptFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 outline-none"
                >
                  {departments.map(d => <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>)}
                </select>
                <select
                  value={adminClaimBranchFilter}
                  onChange={e => setAdminClaimBranchFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 outline-none"
                >
                  {branches.map(b => <option key={b} value={b}>{b === 'All' ? 'All Branches' : b}</option>)}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      <th className="p-4">Ref No & Date</th>
                      <th className="p-4">Employee & Branch</th>
                      <th className="p-4">Category & Remarks</th>
                      <th className="p-4">Receipt</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredAdminClaims.map(claim => (
                      <tr key={claim.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <span className="font-mono text-xs font-semibold bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-200">
                            {claim.refNo}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{claim.submissionDate}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold text-sm text-gray-900">{claim.empName} <span className="text-xs font-normal text-gray-400">({claim.empId})</span></p>
                          <p className="text-xs text-gray-500">{claim.department} • {claim.branch}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-sm text-gray-900">{claim.type}</p>
                          <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">{claim.remarks || '—'}</p>
                          {claim.rejectionReason && (
                            <p className="text-[11px] text-rose-600 mt-0.5 italic">Note: {claim.rejectionReason}</p>
                          )}
                        </td>
                        <td className="p-4">
                          {claim.receiptName ? (
                            <button
                              onClick={() => setViewingReceiptClaim(claim)}
                              className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-medium transition-colors"
                            >
                              <Paperclip size={13} className="mr-1" /> View Receipt
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400 italic">None</span>
                          )}
                        </td>
                        <td className="p-4 font-bold text-sm text-gray-900">RM {formatMoney(claim.amount)}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(claim.status)}`}>
                            {claim.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          {claim.status === 'Pending' && canApproveClaims && (
                            <div className="flex justify-end flex-wrap gap-1.5">
                              <button
                                onClick={() => handleApproveClaim(claim)}
                                className="px-2.5 py-1 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg text-xs font-medium transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  setAdminClaimActionModal({ claim, action: 'Amendment' });
                                  setAdminActionReason('');
                                }}
                                className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 rounded-lg text-xs font-medium transition-colors"
                              >
                                Return
                              </button>
                              <button
                                onClick={() => {
                                  setAdminClaimActionModal({ claim, action: 'Reject' });
                                  setAdminActionReason('');
                                }}
                                className="px-2.5 py-1 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 rounded-lg text-xs font-medium transition-colors"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                          {claim.status === 'Approved' && canPayClaims && (
                            <button
                              onClick={() => handleMarkAsPaid(claim)}
                              className="px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-xs font-medium transition-colors"
                            >
                              Mark as Paid
                            </button>
                          )}
                          {claim.status === 'Approved' && !canPayClaims && (
                            <span className="text-xs text-blue-600 font-medium">Awaiting Finance Payout</span>
                          )}
                          {(claim.status === 'Paid' || claim.status === 'Rejected' || claim.status === 'Amendment Required') && (
                            <span className="text-xs text-gray-400">Completed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filteredAdminClaims.length === 0 && (
                      <tr>
                        <td colSpan="7" className="p-8 text-center text-gray-500 text-sm">No claims found under "{adminClaimTab}".</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {adminClaimTab === 'Claim Policy' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm">Claim Categories & Policy Limits</h3>
              <p className="text-xs text-gray-500">Configure claimable categories, monthly/yearly caps, and receipt requirements.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    <th className="p-4">Claim Category</th>
                    <th className="p-4">Monthly Limit (RM)</th>
                    <th className="p-4">Yearly Limit (RM)</th>
                    <th className="p-4">Receipt Mandatory</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {claimPolicies.map(pol => (
                    <tr key={pol.id} className="hover:bg-gray-50/50">
                      <td className="p-4 font-semibold text-sm text-gray-900">{pol.category}</td>
                      <td className="p-4 text-sm text-gray-700">RM {formatMoney(pol.monthlyLimit)}</td>
                      <td className="p-4 text-sm text-gray-700">RM {formatMoney(pol.yearlyLimit)}</td>
                      <td className="p-4 text-xs">
                        <span className={`px-2 py-0.5 rounded font-medium ${pol.requireReceipt ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                          {pol.requireReceipt ? 'Required' : 'Optional'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${pol.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                          {pol.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setEditingPolicy({ ...pol, isNew: false })}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors"
                        >
                          Edit Policy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminClaimTab === 'Employee Claim Limit' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm">Staff Annual Claim Entitlements</h3>
              <p className="text-xs text-gray-500">Set and monitor annual reimbursement limits per employee.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    <th className="p-4">Employee</th>
                    <th className="p-4">Department & Role</th>
                    <th className="p-4">Annual Limit (RM)</th>
                    <th className="p-4">Utilized (RM)</th>
                    <th className="p-4">Remaining Balance</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {employees.map(emp => {
                    const limitObj = employeeClaimLimits.find(l => l.empId === emp.id) || { empId: emp.id, annualLimit: 3000, usedAmount: 0 };
                    const dynamicUsed = claims
                      .filter(c => c.empId === emp.id && (c.status === 'Approved' || c.status === 'Paid'))
                      .reduce((sum, c) => sum + Number(c.amount || 0), 0);
                    const totalUsed = Math.max(limitObj.usedAmount, dynamicUsed);
                    const remaining = Math.max(0, limitObj.annualLimit - totalUsed);
                    return (
                      <tr key={emp.id} className="hover:bg-gray-50/50">
                        <td className="p-4">
                          <p className="font-semibold text-sm text-gray-900">{emp.name}</p>
                          <p className="text-xs text-gray-500 font-mono">{emp.id}</p>
                        </td>
                        <td className="p-4 text-xs text-gray-600">{emp.department} • {emp.role}</td>
                        <td className="p-4 text-sm font-bold text-gray-900">RM {formatMoney(limitObj.annualLimit)}</td>
                        <td className="p-4 text-sm text-gray-600">RM {formatMoney(totalUsed)}</td>
                        <td className="p-4">
                          <span className="text-sm font-bold text-emerald-600">RM {formatMoney(remaining)}</span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setEditingEmpLimit({ emp, ...limitObj })}
                            className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors"
                          >
                            Set Entitlement
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminClaimTab === 'Claim Reports' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Report Period</label>
                  <select
                    value={reportPeriod}
                    onChange={e => setReportPeriod(e.target.value)}
                    className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900"
                  >
                    <option value="2026-11">Monthly: November 2026</option>
                    <option value="2026-10">Monthly: October 2026</option>
                    <option value="2026">Yearly Summary: FY 2026</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => triggerAdminToast(`Claim Report (${reportPeriod}) exported to Excel (.xlsx)!`)}
                  className="px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-xs font-semibold flex items-center shadow-sm transition-colors"
                >
                  <Download size={16} className="mr-1.5" /> Export to Excel
                </button>
                <button
                  onClick={() => triggerAdminToast(`Claim Report (${reportPeriod}) exported to PDF!`)}
                  className="px-4 py-2.5 bg-gray-900 text-white hover:bg-gray-800 rounded-xl text-xs font-semibold flex items-center shadow-sm transition-colors"
                >
                  <FileText size={16} className="mr-1.5" /> Export to PDF
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm">Claim Expenditure Breakdown by Department ({reportPeriod})</h3>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    <th className="p-4">Department</th>
                    <th className="p-4">Total Submissions</th>
                    <th className="p-4">Approved / Paid Amount</th>
                    <th className="p-4">Pending Amount</th>
                    <th className="p-4">Rejected Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[...new Set(employees.map(e => e.department))].map(dept => {
                    const deptClaims = claims.filter(c => c.department === dept && (reportPeriod === '2026' || c.monthYear === reportPeriod));
                    const approvedPaid = deptClaims.filter(c => c.status === 'Approved' || c.status === 'Paid').reduce((s, c) => s + Number(c.amount || 0), 0);
                    const pending = deptClaims.filter(c => c.status === 'Pending' || c.status === 'Amendment Required').reduce((s, c) => s + Number(c.amount || 0), 0);
                    const rejected = deptClaims.filter(c => c.status === 'Rejected').reduce((s, c) => s + Number(c.amount || 0), 0);
                    return (
                      <tr key={dept} className="hover:bg-gray-50/50">
                        <td className="p-4 font-semibold text-sm text-gray-900">{dept}</td>
                        <td className="p-4 text-sm text-gray-600">{deptClaims.length}</td>
                        <td className="p-4 text-sm font-bold text-emerald-600">RM {formatMoney(approvedPaid)}</td>
                        <td className="p-4 text-sm text-amber-600">RM {formatMoney(pending)}</td>
                        <td className="p-4 text-sm text-rose-600">RM {formatMoney(rejected)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm">Claim Expenditure Breakdown by Branch ({reportPeriod})</h3>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    <th className="p-4">Branch / Location</th>
                    <th className="p-4">Total Submissions</th>
                    <th className="p-4">Approved / Paid Amount</th>
                    <th className="p-4">Pending Amount</th>
                    <th className="p-4">Rejected Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[...new Set(employees.map(e => e.location))].map(branch => {
                    const branchClaims = claims.filter(c => c.branch === branch && (reportPeriod === '2026' || c.monthYear === reportPeriod));
                    const approvedPaid = branchClaims.filter(c => c.status === 'Approved' || c.status === 'Paid').reduce((s, c) => s + Number(c.amount || 0), 0);
                    const pending = branchClaims.filter(c => c.status === 'Pending' || c.status === 'Amendment Required').reduce((s, c) => s + Number(c.amount || 0), 0);
                    const rejected = branchClaims.filter(c => c.status === 'Rejected').reduce((s, c) => s + Number(c.amount || 0), 0);
                    return (
                      <tr key={branch} className="hover:bg-gray-50/50">
                        <td className="p-4 font-semibold text-sm text-gray-900">{branch}</td>
                        <td className="p-4 text-sm text-gray-600">{branchClaims.length}</td>
                        <td className="p-4 text-sm font-bold text-emerald-600">RM {formatMoney(approvedPaid)}</td>
                        <td className="p-4 text-sm text-amber-600">RM {formatMoney(pending)}</td>
                        <td className="p-4 text-sm text-rose-600">RM {formatMoney(rejected)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reject / Return for Amendment Modal */}
        {adminClaimActionModal && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setAdminClaimActionModal(null)}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm">
                  {adminClaimActionModal.action === 'Reject' ? 'Reject Expense Claim' : 'Return Claim for Amendment'} ({adminClaimActionModal.claim.refNo})
                </h3>
                <button onClick={() => setAdminClaimActionModal(null)} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs text-gray-600">
                  {adminClaimActionModal.action === 'Reject'
                    ? 'Please provide a clear reason for rejecting this claim. The employee will see this note.'
                    : 'Specify what receipt or information needs to be corrected before resubmission.'}
                </p>
                <textarea
                  rows="3"
                  placeholder="Enter remarks / reason..."
                  value={adminActionReason}
                  onChange={e => setAdminActionReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                />
                <div className="flex justify-end space-x-3 pt-2">
                  <button onClick={() => setAdminClaimActionModal(null)} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600">Cancel</button>
                  <button
                    onClick={handleConfirmRejectOrAmend}
                    className={`px-4 py-2 text-white rounded-xl text-xs font-medium ${adminClaimActionModal.action === 'Reject' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                  >
                    {adminClaimActionModal.action === 'Reject' ? 'Confirm Reject' : 'Return to Staff'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Receipt Preview Modal */}
        {viewingReceiptClaim && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setViewingReceiptClaim(null)}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm">Receipt Attachment • {viewingReceiptClaim.refNo}</h3>
                <button onClick={() => setViewingReceiptClaim(null)} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
              </div>
              <div className="p-6 text-center space-y-4">
                <div className="p-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl">
                  <Receipt size={40} className="mx-auto text-blue-600 mb-2" />
                  <p className="font-bold text-sm text-gray-900">{viewingReceiptClaim.receiptName}</p>
                  <p className="text-xs text-gray-500 mt-1">Submitted by {viewingReceiptClaim.empName} • RM {formatMoney(viewingReceiptClaim.amount)}</p>
                  <p className="text-xs text-gray-400 mt-2">{viewingReceiptClaim.remarks}</p>
                </div>
                <button onClick={() => setViewingReceiptClaim(null)} className="w-full py-2 bg-gray-900 text-white rounded-xl text-xs font-medium">Close Preview</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit / Add Claim Policy Modal */}
        {editingPolicy && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditingPolicy(null)}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm">{editingPolicy.isNew ? 'Add New Claim Category' : 'Edit Claim Policy'}</h3>
                <button onClick={() => setEditingPolicy(null)} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const cleanPol = {
                    id: editingPolicy.id,
                    category: editingPolicy.category,
                    monthlyLimit: Number(editingPolicy.monthlyLimit),
                    yearlyLimit: Number(editingPolicy.yearlyLimit),
                    requireReceipt: Boolean(editingPolicy.requireReceipt),
                    status: editingPolicy.status
                  };
                  if (editingPolicy.isNew) {
                    setClaimPolicies([...claimPolicies, cleanPol]);
                    triggerAdminToast(`Added claim policy "${cleanPol.category}".`);
                  } else {
                    setClaimPolicies(claimPolicies.map(p => p.id === cleanPol.id ? cleanPol : p));
                    triggerAdminToast(`Updated policy for "${cleanPol.category}".`);
                  }
                  setEditingPolicy(null);
                }}
                className="p-6 space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={editingPolicy.category}
                    onChange={e => setEditingPolicy({ ...editingPolicy, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Monthly Limit (RM)</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={editingPolicy.monthlyLimit}
                      onChange={e => setEditingPolicy({ ...editingPolicy, monthlyLimit: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Yearly Limit (RM)</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={editingPolicy.yearlyLimit}
                      onChange={e => setEditingPolicy({ ...editingPolicy, yearlyLimit: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center space-x-2 text-xs font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={editingPolicy.requireReceipt}
                      onChange={e => setEditingPolicy({ ...editingPolicy, requireReceipt: e.target.checked })}
                      className="rounded text-blue-600"
                    />
                    <span>Mandatory Receipt Upload</span>
                  </label>
                  <select
                    value={editingPolicy.status}
                    onChange={e => setEditingPolicy({ ...editingPolicy, status: e.target.value })}
                    className="px-3 py-1.5 border border-gray-300 rounded-xl text-xs"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
                  <button type="button" onClick={() => setEditingPolicy(null)} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700">Save Policy</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Set Employee Annual Claim Limit Modal */}
        {editingEmpLimit && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditingEmpLimit(null)}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm">Set Annual Claim Entitlement</h3>
                <button onClick={() => setEditingEmpLimit(null)} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const exists = employeeClaimLimits.some(l => l.empId === editingEmpLimit.empId);
                  if (exists) {
                    setEmployeeClaimLimits(employeeClaimLimits.map(l => l.empId === editingEmpLimit.empId ? { ...l, annualLimit: Number(editingEmpLimit.annualLimit) } : l));
                  } else {
                    setEmployeeClaimLimits([...employeeClaimLimits, { empId: editingEmpLimit.empId, annualLimit: Number(editingEmpLimit.annualLimit), usedAmount: 0 }]);
                  }
                  triggerAdminToast(`Updated annual claim limit for ${editingEmpLimit.emp.name} to RM ${formatMoney(editingEmpLimit.annualLimit)}.`);
                  setEditingEmpLimit(null);
                }}
                className="p-6 space-y-4"
              >
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs">
                  <p className="font-bold text-gray-900">{editingEmpLimit.emp.name} ({editingEmpLimit.emp.id})</p>
                  <p className="text-gray-500 mt-0.5">{editingEmpLimit.emp.department} • {editingEmpLimit.emp.role}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Annual Claim Limit (RM)</label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    required
                    value={editingEmpLimit.annualLimit}
                    onChange={e => setEditingEmpLimit({ ...editingEmpLimit, annualLimit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm font-bold"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button type="button" onClick={() => setEditingEmpLimit(null)} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700">Update Entitlement</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ================= HR DOCUMENTS & LETTER GENERATOR MODULE =================
  const renderDocumentsAndLetters = () => {
    const letterTypes = [
      'Employment Offer Letter',
      'Employment Confirmation Letter',
      'Salary Increment Letter',
      'Promotion Letter',
      'Warning Letter',
      'Employment Verification Letter',
      'Resignation Acceptance Letter',
      'Experience Letter'
    ];

    const targetEmp = employees.find(e => e.id === selectedLetterEmpId) || employees[0];
    const todayFormatted = new Date().toLocaleDateString('en-MY', { day: '2-digit', month: 'long', year: 'numeric' });
    const refNumber = `HR/LTR/2026/${String(generatedLetters.length + 1).padStart(3, '0')}`;

    const getLetterBody = () => {
      switch (selectedLetterType) {
        case 'Employment Offer Letter':
          return `Dear ${targetEmp.name},\n\nWe are pleased to offer you the position of ${targetEmp.role} in the ${targetEmp.department} department at BengkelPro Automotive Sdn Bhd (${targetEmp.location}), commencing on ${letterEffectiveDate}.\n\nYour starting basic monthly salary will be RM ${formatMoney(targetEmp.basicSalary)}, subject to statutory EPF, SOCSO, and EIS contributions. You will be entitled to ${targetEmp.alBalance} days of Annual Leave and ${targetEmp.mcBalance} days of Medical Leave per annum.\n\nPlease sign and return a duplicate copy of this letter as acceptance of our offer.`;
        case 'Employment Confirmation Letter':
          return `Dear ${targetEmp.name},\n\nFollowing the successful completion of your probationary period, Management is pleased to confirm your appointment as ${targetEmp.role} (${targetEmp.department}) effective ${letterEffectiveDate}.\n\nAll other terms and conditions of your employment remain unchanged. Congratulations on your confirmation and we look forward to your continued contribution.`;
        case 'Salary Increment Letter':
          return `Dear ${targetEmp.name},\n\nIn recognition of your dedication, technical performance, and contribution to BengkelPro Automotive Sdn Bhd, Management is pleased to inform you of an upward revision to your monthly basic salary.\n\nEffective ${letterEffectiveDate}, your basic salary will be revised from RM ${formatMoney(targetEmp.basicSalary)} to RM ${formatMoney(letterNewSalary)} per month.\n\nPlease treat this salary revision as strictly private and confidential.`;
        case 'Promotion Letter':
          return `Dear ${targetEmp.name},\n\nWe are delighted to inform you that you have been promoted from ${targetEmp.role} to ${letterNewPosition} in the ${targetEmp.department} department, effective ${letterEffectiveDate}.\n\nIn line with your new responsibilities, your revised basic monthly salary will be RM ${formatMoney(letterNewSalary)}. Congratulations on this well-deserved achievement.`;
        case 'Warning Letter':
          return `Dear ${targetEmp.name},\n\nThis letter serves as a formal written warning regarding your workplace conduct/performance, specifically: ${letterWarningReason}.\n\nDespite prior verbal reminders, the issue remains unresolved as of ${letterEffectiveDate}. You are required to show immediate and sustained improvement, failing which further disciplinary action up to termination of service may be taken.`;
        case 'Employment Verification Letter':
          return `TO WHOM IT MAY CONCERN,\n\nThis is to certify that ${targetEmp.name} (IC/Passport No: ${targetEmp.ic}, Employee ID: ${targetEmp.id}) is a confirmed full-time employee of BengkelPro Automotive Sdn Bhd since ${targetEmp.joinDate}.\n\nHe/She currently holds the position of ${targetEmp.role} in our ${targetEmp.department} department (${targetEmp.location}) with a current basic monthly salary of RM ${formatMoney(targetEmp.basicSalary)}.\n\nThis letter is issued upon the employee's request for official verification purposes.`;
        case 'Resignation Acceptance Letter':
          return `Dear ${targetEmp.name},\n\nWe acknowledge receipt of your resignation letter and confirm acceptance of your resignation from the position of ${targetEmp.role} (${targetEmp.department}).\n\nYour last working day with BengkelPro Automotive Sdn Bhd will be ${letterEffectiveDate}. Please ensure all company assets, tools, and access cards are returned to HR prior to your final clearance.`;
        case 'Experience Letter':
          return `TO WHOM IT MAY CONCERN,\n\nThis is to certify that ${targetEmp.name} (IC/Passport No: ${targetEmp.ic}) was employed with BengkelPro Automotive Sdn Bhd from ${targetEmp.joinDate} until ${letterEffectiveDate} as ${targetEmp.role} in the ${targetEmp.department} department.\n\nDuring his/her tenure with us, ${targetEmp.name} demonstrated strong professionalism, technical competence, and integrity. We wish him/her every success in future endeavors.`;
        default:
          return '';
      }
    };

    const handleIssueLetter = () => {
      const record = {
        id: Date.now(),
        refNo: refNumber,
        type: selectedLetterType,
        empName: targetEmp.name,
        empId: targetEmp.id,
        date: new Date().toISOString().split('T')[0],
        issuedBy: currentRole
      };
      setGeneratedLetters([record, ...generatedLetters]);
      setDocToast(`Generated & logged "${selectedLetterType}" (${refNumber}) for ${targetEmp.name}!`);
      setTimeout(() => setDocToast(''), 3500);
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">HR Documents & Official Letter Generator</h2>
          <p className="text-gray-500 text-sm mt-1">Auto-fill employee details from the master database to generate official HR letters instantly.</p>
        </div>

        {docToast && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between shadow-sm">
            <span className="flex items-center"><Check size={18} className="mr-2 text-emerald-600" /> {docToast}</span>
            <button onClick={() => setDocToast('')}><X size={16}/></button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Configuration Panel */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3">1. Configure Letter & Auto-Fill Data</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Select Letter Template</label>
              <select
                value={selectedLetterType}
                onChange={e => setSelectedLetterType(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white font-medium"
              >
                {letterTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Select Staff (Auto-Fill Database)</label>
              <select
                value={selectedLetterEmpId}
                onChange={e => setSelectedLetterEmpId(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm bg-white"
              >
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.id} - {emp.role})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Effective / Reference Date</label>
              <input
                type="date"
                value={letterEffectiveDate}
                onChange={e => setLetterEffectiveDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              />
            </div>

            {(selectedLetterType === 'Salary Increment Letter' || selectedLetterType === 'Promotion Letter') && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">New Revised Basic Salary (RM)</label>
                <input
                  type="number"
                  value={letterNewSalary}
                  onChange={e => setLetterNewSalary(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm font-semibold"
                />
              </div>
            )}

            {selectedLetterType === 'Promotion Letter' && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">New Promoted Position</label>
                <input
                  type="text"
                  value={letterNewPosition}
                  onChange={e => setLetterNewPosition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                />
              </div>
            )}

            {selectedLetterType === 'Warning Letter' && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Disciplinary Reason</label>
                <textarea
                  rows="2"
                  value={letterWarningReason}
                  onChange={e => setLetterWarningReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                />
              </div>
            )}

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200/80 text-xs space-y-1 text-gray-600">
              <p className="font-bold text-gray-800">Auto-Filled Employee Snapshot:</p>
              <p>IC / Passport: <span className="font-mono font-semibold">{targetEmp.ic}</span></p>
              <p>Department & Branch: <span className="font-semibold">{targetEmp.department} ({targetEmp.location})</span></p>
              <p>Current Salary: <span className="font-semibold">RM {formatMoney(targetEmp.basicSalary)}</span></p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleIssueLetter}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-blue-700 shadow-sm flex items-center justify-center"
              >
                <FileText size={15} className="mr-1.5" /> Save & Issue Letter
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-semibold hover:bg-gray-800 flex items-center"
              >
                <Printer size={15} className="mr-1.5" /> Print / PDF
              </button>
            </div>
          </div>

          {/* Right Live Official Letterhead Preview */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="border-b-2 border-gray-900 pb-4 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">BENGKELPRO AUTOMOTIVE SDN BHD</h3>
                <p className="text-xs text-gray-500">Lot 12, Kawasan Perindustrian Setiawangsa, 54200 Kuala Lumpur</p>
                <p className="text-xs text-gray-500">Tel: +603-4251 8899 • Email: hr@bengkelpro.my</p>
              </div>
              <span className="text-xs font-mono font-bold bg-gray-100 px-2.5 py-1 rounded text-gray-700">PRIVATE & CONFIDENTIAL</span>
            </div>

            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Ref No:</strong> {refNumber}</p>
              <p><strong>Date:</strong> {todayFormatted}</p>
              <div className="pt-2">
                <p className="font-bold text-gray-900 text-sm">{targetEmp.name}</p>
                <p>Employee ID: {targetEmp.id} | IC: {targetEmp.ic}</p>
                <p>{targetEmp.address}</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-gray-900 uppercase underline tracking-wide mb-3">
                RE: {selectedLetterType.toUpperCase()}
              </h4>
              <div className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                {getLetterBody()}
              </div>
            </div>

            <div className="pt-8 grid grid-cols-2 gap-8 text-xs text-gray-700">
              <div>
                <p className="mb-8">Yours faithfully,</p>
                <div className="border-t border-gray-400 pt-1.5 w-48">
                  <p className="font-bold text-gray-900">Sarah Lee</p>
                  <p>HR & Finance Manager</p>
                  <p>BengkelPro Automotive Sdn Bhd</p>
                </div>
              </div>
              <div>
                <p className="mb-8">Acknowledged & Accepted by,</p>
                <div className="border-t border-gray-400 pt-1.5 w-48">
                  <p className="font-bold text-gray-900">{targetEmp.name}</p>
                  <p>IC No: {targetEmp.ic}</p>
                  <p>Date: _____________________</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issued Letters History Log */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm">Issued HR Letters Log</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase font-semibold">
                <th className="p-4">Reference No</th>
                <th className="p-4">Letter Type</th>
                <th className="p-4">Employee</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4">Issued By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {generatedLetters.map(ltr => (
                <tr key={ltr.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-mono text-xs font-semibold text-gray-800">{ltr.refNo}</td>
                  <td className="p-4 font-semibold text-sm text-gray-900">{ltr.type}</td>
                  <td className="p-4 text-sm text-gray-700">{ltr.empName} ({ltr.empId})</td>
                  <td className="p-4 text-xs text-gray-500">{ltr.date}</td>
                  <td className="p-4 text-xs text-gray-600">{ltr.issuedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ================= USER & ROLE MANAGEMENT MODULE =================
  const renderUserRoleManagement = () => {
    const roleOptions = [
      { value: 'Employee', label: 'Staff (Employee)', desc: 'Self-service portal only (My Profile, Leave, Payroll, Claims)' },
      { value: 'Manager / Supervisor', label: 'Manager', desc: 'Approve team leaves, claims, shifts & performance reviews' },
      { value: 'HR Admin', label: 'HR Admin', desc: 'Manage employees, user roles, leaves, assets, letters & announcements' },
      { value: 'Finance', label: 'Finance', desc: 'Disburse payroll, process claim payouts & financial reports' },
      { value: 'Super Admin', label: 'Super Admin', desc: 'Full unrestricted access across all system modules & settings' },
    ];

    const filteredUsers = employees.filter(e =>
      e.name.toLowerCase().includes(userRoleSearch.toLowerCase()) ||
      e.workEmail.toLowerCase().includes(userRoleSearch.toLowerCase()) ||
      e.systemRole.toLowerCase().includes(userRoleSearch.toLowerCase()) ||
      e.id.toLowerCase().includes(userRoleSearch.toLowerCase())
    );

    const openNewUserForm = () => {
      setEditingUserRole({
        isNew: true,
        id: `EMP-00${employees.length + 1}`,
        name: '',
        workEmail: '',
        password: 'password123',
        systemRole: 'Employee',
        status: 'Active',
        department: 'Workshop Operations',
        role: 'Technician',
        location: 'HQ',
      });
    };

    const openEditUserForm = (emp) => {
      setEditingUserRole({
        isNew: false,
        id: emp.id,
        name: emp.name,
        workEmail: emp.workEmail,
        password: emp.password || 'password123',
        systemRole: emp.systemRole || 'Employee',
        status: emp.status || 'Active',
        department: emp.department,
        role: emp.role,
        location: emp.location,
      });
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">User & Role Management (RBAC)</h2>
            <p className="text-gray-500 text-sm mt-1">Assign system roles, manage login emails, and toggle account status without creating duplicate accounts.</p>
          </div>
          <button
            onClick={openNewUserForm}
            className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center font-medium hover:bg-blue-700 shadow-sm text-sm"
          >
            <Plus size={18} className="mr-2" /> Add / Assign User Account
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200/75 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search user by name, company email, or role..."
              value={userRoleSearch}
              onChange={e => setUserRoleSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Total Accounts: <strong className="text-gray-900">{employees.length}</strong></span>
            <span>•</span>
            <span>Active: <strong className="text-emerald-600">{employees.filter(e => e.status === 'Active').length}</strong></span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  <th className="p-4">Employee Name</th>
                  <th className="p-4">Company Login Email</th>
                  <th className="p-4">Assigned System Role</th>
                  <th className="p-4">Account Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map(emp => (
                  <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {(emp.name || 'U').split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{emp.name}</p>
                          <p className="text-xs text-gray-500 font-mono">{emp.id} • {emp.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-gray-800">{emp.workEmail}</p>
                      <p className="text-xs text-gray-400">Password: ••••••••</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                        emp.systemRole === 'Super Admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        emp.systemRole === 'HR Admin' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                        emp.systemRole === 'Manager / Supervisor' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        emp.systemRole === 'Finance' ? 'bg-cyan-50 text-cyan-700 border-cyan-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        <Shield size={12} className="mr-1.5" />
                        {emp.systemRole === 'Employee' ? 'Staff' : emp.systemRole}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        emp.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => openEditUserForm(emp)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold inline-flex items-center transition-colors"
                      >
                        <Edit3 size={13} className="mr-1.5" /> Edit Role & Access
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add / Edit User & Role Modal with Live Account Preview */}
        {editingUserRole && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditingUserRole(null)}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm">
                  {editingUserRole.isNew ? 'Add New User & Assign Role' : `Add / Edit User • ${editingUserRole.id}`}
                </h3>
                <button onClick={() => setEditingUserRole(null)} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!editingUserRole.name.trim() || !editingUserRole.workEmail.trim()) return;

                  if (editingUserRole.isNew) {
                    const newEmployeeRecord = {
                      id: editingUserRole.id,
                      name: editingUserRole.name,
                      preferredName: editingUserRole.name.split(' ')[0],
                      ic: '950101-14-5000',
                      dob: '01/01/1995',
                      gender: 'Male',
                      nationality: 'Malaysian',
                      maritalStatus: 'Single',
                      workEmail: editingUserRole.workEmail.trim(),
                      password: editingUserRole.password || 'password123',
                      systemRole: editingUserRole.systemRole,
                      personalEmail: editingUserRole.workEmail.trim(),
                      phone: '+60 12-000 0000',
                      address: 'Kuala Lumpur, Malaysia',
                      department: editingUserRole.department || 'Workshop Operations',
                      role: editingUserRole.role || 'Staff',
                      employmentType: 'Full-time',
                      joinDate: new Date().toISOString().split('T')[0],
                      managerId: 'EMP-001',
                      location: editingUserRole.location || 'HQ',
                      status: editingUserRole.status,
                      basicSalary: 3000,
                      alBalance: 14,
                      mcBalance: 14,
                      emergencyName: 'Next of Kin',
                      emergencyRelation: 'Family',
                      emergencyPhone: '+60 12-111 1111',
                      emergencyAddress: 'Kuala Lumpur, Malaysia',
                      bankName: 'Maybank',
                      accountHolder: editingUserRole.name.toUpperCase(),
                      bankAccount: '**** **** 0000'
                    };
                    setEmployees([...employees, newEmployeeRecord]);
                    showToast(`Created account for ${newEmployeeRecord.name} (${newEmployeeRecord.systemRole}).`);
                  } else {
                    setEmployees(employees.map(emp =>
                      emp.id === editingUserRole.id
                        ? {
                            ...emp,
                            name: editingUserRole.name,
                            workEmail: editingUserRole.workEmail.trim(),
                            password: editingUserRole.password,
                            systemRole: editingUserRole.systemRole,
                            status: editingUserRole.status,
                          }
                        : emp
                    ));
                    if (loggedInUser?.id === editingUserRole.id) {
                      setLoggedInUser(prev => ({
                        ...prev,
                        name: editingUserRole.name,
                        workEmail: editingUserRole.workEmail.trim(),
                        systemRole: editingUserRole.systemRole,
                        status: editingUserRole.status,
                      }));
                    }
                    showToast(`Updated role & account access for ${editingUserRole.name} to ${editingUserRole.systemRole === 'Employee' ? 'Staff' : editingUserRole.systemRole}.`);
                  }
                  setEditingUserRole(null);
                }}
                className="p-6 space-y-5 max-h-[85vh] overflow-y-auto text-sm"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Employee Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ali Ahmad"
                    value={editingUserRole.name}
                    onChange={e => setEditingUserRole({ ...editingUserRole, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="ali@bengkelpro.my"
                      value={editingUserRole.workEmail}
                      onChange={e => setEditingUserRole({ ...editingUserRole, workEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Login Password</label>
                    <input
                      type="text"
                      required
                      value={editingUserRole.password}
                      onChange={e => setEditingUserRole({ ...editingUserRole, password: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">System Role</label>
                  <div className="space-y-2">
                    {roleOptions.map(opt => {
                      const isSelected = editingUserRole.systemRole === opt.value;
                      return (
                        <label
                          key={opt.value}
                          onClick={() => setEditingUserRole({ ...editingUserRole, systemRole: opt.value })}
                          className={`flex items-start p-3 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-50/70 border-blue-500 ring-1 ring-blue-500/30'
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="systemRole"
                            checked={isSelected}
                            onChange={() => setEditingUserRole({ ...editingUserRole, systemRole: opt.value })}
                            className="mt-0.5 mr-3 text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <p className="text-xs font-bold text-gray-900">{opt.label}</p>
                            <p className="text-[11px] text-gray-500 mt-0.5">{opt.desc}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Account Status</label>
                  <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
                    {['Active', 'Inactive'].map(st => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setEditingUserRole({ ...editingUserRole, status: st })}
                        className={`py-2 rounded-lg text-xs font-bold transition-all ${
                          editingUserRole.status === st
                            ? st === 'Active'
                              ? 'bg-white text-emerald-700 shadow-sm'
                              : 'bg-white text-rose-700 shadow-sm'
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Account Preview Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Account Preview</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-slate-900">{editingUserRole.name || 'Employee Name'}</p>
                      <p className="text-xs text-slate-500">{editingUserRole.workEmail || 'email@bengkelpro.my'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        editingUserRole.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {editingUserRole.status}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {editingUserRole.systemRole === 'Employee' ? 'Staff' : editingUserRole.systemRole}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
                  <button type="button" onClick={() => setEditingUserRole(null)} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-sm">
                    Save User & Role
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ================= ADMIN DASHBOARD =================
  const renderAdminDashboard = () => {
    const pendingLeaves = leaves.filter(l => l.status === 'Pending').length;
    const pendingClaimsCount = claims.filter(c => c.status === 'Pending').length;
    const totalPayroll = payslips.reduce((sum, p) => sum + Number(p.netPay || 0), 0);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">HR & Workshop Executive Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">Real-time workforce metrics, pending approvals, and payroll overview.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Active Staff</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{employees.length}</p>
            <p className="text-xs text-emerald-600 mt-2 font-medium">100% Active Headcount</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Pending Leaves</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{pendingLeaves}</p>
            <button onClick={() => setActiveTab('leave-mgmt')} className="text-xs text-blue-600 mt-2 font-medium hover:underline">Review Leave Requests →</button>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Pending Claims</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{pendingClaimsCount}</p>
            <button onClick={() => setActiveTab('claims-mgmt')} className="text-xs text-blue-600 mt-2 font-medium hover:underline">Review Expense Claims →</button>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Latest Payroll Disbursed</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">RM {formatMoney(totalPayroll)}</p>
            <p className="text-xs text-gray-500 mt-2">Includes Basic, OT & Commission</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200/75 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Today's Workshop Attendance Summary</h3>
            <div className="space-y-3">
              {employees.map(emp => (
                <div key={emp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{emp.name}</p>
                    <p className="text-xs text-gray-500">{emp.role} • {emp.location}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Clocked In (08:50 AM)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/75 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Latest Company Announcements</h3>
            <div className="space-y-3">
              {announcements.map(ann => (
                <div key={ann.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50/60">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-sm text-gray-900">{ann.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${ann.priority === 'Urgent' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                      {ann.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{ann.content}</p>
                  <p className="text-[11px] text-gray-400 mt-2">{ann.date} • {ann.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ================= EMPLOYEE MANAGEMENT MODULE =================
  const renderEmployeeManagement = () => {
    const filteredEmps = employees.filter(e =>
      e.name.toLowerCase().includes(empSearch.toLowerCase()) ||
      e.id.toLowerCase().includes(empSearch.toLowerCase()) ||
      e.department.toLowerCase().includes(empSearch.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Employee Directory & Master Data</h2>
            <p className="text-gray-500 text-sm mt-1">Manage staff profiles, salaries, leave entitlements, and bank records.</p>
          </div>
          <button
            onClick={() => setEditingEmp({
              isNew: true,
              id: `EMP-00${employees.length + 1}`,
              name: '', preferredName: '', ic: '', dob: '', gender: 'Male', nationality: 'Malaysian', maritalStatus: 'Single',
              personalEmail: '', phone: '', address: '', department: 'Workshop Operations', role: 'Mechanic',
              employmentType: 'Full-time', joinDate: '2026-11-15', managerId: 'EMP-002', location: 'HQ', status: 'Active',
              basicSalary: 2800, alBalance: 14, mcBalance: 14, emergencyName: '', emergencyRelation: '', emergencyPhone: '',
              emergencyAddress: '', bankName: 'Maybank', accountHolder: '', bankAccount: ''
            })}
            className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center font-medium hover:bg-blue-700 shadow-sm text-sm"
          >
            <Plus size={18} className="mr-2" /> Add Employee
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200/75">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employee by name, ID, or department..."
              value={empSearch}
              onChange={e => setEmpSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  <th className="p-4">Employee</th>
                  <th className="p-4">Department & Role</th>
                  <th className="p-4">Basic Salary</th>
                  <th className="p-4">Leave Balance</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEmps.map(emp => (
                  <tr key={emp.id} className="hover:bg-gray-50/50">
                    <td className="p-4">
                      <p className="font-semibold text-sm text-gray-900">{emp.name}</p>
                      <p className="text-xs text-gray-500 font-mono">{emp.id} • {emp.location}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-gray-800">{emp.role}</p>
                      <p className="text-xs text-gray-500">{emp.department}</p>
                    </td>
                    <td className="p-4 font-semibold text-sm text-gray-900">RM {formatMoney(emp.basicSalary)}</td>
                    <td className="p-4 text-xs">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold mr-1.5">AL: {emp.alBalance}d</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">MC: {emp.mcBalance}d</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setEditingEmp({ ...emp, isNew: false })}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium inline-flex items-center"
                      >
                        <Edit3 size={13} className="mr-1" /> Edit Details
                      </button>
                      {employees.length > 1 && (
                        <button
                          onClick={() => {
                            setEmployees(employees.filter(e => e.id !== emp.id));
                            showToast(`Removed ${emp.name} from directory.`);
                          }}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {editingEmp && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditingEmp(null)}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-3xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm">{editingEmp.isNew ? 'Add New Employee' : `Full Profile Editor • ${editingEmp.name} (${editingEmp.id})`}</h3>
                <button onClick={() => setEditingEmp(null)} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const clean = { ...editingEmp, basicSalary: Number(editingEmp.basicSalary), alBalance: Number(editingEmp.alBalance), mcBalance: Number(editingEmp.mcBalance) };
                  delete clean.isNew;
                  if (editingEmp.isNew) {
                    setEmployees([...employees, clean]);
                    showToast(`Employee ${clean.name} added!`);
                  } else {
                    setEmployees(employees.map(emp => emp.id === clean.id ? clean : emp));
                    showToast(`Updated profile for ${clean.name}.`);
                  }
                  setEditingEmp(null);
                }}
                className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input type="text" required value={editingEmp.name} onChange={e => setEditingEmp({ ...editingEmp, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">IC / Passport No *</label>
                    <input type="text" required value={editingEmp.ic} onChange={e => setEditingEmp({ ...editingEmp, ic: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input type="text" value={editingEmp.phone} onChange={e => setEditingEmp({ ...editingEmp, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Department</label>
                    <input type="text" value={editingEmp.department} onChange={e => setEditingEmp({ ...editingEmp, department: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Position / Designation</label>
                    <input type="text" value={editingEmp.role} onChange={e => setEditingEmp({ ...editingEmp, role: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Work Branch / Location</label>
                    <input type="text" value={editingEmp.location} onChange={e => setEditingEmp({ ...editingEmp, location: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Basic Salary (RM)</label>
                    <input type="number" value={editingEmp.basicSalary} onChange={e => setEditingEmp({ ...editingEmp, basicSalary: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl font-bold" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Annual Leave Quota</label>
                    <input type="number" value={editingEmp.alBalance} onChange={e => setEditingEmp({ ...editingEmp, alBalance: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">MC Quota</label>
                    <input type="number" value={editingEmp.mcBalance} onChange={e => setEditingEmp({ ...editingEmp, mcBalance: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Bank Name</label>
                    <input type="text" value={editingEmp.bankName} onChange={e => setEditingEmp({ ...editingEmp, bankName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Bank Account No</label>
                    <input type="text" value={editingEmp.bankAccount} onChange={e => setEditingEmp({ ...editingEmp, bankAccount: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Emergency Contact</label>
                    <input type="text" value={editingEmp.emergencyName} onChange={e => setEditingEmp({ ...editingEmp, emergencyName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                  <button type="button" onClick={() => setEditingEmp(null)} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700">Save Employee Details</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ================= PAYROLL MANAGEMENT MODULE =================
  const renderPayrollManagement = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Payroll & Commission Disbursement</h2>
            <p className="text-gray-500 text-sm mt-1">Generate monthly payslips with workshop commissions, OT, and statutory deductions.</p>
          </div>
          <button
            onClick={() => setPayrollModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center font-medium hover:bg-blue-700 shadow-sm text-sm"
          >
            <Upload size={18} className="mr-2" /> Generate & Upload Payslip
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  <th className="p-4">Employee & Month</th>
                  <th className="p-4">Basic Salary</th>
                  <th className="p-4">Commission & OT</th>
                  <th className="p-4">Statutory Deductions</th>
                  <th className="p-4">Net Pay</th>
                  <th className="p-4">Payslip File</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payslips.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50/50">
                    <td className="p-4">
                      <p className="font-semibold text-sm text-gray-900">{p.empName}</p>
                      <p className="text-xs text-gray-500">{p.month}</p>
                    </td>
                    <td className="p-4 text-sm text-gray-700">RM {formatMoney(p.basic)}</td>
                    <td className="p-4 text-xs text-emerald-700 font-medium">+ RM {formatMoney(Number(p.commission) + Number(p.ot) + Number(p.allowance))}</td>
                    <td className="p-4 text-xs text-rose-600">- RM {formatMoney(p.deductions)}</td>
                    <td className="p-4 font-bold text-sm text-gray-900">RM {formatMoney(p.netPay)}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                        <FileText size={13} className="mr-1" /> {p.fileName}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {payrollModalOpen && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setPayrollModalOpen(false)}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm">Upload Staff Monthly Payslip</h3>
                <button onClick={() => setPayrollModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const emp = employees.find(em => em.id === newPayslip.empId) || employees[0];
                  const netPay = Number(emp.basicSalary) + Number(newPayslip.allowance) + Number(newPayslip.commission) + Number(newPayslip.ot) - Number(newPayslip.deductions);
                  const created = {
                    id: Date.now(),
                    empId: emp.id,
                    empName: emp.name,
                    month: newPayslip.month,
                    basic: emp.basicSalary,
                    allowance: Number(newPayslip.allowance),
                    commission: Number(newPayslip.commission),
                    ot: Number(newPayslip.ot),
                    deductions: Number(newPayslip.deductions),
                    netPay,
                    status: 'Paid',
                    fileName: `Payslip_${emp.id}_${newPayslip.month.replace(/\s+/g, '')}.pdf`
                  };
                  setPayslips([created, ...payslips]);
                  setPayrollModalOpen(false);
                  showToast(`Payslip uploaded for ${emp.name}!`);
                }}
                className="p-6 space-y-4 text-sm"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Employee</label>
                  <select value={newPayslip.empId} onChange={e => setNewPayslip({ ...newPayslip, empId: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white">
                    {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.id})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Salary Month</label>
                  <input type="text" value={newPayslip.month} onChange={e => setNewPayslip({ ...newPayslip, month: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Workshop Commission (RM)</label>
                    <input type="number" value={newPayslip.commission} onChange={e => setNewPayslip({ ...newPayslip, commission: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Overtime (OT) (RM)</label>
                    <input type="number" value={newPayslip.ot} onChange={e => setNewPayslip({ ...newPayslip, ot: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Allowance (RM)</label>
                    <input type="number" value={newPayslip.allowance} onChange={e => setNewPayslip({ ...newPayslip, allowance: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">EPF/SOCSO/EIS (RM)</label>
                    <input type="number" value={newPayslip.deductions} onChange={e => setNewPayslip({ ...newPayslip, deductions: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
                  <button type="button" onClick={() => setPayrollModalOpen(false)} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700">Publish Payslip</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ================= ADMIN LEAVE MANAGEMENT MODULE =================
  const renderLeaveManagement = () => {
    const handleLeaveDecision = (leave, decision) => {
      setLeaves(leaves.map(l => l.id === leave.id ? { ...l, status: decision } : l));
      if (decision === 'Approved') {
        setEmployees(employees.map(emp => {
          if (emp.id !== leave.empId) return emp;
          if (leave.type === 'Annual Leave') return { ...emp, alBalance: Math.max(0, emp.alBalance - leave.days) };
          if (leave.type === 'Medical Leave') return { ...emp, mcBalance: Math.max(0, emp.mcBalance - leave.days) };
          return emp;
        }));
      }
      showToast(`Leave request for ${leave.empName} marked as ${decision}.`);
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Leave & Policy Management</h2>
            <p className="text-gray-500 text-sm mt-1">Approve staff leave applications and configure dynamic leave categories.</p>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {['Requests', 'Leave Type Settings'].map(tab => (
              <button
                key={tab}
                onClick={() => setLeaveSubTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${leaveSubTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {leaveSubTab === 'Requests' ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase font-semibold">
                  <th className="p-4">Employee</th>
                  <th className="p-4">Leave Type</th>
                  <th className="p-4">Dates & Days</th>
                  <th className="p-4">Reason & MC</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leaves.map(l => (
                  <tr key={l.id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-semibold text-sm text-gray-900">{l.empName} <span className="text-xs text-gray-400 font-normal">({l.empId})</span></td>
                    <td className="p-4 text-sm text-gray-800">{l.type}</td>
                    <td className="p-4 text-xs text-gray-600">{l.startDate} to {l.endDate} ({l.days}d)</td>
                    <td className="p-4 text-xs text-gray-500">{l.reason} {l.attachment && <span className="text-blue-600 font-medium block">📎 {l.attachment}</span>}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        l.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        l.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>{l.status}</span>
                    </td>
                    <td className="p-4 text-right">
                      {l.status === 'Pending' ? (
                        <div className="space-x-2">
                          <button onClick={() => handleLeaveDecision(l, 'Approved')} className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700">Approve</button>
                          <button onClick={() => handleLeaveDecision(l, 'Rejected')} className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-xs font-medium hover:bg-rose-100">Reject</button>
                        </div>
                      ) : <span className="text-xs text-gray-400">Processed</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase font-semibold">
                  <th className="p-4">Leave Type</th>
                  <th className="p-4">Paid / Unpaid</th>
                  <th className="p-4">Deduct Balance</th>
                  <th className="p-4">Default Days</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leaveTypes.map(lt => (
                  <tr key={lt.id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-semibold text-sm text-gray-900">{lt.name}</td>
                    <td className="p-4 text-xs text-gray-700">{lt.paidType}</td>
                    <td className="p-4 text-xs text-gray-700">{lt.deductBalance}</td>
                    <td className="p-4 text-xs font-semibold text-gray-900">{lt.defaultDays} days</td>
                    <td className="p-4">
                      <button
                        onClick={() => setLeaveTypes(leaveTypes.map(item => item.id === lt.id ? { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active' } : item))}
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${lt.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}
                      >
                        {lt.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // ================= COMPANY ASSETS MANAGEMENT MODULE =================
  const renderAssetManagement = (isEmployeeView = false) => {
    const currentUser = activeEmployeeRecord;
    const displayedAssets = isEmployeeView ? assets.filter(a => a.assignedTo === currentUser.id) : assets;

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{isEmployeeView ? 'My Assigned Company Assets' : 'Company Assets Management'}</h2>
            <p className="text-gray-500 text-sm mt-1">Track laptops, phones, access cards, keys, and workshop equipment issued to staff.</p>
          </div>
          {!isEmployeeView && (
            <button
              onClick={() => {
                setEditingAsset({ isNew: true, id: `AST-00${assets.length + 1}`, name: '', category: 'Laptop / Computer', serialNo: '', assignedTo: '', assignedDate: '2026-11-15', returnDate: '', condition: 'Good', status: 'Available' });
                setAssetModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center font-medium hover:bg-blue-700 shadow-sm text-sm"
            >
              <Plus size={18} className="mr-2" /> Register Asset
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase font-semibold">
                <th className="p-4">Asset ID & Item</th>
                <th className="p-4">Category</th>
                <th className="p-4">Assigned Employee</th>
                <th className="p-4">Date Assigned</th>
                <th className="p-4">Condition & Status</th>
                {!isEmployeeView && <th className="p-4 text-right">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayedAssets.map(ast => {
                const holder = employees.find(e => e.id === ast.assignedTo);
                return (
                  <tr key={ast.id} className="hover:bg-gray-50/50">
                    <td className="p-4">
                      <span className="font-mono text-xs font-bold text-gray-800">{ast.id}</span>
                      <p className="font-semibold text-sm text-gray-900">{ast.name}</p>
                      <p className="text-xs text-gray-400">SN: {ast.serialNo}</p>
                    </td>
                    <td className="p-4 text-xs text-gray-700">{ast.category}</td>
                    <td className="p-4 text-sm text-gray-800">{holder ? `${holder.name} (${holder.id})` : <span className="text-gray-400 italic">Unassigned</span>}</td>
                    <td className="p-4 text-xs text-gray-600">{ast.assignedDate || '—'}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        ast.status === 'Assigned' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        ast.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>{ast.status} • {ast.condition}</span>
                    </td>
                    {!isEmployeeView && (
                      <td className="p-4 text-right">
                        <button
                          onClick={() => { setEditingAsset({ ...ast, isNew: false }); setAssetModalOpen(true); }}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-medium"
                        >
                          Manage
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {assetModalOpen && editingAsset && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setAssetModalOpen(false)}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm">{editingAsset.isNew ? 'Register Company Asset' : `Manage Asset (${editingAsset.id})`}</h3>
                <button onClick={() => setAssetModalOpen(false)}><X size={18}/></button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const clean = { ...editingAsset, status: editingAsset.assignedTo ? 'Assigned' : editingAsset.status };
                  delete clean.isNew;
                  if (editingAsset.isNew) {
                    setAssets([clean, ...assets]);
                  } else {
                    setAssets(assets.map(a => a.id === clean.id ? clean : a));
                  }
                  setAssetModalOpen(false);
                  showToast(`Asset ${clean.id} saved.`);
                }}
                className="p-6 space-y-4 text-sm"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Asset Name *</label>
                  <input type="text" required value={editingAsset.name} onChange={e => setEditingAsset({ ...editingAsset, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                    <select value={editingAsset.category} onChange={e => setEditingAsset({ ...editingAsset, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white">
                      <option>Laptop / Computer</option>
                      <option>Mobile Phone</option>
                      <option>Company SIM Card</option>
                      <option>Access Card</option>
                      <option>Uniform</option>
                      <option>Company Keys</option>
                      <option>Other Equipment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Serial / Tag No</label>
                    <input type="text" value={editingAsset.serialNo} onChange={e => setEditingAsset({ ...editingAsset, serialNo: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Assign to Employee</label>
                  <select value={editingAsset.assignedTo} onChange={e => setEditingAsset({ ...editingAsset, assignedTo: e.target.value, status: e.target.value ? 'Assigned' : 'Available' })} className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white">
                    <option value="">-- Unassigned (Available) --</option>
                    {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.id})</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Condition</label>
                    <select value={editingAsset.condition} onChange={e => setEditingAsset({ ...editingAsset, condition: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white">
                      <option>Good</option>
                      <option>Fair</option>
                      <option>Damaged</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                    <select value={editingAsset.status} onChange={e => setEditingAsset({ ...editingAsset, status: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white">
                      <option>Available</option>
                      <option>Assigned</option>
                      <option>Returned</option>
                      <option>Damaged</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
                  <button type="button" onClick={() => setAssetModalOpen(false)} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-medium">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium">Save Asset</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ================= ANNOUNCEMENTS MODULE =================
  const renderAnnouncements = (isAdminView = false) => {
    const currentUser = activeEmployeeRecord;

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Company Announcements & Notices</h2>
            <p className="text-gray-500 text-sm mt-1">Internal memos, workshop safety updates, and HR policy announcements.</p>
          </div>
          {isAdminView && (
            <button onClick={() => setNewAnnounceModal(true)} className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center font-medium hover:bg-blue-700 shadow-sm text-sm">
              <Plus size={18} className="mr-2" /> New Announcement
            </button>
          )}
        </div>

        <div className="space-y-4">
          {announcements.map(ann => {
            const acknowledged = ann.acknowledgedBy.includes(currentUser.id);
            return (
              <div key={ann.id} className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${ann.priority === 'Urgent' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                        {ann.priority}
                      </span>
                      <span className="text-xs font-medium text-gray-500">{ann.category} • {ann.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">{ann.title}</h3>
                  </div>
                  {isAdminView ? (
                    <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-lg font-medium">
                      Read by {ann.acknowledgedBy.length}/{employees.length} staff
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        if (!acknowledged) {
                          setAnnouncements(announcements.map(a => a.id === ann.id ? { ...a, acknowledgedBy: [...a.acknowledgedBy, currentUser.id] } : a));
                          showToast('Notice acknowledged!');
                        }
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center ${acknowledged ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                      <Check size={14} className="mr-1" /> {acknowledged ? 'Acknowledged' : 'Acknowledge Notice'}
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{ann.content}</p>
                <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">Posted by {ann.author}</p>
              </div>
            );
          })}
        </div>

        {newAnnounceModal && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setNewAnnounceModal(false)}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm">Publish Company Announcement</h3>
                <button onClick={() => setNewAnnounceModal(false)}><X size={18}/></button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setAnnouncements([{
                    id: Date.now(),
                    title: newAnnounce.title,
                    category: newAnnounce.category,
                    priority: newAnnounce.priority,
                    date: new Date().toISOString().split('T')[0],
                    author: `${currentRole}`,
                    content: newAnnounce.content,
                    acknowledgedBy: []
                  }, ...announcements]);
                  setNewAnnounce({ title: '', category: 'General', priority: 'Normal', content: '' });
                  setNewAnnounceModal(false);
                  showToast('Announcement published to all staff!');
                }}
                className="p-6 space-y-4 text-sm"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Announcement Title *</label>
                  <input type="text" required value={newAnnounce.title} onChange={e => setNewAnnounce({ ...newAnnounce, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                    <select value={newAnnounce.category} onChange={e => setNewAnnounce({ ...newAnnounce, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white">
                      <option>General</option>
                      <option>Policy</option>
                      <option>Event</option>
                      <option>Holiday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Priority</label>
                    <select value={newAnnounce.priority} onChange={e => setNewAnnounce({ ...newAnnounce, priority: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white">
                      <option>Normal</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Message Content *</label>
                  <textarea rows="3" required value={newAnnounce.content} onChange={e => setNewAnnounce({ ...newAnnounce, content: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button type="button" onClick={() => setNewAnnounceModal(false)} className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-medium">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium">Publish Now</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ================= INTERACTIVE ORGANIZATION CHART MODULE =================
  const renderOrgChart = () => {
    const canManage = currentRole === 'Super Admin' || currentRole === 'HR Admin';
    const depts = ['All', ...new Set(employees.map(e => e.department))];
    const locs = ['All', ...new Set(employees.map(e => e.location))];

    const isHighlighted = (emp) => {
      const hasFilter = orgSearch.trim() !== '' || orgDeptFilter !== 'All' || orgLocFilter !== 'All';
      if (!hasFilter) return false;
      const matchSearch = orgSearch.trim() === '' || emp.name.toLowerCase().includes(orgSearch.toLowerCase()) || emp.role.toLowerCase().includes(orgSearch.toLowerCase());
      const matchDept = orgDeptFilter === 'All' || emp.department === orgDeptFilter;
      const matchLoc = orgLocFilter === 'All' || emp.location === orgLocFilter;
      return matchSearch && matchDept && matchLoc;
    };

    const renderNode = (emp) => {
      const children = employees.filter(e => e.managerId === emp.id);
      const highlighted = isHighlighted(emp);
      return (
        <div key={emp.id} className="flex flex-col items-center">
          <div
            onClick={() => setSelectedOrgEmp(emp)}
            className={`cursor-pointer p-4 rounded-2xl border transition-all w-56 text-center shadow-sm ${
              highlighted ? 'bg-blue-50 border-blue-500 ring-4 ring-blue-500/20' : 'bg-white border-gray-200 hover:border-blue-400'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-sm flex items-center justify-center mx-auto mb-2">
              {(emp.name || 'U').split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <p className="font-bold text-sm text-gray-900">{emp.name}</p>
            <p className="text-xs text-blue-600 font-medium mt-0.5">{emp.role}</p>
            <p className="text-[11px] text-gray-400 mt-1">{emp.department} • {emp.location}</p>
          </div>
          {children.length > 0 && (
            <>
              <div className="w-0.5 h-6 bg-gray-300"></div>
              <div className="flex flex-wrap justify-center gap-6 pt-4 border-t-2 border-gray-300">
                {children.map(child => renderNode(child))}
              </div>
            </>
          )}
        </div>
      );
    };

    const roots = employees.filter(e => !e.managerId || !employees.some(m => m.id === e.managerId));

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Organization Chart</h2>
            <p className="text-gray-500 text-sm mt-1">Interactive reporting hierarchy. Click any staff card to view team & manager details.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setOrgZoom(z => Math.max(0.6, +(z - 0.1).toFixed(1)))} className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"><ZoomOut size={16}/></button>
            <span className="text-xs font-semibold px-2">{Math.round(orgZoom * 100)}%</span>
            <button onClick={() => setOrgZoom(z => Math.min(1.4, +(z + 0.1).toFixed(1)))} className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"><ZoomIn size={16}/></button>
            {canManage && (
              <button
                onClick={() => setOrgEditMode(!orgEditMode)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center ${orgEditMode ? 'bg-amber-500 text-white' : 'bg-gray-900 text-white'}`}
              >
                <Settings size={14} className="mr-1.5" /> {orgEditMode ? 'Exit Edit Mode' : 'Manage Structure'}
              </button>
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200/75 shadow-sm flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search staff name or title..." value={orgSearch} onChange={e => setOrgSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm" />
          </div>
          <select value={orgDeptFilter} onChange={e => setOrgDeptFilter(e.target.value)} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium">
            {depts.map(d => <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>)}
          </select>
          <select value={orgLocFilter} onChange={e => setOrgLocFilter(e.target.value)} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium">
            {locs.map(l => <option key={l} value={l}>{l === 'All' ? 'All Branches' : l}</option>)}
          </select>
        </div>

        <div className="bg-gray-50/70 rounded-2xl border border-gray-200 p-8 overflow-x-auto min-h-[420px] flex justify-center">
          <div style={{ transform: `scale(${orgZoom})`, transformOrigin: 'top center' }} className="transition-transform flex gap-10">
            {roots.map(root => renderNode(root))}
          </div>
        </div>

        {selectedOrgEmp && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrgEmp(null)}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm">{orgEditMode && canManage ? 'Reorganize Reporting & Role' : 'Employee Profile Summary'}</h3>
                <button onClick={() => setSelectedOrgEmp(null)}><X size={18}/></button>
              </div>
              <div className="p-6 space-y-4 text-sm">
                <div>
                  <p className="text-lg font-bold text-gray-900">{selectedOrgEmp.name}</p>
                  <p className="text-xs text-blue-600 font-semibold">{selectedOrgEmp.role} • {selectedOrgEmp.department} ({selectedOrgEmp.location})</p>
                </div>

                {orgEditMode && canManage ? (
                  <div className="space-y-3 border-t border-gray-100 pt-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Job Title / Position</label>
                      <input
                        type="text"
                        value={selectedOrgEmp.role}
                        onChange={e => {
                          const updated = { ...selectedOrgEmp, role: e.target.value };
                          setSelectedOrgEmp(updated);
                          setEmployees(employees.map(em => em.id === updated.id ? updated : em));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        value={selectedOrgEmp.department}
                        onChange={e => {
                          const updated = { ...selectedOrgEmp, department: e.target.value };
                          setSelectedOrgEmp(updated);
                          setEmployees(employees.map(em => em.id === updated.id ? updated : em));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Assign Reporting Manager</label>
                      <select
                        value={selectedOrgEmp.managerId || ''}
                        onChange={e => {
                          const updated = { ...selectedOrgEmp, managerId: e.target.value || null };
                          setSelectedOrgEmp(updated);
                          setEmployees(employees.map(em => em.id === updated.id ? updated : em));
                          showToast(`Updated reporting manager for ${updated.name}.`);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white"
                      >
                        <option value="">-- Top Level (No Manager) --</option>
                        {employees.filter(e => e.id !== selectedOrgEmp.id).map(m => (
                          <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs border-t border-gray-100 pt-3">
                    <p><span className="text-gray-500">Reporting Manager:</span> <strong>{employees.find(m => m.id === selectedOrgEmp.managerId)?.name || 'Board / Top Level'}</strong></p>
                    <div>
                      <span className="text-gray-500 block mb-1">Direct Team Members ({employees.filter(e => e.managerId === selectedOrgEmp.id).length}):</span>
                      <div className="flex flex-wrap gap-1.5">
                        {employees.filter(e => e.managerId === selectedOrgEmp.id).map(sub => (
                          <span key={sub.id} className="px-2.5 py-1 bg-gray-100 rounded-lg font-medium text-gray-800">{sub.name}</span>
                        ))}
                        {employees.filter(e => e.managerId === selectedOrgEmp.id).length === 0 && <span className="text-gray-400 italic">No direct reports</span>}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button onClick={() => setSelectedOrgEmp(null)} className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-medium">Done</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ================= EMPLOYEE PORTAL VIEWS =================
  const renderEmployeeDashboard = () => {
    const currentUser = activeEmployeeRecord;
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider">Employee Self-Service Portal</p>
            <h2 className="text-2xl font-bold mt-1">Welcome back, {currentUser.preferredName || currentUser.name}!</h2>
            <p className="text-blue-100 text-sm mt-1">{currentUser.role} • {currentUser.department} ({currentUser.location})</p>
          </div>
          <button
            onClick={() => {
              setClockedIn(!clockedIn);
              showToast(!clockedIn ? 'Clocked in at HQ Workshop (GPS Verified).' : 'Clocked out for today.');
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all ${clockedIn ? 'bg-white text-blue-700 hover:bg-blue-50' : 'bg-emerald-400 text-gray-900'}`}
          >
            {clockedIn ? `Clocked In (${clockInTime}) • Tap to Clock Out` : 'Tap to Clock In Now'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase">Annual Leave Balance</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{currentUser.alBalance} Days</p>
            <button onClick={() => setActiveTab('emp-leave')} className="text-xs text-blue-600 font-medium mt-2 hover:underline">Apply Leave →</button>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase">Medical Leave (MC) Balance</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{currentUser.mcBalance} Days</p>
            <p className="text-xs text-gray-400 mt-2">Medical certificate required</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase">My Expense Claims</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{claims.filter(c => c.empId === currentUser.id).length}</p>
            <button onClick={() => setActiveTab('emp-claims')} className="text-xs text-blue-600 font-medium mt-2 hover:underline">Submit / Track Claims →</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm space-y-3">
          <h3 className="font-bold text-gray-900 text-sm">Latest Company Announcements</h3>
          {announcements.map(ann => (
            <div key={ann.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex justify-between">
                <p className="font-semibold text-sm text-gray-900">{ann.title}</p>
                <span className="text-xs text-gray-400">{ann.date}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{ann.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEmployeeProfile = () => {
    const currentUser = activeEmployeeRecord;
    const manager = employees.find(m => m.id === currentUser.managerId);

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">My Employee Profile</h2>
            <p className="text-gray-500 text-sm mt-1">View your personal, employment, banking, and emergency contact details.</p>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {['Profile Details', 'Documents', 'Account Settings'].map(t => (
              <button key={t} onClick={() => setProfileSubTab(t)} className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${profileSubTab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {profileSubTab === 'Profile Details' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
            <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm space-y-3">
              <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Personal Information</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-gray-400 block">Full Name</span><strong className="text-gray-900">{currentUser.name}</strong></div>
                <div><span className="text-gray-400 block">Preferred Name</span><strong className="text-gray-900">{currentUser.preferredName}</strong></div>
                <div><span className="text-gray-400 block">IC / Passport</span><strong className="text-gray-900">{currentUser.ic}</strong></div>
                <div><span className="text-gray-400 block">Date of Birth</span><strong className="text-gray-900">{currentUser.dob}</strong></div>
                <div><span className="text-gray-400 block">Gender & Nationality</span><strong className="text-gray-900">{currentUser.gender} • {currentUser.nationality}</strong></div>
                <div><span className="text-gray-400 block">Marital Status</span><strong className="text-gray-900">{currentUser.maritalStatus}</strong></div>
                <div><span className="text-gray-400 block">Personal Email</span><strong className="text-gray-900">{currentUser.personalEmail}</strong></div>
                <div><span className="text-gray-400 block">Phone Number</span><strong className="text-gray-900">{currentUser.phone}</strong></div>
                <div className="col-span-2"><span className="text-gray-400 block">Home Address</span><strong className="text-gray-900">{currentUser.address}</strong></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm space-y-3">
              <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Employment Information</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-gray-400 block">Employee ID</span><strong className="text-gray-900 font-mono">{currentUser.id}</strong></div>
                <div><span className="text-gray-400 block">Department</span><strong className="text-gray-900">{currentUser.department}</strong></div>
                <div><span className="text-gray-400 block">Position</span><strong className="text-gray-900">{currentUser.role}</strong></div>
                <div><span className="text-gray-400 block">Employment Type</span><strong className="text-gray-900">{currentUser.employmentType}</strong></div>
                <div><span className="text-gray-400 block">Employment Date</span><strong className="text-gray-900">{currentUser.joinDate}</strong></div>
                <div><span className="text-gray-400 block">Reporting Manager</span><strong className="text-gray-900">{manager?.name || 'CEO'}</strong></div>
                <div><span className="text-gray-400 block">Work Location</span><strong className="text-gray-900">{currentUser.location}</strong></div>
                <div><span className="text-gray-400 block">Status</span><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">{currentUser.status}</span></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm space-y-3">
              <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Contact & Emergency Details</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-gray-400 block">Emergency Contact Name</span><strong className="text-gray-900">{currentUser.emergencyName}</strong></div>
                <div><span className="text-gray-400 block">Relationship</span><strong className="text-gray-900">{currentUser.emergencyRelation}</strong></div>
                <div><span className="text-gray-400 block">Emergency Contact Number</span><strong className="text-gray-900">{currentUser.emergencyPhone}</strong></div>
                <div className="col-span-2"><span className="text-gray-400 block">Emergency Address</span><strong className="text-gray-900">{currentUser.emergencyAddress}</strong></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm space-y-3">
              <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Bank Information</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-gray-400 block">Bank Name</span><strong className="text-gray-900">{currentUser.bankName}</strong></div>
                <div><span className="text-gray-400 block">Account Holder Name</span><strong className="text-gray-900">{currentUser.accountHolder}</strong></div>
                <div className="col-span-2"><span className="text-gray-400 block">Bank Account Number</span><strong className="text-gray-900 font-mono">{currentUser.bankAccount}</strong></div>
              </div>
            </div>
          </div>
        )}

        {profileSubTab === 'Documents' && (
          <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm space-y-3">
            <h3 className="font-bold text-gray-900 text-sm">Personal & Employment Documents</h3>
            {['IC / Passport Copy', 'Employment Contract', 'Offer Letter', 'Confirmation Letter', 'Technical Certificates'].map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-sm font-medium text-gray-800 flex items-center"><FileText size={16} className="mr-2 text-blue-600" /> {doc}</span>
                <button onClick={() => showToast(`Downloaded ${doc}.pdf`)} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100">Download</button>
              </div>
            ))}
          </div>
        )}

        {profileSubTab === 'Account Settings' && (
          <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm max-w-lg space-y-4 text-sm">
            <h3 className="font-bold text-gray-900">Account & Security Settings</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Login Email</label>
              <input type="email" defaultValue={currentUser.personalEmail} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
            </div>
            <button onClick={() => showToast('Account settings updated!')} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold">Update Account</button>
          </div>
        )}
      </div>
    );
  };

  const renderEmployeeLeave = () => {
    const currentUser = activeEmployeeRecord;
    const myLeaves = leaves.filter(l => l.empId === currentUser.id);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">My Leave & Holidays</h2>
            <p className="text-gray-500 text-sm mt-1">Check your leave balances, submit applications, and upload MCs.</p>
          </div>
          <button onClick={() => setEmpLeaveModal(true)} className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center font-medium text-sm hover:bg-blue-700">
            <Plus size={18} className="mr-2" /> Apply Leave
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-blue-600 uppercase">Annual Leave Available</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{currentUser.alBalance} Days</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm">
            <p className="text-xs font-semibold text-emerald-600 uppercase">Medical Leave (MC) Available</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{currentUser.mcBalance} Days</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase font-semibold">
                <th className="p-4">Leave Type</th>
                <th className="p-4">Dates</th>
                <th className="p-4">Days</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myLeaves.map(l => (
                <tr key={l.id}>
                  <td className="p-4 font-semibold text-sm text-gray-900">{l.type}</td>
                  <td className="p-4 text-xs text-gray-600">{l.startDate} to {l.endDate}</td>
                  <td className="p-4 text-xs font-bold">{l.days}d</td>
                  <td className="p-4"><span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">{l.status}</span></td>
                  <td className="p-4 text-right">
                    {l.status === 'Pending' && (
                      <button onClick={() => setLeaves(leaves.filter(item => item.id !== l.id))} className="text-xs text-rose-600 font-medium hover:underline">Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {empLeaveModal && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEmpLeaveModal(false)}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm">Apply for Leave</h3>
                <button onClick={() => setEmpLeaveModal(false)}><X size={18}/></button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setLeaves([{
                    id: Date.now(),
                    empId: currentUser.id,
                    empName: currentUser.name,
                    type: newLeaveReq.type,
                    startDate: newLeaveReq.startDate,
                    endDate: newLeaveReq.endDate,
                    days: Number(newLeaveReq.days),
                    reason: newLeaveReq.reason,
                    attachment: newLeaveReq.attachment,
                    status: 'Pending'
                  }, ...leaves]);
                  setEmpLeaveModal(false);
                  showToast('Leave application submitted!');
                }}
                className="p-6 space-y-4 text-sm"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Leave Category</label>
                  <select value={newLeaveReq.type} onChange={e => setNewLeaveReq({ ...newLeaveReq, type: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white">
                    {leaveTypes.filter(lt => lt.status === 'Active').map(lt => <option key={lt.id} value={lt.name}>{lt.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Start Date</label>
                    <input type="date" value={newLeaveReq.startDate} onChange={e => setNewLeaveReq({ ...newLeaveReq, startDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">End Date</label>
                    <input type="date" value={newLeaveReq.endDate} onChange={e => setNewLeaveReq({ ...newLeaveReq, endDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Total Days</label>
                  <input type="number" min="1" value={newLeaveReq.days} onChange={e => setNewLeaveReq({ ...newLeaveReq, days: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Upload MC / Supporting Document</label>
                  <input type="file" onChange={e => setNewLeaveReq({ ...newLeaveReq, attachment: e.target.files?.[0]?.name || '' })} className="w-full text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Reason</label>
                  <textarea rows="2" required value={newLeaveReq.reason} onChange={e => setNewLeaveReq({ ...newLeaveReq, reason: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl" />
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button type="button" onClick={() => setEmpLeaveModal(false)} className="px-4 py-2 border border-gray-200 rounded-xl text-xs">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold">Submit Leave</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEmployeePayroll = () => {
    const currentUser = activeEmployeeRecord;
    const myPayslips = payslips.filter(p => p.empId === currentUser.id);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">My Payslips & Salary Breakdown</h2>
          <p className="text-gray-500 text-sm mt-1">View and download your monthly payslips issued by HR/Finance.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200 text-xs text-gray-500 uppercase font-semibold">
                <th className="p-4">Month</th>
                <th className="p-4">Basic Salary</th>
                <th className="p-4">Commission & OT</th>
                <th className="p-4">Deductions</th>
                <th className="p-4">Net Pay</th>
                <th className="p-4 text-right">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myPayslips.map(p => (
                <tr key={p.id}>
                  <td className="p-4 font-semibold text-sm text-gray-900">{p.month}</td>
                  <td className="p-4 text-sm">RM {formatMoney(p.basic)}</td>
                  <td className="p-4 text-xs text-emerald-700">+ RM {formatMoney(Number(p.commission) + Number(p.ot) + Number(p.allowance))}</td>
                  <td className="p-4 text-xs text-rose-600">- RM {formatMoney(p.deductions)}</td>
                  <td className="p-4 font-bold text-sm text-gray-900">RM {formatMoney(p.netPay)}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => showToast(`Downloading ${p.fileName}...`)} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold inline-flex items-center">
                      <Download size={13} className="mr-1" /> Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Generic Clean Module View for Remaining Operational Modules
  const renderOperationalModule = (title, subtitle, items) => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/75 shadow-sm space-y-2">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{item.tag}</span>
            <h3 className="font-bold text-gray-900 text-base">{item.heading}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Main Content Switch
  const renderContent = () => {
    switch (activeTab) {
      case 'admin-dashboard': return renderAdminDashboard();
      case 'employee-mgmt': return renderEmployeeManagement();
      case 'user-roles': return renderUserRoleManagement();
      case 'payroll-mgmt': return renderPayrollManagement();
      case 'claims-mgmt': return renderAdminClaimsManagement();
      case 'leave-mgmt': return renderLeaveManagement();
      case 'asset-mgmt': return renderAssetManagement(false);
      case 'admin-announcements': return renderAnnouncements(true);
      case 'org-chart': return renderOrgChart();
      case 'doc-mgmt': return renderDocumentsAndLetters();
      case 'attendance-mgmt':
        return renderOperationalModule('Attendance & Overtime Tracking', 'Monitor daily clock-ins, late arrivals, and workshop overtime hours.', [
          { tag: 'Daily Logs', heading: '5 / 5 Staff Clocked In Today', desc: 'All workshop and HQ staff clocked in via GPS mobile check-in before 9:00 AM.' },
          { tag: 'Overtime (OT)', heading: '18.5 Total OT Hours This Week', desc: 'Verified by Head Foreman Ahmad Albab for vehicle overhaul jobs.' },
          { tag: 'Corrections', heading: '0 Pending Attendance Appeals', desc: 'All punch logs are synchronized with Payroll.' }
        ]);
      case 'recruitment':
        return renderOperationalModule('Recruitment & Applicant Tracking', 'Manage open workshop mechanic positions, interviews, and candidate offers.', [
          { tag: 'Open Vacancy', heading: 'Diagnostic Technician (2 Pax)', desc: '12 applicants shortlisted • Interviews scheduled this Thursday.' },
          { tag: 'Open Vacancy', heading: 'Service Advisor (Branch A)', desc: '8 applicants under HR review.' },
          { tag: 'Offer Stage', heading: '1 Offer Letter Pending Acceptance', desc: 'Auto-linked to HR Document Generator.' }
        ]);
      case 'performance-mgmt':
        return renderOperationalModule('KPI & Performance Appraisals', 'Evaluate workshop productivity, customer satisfaction, and annual appraisals.', [
          { tag: 'Q4 Review', heading: '92% Average Team KPI Score', desc: 'Workshop Operations achieved 98% on-time vehicle delivery.' },
          { tag: 'Self Assessment', heading: '4 / 5 Staff Submitted Reviews', desc: 'Manager evaluation open until end of month.' },
          { tag: 'Promotions', heading: '1 Promotion Recommended', desc: 'Muthu Kumar recommended for Workshop Team Lead.' }
        ]);
      case 'shift-mgmt':
        return renderOperationalModule('Shift & Branch Roster Management', 'Schedule morning/afternoon workshop shifts, rest days, and branch assignments.', [
          { tag: 'HQ Workshop', heading: 'Mon - Sat (8:30 AM - 5:30 PM)', desc: '3 mechanics & 1 foreman assigned on active rotation.' },
          { tag: 'Branch A', heading: 'Mon - Sat (9:00 AM - 6:00 PM)', desc: 'Marketing & customer reception coverage active.' },
          { tag: 'Public Holidays', heading: '2026 Federal & Selangor Holidays', desc: 'Synced automatically with Leave Calendar.' }
        ]);
      case 'reports':
        return renderOperationalModule('HR Reports & Workforce Analytics', 'Export headcount, payroll, attendance, OT, and turnover reports to Excel/PDF.', [
          { tag: 'Payroll Summary', heading: 'RM 36,000 Monthly Gross Payroll', desc: 'Includes EPF, SOCSO, EIS, and workshop commissions.' },
          { tag: 'Turnover Rate', heading: '0.0% Quarterly Staff Turnover', desc: 'High retention across technical mechanics.' },
          { tag: 'Export Center', heading: 'Ready for Excel & PDF Export', desc: 'Statutory submission files ready for download.' }
        ]);
      case 'system-settings':
        return renderOperationalModule('System Settings & RBAC Access Control', 'Manage role permissions across Super Admin, HR Admin, Manager, Finance, and Employee.', [
          { tag: 'Super Admin', heading: 'Full System Access', desc: 'Unrestricted access to employee master data, payroll, claims, assets, and settings.' },
          { tag: 'HR Admin & Finance', heading: 'Departmental Role Isolation', desc: 'Finance manages payroll & claims; HR manages staff, leaves, and letters.' },
          { tag: 'Employee Portal', heading: 'Self-Service Isolation', desc: 'Staff can only view their own payslips, leaves, claims, and company directory.' }
        ]);

      // Employee Portal Routes
      case 'emp-dashboard': return renderEmployeeDashboard();
      case 'emp-profile': return renderEmployeeProfile();
      case 'emp-leave': return renderEmployeeLeave();
      case 'emp-payroll': return renderEmployeePayroll();
      case 'emp-claims': return renderEmployeeClaims();
      case 'emp-assets': return renderAssetManagement(true);
      case 'emp-org-chart': return renderOrgChart();
      case 'emp-announcements': return renderAnnouncements(false);
      case 'emp-attendance':
        return renderOperationalModule('My Attendance & GPS Clock-In', 'View your daily punch records, working hours, and overtime logs.', [
          { tag: 'Today Status', heading: clockedIn ? `Clocked In at ${clockInTime}` : 'Currently Clocked Out', desc: 'Location verified: HQ Workshop / Branch A Geofence.' },
          { tag: 'This Month', heading: '100% Punctuality Score', desc: '0 late arrivals • 4.5 hours approved overtime.' },
          { tag: 'Working Hours', heading: '8h 45m Daily Average', desc: 'Standard shift: 9:00 AM - 6:00 PM.' }
        ]);
      case 'emp-schedule':
        return renderOperationalModule('My Weekly & Monthly Roster', 'Check your assigned branch, working hours, and scheduled rest days.', [
          { tag: 'Assigned Branch', heading: 'Branch A (Subang Jaya)', desc: 'Reporting to Sarah Lee (HR & Finance Manager).' },
          { tag: 'Current Shift', heading: 'Regular Day Shift (9:00 AM - 6:00 PM)', desc: 'Monday to Friday • Rest Day: Sunday.' },
          { tag: 'Shift Swap', heading: 'No Active Swap Requests', desc: 'Contact your supervisor for urgent roster adjustments.' }
        ]);
      case 'emp-performance':
        return renderOperationalModule('My KPIs & Performance Goals', 'Track your quarterly targets, self-assessments, and manager feedback.', [
          { tag: 'Overall KPI', heading: '94% Target Achievement', desc: 'Exceeded Q4 workshop marketing & customer retention goals.' },
          { tag: 'Manager Feedback', heading: 'Strong Initiative & Teamwork', desc: 'Reviewed by Sarah Lee on 01 Nov 2026.' },
          { tag: 'Next Appraisal', heading: 'Annual Review • December 2026', desc: 'Self-assessment form unlocked.' }
        ]);
      default:
        return renderAdminDashboard();
    }
  };

  const allowedNavIds = roleNavMap[currentRole] || [];
  const adminNavIds = allowedNavIds.filter(id => !id.startsWith('emp-'));
  const empNavIds = allowedNavIds.filter(id => id.startsWith('emp-'));

  // ================= RBAC LOGIN SCREEN =================
  if (!loggedInUser) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4 font-sans antialiased text-slate-800">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_12px_40px_-12px_rgba(15,23,42,0.08)] border border-slate-200/80 overflow-hidden">
          <div className="p-8 pb-6 text-center border-b border-slate-100 bg-gradient-to-b from-slate-50/70 to-white">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-600/20 mb-4">
              <Users size={28} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">HR Management System</h1>
            <p className="text-sm text-slate-500 mt-1">Welcome back! Please sign in to continue.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="p-8 space-y-5">
            {loginError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start">
                <AlertCircle size={16} className="mr-2 shrink-0 mt-0.5 text-rose-600" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter your company email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-emerald-700 bg-emerald-50/80 border border-emerald-200/70 px-3.5 py-2.5 rounded-xl font-medium">
              <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
              <span>Your account role will be detected automatically after login.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-sm shadow-blue-600/20 transition-all"
            >
              Sign In
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setForgotPasswordOpen(true);
                  setResetSentMsg('');
                  setResetEmail(loginEmail);
                }}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </form>

          {/* Demo Accounts Quick-Fill Strip for Testing RBAC */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center">
              <KeyRound size={12} className="mr-1.5" /> Demo Staff Accounts (Click to Auto-Fill)
            </p>
            <div className="grid grid-cols-2 gap-2">
              {employees.slice(0, 4).map(acc => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => {
                    setLoginEmail(acc.workEmail);
                    setLoginPassword(acc.password);
                    setLoginError('');
                  }}
                  className="text-left p-2 bg-white hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 rounded-xl transition-all group"
                >
                  <p className="text-xs font-bold text-slate-800 group-hover:text-blue-700 truncate">{acc.name}</p>
                  <p className="text-[10px] font-semibold text-blue-600">{acc.systemRole}</p>
                  <p className="text-[10px] text-slate-400 truncate">{acc.workEmail}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Forgot Password Modal */}
        {forgotPasswordOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setForgotPasswordOpen(false)}>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-sm overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 text-sm">Reset Account Password</h3>
                <button onClick={() => setForgotPasswordOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={18}/></button>
              </div>
              <div className="p-6 space-y-4">
                {resetSentMsg ? (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium">
                    {resetSentMsg}
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-slate-500">Enter your registered company email address. HR IT support will send a password reset link.</p>
                    <input
                      type="email"
                      placeholder="name@bengkelpro.my"
                      value={resetEmail}
                      onChange={e => setResetEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!resetEmail.trim()) return;
                        setResetSentMsg(`Password reset instructions have been sent to ${resetEmail}.`);
                      }}
                      className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
                    >
                      Send Reset Link
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans antialiased">
      {/* Clean White Modern SaaS Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200/80 transition-all duration-300 flex flex-col shrink-0 shadow-[2px_0_12px_-4px_rgba(0,0,0,0.03)] z-20`}>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100">
          {sidebarOpen ? (
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-sm shadow-sm shadow-blue-600/20">
                BP
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 tracking-tight block leading-none">BengkelPro</span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">HR & Workshop Suite</span>
              </div>
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-sm mx-auto shadow-sm">
              BP
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Toggle Sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        <nav className="flex-1 p-3.5 space-y-5 overflow-y-auto">
          {adminNavIds.length > 0 && (
            <div className="space-y-1">
              {sidebarOpen && (
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Management Portal
                </p>
              )}
              {adminNavIds.map(id => {
                const item = navItems[id];
                if (!item) return null;
                const Icon = item.icon;
                const active = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-blue-50/90 text-blue-700 shadow-xs border border-blue-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={17} className={`${sidebarOpen ? 'mr-3 shrink-0' : 'mx-auto'} ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          )}

          {empNavIds.length > 0 && (
            <div className="space-y-1">
              {sidebarOpen && (
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Employee Self-Service
                </p>
              )}
              {empNavIds.map(id => {
                const item = navItems[id];
                if (!item) return null;
                const Icon = item.icon;
                const active = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-blue-50/90 text-blue-700 shadow-xs border border-blue-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={17} className={`${sidebarOpen ? 'mr-3 shrink-0' : 'mx-auto'} ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          )}
        </nav>

        {/* Bottom Logged-In User Card */}
        {sidebarOpen && (
          <div className="p-3.5 border-t border-slate-100 space-y-2">
            <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/60">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {(activeEmployeeRecord.name || 'U').split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {activeEmployeeRecord.name}
                </p>
                <p className="text-[11px] text-blue-600 font-semibold truncate">{currentRole}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200/70 transition-all"
            >
              <LogOut size={14} className="mr-1.5" /> Sign Out
            </button>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Clean Glass Top Header with Detected RBAC Role Badge */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-semibold">
              {currentRole === 'Employee' ? 'Employee Portal' : 'HR & Admin Portal'}
            </span>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-slate-900 text-sm">{navItems[activeTab]?.label || 'Dashboard'}</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-emerald-50/80 px-3.5 py-1.5 rounded-xl border border-emerald-200/80">
              <ShieldCheck size={14} className="text-emerald-600 mr-1.5" />
              <span className="text-xs text-slate-500 mr-1.5 hidden sm:inline">Authenticated Role:</span>
              <span className="text-xs font-bold text-emerald-700">{currentRole}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/80 transition-colors flex items-center"
            >
              <LogOut size={14} className="mr-1.5" /> Sign Out
            </button>
          </div>
        </header>

        {/* Global Toast */}
        {globalToast && (
          <div className="mx-6 mt-4 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between shadow-sm">
            <span className="flex items-center"><Check size={18} className="mr-2 text-emerald-600" /> {globalToast}</span>
            <button onClick={() => setGlobalToast('')}><X size={16}/></button>
          </div>
        )}

        {/* Workspace Viewport */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}