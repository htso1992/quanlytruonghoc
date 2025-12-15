
import { Role, User, ClassInfo, Subject, ClassSession, Grade, AttendanceStatus, SubjectRoomSession, SchoolSession, Device, DeviceType, DeviceLoan, LoanStatus } from './types';

// Users - Added Device Manager
export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'admin', fullName: 'Quản Trị Viên', role: Role.ADMIN, avatarUrl: 'https://picsum.photos/200' },
  { id: 'u2', username: 'gv_huong', fullName: 'Cô Nguyễn Thu Hương', role: Role.TEACHER, avatarUrl: 'https://picsum.photos/201' },
  { id: 'u3', username: 'gv_tuan', fullName: 'Thầy Trần Văn Tuấn', role: Role.TEACHER, avatarUrl: 'https://picsum.photos/202' },
  { id: 'u4', username: 'hs_nam', fullName: 'Phạm Thành Nam', role: Role.STUDENT, classId: 'c6a1', avatarUrl: 'https://picsum.photos/203' },
  { id: 'u5', username: 'hs_linh', fullName: 'Lê Thùy Linh', role: Role.STUDENT, classId: 'c6a1', avatarUrl: 'https://picsum.photos/204' },
  { id: 'u6', username: 'hs_minh', fullName: 'Trần Văn Minh', role: Role.STUDENT, classId: 'c6a1', avatarUrl: 'https://picsum.photos/205' },
  { id: 'u7', username: 'gv_hoa', fullName: 'Cô Lê Thị Hoa', role: Role.TEACHER, avatarUrl: 'https://picsum.photos/206' },
  { id: 'u8', username: 'gv_binh', fullName: 'Thầy Nguyễn Thái Bình', role: Role.TEACHER, avatarUrl: 'https://picsum.photos/207' },
  { id: 'u9', username: 'qt_thietbi', fullName: 'Cô Phạm Thị Dung', role: Role.DEVICE_MANAGER, avatarUrl: 'https://picsum.photos/208' }, // New Device Manager
];

// Generate Classes: 6A1-6A4, 7A1-7A4, 8A1-8A4, 9A1-9A4
export const MOCK_CLASSES: ClassInfo[] = [];
const grades = [6, 7, 8, 9];
const classesPerGrade = 4; // A1 to A4

grades.forEach(grade => {
    for (let i = 1; i <= classesPerGrade; i++) {
        MOCK_CLASSES.push({
            id: `c${grade}a${i}`,
            name: `${grade}A${i}`,
            grade: grade,
            homeroomTeacherId: (i % 2 === 0) ? 'u2' : 'u3', // Alternate homeroom teachers
            studentsCount: 30 + Math.floor(Math.random() * 10)
        });
    }
});

// Subjects
export const MOCK_SUBJECTS: Subject[] = [
  { id: 's1', name: 'Toán học' },
  { id: 's2', name: 'Ngữ văn' },
  { id: 's3', name: 'Khoa học tự nhiên' },
  { id: 's4', name: 'Lịch sử và Địa lí' },
  { id: 's5', name: 'Tiếng Anh' },
  { id: 's6', name: 'Giáo dục công dân' },
  { id: 's7', name: 'Giáo dục địa phương' },
  { id: 's8', name: 'Hoạt động trải nghiệm' },
  { id: 's9', name: 'Giáo dục thể chất' },
  { id: 's10', name: 'Nghệ thuật (Mĩ thuật)' },
  { id: 's11', name: 'Nghệ thuật (Âm nhạc)' },
  { id: 's12', name: 'Công nghệ' },
  { id: 's13', name: 'Tin học' },
];

// Class Sessions
export const MOCK_SESSIONS: ClassSession[] = [
  {
    id: 'cs1',
    classId: 'c6a1',
    date: new Date().toISOString().split('T')[0],
    sessionType: SchoolSession.MORNING,
    periods: [1],
    subjectId: 's1',
    teacherId: 'u3',
    lessonContent: 'Số tự nhiên và tập hợp',
    attendeesCount: 2,
    absentStudents: ['Trần Văn Minh'],
    attendanceRecords: [
      { studentId: 'u4', studentName: 'Phạm Thành Nam', status: AttendanceStatus.PRESENT },
      { studentId: 'u5', studentName: 'Lê Thùy Linh', status: AttendanceStatus.PRESENT },
      { studentId: 'u6', studentName: 'Trần Văn Minh', status: AttendanceStatus.ABSENT },
    ],
    note: 'Lớp trật tự, chú ý nghe giảng.',
    classification: 'A',
    score: 28,
    signed: true
  },
  {
    id: 'cs2',
    classId: 'c6a1',
    date: new Date().toISOString().split('T')[0],
    sessionType: SchoolSession.MORNING,
    periods: [2, 3],
    subjectId: 's2',
    teacherId: 'u2',
    lessonContent: 'Thánh Gióng (2 tiết)',
    attendeesCount: 3,
    absentStudents: [],
    attendanceRecords: [
      { studentId: 'u4', studentName: 'Phạm Thành Nam', status: AttendanceStatus.PRESENT },
      { studentId: 'u5', studentName: 'Lê Thùy Linh', status: AttendanceStatus.PRESENT },
      { studentId: 'u6', studentName: 'Trần Văn Minh', status: AttendanceStatus.PRESENT },
    ],
    note: 'Sôi nổi phát biểu.',
    classification: 'A',
    score: 30,
    signed: true
  },
   {
    id: 'cs3',
    classId: 'c9a2',
    date: new Date().toISOString().split('T')[0],
    sessionType: SchoolSession.AFTERNOON,
    periods: [1],
    subjectId: 's3',
    teacherId: 'u7',
    lessonContent: 'Tính chất hóa học của oxit',
    attendeesCount: 32,
    absentStudents: [],
    attendanceRecords: [],
    note: 'Lớp hơi ồn đầu giờ.',
    classification: 'B',
    score: 24,
    signed: true
  }
];

