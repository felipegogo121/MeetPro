import React from "react";
import { motion } from "framer-motion";
import { 
  Button, 
  Card, 
  CardBody, 
  CardHeader,
  Input, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Chip,
  Tabs,
  Tab,
  Progress
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { addToast } from "@heroui/react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface Insight {
  id: string;
  meetingTitle: string;
  date: Date;
  type: "sentiment" | "keywords" | "action-items" | "summary" | "engagement";
  status: "processing" | "ready";
  progress?: number;
}

const insightsData: Insight[] = [
  {
    id: "i1",
    meetingTitle: "Q2 Planning Session",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: "sentiment",
    status: "ready"
  },
  {
    id: "i2",
    meetingTitle: "Q2 Planning Session",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: "keywords",
    status: "ready"
  },
  {
    id: "i3",
    meetingTitle: "Q2 Planning Session",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: "action-items",
    status: "ready"
  },
  {
    id: "i4",
    meetingTitle: "Product Demo with Acme Corp",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: "sentiment",
    status: "ready"
  },
  {
    id: "i5",
    meetingTitle: "Product Demo with Acme Corp",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: "summary",
    status: "ready"
  },
  {
    id: "i6",
    meetingTitle: "UX Research Discussion",
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    type: "sentiment",
    status: "processing",
    progress: 65
  },
  {
    id: "i7",
    meetingTitle: "Engineering Sync",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    type: "engagement",
    status: "ready"
  },
  {
    id: "i8",
    meetingTitle: "Customer Feedback Session",
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    type: "keywords",
    status: "ready"
  },
  {
    id: "i9",
    meetingTitle: "Quarterly Review",
    date: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
    type: "action-items",
    status: "ready"
  }
];

// Sentiment data
const sentimentData = [
  { name: 'Positive', value: 65, color: 'hsl(var(--heroui-success-500))' },
  { name: 'Neutral', value: 25, color: 'hsl(var(--heroui-default-500))' },
  { name: 'Negative', value: 10, color: 'hsl(var(--heroui-danger-500))' }
];

// Engagement data
const engagementData = [
  { name: 'Alex', speaking: 35, listening: 65 },
  { name: 'Sarah', speaking: 25, listening: 75 },
  { name: 'David', speaking: 45, listening: 55 },
  { name: 'Emily', speaking: 15, listening: 85 },
  { name: 'Michael', speaking: 30, listening: 70 }
];

// Keywords data
const keywordsData = [
  { text: 'Product Roadmap', value: 25 },
  { text: 'Customer Feedback', value: 18 },
  { text: 'Q3 Goals', value: 15 },
  { text: 'Design System', value: 12 },
  { text: 'User Research', value: 10 },
  { text: 'Budget', value: 8 },
  { text: 'Timeline', value: 7 },
  { text: 'Marketing', value: 5 }
];

// Action items data
const actionItemsData = [
  { id: 'a1', task: 'Update product roadmap with new features', assignee: 'Alex', dueDate: '2023-06-15', status: 'pending' },
  { id: 'a2', task: 'Schedule user research sessions', assignee: 'Sarah', dueDate: '2023-06-10', status: 'completed' },
  { id: 'a3', task: 'Prepare Q3 budget proposal', assignee: 'David', dueDate: '2023-06-20', status: 'pending' },
  { id: 'a4', task: 'Review design system updates', assignee: 'Emily', dueDate: '2023-06-12', status: 'pending' },
  { id: 'a5', task: 'Create marketing campaign brief', assignee: 'Michael', dueDate: '2023-06-18', status: 'pending' }
];

