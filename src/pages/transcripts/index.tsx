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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Progress
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { addToast } from "@heroui/react";

interface Transcript {
  id: string;
  meetingTitle: string;
  date: Date;
  duration: number;
  status: "processing" | "ready" | "error";
  progress?: number;
  wordCount?: number;
  speakers?: number;
  language: string;
}

const transcriptsData: Transcript[] = [
  {
    id: "t1",
    meetingTitle: "Q2 Planning Session",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    duration: 45,
    status: "ready",
    wordCount: 5240,
    speakers: 5,
    language: "English"
  },
  {
    id: "t2",
    meetingTitle: "Product Demo with Acme Corp",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    duration: 32,
    status: "ready",
    wordCount: 3850,
    speakers: 3,
    language: "English"
  },
  {
    id: "t3",
    meetingTitle: "UX Research Discussion",
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    duration: 28,
    status: "processing",
    progress: 65,
    language: "English"
  },
  {
    id: "t4",
    meetingTitle: "Marketing Strategy Review",
    date: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    duration: 52,
    status: "processing",
    progress: 90,
    language: "English"
  },
  {
    id: "t5",
    meetingTitle: "Engineering Sync",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    duration: 35,
    status: "ready",
    wordCount: 4120,
    speakers: 6,
    language: "English"
  },
  {
    id: "t6",
    meetingTitle: "Customer Feedback Session",
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    duration: 48,
    status: "ready",
    wordCount: 6350,
    speakers: 8,
    language: "English"
  },
  {
    id: "t7",
    meetingTitle: "Design System Workshop",
    date: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    duration: 65,
    status: "error",
    language: "English"
  },
  {
    id: "t8",
    meetingTitle: "Quarterly Review",
    date: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
    duration: 75,
    status: "ready",
    wordCount: 8920,
    speakers: 10,
    language: "English"
  },
  {
    id: "t9",
    meetingTitle: "International Partner Meeting",
    date: new Date(Date.now() - 1000 * 60 * 60 * 144), // 6 days ago
    duration: 60,
    status: "ready",
    wordCount: 7150,
    speakers: 4,
    language: "Spanish"
  }
];

