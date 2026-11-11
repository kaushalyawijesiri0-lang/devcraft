import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ContinueCard } from '../modules/landing-dashboard/components/dashboard/ContinueCard';
import { StreakCard } from '../modules/landing-dashboard/components/dashboard/StreakCard';
import { StatsStrip } from '../modules/landing-dashboard/components/dashboard/StatsStrip';
import { LearningHistory } from '../modules/landing-dashboard/components/dashboard/LearningHistory';
import { RecommendationCard } from '../modules/landing-dashboard/components/dashboard/RecommendationCard';
import { fadeUp, stagger } from '../modules/landing-dashboard/utils/motion';
import { getStoredUser } from '../utils/auth';

export function LaunchpadDashboard() {
  const [userName, setUserName] = useState(() => getStoredUser().firstName);

  useEffect(() => {
    const sync = () => setUserName(getStoredUser().firstName);
    window.addEventListener('devcraft_user_changed', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('devcraft_user_changed', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);



  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger(0.05, 0.06)}
        initial="hidden"
        animate="show"
        className="w-full"
      >
        <motion.div variants={fadeUp}>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Welcome back, {userName}
          </h1>
          <p className="mt-1.5 text-muted">
            You’re making progress. Let’s take the next step.
          </p>
        </motion.div>

        {/* Continue & Streak cards */}
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <motion.div variants={fadeUp}>
            <ContinueCard />
          </motion.div>
          <motion.div variants={fadeUp}>
            <StreakCard />
          </motion.div>
        </div>

        {/* Stats Strip */}
        <motion.div variants={fadeUp} className="mt-5">
          <StatsStrip />
        </motion.div>

        {/* Learning History & Recommendation */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <motion.div variants={fadeUp}>
            <LearningHistory />
          </motion.div>
          <motion.div variants={fadeUp}>
            <RecommendationCard />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
