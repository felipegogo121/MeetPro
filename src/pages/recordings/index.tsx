import React from "react";
import { motion } from "framer-motion";
import { 
  Button, 
  Card, 
  CardBody, 
  Input, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Chip,
  Progress,
  Tabs,
  Tab
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { addToast } from "@heroui/react";

interface Recording {
  id: string;
  title: string;
  date: Date;
  duration: number;
  views: number;
  thumbnail: string;
  progress?: number;
  status: "processing" | "ready" | "transcribing";
  hasTranscript: boolean;
  hasInsights: boolean;
}

const recordingsData: Recording[] = [
  {
    id: "r1",
    title: "Q2 Planning Session",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    duration: 45,
    views: 12,
    thumbnail: "https://img.heroui.chat/image/dashboard?w=400&h=225&u=1",
    status: "ready",
    hasTranscript: true,
    hasInsights: true
  },
  {
    id: "r2",
    title: "Product Demo with Acme Corp",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    duration: 32,
    views: 8,
    thumbnail: "https://img.heroui.chat/image/dashboard?w=400&h=225&u=2",
    status: "ready",
    hasTranscript: true,
    hasInsights: true
  },
  {
    id: "r3",
    title: "UX Research Discussion",
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    duration: 28,
    views: 0,
    thumbnail: "https://img.heroui.chat/image/dashboard?w=400&h=225&u=3",
    progress: 65,
    status: "processing",
    hasTranscript: false,
    hasInsights: false
  },
  {
    id: "r4",
    title: "Marketing Strategy Review",
    date: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    duration: 52,
    views: 0,
    thumbnail: "https://img.heroui.chat/image/dashboard?w=400&h=225&u=4",
    progress: 90,
    status: "transcribing",
    hasTranscript: false,
    hasInsights: false
  },
  {
    id: "r5",
    title: "Engineering Sync",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    duration: 35,
    views: 6,
    thumbnail: "https://img.heroui.chat/image/dashboard?w=400&h=225&u=5",
    status: "ready",
    hasTranscript: true,
    hasInsights: true
  },
  {
    id: "r6",
    title: "Customer Feedback Session",
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    duration: 48,
    views: 15,
    thumbnail: "https://img.heroui.chat/image/dashboard?w=400&h=225&u=6",
    status: "ready",
    hasTranscript: true,
    hasInsights: true
  },
  {
    id: "r7",
    title: "Design System Workshop",
    date: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    duration: 65,
    views: 9,
    thumbnail: "https://img.heroui.chat/image/dashboard?w=400&h=225&u=7",
    status: "ready",
    hasTranscript: true,
    hasInsights: false
  },
  {
    id: "r8",
    title: "Quarterly Review",
    date: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
    duration: 75,
    views: 22,
    thumbnail: "https://img.heroui.chat/image/dashboard?w=400&h=225&u=8",
    status: "ready",
    hasTranscript: true,
    hasInsights: true
  }
];

const Recordings: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const filteredRecordings = React.useMemo(() => {
    return recordingsData.filter(recording => {
      const matchesSearch = recording.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || recording.status === statusFilter;
      
      const matchesTab = selectedTab === "all" || 
                         (selectedTab === "transcribed" && recording.hasTranscript) ||
                         (selectedTab === "with-insights" && recording.hasInsights);
      
      return matchesSearch && matchesStatus && matchesTab;
    });
  }, [searchQuery, statusFilter, selectedTab]);

  const handleAction = (action: string, recording: Recording) => {
    addToast({
      title: "Action performed",
      description: `${action} for "${recording.title}"`,
      color: "primary",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    
    return `${mins}m`;
  };

  const getStatusChip = (status: Recording["status"], progress?: number) => {
    switch (status) {
      case "processing":
        return (
          <div className="flex items-center gap-2">
            <Chip color="warning" size="sm" variant="flat">Processing</Chip>
            {progress !== undefined && (
              <Progress 
                size="sm" 
                value={progress} 
                color="warning" 
                className="max-w-[100px]" 
                aria-label="Processing progress"
              />
            )}
          </div>
        );
      case "transcribing":
        return (
          <div className="flex items-center gap-2">
            <Chip color="secondary" size="sm" variant="flat">Transcribing</Chip>
            {progress !== undefined && (
              <Progress 
                size="sm" 
                value={progress} 
                color="secondary" 
                className="max-w-[100px]" 
                aria-label="Transcribing progress"
              />
            )}
          </div>
        );
      case "ready":
        return <Chip color="success" size="sm" variant="flat">Ready</Chip>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold">Recordings</h1>
          <p className="text-foreground-500">Access and manage your meeting recordings</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button
            color="primary"
            startContent={<Icon icon="lucide:upload" />}
            onPress={() => addToast({
              title: "Upload Recording",
              description: "Opening upload dialog",
              color: "primary",
            })}
          >
            Upload Recording
          </Button>
        </motion.div>
      </div>
      
      <Card className="gradient-card shadow-md">
        <CardBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Input
                placeholder="Search recordings..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                startContent={<Icon icon="lucide:search" className="text-default-400" />}
                className="w-full sm:max-w-xs"
              />
              
              <div className="flex gap-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button 
                      variant="flat" 
                      endContent={<Icon icon="lucide:chevron-down" className="text-small" />}
                    >
                      Status: {statusFilter === "all" ? "All" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Filter by status"
                    selectionMode="single"
                    selectedKeys={[statusFilter]}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      setStatusFilter(selected);
                    }}
                  >
                    <DropdownItem key="all">All</DropdownItem>
                    <DropdownItem key="ready">Ready</DropdownItem>
                    <DropdownItem key="processing">Processing</DropdownItem>
                    <DropdownItem key="transcribing">Transcribing</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                
                <Dropdown>
                  <DropdownTrigger>
                    <Button 
                      variant="flat" 
                      isIconOnly
                    >
                      <Icon icon="lucide:more-vertical" className="text-default-500" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Actions">
                    <DropdownItem key="export" startContent={<Icon icon="lucide:download" />}>
                      Export List
                    </DropdownItem>
                    <DropdownItem key="settings" startContent={<Icon icon="lucide:settings" />}>
                      Recording Settings
                    </DropdownItem>
                    <DropdownItem key="storage" startContent={<Icon icon="lucide:hard-drive" />}>
                      Storage Management
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            
            <Tabs 
              aria-label="Recording filters" 
              selectedKey={selectedTab} 
              onSelectionChange={(key) => setSelectedTab(key as string)}
              color="primary"
              variant="underlined"
              classNames={{
                tabList: "gap-6",
                cursor: "w-full bg-primary",
              }}
            >
              <Tab key="all" title="All Recordings" />
              <Tab key="transcribed" title="Transcribed" />
              <Tab key="with-insights" title="With AI Insights" />
            </Tabs>
          </div>
          
          {filteredRecordings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Icon icon="lucide:film" className="text-5xl text-foreground-300 mb-4" />
              <p className="text-xl font-medium mb-2">No recordings found</p>
              <p className="text-foreground-500 mb-6 text-center max-w-md">
                No recordings match your current filters. Try changing your search criteria or upload a new recording.
              </p>
              <Button
                color="primary"
                variant="flat"
                startContent={<Icon icon="lucide:upload" />}
                onPress={() => addToast({
                  title: "Upload Recording",
                  description: "Opening upload dialog",
                  color: "primary",
                })}
              >
                Upload Recording
              </Button>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4"
            >
              {filteredRecordings.map((recording) => (
                <motion.div
                  key={recording.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                    }
                  }}
                >
                  <Card className="border border-divider overflow-hidden">
                    <CardBody className="p-0">
                      <div className="relative">
                        <img 
                          src={recording.thumbnail} 
                          alt={recording.title}
                          className="w-full aspect-video object-cover"
                        />
                        
                        {recording.status === "ready" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                            <Button
                              isIconOnly
                              color="primary"
                              variant="solid"
                              radius="full"
                              className="bg-primary/90"
                              onPress={() => handleAction("Play", recording)}
                            >
                              <Icon icon="lucide:play" className="text-xl" />
                            </Button>
                          </div>
                        )}
                        
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                          {formatDuration(recording.duration)}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium mb-1">{recording.title}</h3>
                            <p className="text-xs text-foreground-500">{formatDate(recording.date)}</p>
                          </div>
                          
                          <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                              <Button
                                isIconOnly
                                variant="light"
                                size="sm"
                              >
                                <Icon icon="lucide:more-vertical" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Recording actions">
                              {recording.status === "ready" && (
                                <>
                                  <DropdownItem 
                                    key="play" 
                                    startContent={<Icon icon="lucide:play" />}
                                    onPress={() => handleAction("Play", recording)}
                                  >
                                    Play Recording
                                  </DropdownItem>
                                  {recording.hasTranscript && (
                                    <DropdownItem 
                                      key="transcript" 
                                      startContent={<Icon icon="lucide:file-text" />}
                                      onPress={() => handleAction("View transcript", recording)}
                                    >
                                      View Transcript
                                    </DropdownItem>
                                  )}
                                  {recording.hasInsights && (
                                    <DropdownItem 
                                      key="insights" 
                                      startContent={<Icon icon="lucide:lightbulb" />}
                                      onPress={() => handleAction("View insights", recording)}
                                    >
                                      View AI Insights
                                    </DropdownItem>
                                  )}
                                  <DropdownItem 
                                    key="share" 
                                    startContent={<Icon icon="lucide:share-2" />}
                                    onPress={() => handleAction("Share", recording)}
                                  >
                                    Share
                                  </DropdownItem>
                                  <DropdownItem 
                                    key="download" 
                                    startContent={<Icon icon="lucide:download" />}
                                    onPress={() => handleAction("Download", recording)}
                                  >
                                    Download
                                  </DropdownItem>
                                </>
                              )}
                              <DropdownItem 
                                key="rename" 
                                startContent={<Icon icon="lucide:edit-3" />}
                                onPress={() => handleAction("Rename", recording)}
                              >
                                Rename
                              </DropdownItem>
                              <DropdownItem 
                                key="delete" 
                                className="text-danger" 
                                color="danger"
                                startContent={<Icon icon="lucide:trash-2" />}
                                onPress={() => handleAction("Delete", recording)}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          {getStatusChip(recording.status, recording.progress)}
                          
                          {recording.views > 0 && (
                            <div className="flex items-center gap-1 text-xs text-foreground-500">
                              <Icon icon="lucide:eye" className="text-sm" />
                              <span>{recording.views} views</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Recordings;