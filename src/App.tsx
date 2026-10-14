import React, { useState } from 'react';
import { Header } from './components/Header';
import { JobList } from './components/JobList';
import { IndustryDirectory } from './components/IndustryDirectory';
import { IndustryCompaniesView } from './components/IndustryCompaniesView';
import { SalaryComparison } from './components/SalaryComparison';
import { RecruitmentReviews } from './components/RecruitmentReviews';
import { CVGuideAndBuilder } from './components/CVGuideAndBuilder';
import { AntiScamGuide } from './components/AntiScamGuide';
import { JobDetailModal } from './components/JobDetailModal';
import { ApplyModal } from './components/ApplyModal';
import { SavedAndAlertsModal } from './components/SavedAndAlertsModal';
import { LoginProfileModal } from './components/LoginProfileModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { EmployerPostJob } from './components/EmployerPostJob';

import { 
  MOCK_INDUSTRIES, 
  MOCK_COMPANIES, 
  MOCK_JOBS, 
  MOCK_SALARY_BENCHMARKS, 
  MOCK_RECRUITMENT_REVIEWS, 
  MOCK_INITIAL_ALERTS 
} from './data/mockData';
import { Job, RecruitmentReview, JobAlert, ApplicationRecord, NavigationTab, UserProfile } from './types';
import { 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Heart, 
  Mail, 
  Phone, 
  Lock, 
  CheckCircle2,
  FileText,
  UserCheck,
  ChevronRight
} from 'lucide-react';

