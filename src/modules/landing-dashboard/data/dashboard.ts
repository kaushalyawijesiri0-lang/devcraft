import {
  HomeIcon,
  MapIcon,
  GraduationCapIcon,
  BugIcon,
  NewspaperIcon,
  UsersIcon,
  UserRoundIcon,
  TrophyIcon,
  SettingsIcon,
  CircleHelpIcon,
  StarIcon,
  BookOpenIcon,
  BoxIcon,
  FileCode2Icon,
  BracesIcon,
  AtomIcon } from
"lucide-react";

export const primaryNav = [
{ id: "launchpad", label: "Launchpad", icon: HomeIcon },
{ id: "guided-workspace", label: "Guided Workspace", icon: MapIcon },
{ id: "theory-dojo", label: "Theory Dojo", icon: GraduationCapIcon },
{ id: "debug-arena", label: "Debug Arena", icon: BugIcon },
{ id: "blogs", label: "Blogs", icon: NewspaperIcon },
{ id: "community", label: "Community", icon: UsersIcon },
{ id: "mentorship", label: "Mentorship", icon: UserRoundIcon },
{ id: "leaderboard", label: "Leaderboard", icon: TrophyIcon }];


export const secondaryNav = [
{ id: "settings", label: "Settings", icon: SettingsIcon },
{ id: "help", label: "Help", icon: CircleHelpIcon }];


export const currentLesson = {
  track: "Theory Dojo · React Fundamentals",
  title: "Components and Props",
  lesson: "Lesson 4 of 8",
  completed: 3,
  total: 8
};

export const weekStreak = [
{ day: "Mon", state: "done" },
{ day: "Tue", state: "done" },
{ day: "Wed", state: "done" },
{ day: "Thu", state: "done" },
{ day: "Fri", state: "done" },
{ day: "Today", state: "today" },
{ day: "Sun", state: "upcoming" }] as
const;

export const stats = [
{ label: "Total XP", value: 1250, icon: StarIcon },
{ label: "Lessons completed", value: 12, icon: BookOpenIcon },
{ label: "Projects completed", value: 2, icon: BoxIcon }];


export const history = [
{
  title: "JavaScript Variables",
  meta: "Theory Dojo · Yesterday",
  status: "completed",
  icon: FileCode2Icon
},
{
  title: "Array Methods Puzzle",
  meta: "Theory Dojo · Attempt 2 · Yesterday",
  status: "practice",
  icon: BracesIcon
},
{
  title: "React Profile Card",
  meta: "Guided Workspace · 2 days ago",
  status: "completed",
  icon: AtomIcon
}] as
const;

export const recommendation = {
  context: "Based on your last attempt",
  title: "Strengthen your array skills",
  description: "Practise map() and filter() with a fresh set of code puzzles.",
  meta: "Array Methods · Last attempt: 2"
};