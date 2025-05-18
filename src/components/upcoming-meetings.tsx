import React from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Button, Chip, Avatar, AvatarGroup } from "@heroui/react";
import { Icon } from "@iconify/react";
import { addToast } from "@heroui/react";
import confetti from "canvas-confetti";

interface Meeting {
  id: string;
  title: string;
  time: Date;
  duration: number;
  participants: {
    id: string;
    avatar: string;
  }[];
  status: "scheduled" | "live" | "completed";
}

const upcomingMeetings: Meeting[] = [
  {
    id: "m1",
    title: "Weekly Team Standup",
    time: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes from now
    duration: 30,
    participants: [
      { id: "u1", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1" },
      { id: "u2", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2" },
      { id: "u3", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3" },
      { id: "u4", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4" },
      { id: "u5", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5" }
    ],
    status: "scheduled"
  },
  {
    id: "m2",
    title: "Product Review",
    time: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
    duration: 60,
    participants: [
      { id: "u1", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1" },
      { id: "u6", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=6" },
      { id: "u7", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=7" }
    ],
    status: "scheduled"
  },
  {
    id: "m3",
    title: "Client Presentation",
    time: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago (live)
    duration: 45,
    participants: [
      { id: "u1", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1" },
      { id: "u8", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=8" },
      { id: "u9", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=9" },
      { id: "u10", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=10" }
    ],
    status: "live"
  }
];

export const UpcomingMeetings: React.FC = () => {
  const handleStartMeeting = (meeting: Meeting) => {
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    addToast({
      title: "Meeting Started!",
      description: `You've joined "${meeting.title}"`,
      color: "success",
    });
  };

  const handleJoinMeeting = (meeting: Meeting) => {
    addToast({
      title: "Joining Meeting",
      description: `Connecting to "${meeting.title}"`,
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

  return (
    <Card className="gradient-card shadow-md h-full">
      <CardHeader className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Upcoming Meetings</h3>
          <p className="text-sm text-foreground-500">Today's schedule</p>
        </div>
        <Button
          variant="flat"
          color="primary"
          endContent={<Icon icon="lucide:plus" />}
        >
          New Meeting
        </Button>
      </CardHeader>
      <CardBody className="p-0">
        {upcomingMeetings.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8">
            <Icon icon="lucide:calendar" className="text-4xl text-foreground-300 mb-2" />
            <p className="text-foreground-500">No upcoming meetings</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            {upcomingMeetings.map((meeting) => (
              <motion.div
                key={meeting.id}
                variants={item}
                className="border-b border-divider last:border-b-0"
              >
                <div className="p-4 flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{meeting.title}</h4>
                      {meeting.status === "live" && (
                        <Chip color="danger" size="sm" variant="flat" className="animate-pulse-slow">
                          Live Now
                        </Chip>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-foreground-500">
                      <div className="flex items-center gap-1">
                        <Icon icon="lucide:clock" className="text-base" />
                        <span>{format(meeting.time, "h:mm a")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon icon="lucide:hourglass" className="text-base" />
                        <span>{meeting.duration} min</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <AvatarGroup max={3} size="sm">
                      {meeting.participants.map((participant) => (
                        <Avatar key={participant.id} src={participant.avatar} />
                      ))}
                    </AvatarGroup>
                    
                    {meeting.status === "live" ? (
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => handleJoinMeeting(meeting)}
                        startContent={<Icon icon="lucide:video" />}
                      >
                        Join Now
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        variant="flat"
                        onPress={() => handleStartMeeting(meeting)}
                        startContent={<Icon icon="lucide:video" />}
                      >
                        Start
                      </Button>
                    )}
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