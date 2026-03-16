/**
 * Oplytics Connect — Role-Specific Value Proposal Page
 * Route: /solutions/connect/:role
 * Ported from oplytics-platform, wrapped in MarketingLayout
 * Green (#10b981) accent for Connect branding
 */
import { Link, useParams } from 'wouter';
import { motion } from 'framer-motion';
import {
  connectRoles, roleOrder, roleLabels,
} from '@/lib/connectRoleData';
import {
  ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2,
  Target, PoundSterling, Plug, Briefcase, Factory,
  Server, Shield, TrendingUp, Wrench, ChevronRight,
} from 'lucide-react';
import MarketingLayout from '@/components/shared/MarketingLayout';

/* ─── Icon map for role labels ─── */
const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase, factory: Factory, server: Server,
  shield: Shield, 'trending-up': TrendingUp, wrench: Wrench,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' as const },
  }),
};

export default function ConnectRoleProposal() {
  const { role } = useParams<{ role: string }>();
  const data = connectRoles[role || ''];

  if (!data) {
    return (
      <MarketingLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat' }}>Role not found</h1>
            <Link href="/solutions/connect" className="text-sm" style={{ color: '#10b981' }}>Back to OplyticsConnect</Link>
          </div>
        </div>
      </MarketingLayout>
    );
  }

  const currentIndex = roleOrder.indexOf(role || '');
  const prevRole = currentIndex > 0 ? roleOrder[currentIndex - 1] : null;
  const nextRole = currentIndex < roleOrder.length - 1 ? roleOrder[currentIndex + 1] : null;

  return (
    <MarketingLayout>
      {/* ─── Breadcrumb ─── */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-4">
        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: '#596475' }}>
          <Link href="/" className="hover:text-white transition-colors" style={{ color: '#596475' }}>Oplytics</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/solutions/connect" className="hover:text-white transition-colors" style={{ color: '#596475' }}>OplyticsConnect</Link>
          <ChevronRight className="w-3 h-3" />
          <span style={{ color: '#10b981' }}>{data.title}</span>
        </div>
      </div>

      {/* ─── Hero ─── */}
      <section className="px-6 pt-4 pb-16 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <Plug className="w-3.5 h-3.5" style={{ color: '#10b981' }} />
            <span className="text-xs font-semibold" style={{ color: '#10b981' }}>Value Proposal</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ fontFamily: 'Montserrat' }}>
            {data.subtitle.split(' ').slice(0, -2).join(' ')}{' '}
            <span style={{ color: '#10b981' }}>{data.subtitle.split(' ').slice(-2).join(' ')}</span>
          </h1>
          <div className="inline-block px-3 py-1 rounded-md mb-6" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#10b981' }}>For the {data.title}</span>
          </div>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: '#8890a0', fontFamily: 'Space Grotesk' }}>
            {data.tagline}
          </p>
        </motion.div>
      </section>

      {/* ─── Pain Points ─── */}
      <section className="py-16 px-6" style={{ background: '#0d1220', borderTop: '1px solid #1e2738', borderBottom: '1px solid #1e2738' }}>
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#EF4444' }}>The Challenge</span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-3 mb-10" style={{ fontFamily: 'Montserrat' }}>
            The Problems You're <span style={{ color: '#EF4444' }}>Facing Today</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.painPoints.map((pain, i) => (
              <motion.div
                key={pain.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-6 rounded-xl" style={{ background: '#0a0e1a', border: '1px solid #1e2738' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(239,68,68,0.12)' }}>
                  <AlertTriangle className="w-5 h-5" style={{ color: '#EF4444' }} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2" style={{ fontFamily: 'Montserrat' }}>{pain.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#8890a0', fontFamily: 'Space Grotesk' }}>{pain.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Benefits / Metrics ─── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#10b981' }}>The Impact</span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-3 mb-10" style={{ fontFamily: 'Montserrat' }}>
            Measurable Results, <span style={{ color: '#10b981' }}>Proven Value</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.benefits.map((benefit, i) => (
              <motion.div
                key={benefit.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-8 rounded-xl text-center" style={{ background: '#0d1220', border: '1px solid #1e2738' }}
              >
                <div className="text-3xl md:text-4xl font-black mb-2" style={{ color: '#10b981', fontFamily: 'Montserrat' }}>
                  {benefit.metric}
                </div>
                <div className="text-xs uppercase tracking-wider font-bold mb-3" style={{ color: '#8890a0' }}>
                  {benefit.label}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#596475', fontFamily: 'Space Grotesk' }}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="py-16 px-6" style={{ background: '#0d1220', borderTop: '1px solid #1e2738', borderBottom: '1px solid #1e2738' }}>
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1DB8CE' }}>Key Features</span>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-3 mb-10" style={{ fontFamily: 'Montserrat' }}>
            What OplyticsConnect <span style={{ color: '#1DB8CE' }}>Delivers</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {data.features.map((feature, i) => (
              <motion.div
                key={feature.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-6 rounded-xl flex gap-4" style={{ background: '#0a0e1a', border: '1px solid #1e2738' }}
              >
                <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(29,184,206,0.12)' }}>
                  <Target className="w-5 h-5" style={{ color: '#1DB8CE' }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1.5" style={{ fontFamily: 'Montserrat' }}>{feature.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#8890a0', fontFamily: 'Space Grotesk' }}>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROI Section ─── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl" style={{ background: '#0d1220', border: '1px solid rgba(16,185,129,0.2)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(16,185,129,0.12)' }}>
            <PoundSterling className="w-7 h-7" style={{ color: '#10b981' }} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#10b981' }}>Return on Investment</span>
          <h3 className="mt-4 text-lg md:text-xl font-black text-white" style={{ fontFamily: 'Montserrat' }}>
            {data.roiExample.scenario}
          </h3>
          <div className="mt-6 flex items-baseline justify-center gap-2">
            <span className="text-4xl md:text-6xl font-black" style={{ color: '#10b981', fontFamily: 'Montserrat' }}>
              {data.roiExample.saving}
            </span>
            <span className="text-lg" style={{ color: '#8890a0' }}>{data.roiExample.period}</span>
          </div>
          <p className="mt-4 text-sm" style={{ color: '#596475', fontFamily: 'Space Grotesk' }}>
            Contact us for a tailored ROI analysis based on your specific operation.
          </p>
          <Link
            href="/solutions/connect/checklist"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', fontFamily: 'Montserrat' }}
          >
            <CheckCircle2 className="w-4 h-4" /> View Implementation Checklist
          </Link>
        </div>
      </section>

      {/* ─── Role Navigation Cards ─── */}
      <section className="py-12 px-6" style={{ background: '#0d1220', borderTop: '1px solid #1e2738' }}>
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8890a0' }}>Other Value Proposals</span>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {roleOrder.map((slug) => {
              const label = roleLabels[slug];
              const Icon = iconMap[label.icon] || Briefcase;
              const isCurrent = slug === role;
              return (
                <Link
                  key={slug}
                  href={`/solutions/connect/${slug}`}
                  className={`p-3 rounded-lg text-center transition-all ${isCurrent ? '' : 'hover:translate-y-[-2px]'}`}
                  style={{
                    background: isCurrent ? label.color + '18' : '#0a0e1a',
                    border: `1px solid ${isCurrent ? label.color + '40' : '#1e2738'}`,
                    pointerEvents: isCurrent ? 'none' : 'auto',
                  }}
                >
                  <Icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: label.color }} />
                  <div className="text-[10px] font-bold text-white" style={{ fontFamily: 'Montserrat' }}>{label.short}</div>
                  {isCurrent && <div className="text-[8px] mt-1 font-bold uppercase" style={{ color: label.color }}>Current</div>}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Prev / Next Navigation ─── */}
      <section className="py-8 px-6" style={{ borderTop: '1px solid #1e2738' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {prevRole ? (
            <Link href={`/solutions/connect/${prevRole}`} className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: '#596475' }}>
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{connectRoles[prevRole].title}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          ) : <div />}
          <Link href="/solutions/connect/checklist" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#10b981' }}>
            <CheckCircle2 className="w-4 h-4" /> Implementation Checklist
          </Link>
          {nextRole ? (
            <Link href={`/solutions/connect/${nextRole}`} className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white" style={{ color: '#596475' }}>
              <span className="hidden sm:inline">{connectRoles[nextRole].title}</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : <div />}
        </div>
      </section>
    </MarketingLayout>
  );
}
