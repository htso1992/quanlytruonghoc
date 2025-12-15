
export enum Role {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  DEVICE_MANAGER = 'DEVICE_MANAGER' // New Role
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE'
}

export enum SchoolSession {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON'
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: Role;
  avatarUrl?: string;
  email?: string;
  password?: string;
  classId?: string;
}

export interface ClassInfo {
  id: string;
  name: string;
  grade: number;
  homeroomTeacherId: string;
  studentsCount: number;
}

export interface Subject {
  id: string;
  name: string;
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
}

export interface ClassSession {
  id: string;
  classId: string;
  date: string;
  sessionType: SchoolSession;
  periods: number[];
  subjectId: string;
  teacherId: string;
  lessonContent: string;
  attendeesCount: number;
  absentStudents: string[];
  attendanceRecords?: AttendanceRecord[];
  note: string;
  classification: 'A' | 'B' | 'C' | 'D';
  score: number;
  signed: boolean;
}

export interface SubjectRoomSession {
  id: string;
  roomType: 'IT' | 'ENGLISH';
  date: string;
  sessionType: SchoolSession;
  periods: number[];
  className: string;
  teacherId: string;
  lessonContent: string;
  
  // Fields for Log Book (Sổ Nhật Ký)
  statusBefore: string; // Tình trạng phòng máy đầu giờ dạy
  statusAfter: string;  // Tình trạng phòng máy sau giờ dạy
  
  // Fields for Registration Form (Phiếu Đăng Ký)
  studentCount?: number; // Số học sinh
  deviceCount?: number; // Số lượng máy sử dụng

  note: string;
  signed: boolean;
  bghApproved?: boolean; // Chữ ký Ban Giám Hiệu
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  type: '15_MIN' | '45_MIN' | 'MID_TERM' | 'FINAL';
  score: number;
  date: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

// --- NEW TYPES FOR DEVICE MANAGEMENT ---

export enum DeviceType {
  DURABLE = 'DURABLE', // Tài sản cố định (Máy chiếu, Tranh ảnh...) -> Sổ thiết bị / S26H
  CONSUMABLE = 'CONSUMABLE' // Tiêu hao (Phấn, Hóa chất...) -> Sổ tiêu hao
}

export enum LoanStatus {
  PENDING = 'PENDING', // Đang chờ duyệt
  BORROWED = 'BORROWED', // Đang mượn
  RETURNED = 'RETURNED', // Đã trả
  OVERDUE = 'OVERDUE' // Quá hạn
}

export interface Device {
  id: string;
  code: string; // Mã thiết bị (Dùng làm Tên TSCĐ trong ngữ cảnh đơn giản hoặc Code quản lý)
  name: string; // Tên TSCĐ và công cụ dụng cụ
  type: DeviceType;
  totalQuantity: number;
  availableQuantity: number;
  minStockLevel?: number; // Mức tồn kho tối thiểu để cảnh báo
  unit: string; // Đơn vị tính
  category: string; // Môn Lý, Hóa, Chung...
  location?: string; // Kho 1, Tủ 2...
  
  // Fields for S26H
  dateRecorded?: string; // Ngày, tháng ghi sổ (Cột A)
  documentNumber?: string; // Chứng từ - Số (Cột B)
  documentDate?: string; // Chứng từ - Ngày (Cột C)
  unitPrice?: number; // Đơn giá (Cột 3)
  source?: string; // Ghi chú / Nguồn gốc (Cột F)
  
  // Management Fields
  isLiquidated?: boolean; // Đã thanh lý
  liquidationDate?: string;
  lastInventoryDate?: string; // Ngày kiểm kê gần nhất
}

export interface DeviceLoan {
  id: string;
  teacherId: string;
  deviceId: string;
  deviceName: string; // Cache name for easier display
  quantity: number;
  borrowDate: string;
  returnDate: string; // Expected return date
  actualReturnDate?: string;
  status: LoanStatus;
  notes?: string; // Tình trạng khi mượn/trả
  bghApproved?: boolean; // Ký duyệt sổ mượn trả
}
