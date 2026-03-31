/**
 * Policy Deployment Demo — Screenshot pending CDN upload
 *
 * A real screenshot (X-Matrix, The Vita Group) was captured in PR #68 but only
 * committed as a manuscdn.com session-file URL which has since expired. The
 * screenshot needs to be re-uploaded to the CloudFront CDN and the src below
 * updated. Tracking: replace this placeholder once the permanent URL is known.
 */
import { Target } from 'lucide-react';

export default function PolicyDeploymentDemo() {
  return (
    <div className="aspect-video flex flex-col items-center justify-center p-8 text-center relative">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(#F59E0B 1px, transparent 1px), linear-gradient(90deg, #F59E0B 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-6 border border-[#F59E0B]/20">
          <Target className="w-7 h-7 text-[#F59E0B]" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Montserrat' }}>
          Screenshot Coming Soon
        </h3>
        <p className="text-sm text-[#8890A0] max-w-md mx-auto">
          A live walkthrough of the Policy Deployment X-Matrix and bowling charts will be available here shortly.
        </p>
      </div>
    </div>
  );
}
