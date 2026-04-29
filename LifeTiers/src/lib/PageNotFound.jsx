import { useLocation } from 'react-router-dom';

export default function PageNotFound({}) {
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0f1117' }}>
            <div className="max-w-md w-full">
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-7xl font-light text-slate-500">404</h1>
                        <div className="h-0.5 w-16 mx-auto" style={{ background: '#2a2d3a' }}></div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-2xl font-medium text-white">
                            Page Not Found
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            The page <span className="font-medium text-slate-300">"{pageName}"</span> could not be found.
                        </p>
                    </div>

                    <div className="pt-6">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200"
                            style={{ background: '#1e2130', border: '1px solid #2a2d3a' }}
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
