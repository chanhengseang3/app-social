export const demoCredentials = {
  email: "ava.lee@teamconnect.demo",
  password: "demo1234",
};

export const currentUser = {
  id: "u1",
  name: "Ava Lee",
  initials: "AL",
  role: "People Operations Manager",
  department: "Operations",
  location: "San Francisco, CA",
  bio: "Building a stronger employee experience through communication, recognition, and shared knowledge.",
  status: "Online",
};

export const employees = [
  currentUser,
  {
    id: "u2",
    name: "Marcus Chen",
    initials: "MC",
    role: "Frontend Engineer",
    department: "Engineering",
    location: "Seattle, WA",
    bio: "Owns dashboard UI patterns and accessibility improvements.",
    status: "In a meeting",
  },
  {
    id: "u3",
    name: "Priya Nair",
    initials: "PN",
    role: "Product Designer",
    department: "Design",
    location: "Los Angeles, CA",
    bio: "Designing calm, usable workflows for hybrid teams.",
    status: "Online",
  },
  {
    id: "u4",
    name: "Jordan Alvarez",
    initials: "JA",
    role: "Engineering Manager",
    department: "Engineering",
    location: "Austin, TX",
    bio: "Focused on delivery, mentoring, and cross-team alignment.",
    status: "Away",
  },
  {
    id: "u5",
    name: "Sophia Patel",
    initials: "SP",
    role: "Internal Communications Lead",
    department: "Communications",
    location: "New York, NY",
    bio: "Shares updates that help every team stay informed.",
    status: "Online",
  },
  {
    id: "u6",
    name: "Noah Kim",
    initials: "NK",
    role: "HR Business Partner",
    department: "Human Resources",
    location: "Chicago, IL",
    bio: "Supports managers and employees through growth and change.",
    status: "Offline",
  },
];

export const feedPosts = [
  {
    id: "p1",
    authorId: "u5",
    authorName: "Sophia Patel",
    authorRole: "Internal Communications Lead",
    audience: "Company-wide",
    timeLabel: "35m ago",
    content:
      "We just published the spring retreat schedule. Please check the announcement section for travel timing, breakout sessions, and the team dinner plan.",
    likes: 24,
    comments: 7,
    topic: "Announcement",
  },
  {
    id: "p2",
    authorId: "u2",
    authorName: "Marcus Chen",
    authorRole: "Frontend Engineer",
    audience: "Engineering",
    timeLabel: "1h ago",
    content:
      "Finished the new profile card prototype for TeamConnect today. The cleaner layout gives us more room for bios, team tags, and recognition history.",
    likes: 18,
    comments: 4,
    topic: "Product Update",
  },
  {
    id: "p3",
    authorId: "u3",
    authorName: "Priya Nair",
    authorRole: "Product Designer",
    audience: "Design and Product",
    timeLabel: "3h ago",
    content:
      "Looking for quick feedback on the directory search experience. If you test it this week, tell me whether the filters feel clear enough for first-time users.",
    likes: 14,
    comments: 9,
    topic: "Feedback Request",
  },
  {
    id: "p4",
    authorId: "u4",
    authorName: "Jordan Alvarez",
    authorRole: "Engineering Manager",
    audience: "Leadership",
    timeLabel: "Yesterday",
    content:
      "Shoutout to everyone who helped with Q2 planning. We closed the review cycle earlier than expected and already have a better cross-team dependency map.",
    likes: 31,
    comments: 11,
    topic: "Team Win",
  },
];

export const announcements = [
  {
    id: "a1",
    title: "Office Closed for Spring Retreat",
    category: "Operations",
    author: "Sophia Patel",
    date: "2026-03-18",
    summary: "All offices will be closed on April 3 for the company retreat. Remote support remains available for urgent issues.",
  },
  {
    id: "a2",
    title: "Benefits Enrollment Opens Monday",
    category: "HR",
    author: "Noah Kim",
    date: "2026-03-17",
    summary: "Employees can review medical, dental, and wellness options through the end of the month.",
  },
  {
    id: "a3",
    title: "Q2 Planning Templates Published",
    category: "Leadership",
    author: "Ava Lee",
    date: "2026-03-15",
    summary: "Department leads can now access the updated planning templates and timeline in the knowledge base.",
  },
];

export const companyNews = [
  {
    id: "n1",
    headline: "TeamConnect Pilot Reaches 90% Weekly Participation",
    date: "2026-03-19",
    tag: "Product",
    excerpt: "The pilot group increased internal engagement with stronger profile completion and more peer recognition.",
  },
  {
    id: "n2",
    headline: "Customer Success Team Exceeds Renewal Target",
    date: "2026-03-14",
    tag: "Milestone",
    excerpt: "The team beat its quarterly target after launching a new onboarding and support workflow.",
  },
  {
    id: "n3",
    headline: "Mentorship Program Expands to New Hires",
    date: "2026-03-10",
    tag: "People",
    excerpt: "Employees joining this quarter will be paired with mentors during their first 60 days.",
  },
];

