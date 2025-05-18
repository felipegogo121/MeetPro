import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="gradient-card shadow-lg max-w-md w-full">
        <CardBody className="p-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="mb-6 bg-primary/10 p-6 rounded-full"
          >
            <Icon icon="lucide:map-pin-off" className="text-6xl text-primary" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
            <p className="text-foreground-500 mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                as={Link}
                to="/dashboard"
                color="primary"
                startContent={<Icon icon="lucide:home" />}
              >
                Go to Dashboard
              </Button>
              <Button
                as={Link}
                to="/dashboard/meetings"
                variant="flat"
                startContent={<Icon icon="lucide:video" />}
              >
                View Meetings
              </Button>
            </div>
          </motion.div>
        </CardBody>
      </Card>
    </div>
  );
};

export default NotFound;