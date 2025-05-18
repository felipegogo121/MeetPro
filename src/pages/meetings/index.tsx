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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination,
  Avatar,
  AvatarGroup
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { addToast } from "@heroui/react";
import confetti from "canvas-confetti";

interface Meeting {
  id: string;
  title: string;
  date: Date;
  duration: number;
  participants: {
    id: string;
    name: string;
    avatar: string;
  }[];
  status: "scheduled" | "live" | "completed" | "cancelled";
  host: string;
}

const meetingsData: Meeting[] = [
  {
    id: "m1",
    title: "Weekly Team Standup",
    date: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes from now
    duration: 30,
    participants: [
      { id: "u1", name: "Alex Johnson", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1" },
      { id: "u2", name: "Sarah Miller", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2" },
      { id: "u3", name: "David Chen", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3" },
      { id: "u4", name: "Emily Davis", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4" },
      { id: "u5", name: "Michael Brown", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5" }
    ],
    status: "scheduled",
    host: "Alex Johnson"
  },
  {
    id: "m2",
    title: "Product Review",
    date: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
    duration: 60,
    participants: [
      { id: "u1", name: "Alex Johnson", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1" },
      { id: "u6", name: "Jessica Wilson", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=6" },
      { id: "u7", name: "Robert Taylor", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=7" }
    ],
    status: "scheduled",
    host: "Jessica Wilson"
  },
  {
    id: "m3",
    title: "Client Presentation",
    date: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago (live)
    duration: 45,
    participants: [
      { id: "u1", name: "Alex Johnson", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1" },
      { id: "u8", name: "Thomas Anderson", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=8" },
      { id: "u9", name: "Lisa Martinez", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=9" },
      { id: "u10", name: "Kevin Lee", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=10" }
    ],
    status: "live",
    host: "Alex Johnson"
  },
  {
    id: "m4",
    title: "Marketing Strategy",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    duration: 90,
    participants: [
      { id: "u1", name: "Alex Johnson", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1" },
      { id: "u11", name: "Amanda White", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=11" },
      { id: "u12", name: "Ryan Garcia", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=12" }
    ],
    status: "completed",
    host: "Amanda White"
  },
  {
    id: "m5",
    title: "Budget Review",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    duration: 60,
    participants: [
      { id: "u1", name: "Alex Johnson", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1" },
      { id: "u13", name: "Daniel Smith", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=13" }
    ],
    status: "completed",
    host: "Daniel Smith"
  },
  {
    id: "m6",
    title: "Design Review",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    duration: 45,
    participants: [
      { id: "u1", name: "Alex Johnson", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1" },
      { id: "u14", name: "Sophia Rodriguez", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=14" },
      { id: "u15", name: "William Jones", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=15" }
    ],
    status: "scheduled",
    host: "Sophia Rodriguez"
  },
  {
    id: "m7",
    title: "Quarterly Planning",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
    duration: 120,
    participants: [
      { id: "u1", name: "Alex Johnson", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1" },
      { id: "u2", name: "Sarah Miller", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2" },
      { id: "u3", name: "David Chen", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3" },
      { id: "u4", name: "Emily Davis", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4" },
      { id: "u5", name: "Michael Brown", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5" },
      { id: "u6", name: "Jessica Wilson", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=6" },
      { id: "u7", name: "Robert Taylor", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=7" }
    ],
    status: "scheduled",
    host: "Alex Johnson"
  },
  {
    id: "m8",
    title: "Team Building",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    duration: 180,
    participants: [
      { id: "u1", name: "Alex Johnson", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1" },
      { id: "u2", name: "Sarah Miller", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2" },
      { id: "u3", name: "David Chen", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3" },
      { id: "u4", name: "Emily Davis", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4" }
    ],
    status: "cancelled",
    host: "Sarah Miller"
  }
];

const Meetings: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const filteredMeetings = React.useMemo(() => {
    return meetingsData.filter(meeting => {
      const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            meeting.host.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || meeting.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const paginatedMeetings = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    
    return filteredMeetings.slice(start, end);
  }, [filteredMeetings, page]);

  const handleStartMeeting = (meeting: Meeting) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    addToast({
      title: "Meeting Started!",
      description: `You've started "${meeting.title}"`,
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

  const handleCreateMeeting = () => {
    addToast({
      title: "Create Meeting",
      description: "Opening meeting creation form",
      color: "primary",
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
             `, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  const getStatusChip = (status: Meeting["status"]) => {
    switch (status) {
      case "scheduled":
        return <Chip color="primary" size="sm" variant="flat">Scheduled</Chip>;
      case "live":
        return <Chip color="danger" size="sm" variant="flat" className="animate-pulse-slow">Live Now</Chip>;
      case "completed":
        return <Chip color="success" size="sm" variant="flat">Completed</Chip>;
      case "cancelled":
        return <Chip color="default" size="sm" variant="flat">Cancelled</Chip>;
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
          <h1 className="text-2xl font-bold">Meetings</h1>
          <p className="text-foreground-500">Manage all your scheduled meetings</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button
            color="primary"
            startContent={<Icon icon="lucide:plus" />}
            onPress={handleCreateMeeting}
          >
            Create Meeting
          </Button>
        </motion.div>
      </div>
      
      <Card className="gradient-card shadow-md">
        <CardBody>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <Input
              placeholder="Search meetings..."
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
                    setPage(1);
                  }}
                >
                  <DropdownItem key="all">All</DropdownItem>
                  <DropdownItem key="scheduled">Scheduled</DropdownItem>
                  <DropdownItem key="live">Live</DropdownItem>
                  <DropdownItem key="completed">Completed</DropdownItem>
                  <DropdownItem key="cancelled">Cancelled</DropdownItem>
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
                    Export to CSV
                  </DropdownItem>
                  <DropdownItem key="print" startContent={<Icon icon="lucide:printer" />}>
                    Print List
                  </DropdownItem>
                  <DropdownItem key="settings" startContent={<Icon icon="lucide:settings" />}>
                    Meeting Settings
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          
          <Table 
            aria-label="Meetings table"
            removeWrapper
            bottomContent={
              <div className="flex justify-center">
                <Pagination
                  total={Math.ceil(filteredMeetings.length / rowsPerPage)}
                  page={page}
                  onChange={setPage}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>MEETING</TableColumn>
              <TableColumn>DATE & TIME</TableColumn>
              <TableColumn>DURATION</TableColumn>
              <TableColumn>PARTICIPANTS</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No meetings found">
              {paginatedMeetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <p className="font-medium">{meeting.title}</p>
                      <p className="text-xs text-foreground-500">Host: {meeting.host}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(meeting.date)}</TableCell>
                  <TableCell>{meeting.duration} min</TableCell>
                  <TableCell>
                    <AvatarGroup max={3} size="sm">
                      {meeting.participants.map((participant) => (
                        <Avatar key={participant.id} src={participant.avatar} name={participant.name} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>{getStatusChip(meeting.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {meeting.status === "live" ? (
                        <Button
                          size="sm"
                          color="danger"
                          variant="flat"
                          onPress={() => handleJoinMeeting(meeting)}
                          startContent={<Icon icon="lucide:video" />}
                        >
                          Join
                        </Button>
                      ) : meeting.status === "scheduled" ? (
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          onPress={() => handleStartMeeting(meeting)}
                          startContent={<Icon icon="lucide:video" />}
                        >
                          Start
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="flat"
                          startContent={<Icon icon="lucide:eye" />}
                        >
                          View
                        </Button>
                      )}
                      
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            size="sm"
                            variant="light"
                            isIconOnly
                          >
                            <Icon icon="lucide:more-vertical" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Meeting actions">
                          <DropdownItem key="edit" startContent={<Icon icon="lucide:edit-3" />}>
                            Edit
                          </DropdownItem>
                          <DropdownItem key="share" startContent={<Icon icon="lucide:share-2" />}>
                            Share
                          </DropdownItem>
                          <DropdownItem key="copy" startContent={<Icon icon="lucide:copy" />}>
                            Copy Link
                          </DropdownItem>
                          {meeting.status === "scheduled" && (
                            <DropdownItem key="cancel" className="text-danger" color="danger" startContent={<Icon icon="lucide:x" />}>
                              Cancel
                            </DropdownItem>
                          )}
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Meetings;