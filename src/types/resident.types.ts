export type VisitorType = 'DELIVERY' | 'GUEST' | 'CAB' | 'SERVICE';
export type VisitorStatus = 'PENDING' | 'APPROVED' | 'DENIED' | 'EXPECTED' | 'EXPIRED';

export interface Visitor {
  id: string;
  name: string;
  type: VisitorType;
  time: string;
  phone: string;
  code?: string;
  company?: string;
  status: VisitorStatus;
}

export type TicketStatus = 'In Progress' | 'Assigned' | 'Resolved' | 'Open';
export type TicketCategory = 'Plumbing' | 'Elevator' | 'Electrical' | 'Security' | 'General';

export interface TicketMessage {
  id: string;
  sender: string;
  role: 'Resident' | 'Admin' | 'Staff';
  text: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  code: string; // e.g. #T1
  title: string;
  category: TicketCategory;
  updatedAt: string;
  status: TicketStatus;
  description: string;
  thread?: TicketMessage[];
}

export interface Amenity {
  id: string;
  name: string;
  timings: string;
  icon: string;
  emoji: string;
  availableSlots: string[];
  rules?: string[];
}

export interface Booking {
  id: string;
  amenityId: string;
  amenityName: string;
  slot: string;
  date: string;
  status: 'CONFIRMED' | 'CANCELLED';
}

export interface PaymentItem {
  id: string;
  label: string;
  amount: number;
}

export interface Invoice {
  id: string;
  monthYear: string;
  dueDate: string;
  totalAmount: number;
  isPaid: boolean;
  breakdown: PaymentItem[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  initials: string;
  isAvailable: boolean;
}

export type LostFoundCategory = 'LOST' | 'FOUND';

export interface LostFoundItem {
  id: string;
  title: string;
  description: string;
  category: LostFoundCategory;
  location: string;
  postedBy: string;
  timeAgo: string;
}

export interface MarketplaceListing {
  id: string;
  title: string;
  price: number;
  category: 'Furniture' | 'Electronics' | 'Kids' | 'Food' | 'Fitness';
  postedBy: string;
  unit: string;
  timeAgo: string;
  emoji: string;
  isLiked?: boolean;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  expiresIn: string;
  totalVotes: number;
  options: PollOption[];
  userVotedOptionId?: string;
}

export interface Notice {
  id: string;
  title: string;
  category: string;
  timeAgo: string;
  content: string;
}