const Insights: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState("overview");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");

  const filteredInsights = React.useMemo(() => {
    return insightsData.filter(insight => {
      const matchesSearch = insight.meetingTitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = typeFilter === "all" || insight.type === typeFilter;
      
      return matchesSearch && matchesType;
    });
  }, [searchQuery, typeFilter]);

  const handleAction = (action: string, insight: Insight) => {
    addToast({
      title: "Action performed",
      description: `${action} for "${insight.meetingTitle}" ${insight.type} insight`,
      color: "primary",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusChip = (status: Insight["status"], progress?: number) => {
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
      default:
        return null;
    }
  };

  const getInsightTypeIcon = (type: Insight["type"]) => {
    switch (type) {
      case "sentiment":
        return "lucide:smile";
      case "keywords":
        return "lucide:hash";
      case "action-items":
        return "lucide:check-square";
      case "summary":
        return "lucide:file-text";
      case "engagement":
        return "lucide:bar-chart";
      default:
        return "lucide:lightbulb";
    }
  };

  const getInsightTypeColor = (type: Insight["type"]) => {
    switch (type) {
      case "sentiment":
        return "success";
      case "keywords":
        return "primary";
      case "action-items":
        return "warning";
      case "summary":
        return "default";
      case "engagement":
        return "secondary";
      default:
        return "primary";
    }
  };

  const getInsightTypeName = (type: Insight["type"]) => {
    switch (type) {
      case "sentiment":
        return "Sentiment Analysis";
      case "keywords":
        return "Key Topics";
      case "action-items":
        return "Action Items";
      case "summary":
        return "Meeting Summary";
      case "engagement":
        return "Engagement Metrics";
      default:
        return type;
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
          <h1 className="text-2xl font-bold">AI Insights</h1>
          <p className="text-foreground-500">AI-powered analysis of your meetings</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Tabs 
            aria-label="Insights tabs" 
            selectedKey={selectedTab} 
            onSelectionChange={(key) => setSelectedTab(key as string)}
            color="primary"
            variant="light"
            size="sm"
            className="w-full sm:w-auto"
          >
            <Tab key="overview" title="Overview" />
            <Tab key="insights" title="All Insights" />
            <Tab key="settings" title="Settings" />
          </Tabs>
        </motion.div>
      </div>
      
      {selectedTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="gradient-card shadow-md">
              <CardHeader className="flex flex-col gap-1 pb-0">
                <h3 className="text-lg font-semibold">Sentiment Analysis</h3>
                <p className="text-sm text-foreground-500">Overall meeting sentiment</p>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Percentage"]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--heroui-content1))",
                        borderColor: "hsl(var(--heroui-divider))",
                        borderRadius: "8px",
                        boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)"
                      }}
                    />
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
            
            <Card className="gradient-card shadow-md">
              <CardHeader className="flex flex-col gap-1 pb-0">
                <h3 className="text-lg font-semibold">Engagement Metrics</h3>
                <p className="text-sm text-foreground-500">Speaking vs. listening time</p>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={engagementData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--heroui-default-200))" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      style={{
                        fontSize: "12px",
                        fill: "hsl(var(--heroui-foreground-500))"
                      }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      style={{
                        fontSize: "12px",
                        fill: "hsl(var(--heroui-foreground-500))"
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--heroui-content1))",
                        borderColor: "hsl(var(--heroui-divider))",
                        borderRadius: "8px",
                        boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)"
                      }}
                    />
                    <Legend />
                    <Bar dataKey="speaking" name="Speaking" fill="hsl(var(--heroui-primary-500))" />
                    <Bar dataKey="listening" name="Listening" fill="hsl(var(--heroui-secondary-500))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="gradient-card shadow-md">
              <CardHeader className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">Key Topics</h3>
                <p className="text-sm text-foreground-500">Most discussed topics</p>
              </CardHeader>
              <CardBody>
                <div className="flex flex-wrap gap-2">
                  {keywordsData.map((keyword, index) => (
                    <Chip
                      key={index}
                      color={index < 3 ? "primary" : "default"}
                      variant="flat"
                      size="lg"
                      className="mb-2"
                    >
                      {keyword.text}
                    </Chip>
                  ))}
                </div>
              </CardBody>
            </Card>
            
            <Card className="gradient-card shadow-md">
              <CardHeader className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">Action Items</h3>
                <p className="text-sm text-foreground-500">Tasks identified from meetings</p>
              </CardHeader>
              <CardBody className="p-0">
                <div className="divide-y divide-divider">
                  {actionItemsData.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{item.task}</p>
                        <div className="flex items-center gap-2 text-xs text-foreground-500 mt-1">
                          <span>Assignee: {item.assignee}</span>
                          <span>•</span>
                          <span>Due: {item.dueDate}</span>
                        </div>
                      </div>
                      <Chip
                        color={item.status === "completed" ? "success" : "warning"}
                        size="sm"
                        variant="flat"
                      >
                        {item.status === "completed" ? "Completed" : "Pending"}
                      </Chip>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
      
      {selectedTab === "insights" && (
        <Card className="gradient-card shadow-md">
          <CardBody>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <Input
                placeholder="Search insights..."
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
                      Type: {typeFilter === "all" ? "All" : getInsightTypeName(typeFilter as Insight["type"])}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Filter by type"
                    selectionMode="single"
                    selectedKeys={[typeFilter]}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      setTypeFilter(selected);
                    }}
                  >
                    <DropdownItem key="all">All</DropdownItem>
                    <DropdownItem key="sentiment">Sentiment Analysis</DropdownItem>
                    <DropdownItem key="keywords">Key Topics</DropdownItem>
                    <DropdownItem key="action-items">Action Items</DropdownItem>
                    <DropdownItem key="summary">Meeting Summary</DropdownItem>
                    <DropdownItem key="engagement">Engagement Metrics</DropdownItem>
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
                      Export Insights
                    </DropdownItem>
                    <DropdownItem key="settings" startContent={<Icon icon="lucide:settings" />}>
                      Insight Settings
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            
            {filteredInsights.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Icon icon="lucide:lightbulb" className="text-5xl text-foreground-300 mb-4" />
                <p className="text-xl font-medium mb-2">No insights found</p>
                <p className="text-foreground-500 mb-6 text-center max-w-md">
                  No insights match your current filters. Try changing your search criteria.
                </p>
                <Button
                  color="primary"
                  variant="flat"
                  startContent={<Icon icon="lucide:refresh-cw" />}
                  onPress={() => {
                    setSearchQuery("");
                    setTypeFilter("all");
                  }}
                >
                  Reset Filters
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredInsights.map((insight) => (
                  <motion.div
                    key={insight.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                      }
                    }}
                  >
                    <Card className="border border-divider">
                      <CardBody className="p-4">
                        <div className="flex justify-between items-start">
                          <div className={`rounded-full p-3 bg-${getInsightTypeColor(insight.type)}-100 text-${getInsightTypeColor(insight.type)}-600 dark:bg-${getInsightTypeColor(insight.type)}-900/30 dark:text-${getInsightTypeColor(insight.type)}-400`}>
                            <Icon icon={getInsightTypeIcon(insight.type)} className="text-xl" />
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
                            <DropdownMenu aria-label="Insight actions">
                              {insight.status === "ready" && (
                                <>
                                  <DropdownItem 
                                    key="view" 
                                    startContent={<Icon icon="lucide:eye" />}
                                    onPress={() => handleAction("View", insight)}
                                  >
                                    View Details
                                  </DropdownItem>
                                  <DropdownItem 
                                    key="share" 
                                    startContent={<Icon icon="lucide:share-2" />}
                                    onPress={() => handleAction("Share", insight)}
                                  >
                                    Share
                                  </DropdownItem>
                                  <DropdownItem 
                                    key="download" 
                                    startContent={<Icon icon="lucide:download" />}
                                    onPress={() => handleAction("Download", insight)}
                                  >
                                    Download
                                  </DropdownItem>
                                </>
                              )}
                              <DropdownItem 
                                key="regenerate" 
                                startContent={<Icon icon="lucide:refresh-cw" />}
                                onPress={() => handleAction("Regenerate", insight)}
                              >
                                Regenerate
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        
                        <div className="mt-4">
                          <h3 className="font-medium mb-1">{getInsightTypeName(insight.type)}</h3>
                          <p className="text-sm text-foreground-500 mb-3">{insight.meetingTitle}</p>
                          
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-foreground-500">{formatDate(insight.date)}</p>
                            {getStatusChip(insight.status, insight.progress)}
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
      )}
      
      {selectedTab === "settings" && (
        <Card className="gradient-card shadow-md">
          <CardBody>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">AI Insight Settings</h3>
                <p className="text-foreground-500 mb-4">Configure how AI analyzes your meetings</p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                    <div>
                      <h4 className="font-medium">Automatic Insights</h4>
                      <p className="text-sm text-foreground-500">Generate insights for all meetings automatically</p>
                    </div>
                    <Button
                      color="primary"
                      variant="flat"
                    >
                      Enabled
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                    <div>
                      <h4 className="font-medium">Insight Types</h4>
                      <p className="text-sm text-foreground-500">Select which types of insights to generate</p>
                    </div>
                    <Button
                      variant="flat"
                      endContent={<Icon icon="lucide:chevron-right" />}
                      onPress={() => addToast({
                        title: "Insight Types",
                        description: "Opening insight type settings",
                        color: "primary",
                      })}
                    >
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                    <div>
                      <h4 className="font-medium">Language Settings</h4>
                      <p className="text-sm text-foreground-500">Configure language preferences for insights</p>
                    </div>
                    <Button
                      variant="flat"
                      endContent={<Icon icon="lucide:chevron-right" />}
                      onPress={() => addToast({
                        title: "Language Settings",
                        description: "Opening language settings",
                        color: "primary",
                      })}
                    >
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                    <div>
                      <h4 className="font-medium">Data Retention</h4>
                      <p className="text-sm text-foreground-500">Control how long insights are stored</p>
                    </div>
                    <Button
                      variant="flat"
                      endContent={<Icon icon="lucide:chevron-right" />}
                      onPress={() => addToast({
                        title: "Data Retention",
                        description: "Opening data retention settings",
                        color: "primary",
                      })}
                    >
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                    <div>
                      <h4 className="font-medium">AI Model</h4>
                      <p className="text-sm text-foreground-500">Select AI model for generating insights</p>
                    </div>
                    <Button
                      variant="flat"
                      endContent={<Icon icon="lucide:chevron-right" />}
                      onPress={() => addToast({
                        title: "AI Model",
                        description: "Opening AI model settings",
                        color: "primary",
                      })}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Privacy Settings</h3>
                <p className="text-foreground-500 mb-4">Control how your meeting data is used</p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                    <div>
                      <h4 className="font-medium">Data Sharing</h4>
                      <p className="text-sm text-foreground-500">Control how insights are shared with team members</p>
                    </div>
                    <Button
                      variant="flat"
                      endContent={<Icon icon="lucide:chevron-right" />}
                      onPress={() => addToast({
                        title: "Data Sharing",
                        description: "Opening data sharing settings",
                        color: "primary",
                      })}
                    >
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 border border-divider rounded-md">
                    <div>
                      <h4 className="font-medium">Sensitive Information</h4>
                      <p className="text-sm text-foreground-500">Configure how sensitive information is handled</p>
                    </div>
                    <Button
                      variant="flat"
                      endContent={<Icon icon="lucide:chevron-right" />}
                      onPress={() => addToast({
                        title: "Sensitive Information",
                        description: "Opening sensitive information settings",
                        color: "primary",
                      })}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default Insights;