// Room Logs
export const MOCK_ROOM_SESSIONS: SubjectRoomSession[] = [
  {
    id: 'rs1',
    roomType: 'IT',
    date: new Date().toISOString().split('T')[0],
    sessionType: SchoolSession.MORNING,
    periods: [1, 2],
    className: '6A1',
    teacherId: 'u3',
    lessonContent: 'Làm quen với chuột máy tính',
    statusBefore: 'Bình thường',
    statusAfter: 'Máy 05 hỏng chuột',
    studentCount: 35,
    deviceCount: 35,
    note: 'Đã báo kỹ thuật thay chuột máy 05',
    signed: true
  },
  {
    id: 'rs2',
    roomType: 'ENGLISH',
    date: new Date().toISOString().split('T')[0],
    sessionType: SchoolSession.AFTERNOON,
    periods: [3],
    className: '9A2',
    teacherId: 'u2',
    lessonContent: 'Listening Skill: Unit 3',
    statusBefore: 'Tai nghe số 12 bị rè',
    statusAfter: 'Vệ sinh sạch sẽ',
    studentCount: 32,
    deviceCount: 32,
    note: 'Nhắc nhở học sinh dọn rác ngăn bàn',
    signed: true
  }
];

// Grades
export const MOCK_GRADES: Grade[] = [
  { id: 'g1', studentId: 'u4', subjectId: 's1', type: '15_MIN', score: 9.5, date: '2023-10-10' },
  { id: 'g2', studentId: 'u4', subjectId: 's1', type: '45_MIN', score: 8.0, date: '2023-10-25' },
  { id: 'g3', studentId: 'u5', subjectId: 's1', type: '15_MIN', score: 10, date: '2023-10-10' },
];

// --- DEVICES & LOANS MOCK DATA ---
export const MOCK_DEVICES: Device[] = [
    { 
        id: 'd1', code: 'MC01', name: 'Máy chiếu Sony', type: DeviceType.DURABLE, totalQuantity: 10, availableQuantity: 8, unit: 'Cái', category: 'Thiết bị chung', location: 'Kho A',
        dateRecorded: '2023-09-01', documentNumber: '123/HD', documentDate: '2023-08-25', unitPrice: 15000000, source: 'Trang cấp từ đề án'
    },
    { 
        id: 'd2', code: 'BDDL', name: 'Bản đồ Địa lý VN', type: DeviceType.DURABLE, totalQuantity: 5, availableQuantity: 5, unit: 'Tờ', category: 'Địa lý', location: 'Tủ Địa lý',
        dateRecorded: '2023-09-05', documentNumber: '124/HD', documentDate: '2023-09-01', unitPrice: 150000, source: 'Trường tự mua sắm'
    },
    { 
        id: 'd3', code: 'HC01', name: 'Axit H2SO4 loãng', type: DeviceType.CONSUMABLE, totalQuantity: 20, availableQuantity: 15, unit: 'Lọ', category: 'Hóa học', location: 'Phòng Hóa',
        dateRecorded: '2023-10-01', documentNumber: '130/HD', documentDate: '2023-09-28', unitPrice: 50000, source: 'Mua mới học kỳ 1'
    },
    { 
        id: 'd4', code: 'NAMCHAM', name: 'Nam châm chữ U', type: DeviceType.DURABLE, totalQuantity: 30, availableQuantity: 30, unit: 'Cái', category: 'Vật lý', location: 'Phòng Lý',
        dateRecorded: '2023-09-10', documentNumber: '128/HD', documentDate: '2023-09-05', unitPrice: 45000, source: 'Trường tự mua sắm'
    },
    { 
        id: 'd5', code: 'PC01', name: 'Máy tính học sinh FPT', type: DeviceType.DURABLE, totalQuantity: 20, availableQuantity: 20, unit: 'Bộ', category: 'Tin học', location: 'Phòng Tin học',
        dateRecorded: '2023-08-15', documentNumber: '110/HD', documentDate: '2023-08-10', unitPrice: 8500000, source: 'Dự án phòng máy'
    },
    { 
        id: 'd6', code: 'HEADPHONE', name: 'Tai nghe chụp tai', type: DeviceType.DURABLE, totalQuantity: 40, availableQuantity: 38, unit: 'Cái', category: 'Tiếng Anh', location: 'Phòng Tiếng Anh',
        dateRecorded: '2023-08-15', documentNumber: '111/HD', documentDate: '2023-08-10', unitPrice: 150000, source: 'Dự án phòng máy'
    },
];

export const MOCK_DEVICE_LOANS: DeviceLoan[] = [
    { id: 'l1', teacherId: 'u2', deviceId: 'd1', deviceName: 'Máy chiếu Sony', quantity: 1, borrowDate: '2023-10-25', returnDate: '2023-10-25', status: LoanStatus.RETURNED, actualReturnDate: '2023-10-25', notes: 'Hoạt động tốt' },
    { id: 'l2', teacherId: 'u3', deviceId: 'd3', deviceName: 'Axit H2SO4 loãng', quantity: 2, borrowDate: new Date().toISOString().split('T')[0], returnDate: new Date().toISOString().split('T')[0], status: LoanStatus.BORROWED, notes: 'Thí nghiệm bài 5' }
];
