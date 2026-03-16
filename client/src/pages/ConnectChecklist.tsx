/**
 * Oplytics Connect — Sponsor Implementation Checklist
 * Route: /solutions/connect/checklist
 * Ported from oplytics-platform, wrapped in MarketingLayout
 * Interactive checklist with localStorage persistence
 */
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Circle, ChevronDown, ChevronRight,
  ClipboardList, Users, Wrench, Wifi, BarChart3,
  Rocket, Shield, GraduationCap, Plug, ArrowRight,
} from 'lucide-react';
import MarketingLayout from '@/components/shared/MarketingLayout';

/* ─── Phase & Item Types ─── */
interface CheckItem { id: string; label: string; detail: string; }
interface Phase {
  id: string; number: string; title: string; duration: string;
  description: string; icon: React.ElementType; color: string;
  items: CheckItem[];
}

const phases: Phase[] = [
  {
    id: 'discovery', number: '01', title: 'Discovery & Assessment', duration: 'Week 1–2',
    description: 'Understand the current state, identify target machines, and define success criteria with all stakeholders.',
    icon: ClipboardList, color: '#8C34E9',
    items: [
      { id: 'd1', label: 'Identify project sponsor and core team', detail: 'Assign a senior sponsor (typically Operations Director or Factory Manager) and a cross-functional team including IT, Maintenance, Safety, and CI representatives.' },
      { id: 'd2', label: 'Define business objectives and KPIs', detail: 'Agree on measurable goals: e.g., "Reduce unplanned downtime by 25% within 6 months" or "Achieve 80% OEE on Line 3".' },
      { id: 'd3', label: 'Conduct machine audit', detail: 'Survey all target machines: age, make, model, existing PLC/controls, electrical panel access, available signals. Photograph each panel.' },
      { id: 'd4', label: 'Assess network infrastructure', detail: 'Map available Ethernet ports, WiFi coverage, and 4G signal strength on the factory floor. Identify any IT security constraints.' },
      { id: 'd5', label: 'Select pilot machines (3–5 recommended)', detail: 'Choose a representative mix: one high-value, one problematic, one baseline. Avoid starting with the most complex machine.' },
      { id: 'd6', label: 'Stakeholder alignment meeting', detail: 'Present the plan to all department heads. Use the role-specific value proposals to address each stakeholder\'s concerns.' },
      { id: 'd7', label: 'Sign off on scope and budget', detail: 'Confirm the number of machines, signals to capture, timeline, and total investment. Explore Made Smarter grant eligibility.' },
    ],
  },
  {
    id: 'stakeholders', number: '02', title: 'Stakeholder Engagement', duration: 'Week 2–3',
    description: 'Secure buy-in from every department by presenting tailored value proposals and addressing specific concerns.',
    icon: Users, color: '#1DB8CE',
    items: [
      { id: 's1', label: 'CEO / MD briefing delivered', detail: 'Present the strategic case: ROI, competitive advantage, and data-driven decision making. Use the CEO value proposal.' },
      { id: 's2', label: 'Factory Manager workshop completed', detail: 'Walk through the production monitoring capabilities. Show how OEE, downtime, and shift reports will work.' },
      { id: 's3', label: 'IT security review passed', detail: 'Present the architecture to IT: network segmentation, encryption, standards-based integration, RBAC.' },
      { id: 's4', label: 'Safety team consultation done', detail: 'Review which safety signals will be monitored. Confirm guard/door monitoring requirements and alert workflows.' },
      { id: 's5', label: 'CI team objectives aligned', detail: 'Agree on which loss categories to track, Pareto analysis requirements, and Kaizen tracking integration.' },
      { id: 's6', label: 'Maintenance team requirements captured', detail: 'Document condition monitoring needs, maintenance alert thresholds, and runtime-based scheduling requirements.' },
      { id: 's7', label: 'Operator communication plan created', detail: 'Draft a communication plan for shop-floor operators explaining what\'s being installed and why. Address any concerns.' },
    ],
  },
  {
    id: 'procurement', number: '03', title: 'Hardware Procurement', duration: 'Week 3–5',
    description: 'Order and receive all hardware components based on the machine audit findings.',
    icon: Wrench, color: '#F59E0B',
    items: [
      { id: 'p1', label: 'Hardware specification finalised', detail: 'For each machine: list the exact CT clamps, digital I/O modules, analog inputs, and edge gateway model required.' },
      { id: 'p2', label: 'Edge gateways ordered', detail: 'Order the selected gateway model (e.g., Teltonika TRB140, Advantech ADAM-6717, or Siemens IOT2050) for each machine.' },
      { id: 'p3', label: 'Sensors and I/O modules ordered', detail: 'Order CT clamps (split-core for non-invasive install), digital input modules, and any analog sensors required.' },
      { id: 'p4', label: 'Ancillary equipment ordered', detail: 'DIN rails, 24V power supplies, terminal blocks, cable glands, Ethernet cables, and any panel modification parts.' },
      { id: 'p5', label: 'Hardware received and inspected', detail: 'Verify all components against the order. Test edge gateways power on and connect to the network before installation day.' },
      { id: 'p6', label: 'Installation schedule agreed', detail: 'Coordinate with production to schedule installation windows — ideally during planned maintenance or shift changeovers.' },
    ],
  },
  {
    id: 'installation', number: '04', title: 'Physical Installation', duration: 'Week 5–7',
    description: 'Qualified electricians install sensors and gateways into each machine\'s electrical panel.',
    icon: Shield, color: '#EF4444',
    items: [
      { id: 'i1', label: 'Qualified electrician confirmed', detail: 'Ensure the installer holds BS 7671 18th Edition certification and is familiar with industrial panel work.' },
      { id: 'i2', label: 'Risk assessment and method statement (RAMS) completed', detail: 'Document the installation procedure, isolation requirements, and safety precautions for each machine.' },
      { id: 'i3', label: 'Lockout/tagout procedures followed', detail: 'Isolate each machine according to site LOTO procedures before opening the electrical panel.' },
      { id: 'i4', label: 'CT clamps and sensors installed', detail: 'Fit CT clamps around power cables, wire digital inputs to PLC outputs or relay contacts, connect analog sensors.' },
      { id: 'i5', label: 'Edge gateway mounted and wired', detail: 'Mount the gateway on DIN rail inside or adjacent to the panel. Connect sensor inputs, power supply, and network cable.' },
      { id: 'i6', label: 'Electrical Installation Certificate issued', detail: 'The electrician must issue an EIC or Minor Works Certificate for each installation as per BS 7671.' },
      { id: 'i7', label: 'Post-installation safety check completed', detail: 'Verify all connections are secure, panel doors close properly, and no safety interlocks have been compromised.' },
    ],
  },
  {
    id: 'connectivity', number: '05', title: 'Network & Cloud Setup', duration: 'Week 7–8',
    description: 'Configure edge gateways, establish secure cloud connectivity, and verify data flow.',
    icon: Wifi, color: '#3B82F6',
    items: [
      { id: 'c1', label: 'Edge gateways configured', detail: 'Set up MQTT publishing, sensor input mapping, data sampling rates, and local buffering for network outages.' },
      { id: 'c2', label: 'Network connectivity established', detail: 'Connect gateways to the factory network (Ethernet or 4G). Verify firewall rules allow outbound MQTT traffic.' },
      { id: 'c3', label: 'MQTT broker provisioned', detail: 'Set up the cloud MQTT broker with TLS 1.3 encryption, topic structure, and access credentials.' },
      { id: 'c4', label: 'Data flow verified end-to-end', detail: 'Confirm that sensor data from each machine reaches the cloud broker and is being received by the Oplytics backend.' },
      { id: 'c5', label: 'IT security audit of data path', detail: 'IT team verifies encryption, network segmentation, access controls, and data retention policies.' },
      { id: 'c6', label: 'Backup and failover tested', detail: 'Verify that edge gateways buffer data during network outages and resend when connectivity is restored.' },
    ],
  },
  {
    id: 'platform', number: '06', title: 'Platform Configuration', duration: 'Week 8–10',
    description: 'Configure the Oplytics platform with machine definitions, dashboards, alerts, and user access.',
    icon: BarChart3, color: '#10b981',
    items: [
      { id: 'pl1', label: 'Machine assets created in Oplytics', detail: 'Define each machine in the platform: name, location, line, shift patterns, and target OEE.' },
      { id: 'pl2', label: 'Signal mapping configured', detail: 'Map each sensor input to the correct metric: machine state, speed, temperature, door status, etc.' },
      { id: 'pl3', label: 'OEE calculation rules set', detail: 'Define Availability, Performance, and Quality calculation rules for each machine type.' },
      { id: 'pl4', label: 'Dashboards built', detail: 'Create role-specific dashboards: executive overview, production floor, maintenance, safety, and CI views.' },
      { id: 'pl5', label: 'Alert rules configured', detail: 'Set up notifications for downtime events, safety breaches, maintenance thresholds, and performance targets.' },
      { id: 'pl6', label: 'User accounts and permissions set', detail: 'Create user accounts with role-based access aligned to Active Directory groups.' },
      { id: 'pl7', label: 'SQDCP board integration configured', detail: 'Link machine data to the Oplytics SQDCP Logic module for daily management boards.' },
    ],
  },
  {
    id: 'training', number: '07', title: 'Training & Go-Live', duration: 'Week 10–12',
    description: 'Train all user groups, run a parallel period, and officially go live.',
    icon: GraduationCap, color: '#F97316',
    items: [
      { id: 't1', label: 'Executive training delivered', detail: 'Train senior leaders on accessing dashboards, interpreting KPIs, and using board-ready reports.' },
      { id: 't2', label: 'Operations team training delivered', detail: 'Train factory managers and supervisors on production monitoring, shift reports, and downtime logging.' },
      { id: 't3', label: 'Maintenance team training delivered', detail: 'Train maintenance staff on condition monitoring alerts, runtime tracking, and maintenance logging.' },
      { id: 't4', label: 'Operator awareness sessions completed', detail: 'Brief shop-floor operators on what the system does, how it helps them, and what (if anything) changes for them.' },
      { id: 't5', label: '2-week parallel running period completed', detail: 'Run the system alongside existing processes for 2 weeks to validate data accuracy and build confidence.' },
      { id: 't6', label: 'Data accuracy validated', detail: 'Compare system-reported OEE, downtime, and production counts against manual records. Resolve any discrepancies.' },
      { id: 't7', label: 'Official go-live sign-off', detail: 'Sponsor signs off on go-live. Decommission manual data collection processes. Celebrate the milestone.' },
    ],
  },
  {
    id: 'optimise', number: '08', title: 'Optimise & Scale', duration: 'Month 4+',
    description: 'Review initial results, optimise the deployment, and plan the rollout to additional machines and sites.',
    icon: Rocket, color: '#8C34E9',
    items: [
      { id: 'o1', label: '30-day review meeting held', detail: 'Review KPIs against baseline. Identify quick wins and areas for improvement. Share results with all stakeholders.' },
      { id: 'o2', label: 'First CI project launched using live data', detail: 'Use the Pareto analysis to identify the biggest loss and launch a targeted Kaizen event.' },
      { id: 'o3', label: 'ROI report generated', detail: 'Calculate the actual financial impact: downtime reduction, energy savings, quality improvements. Present to the board.' },
      { id: 'o4', label: 'Phase 2 machines identified', detail: 'Based on pilot success, identify the next batch of machines for connection. Prioritise by potential impact.' },
      { id: 'o5', label: 'Scaling plan approved', detail: 'Present the business case for expanding to additional lines, sites, or signal types. Secure budget approval.' },
    ],
  },
];

