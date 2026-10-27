export type TutorVerificationStatus = 'pending' | 'approved' | 'rejected';
export type ReportStatus = 'open' | 'dismissed' | 'removed' | 'warned' | 'escalated';
export type ReportKind = 'post' | 'user';
export type ActionType =
  | 'APPROVE_TUTOR' | 'REJECT_TUTOR' | 'REMOVE_POST'
  | 'DISMISS_REPORT' | 'WARN_USER' | 'ESCALATE_ADMIN';

export interface TutorSubmission {
  id: string;
  userId: string;
  name: string;
  university: string;
  degree: string;
  experienceYears: number;
  subjects: string[];
  classLevels: string[];
  area: string;
  expectedSalaryBDT: number;
  submittedAt: string;
  verificationStatus: TutorVerificationStatus;
  reviewReason?: string;
}
export interface ReportItem {
  id: string;
  kind: ReportKind;
  targetId: string;
  targetUserId: string;
  targetTitle: string;
  reporterName: string;
  reason: string;
  details: string;
  createdAt: string;
  status: ReportStatus;
}
export interface ModerationRecord {
  id: string;
  type: ActionType;
  targetId: string;
  targetLabel: string;
  reason: string;
  actorId: string;
  createdAt: string;
}
export interface ModerationState {
  tutors: TutorSubmission[];
  reports: ReportItem[];
  history: ModerationRecord[];
}
export type ModerationAction =
  | { type: 'HYDRATE'; payload: ModerationState }
  | { type: 'SET_TUTOR_STATUS'; tutorId: string; status: 'approved' | 'rejected'; reason: string; record: ModerationRecord }
  | { type: 'SET_REPORT_STATUS'; reportId: string; status: Exclude<ReportStatus, 'open'>; record: ModerationRecord }
  | { type: 'ADD_REPORT'; report: ReportItem }
  | { type: 'UPSERT_TUTOR'; tutor: TutorSubmission }
  | { type: 'RESET_DEMO' };
