import {
  HouseIcon,
  MapIcon,
  GraduationCapIcon,
  BugIcon,
  NewspaperIcon,
  UsersIcon,
  UserRoundIcon,
  TrophyIcon,
  SettingsIcon,
  CircleHelpIcon,
  CompassIcon,
  NotebookPenIcon,
  BookmarkIcon,
  BadgeCheckIcon,
  MessagesSquareIcon,
  FileTextIcon,
  LayersIcon,
  ShieldCheckIcon,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  to: string;
  icon: any;
  match: (path: string) => boolean;
}

export const primaryNav: NavItem[] = [
  {
    id: 'launchpad',
    label: 'Launchpad',
    to: '/dashboard',
    icon: HouseIcon,
    match: (p) => p === '/dashboard' || p === '/launchpad' || p === '/app/launchpad',
  },
  {
    id: 'guided',
    label: 'Guided Workspace',
    to: '/guided',
    icon: MapIcon,
    match: (p) => p.startsWith('/guided') || p.startsWith('/workspace') || p.startsWith('/app/guided'),
  },
  {
    id: 'theory-dojo',
    label: 'Theory Dojo',
    to: '/theory-dojo',
    icon: GraduationCapIcon,
    match: (p) => p.startsWith('/theory-dojo') || p.startsWith('/app/theory-dojo'),
  },
  {
    id: 'debug-arena',
    label: 'Debug Arena',
    to: '/arena',
    icon: BugIcon,
    match: (p) => p.startsWith('/arena') || p === '/debug-arena' || p.startsWith('/app/debug-arena'),
  },
  {
    id: 'blogs',
    label: 'Blogs',
    to: '/blogs',
    icon: NewspaperIcon,
    match: (p) => (p.startsWith('/blogs') || p.startsWith('/app/blogs')) && !p.includes('/mentor'),
  },
  {
    id: 'community',
    label: 'Community',
    to: '/community',
    icon: UsersIcon,
    match: (p) => p.startsWith('/community') || p.startsWith('/app/community'),
  },
  {
    id: 'mentorship',
    label: 'Mentorship',
    to: '/mentorship',
    icon: UserRoundIcon,
    match: (p) => p.startsWith('/mentorship') || p.includes('/mentor') || p.startsWith('/app/mentorship'),
  },
  {
    id: 'leaderboard',
    label: 'Leaderboard',
    to: '/leaderboard',
    icon: TrophyIcon,
    match: (p) => p.startsWith('/leaderboard') || p.startsWith('/app/leaderboard'),
  },
];

export const secondaryNav: NavItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    to: '/settings',
    icon: SettingsIcon,
    match: (p) => p === '/settings' || p === '/app/settings',
  },
  {
    id: 'help',
    label: 'Help',
    to: '/help',
    icon: CircleHelpIcon,
    match: (p) => p === '/help' || p === '/app/help',
  },
];

export const guidedTabs = [
  { id: 'explore', label: 'Explore Projects', icon: FileTextIcon, to: '/guided' },
  { id: 'mine', label: 'My Projects', icon: LayersIcon, to: '/guided/mern-task-manager/workspace' },
  { id: 'saved', label: 'Saved Projects', icon: BookmarkIcon, to: '/guided?view=saved' },
  { id: 'interactive', label: 'Express API Demo', icon: ShieldCheckIcon, to: '/workspace' },
];

export const blogTabs = [
  { id: 'explore', label: 'Explore Blogs', icon: CompassIcon, to: '/blogs' },
  { id: 'write', label: 'Write Blog', icon: NotebookPenIcon, to: '/blogs/write' },
  { id: 'mine', label: 'My Blogs', icon: LayersIcon, to: '/blogs/mine' },
  { id: 'saved', label: 'Saved Blogs', icon: BookmarkIcon, to: '/blogs/saved' },
  { id: 'mentor', label: 'Mentor Verification', icon: BadgeCheckIcon, to: '/blogs/mentor' },
];

export const communityTabs = [
  { id: 'explore', label: 'Explore Communities', icon: CompassIcon, to: '/community' },
  { id: 'mine', label: 'My Communities', icon: UsersIcon, to: '/community/mine' },
  { id: 'chat', label: 'Community Chat', icon: MessagesSquareIcon, to: '/community/chat' },
  { id: 'create', label: 'Create Community', icon: LayersIcon, to: '/community/create' },
];
