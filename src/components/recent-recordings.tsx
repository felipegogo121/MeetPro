import React from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Button, Chip, Progress, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
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
}

const recentRecordings: Recording[] = [
  {
    id: "r1",
    title: "Q2 Planning Session",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    duration: 45,
    views: 12,
    thumbnail: "https://img.heroui.chat/image/dashboard?w=400&h=225&u=1",
    status: "ready"
  },
  {
    id: "r2",
    title: "Product Demo with Acme Corp",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    duration: 32,
    views: 8,
    thumbnail: "https://img.heroui.chat/image/dashboard?w=400&h=225&u=2",
    status: "ready"
  },
  {
    id: "r3",
    title: "UX Research Discussion",
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    duration: 28,
    views: 0,
    thumbnail: "https://img.heroui.chat/image/dashboard?w=400&h=225&u=3",
    progress: 65,
    status: "processing"
  },
  {
    id: "r4",
    title: "Marketing Strategy Review",
    date: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    duration: 52,
    views: 0,
    thumbnail: "https://img.heroui.chat/image/dashboard?w=400&h=225&u=4",
    progress: 90,
    status: "transcribing"
  }
];

export const RecentRecordings: React.FC = () => {
  const handleAction = (action: string, recording: Recording) => {
    addToast({
      title: "Action performed",
      description: `${action} for "${recording.title}"`,
      color: "primary",
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    
    return `${mins}m`;
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

  const getStatusChip = (status: Recording["status"], progress?: number) => {
    switch (status) {
      case "processing":
        return (
          <div className="flex items-center gap-2">
            <Chip color="warning" size="sm" variant="flat">Processing</Chip>
            <Progress 
              size="sm" 
              value={progress} 
              color="warning" 
              className="max-w-[100px]" 
              aria-label="Processing progress"
            />
          </div>
        );
      case "transcribing":
        return (
          <div className="flex items-center gap-2">
            <Chip color="secondary" size="sm" variant="flat">Transcribing</Chip>
            <Progress 
              size="sm" 
              value={progress} 
              color="secondary" 
              className="max-w-[100px]" 
              aria-label="Transcribing progress"
            />
          </div>
        );
      case "ready":
        return <Chip color="success" size="sm" variant="flat">Ready</Chip>;
      default:
        return null;
    }
  };

  return (
    <Card className="gradient-card shadow-md h-full">
      <CardHeader className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Recent Recordings</h3>
          <p className="text-sm text-foreground-500">Latest recorded meetings</p>
        </div>
        <Button
          variant="flat"
          color="primary"
          endContent={<Icon icon="lucide:external-link" />}
        >
          View All
        </Button>
      </CardHeader>
      <CardBody className="p-0">
        {recentRecordings.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8">
            <Icon icon="lucide:film" className="text-4xl text-foreground-300 mb-2" />
            <p className="text-foreground-500">No recordings found</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="divide-y divide-divider"
          >
            {recentRecordings.map((recording) => (
              <motion.div
                key={recording.id}
                variants={item}
                className="p-4 flex flex-col sm:flex-row gap-4"
              >
                <div className="relative w-full sm:w-40 h-24 rounded-md overflow-hidden">
                  <img 
                    src={recording.thumbnail} 
                    alt={recording.title}
                    className="w-full h-full object-cover"
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
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{recording.title}</h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-sm text-foreground-500">
                        <div className="flex items-center gap-1">
                          <Icon icon="lucide:calendar" className="text-base" />
                          <span>{format(recording.date, "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon icon="lucide:clock" className="text-base" />
                          <span>{formatDuration(recording.duration)}</span>
                        </div>
                        {recording.views > 0 && (
                          <div className="flex items-center gap-1">
                            <Icon icon="lucide:eye" className="text-base" />
                            <span>{recording.views} views</span>
                          </div>
                        )}
                      </div>
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
                              key="view" 
                              startContent={<Icon icon="lucide:play" />}
                              onPress={() => handleAction("Play", recording)}
                            >
                              Play Recording
                            </DropdownItem>
                            <DropdownItem 
                              key="transcript" 
                              startContent={<Icon icon="lucide:file-text" />}
                              onPress={() => handleAction("View transcript", recording)}
                            >
                              View Transcript
                            </DropdownItem>
                            <DropdownItem 
                              key="insights" 
                              startContent={<Icon icon="lucide:lightbulb" />}
                              onPress={() => handleAction("View insights", recording)}
                            >
                              View AI Insights
                            </DropdownItem>
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
                  
                  <div className="mt-2">
                    {getStatusChip(recording.status, recording.progress)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </CardBody>
    </Card>
  );
};