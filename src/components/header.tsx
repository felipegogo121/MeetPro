import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Input, Badge, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { addToast } from "@heroui/react";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const location = useLocation();
  const [notifications, setNotifications] = React.useState(3);
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/meetings":
        return "Meetings";
      case "/dashboard/recordings":
        return "Recordings";
      case "/dashboard/transcripts":
        return "Transcripts";
      case "/dashboard/insights":
        return "AI Insights";
      case "/dashboard/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  const handleNotificationClick = () => {
    if (notifications > 0) {
      addToast({
        title: "Notifications cleared",
        description: "You have viewed all notifications",
        color: "success",
      });
      setNotifications(0);
    }
  };

  const handleProfileAction = (key: React.Key) => {
    addToast({
      title: "Action triggered",
      description: `You selected: ${key}`,
    });
  };

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-divider">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            variant="light"
            onPress={toggleSidebar}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Icon icon={isSidebarOpen ? "lucide:menu-fold" : "lucide:menu-unfold"} className="text-xl" />
          </Button>
          
          <motion.h1 
            className="text-xl font-semibold hidden sm:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={getPageTitle()}
            transition={{ duration: 0.3 }}
          >
            {getPageTitle()}
          </motion.h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:block w-64">
            <Input
              placeholder="Search..."
              startContent={<Icon icon="lucide:search" className="text-default-400" />}
              size="sm"
              variant="bordered"
              classNames={{
                inputWrapper: "bg-content1"
              }}
            />
          </div>
          
          <Button
            isIconOnly
            variant="light"
            onPress={handleNotificationClick}
            className="relative"
          >
            <Icon icon="lucide:bell" className="text-xl" />
            {notifications > 0 && (
              <Badge content={notifications} color="danger" placement="top-right" size="sm" />
            )}
          </Button>
          
          <Button
            isIconOnly
            variant="light"
            aria-label="Help"
          >
            <Icon icon="lucide:help-circle" className="text-xl" />
          </Button>
          
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button 
                variant="light" 
                className="p-0"
              >
                <Avatar
                  src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
                  size="sm"
                  className="cursor-pointer"
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Profile Actions" 
              onAction={handleProfileAction}
              className="w-56"
            >
              <DropdownItem key="profile" textValue="Profile">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Alex Johnson</p>
                  <p className="text-xs text-foreground-500">admin@meetpro.com</p>
                </div>
              </DropdownItem>
              <DropdownItem key="settings" startContent={<Icon icon="lucide:settings" />}>
                Account Settings
              </DropdownItem>
              <DropdownItem key="team" startContent={<Icon icon="lucide:users" />}>
                Team Management
              </DropdownItem>
              <DropdownItem key="analytics" startContent={<Icon icon="lucide:bar-chart" />}>
                Analytics
              </DropdownItem>
              <DropdownItem key="help" startContent={<Icon icon="lucide:help-circle" />}>
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" startContent={<Icon icon="lucide:log-out" />}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};