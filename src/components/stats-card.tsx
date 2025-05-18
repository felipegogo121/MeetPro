import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  delay?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  color = "primary",
  delay = 0 
}) => {
  const colorClasses = {
    primary: "bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400",
    secondary: "bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400",
    success: "bg-success-100 text-success-600 dark:bg-success-900/30 dark:text-success-400",
    warning: "bg-warning-100 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400",
    danger: "bg-danger-100 text-danger-600 dark:bg-danger-900/30 dark:text-danger-400"
  };

  const trendColorClasses = {
    positive: "text-success-600 dark:text-success-400",
    negative: "text-danger-600 dark:text-danger-400"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1],
        delay: delay * 0.1
      }}
      className="w-full"
    >
      <Card className="gradient-card overflow-visible shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardBody className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-foreground-500 text-sm mb-1">{title}</p>
              <h3 className="text-2xl font-semibold">{value}</h3>
              
              {trend && (
                <div className="flex items-center mt-2">
                  <Icon 
                    icon={trend.isPositive ? "lucide:trending-up" : "lucide:trending-down"} 
                    className={`mr-1 ${trend.isPositive ? trendColorClasses.positive : trendColorClasses.negative}`}
                  />
                  <span className={`text-xs ${trend.isPositive ? trendColorClasses.positive : trendColorClasses.negative}`}>
                    {trend.value}% {trend.isPositive ? "increase" : "decrease"}
                  </span>
                </div>
              )}
            </div>
            
            <div className={`rounded-full p-3 ${colorClasses[color]}`}>
              <Icon icon={icon} className="text-xl" />
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};