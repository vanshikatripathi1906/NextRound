export const initialUserProfile = {
  name: 'Vanshika',
  phone: '+91 9876543210',
  greeting: 'Good Evening',
  readinessPercentage: 74,
  todaysFocus: 'Graph BFS, Graph DFS & LRU Cache',
  todaysMissions: [
    { id: 1, text: 'Graph BFS', completed: true },
    { id: 2, text: 'Graph DFS', completed: false },
    { id: 3, text: 'LRU Cache', completed: false }
  ],
  estimatedStudyTime: '2h 20m',
  currentStreak: 21,
  isCheckedInToday: false
};

export const initialKnowledgeGraphNodes = [
  { 
    id: 1, 
    name: 'Arrays & Hashing', 
    mastery: 94, 
    questionsSolved: 94,
    totalRequired: 100,
    status: 'strong', 
    color: '#10b981', 
    x: 10, 
    y: 70, 
    prereqs: [],
    errors: { syntax: 2, tle: 1, edgeCase: 3, memory: 0 }
  },
  { 
    id: 2, 
    name: 'Sliding Window', 
    mastery: 90, 
    questionsSolved: 90,
    totalRequired: 100,
    status: 'strong', 
    color: '#10b981', 
    x: 25, 
    y: 35, 
    prereqs: [1],
    errors: { syntax: 3, tle: 2, edgeCase: 5, memory: 1 }
  },
  { 
    id: 3, 
    name: 'Binary Search', 
    mastery: 88, 
    questionsSolved: 88,
    totalRequired: 100,
    status: 'strong', 
    color: '#10b981', 
    x: 40, 
    y: 65, 
    prereqs: [1],
    errors: { syntax: 4, tle: 3, edgeCase: 5, memory: 1 }
  },
  { 
    id: 4, 
    name: 'Trees & BST', 
    mastery: 76, 
    questionsSolved: 76,
    totalRequired: 100,
    status: 'review', 
    color: '#f59e0b', 
    x: 55, 
    y: 40, 
    prereqs: [2, 3],
    errors: { syntax: 6, tle: 8, edgeCase: 10, memory: 3 }
  },
  { 
    id: 5, 
    name: 'Graphs & BFS/DFS', 
    mastery: 58, 
    questionsSolved: 58,
    totalRequired: 100,
    status: 'weak', 
    color: '#ef4444', 
    x: 70, 
    y: 75, 
    prereqs: [4],
    errors: { syntax: 12, tle: 18, edgeCase: 15, memory: 5 }
  },
  { 
    id: 6, 
    name: 'Dynamic Programming', 
    mastery: 68, 
    questionsSolved: 68,
    totalRequired: 100,
    status: 'review', 
    color: '#f59e0b', 
    x: 88, 
    y: 45, 
    prereqs: [5],
    errors: { syntax: 10, tle: 14, edgeCase: 12, memory: 3 }
  }
];

export const initialRadarSkills = [
  { subject: 'DSA', score: 85, fullMark: 100 },
  { subject: 'System Design', score: 72, fullMark: 100 },
  { subject: 'React / Frontend', score: 90, fullMark: 100 },
  { subject: 'OOP / CS Fundamentals', score: 78, fullMark: 100 },
  { subject: 'SQL & Databases', score: 80, fullMark: 100 },
  { subject: 'Communication', score: 88, fullMark: 100 }
];

