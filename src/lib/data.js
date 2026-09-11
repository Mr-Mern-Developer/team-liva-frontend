/**
 * Static content that isn't worth a database round-trip, plus fallbacks the
 * roster/services components render when the API is unreachable.
 */

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Solutions' },
  { href: '/talent', label: 'Talent Roster' },
  { href: '/about', label: 'About Us' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

export const SERVICE_OPTIONS = [
  'Web Development',
  'Graphic Design',
  'Healthcare Staffing',
  'Medical Billing (RCM)',
  'Customer Support BPO',
  'Back-Office Pods',
];

export const TEAM_SIZE_OPTIONS = [
  'Single Project / Sprint',
  '1 - 3 Dedicated Professionals',
  '4 - 10 Members Managed Pod',
  '10+ Enterprise Scaled Unit',
];

export const POSITION_OPTIONS = [
  'Healthcare / Clinical Ops',
  'Medical Billing (RCM)',
  'Customer Support / BPO',
  'Web Developer',
  'Graphic / UI-UX Designer',
  'Other',
];

export const EXPERIENCE_OPTIONS = [
  '0 - 1 years',
  '1 - 3 years',
  '3 - 5 years',
  '5 - 8 years',
  '8+ years',
];

export const TALENT_TYPES = ['All', 'Healthcare', 'BPO & RCM', 'Tech & Web', 'Design Solutions'];

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Scope & Match',
    desc: 'Analyze technical, design, and clinical workflows with our operational architects.',
    time: 'Hour 0 - 12',
  },
  {
    step: '02',
    title: 'Candidate Roster',
    desc: 'Review pre-vetted professionals matching your exact skill requirements.',
    time: 'Hour 12 - 24',
  },
  {
    step: '03',
    title: 'Security & Setup',
    desc: 'Secure encrypted hardware workstations and NDA/BAA execution.',
    time: 'Hour 24 - 36',
  },
  {
    step: '04',
    title: 'Live Launch',
    desc: 'Managed squad commences shift coverage under continuous SLA audit.',
    time: 'Hour 72 Live',
  },
];

export const LEADERSHIP = [
  {
    name: 'Mahir Al Shahiar',
    role: 'Co-Founder & Chief Growth Officer',
    desc: '5+ years scaling global operations and enterprise workforce solutions across US and international markets.',
    avatar: 'https://i.ibb.co.com/27vJDXH8/MAS.jpg',
  },
  {
    name: 'Fojlay Rabbi',
    role: 'Co-Founder & Chief Strategy Officer',
    desc: 'Pioneered secure BPO workflows and HIPAA-aligned recruitment models for major healthcare systems.',
    avatar: 'https://i.ibb.co.com/gbFFrrrt/fr.jpg',
  },
  {
    name: 'Aman Ullah',
    role: 'Co-Founder & Chief Operating Officer',
    desc: 'Oversees the 72-hour deployment pipeline, SLA audits, and cross-border delivery infrastructure.',
    avatar: 'https://i.ibb.co.com/YTBDGJ8X/Aman.jpg',
  },
  {
    name: 'Masfia T.',
    role: 'Chief Marketing Officer',
    desc: 'Directs global brand expansion, digital agency solutions, and client growth partnerships.',
    avatar: 'https://i.ibb.co.com/mVRJCmFD/Mayesha.jpg',
  },
  {
    name: 'Shishir A.',
    role: 'Legal Advisor',
    desc: 'Provides specialized support across contracts, employment law, and compliance.',
    avatar: 'https://i.ibb.co.com/kgHFZYP2/shishir.jpg',
  },
  {
    name: 'Janine T.',
    role: 'Business Development Executive',
    desc: 'Generates leads and develops long-term business partnerships.',
    avatar: 'https://i.ibb.co.com/2YKGVsFx/Janine.jpg',
  },
  {
    name: 'Sreejon M.',
    role: 'Graphic Designer',
    desc: 'Creates visual content for marketing, branding, and company communications.',
    avatar: 'https://i.ibb.co.com/tMqxFV28/Sreejon.jpg',
  },
];

export const TRUSTED_BY = ['LEVER', 'gusto', 'HireVue', '_zapier', 'Glossier.', 'Buffer'];

/* ------------------------------- fallbacks -------------------------------- */

export const FALLBACK_SERVICES = [
  {
    _id: 'bpo',
    slug: 'bpo',
    title: 'Managed Back-Office & BPO Pods',
    icon: 'fa-headset',
    desc: '24/7 omnichannel support, order management, and secure quality audit workflows.',
    sla: '99.8%',
    speed: '72 Hours',
    savings: '58%',
    banner:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'staffing',
    slug: 'staffing',
    title: 'Healthcare Remote Staffing',
    icon: 'fa-user-nurse',
    desc: 'Pre-vetted clinical ops, care coordinators, and telehealth liaisons for US systems.',
    sla: '99.9%',
    speed: '24 Hours',
    savings: '65%',
    banner:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'web',
    slug: 'web',
    title: 'Web Development Solutions',
    icon: 'fa-laptop-code',
    desc: 'Custom web applications, secure enterprise portals, and scalable cloud architectures.',
    sla: '100%',
    speed: '72 Hours',
    savings: '55%',
    banner:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'design',
    slug: 'design',
    title: 'Graphic Designing Solutions',
    icon: 'fa-palette',
    desc: 'High-impact brand identities, UI/UX systems, marketing collateral, and digital assets.',
    sla: '99.5%',
    speed: '24 Hours',
    savings: '60%',
    banner:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
  },
];

export const FALLBACK_TALENTS = [
  {
    _id: 't1',
    name: 'Dr. Elena Rostova',
    role: 'Clinical Operations Lead',
    type: 'Healthcare',
    rate: 24,
    exp: '8+ yrs',
    rating: 4.9,
    certs: ['HIPAA Certified', 'RN BSN'],
    status: 'Available Now',
    avatar:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    location: 'US-Eastern Time',
    skills: { ClinicalOps: 95, HIPAA: 100, EHR: 90, Coordination: 92, SLA: 98 },
  },
  {
    _id: 't2',
    name: 'Marcus Vance',
    role: 'Medical Billing & RCM Specialist',
    type: 'BPO & RCM',
    rate: 16,
    exp: '6 yrs',
    rating: 5,
    certs: ['Kareo Master', 'Epic Systems'],
    status: 'Available Now',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    location: 'Central Time',
    skills: { ClinicalOps: 60, HIPAA: 98, EHR: 95, Coordination: 85, SLA: 99 },
  },
  {
    _id: 't3',
    name: 'Sofia Chen',
    role: 'Senior Full-Stack Developer',
    type: 'Tech & Web',
    rate: 28,
    exp: '7 yrs',
    rating: 4.9,
    certs: ['AWS Certified', 'Next.js'],
    status: 'In Demand',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    location: 'Pacific Time',
    skills: { ClinicalOps: 40, HIPAA: 90, EHR: 88, Coordination: 70, SLA: 96 },
  },
  {
    _id: 't4',
    name: 'Lucas Brody',
    role: 'Senior UI/UX & Graphic Designer',
    type: 'Design Solutions',
    rate: 22,
    exp: '6 yrs',
    rating: 4.9,
    certs: ['Figma Master', 'Brand Systems'],
    status: 'Available Now',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    location: 'Eastern Time',
    skills: { ClinicalOps: 30, HIPAA: 80, EHR: 75, Coordination: 88, SLA: 95 },
  },
];