export const recognitionPosts = [
  {
    id: "r1",
    from: "Ava Lee",
    to: "Marcus Chen",
    date: "2026-03-20",
    message: "Thanks for simplifying the dashboard navigation. The new layout made the pilot much easier to demo.",
  },
  {
    id: "r2",
    from: "Jordan Alvarez",
    to: "Priya Nair",
    date: "2026-03-18",
    message: "Your profile and directory designs helped the team align quickly around the user flow.",
  },
  {
    id: "r3",
    from: "Sophia Patel",
    to: "Noah Kim",
    date: "2026-03-16",
    message: "Appreciate the clear benefits guide. Employees had fewer questions this week because of it.",
  },
];

export const knowledgeBaseArticles = [
  {
    id: "k1",
    title: "New Hire Onboarding Checklist",
    category: "Onboarding",
    updatedAt: "2026-03-12",
    owner: "People Operations",
  },
  {
    id: "k2",
    title: "How to Request Design Support",
    category: "Process",
    updatedAt: "2026-03-11",
    owner: "Design",
  },
  {
    id: "k3",
    title: "Company Travel and Expense Policy",
    category: "Policy",
    updatedAt: "2026-03-08",
    owner: "Finance",
  },
  {
    id: "k4",
    title: "Quarterly Planning Template Guide",
    category: "Operations",
    updatedAt: "2026-03-15",
    owner: "Operations",
  },
];

export const feedbackItems = [
  {
    id: "f1",
    type: "Suggestion",
    title: "Create a dedicated page for internal events",
    status: "Under Review",
    submittedBy: "Priya Nair",
    date: "2026-03-19",
  },
  {
    id: "f2",
    type: "Complaint",
    title: "Message notifications are too easy to miss",
    status: "Open",
    submittedBy: "Marcus Chen",
    date: "2026-03-17",
  },
  {
    id: "f3",
    type: "Feedback",
    title: "Recognition feed helps remote teams feel more visible",
    status: "Closed",
    submittedBy: "Sophia Patel",
    date: "2026-03-13",
  },
];

export const friendConnections = [
  { userId: "u1", friendId: "u2" },
  { userId: "u1", friendId: "u3" },
  { userId: "u1", friendId: "u5" },
  { userId: "u2", friendId: "u4" },
  { userId: "u3", friendId: "u5" },
];

export const chatThreads = [
  {
    id: "t1",
    name: "Marcus Chen",
    type: "direct",
    participants: ["u1", "u2"],
    lastMessage: "I pushed the final card layout for review.",
    updatedAt: "2026-03-20T14:20:00",
  },
  {
    id: "t2",
    name: "Launch Planning",
    type: "group",
    participants: ["u1", "u3", "u4", "u5"],
    lastMessage: "Let us lock the demo order by Friday.",
    updatedAt: "2026-03-20T09:05:00",
  },
];

export const messagesByThread = {
  t1: [
    {
      id: "m1",
      senderId: "u2",
      text: "I pushed the final card layout for review.",
      sentAt: "2026-03-20T14:20:00",
    },
    {
      id: "m2",
      senderId: "u1",
      text: "Looks good. I will use it in the walkthrough.",
      sentAt: "2026-03-20T14:23:00",
    },
  ],
  t2: [
    {
      id: "m3",
      senderId: "u5",
      text: "Let us lock the demo order by Friday.",
      sentAt: "2026-03-20T09:05:00",
    },
    {
      id: "m4",
      senderId: "u3",
      text: "I can cover the directory and profile screens.",
      sentAt: "2026-03-20T09:12:00",
    },
    {
      id: "m5",
      senderId: "u4",
      text: "I will handle the announcements and feedback flow.",
      sentAt: "2026-03-20T09:14:00",
    },
  ],
};

export const appNavigation = [
  { id: "nav-1", label: "Home", path: "/" },
  { id: "nav-2", label: "Directory", path: "/directory" },
  { id: "nav-3", label: "Messages", path: "/messages" },
  { id: "nav-4", label: "Announcements", path: "/announcements" },
  { id: "nav-5", label: "News", path: "/news" },
  { id: "nav-6", label: "Recognition", path: "/recognition" },
  { id: "nav-7", label: "Knowledge Base", path: "/knowledge-base" },
  { id: "nav-8", label: "Feedback", path: "/feedback" },
];

const teamConnectMockData = {
  demoCredentials,
  currentUser,
  employees,
  feedPosts,
  announcements,
  companyNews,
  recognitionPosts,
  knowledgeBaseArticles,
  feedbackItems,
  friendConnections,
  chatThreads,
  messagesByThread,
  appNavigation,
};

export default teamConnectMockData;
