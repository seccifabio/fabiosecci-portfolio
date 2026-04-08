export interface Project {
  id: number;
  slug: string;
  title: string;
  location: string;
  year: string;
  videoUrl: string;
  imageUrl?: string;
  description: string;
  gallery?: {
    type: 'desktop' | 'mobile';
    src: string;
  }[];
  story: string;
  kpis: string[];
  insights: string[];
  designChallenges: string[];
  results?: {
    label1: string;
    value1: string;
    label2: string;
    value2: string;
    label3: string;
    value3: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "learning-companion",
    title: "Learning Companion",
    location: "AI EDUCATION",
    year: "2025",
    videoUrl: "/Video-HL/1.mp4",
    imageUrl: "/Project_1/Desktop/0w8Tl8NCZVAXEguNDvhLFs5E6yc.avif",
    description: "Personalized AI-driven learning paths for modern students.",
    story: "Preparing for exams shouldn't feel like a solitary struggle. Students often hit walls when answers lack context or clarity, leading to a cycle of doubt. The Learning Companion transforms this experience by providing instant clarification through examples and quick understanding checks, offering end-to-end support that builds genuine confidence in every student's journey.",
    kpis: [
      "Increase AI chat DAU",
      "Retention",
      "Session created",
      "CVR to registration"
    ],
    insights: [
      "30% of students use AI chats for follow-ups and deeper learning.",
      "Homework and study tools are fragmented across platforms.",
      "Students want structured guidance, not just answers.",
      "AI must be helpful, context-aware, and non-intrusive.",
      "Continuity matters — students value systems that \"remember\" their learning journey."
    ],
    designChallenges: [
      "Create a seamless, intuitive experience",
      "Build in motivational hooks",
      "Ensure the experience reinforces learning",
      "Design interactive and engaging elements"
    ],
    results: {
      label1: "Weekly Retention",
      value1: "+8%",
      label2: "AI DAU",
      value2: "+15%",
      label3: "Sessions created",
      value3: "+20K"
    },
    gallery: [
      { type: 'desktop', src: '/Project_1/Desktop/flow.webp' },
      { type: 'desktop', src: '/Project_1/Desktop/0w8Tl8NCZVAXEguNDvhLFs5E6yc.avif' },
      { type: 'desktop', src: '/Project_1/Desktop/1cTb889kkH0QIb8Uw9Bk5phep8.webp' },
      { type: 'desktop', src: '/Project_1/Desktop/4lGReOtryoodfNyHCwV2BZrN6I.webp' },
      { type: 'desktop', src: '/Project_1/Desktop/GBjxrHyz7KoBAeWHQWPEnIPqsw.avif' },
      { type: 'desktop', src: '/Project_1/Desktop/GMHzLyNgxCUjGPwG6iybNUVQI.webp' },
      { type: 'desktop', src: '/Project_1/Desktop/Xk97NG97I8Odafc1kyqgsPum1SY.webp' },
      { type: 'mobile', src: '/Project_1/Mweb/3bWUbcHOhDew0v8mOaIceOnD0.webp' },
      { type: 'mobile', src: '/Project_1/Mweb/9frjTCWSXcyHb7NyqatMgQC4wc8.webp' },
      { type: 'mobile', src: '/Project_1/Mweb/FIsyDfNcCKxJbhwVrSZBww0GpQ.webp' },
      { type: 'mobile', src: '/Project_1/Mweb/JpS5jOEjTklMayQC0Ne5rnpXeQ.webp' },
      { type: 'mobile', src: '/Project_1/Mweb/PJcA1buzV7vbRayl1fhDBYvP3Iw.webp' },
      { type: 'mobile', src: '/Project_1/Mweb/uy01pb8E8VxFzKYIa8kBAAszT5A.webp' }
    ]
  },
  {
    id: 2,
    slug: "brainly-notes",
    title: "Brainly Notes",
    location: "NOTE TAKER",
    year: "2025",
    videoUrl: "/Video-HL/2.mp4",
    imageUrl: "/Project_2/Flow.webp",
    description: "Transforming study materials into interactive knowledge networks.",
    story: "Smarter study starts with better focus. Brainly Notes bridges the gap between the lecture hall and the study desk by instantly transforming complex lectures into organized, shareable summaries. By centralizing note management and integrating follow-up resources, we empower students to revisit concepts with clarity and share knowledge effortlessly, making every second of focus count toward future success.",
    kpis: [
      "User Adoption Rate",
      "Engagement Metrics ( Notes created and frequency of note-sharing )",
      "Retention",
      "Notes shared"
    ],
    insights: [
      "Research revealed a clear need for a focused, education-specific note-taking experience:",
      "Students juggle fragmented tools, leading to disorganized study habits.",
      "Strong demand for contextual, subject-linked notes tied to learning content.",
      "Collaboration and shareability are essential for peer learning.",
      "Simplicity outperforms feature-heavy tools—students prefer clean, distraction-free UX.",
      "Competitor apps lack education context, creating a gap Brainly is uniquely positioned to fill."
    ],
    designChallenges: [
      "Scalable Content and High Performance",
      "Clear, Cohesive, and Minimal Design",
      "Privacy and Moderation",
      "A streamlined UX to capture student interest"
    ],
    results: {
      label1: "User Adoption",
      value1: "+25%",
      label2: "Notes Shared",
      value2: "150K",
      label3: "Engagement",
      value3: "+40%"
    },
    gallery: [
      { type: 'desktop', src: '/Project_2/Flow.webp' },
      { type: 'mobile', src: '/Project_2/Mweb/EFtKjU17xm7a1RriCulTjWKgiHQ.webp' },
      { type: 'mobile', src: '/Project_2/Mweb/UAATfjT2zNmm5ZsmJu4NKjIAESw.webp' },
      { type: 'mobile', src: '/Project_2/Mweb/egekWEKPFb1sPLaZ0qbrL3Z4uU.webp' },
      { type: 'mobile', src: '/Project_2/Mweb/kRSMrnd58x21WZRePpheMjXwnI.webp' },
      { type: 'mobile', src: '/Project_2/Mweb/oczGpv945ftyvTuBTw1YzHlxvx0.webp' },
      { type: 'mobile', src: '/Project_2/Mweb/uXIX4E26XddsMVD6dXUYy0cVVg.webp' }
    ]
  },
  {
    id: 3,
    slug: "test-prep",
    title: "Test Prep",
    location: "ADAPTIVE TESTING",
    year: "2025",
    videoUrl: "/Video-HL/3.mp4",
    imageUrl: "/Project_3/Flow.webp",
    description: "Dynamic assessment systems that evolve with student performance.",
    story: "Understanding is the foundation of achievement. With over 40% of students struggling to grasp complex answers, the need for clarity has never been greater. Test Prep addresses this by enabling deep clarification through community examples and interactive study tools. We support students through every step of their homework and test preparation, turning confusion into mastery through personalized, context-aware practice.",
    kpis: [
      "Test Prep usage and creation",
      "Practice per Day",
      "Retention",
      "CVR to registration",
      "CVR to subscription"
    ],
    insights: [
      "Based on benchmarking and users interviews:",
      "Competitors like Quizlet, Khan Academy, and Chegg already offer quizzes and practice tools.",
      "Existing practice content is often generic and not tailored to individual students.",
      "Paywalls frequently block access to valuable study materials.",
      "No major competitor deeply integrates quizzes with homework history or student context."
    ],
    designChallenges: [
      "Enable easy access to examples and deeper explanations",
      "Quick Understanding Checks",
      "Create features that help students prepare for homework and tests"
    ],
    results: {
      label1: "New Registration",
      value1: "+12%",
      label2: "Practices per day",
      value2: "+1K",
      label3: "Sessions created",
      value3: "+5K"
    },
    gallery: [
      { type: 'desktop', src: '/Project_3/Flow.webp' },
      { type: 'desktop', src: '/Project_3/Desktop/5DQxOW08Y87owQaDecLR0Ofjt4c.webp' },
      { type: 'desktop', src: '/Project_3/Desktop/5oPseRgbFJmBW0IgsAy4enrc.webp' },
      { type: 'desktop', src: '/Project_3/Desktop/GNPLjcvICWOxfydgxN6uyXOBzXA.webp' },
      { type: 'desktop', src: '/Project_3/Desktop/KJUvkN7KXa3zAt9UdEXpSugZc.webp' },
      { type: 'desktop', src: '/Project_3/Desktop/X4JJjdTnUD2DaQEkcR3KBGEDCk.webp' },
      { type: 'desktop', src: '/Project_3/Desktop/dgA32XS5LVquCUHOGLpcQPfDsI.webp' },
      { type: 'desktop', src: '/Project_3/Desktop/iZFfitoieYeHKvsmWZfHTWrkD8.webp' },
      { type: 'mobile', src: '/Project_3/Mweb/EYvTr66HmJ0kTEaTPotbgETPH0.webp' },
      { type: 'mobile', src: '/Project_3/Mweb/EnljhjyGqKjulVUxiNttiXzrAy8.webp' },
      { type: 'mobile', src: '/Project_3/Mweb/FaVQlXaP3gJmdsy691vndDCd0.webp' },
      { type: 'mobile', src: '/Project_3/Mweb/FeBQLMqO3lu7i9Umjenf2JcAFHw.webp' },
      { type: 'mobile', src: '/Project_3/Mweb/TFzawXhHL03rAcD9Zqt3YUEQx8.webp' },
      { type: 'mobile', src: '/Project_3/Mweb/eK78RwRQAeRZGKSA1fgtKdLyKA.webp' },
      { type: 'mobile', src: '/Project_3/Mweb/g6zqLdH3TPyKEdjslOwbsv7EnIU.webp' },
      { type: 'mobile', src: '/Project_3/Mweb/rnAKQorpDXATyNLA7nfl6dyKpMo.webp' },
      { type: 'mobile', src: '/Project_3/Mweb/w1Ld9UHpp1eIcRcpyAFZG1wa4.webp' }
    ]
  }
];
