/**
 * Oplytics Connect — Role-specific value proposal data
 * Used by ConnectRoleProposal.tsx and ConnectSolution.tsx
 */

export interface ConnectRole {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  painPoints: { title: string; description: string }[];
  benefits: { metric: string; label: string; description: string }[];
  features: { title: string; description: string }[];
  cta: string;
  roiExample: { scenario: string; saving: string; period: string };
}

export const connectRoles: Record<string, ConnectRole> = {
  ceo: {
    slug: 'ceo',
    title: 'Chief Executive Officer',
    subtitle: 'Strategic Visibility Across Your Entire Operation',
    tagline: 'Transform operational data into boardroom-ready intelligence. Know the true performance of every asset, every shift, every site — in real time.',
    painPoints: [
      { title: 'Blind Decision-Making', description: 'Critical capital expenditure and operational decisions are made on gut feeling and outdated spreadsheets rather than live data.' },
      { title: 'Hidden Margin Erosion', description: 'Unplanned downtime, energy waste, and inefficiency silently erode your margins by 15–30% without clear visibility.' },
      { title: 'Competitive Disadvantage', description: 'Competitors adopting Industry 4.0 are gaining 20%+ productivity advantages while legacy operations fall behind.' },
    ],
    benefits: [
      { metric: '£144K+', label: 'Annual Savings', description: 'Per production line through reduced downtime and improved OEE.' },
      { metric: '5:1', label: 'ROI Ratio', description: 'Typical return on investment within the first 12 months of deployment.' },
      { metric: '85%+', label: 'OEE Target', description: 'Move from industry-average 60% to world-class OEE with data-driven decisions.' },
    ],
    features: [
      { title: 'Executive Dashboard', description: 'Real-time KPIs across all sites and production lines, accessible from any device.' },
      { title: 'Financial Impact Reporting', description: 'Automatic translation of operational metrics into pounds and pence — downtime cost, energy waste, yield loss.' },
      { title: 'Benchmarking & Trends', description: 'Compare performance across shifts, lines, and sites to identify best practices and underperformers.' },
      { title: 'Board-Ready Reports', description: 'Automated weekly and monthly reports with the metrics your board needs to see.' },
    ],
    cta: 'See how Oplytics delivers boardroom-ready intelligence',
    roiExample: { scenario: 'A single production line experiencing 2 hours of unplanned downtime per day at £100/hour', saving: '£144,000', period: 'per year' },
  },
  'factory-manager': {
    slug: 'factory-manager',
    title: 'Factory / Operations Manager',
    subtitle: 'Complete Visibility of Your Production Floor',
    tagline: 'Stop firefighting. Start managing with real-time machine data that tells you exactly what\'s running, what\'s stopped, and why — before you walk the floor.',
    painPoints: [
      { title: 'Reactive Management', description: 'You find out about problems after they\'ve already cost you hours of production. Walking the floor is your only source of truth.' },
      { title: 'Inaccurate OEE', description: 'Manual data collection means your OEE figures are estimates at best, fiction at worst. You can\'t improve what you can\'t measure.' },
      { title: 'Shift Handover Gaps', description: 'Critical information is lost between shifts. Night shift problems become morning shift surprises.' },
    ],
    benefits: [
      { metric: 'Real-Time', label: 'Machine Status', description: 'Know instantly which machines are running, idle, or down — and for how long.' },
      { metric: '30%', label: 'Downtime Reduction', description: 'Typical reduction in unplanned downtime within the first 90 days.' },
      { metric: 'Zero', label: 'Manual Logging', description: 'Eliminate paper-based data collection. Automatic, accurate, continuous.' },
    ],
    features: [
      { title: 'Live Production Dashboard', description: 'A real-time view of every machine\'s status — running, idle, down, changeover — with automatic timestamps.' },
      { title: 'Automatic OEE Calculation', description: 'Availability, Performance, and Quality calculated automatically from machine signals. No more clipboards.' },
      { title: 'Downtime Pareto Analysis', description: 'Automatically categorise and rank downtime reasons to focus improvement efforts where they matter most.' },
      { title: 'Shift Reports', description: 'Automated end-of-shift reports comparing targets to actuals, ready for handover.' },
    ],
    cta: 'See how Oplytics transforms your production floor',
    roiExample: { scenario: '10 machines averaging 45 minutes of untracked downtime per shift', saving: '£180,000', period: 'per year' },
  },
  it: {
    slug: 'it',
    title: 'IT Director / Manager',
    subtitle: 'Secure, Standards-Based Industrial Connectivity',
    tagline: 'A solution that works with your existing infrastructure, not against it. Secured by design and deployed without disrupting your network.',
    painPoints: [
      { title: 'Shadow IT on the Shop Floor', description: 'Operations teams are buying consumer-grade IoT devices and connecting them to your network without oversight or security review.' },
      { title: 'Integration Nightmares', description: 'Every new operational tool requires custom integration work, proprietary protocols, and yet another vendor to manage.' },
      { title: 'OT/IT Convergence Risk', description: 'Connecting operational technology to your corporate network introduces new attack vectors and compliance concerns.' },
    ],
    benefits: [
      { metric: 'Zero', label: 'New Licenses', description: 'No additional enterprise software licences required — works within your existing stack.' },
      { metric: 'TLS 1.3', label: 'Encryption', description: 'All data encrypted in transit and at rest using industry-standard protocols.' },
      { metric: '100%', label: 'IT Controlled', description: 'Full visibility and control over every device, data flow, and user access.' },
    ],
    features: [
      { title: 'Standards-Based Architecture', description: 'Built on open protocols (MQTT, OPC-UA, REST) — no vendor lock-in, no proprietary middleware.' },
      { title: 'Network Segmentation Ready', description: 'Edge gateways support VLAN isolation and can operate on a dedicated OT network with controlled cloud egress.' },
      { title: 'MQTT + OPC UA Standards', description: 'Industry-standard protocols ensure interoperability and avoid vendor lock-in.' },
      { title: 'Role-Based Access Control', description: 'Granular permissions aligned with your Active Directory groups and security policies.' },
    ],
    cta: 'See how Oplytics integrates with your IT infrastructure',
    roiExample: { scenario: 'Eliminating 3 separate operational software licences and their integration overhead', saving: '£85,000', period: 'per year' },
  },
  safety: {
    slug: 'safety',
    title: 'Health & Safety Manager',
    subtitle: 'Proactive Safety Through Real-Time Machine Intelligence',
    tagline: 'Move from reactive incident reporting to proactive risk prevention. Know when guards are bypassed, doors are open, and machines are operating outside safe parameters — instantly.',
    painPoints: [
      { title: 'Reactive Safety Culture', description: 'You only learn about safety issues after an incident or near-miss. Prevention relies on manual audits and human vigilance.' },
      { title: 'Guard & Interlock Bypass', description: 'Safety guards and interlocks are bypassed to maintain production, but you have no visibility into when or how often.' },
      { title: 'Compliance Documentation', description: 'Proving compliance with HSE regulations requires extensive manual record-keeping that\'s prone to gaps and errors.' },
    ],
    benefits: [
      { metric: 'Instant', label: 'Safety Alerts', description: 'Real-time notifications when safety parameters are breached or guards are bypassed.' },
      { metric: '100%', label: 'Audit Trail', description: 'Continuous, timestamped digital records of every safety-critical event.' },
      { metric: 'Proactive', label: 'Risk Prevention', description: 'Identify patterns and trends before they become incidents.' },
    ],
    features: [
      { title: 'Guard & Door Monitoring', description: 'Digital signals from safety interlocks, guard doors, and E-stops are captured and logged continuously.' },
      { title: 'Abnormal Operation Alerts', description: 'Automatic alerts when machines operate outside defined safe parameters — temperature, speed, vibration.' },
      { title: 'Safety Event Timeline', description: 'A complete, searchable timeline of every safety-related event for HSE audits and investigations.' },
      { title: 'SQDCP Integration', description: 'Safety metrics feed directly into the Oplytics SQDCP board for daily management review.' },
    ],
    cta: 'See how Oplytics strengthens your safety culture',
    roiExample: { scenario: 'Preventing a single RIDDOR-reportable incident (average HSE fine + lost time)', saving: '£250,000+', period: 'per incident avoided' },
  },
  improvement: {
    slug: 'improvement',
    title: 'Continuous Improvement Manager',
    subtitle: 'Data-Driven Kaizen, Not Guesswork',
    tagline: 'Replace assumptions with evidence. Oplytics Connect gives you the granular, real-time data you need to identify the biggest losses, run targeted improvements, and prove the results.',
    painPoints: [
      { title: 'Improvement Without Evidence', description: 'CI projects are selected based on opinion rather than data. You\'re solving the loudest problem, not the biggest one.' },
      { title: 'Unmeasurable Results', description: 'After running a Kaizen event, you can\'t definitively prove the improvement because the baseline data was unreliable.' },
      { title: 'Sustaining Gains', description: 'Improvements erode over time because there\'s no continuous monitoring to detect regression.' },
    ],
    benefits: [
      { metric: 'Automatic', label: 'Loss Analysis', description: 'The Six Big Losses are quantified automatically from machine signals — no manual data collection.' },
      { metric: 'Before/After', label: 'Proof of Impact', description: 'Statistically valid before-and-after comparisons for every improvement project.' },
      { metric: 'Continuous', label: 'Sustain Monitoring', description: 'Automated alerts when performance regresses below the new standard.' },
    ],
    features: [
      { title: 'OEE Waterfall Analysis', description: 'Automatically decompose OEE losses into Availability, Performance, and Quality to pinpoint the biggest opportunities.' },
      { title: 'Pareto Charts', description: 'Live Pareto analysis of downtime reasons, speed losses, and quality defects — updated in real time.' },
      { title: 'Kaizen Tracking', description: 'Link improvement projects to specific machines and track the measurable impact over time.' },
      { title: 'Hoshin Kanri Integration', description: 'Connect shop-floor improvements to strategic objectives through the Oplytics Policy Deployment module.' },
    ],
    cta: 'See how Oplytics powers data-driven improvement',
    roiExample: { scenario: 'Identifying and eliminating the top 3 downtime reasons across 5 production lines', saving: '£320,000', period: 'per year' },
  },
  maintenance: {
    slug: 'maintenance',
    title: 'Maintenance Manager / Engineer',
    subtitle: 'From Reactive Repairs to Predictive Maintenance',
    tagline: 'Stop waiting for machines to break. Oplytics Connect monitors current draw, vibration patterns, and operating parameters to tell you what needs attention — before it fails.',
    painPoints: [
      { title: 'Firefighting Mode', description: 'Your team spends 80% of their time on emergency breakdowns and only 20% on planned maintenance.' },
      { title: 'No Early Warning', description: 'Machines give warning signs before they fail — increased current draw, temperature rise, vibration changes — but you can\'t see them.' },
      { title: 'Spare Parts Guesswork', description: 'Without usage data, you either overstock expensive spares or face extended downtime waiting for parts.' },
    ],
    benefits: [
      { metric: '70%', label: 'Fewer Breakdowns', description: 'Typical reduction in unplanned breakdowns within 6 months of deployment.' },
      { metric: 'Real-Time', label: 'Machine Health', description: 'Continuous monitoring of current, temperature, and vibration for every connected asset.' },
      { metric: '40%', label: 'Parts Cost Reduction', description: 'Optimise spare parts inventory based on actual usage data and predicted failure patterns.' },
    ],
    features: [
      { title: 'Condition Monitoring', description: 'Continuous tracking of current draw, temperature, and vibration to detect degradation before failure.' },
      { title: 'Maintenance Alerts', description: 'Automatic notifications when operating parameters drift outside normal ranges — hours or days before a breakdown.' },
      { title: 'Runtime & Cycle Tracking', description: 'Accurate machine runtime and cycle counts for time-based and usage-based maintenance scheduling.' },
      { title: 'Maintenance History', description: 'A complete digital log of every maintenance event, linked to machine performance data for root cause analysis.' },
    ],
    cta: 'See how Oplytics transforms your maintenance strategy',
    roiExample: { scenario: 'Preventing 2 major unplanned breakdowns per month (average 4 hours each at £150/hour + parts)', saving: '£216,000', period: 'per year' },
  },
};

/** Ordered list of role slugs for prev/next navigation */
export const roleOrder = ['ceo', 'factory-manager', 'it', 'safety', 'improvement', 'maintenance'];

/** Short labels for role cards */
export const roleLabels: Record<string, { short: string; icon: string; color: string }> = {
  ceo: { short: 'CEO / MD', icon: 'briefcase', color: '#8C34E9' },
  'factory-manager': { short: 'Factory Manager', icon: 'factory', color: '#1DB8CE' },
  it: { short: 'IT Director', icon: 'server', color: '#3B82F6' },
  safety: { short: 'H&S Manager', icon: 'shield', color: '#EF4444' },
  improvement: { short: 'CI Manager', icon: 'trending-up', color: '#F59E0B' },
  maintenance: { short: 'Maintenance', icon: 'wrench', color: '#22C55E' },
};
