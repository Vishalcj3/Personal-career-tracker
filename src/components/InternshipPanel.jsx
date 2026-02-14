import { getTierColor } from '../utils/helpers';

const InternshipPanel = ({ internships }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">
        Internship Eligibility
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {internships && internships.length > 0 ? (
          internships.map((internship, index) => {
            const isEligible = internship.status === 'Eligible';
            const tierColor = getTierColor(internship.tier);

            return (
              <div
                key={index}
                className={`rounded-xl border-2 p-6 transition-all hover:shadow-lg ${
                  isEligible
                    ? `border-${tierColor}-300 bg-${tierColor}-50`
                    : 'border-slate-200 bg-slate-50 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-slate-900 text-lg line-clamp-2 flex-1">
                    {internship.title}
                  </h3>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-bold whitespace-nowrap bg-${tierColor}-100 text-${tierColor}-700`}>
                    {internship.tier}
                  </span>
                </div>

                {isEligible ? (
                  <div className="flex items-center gap-2 text-success-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-sm">Eligible</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-sm">Locked</span>
                    </div>

                    {internship.missing_requirements && internship.missing_requirements.length > 0 && (
                      <div className="text-xs text-slate-600 space-y-1">
                        <p className="font-medium">Missing:</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          {internship.missing_requirements.map((req, idx) => (
                            <li key={idx} className="text-slate-500">{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-3 text-center py-8 text-slate-500">
            No internship data available
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipPanel;