export const initialCompanyDNA = [
  {
    id: 'google',
    name: 'Google',
    role: 'Software Engineer L4',
    logo: '🔴🔵🟡🟢',
    eligibility: 'B.Tech / M.Tech / Dual Degree in CS or IT with CGPA >= 7.5. No active backlogs.',
    roundsCount: 4,
    oaDetails: 'Online Assessment (90 mins): 2 Medium-Hard algorithmic problems on Graphs & Strings + 15 min Work Style Assessment.',
    conceptsToFocus: [
      'Graphs (Topological Sort, Dijkstra, Disjoint Set Union)',
      'High Level Distributed Caching (LFU / LRU Eviction)',
      'Dynamic Programming (State Compression)'
    ],
    questionsAsked: [
      { name: 'LC 207: Course Schedule', difficulty: 'Medium', topic: 'Graphs' },
      { name: 'LC 743: Network Delay Time', difficulty: 'Medium', topic: 'Graphs' },
      { name: 'LC 146: LRU Cache Design', difficulty: 'Medium', topic: 'System Design / Data Structures' },
      { name: 'LC 1143: Longest Common Subsequence', difficulty: 'Medium', topic: 'Dynamic Programming' }
    ],
    experiences: [
      {
        id: 1,
        candidateName: 'Aarav Sharma',
        date: 'July 2026',
        role: 'Software Engineer L4',
        rating: 4.8,
        rounds: [
          'OA Round: 2 Graph questions (Passed all test cases)',
          'Tech Round 1: LC 207 Course Schedule + Topological Sort',
          'Tech Round 2: LFU Cache Design (Discussed O(1) DLL + HashMap)',
          'Googleyness & Leadership: Conflict resolution & project trade-offs'
        ],
        advice: 'Focus heavily on writing clean, modular code and explaining edge cases out loud before typing.'
      },
      {
        id: 2,
        candidateName: 'Priya Verma',
        date: 'June 2026',
        role: 'Software Engineer L3',
        rating: 4.5,
        rounds: [
          'OA Round: DP + Matrix Path Optimization',
          'Tech Round 1: Dijkstra Shortest Path with PriorityQueue',
          'Tech Round 2: Trie Prefix Tree for Search Suggestions'
        ],
        advice: 'Practice drawing the recursion tree for DP problems. Interviewers love dry running sample inputs.'
      }
    ]
  },
  {
    id: 'adobe',
    name: 'Adobe',
    role: 'Member of Technical Staff 2',
    logo: '🟥',
    eligibility: 'B.Tech CS / ECE / EE with min 7.0 CGPA. Strong fundamentals in Frontend / OOP.',
    roundsCount: 3,
    oaDetails: 'Online Assessment (75 mins): 3 Coding Questions (Arrays, Strings, Stack) + MCQs on OS & DBMS.',
    conceptsToFocus: [
      'Arrays, Hashing & String Manipulation',
      'React Architecture & Virtual DOM Reconciliation',
      'Object Oriented Design (Design Patterns)'
    ],
    questionsAsked: [
      { name: 'LC 1: Two Sum & 3Sum Variants', difficulty: 'Easy-Medium', topic: 'Arrays' },
      { name: 'React Virtual DOM Fiber Trees', difficulty: 'Medium', topic: 'Frontend System Design' },
      { name: 'LC 146: LRU Cache Implementation', difficulty: 'Medium', topic: 'Data Structures' },
      { name: 'Design Parking Lot System', difficulty: 'Medium', topic: 'OOD' }
    ],
    experiences: [
      {
        id: 1,
        candidateName: 'Rohan Mehta',
        date: 'July 2026',
        role: 'MTS 2',
        rating: 4.6,
        rounds: [
          'OA Round: 3 Coding Problems (Strings & Stack)',
          'Tech Round 1: React Virtual DOM & LC 146 LRU Cache',
          'Tech Round 2: Low Level Design of Elevator / Parking Lot'
        ],
        advice: 'Be well versed with JavaScript closures, event loop, and design patterns like Observer & Factory.'
      }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    role: 'SDE II',
    logo: '🟧',
    eligibility: 'B.Tech / M.Tech in CS or related fields. Minimum 6.5 CGPA.',
    roundsCount: 4,
    oaDetails: 'Online Assessment (120 mins): 2 Coding Questions + 20 min Debugging Section + Amazon Work Simulation & 14 Leadership Principles.',
    conceptsToFocus: [
      'Trees, BST & Graph Traversal (BFS/DFS)',
      'System Design (Scalable Microservices & Notification Engine)',
      'Amazon 14 Leadership Principles (STAR Method Examples)'
    ],
    questionsAsked: [
      { name: 'LC 297: Serialize & Deserialize Binary Tree', difficulty: 'Hard', topic: 'Trees' },
      { name: 'LC 200: Number of Islands', difficulty: 'Medium', topic: 'Graphs' },
      { name: 'Design Amazon Shopping Cart & Order Service', difficulty: 'Hard', topic: 'High Level Design' }
    ],
    experiences: [
      {
        id: 1,
        candidateName: 'Neha Kapoor',
        date: 'May 2026',
        role: 'SDE II',
        rating: 4.7,
        rounds: [
          'OA Round: Debugging section + LC 200 Number of Islands',
          'Tech Round 1: Binary Tree Serialization + Customer Obsession LP',
          'Tech Round 2: Notification Service System Design + Bias for Action LP',
          'Bar Raiser: Deep dive into previous architecture & Ownership LP'
        ],
        advice: 'Prepare at least two solid real-world stories for each Leadership Principle using the STAR framework.'
      }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    role: 'Software Engineer II',
    logo: '🟦🟩🟨🟥',
    eligibility: 'B.Tech / M.Tech CS / IT. Min 7.0 CGPA.',
    roundsCount: 3,
    oaDetails: 'Codility OA (80 mins): 3 Algorithmic Coding Questions.',
    conceptsToFocus: [
      'Linked Lists, Trees & Recursion',
      'Concurrency & Thread Safety',
      'System Architecture'
    ],
    questionsAsked: [
      { name: 'LC 138: Copy List with Random Pointer', difficulty: 'Medium', topic: 'Linked List' },
      { name: 'LC 124: Binary Tree Maximum Path Sum', difficulty: 'Hard', topic: 'Trees' }
    ],
    experiences: [
      {
        id: 1,
        candidateName: 'Karan Singhania',
        date: 'June 2026',
        role: 'Software Engineer II',
        rating: 4.5,
        rounds: [
          'OA Round: 3 Codility questions',
          'Tech Round 1: Linked list deep dive & Memory management',
          'Tech Round 2: System design of Collaborative Editor'
        ],
        advice: 'Focus on writing bug-free pointer code and handling null checks carefully.'
      }
    ]
  }
];

export const initialInterviewReplayList = [
  {
    id: 1,
    title: 'Google Technical Round 2 - LFU Cache',
    date: 'March 18, 2026',
    duration: '45 mins',
    company: 'Google',
    rating: 4.5,
    keyMoments: [
      { time: '05:12', note: 'Strong problem decomposition; identified Doubly Linked List + HashMap approach.' },
      { time: '18:40', note: 'Handled edge case when capacity = 0 gracefully.' },
      { time: '34:10', note: 'Discussed O(1) time complexity vs LRU cache trade-offs.' }
    ]
  }
];

export const initialInterviewPipeline = [
  { id: 1, title: 'Resume Submitted', date: 'Jan 10', status: 'completed' },
  { id: 2, title: 'Online Assessment (OA)', date: 'Jan 18', status: 'completed' },
  { id: 3, title: 'Technical Round 1', date: 'Feb 05', status: 'completed' },
  { id: 4, title: 'Technical Round 2', date: 'Feb 20', status: 'pending' },
  { id: 5, title: 'HR & Leadership Fit', date: 'Mar 02', status: 'pending' }
];

export const initialHeatmapData = [
  { date: '2026-07-20', count: 6 },
  { date: '2026-07-21', count: 8 },
  { date: '2026-07-22', count: 4 },
  { date: '2026-07-23', count: 10 },
  { date: '2026-07-24', count: 7 },
  { date: '2026-07-25', count: 9 },
  { date: '2026-07-26', count: 5 }
];

export const initialMistakeAnalytics = [
  { category: 'Time Limit Exceeded (TLE)', count: 46, percentage: 38, icon: '⚡' },
  { category: 'Edge Cases (Null/Empty/Bounds)', count: 35, percentage: 29, icon: '⚠️' },
  { category: 'Syntax / Logic Bugs', count: 27, percentage: 22, icon: '🐛' },
  { category: 'Memory Limit Exceeded (MLE)', count: 13, percentage: 11, icon: '💾' }
];

export const initialResumeEvolution = [
  { version: 'V1', label: 'Resume V1 (January)' },
  { version: 'V2', label: 'Resume V2 (March)' },
  { version: 'V3', label: 'Resume V3 - Placed Version (May)' }
];

export const journeyStories = [
  {
    title: "Your Interview Journey Unwrapped",
    subtitle: "342 Questions Solved • 6 Core Topics Mastered",
    theme: "dark"
  }
];
