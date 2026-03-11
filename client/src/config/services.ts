/**
 * TASK-01: Service Status Configuration
 * Single source of truth for all service statuses across the marketing site.
 * Controls hero badges, CTAs, language, card displays, AI badges, and ordering on all pages.
 *
 * ARCHITECTURE NOTE:
 *   - Services are ordered: Policy Deployment, SQDCP Hub, OEE Manager, SmartConnect
 *     then a delineation line, then the 3 "hub" services: Quality Manager, Safety Manager, Certification Manager.
 *   - `category`: 'core' = primary platform services | 'hub' = hub services (after divider)
 *   - `aiFeatures`: array of AI capabilities built into each service (for AI badge/callout)
 */

export type ServiceStatus = 'live' | 'in-development';
export type ServiceCategory = 'core' | 'hub';

export interface AIFeature {
  title: string;
  description: string;
}

export interface ServiceConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: ServiceStatus;
  slug: string;
  icon: string; // lucide icon name
  accentColor: string;
  category: ServiceCategory;
  subdomain?: string;
  heroImage?: string;
  aiFeatures: AIFeature[];
}

export const services: ServiceConfig[] = [
  // ─── CORE SERVICES (above delineation line) ───
  {
    id: 'policy-deployment',
    name: 'Policy Deployment',
    tagline: 'Align strategy to execution',
    description: 'Hoshin Kanri and X-matrix planning. Cascade strategic objectives through every level of your organisation.',
    status: 'live',
    slug: 'policy-deployment',
    icon: 'Target',
    accentColor: '#F59E0B',
    category: 'core',
    aiFeatures: [
      { title: 'AI Strategy Alignment', description: 'Machine learning identifies misalignment between strategic objectives and operational KPIs, suggesting corrective cascading adjustments.' },
      { title: 'Predictive Goal Tracking', description: 'AI forecasts whether current trajectories will meet targets and flags at-risk objectives before they slip.' },
    ],
  },
  {
    id: 'sqdcp-hub',
    name: 'SQDCP Hub',
    tagline: 'Daily management boards, digitised',
    description: 'Digital SQDCP boards that drive daily accountability. Safety, Quality, Delivery, Cost, and People metrics at a glance for every team.',
    status: 'live',
    slug: 'sqdcp-hub',
    icon: 'LayoutGrid',
    accentColor: '#1DB8CE',
    category: 'core',
    aiFeatures: [
      { title: 'AI Anomaly Detection', description: 'Automatically flags unusual metric patterns across Safety, Quality, Delivery, Cost, and People dimensions before they escalate.' },
      { title: 'Smart Trend Summaries', description: 'AI generates natural-language daily summaries highlighting key changes, emerging risks, and improvement opportunities.' },
    ],
  },
  {
    id: 'oee-manager',
    name: 'OEE Manager',
    tagline: 'Real-time equipment effectiveness tracking',
    description: 'Monitor Overall Equipment Effectiveness in real-time. Track availability, performance, and quality metrics across your entire production line.',
    status: 'live',
    slug: 'oee-manager',
    icon: 'Gauge',
    accentColor: '#8C34E9',
    subdomain: 'oeemanager.oplytics.digital',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031899852/TqfjMS5mXpLDBG5ze8gzfz/hero-oee-Th2ta3q9vx8SDihX3BBphp.webp',
    category: 'core',
    aiFeatures: [
      { title: 'AI Loss Classification', description: 'Automatically classifies downtime events and speed losses using machine learning, eliminating manual categorisation errors.' },
      { title: 'Predictive Maintenance Alerts', description: 'AI analyses OEE patterns to predict equipment failures before they occur, reducing unplanned downtime.' },
      { title: 'Smart Root Cause Analysis', description: 'AI correlates OEE drops with process variables, operator shifts, and material batches to surface root causes.' },
    ],
  },
  {
    id: 'smartconnect',
    name: 'SmartConnect',
    tagline: 'Integrate machines, sensors, and systems',
    description: 'Industrial IoT connectivity layer. Connect PLCs, sensors, and legacy systems to the Oplytics platform with zero-code configuration.',
    status: 'in-development',
    slug: 'smartconnect',
    icon: 'Plug',
    accentColor: '#1DB8CE',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031899852/TqfjMS5mXpLDBG5ze8gzfz/hero-connect-BLrEbXt4nBnvZdECMPpzLm.webp',
    category: 'core',
    aiFeatures: [
      { title: 'AI Signal Mapping', description: 'Machine learning auto-detects and maps machine signals to Oplytics data points, reducing configuration time by up to 80%.' },
      { title: 'Intelligent Edge Processing', description: 'AI at the edge filters noise, detects anomalies in raw sensor data, and optimises data transmission to the cloud.' },
    ],
  },

  {
    id: 'action-manager',
    name: 'Action Manager',
    tagline: 'Track every action to closure',
    description: 'Capture, assign, and track corrective and preventive actions from any source. Ensure nothing falls through the cracks.',
    status: 'live',
    slug: 'action-manager',
    icon: 'ClipboardCheck',
    accentColor: '#22C55E',
    category: 'core',
    aiFeatures: [
      { title: 'AI Priority Scoring', description: 'Machine learning scores and prioritises actions based on impact, urgency, and historical closure patterns.' },
      { title: 'Smart Escalation', description: 'AI monitors action ageing and predicts which items are at risk of missing deadlines, triggering proactive escalation.' },
    ],
  },

  // ─── HUB SERVICES (below delineation line) ───
  {
    id: 'quality-manager',
    name: 'Quality Manager',
    tagline: 'End-to-end quality assurance',
    description: 'Non-conformance tracking, CAPA management, audit scheduling, and quality metrics dashboards.',
    status: 'in-development',
    slug: 'quality-manager',
    icon: 'CheckCircle',
    accentColor: '#22C55E',
    category: 'hub',
    aiFeatures: [
      { title: 'AI Defect Pattern Recognition', description: 'Machine learning identifies recurring defect patterns across products, lines, and suppliers to prevent repeat non-conformances.' },
      { title: 'Smart CAPA Recommendations', description: 'AI suggests corrective actions based on historical effectiveness data and similar past incidents.' },
    ],
  },
  {
    id: 'safety-manager',
    name: 'Safety Manager',
    tagline: 'Proactive safety culture, powered by data',
    description: 'Incident reporting, hazard tracking, safety observations, and compliance management in one unified platform.',
    status: 'in-development',
    slug: 'safety-manager',
    icon: 'Shield',
    accentColor: '#EF4444',
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663031899852/TqfjMS5mXpLDBG5ze8gzfz/hero-safety-6GF7P32Rwd5xBFHfEtSxvq.webp',
    category: 'hub',
    aiFeatures: [
      { title: 'AI Risk Prediction', description: 'Predictive models analyse incident history, near-miss data, and environmental factors to forecast high-risk areas and times.' },
      { title: 'Smart Observation Analysis', description: 'Natural language processing categorises safety observations and extracts actionable insights from free-text reports.' },
    ],
  },
  {
    id: 'certification-manager',
    name: 'Certification Manager',
    tagline: 'Stay audit-ready, always',
    description: 'Manage ISO, IATF, and other certification requirements. Document control, audit trails, and compliance tracking.',
    status: 'in-development',
    slug: 'certification-manager',
    icon: 'Award',
    accentColor: '#F97316',
    category: 'hub',
    aiFeatures: [
      { title: 'AI Compliance Gap Analysis', description: 'Automatically scans your documentation and processes against standard requirements to identify gaps before auditors do.' },
      { title: 'Smart Document Classification', description: 'AI categorises and tags documents by standard, clause, and revision status for instant retrieval during audits.' },
    ],
  },
];

// Derived lists
export const coreServices = services.filter(s => s.category === 'core');
export const hubServices = services.filter(s => s.category === 'hub');
export const liveServices = services.filter(s => s.status === 'live');
export const inDevServices = services.filter(s => s.status === 'in-development');

export function getServiceBySlug(slug: string): ServiceConfig | undefined {
  return services.find(s => s.slug === slug);
}

export function getServiceStatusLabel(status: ServiceStatus): string {
  return status === 'live' ? 'Live' : 'In Development';
}

export function getServiceStatusColor(status: ServiceStatus): string {
  return status === 'live' ? '#22C55E' : '#8C34E9';
}