export function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavigationTab>('jobs');
  const [selectedIndustryCode, setSelectedIndustryCode] = useState<string>('CNKT');

  // User Profile State (Requirement: "Khi vào app có mục đăng nhập thông tin cá nhân gồm họ và tên, ngày tháng năm sinh, email, công việc hiện tại, giới tính")
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('user_profile_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      fullName: 'Nguyễn Thị Mai Lan',
      birthDate: '2003-08-20',
      email: 'mailan.nguyen@example.com',
      currentOccupation: 'Sinh viên mới tốt nghiệp - Chưa có kinh nghiệm',
      gender: 'Nữ',
      phoneNumber: '0912 345 678',
      portfolioUrl: 'https://sites.google.com/view/mailan-portfolio',
      isRegistered: true
    };
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Core Data State
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [companies] = useState(MOCK_COMPANIES);
  const [industries] = useState(MOCK_INDUSTRIES);
  const [salaryBenchmarks] = useState(MOCK_SALARY_BENCHMARKS);
  const [reviews, setReviews] = useState<RecruitmentReview[]>(MOCK_RECRUITMENT_REVIEWS);
  const [alerts, setAlerts] = useState<JobAlert[]>(MOCK_INITIAL_ALERTS);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1', 'job-3']);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);

  // Modals state
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [savedModalInitialTab, setSavedModalInitialTab] = useState<'saved' | 'alerts'>('saved');

  // Quick filter trigger for "Chưa có kinh nghiệm"
  const [jobListExperienceFilter, setJobListExperienceFilter] = useState<'all' | 'no-experience' | 'has-experience'>('all');

  // Handlers
  const handleAddNewJob = (newJob: Job) => {
    setJobs(prev => [newJob, ...prev]);
    setActiveTab('jobs');
  };

  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    try {
      localStorage.setItem('user_profile_data', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handleSelectJobForDetail = (job: Job) => {
    setSelectedJob(job);
    setIsDetailOpen(true);
  };

  const handleQuickApply = (job: Job) => {
    setApplyJob(job);
    setIsApplyOpen(true);
  };

  const handleSubmitApplication = (app: ApplicationRecord) => {
    setApplications(prev => [app, ...prev]);
  };

  const handleOpenSavedModal = (tab: 'saved' | 'alerts') => {
    setSavedModalInitialTab(tab);
    setIsSavedModalOpen(true);
  };

  const handleSelectIndustryFromDirectory = (industryCode: string) => {
    setSelectedIndustryCode(industryCode);
    setActiveTab('industry-companies');
  };

  const handleAddReview = (newReview: RecruitmentReview) => {
    setReviews(prev => [newReview, ...prev]);
  };

  const handleAddAlert = (newAlert: JobAlert) => {
    setAlerts(prev => [newAlert, ...prev]);
  };

  const handleRemoveAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const handleTriggerNoExpFilter = () => {
    setActiveTab('jobs');
    setJobListExperienceFilter('no-experience');
  };

  // Selected industry object for industry-companies view
  const currentIndustry = industries.find(i => i.code === selectedIndustryCode) || industries[0];
  const savedJobsList = jobs.filter(j => savedJobIds.includes(j.id));
  const selectedJobCompany = selectedJob ? companies.find(c => c.id === selectedJob.companyId) : undefined;

  return (
    <div className="min-h-screen bg-slate-50/80 flex flex-col text-slate-800 font-sans antialiased">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        savedCount={savedJobIds.length}
        alertsCount={alerts.length}
        onOpenSaved={() => handleOpenSavedModal('saved')}
        onOpenAlerts={() => handleOpenSavedModal('alerts')}
        userProfile={userProfile}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onSelectNoExpFilter={handleTriggerNoExpFilter}
      />

      {/* Profile quick banner if user has profile */}
      {userProfile?.isRegistered && (
        <div 
          className="border-b py-2 px-4 text-xs"
          style={{
            backgroundColor: 'rgba(255, 210, 115, 0.25)',
            borderColor: 'rgba(255, 210, 115, 0.6)'
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFD273' }} />
              <span>
                Xin chào <strong>{userProfile.fullName}</strong> ({userProfile.currentOccupation}) • Giới tính: {userProfile.gender} • Ngày sinh: {userProfile.birthDate}
              </span>
            </div>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="font-bold underline hover:opacity-80 transition-opacity cursor-pointer text-xs"
              style={{ color: '#8d427d' }}
            >
              Cập nhật thông tin cá nhân
            </button>
          </div>
        </div>
      )}

      {/* Main Container - Extra bottom padding on mobile for MobileBottomNav */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-24 md:pb-8">
        {/* TAB 1: VIỆC LÀM (Job List with Glassmorphic Search Bar, Experience Tabs, Sub-industries, Location, Salary) */}
        {activeTab === 'jobs' && (
          <JobList
            jobs={jobs}
            industries={industries}
            savedJobIds={savedJobIds}
            onToggleSave={handleToggleSaveJob}
            onSelectJob={handleSelectJobForDetail}
            onQuickApply={handleQuickApply}
            onNavigateToIndustries={() => setActiveTab('industries')}
            initialExperienceFilter={jobListExperienceFilter}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
            onNavigateToEmployerPost={() => setActiveTab('employer-post')}
          />
        )}

        {/* TAB 2: KHỐI NGÀNH (Industry Directory: CNKT, DVVT, KTTM, MKT, GDĐT, YTHC, NHDD) */}
        {activeTab === 'industries' && (
          <IndustryDirectory
            industries={industries}
            onSelectIndustry={handleSelectIndustryFromDirectory}
            onBrowseJobsByIndustry={(indCode) => {
              setSelectedIndustryCode(indCode);
              setActiveTab('industry-companies');
            }}
          />
        )}

        {/* TAB 2.1: DOANH NGHIỆP THUỘC KHỐI NGÀNH (Navigated when clicking on an industry) */}
        {activeTab === 'industry-companies' && (
          <IndustryCompaniesView
            industry={currentIndustry}
            companies={companies}
            jobs={jobs}
            onBack={() => setActiveTab('industries')}
            onSelectJob={handleSelectJobForDetail}
            onQuickApply={handleQuickApply}
          />
        )}

        {/* TAB 3: SO SÁNH MỨC LƯƠNG (Salary Benchmark & Deal Salary Tips) */}
        {activeTab === 'salary' && (
          <SalaryComparison
            benchmarks={salaryBenchmarks}
            onSelectIndustryJobs={(indCode) => {
              setSelectedIndustryCode(indCode);
              setActiveTab('industry-companies');
            }}
          />
        )}

        {/* TAB 4: ĐÁNH GIÁ TUYỂN DỤNG (Recruitment Reviews from real candidates) */}
        {activeTab === 'reviews' && (
          <RecruitmentReviews
            reviews={reviews}
            onAddReview={handleAddReview}
          />
        )}

        {/* TAB 5: GỢI Ý VIẾT CV & GOOGLE SITES (CV Guidelines, Portfolio Site Guide, AI Assistant) */}
        {activeTab === 'cv-guide' && (
          <CVGuideAndBuilder />
        )}

        {/* TAB 6: PHÒNG TRÁNH LỪA ĐẢO & TRUNG GIAN (Anti-Scam Guide) */}
        {activeTab === 'anti-scam' && (
          <AntiScamGuide />
        )}

        {/* TAB 7: ĐĂNG TUYỂN DÀNH CHO DOANH NGHIỆP (Requirement: Thêm mục cho doanh nghiệp đăng tuyển thông tin) */}
        {activeTab === 'employer-post' && (
          <EmployerPostJob
            industries={industries}
            onAddNewJob={handleAddNewJob}
            onNavigateToJobs={() => setActiveTab('jobs')}
          />
        )}
      </main>

      {/* Application Modals */}
      <LoginProfileModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        userProfile={userProfile}
        onSaveProfile={handleSaveProfile}
      />

      <JobDetailModal
        job={selectedJob}
        company={selectedJobCompany}
        isSaved={selectedJob ? savedJobIds.includes(selectedJob.id) : false}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onToggleSave={handleToggleSaveJob}
        onOpenApply={handleQuickApply}
      />

      <ApplyModal
        job={applyJob}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onSubmitApplication={handleSubmitApplication}
        userProfile={userProfile}
        onOpenLoginProfile={() => setIsLoginModalOpen(true)}
      />

      <SavedAndAlertsModal
        isOpen={isSavedModalOpen}
        initialTab={savedModalInitialTab}
        onClose={() => setIsSavedModalOpen(false)}
        savedJobs={savedJobsList}
        onRemoveSavedJob={handleToggleSaveJob}
        onSelectJob={handleSelectJobForDetail}
        onQuickApply={handleQuickApply}
        alerts={alerts}
        onAddAlert={handleAddAlert}
        onRemoveAlert={handleRemoveAlert}
        industries={industries}
      />

      {/* Footer styled with palette (FFD273, FEE686, FEC5E6, DEB5D7, BFAEE3) */}
      <footer 
        className="text-slate-300 text-xs border-t mt-12 pt-10 pb-28 md:pb-10"
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #28374D 50%, #172335 100%)',
          borderColor: 'rgba(222, 181, 215, 0.4)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-900 font-extrabold text-sm shadow-md"
                  style={{
                    background: 'linear-gradient(135deg, #FFD273 0%, #FEC5E6 50%, #BFAEE3 100%)'
                  }}
                >
                  NC
                </div>
                <span className="text-white font-extrabold text-base tracking-tight">
                  Nối cơ hội- đổi cuộc đời
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs max-w-md">
                Nền tảng việc làm và phát triển năng lực nghề nghiệp dành cho <strong>mọi lứa tuổi</strong>, 
                đặc biệt là <strong>sinh viên năm cuối, mới tốt nghiệp, học sinh & người chưa có kinh nghiệm</strong>. 
                Rút ngắn thời gian tìm việc, kết nối trực tiếp 100% với doanh nghiệp, bảo vệ thông tin cá nhân và đẩy lùi lừa đảo môi giới.
              </p>
              <div className="flex items-center gap-2 font-bold text-xs" style={{ color: '#FFD273' }}>
                <ShieldCheck className="w-4 h-4 text-[#FFD273]" />
                <span>Cam kết 100% doanh nghiệp xác thực • Tuyệt đối không thu phí ứng viên</span>
              </div>
            </div>

            <div>
              <h4 
                className="font-bold text-xs uppercase tracking-wider mb-3"
                style={{ color: '#FEE686' }}
              >
                Khối ngành trọng điểm
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• CNKT - Công nghệ & Kỹ thuật số</li>
                <li>• DVVT - Dịch vụ, Vận tải & Chuỗi cung ứng</li>
                <li>• KTTM - Kinh tế, Thương mại & Bán lẻ</li>
                <li>• MKT - Marketing, Sáng tạo & Truyền thông</li>
                <li>• GDĐT - Giáo dục, Khóa học & Đào tạo</li>
                <li>• YTHC - Y tế, Chăm sóc sức khỏe & Hành chính</li>
              </ul>
            </div>

            <div>
              <h4 
                className="font-bold text-xs uppercase tracking-wider mb-3"
                style={{ color: '#FEC5E6' }}
              >
                Hỗ trợ & Bảo vệ
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• Hướng dẫn làm Portfolio Google Sites</li>
                <li>• Bảng so sánh mức lương thị trường chuẩn</li>
                <li>• Đánh giá phỏng vấn thực tế từ cộng đồng</li>
                <li>• Cẩm nang nhận biết & phòng chống lừa đảo</li>
                <li>• Tổng đài bảo vệ người tìm việc: 156 / 113</li>
              </ul>
            </div>
          </div>

          <div 
            className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400"
            style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <span>
              © 2026 Nối cơ hội- đổi cuộc đời. Dự án kết nối việc làm minh bạch, không qua trung gian.
            </span>
            <div className="flex items-center gap-4 font-semibold text-slate-200">
              <span style={{ color: '#FFD273' }}>✓ Không qua trung gian</span>
              <span style={{ color: '#BFAEE3' }}>✓ Bảo mật thông tin</span>
              <span style={{ color: '#FEE686' }}>✓ 0đ phí ứng tuyển</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (Fixed for phones) */}
      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        userProfile={userProfile}
        onOpenProfile={() => setIsLoginModalOpen(true)}
        savedJobsCount={savedJobIds.length}
        onOpenSavedModal={() => handleOpenSavedModal('saved')}
      />
    </div>
  );
}

export default App;