const STORAGE_KEY = 'oplytics-connect-checklist';

export default function ConnectChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({ discovery: true });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const toggleItem = useCallback((id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const togglePhase = useCallback((id: string) => {
    setExpandedPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const totalItems = phases.reduce((sum, p) => sum + p.items.length, 0);
  const completedItems = Object.values(checked).filter(Boolean).length;
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  const getPhaseProgress = (phase: Phase) => {
    const done = phase.items.filter((item) => checked[item.id]).length;
    return { done, total: phase.items.length, percent: Math.round((done / phase.items.length) * 100) };
  };

  return (
    <MarketingLayout>
      {/* ─── Breadcrumb ─── */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-4">
        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: '#596475' }}>
          <Link href="/" className="hover:text-white transition-colors" style={{ color: '#596475' }}>Oplytics</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/solutions/connect" className="hover:text-white transition-colors" style={{ color: '#596475' }}>OplyticsConnect</Link>
          <ChevronRight className="w-3 h-3" />
          <span style={{ color: '#10b981' }}>Implementation Checklist</span>
        </div>
      </div>

      {/* ─── Hero ─── */}
      <section className="px-6 pt-4 pb-12 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <Plug className="w-3.5 h-3.5" style={{ color: '#10b981' }} />
            <span className="text-xs font-semibold" style={{ color: '#10b981' }}>Sponsor's Guide</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ fontFamily: 'Montserrat' }}>
            Implementation <span style={{ color: '#10b981' }}>Process & Checklist</span>
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: '#8890a0', fontFamily: 'Space Grotesk' }}>
            A step-by-step guide for the project sponsor to track progress from initial assessment through to go-live and scaling. Your progress is saved automatically in your browser.
          </p>
        </motion.div>
      </section>

      {/* ─── Sticky Progress Bar ─── */}
      <section className="sticky top-0 z-40 backdrop-blur-md" style={{ background: 'rgba(13,18,32,0.95)', borderBottom: '1px solid #1e2738' }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-white" style={{ fontFamily: 'Montserrat' }}>Overall Progress</span>
            <span className="text-sm font-mono" style={{ color: '#10b981' }}>
              {completedItems}/{totalItems} ({progressPercent}%)
            </span>
          </div>
          <div className="h-2 rounded-full" style={{ background: '#1a2235' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #8C34E9, #10b981)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
            />
          </div>
        </div>
      </section>

      {/* ─── Phases ─── */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {phases.map((phase) => {
            const progress = getPhaseProgress(phase);
            const isExpanded = expandedPhases[phase.id];

            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-xl overflow-hidden"
                style={{ background: '#0d1220', border: '1px solid #1e2738' }}
              >
                {/* Phase Header */}
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="w-full flex items-center gap-4 p-5 md:p-6 text-left transition-colors hover:bg-[#141c2e]"
                >
                  <div className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: phase.color + '18' }}>
                    <phase.icon className="w-6 h-6" style={{ color: phase.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: phase.color, fontFamily: 'Montserrat' }}>
                        Phase {phase.number}
                      </span>
                      <span className="text-[10px]" style={{ color: '#596475' }}>{phase.duration}</span>
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-white" style={{ fontFamily: 'Montserrat' }}>{phase.title}</h3>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: '#1a2235' }}>
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress.percent}%`, backgroundColor: phase.color }} />
                      </div>
                      <span className="text-[10px] font-mono shrink-0" style={{ color: '#596475' }}>{progress.done}/{progress.total}</span>
                    </div>
                  </div>
                  <div style={{ color: '#596475' }}>
                    {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </div>
                </button>

                {/* Phase Items */}
                {isExpanded && (
                  <div style={{ borderTop: '1px solid #1e2738' }}>
                    <p className="px-5 md:px-6 pt-4 pb-2 text-xs" style={{ color: '#8890a0', fontFamily: 'Space Grotesk' }}>
                      {phase.description}
                    </p>
                    <div className="px-3 md:px-4 pb-4">
                      {phase.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className="w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors hover:bg-[#141c2e] group"
                        >
                          <div className="shrink-0 mt-0.5">
                            {checked[item.id] ? (
                              <CheckCircle2 className="w-5 h-5" style={{ color: '#10b981' }} />
                            ) : (
                              <Circle className="w-5 h-5 group-hover:text-[#596475]" style={{ color: '#2a3548' }} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`text-sm font-medium block ${checked[item.id] ? 'line-through' : 'text-white'}`} style={checked[item.id] ? { color: '#596475' } : {}}>
                              {item.label}
                            </span>
                            <span className="text-[11px] mt-1 block leading-relaxed" style={{ color: '#596475', fontFamily: 'Space Grotesk' }}>
                              {item.detail}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-14 px-6" style={{ background: '#0d1220', borderTop: '1px solid #1e2738' }}>
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: 'Montserrat' }}>Ready to Begin?</h2>
          <p className="mt-3 text-sm" style={{ color: '#8890a0', fontFamily: 'Space Grotesk' }}>
            Contact the Oplytics team to schedule your Discovery & Assessment session and start your journey to connected operations.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Link
              href="/solutions/connect"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', fontFamily: 'Montserrat' }}
            >
              Back to OplyticsConnect Overview <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all hover:bg-white/5"
              style={{ border: '1px solid #1e2738', color: '#8890a0', fontFamily: 'Montserrat' }}
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
