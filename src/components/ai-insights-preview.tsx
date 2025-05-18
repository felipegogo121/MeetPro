import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Button, Progress, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { addToast } from "@heroui/react";

interface Insight {
  id: string;
  type: "sentiment" | "keywords" | "action-items" | "summary";
  title: string;
  description: string;
  icon: string;
  color: "primary" | "secondary" | "success" | "warning";
}

const insights: Insight[] = [
  {
    id: "i1",
    type: "sentiment",
    title: "Positive Team Sentiment",
    description: "Team morale is high with 85% positive sentiment detected in recent meetings.",
    icon: "lucide:smile",
    color: "success"
  },
  {
    id: "i2",
    type: "keywords",
    title: "Trending Topics",
    description: "Key topics: product roadmap, Q3 goals, customer feedback, design system.",
    icon: "lucide:hash",
    color: "primary"
  },
  {
    id: "i3",
    type: "action-items",
    title: "Action Items",
    description: "12 action items detected across 5 meetings, 7 still pending completion.",
    icon: "lucide:check-square",
    color: "warning"
  },
  {
    id: "i4",
    type: "summary",
    title: "Meeting Efficiency",
    description: "Meetings are 23% more focused compared to last month with less off-topic discussion.",
    icon: "lucide:bar-chart",
    color: "secondary"
  }
];

export const AIInsightsPreview: React.FC = () => {
  const handleViewInsights = () => {
    addToast({
      title: "Navigating to Insights",
      description: "Opening detailed AI insights dashboard",
      color: "primary",
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  const colorClasses = {
    primary: "bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400",
    secondary: "bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400",
    success: "bg-success-100 text-success-600 dark:bg-success-900/30 dark:text-success-400",
    warning: "bg-warning-100 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400"
  };

  return (
    <Card className="gradient-card shadow-md h-full">
      <CardHeader className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">AI Insights</h3>
          <p className="text-sm text-foreground-500">Generated from recent meetings</p>
        </div>
        <Button
          variant="flat"
          color="primary"
          endContent={<Icon icon="lucide:external-link" />}
          onPress={handleViewInsights}
        >
          View All
        </Button>
      </CardHeader>
      <CardBody>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {insights.map((insight) => (
            <motion.div key={insight.id} variants={item}>
              <Card className="border border-divider">
                <CardBody className="p-4">
                  <div className="flex gap-3">
                    <div className={`rounded-full p-3 h-fit ${colorClasses[insight.color]}`}>
                      <Icon icon={insight.icon} className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{insight.title}</h4>
                      <p className="text-sm text-foreground-500">{insight.description}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">AI Processing Status</p>
            <Chip size="sm" color="success" variant="flat">Active</Chip>
          </div>
          <Progress
            value={78}
            color="primary"
            size="sm"
            showValueLabel={true}
            valueLabel="78% of meetings analyzed"
            className="mb-2"
          />
          <p className="text-xs text-foreground-500">
            Next update in 2 hours • Last updated 35 minutes ago
          </p>
        </div>
      </CardBody>
    </Card>
  );
};