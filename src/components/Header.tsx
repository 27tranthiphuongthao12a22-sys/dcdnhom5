import React, { useState } from 'react';
import { UserProfile, NavigationTab } from '../types';
import { 
  Briefcase, 
  Building2, 
  DollarSign, 
  Star, 
  FileText, 
  ShieldCheck, 
  Bell, 
  Bookmark, 
  Sparkles,
  Menu,
  X,
  User,
  GraduationCap
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  savedCount: number;
  alertsCount: number;
  onOpenSaved: () => void;
  onOpenAlerts: () => void;
  userProfile: UserProfile | null;
  onOpenLogin: () => void;
  onSelectNoExpFilter: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  savedCount,
  alertsCount,
  onOpenSaved,
  onOpenAlerts,
  userProfile,
  onOpenLogin,
  onSelectNoExpFilter
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'jobs', label: 'Nối cơ hội - Đổi cuộc đời', icon: Briefcase },
    { id: 'industries', label: 'Danh sách khối ngành', icon: Building2 },
    { id: 'salary', label: 'So sánh mức lương', icon: DollarSign },
    { id: 'reviews', label: 'Đánh giá', icon: Star },
    { id: 'cv-guide', label: 'Gợi ý', icon: FileText },
    { id: 'anti-scam', label: 'Phòng tránh', icon: ShieldCheck },
    { id: 'employer-post', label: 'Đăng tin tuyển dụng trực tiếp', icon: Building2 }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      {/* Top Banner with Brand Palette (FFD273, FEE686, FEC5E6, DEB5D7, BFAEE3) */}
      <div 
        className="text-slate-800 text-xs py-1.5 px-4"
        style={{
          background: 'linear-gradient(90deg, #BFAEE3 0%, #FEC5E6 35%, #FFD273 70%, #FEE686 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span 
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] tracking-wide uppercase shadow-2xs"
              style={{ backgroundColor: '#FFD273', color: '#3d2b02' }}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Trực tiếp Doanh nghiệp
            </span>
            <span className="text-slate-800 text-[11px] font-medium">
              Không qua trung gian • Cam kết 0 đồng chi phí • Bảo vệ sinh viên mới ra trường & mọi lứa tuổi
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-slate-800">
            <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FEE686', color: '#4a3b05' }}>
              ★ Tuyển dụng minh bạch
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* Logo & Brand Name */}
        <div 
          onClick={() => onTabChange('jobs')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div 
            className="w-10 h-10 rounded-[14px] flex items-center justify-center text-slate-800 shadow-md group-hover:scale-105 transition-all"
            style={{
              background: 'linear-gradient(135deg, #FFD273 0%, #FEC5E6 50%, #BFAEE3 100%)',
              boxShadow: '0 4px 12px rgba(191, 174, 227, 0.45)'
            }}
          >
            <GraduationCap className="w-5 h-5 text-slate-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span 
                className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900"
              >
                Nối cơ hội- đổi cuộc đời
              </span>
              <span 
                className="hidden md:inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255, 210, 115, 0.7) 0%, rgba(254, 197, 230, 0.6) 45%, rgba(191, 174, 227, 0.7) 100%)', 
                  color: '#1E293B', 
                  border: '1px solid #DEB5D7' 
                }}
              >
                Tuyển trực tiếp
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Cầu nối việc làm mọi lứa tuổi & sinh viên mới ra trường • An toàn, không qua trung gian
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`px-2.5 2xl:px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border whitespace-nowrap ${
                  isActive
                    ? 'text-slate-900 ring-2 ring-[#BFAEE3]/70 font-extrabold shadow-sm scale-[1.02]'
                    : 'text-slate-800 hover:opacity-95 hover:shadow-xs hover:scale-[1.01]'
                }`}
                style={
                  isActive
                    ? {
                        background: 'linear-gradient(135deg, #FFD273 0%, #FEC5E6 45%, #BFAEE3 100%)',
                        borderColor: '#DEB5D7',
                        boxShadow: '0 4px 12px rgba(191, 174, 227, 0.35)'
                      }
                    : {
                        background: 'linear-gradient(135deg, rgba(255, 210, 115, 0.45) 0%, rgba(254, 197, 230, 0.35) 45%, rgba(191, 174, 227, 0.45) 100%)',
                        borderColor: 'rgba(222, 181, 215, 0.85)'
                      }
                }
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-slate-950 stroke-[2.5]' : 'text-[#8d427d]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: User Profile / Login, Dấu ba gạch (Đã lưu & Báo việc), Mobile menu */}
        <div className="flex items-center gap-2">
          {/* User Profile / Login Button */}
          <button
            id="btn-header-user-profile"
            onClick={onOpenLogin}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs"
            style={
              userProfile?.isRegistered
                ? {
                    backgroundColor: 'rgba(255, 210, 115, 0.25)',
                    borderColor: '#FFD273',
                    color: '#3d2b02'
                  }
                : {
                    backgroundColor: '#FEE686',
                    borderColor: '#FFD273',
                    color: '#1E293B'
                  }
            }
            title={userProfile?.isRegistered ? 'Xem hoặc cập nhật hồ sơ' : 'Đăng nhập thông tin cá nhân'}
          >
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center text-slate-900 text-[11px] font-extrabold"
              style={{ backgroundColor: userProfile?.isRegistered ? '#FFD273' : '#FEC5E6' }}
            >
              {userProfile?.isRegistered ? userProfile.fullName.charAt(0) : <User className="w-3.5 h-3.5 text-slate-800" />}
            </div>
            <div className="text-left hidden sm:block max-w-[130px] truncate">
              <span className="block truncate leading-tight">
                {userProfile?.isRegistered ? userProfile.fullName : 'Đăng nhập'}
              </span>
              <span className="text-[10px] font-normal text-slate-500 block truncate">
                {userProfile?.isRegistered ? 'Hồ sơ đã lưu' : 'Nhập thông tin'}
              </span>
            </div>
          </button>

          {/* Dấu ba gạch: Mục 'Đã lưu và Báo việc' (Requirement: Sửa mục "đã lưu và báo việc" thành dấu ba gạch) */}
          <button
            id="btn-header-saved-and-alerts"
            onClick={onOpenSaved}
            className="relative flex items-center justify-center w-10 h-10 rounded-xl border transition-all cursor-pointer shadow-2xs hover:bg-slate-50 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: (savedCount > 0 || alertsCount > 0) ? 'rgba(222, 181, 215, 0.35)' : '#ffffff',
              borderColor: (savedCount > 0 || alertsCount > 0) ? '#DEB5D7' : '#BFAEE3',
              color: '#1E293B'
            }}
            title="Việc làm đã lưu & Chuông báo việc làm (Dấu ba gạch)"
            aria-label="Đã lưu và báo việc"
          >
            {/* Dấu 3 gạch (Three-bar hamburger icon) */}
            <div className="w-5 h-4 flex flex-col justify-between items-center pointer-events-none">
              <span className="w-full h-[2.5px] rounded-full bg-slate-800 transition-all" />
              <span className="w-full h-[2.5px] rounded-full bg-slate-800 transition-all" />
              <span className="w-full h-[2.5px] rounded-full bg-slate-800 transition-all" />
            </div>

            {(savedCount > 0 || alertsCount > 0) && (
              <span 
                className="absolute -top-1.5 -right-1.5 text-slate-900 text-[10px] font-black px-1.5 py-0.2 rounded-full shadow-xs flex items-center justify-center min-w-[18px] h-[18px] border border-white"
                style={{ backgroundColor: '#FFD273' }}
              >
                {savedCount + alertsCount}
              </span>
            )}
          </button>

          {/* Mobile navigation menu toggle for category drawer */}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
            title="Mở menu danh mục"
            aria-label="Menu danh mục"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <div className="text-xs font-bold px-2 py-1 bg-slate-100 rounded-lg text-slate-700">Menu</div>}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1.5 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-3 transition-all border ${
                  isActive
                    ? 'text-slate-900 ring-2 ring-[#BFAEE3]/70 font-extrabold shadow-sm'
                    : 'text-slate-800 hover:opacity-95'
                }`}
                style={
                  isActive
                    ? {
                        background: 'linear-gradient(135deg, #FFD273 0%, #FEC5E6 45%, #BFAEE3 100%)',
                        borderColor: '#DEB5D7',
                        boxShadow: '0 4px 12px rgba(191, 174, 227, 0.35)'
                      }
                    : {
                        background: 'linear-gradient(135deg, rgba(255, 210, 115, 0.45) 0%, rgba(254, 197, 230, 0.35) 45%, rgba(191, 174, 227, 0.45) 100%)',
                        borderColor: 'rgba(222, 181, 215, 0.85)'
                      }
                }
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-slate-950 stroke-[2.5]' : 'text-[#8d427d]'}`} />
                {item.label}
              </button>
            );
          })}

          {/* Quick link in mobile drawer to Open Saved & Alerts */}
          <button
            onClick={() => {
              onOpenSaved();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between border mt-2 transition-colors cursor-pointer"
            style={{
              backgroundColor: 'rgba(255, 210, 115, 0.25)',
              borderColor: '#FFD273',
              color: '#3d2b02'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-3.5 flex flex-col justify-between items-center">
                <span className="w-full h-0.5 rounded-full bg-slate-800" />
                <span className="w-full h-0.5 rounded-full bg-slate-800" />
                <span className="w-full h-0.5 rounded-full bg-slate-800" />
              </div>
              <span>Đã lưu & Báo việc</span>
            </div>
            {(savedCount > 0 || alertsCount > 0) && (
              <span 
                className="text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full"
                style={{ backgroundColor: '#FFD273' }}
              >
                {savedCount + alertsCount} mục
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
