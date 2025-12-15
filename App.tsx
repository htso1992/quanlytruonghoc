
import React, { useState, useEffect, useCallback } from 'react';
import { MemoryRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ClassLog from './components/ClassLog';
import SubjectRoomLog from './components/SubjectRoomLog';
import UserManagement from './components/UserManagement';
import DeviceManager from './components/DeviceManager'; // NEW IMPORT
import { User, ClassSession, Role, SubjectRoomSession, Device, DeviceLoan } from './types';
import { MOCK_SESSIONS, MOCK_ROOM_SESSIONS, MOCK_USERS, MOCK_DEVICES, MOCK_DEVICE_LOANS } from './constants';
import { LogOut, LayoutDashboard, BookOpen, Users as UsersIcon, Settings, Menu, X, Monitor, Box } from 'lucide-react';

const STORAGE_KEY_SESSIONS = 'edueco_sessions_data_v1';
const STORAGE_KEY_ROOMS = 'edueco_room_logs_v1';
const STORAGE_KEY_USERS = 'edueco_users_data_v1';
const STORAGE_KEY_DEVICES = 'edueco_devices_data_v1'; // NEW KEY
const STORAGE_KEY_LOANS = 'edueco_device_loans_v1'; // NEW KEY

const SidebarLink = ({ to, icon: Icon, label, onClick }: any) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
          : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // -- DATA STATE --
  const [sessions, setSessions] = useState<ClassSession[]>(MOCK_SESSIONS);
  const [roomLogs, setRoomLogs] = useState<SubjectRoomSession[]>(MOCK_ROOM_SESSIONS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [devices, setDevices] = useState<Device[]>(MOCK_DEVICES); // NEW STATE
  const [deviceLoans, setDeviceLoans] = useState<DeviceLoan[]>(MOCK_DEVICE_LOANS); // NEW STATE
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // -- LOAD DATA FUNCTION (For Init & Sync) --
  const loadDataFromStorage = useCallback(() => {
    try {
        const savedSessions = localStorage.getItem(STORAGE_KEY_SESSIONS);
        if (savedSessions) setSessions(JSON.parse(savedSessions));

        const savedRooms = localStorage.getItem(STORAGE_KEY_ROOMS);
        if (savedRooms) setRoomLogs(JSON.parse(savedRooms));

        const savedUsers = localStorage.getItem(STORAGE_KEY_USERS);
        if (savedUsers) setUsers(JSON.parse(savedUsers));

        const savedDevices = localStorage.getItem(STORAGE_KEY_DEVICES);
        if (savedDevices) setDevices(JSON.parse(savedDevices));

        const savedLoans = localStorage.getItem(STORAGE_KEY_LOANS);
        if (savedLoans) setDeviceLoans(JSON.parse(savedLoans));
    } catch (error) {
        console.error("Error syncing data", error);
    }
  }, []);

  // 1. Initial Load
  useEffect(() => {
    loadDataFromStorage();
  }, [loadDataFromStorage]);

  // 2. Cross-tab Synchronization (Storage Event)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      // If any key changes, reload that specific part
      if (e.key === STORAGE_KEY_SESSIONS) loadDataFromStorage();
      if (e.key === STORAGE_KEY_ROOMS) loadDataFromStorage();
      if (e.key === STORAGE_KEY_USERS) loadDataFromStorage();
      if (e.key === STORAGE_KEY_DEVICES) loadDataFromStorage();
      if (e.key === STORAGE_KEY_LOANS) loadDataFromStorage();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadDataFromStorage]);

  // 3. Focus Synchronization (Ensure data is fresh when user switches back to this tab)
  useEffect(() => {
    const handleFocus = () => {
        loadDataFromStorage();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [loadDataFromStorage]);

  // -- SAVE DATA EFFECTS --
  // We strictly separate Save and Load to avoid loops. 
  // These effects only run when the state changes within THIS tab.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(roomLogs));
  }, [roomLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DEVICES, JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOANS, JSON.stringify(deviceLoans));
  }, [deviceLoans]);


  const handleLogin = (loginUser: User) => {
    // Always fetch fresh users list before login check to ensure new accounts work
    const currentUsersStr = localStorage.getItem(STORAGE_KEY_USERS);
    const currentUsers = currentUsersStr ? JSON.parse(currentUsersStr) : users;
    
    const foundUser = currentUsers.find((u: User) => u.username === loginUser.username);
    if (foundUser) {
        setCurrentUser(foundUser);
    } else {
        alert("Tài khoản không tồn tại hoặc đã bị xóa.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // --- CRUD Operations ---
  const handleAddSession = (newSession: ClassSession) => {
    setSessions(prev => [newSession, ...prev]);
  };
  const handleUpdateSession = (updatedSession: ClassSession) => {
    setSessions(prev => prev.map(s => s.id === updatedSession.id ? updatedSession : s));
  };
  const handleDeleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  const handleAddRoomSession = (newSession: SubjectRoomSession) => {
    setRoomLogs(prev => [newSession, ...prev]);
  };
  const handleUpdateRoomSession = (updatedSession: SubjectRoomSession) => {
    setRoomLogs(prev => prev.map(s => s.id === updatedSession.id ? updatedSession : s));
  };
  const handleDeleteRoomSession = (id: string) => {
    setRoomLogs(prev => prev.filter(s => s.id !== id));
  };

  const handleUpdateUsers = (updatedUsers: User[]) => {
      setUsers(updatedUsers);
  };

  // NEW CRUD FOR DEVICES
  const handleUpdateDevices = (updatedDevices: Device[]) => {
      setDevices(updatedDevices);
  };
  const handleUpdateLoans = (updatedLoans: DeviceLoan[]) => {
      setDeviceLoans(updatedLoans);
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const showDeviceMenu = currentUser.role === Role.ADMIN || currentUser.role === Role.TEACHER || currentUser.role === Role.DEVICE_MANAGER;

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {/* Mobile Backdrop */}
        {isMobileMenuOpen && (
           <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden print:hidden" onClick={toggleMenu} />
        )}

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static print:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full flex flex-col p-4">
            <div className="flex items-center gap-3 px-4 py-6 mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                E
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-800">EduEco</h1>
                <p className="text-xs text-gray-500">Quản lý giáo dục 4.0</p>
              </div>
            </div>

            <nav className="flex-1 space-y-2">
              <SidebarLink to="/" icon={LayoutDashboard} label="Tổng quan" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarLink to="/class-log" icon={BookOpen} label="Sổ đầu bài" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarLink 
                to="/room-log" 
                icon={Monitor} 
                label={currentUser.role === Role.TEACHER ? "Sổ nhật kí hoạt động" : "Sổ phòng bộ môn"} 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
              
              {showDeviceMenu && (
                  <SidebarLink 
                    to="/devices" 
                    icon={Box} 
                    label={currentUser.role === Role.TEACHER ? "Sổ sử dụng thiết bị" : "Thiết bị dạy học"}
                    onClick={() => setIsMobileMenuOpen(false)} 
                  />
              )}

              {currentUser.role === Role.ADMIN && (
                <SidebarLink to="/users" icon={UsersIcon} label="Quản lý người dùng" onClick={() => setIsMobileMenuOpen(false)} />
              )}
              
              <div className="pt-4 mt-4 border-t border-gray-100">
                 <SidebarLink to="/settings" icon={Settings} label="Cài đặt" onClick={() => setIsMobileMenuOpen(false)} />
              </div>
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100">
               <div className="flex items-center gap-3 px-4 mb-4">
                  <img src={currentUser.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full bg-gray-200 object-cover" />
                  <div className="overflow-hidden">
                     <p className="text-sm font-semibold text-gray-800 truncate">{currentUser.fullName}</p>
                     <p className="text-xs text-gray-500 truncate capitalize">
                         {currentUser.role === Role.DEVICE_MANAGER ? 'QT Thiết Bị' : currentUser.role.toLowerCase()}
                     </p>
                  </div>
               </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
              >
                <LogOut className="w-5 h-5" /> Đăng xuất
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden print:w-full print:h-auto print:overflow-visible">
          {/* Mobile Header */}
          <header className="bg-white border-b border-gray-200 lg:hidden flex items-center justify-between p-4 print:hidden">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">E</div>
                <span className="font-bold text-gray-800">EduEco</span>
             </div>
             <button onClick={toggleMenu} className="p-2 text-gray-600">
               {isMobileMenuOpen ? <X /> : <Menu />}
             </button>
          </header>

          <div className="flex-1 overflow-auto p-4 md:p-8 print:p-0 print:overflow-visible">
            <Routes>
              <Route path="/" element={<Dashboard user={currentUser} sessions={sessions} users={users} grades={[]} />} />
              <Route path="/class-log" element={
                <ClassLog 
                  sessions={sessions} 
                  currentUser={currentUser} 
                  onAddSession={handleAddSession}
                  onUpdateSession={handleUpdateSession}
                  onDeleteSession={handleDeleteSession}
                />
              } />
              <Route path="/room-log" element={
                <SubjectRoomLog 
                  roomSessions={roomLogs} 
                  currentUser={currentUser} 
                  devices={devices} // Pass devices here
                  onAddRoomSession={handleAddRoomSession}
                  onUpdateRoomSession={handleUpdateRoomSession}
                  onDeleteRoomSession={handleDeleteRoomSession}
                />
              } />
              
              {/* NEW DEVICE ROUTE */}
              <Route path="/devices" element={
                 showDeviceMenu
                 ? <DeviceManager 
                        currentUser={currentUser} 
                        devices={devices} 
                        loans={deviceLoans} 
                        onUpdateDevices={handleUpdateDevices} 
                        onUpdateLoans={handleUpdateLoans} 
                   />
                 : <Navigate to="/" />
              } />

              <Route path="/users" element={
                 currentUser.role === Role.ADMIN 
                 ? <UserManagement users={users} onUpdateUsers={handleUpdateUsers} />
                 : <Navigate to="/" />
              } />
              <Route path="/settings" element={<div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 text-center text-gray-500">Chức năng cài đặt tài khoản</div>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