const Transcripts: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [languageFilter, setLanguageFilter] = React.useState<string>("all");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const filteredTranscripts = React.useMemo(() => {
    return transcriptsData.filter(transcript => {
      const matchesSearch = transcript.meetingTitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || transcript.status === statusFilter;
      
      const matchesLanguage = languageFilter === "all" || transcript.language === languageFilter;
      
      return matchesSearch && matchesStatus && matchesLanguage;
    });
  }, [searchQuery, statusFilter, languageFilter]);

  const paginatedTranscripts = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    
    return filteredTranscripts.slice(start, end);
  }, [filteredTranscripts, page]);

  const handleAction = (action: string, transcript: Transcript) => {
    addToast({
      title: "Action performed",
      description: `${action} for "${transcript.meetingTitle}"`,
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

  const getStatusChip = (status: Transcript["status"], progress?: number) => {
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
      case "ready":
        return <Chip color="success" size="sm" variant="flat">Ready</Chip>;
      case "error":
        return <Chip color="danger" size="sm" variant="flat">Error</Chip>;
      default:
        return null;
    }
  };

  const languages = React.useMemo(() => {
    const uniqueLanguages = new Set(transcriptsData.map(t => t.language));
    return Array.from(uniqueLanguages);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold">Transcripts</h1>
          <p className="text-foreground-500">View and manage meeting transcripts</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button
            color="primary"
            startContent={<Icon icon="lucide:file-plus" />}
            onPress={() => addToast({
              title: "Request Transcript",
              description: "Opening transcript request form",
              color: "primary",
            })}
          >
            Request Transcript
          </Button>
        </motion.div>
      </div>
      
      <Card className="gradient-card shadow-md">
        <CardBody>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <Input
              placeholder="Search transcripts..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Icon icon="lucide:search" className="text-default-400" />}
              className="w-full sm:max-w-xs"
            />
            
            <div className="flex flex-wrap gap-2">
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
                  <DropdownItem key="ready">Ready</DropdownItem>
                  <DropdownItem key="processing">Processing</DropdownItem>
                  <DropdownItem key="error">Error</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="flat" 
                    endContent={<Icon icon="lucide:chevron-down" className="text-small" />}
                  >
                    Language: {languageFilter === "all" ? "All" : languageFilter}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Filter by language"
                  selectionMode="single"
                  selectedKeys={[languageFilter]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setLanguageFilter(selected);
                    setPage(1);
                  }}
                >
                  <DropdownItem key="all">All</DropdownItem>
                  {languages.map(lang => (
                    <DropdownItem key={lang}>{lang}</DropdownItem>
                  ))}
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
                  <DropdownItem key="settings" startContent={<Icon icon="lucide:settings" />}>
                    Transcript Settings
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          
          <Table 
            aria-label="Transcripts table"
            removeWrapper
            bottomContent={
              <div className="flex justify-center">
                <Pagination
                  total={Math.ceil(filteredTranscripts.length / rowsPerPage)}
                  page={page}
                  onChange={setPage}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>MEETING</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>DURATION</TableColumn>
              <TableColumn>LANGUAGE</TableColumn>
              <TableColumn>WORD COUNT</TableColumn>
              <TableColumn>SPEAKERS</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No transcripts found">
              {paginatedTranscripts.map((transcript) => (
                <TableRow key={transcript.id}>
                  <TableCell>
                    <p className="font-medium">{transcript.meetingTitle}</p>
                  </TableCell>
                  <TableCell>{formatDate(transcript.date)}</TableCell>
                  <TableCell>{formatDuration(transcript.duration)}</TableCell>
                  <TableCell>{transcript.language}</TableCell>
                  <TableCell>
                    {transcript.wordCount ? transcript.wordCount.toLocaleString() : "-"}
                  </TableCell>
                  <TableCell>
                    {transcript.speakers || "-"}
                  </TableCell>
                  <TableCell>{getStatusChip(transcript.status, transcript.progress)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {transcript.status === "ready" ? (
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          onPress={() => handleAction("View", transcript)}
                          startContent={<Icon icon="lucide:file-text" />}
                        >
                          View
                        </Button>
                      ) : transcript.status === "error" ? (
                        <Button
                          size="sm"
                          color="danger"
                          variant="flat"
                          onPress={() => handleAction("Retry", transcript)}
                          startContent={<Icon icon="lucide:refresh-cw" />}
                        >
                          Retry
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          isDisabled
                          variant="flat"
                          startContent={<Icon icon="lucide:clock" />}
                        >
                          Processing
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
                        <DropdownMenu aria-label="Transcript actions">
                          {transcript.status === "ready" && (
                            <>
                              <DropdownItem 
                                key="download" 
                                startContent={<Icon icon="lucide:download" />}
                                onPress={() => handleAction("Download", transcript)}
                              >
                                Download
                              </DropdownItem>
                              <DropdownItem 
                                key="share" 
                                startContent={<Icon icon="lucide:share-2" />}
                                onPress={() => handleAction("Share", transcript)}
                              >
                                Share
                              </DropdownItem>
                              <DropdownItem 
                                key="edit" 
                                startContent={<Icon icon="lucide:edit-3" />}
                                onPress={() => handleAction("Edit", transcript)}
                              >
                                Edit
                              </DropdownItem>
                            </>
                          )}
                          <DropdownItem 
                            key="delete" 
                            className="text-danger" 
                            color="danger"
                            startContent={<Icon icon="lucide:trash-2" />}
                            onPress={() => handleAction("Delete", transcript)}
                          >
                            Delete
                          </DropdownItem>
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

export default Transcripts;