import React from "react";
import { motion } from "framer-motion";
import { 
  Button, 
  Card, 
  CardBody, 
  CardHeader,
  Input,
  Tabs,
  Tab,
  Switch,
  Divider,
  Select,
  SelectItem,
  Textarea,
  Avatar
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { addToast } from "@heroui/react";
import confetti from "canvas-confetti";

const Settings: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState("profile");
  const [name, setName] = React.useState("Alex Johnson");
  const [email, setEmail] = React.useState("admin@meetpro.com");
  const [role, setRole] = React.useState("admin");
  const [bio, setBio] = React.useState("Senior administrator with 5+ years of experience managing online meeting platforms.");
  const [notificationSettings, setNotificationSettings] = React.useState({
    email: true,
    push: true,
    meetingReminders: true,
    recordingComplete: true,
    transcriptReady: true,
    insightsReady: true,
    teamActivity: false
  });

  const handleSaveProfile = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    addToast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
      color: "success",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    addToast({
      title: "Setting Updated",
      description: `${key} notifications ${value ? 'enabled' : 'disabled'}`,
      color: "primary",
    });
  };

  const handlePasswordChange = () => {
    addToast({
      title: "Password Changed",
      description: "Your password has been successfully updated",
      color: "success",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-foreground-500">Manage your account and preferences</p>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="gradient-card shadow-md lg:col-span-1">
          <CardBody className="p-0">
            <Tabs 
              aria-label="Settings tabs" 
              selectedKey={selectedTab} 
              onSelectionChange={(key) => setSelectedTab(key as string)}
              color="primary"
              variant="light"
              orientation="vertical"
              classNames={{
                tabList: "gap-2 p-2",
                cursor: "w-full bg-primary",
                tab: "justify-start h-12"
              }}
            >
              <Tab 
                key="profile" 
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:user" />
                    <span>Profile</span>
                  </div>
                }
              />
              <Tab 
                key="notifications" 
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:bell" />
                    <span>Notifications</span>
                  </div>
                }
              />
              <Tab 
                key="security" 
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:shield" />
                    <span>Security</span>
                  </div>
                }
              />
              <Tab 
                key="appearance" 
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:palette" />
                    <span>Appearance</span>
                  </div>
                }
              />
              <Tab 
                key="integrations" 
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:plug" />
                    <span>Integrations</span>
                  </div>
                }
              />
              <Tab 
                key="billing" 
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:credit-card" />
                    <span>Billing</span>
                  </div>
                }
              />
            </Tabs>
          </CardBody>
        </Card>
        
        <Card className="gradient-card shadow-md lg:col-span-3">
          {selectedTab === "profile" && (
            <>
              <CardHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">Profile Settings</h2>
                <p className="text-foreground-500">Manage your personal information</p>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
                      className="w-24 h-24"
                    />
                    <Button
                      size="sm"
                      variant="flat"
                      color="primary"
                    >
                      Change Photo
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <Input
                      label="Full Name"
                      value={name}
                      onValueChange={setName}
                      variant="bordered"
                    />
                    
                    <Input
                      label="Email Address"
                      value={email}
                      onValueChange={setEmail}
                      type="email"
                      variant="bordered"
                    />
                    
                    <Select
                      label="Role"
                      selectedKeys={[role]}
                      onChange={(e) => setRole(e.target.value)}
                      variant="bordered"
                    >
                      <SelectItem key="admin" value="admin">Administrator</SelectItem>
                      <SelectItem key="manager" value="manager">Manager</SelectItem>
                      <SelectItem key="user" value="user">Regular User</SelectItem>
                    </Select>
                    
                    <Textarea
                      label="Bio"
                      value={bio}
                      onValueChange={setBio}
                      variant="bordered"
                      minRows={3}
                    />
                  </div>
                </div>
                
                <Divider />
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="flat"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                </div>
              </CardBody>
            </>
          )}
          
          {selectedTab === "notifications" && (
            <>
              <CardHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">Notification Settings</h2>
                <p className="text-foreground-500">Manage how you receive notifications</p>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-foreground-500">Receive notifications via email</p>
                      </div>
                      <Switch
                        isSelected={notificationSettings.email}
                        onValueChange={(value) => handleNotificationChange("email", value)}
                        color="primary"
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-foreground-500">Receive notifications in your browser</p>
                      </div>
                      <Switch
                        isSelected={notificationSettings.push}
                        onValueChange={(value) => handleNotificationChange("push", value)}
                        color="primary"
                      />
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Types</h3>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Meeting Reminders</p>
                        <p className="text-sm text-foreground-500">Get notified before scheduled meetings</p>
                      </div>
                      <Switch
                        isSelected={notificationSettings.meetingReminders}
                        onValueChange={(value) => handleNotificationChange("meetingReminders", value)}
                        color="primary"
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Recording Complete</p>
                        <p className="text-sm text-foreground-500">Get notified when a recording is ready</p>
                      </div>
                      <Switch
                        isSelected={notificationSettings.recordingComplete}
                        onValueChange={(value) => handleNotificationChange("recordingComplete", value)}
                        color="primary"
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Transcript Ready</p>
                        <p className="text-sm text-foreground-500">Get notified when a transcript is ready</p>
                      </div>
                      <Switch
                        isSelected={notificationSettings.transcriptReady}
                        onValueChange={(value) => handleNotificationChange("transcriptReady", value)}
                        color="primary"
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Insights Ready</p>
                        <p className="text-sm text-foreground-500">Get notified when AI insights are ready</p>
                      </div>
                      <Switch
                        isSelected={notificationSettings.insightsReady}
                        onValueChange={(value) => handleNotificationChange("insightsReady", value)}
                        color="primary"
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Team Activity</p>
                        <p className="text-sm text-foreground-500">Get notified about team members' activities</p>
                      </div>
                      <Switch
                        isSelected={notificationSettings.teamActivity}
                        onValueChange={(value) => handleNotificationChange("teamActivity", value)}
                        color="primary"
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </>
          )}
          
          {selectedTab === "security" && (
            <>
              <CardHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">Security Settings</h2>
                <p className="text-foreground-500">Manage your account security</p>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    
                    <Input
                      label="Current Password"
                      type="password"
                      variant="bordered"
                    />
                    
                    <Input
                      label="New Password"
                      type="password"
                      variant="bordered"
                    />
                    
                    <Input
                      label="Confirm New Password"
                      type="password"
                      variant="bordered"
                    />
                    
                    <div className="flex justify-end">
                      <Button
                        color="primary"
                        onPress={handlePasswordChange}
                      >
                        Update Password
                      </Button>
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Enable Two-Factor Authentication</p>
                        <p className="text-sm text-foreground-500">Add an extra layer of security to your account</p>
                      </div>
                      <Button
                        color="primary"
                        variant="flat"
                        onPress={() => addToast({
                          title: "2FA Setup",
                          description: "Opening two-factor authentication setup",
                          color: "primary",
                        })}
                      >
                        Setup
                      </Button>
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Session Management</h3>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Active Sessions</p>
                        <p className="text-sm text-foreground-500">Manage your active login sessions</p>
                      </div>
                      <Button
                        color="primary"
                        variant="flat"
                        onPress={() => addToast({
                          title: "Sessions",
                          description: "Opening active sessions management",
                          color: "primary",
                        })}
                      >
                        Manage
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Log Out All Devices</p>
                        <p className="text-sm text-foreground-500">Sign out from all devices except this one</p>
                      </div>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => addToast({
                          title: "Logged Out",
                          description: "You've been logged out from all other devices",
                          color: "success",
                        })}
                      >
                        Log Out All
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </>
          )}
          
          {selectedTab === "appearance" && (
            <>
              <CardHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">Appearance Settings</h2>
                <p className="text-foreground-500">Customize how the application looks</p>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border border-divider p-4 cursor-pointer hover:border-primary transition-colors">
                        <CardBody className="p-0 flex flex-col items-center gap-2">
                          <div className="w-full h-24 bg-white rounded-md border border-divider"></div>
                          <p className="font-medium">Light</p>
                        </CardBody>
                      </Card>
                      
                      <Card className="border border-divider p-4 cursor-pointer hover:border-primary transition-colors">
                        <CardBody className="p-0 flex flex-col items-center gap-2">
                          <div className="w-full h-24 bg-black rounded-md border border-divider"></div>
                          <p className="font-medium">Dark</p>
                        </CardBody>
                      </Card>
                      
                      <Card className="border border-primary p-4 cursor-pointer">
                        <CardBody className="p-0 flex flex-col items-center gap-2">
                          <div className="w-full h-24 rounded-md border border-divider overflow-hidden">
                            <div className="h-1/2 bg-white"></div>
                            <div className="h-1/2 bg-black"></div>
                          </div>
                          <p className="font-medium">System</p>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Accent Color</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-primary border-2 border-primary"></div>
                        <p className="text-sm">Purple</p>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-blue-500 border border-divider"></div>
                        <p className="text-sm">Blue</p>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-green-500 border border-divider"></div>
                        <p className="text-sm">Green</p>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-red-500 border border-divider"></div>
                        <p className="text-sm">Red</p>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-amber-500 border border-divider"></div>
                        <p className="text-sm">Amber</p>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-pink-500 border border-divider"></div>
                        <p className="text-sm">Pink</p>
                      </div>
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Layout</h3>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Compact Mode</p>
                        <p className="text-sm text-foreground-500">Use a more compact layout with less whitespace</p>
                      </div>
                      <Switch
                        color="primary"
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Animations</p>
                        <p className="text-sm text-foreground-500">Enable or disable UI animations</p>
                      </div>
                      <Switch
                        isSelected={true}
                        color="primary"
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </>
          )}
          
          {selectedTab === "integrations" && (
            <>
              <CardHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">Integrations</h2>
                <p className="text-foreground-500">Connect with other services</p>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <Icon icon="logos:google-icon" className="text-2xl" />
                      </div>
                      <div>
                        <p className="font-medium">Google Calendar</p>
                        <p className="text-sm text-foreground-500">Sync meetings with Google Calendar</p>
                      </div>
                    </div>
                    <Button
                      color="primary"
                      variant="flat"
                    >
                      Connected
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <Icon icon="logos:slack-icon" className="text-2xl" />
                      </div>
                      <div>
                        <p className="font-medium">Slack</p>
                        <p className="text-sm text-foreground-500">Share meeting links and recordings in Slack</p>
                      </div>
                    </div>
                    <Button
                      variant="flat"
                      onPress={() => addToast({
                        title: "Slack Integration",
                        description: "Opening Slack connection setup",
                        color: "primary",
                      })}
                    >
                      Connect
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <Icon icon="logos:microsoft-icon" className="text-2xl" />
                      </div>
                      <div>
                        <p className="font-medium">Microsoft Teams</p>
                        <p className="text-sm text-foreground-500">Integrate with Microsoft Teams</p>
                      </div>
                    </div>
                    <Button
                      variant="flat"
                      onPress={() => addToast({
                        title: "Teams Integration",
                        description: "Opening Microsoft Teams connection setup",
                        color: "primary",
                      })}
                    >
                      Connect
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <Icon icon="logos:dropbox" className="text-2xl" />
                      </div>
                      <div>
                        <p className="font-medium">Dropbox</p>
                        <p className="text-sm text-foreground-500">Store recordings and transcripts in Dropbox</p>
                      </div>
                    </div>
                    <Button
                      variant="flat"
                      onPress={() => addToast({
                        title: "Dropbox Integration",
                        description: "Opening Dropbox connection setup",
                        color: "primary",
                      })}
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              </CardBody>
            </>
          )}
          
          {selectedTab === "billing" && (
            <>
              <CardHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">Billing & Subscription</h2>
                <p className="text-foreground-500">Manage your subscription and payment methods</p>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="space-y-6">
                  <div className="p-4 border border-primary-200 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-800 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-lg">Enterprise Plan</p>
                        <p className="text-foreground-500">$49.99/month • Renews on July 15, 2023</p>
                      </div>
                      <Button
                        color="primary"
                        variant="flat"
                        onPress={() => addToast({
                          title: "Subscription Management",
                          description: "Opening subscription details",
                          color: "primary",
                        })}
                      >
                        Manage
                      </Button>
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    
                    <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-2 rounded-md">
                          <Icon icon="logos:visa" className="text-2xl" />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-foreground-500">Expires 12/2025</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="light"
                          isIconOnly
                          onPress={() => addToast({
                            title: "Edit Payment Method",
                            description: "Opening payment method editor",
                            color: "primary",
                          })}
                        >
                          <Icon icon="lucide:edit-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="light"
                          isIconOnly
                          color="danger"
                          onPress={() => addToast({
                            title: "Remove Payment Method",
                            description: "Are you sure you want to remove this payment method?",
                            color: "danger",
                          })}
                        >
                          <Icon icon="lucide:trash-2" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      startContent={<Icon icon="lucide:plus" />}
                      variant="flat"
                      onPress={() => addToast({
                        title: "Add Payment Method",
                        description: "Opening payment method form",
                        color: "primary",
                      })}
                    >
                      Add Payment Method
                    </Button>
                  </div>
                  
                  <Divider />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Billing History</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                        <div>
                          <p className="font-medium">June 15, 2023</p>
                          <p className="text-sm text-foreground-500">Enterprise Plan • $49.99</p>
                        </div>
                        <Button
                          size="sm"
                          variant="flat"
                          startContent={<Icon icon="lucide:download" />}
                          onPress={() => addToast({
                            title: "Download Invoice",
                            description: "Downloading invoice for June 2023",
                            color: "primary",
                          })}
                        >
                          Invoice
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                        <div>
                          <p className="font-medium">May 15, 2023</p>
                          <p className="text-sm text-foreground-500">Enterprise Plan • $49.99</p>
                        </div>
                        <Button
                          size="sm"
                          variant="flat"
                          startContent={<Icon icon="lucide:download" />}
                          onPress={() => addToast({
                            title: "Download Invoice",
                            description: "Downloading invoice for May 2023",
                            color: "primary",
                          })}
                        >
                          Invoice
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                        <div>
                          <p className="font-medium">April 15, 2023</p>
                          <p className="text-sm text-foreground-500">Enterprise Plan • $49.99</p>
                        </div>
                        <Button
                          size="sm"
                          variant="flat"
                          startContent={<Icon icon="lucide:download" />}
                          onPress={() => addToast({
                            title: "Download Invoice",
                            description: "Downloading invoice for April 2023",
                            color: "primary",
                          })}
                        >
                          Invoice
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      variant="flat"
                      onPress={() => addToast({
                        title: "Billing History",
                        description: "Opening complete billing history",
                        color: "primary",
                      })}
                    >
                      View All
                    </Button>
                  </div>
                </div>
              </CardBody>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Settings;