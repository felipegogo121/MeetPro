import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Divider, Tooltip, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ThemeSwitcher } from "./theme-switcher";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <NavLink
      to={to}
      className="block"
      activeClassName="text-primary"
    >
      <Tooltip content={label} placement="right" isDisabled={isActive}>
        <Button
          className={`w-full justify-start mb-1 ${
            isActive 
              ? "bg-primary-100 dark:bg-primary-900/20 text-primary" 
              : "bg-transparent text-foreground-600 hover:text-foreground-900 dark:hover:text-foreground-400"
          }`}
          variant="flat"
          startContent={<Icon icon={icon} className="text-xl" />}
        >
          <span>{label}</span>
        </Button>
      </Tooltip>
    </NavLink>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, isMobile, onClose }) => {
  const location = useLocation();
  
  const sidebarVariants = {
    open: { 
      x: 0,
      width: "240px",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      } 
    },
    closed: { 
      x: isMobile ? "-100%" : 0,
      width: isMobile ? "240px" : "80px",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      } 
    }
  };

  const navItems = [
    { to: "/dashboard", icon: "lucide:layout-dashboard", label: "Dashboard" },
    { to: "/dashboard/meetings", icon: "lucide:video", label: "Meetings" },
    { to: "/dashboard/recordings", icon: "lucide:film", label: "Recordings" },
    { to: "/dashboard/transcripts", icon: "lucide:file-text", label: "Transcripts" },
    { to: "/dashboard/insights", icon: "lucide:lightbulb", label: "AI Insights" },
    { to: "/dashboard/settings", icon: "lucide:settings", label: "Settings" }
  ];

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={handleOverlayClick}
        />
      )}
      
      <motion.div
        className="fixed top-0 left-0 h-screen bg-content1 border-r border-divider z-50"
        variants={sidebarVariants}
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <div className="bg-primary rounded-md p-1">
                    <Icon icon="lucide:video" className="text-white text-lg" />
                  </div>
                  <span className="font-semibold text-lg">MeetPro</span>
                </motion.div>
              )}
            </AnimatePresence>
            
            {isMobile && (
              <Button 
                isIconOnly 
                variant="light" 
                onPress={onClose}
                className="ml-auto"
              >
                <Icon icon="lucide:x" />
              </Button>
            )}
          </div>
          
          <nav className="flex-1">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
              />
            ))}
          </nav>
          
          <Divider className="my-4" />
          
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-between items-center"
                >
                  <ThemeSwitcher />
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex items-center gap-3">
              <Avatar
                src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
                size="sm"
              />
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <p className="text-sm font-medium">Alex Johnson</p>
                      <p className="text-xs text-foreground-500">Admin</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};