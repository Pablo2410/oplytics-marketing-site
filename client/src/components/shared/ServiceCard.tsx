/**
 * TASK-05/36: ServiceCard Component
 * Design: "Neon Operations" — card with dashboard preview, status badge, AI badge, glow on hover
 *
 * Shows real dashboard screenshot (demoImage) at top of card.
 * Service name, tagline, status badge, AI badge.
 * Link to service solution page.
 * Consistent card sizing regardless of content length.
 */
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import type { ServiceConfig } from '@/config/services';
import { getServiceStatusLabel, getServiceStatusColor } from '@/config/services';
import { AIBadgeInline } from './AIBadge';

interface ServiceCardProps {
  service: ServiceConfig;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const statusColor = getServiceStatusColor(service.status);
  const statusLabel = getServiceStatusLabel(service.status);

  return (
    <Link href={`/solutions/${service.slug}`}>
      <div
        className="group relative h-full rounded-lg border border-[#1E2738] bg-[#0D1220] hover:border-opacity-60 transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden"
        style={{
          borderColor: '#1E2738',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = service.accentColor + '40';
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${service.accentColor}15`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = '#1E2738';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 z-10"
          style={{ background: service.accentColor }}
        />

        {/* Dashboard Screenshot Preview */}
        {service.demoImage && (
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#080C16]">
            <img
              src={service.demoImage}
              alt={`${service.name} dashboard preview`}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient fade at bottom for smooth transition to card content */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0D1220] to-transparent" />
          </div>
        )}

        {/* Card Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Status + AI Badges */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase"
              style={{
                background: statusColor + '15',
                color: statusColor,
                border: `1px solid ${statusColor}30`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor }} />
              {statusLabel}
            </span>
            {service.aiFeatures.length > 0 && <AIBadgeInline />}
          </div>

          {/* Service Name */}
          <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#C084FC] transition-colors" style={{ fontFamily: 'Montserrat' }}>
            {service.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#8890A0] leading-relaxed flex-1 mb-3">
            {service.description}
          </p>

          {/* Link */}
          <div className="flex items-center gap-1 text-xs font-semibold text-[#8C34E9] group-hover:text-[#C084FC] transition-colors">
            Learn more
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
