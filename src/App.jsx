import { startTransition, useDeferredValue, useState } from "react";
import teamConnectMockData from "./mock-data/teamConnectMockData";

const profileNavigation = { id: "nav-profile", label: "Profile", path: "/profile" };
const navigationItems = [
  teamConnectMockData.appNavigation[0],
  profileNavigation,
  ...teamConnectMockData.appNavigation.slice(1),
];

const viewTitles = {
  "/": "Home feed for the whole company",
  "/profile": "Personal profile and activity",
  "/directory": "Find coworkers by team and role",
  "/messages": "Direct and group conversations",
  "/announcements": "Official company updates",
  "/news": "Business highlights and milestones",
  "/recognition": "Celebrate wins across teams",
  "/knowledge-base": "Guides, policies, and onboarding",
  "/feedback": "Employee voice, complaints, and ideas",
};

function App() {
  const [authMode, setAuthMode] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: teamConnectMockData.demoCredentials.email,
    password: teamConnectMockData.demoCredentials.password,
  });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    department: "Operations",
    role: "",
  });
  const [activePath, setActivePath] = useState("/");
  const [directoryQuery, setDirectoryQuery] = useState("");
  const [knowledgeQuery, setKnowledgeQuery] = useState("");
  const [employees, setEmployees] = useState(teamConnectMockData.employees);
  const [currentUser, setCurrentUser] = useState(teamConnectMockData.currentUser);
  const [connections, setConnections] = useState(teamConnectMockData.friendConnections);
  const [feedPosts, setFeedPosts] = useState(teamConnectMockData.feedPosts);
  const [recognitionPosts, setRecognitionPosts] = useState(teamConnectMockData.recognitionPosts);
  const [feedbackItems, setFeedbackItems] = useState(teamConnectMockData.feedbackItems);
  const [chatThreads] = useState(teamConnectMockData.chatThreads);
  const [messagesByThread, setMessagesByThread] = useState(teamConnectMockData.messagesByThread);
  const [selectedThreadId, setSelectedThreadId] = useState(teamConnectMockData.chatThreads[0].id);
  const [recognitionForm, setRecognitionForm] = useState({
    to: teamConnectMockData.employees[1].name,
    message: "",
  });
  const [feedbackForm, setFeedbackForm] = useState({
    type: "Suggestion",
    title: "",
  });
  const [messageDraft, setMessageDraft] = useState("");
  const [postDraft, setPostDraft] = useState("");
  const deferredDirectoryQuery = useDeferredValue(directoryQuery);
  const deferredKnowledgeQuery = useDeferredValue(knowledgeQuery);

  const selectedThread = chatThreads.find((thread) => thread.id === selectedThreadId) ?? chatThreads[0];
  const selectedMessages = messagesByThread[selectedThread.id] ?? [];
  const connectionIds = connections
    .filter((entry) => entry.userId === currentUser.id || entry.friendId === currentUser.id)
    .map((entry) => (entry.userId === currentUser.id ? entry.friendId : entry.userId));

  const filteredEmployees = employees.filter((employee) => {
    const query = deferredDirectoryQuery.trim().toLowerCase();
    if (!query) return employee.id !== currentUser.id;
    const haystack = `${employee.name} ${employee.role} ${employee.department} ${employee.location}`.toLowerCase();
    return employee.id !== currentUser.id && haystack.includes(query);
  });

  const filteredKnowledgeArticles = teamConnectMockData.knowledgeBaseArticles.filter((article) => {
    const query = deferredKnowledgeQuery.trim().toLowerCase();
    if (!query) return true;
    return `${article.title} ${article.category} ${article.owner}`.toLowerCase().includes(query);
  });

  const handleLogin = (event) => {
    event.preventDefault();
    if (
      loginForm.email === teamConnectMockData.demoCredentials.email &&
      loginForm.password === teamConnectMockData.demoCredentials.password
    ) {
      setIsAuthenticated(true);
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    const newUser = {
      id: `u${employees.length + 1}`,
      name: signupForm.name || "New Employee",
      initials: (signupForm.name || "NE")
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      role: signupForm.role || "Team Member",
      department: signupForm.department,
      location: "Remote",
      bio: "New TeamConnect member exploring the employee network.",
      status: "Online",
    };

    setEmployees((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
  };

  const handleNavigate = (path) => {
    startTransition(() => {
      setActivePath(path);
    });
  };

  const handleToggleConnection = (employeeId) => {
    setConnections((prev) => {
      const existing = prev.find(
        (entry) =>
          (entry.userId === currentUser.id && entry.friendId === employeeId) ||
          (entry.userId === employeeId && entry.friendId === currentUser.id)
      );
      if (existing) {
        return prev.filter((entry) => entry !== existing);
      }
      return [...prev, { userId: currentUser.id, friendId: employeeId }];
    });
  };

  const handleRecognitionSubmit = (event) => {
    event.preventDefault();
    if (!recognitionForm.message.trim()) return;
    setRecognitionPosts((prev) => [
      {
        id: `r${prev.length + 1}`,
        from: currentUser.name,
        to: recognitionForm.to,
        date: new Date().toISOString().slice(0, 10),
        message: recognitionForm.message.trim(),
      },
      ...prev,
    ]);
    setRecognitionForm((prev) => ({ ...prev, message: "" }));
  };

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();
    if (!feedbackForm.title.trim()) return;
    setFeedbackItems((prev) => [
      {
        id: `f${prev.length + 1}`,
        type: feedbackForm.type,
        title: feedbackForm.title.trim(),
        status: "Open",
        submittedBy: currentUser.name,
        date: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setFeedbackForm((prev) => ({ ...prev, title: "" }));
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    if (!postDraft.trim()) return;
    setFeedPosts((prev) => [
      {
        id: `p${prev.length + 1}`,
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorRole: currentUser.role,
        audience: "Company-wide",
        timeLabel: "Just now",
        content: postDraft.trim(),
        likes: 0,
        comments: 0,
        topic: "Employee Post",
      },
      ...prev,
    ]);
    setPostDraft("");
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (!messageDraft.trim()) return;
    setMessagesByThread((prev) => ({
      ...prev,
      [selectedThread.id]: [
        ...(prev[selectedThread.id] ?? []),
        {
          id: `m${Date.now()}`,
          senderId: currentUser.id,
          text: messageDraft.trim(),
          sentAt: new Date().toISOString(),
        },
      ],
    }));
    setMessageDraft("");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActivePath("/");
    setAuthMode("login");
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-shell">
        <div className="ambient ambient-left" />
        <div className="ambient ambient-right" />
        <section className="auth-panel">
          <div className="brand-lockup">
            <span className="brand-pill">TeamConnect</span>
            <h1>Internal social UI prototype for a modern workplace.</h1>
            <p>
              React-driven demo screens for employee networking, messaging, announcements, recognition,
              and knowledge sharing.
            </p>
          </div>

          <div className="auth-card">
            <div className="auth-toggle">
              <button
                className={authMode === "login" ? "is-active" : ""}
                onClick={() => setAuthMode("login")}
                type="button"
              >
                Login
              </button>
              <button
                className={authMode === "signup" ? "is-active" : ""}
                onClick={() => setAuthMode("signup")}
                type="button"
              >
                Sign Up
              </button>
            </div>

            {authMode === "login" ? (
              <form className="auth-form" onSubmit={handleLogin}>
                <label>
                  Work Email
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                  />
                </label>
                <button className="primary-button" type="submit">
                  Enter Demo
                </button>
                <p className="support-copy">
                  Demo credentials: {teamConnectMockData.demoCredentials.email} /{" "}
                  {teamConnectMockData.demoCredentials.password}
                </p>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleSignup}>
                <label>
                  Full Name
                  <input
                    type="text"
                    value={signupForm.name}
                    onChange={(event) => setSignupForm((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Taylor Morgan"
                  />
                </label>
                <label>
                  Work Email
                  <input
                    type="email"
                    value={signupForm.email}
                    onChange={(event) => setSignupForm((prev) => ({ ...prev, email: event.target.value }))}
                    placeholder="taylor@teamconnect.demo"
                  />
                </label>
                <label>
                  Role
                  <input
                    type="text"
                    value={signupForm.role}
                    onChange={(event) => setSignupForm((prev) => ({ ...prev, role: event.target.value }))}
                    placeholder="Product Manager"
                  />
                </label>
                <label>
                  Department
                  <select
                    value={signupForm.department}
                    onChange={(event) => setSignupForm((prev) => ({ ...prev, department: event.target.value }))}
                  >
                    <option>Operations</option>
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Communications</option>
                    <option>Human Resources</option>
                  </select>
                </label>
                <button className="primary-button" type="submit">
                  Create Demo Profile
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="background-grid" />
      <aside className="sidebar">
        <div>
          <span className="brand-pill">TeamConnect</span>
          <h2>Employee Hub</h2>
          <p>UI-only React prototype with mock data.</p>
        </div>

        <nav className="nav-list" aria-label="Primary">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={activePath === item.path ? "nav-item is-active" : "nav-item"}
              onClick={() => handleNavigate(item.path)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <div className="avatar-large">{currentUser.initials}</div>
          <div>
            <strong>{currentUser.name}</strong>
            <p>{currentUser.role}</p>
          </div>
          <button className="secondary-button" onClick={handleLogout} type="button">
            Log Out
          </button>
        </div>
      </aside>

      <main className="content-shell">
        <header className="hero-panel">
          <div>
            <span className="eyebrow">Connected workforce</span>
            <h1>{viewTitles[activePath]}</h1>
            <p>
              Showcase the TeamConnect experience with realistic screens, client-side interactions, and
              polished demo content.
            </p>
          </div>
          <div className="hero-actions">
            <div className="status-chip">
              <span className="status-dot" />
              Session active
            </div>
            <div className="hero-metric">
              <strong>{connectionIds.length}</strong>
              <span>Connections</span>
            </div>
          </div>
        </header>

        {activePath === "/" && (
          <HomeView
            announcements={teamConnectMockData.announcements}
            companyNews={teamConnectMockData.companyNews}
            currentUser={currentUser}
            feedPosts={feedPosts}
            feedbackItems={feedbackItems}
            onPostSubmit={handlePostSubmit}
            postDraft={postDraft}
            setPostDraft={setPostDraft}
          />
        )}
        {activePath === "/profile" && (
          <ProfileView connectionCount={connectionIds.length} currentUser={currentUser} recognitionPosts={recognitionPosts} />
        )}
        {activePath === "/directory" && (
          <DirectoryView
            connectionIds={connectionIds}
            employees={filteredEmployees}
            onToggleConnection={handleToggleConnection}
            query={directoryQuery}
            setQuery={setDirectoryQuery}
          />
        )}
        {activePath === "/messages" && (
          <MessagesView
            currentUser={currentUser}
            messageDraft={messageDraft}
            messages={selectedMessages}
            onMessageDraftChange={setMessageDraft}
            onMessageSubmit={handleMessageSubmit}
            onSelectThread={(threadId) =>
              startTransition(() => {
                setSelectedThreadId(threadId);
              })
            }
            selectedThreadId={selectedThread.id}
            threads={chatThreads}
            users={employees}
          />
        )}
        {activePath === "/announcements" && <AnnouncementsView announcements={teamConnectMockData.announcements} />}
        {activePath === "/news" && <NewsView items={teamConnectMockData.companyNews} />}
        {activePath === "/recognition" && (
          <RecognitionView
            currentUser={currentUser}
            employees={employees}
            form={recognitionForm}
            onChange={setRecognitionForm}
            onSubmit={handleRecognitionSubmit}
            posts={recognitionPosts}
          />
        )}
        {activePath === "/knowledge-base" && (
          <KnowledgeBaseView
            articles={filteredKnowledgeArticles}
            query={knowledgeQuery}
            setQuery={setKnowledgeQuery}
          />
        )}
        {activePath === "/feedback" && (
          <FeedbackView
            feedbackForm={feedbackForm}
            feedbackItems={feedbackItems}
            onFormChange={setFeedbackForm}
            onSubmit={handleFeedbackSubmit}
          />
        )}
      </main>
    </div>
  );
}

function HomeView({
  announcements,
  companyNews,
  currentUser,
  feedPosts,
  feedbackItems,
  onPostSubmit,
  postDraft,
  setPostDraft,
}) {
  return (
    <div className="view-grid">
      <section className="panel panel-span-2 home-compose-panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Home</span>
            <h3>What is happening across TeamConnect?</h3>
          </div>
          <span className="soft-tag">Company-wide feed</span>
        </div>
        <form className="stack-form compact-form" onSubmit={onPostSubmit}>
          <label>
            Share an update
            <textarea
              className="compact-textarea"
              rows="3"
              value={postDraft}
              onChange={(event) => setPostDraft(event.target.value)}
              placeholder={`What would you like to share, ${currentUser.name.split(" ")[0]}?`}
            />
          </label>
          <div className="feed-compose-actions">
            <span className="muted-copy">Posts stay in local React state for demo purposes.</span>
            <button className="primary-button" type="submit">
              Post Update
            </button>
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">For You</span>
            <h3>Quick profile view</h3>
          </div>
          <span className="soft-tag">{currentUser.department}</span>
        </div>
        <article className="list-card profile-summary-card">
          <div className="avatar-large">{currentUser.initials}</div>
          <div>
            <strong>{currentUser.name}</strong>
            <p>{currentUser.role}</p>
            <p>{currentUser.location}</p>
          </div>
        </article>
      </section>

      <section className="panel panel-span-2">
        <div className="section-heading">
          <h3>Employee Feed</h3>
          <span className="soft-tag">{feedPosts.length} posts</span>
        </div>
        <div className="stack-list">
          {feedPosts.map((post) => (
            <article className="list-card feed-card" key={post.id}>
              <div className="feed-card-header">
                <div className="feed-author">
                  <div className="avatar-large">
                    {post.authorName
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <strong>{post.authorName}</strong>
                    <p>
                      {post.authorRole} • {post.audience}
                    </p>
                  </div>
                </div>
                <div className="feed-meta">
                  <span className="soft-tag">{post.topic}</span>
                  <span className="muted-copy">{post.timeLabel}</span>
                </div>
              </div>
              <p className="feed-content">{post.content}</p>
              <div className="feed-actions">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <h3>Announcements</h3>
          <span className="soft-tag">{announcements.length}</span>
        </div>
        <div className="stack-list">
          {announcements.slice(0, 2).map((item) => (
            <article className="list-card" key={item.id}>
              <strong>{item.title}</strong>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <h3>Trending News</h3>
          <span className="soft-tag">Highlights</span>
        </div>
        <div className="stack-list">
          {companyNews.slice(0, 2).map((item) => (
            <article className="list-card" key={item.id}>
              <strong>{item.headline}</strong>
              <p>{item.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <h3>Feedback Pulse</h3>
          <span className="soft-tag">{feedbackItems.length} open items</span>
        </div>
        <div className="stack-list">
          {feedbackItems.slice(0, 2).map((item) => (
            <article className="list-card" key={item.id}>
              <strong>{item.title}</strong>
              <p>
                {item.type} • {item.status}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProfileView({ connectionCount, currentUser, recognitionPosts }) {
  const receivedRecognition = recognitionPosts.filter((post) => post.to === currentUser.name).length;

  return (
    <div className="view-grid">
      <section className="panel profile-banner panel-span-2">
        <div className="avatar-hero">{currentUser.initials}</div>
        <div>
          <span className="eyebrow">Employee Profile</span>
          <h3>{currentUser.name}</h3>
          <p>
            {currentUser.role} • {currentUser.department} • {currentUser.location}
          </p>
          <p>{currentUser.bio}</p>
        </div>
      </section>

      <section className="panel">
        <h3>Quick Snapshot</h3>
        <div className="stack-list">
          <article className="list-card">
            <strong>{currentUser.status}</strong>
            <p>Current status</p>
          </article>
          <article className="list-card">
            <strong>{connectionCount}</strong>
            <p>Team connections</p>
          </article>
          <article className="list-card">
            <strong>{receivedRecognition}</strong>
            <p>Recognition posts received</p>
          </article>
        </div>
      </section>

      <section className="panel">
        <h3>Profile Focus</h3>
        <div className="stack-list">
          <article className="list-card">
            <strong>Communication</strong>
            <p>Stay visible through announcements, profile updates, and direct messages.</p>
          </article>
          <article className="list-card">
            <strong>Community</strong>
            <p>Build internal relationships through the directory and recognition feed.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

function DirectoryView({ connectionIds, employees, onToggleConnection, query, setQuery }) {
  return (
    <div className="view-grid">
      <section className="panel panel-span-2">
        <div className="section-heading">
          <h3>Member Directory</h3>
          <span className="soft-tag">{employees.length} coworkers</span>
        </div>
        <label className="search-field">
          <span>Search by name, role, department, or location</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the company"
          />
        </label>
        <div className="directory-grid">
          {employees.map((employee) => {
            const isConnected = connectionIds.includes(employee.id);
            return (
              <article className="member-card" key={employee.id}>
                <div className="avatar-large">{employee.initials}</div>
                <strong>{employee.name}</strong>
                <p>{employee.role}</p>
                <p>
                  {employee.department} • {employee.location}
                </p>
                <span className="soft-tag">{employee.status}</span>
                <button
                  className={isConnected ? "secondary-button" : "primary-button"}
                  onClick={() => onToggleConnection(employee.id)}
                  type="button"
                >
                  {isConnected ? "Remove Connection" : "Add Connection"}
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function MessagesView({
  currentUser,
  messageDraft,
  messages,
  onMessageDraftChange,
  onMessageSubmit,
  onSelectThread,
  selectedThreadId,
  threads,
  users,
}) {
  return (
    <div className="messages-layout">
      <section className="panel thread-list-panel">
        <div className="section-heading">
          <h3>Conversations</h3>
          <span className="soft-tag">{threads.length} threads</span>
        </div>
        <div className="thread-list">
          {threads.map((thread) => (
            <button
              className={thread.id === selectedThreadId ? "thread-card is-active" : "thread-card"}
              key={thread.id}
              onClick={() => onSelectThread(thread.id)}
              type="button"
            >
              <strong>{thread.name}</strong>
              <p>{thread.lastMessage}</p>
              <span className="soft-tag">{thread.type}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel conversation-panel">
        <div className="section-heading">
          <h3>Thread Messages</h3>
          <span className="soft-tag">Public and private demo chats</span>
        </div>
        <div className="conversation">
          {messages.map((message) => {
            const sender = users.find((user) => user.id === message.senderId);
            const isOwnMessage = message.senderId === currentUser.id;
            return (
              <article className={isOwnMessage ? "chat-bubble is-own" : "chat-bubble"} key={message.id}>
                <strong>{sender?.name ?? "Unknown User"}</strong>
                <p>{message.text}</p>
              </article>
            );
          })}
        </div>
        <form className="message-form" onSubmit={onMessageSubmit}>
          <input
            type="text"
            value={messageDraft}
            onChange={(event) => onMessageDraftChange(event.target.value)}
            placeholder="Write a reply for the demo"
          />
          <button className="primary-button" type="submit">
            Send
          </button>
        </form>
      </section>
    </div>
  );
}

function AnnouncementsView({ announcements }) {
  return (
    <div className="view-grid">
      {announcements.map((item) => (
        <section className="panel" key={item.id}>
          <div className="section-heading">
            <h3>{item.title}</h3>
            <span className="soft-tag">{item.category}</span>
          </div>
          <p>{item.summary}</p>
          <p className="muted-copy">
            {item.author} • {item.date}
          </p>
        </section>
      ))}
    </div>
  );
}

function NewsView({ items }) {
  return (
    <div className="view-grid">
      {items.map((item) => (
        <section className="panel" key={item.id}>
          <div className="section-heading">
            <h3>{item.headline}</h3>
            <span className="soft-tag">{item.tag}</span>
          </div>
          <p>{item.excerpt}</p>
          <p className="muted-copy">{item.date}</p>
        </section>
      ))}
    </div>
  );
}

function RecognitionView({ currentUser, employees, form, onChange, onSubmit, posts }) {
  return (
    <div className="view-grid">
      <section className="panel">
        <h3>Send Recognition</h3>
        <form className="stack-form" onSubmit={onSubmit}>
          <label>
            Recognize
              <select value={form.to} onChange={(event) => onChange((prev) => ({ ...prev, to: event.target.value }))}>
              {employees
                .filter((employee) => employee.name !== currentUser.name)
                .map((employee) => (
                  <option key={employee.id}>{employee.name}</option>
                ))}
            </select>
          </label>
          <label>
            Message
            <textarea
              rows="4"
              value={form.message}
              onChange={(event) => onChange((prev) => ({ ...prev, message: event.target.value }))}
              placeholder="Highlight a recent contribution"
            />
          </label>
          <button className="primary-button" type="submit">
            Post Recognition
          </button>
        </form>
      </section>

      <section className="panel panel-span-2">
        <div className="section-heading">
          <h3>Recognition Feed</h3>
          <span className="soft-tag">{posts.length} posts</span>
        </div>
        <div className="stack-list">
          {posts.map((post) => (
            <article className="list-card" key={post.id}>
              <strong>
                {post.from} to {post.to}
              </strong>
              <p>{post.message}</p>
              <p className="muted-copy">{post.date}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function KnowledgeBaseView({ articles, query, setQuery }) {
  return (
    <div className="view-grid">
      <section className="panel panel-span-2">
        <div className="section-heading">
          <h3>Knowledge Base</h3>
          <span className="soft-tag">{articles.length} articles</span>
        </div>
        <label className="search-field">
          <span>Search policies, processes, and onboarding content</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find an article"
          />
        </label>
        <div className="knowledge-grid">
          {articles.map((article) => (
            <article className="list-card" key={article.id}>
              <strong>{article.title}</strong>
              <p>
                {article.category} • {article.owner}
              </p>
              <p className="muted-copy">Updated {article.updatedAt}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function FeedbackView({ feedbackForm, feedbackItems, onFormChange, onSubmit }) {
  return (
    <div className="view-grid">
      <section className="panel">
        <h3>Submit Feedback</h3>
        <form className="stack-form" onSubmit={onSubmit}>
          <label>
            Type
            <select
              value={feedbackForm.type}
              onChange={(event) => onFormChange((prev) => ({ ...prev, type: event.target.value }))}
            >
              <option>Suggestion</option>
              <option>Feedback</option>
              <option>Complaint</option>
            </select>
          </label>
          <label>
            Summary
            <textarea
              rows="4"
              value={feedbackForm.title}
              onChange={(event) => onFormChange((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Share an idea or concern"
            />
          </label>
          <button className="primary-button" type="submit">
            Submit
          </button>
        </form>
      </section>

      <section className="panel panel-span-2">
        <div className="section-heading">
          <h3>Feedback Tracker</h3>
          <span className="soft-tag">{feedbackItems.length} records</span>
        </div>
        <div className="stack-list">
          {feedbackItems.map((item) => (
            <article className="list-card" key={item.id}>
              <div className="section-heading">
                <strong>{item.title}</strong>
                <span className="soft-tag">{item.status}</span>
              </div>
              <p>
                {item.type} • {item.submittedBy}
              </p>
              <p className="muted-copy">{item.date}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
