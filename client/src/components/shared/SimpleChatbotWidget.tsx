/**
 * TASK-08: SimpleChatbotWidget Component (Minimal Link-Based)
 * Design: "Neon Operations" — floating purple button with quick action links
 *
 * Floating button in bottom-right corner with pulse animation for visibility.
 * Expands to show 4 quick action links.
 * No backend or LLM integration — placeholder for future AI chatbot.
 */
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { MessageCircle, X, Calendar, DollarSign, Mail, HelpCircle } from 'lucide-react';

const quickActions = [
  { label: 'Book a Demo', href: '/contact', icon: Calendar, description: 'Schedule a walkthrough' },
  { label: 'View Pricing', href: '/pricing', icon: DollarSign, description: 'See our plans' },
  { label: 'Contact Sales', href: '/contact', icon: Mail, description: 'Talk to our team' },
  { label: 'What is Oplytics?', href: '/', icon: HelpCircle, description: 'Learn about us' },
];

export default function SimpleChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  // Stop pulsing after 10 seconds or when opened
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setOpen(!open);
    setShowPulse(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Expanded Panel */}
      {open && (
        <div
          className="absolute bottom-16 right-0 w-72 bg-[#0D1220] border border-[#1E2738] rounded-lg overflow-hidden mb-2"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(140,52,233,0.15)' }}
        >
          <div className="p-4 border-b border-[#1E2738]" style={{ background: 'linear-gradient(135deg, #8C34E9 0%, #5B1FA6 100%)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white" style={{ fontFamily: 'Montserrat' }}>
                  How can we help?
                </h4>
                <p className="text-xs text-white/70">Quick links to get started</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-2">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#1E2738]/60 transition-colors group"
              >
                <div className="w-8 h-8 rounded-md bg-[#8C34E9]/10 flex items-center justify-center shrink-0 group-hover:bg-[#8C34E9]/20 transition-colors">
                  <action.icon className="w-4 h-4 text-[#C084FC]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{action.label}</div>
                  <div className="text-xs text-[#596475]">{action.description}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-[#1E2738] bg-[#080C16]">
            <p className="text-[10px] text-[#596475] text-center">
              AI-powered assistant coming soon
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div className="relative">
        {/* Pulse ring for visibility */}
        {showPulse && !open && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: '#8C34E9' }} />
        )}
        <button
          onClick={handleToggle}
          className="relative w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #8C34E9 0%, #5B1FA6 100%)',
            boxShadow: '0 4px 20px rgba(140,52,233,0.4), 0 0 40px rgba(140,52,233,0.15)',
          }}
          aria-label="Open help menu"
        >
          {open ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
