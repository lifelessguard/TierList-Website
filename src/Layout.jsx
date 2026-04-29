import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';

export default function Layout({ children }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen" style={{ background: '#0f1117' }}>
      <style>{`
        body {
          background: #0f1117;
        }

        body {
          background: linear-gradient(to bottom right, #0f172a, #1e293b);
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main>
        {children}
      </main>

      {/* Fixed Copyright Notice */}
      <div className="fixed bottom-4 right-4 bg-slate-900/90 border border-slate-700 rounded-lg px-4 py-2 backdrop-blur-sm pointer-events-none z-50">
        <p className="text-slate-400 text-xs font-medium">© 2025 LifeTiers. All rights reserved.</p>
      </div>

      {/* Footer */}
      <footer className="py-8 mt-12" style={{ background: '#161924', borderTop: '1px solid #2a2d3a' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="https://media.base44.com/images/public/69c6b9c596f69bd520924ef9/ce65b64ba_Gemini_Generated_Image_ov4fs9ov4fs9ov4f-removebg-preview.png"
              alt="LifeTiers"
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 bg-clip-text text-transparent">
              LifeTiers
            </span>
          </div>
          <p className="text-slate-500 text-sm">
            The ultimate Minecraft PvP ranking system
          </p>
          <p className="text-slate-600 text-xs mt-2">
            © 2025 LifeTiers. All rights reserved.
          </p>
          <p className="text-xs mt-1" style={{ color: '#8b8fa8' }}>
            Report Bugs To Discord User : lifeless_guard
          </p>
        </div>
      </footer>
    </div>
  );
}