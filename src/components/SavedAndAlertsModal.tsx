import React, { useState } from 'react';
import { Job, JobAlert, Industry } from '../types';
import { 
  X, 
  Bookmark, 
  Bell, 
  Trash2, 
  ArrowRight, 
  Plus, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  DollarSign,
  Sparkles,
  Send
} from 'lucide-react';

interface SavedAndAlertsModalProps {
  isOpen: boolean;
  initialTab?: 'saved' | 'alerts';
  onClose: () => void;
  savedJobs: Job[];
  onRemoveSavedJob: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  onQuickApply: (job: Job) => void;
  alerts: JobAlert[];
  onAddAlert: (alert: JobAlert) => void;
  onRemoveAlert: (alertId: string) => void;
  industries: Industry[];
}

export const SavedAndAlertsModal: React.FC<SavedAndAlertsModalProps> = ({
  isOpen,
  initialTab = 'saved',
  onClose,
  savedJobs,
  onRemoveSavedJob,
  onSelectJob,
  onQuickApply,
  alerts,
  onAddAlert,
  onRemoveAlert,
  industries
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'alerts'>(initialTab);

  // New alert form state
  const [alertKeyword, setAlertKeyword] = useState('');
  const [alertIndustry, setAlertIndustry] = useState('CNKT');
  const [alertCity, setAlertCity] = useState('Hà Nội');
  const [alertSalary, setAlertSalary] = useState('7-10 triệu');
  const [alertExp, setAlertExp] = useState('Không cần kinh nghiệm');
  const [alertEmail, setAlertEmail] = useState('');
  const [alertAddedSuccess, setAlertAddedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail.trim()) return;

    const newAlert: JobAlert = {
      id: `alert-${Date.now()}`,
      keyword: alertKeyword.trim() || 'Tất cả vị trí',
      industryCode: alertIndustry,
      city: alertCity,
      salaryRange: alertSalary,
      experienceRequired: alertExp,
      userEmail: alertEmail.trim(),
      frequency: 'Hàng ngày',
      active: true,
      createdDate: new Date().toLocaleDateString('vi-VN')
    };

    onAddAlert(newAlert);
    setAlertAddedSuccess(true);
    setTimeout(() => {
      setAlertAddedSuccess(false);
      setAlertKeyword('');
      setAlertEmail('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-0 sm:my-6 max-h-[92vh] sm:max-h-[90vh] flex flex-col animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 duration-200">
        {/* Modal Header */}
        <div 
          className="text-white p-4 sm:p-5 sm:px-6 flex items-center justify-between flex-shrink-0"
          style={{ 
            background: 'linear-gradient(135deg, #1E293B 0%, #28374D 100%)',
            borderBottom: '2px solid #DEB5D7'
          }}
        >
          <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'saved'
                  ? 'shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              style={activeTab === 'saved' ? { backgroundColor: '#FFD273', color: '#1E293B' } : undefined}
            >
              <Bookmark className="w-4 h-4" />
              <span>Việc làm đã lưu ({savedJobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('alerts')}
              className={`flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'alerts'
                  ? 'shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              style={activeTab === 'alerts' ? { backgroundColor: '#FEC5E6', color: '#1E293B' } : undefined}
            >
              <Bell className="w-4 h-4 text-[#DEB5D7]" />
              <span>Chuông báo việc ({alerts.length})</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: SAVED JOBS */}
          {activeTab === 'saved' && (
            <div>
              {savedJobs.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800 mb-1">
                    Chưa có việc làm nào được lưu
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                    Nhấn vào biểu tượng dấu trang trên các tin tuyển dụng bạn quan tâm để lưu lại và ứng tuyển bất kỳ lúc nào.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Khám phá danh sách việc làm
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 mb-2">
                    Danh sách các vị trí bạn đã đánh dấu quan tâm:
                  </p>

                  {savedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 hover:border-sky-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                            {job.industryCode}
                          </span>
                          {job.experienceRequired === 'no-experience' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              🌱 Không cần KN
                            </span>
                          )}
                        </div>

                        <h4 
                          onClick={() => {
                            onClose();
                            onSelectJob(job);
                          }}
                          className="text-sm font-bold text-slate-900 hover:text-sky-600 cursor-pointer"
                        >
                          {job.title}
                        </h4>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                          <span className="flex items-center gap-1 font-medium text-slate-800">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" /> {job.companyName}
                          </span>
                          <span className="flex items-center gap-1 text-emerald-700 font-bold">
                            <DollarSign className="w-3.5 h-3.5" /> {job.salaryText}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.city}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <button
                          onClick={() => onRemoveSavedJob(job.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Xóa khỏi danh sách lưu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            onQuickApply(job);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Ứng tuyển
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: JOB ALERTS */}
          {activeTab === 'alerts' && (
            <div className="space-y-6">
              {/* Alert Creator Form */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-sky-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Thiết lập chuông báo việc làm mới tức thì
                  </h4>
                </div>
                <p className="text-xs text-slate-500">
                  Hệ thống sẽ tự động quét và gửi thông báo việc làm phù hợp với tiêu chí của bạn ngay khi doanh nghiệp đăng tuyển.
                </p>

                {alertAddedSuccess ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    Đã lưu cài đặt thông báo việc làm thành công!
                  </div>
                ) : (
                  <form onSubmit={handleCreateAlert} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Từ khóa vị trí mong muốn:
                        </label>
                        <input
                          type="text"
                          placeholder="Ví dụ: Kho vận, Thực tập sinh, Kế toán..."
                          value={alertKeyword}
                          onChange={(e) => setAlertKeyword(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Khối ngành ưu tiên:
                        </label>
                        <select
                          value={alertIndustry}
                          onChange={(e) => setAlertIndustry(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                        >
                          {industries.map((ind) => (
                            <option key={ind.code} value={ind.code}>
                              {ind.code} - {ind.shortName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Khu vực:</label>
                        <select
                          value={alertCity}
                          onChange={(e) => setAlertCity(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                        >
                          <option value="Hà Nội">Hà Nội</option>
                          <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                          <option value="Đà Nẵng">Đà Nẵng</option>
                          <option value="Bình Dương">Bình Dương</option>
                          <option value="Toàn quốc">Toàn quốc</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Kinh nghiệm:</label>
                        <select
                          value={alertExp}
                          onChange={(e) => setAlertExp(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                        >
                          <option value="Không cần kinh nghiệm">🌱 Không cần kinh nghiệm</option>
                          <option value="Có kinh nghiệm">Có kinh nghiệm</option>
                          <option value="Bất kỳ">Tất cả</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Email nhận tin *:</label>
                        <input
                          type="email"
                          required
                          placeholder="email@cuaban.com"
                          value={alertEmail}
                          onChange={(e) => setAlertEmail(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" /> Tạo thông báo mới
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Active Alerts List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Danh sách chuông báo đang hoạt động ({alerts.length})
                </h4>

                {alerts.map((al) => (
                  <div
                    key={al.id}
                    className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {al.keyword}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                          Khối {al.industryCode}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800">
                          {al.experienceRequired}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
                        <span>Khu vực: <strong>{al.city}</strong></span>
                        <span>Nhận qua: <strong>{al.userEmail}</strong></span>
                        <span className="text-emerald-600 font-medium">● Đang bật</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveAlert(al.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Xóa chuông báo này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:px-6 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
