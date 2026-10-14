import React, { useState, useMemo } from 'react';
import { Job, Industry } from '../types';
import { JobCard } from './JobCard';
import { GlassmorphicSearchBar } from './GlassmorphicSearchBar';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap,
  Users,
  Search,
  ArrowRight,
  Layers,
  HeartHandshake
} from 'lucide-react';

interface JobListProps {
  jobs: Job[];
  industries: Industry[];
  savedJobIds: string[];
  onToggleSave: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  onQuickApply: (job: Job) => void;
  onNavigateToIndustries: () => void;
  onNavigateToEmployerPost?: () => void;
  initialExperienceFilter?: 'all' | 'no-experience' | 'has-experience';
  onOpenLoginModal?: () => void;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  industries,
  savedJobIds,
  onToggleSave,
  onSelectJob,
  onQuickApply,
  onNavigateToIndustries,
  onNavigateToEmployerPost,
  initialExperienceFilter = 'all',
  onOpenLoginModal
}) => {
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceTab, setExperienceTab] = useState<'all' | 'no-experience' | 'has-experience'>(initialExperienceFilter);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedSubIndustry, setSelectedSubIndustry] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedSalaryBand, setSelectedSalaryBand] = useState<string>('all');
  const [selectedJobType, setSelectedJobType] = useState<string>('all');
  const [isSubIndustriesExpanded, setIsSubIndustriesExpanded] = useState<boolean>(false);

  // Filter computation
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Dedicated Experience Filter (Mục riêng cho công việc có hoặc ko có kinh nghiệm)
      if (experienceTab === 'no-experience') {
        if (job.experienceRequired !== 'no-experience') return false;
      } else if (experienceTab === 'has-experience') {
        if (job.experienceRequired === 'no-experience') return false;
      }

      // 2. Keyword Search (title, company, tags, description)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.companyName.toLowerCase().includes(query);
        const matchesTags = job.tags.some(t => t.toLowerCase().includes(query));
        const matchesIndustry = job.industryName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesTags && !matchesIndustry) {
          return false;
        }
      }

      // 3. Main Industry (CNKT, DVVT, KTTM...)
      if (selectedIndustry !== 'all' && job.industryCode !== selectedIndustry) {
        return false;
      }

      // 4. Sub-Industry Filter (Danh sách các ngành con)
      if (selectedSubIndustry !== 'all') {
        const subLower = selectedSubIndustry.toLowerCase();
        const inTags = job.tags.some(t => t.toLowerCase().includes(subLower));
        const inTitle = job.title.toLowerCase().includes(subLower);
        const inDesc = job.description.some(d => d.toLowerCase().includes(subLower));
        if (!inTags && !inTitle && !inDesc) {
          return false;
        }
      }

      // 5. Location / City
      if (selectedCity !== 'all') {
        if (selectedCity === 'Toàn quốc') {
          // Keep all
        } else if (!job.city.includes(selectedCity) && job.city !== 'Toàn quốc') {
          return false;
        }
      }

      // 6. Salary Band Filter
      if (selectedSalaryBand !== 'all') {
        if (selectedSalaryBand === 'under-7' && job.salaryMax > 7) return false;
        if (selectedSalaryBand === '7-10' && (job.salaryMin > 10 || job.salaryMax < 7)) return false;
        if (selectedSalaryBand === '10-15' && (job.salaryMin > 15 || job.salaryMax < 10)) return false;
        if (selectedSalaryBand === 'above-15' && job.salaryMax < 15) return false;
      }

      // 7. Job Type (full-time, part-time, internship, long-term)
      if (selectedJobType !== 'all' && job.jobType !== selectedJobType) {
        return false;
      }

      return true;
    });
  }, [jobs, experienceTab, searchTerm, selectedIndustry, selectedSubIndustry, selectedCity, selectedSalaryBand, selectedJobType]);

  const resetFilters = () => {
    setSearchTerm('');
    setExperienceTab('all');
    setSelectedIndustry('all');
    setSelectedSubIndustry('all');
    setSelectedCity('all');
    setSelectedSalaryBand('all');
    setSelectedJobType('all');
  };

  const noExpJobsCount = jobs.filter(j => j.experienceRequired === 'no-experience').length;
  const hasExpJobsCount = jobs.filter(j => j.experienceRequired !== 'no-experience').length;

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner with Exact Brand Colors */}
      <div 
        className="rounded-[20px] sm:rounded-[24px] p-4 sm:p-8 text-white relative overflow-hidden shadow-lg border border-slate-700/40"
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #283548 55%, #1F2E45 100%)'
        }}
      >
        {/* Soft decorative blur orbs using user's palette (FFD273, FEE686, FEC5E6, DEB5D7, BFAEE3) */}
        <div 
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: '#BFAEE3' }}
        />
        <div 
          className="absolute -bottom-16 right-1/4 w-52 h-52 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ backgroundColor: '#FEC5E6' }}
        />
        <div 
          className="absolute top-1/2 left-10 w-44 h-44 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ backgroundColor: '#FFD273' }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <span 
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide border shadow-2xs"
              style={{
                backgroundColor: '#FFD273',
                borderColor: '#e6bd67',
                color: '#3d2b02'
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Trực tiếp • Không trung gian
            </span>

            <span 
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold"
              style={{ backgroundColor: '#FEE686', color: '#4d4608' }}
            >
              ★ 0đ phí
            </span>
          </div>

          <h1 className="text-xl sm:text-4xl font-extrabold tracking-tight mb-2 sm:mb-3 text-white leading-tight">
            Nối cơ hội- đổi cuộc đời
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-2xl line-clamp-3 sm:line-clamp-none font-normal">
            Nền tảng hỗ trợ <strong>mọi lứa tuổi</strong>, đặc biệt là <strong>sinh viên năm cuối, mới ra trường & người chưa có kinh nghiệm</strong> tiếp cận việc làm thực tế, tích lũy năng lực, nói KHÔNG với lừa đảo và trung gian môi giới.
          </p>

          {/* Quick Action Badges */}
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2">
            <button
              id="btn-hero-no-exp-filter"
              onClick={() => setExperienceTab('no-experience')}
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-[14px] text-xs sm:text-sm font-bold shadow-md transition-all active:scale-98 cursor-pointer"
              style={{
                backgroundColor: '#FFD273',
                color: '#3d2b02'
              }}
            >
              <Sparkles className="w-4 h-4 text-amber-950" />
              <span>Chưa có kinh nghiệm ({noExpJobsCount} việc)</span>
            </button>

            <button
              id="btn-hero-has-exp-filter"
              onClick={() => setExperienceTab('has-experience')}
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-[14px] text-slate-900 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-98 cursor-pointer border border-[#DEB5D7]"
              style={{ backgroundColor: '#FEC5E6' }}
            >
              <GraduationCap className="w-4 h-4 text-slate-900" />
              <span className="text-slate-900">Đã có kinh nghiệm ({hasExpJobsCount})</span>
            </button>

            <button
              onClick={onNavigateToIndustries}
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-[14px] text-slate-900 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs hover:opacity-95 hover:scale-[1.01]"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 210, 115, 0.6) 0%, rgba(254, 197, 230, 0.5) 45%, rgba(191, 174, 227, 0.6) 100%)',
                border: '1px solid #DEB5D7'
              }}
            >
              <Building2 className="w-4 h-4 text-purple-900" />
              <span>Danh sách khối ngành</span>
            </button>

            {onNavigateToEmployerPost && (
              <button
                onClick={onNavigateToEmployerPost}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[44px] rounded-[14px] text-slate-900 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs hover:opacity-95 hover:scale-[1.01]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 210, 115, 0.6) 0%, rgba(254, 197, 230, 0.5) 45%, rgba(191, 174, 227, 0.6) 100%)',
                  border: '1px solid #DEB5D7'
                }}
              >
                <Building2 className="w-4 h-4 text-amber-900" />
                <span>Đăng tin tuyển dụng trực tiếp</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Premium Glassmorphism Search Bar with Integrated Ngành con chi tiết in mục Kinh nghiệm */}
      <GlassmorphicSearchBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        experienceTab={experienceTab}
        onExperienceTabChange={setExperienceTab}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
        selectedSubIndustry={selectedSubIndustry}
        onSubIndustryChange={setSelectedSubIndustry}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        selectedSalaryBand={selectedSalaryBand}
        onSalaryBandChange={setSelectedSalaryBand}
        selectedJobType={selectedJobType}
        onJobTypeChange={setSelectedJobType}
        industries={industries}
        onReset={resetFilters}
        totalFilteredCount={filteredJobs.length}
        totalNoExpCount={noExpJobsCount}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {experienceTab === 'no-experience' 
              ? 'Mục việc làm: Chưa có kinh nghiệm & Đào tạo từ đầu' 
              : experienceTab === 'has-experience' 
                ? 'Mục việc làm: Đã có kinh nghiệm' 
                : 'Tất cả vị trí việc làm tuyển dụng trực tiếp'}
          </h2>
          <span 
            className="px-2.5 py-0.5 rounded-full text-xs font-extrabold"
            style={{ backgroundColor: '#FEE686', color: '#1E293B' }}
          >
            {filteredJobs.length} việc làm
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#3d2b02' }}>
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>Cam kết trực tiếp • Tuyệt đối không thu phí</span>
        </div>
      </div>

      {/* Job Cards Grid */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-[20px] border border-dashed border-slate-300 p-12 text-center">
          <Search className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            Không tìm thấy công việc phù hợp với tiêu chí lọc
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            Bạn có thể thử đặt lại bộ lọc hoặc mở rộng ngành nghề/địa điểm để tiếp cận thêm cơ hội việc làm.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl text-slate-900 text-xs font-bold cursor-pointer shadow-xs border border-[#FFD273]"
            style={{ backgroundColor: '#FFD273' }}
          >
            Xem lại tất cả việc làm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobIds.includes(job.id)}
              onToggleSave={onToggleSave}
              onSelectJob={onSelectJob}
              onQuickApply={onQuickApply}
            />
          ))}
        </div>
      )}
    </div>
  );
};
