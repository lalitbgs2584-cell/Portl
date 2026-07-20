// ── From your DB enums (public schema) ──────────────────────────
export type ShiftType = 'morning' | 'evening' | 'night';
export type GuardStatus = 'active' | 'inactive' | 'suspended';
export type StaffLeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type StaffLogStatus = 'inside' | 'exited';
export type GuestPassStatus = 'active' | 'expired' | 'cancelled';
export type ApprovalMethod = 'resident' | 'qr' | 'guard' | 'admin';
export type VisitType = 'guest' | 'delivery' | 'service' | 'staff' | 'emergency'; // no 'cab' — see flag #1
export type DeliveryLogStatus = 'pending' | 'entered' | 'delivered' | 'exited' | 'cancelled';
export type ComplaintStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type NotificationType =
  | 'visitor_request'
  | 'complaint_update'
  | 'payment_due'
  | 'notice'
  | 'event'
  | 'poll'
  | 'system';
export type NotificationReferenceType = 'visitor' | 'complaint' | 'payment' | 'notice' | 'event' | 'poll';

// ── Gap: no DB enum for shift state (upcoming/active/completed/missed) ──
// Placeholder until you confirm whether this is a real column or derived client-side. See flag #2.
export type ShiftRuntimeStatus = 'upcoming' | 'active' | 'completed' | 'missed';

export interface Shift {
  id: string;
  date: string;
  shiftType: ShiftType;       // was: label (free text) → now the real enum
  startTime: string;
  endTime: string;
  runtimeStatus: ShiftRuntimeStatus; // see gap above
}

// Handover confirms WHO is on duty; staff_log tracks in/out timestamps — kept separate, see flag #6
export interface Attendance {
  markedByGuardId: string;
  markedByGuardName: string;
  markedAt: string;
  logStatus: StaffLogStatus; // 'inside' | 'exited'
}

export interface HandoverRequest {
  id: string;
  outgoingGuardId: string;
  incomingGuardId: string;
  incomingGuardName: string;
  shiftId: string;
  status: 'pending' | 'confirmed'; // no matching DB enum — confirm if this needs one
}

// VisitorEntry — now uses VisitType and ApprovalMethod instead of invented unions
export interface VisitorEntry {
  id: string;
  name: string;
  phone: string;
  visitType: VisitType;           // was: purpose (VisitorPurpose)
  visitingFlat: string;
  visitingResidentName?: string;
  expectedDuration?: string;
  photoUri?: string;
  status: 'pending' | 'approved' | 'rejected'; // no direct DB enum spotted for this — check if visits table has its own
  approvalMethod: ApprovalMethod; // was: source (VisitorSource) — 'qr'/'guard'/'resident'/'admin' fits better
  createdAt: string;
}

// If deliveries are really a separate table (flag #5), this is that shape:
export interface DeliveryLog {
  id: string;
  courierName?: string;
  visitingFlat: string;
  status: DeliveryLogStatus;
  createdAt: string;
}

export interface PreApprovedVisitor {
  id: string;
  name: string;
  phone: string;
  visitingFlat: string;
  validFrom: string;
  validTo: string;
  photoUri?: string;
  passStatus: GuestPassStatus; // was: checkedIn boolean — see flag #7
}

// IssueReport — likely just `complaints` (flag #3). Kept as its own interface for now,
// but type field should probably be dropped in favor of whatever category column complaints already has.
export interface IssueReport {
  id: string;
  description: string;
  location: string;
  photoUri?: string;
  reportedByGuardId: string;
  status: ComplaintStatus;
  createdAt: string;
}

export interface LeaveRequest {
  id: string;
  type: 'sick' | 'casual' | 'emergency' | 'other'; // no matching DB enum found — confirm if leave_type exists
  fromDate: string;
  toDate: string;
  reason: string;
  status: StaffLeaveStatus; // now includes 'cancelled'
  appliedAt: string;
}

export interface AppNotification {
  id: string;
  type: NotificationType;               // now matches real enum
  referenceType?: NotificationReferenceType;
  referenceId?: string;                 // pairs with referenceType to build the actual route, not a stored route string
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export interface DutyHistoryEntry {
  id: string;
  shiftType: ShiftType;
  fromDate: string;
  toDate: string;
  status: 'completed' | 'missed'; // no DB enum found — confirm
  handledByGuardName?: string;
}