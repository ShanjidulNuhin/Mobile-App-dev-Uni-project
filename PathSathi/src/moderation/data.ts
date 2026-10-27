import { ModerationState } from './types';

// Fictional Bangladesh-focused entries. No actual student or tutor records.
export const SEED: ModerationState = {
  tutors: [
    { id:'tv-101', userId:'u-101', name:'Nafisa Rahman', university:'University of Dhaka', degree:'BSc in Mathematics', experienceYears:3, subjects:['Mathematics','Physics'], classLevels:['8','9','10'], area:'Dhanmondi, Dhaka', expectedSalaryBDT:7000, submittedAt:'2026-10-25T10:20:00Z', verificationStatus:'pending' },
    { id:'tv-102', userId:'u-102', name:'Rafiul Karim', university:'AIUB', degree:'BSc in CSE (ongoing)', experienceYears:2, subjects:['ICT','Mathematics'], classLevels:['7','8','9'], area:'Uttara, Dhaka', expectedSalaryBDT:6000, submittedAt:'2026-10-24T14:30:00Z', verificationStatus:'pending' },
    { id:'tv-103', userId:'u-103', name:'Tasmia Ahmed', university:'BRAC University', degree:'BA in English', experienceYears:4, subjects:['English'], classLevels:['6','7','8','9'], area:'Bashundhara, Dhaka', expectedSalaryBDT:8500, submittedAt:'2026-10-23T09:45:00Z', verificationStatus:'pending' },
    { id:'tv-104', userId:'u-104', name:'Mahir Hasan', university:'Jahangirnagar University', degree:'BSc in Physics', experienceYears:1, subjects:['Physics','Chemistry'], classLevels:['9','10','11'], area:'Mirpur, Dhaka', expectedSalaryBDT:5000, submittedAt:'2026-10-22T15:10:00Z', verificationStatus:'approved' },
  ],
  reports: [
    {id:'rep-201', kind:'post', targetId:'post-19', targetUserId:'u-201', targetTitle:'Class 10 Maths, Mirpur', reporterName:'Demo Reporter 1', reason:'Misleading tuition details', details:'Salary and required days appear inconsistent with the messages.', createdAt:'2026-10-25T12:30:00Z', status:'open'},
    {id:'rep-202', kind:'user', targetId:'u-202', targetUserId:'u-202', targetTitle:'Tutor account: ExampleUser202', reporterName:'Demo Reporter 2', reason:'Repeated unwanted messages', details:'The user kept messaging after the guardian declined.', createdAt:'2026-10-24T10:00:00Z', status:'open'},
    {id:'rep-203', kind:'post', targetId:'post-23', targetUserId:'u-203', targetTitle:'English tutoring, Uttara', reporterName:'Demo Reporter 3', reason:'Duplicate or spam posting', details:'The same request was posted several times.', createdAt:'2026-10-23T07:20:00Z', status:'open'},
  ],
  history: [],
};
export function newDemoState(): ModerationState {
  return JSON.parse(JSON.stringify(SEED)) as ModerationState;
}
