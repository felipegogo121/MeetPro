import React from "react";
import { motion } from "framer-motion";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

import { StatsCard } from "../../components/stats-card";
import { MeetingActivityChart } from "../../components/meeting-activity-chart";
import { MeetingDurationChart } from "../../components/meeting-duration-chart";
import { UpcomingMeetings } from "../../components/upcoming-meetings";
import { RecentRecordings } from "../../components/recent-recordings";
import { AIInsightsPreview } from "../../components/ai-insights-preview";

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold">Welcome back, Alex</h1>
          <p className="text-foreground-500">Here's what's happening with your meetings today</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Tabs 
            aria-label="Dashboard tabs" 
            selectedKey={selectedTab} 
            onSelectionChange={(key) => setSelectedTab(key as string)}
            color="primary"
            variant="light"
            size="sm"
            className="w-full sm:w-auto"
          >
            <Tab key="overview" title="Overview" />
            <Tab key="analytics" title="Analytics" />
            <Tab key="admin" title="Admin" />
          </Tabs>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Meetings"
          value="128"
          icon="lucide:video"
          trend={{ value: 12, isPositive: true }}
          color="primary"
          delay={0}
        />
        <StatsCard
          title="Meeting Hours"
          value="87.5"
          icon="lucide:clock"
          trend={{ value: 8, isPositive: true }}
          color="secondary"
          delay={1}
        />
        <StatsCard
          title="Recordings"
          value="96"
          icon="lucide:film"
          trend={{ value: 5, isPositive: true }}
          color="success"
          delay={2}
        />
        <StatsCard
          title="AI Insights"
          value="243"
          icon="lucide:lightbulb"
          trend={{ value: 18, isPositive: true }}
          color="warning"
          delay={3}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MeetingActivityChart />
        <MeetingDurationChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingMeetings />
        <AIInsightsPreview />
      </div>
      
      <RecentRecordings />
    </div>
  );
};

export default Dashboard;