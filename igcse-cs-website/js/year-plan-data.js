window.YEAR_PLAN = {
  meta: {
    title: "IGCSE Computer Science 3-Year Teaching Path",
    activeYear: "Year 1",
    lessonsPerWeek: 3,
    totalWeeks: 36,
    totalLessons: 108,
    rationale: "Students start from Chapter 1. Year 1 builds representation, logic and computer-system foundations before moving into transmission and software. The remaining chapters are spaced into Years 2 and 3."
  },
  threeYearPath: [
    {
      year: "Year 1",
      focus: "Foundation year",
      chapters: "1, 10, 3, 2, 4",
      description: "Data representation, Boolean logic, hardware, data transmission and software foundations.",
      status: "in progress"
    },
    {
      year: "Year 2",
      focus: "Systems and problem solving",
      chapters: "5, 6, 7, 8",
      description: "Internet and cybersecurity, automated systems, algorithms and programming practice.",
      status: "not start"
    },
    {
      year: "Year 3",
      focus: "Exam readiness",
      chapters: "9 + full revision",
      description: "Databases, SQL, classified-paper practice, timed answers, mock exams and weak-area repair.",
      status: "not start"
    }
  ],
  milestones: [
    { week: 1, title: "Course launch", type: "setup", description: "Baseline quiz, classroom routines and answer-style expectations." },
    { week: 8, title: "Checkpoint 1", type: "assessment", description: "Chapter 1 calculation and explanation checkpoint." },
    { week: 14, title: "Checkpoint 2", type: "assessment", description: "Chapter 1 + Chapter 10 cumulative assessment." },
    { week: 25, title: "Checkpoint 3", type: "assessment", description: "Hardware assessment with CPU, storage, devices and networks." },
    { week: 36, title: "Year 1 review", type: "exam", description: "End-of-year review and Year 2 readiness diagnosis." }
  ],
  weeks: [
    {
      week: 1,
      title: "Course Launch and Binary Thinking",
      chapter: 1,
      chapterTitle: "Data Representation",
      section: "Course routines + 1.1 Number systems",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Set expectations for IGCSE answer style and notebook routines.",
        "Explain why computers use binary.",
        "Define bit, nibble, byte and binary/denary."
      ],
      lessonFlow: ["Starter diagnostic quiz", "Binary states demo", "Exam-style definition practice"],
      assessment: "Baseline quiz: binary vocabulary and simple conversion.",
      resources: ["chapters/chapter1.html#review-notes", "chapters/chapter1.html"]
    },
    {
      week: 2,
      title: "Binary and Denary Conversion",
      chapter: 1,
      chapterTitle: "Data Representation",
      section: "1.1 Number systems",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Convert positive denary numbers into 8-bit and 16-bit binary.",
        "Convert binary into denary using place value.",
        "Show working clearly for calculation marks."
      ],
      lessonFlow: ["Teacher modelling", "Guided conversion practice", "Exit ticket with working"],
      assessment: "Mini conversion check.",
      resources: ["chapters/chapter1.html#review-notes"]
    },
    {
      week: 3,
      title: "Hexadecimal and Binary Addition",
      chapter: 1,
      chapterTitle: "Data Representation",
      section: "1.1 Number systems",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Convert between binary and hexadecimal using 4-bit groups.",
        "Explain why hexadecimal is used.",
        "Perform binary addition and identify overflow."
      ],
      lessonFlow: ["Hex nibble table", "MAC/colour-code examples", "Overflow discussion"],
      assessment: "Hex conversion and overflow question.",
      resources: ["chapters/chapter1.html#review-notes"]
    },
    {
      week: 4,
      title: "Two's Complement and Character Sets",
      chapter: 1,
      chapterTitle: "Data Representation",
      section: "1.1-1.2 Number systems and text",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Represent negative numbers using two's complement.",
        "Define character set.",
        "Compare ASCII and Unicode in scenario answers."
      ],
      lessonFlow: ["Two's complement method", "ASCII vs Unicode table", "Short-answer training"],
      assessment: "Explain why Unicode is useful for international software.",
      resources: ["chapters/chapter1.html#review-notes"]
    },
    {
      week: 5,
      title: "Images and Sound",
      chapter: 1,
      chapterTitle: "Data Representation",
      section: "1.2 Text, sound and images",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Define pixel, resolution and colour depth.",
        "Define sample rate and sample resolution.",
        "Calculate image and sound file size with units."
      ],
      lessonFlow: ["Bitmap visual model", "Sound sampling model", "File-size worked examples"],
      assessment: "Image and sound calculation exit ticket.",
      resources: ["chapters/chapter1.html#review-notes"]
    },
    {
      week: 6,
      title: "Compression",
      chapter: 1,
      chapterTitle: "Data Representation",
      section: "1.3 Data storage and file compression",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Explain why compression is used.",
        "Compare lossy and lossless compression.",
        "Describe Run Length Encoding."
      ],
      lessonFlow: ["Lossy/lossless scenarios", "RLE examples", "Exam comparison answer"],
      assessment: "Choose lossy or lossless for three scenarios.",
      resources: ["chapters/chapter1.html#review-notes"]
    },
    {
      week: 7,
      title: "Chapter 1 Exam Practice",
      chapter: 1,
      chapterTitle: "Data Representation",
      section: "Chapter 1 consolidation",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Combine conversion, file-size and explanation questions.",
        "Improve unit accuracy.",
        "Use short mark-scheme style answers."
      ],
      lessonFlow: ["Mixed retrieval", "Timed exam question", "Model answer correction"],
      assessment: "Chapter 1 mixed practice.",
      resources: ["chapters/chapter1.html#review-notes"]
    },
    {
      week: 8,
      title: "Chapter 1 Checkpoint",
      chapter: 1,
      chapterTitle: "Data Representation",
      section: "Assessment and reteach",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Complete a short Chapter 1 assessment.",
        "Diagnose conversion and file-size weaknesses.",
        "Reteach high-error concepts."
      ],
      lessonFlow: ["Assessment", "Feedback lesson", "Correction task"],
      assessment: "Checkpoint 1.",
      resources: ["chapters/chapter1.html#quiz"]
    },
    {
      week: 9,
      title: "Boolean Logic Foundations",
      chapter: 10,
      chapterTitle: "Boolean Logic",
      section: "10.1-10.2 Logic gates",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Explain TRUE/FALSE and 1/0 logic.",
        "Learn NOT, AND and OR gate rules.",
        "Complete basic truth tables."
      ],
      lessonFlow: ["Real-life conditions", "Gate rules", "Truth table drills"],
      assessment: "NOT/AND/OR mini check.",
      resources: ["chapters/chapter10.html#review-notes"]
    },
    {
      week: 10,
      title: "NAND, NOR and XOR",
      chapter: 10,
      chapterTitle: "Boolean Logic",
      section: "10.2 Six logic gates",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Explain NAND, NOR and XOR gate rules.",
        "Compare OR and XOR.",
        "Complete two-input truth tables accurately."
      ],
      lessonFlow: ["Gate comparison", "Truth table practice", "Common mistake review"],
      assessment: "Six-gate truth table quiz.",
      resources: ["chapters/chapter10.html#review-notes"]
    },
    {
      week: 11,
      title: "Logic Circuits and Expressions",
      chapter: 10,
      chapterTitle: "Boolean Logic",
      section: "10.3 Circuits, expressions and truth tables",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Trace multi-gate circuits using intermediate outputs.",
        "Write Boolean expressions from circuits.",
        "Use 2^n rows for truth tables."
      ],
      lessonFlow: ["Intermediate columns", "Circuit-to-expression", "Expression-to-table"],
      assessment: "Combined-gate truth table.",
      resources: ["chapters/chapter10.html#review-notes"]
    },
    {
      week: 12,
      title: "Problem Statements to Logic",
      chapter: 10,
      chapterTitle: "Boolean Logic",
      section: "10.3 Problem statements",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Translate words such as all, at least one, neither and exactly one into gates.",
        "Draw simple logic circuits.",
        "Check circuits using truth tables."
      ],
      lessonFlow: ["Keyword mapping", "Draw circuit", "Truth table verification"],
      assessment: "Scenario-to-circuit question.",
      resources: ["chapters/chapter10.html#teacher-companion"]
    },
    {
      week: 13,
      title: "Chapter 10 Exam Practice",
      chapter: 10,
      chapterTitle: "Boolean Logic",
      section: "Chapter 10 consolidation",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Complete mixed truth table and expression questions.",
        "Reduce careless truth-table errors.",
        "Write precise logic-gate rules."
      ],
      lessonFlow: ["Retrieval grid", "Timed exam task", "Correction and reflection"],
      assessment: "Chapter 10 mixed practice.",
      resources: ["chapters/chapter10.html#review-notes"]
    },
    {
      week: 14,
      title: "Checkpoint 2: Chapter 1 + 10",
      chapter: "review",
      chapterTitle: "Cumulative Review",
      section: "Assessment and correction",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Assess data representation and logic together.",
        "Practise switching between calculation and truth-table question types.",
        "Set individual targets before hardware begins."
      ],
      lessonFlow: ["Cumulative test", "Question-by-question feedback", "Targeted reteach"],
      assessment: "Checkpoint 2.",
      resources: ["dashboard.html#chapterLibrary"]
    },
    {
      week: 15,
      title: "Computer Architecture",
      chapter: 3,
      chapterTitle: "Hardware",
      section: "3.1 Computer architecture",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Explain the role of the CPU.",
        "Identify ALU, CU, registers and buses.",
        "Describe the fetch-decode-execute cycle."
      ],
      lessonFlow: ["CPU big picture", "Register roles", "FDE cycle modelling"],
      assessment: "Register role quick check.",
      resources: ["chapters/chapter3.html#review-notes"]
    },
    {
      week: 16,
      title: "Registers and CPU Performance",
      chapter: 3,
      chapterTitle: "Hardware",
      section: "3.1 Computer architecture",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Explain PC, MAR, MDR, CIR and ACC.",
        "Describe cache memory.",
        "Explain how clock speed, cores and cache affect performance."
      ],
      lessonFlow: ["Register route diagram", "Cache analogy", "Performance comparison"],
      assessment: "CPU performance explanation.",
      resources: ["chapters/chapter3.html#teacher-companion"]
    },
    {
      week: 17,
      title: "Input and Output Devices",
      chapter: 3,
      chapterTitle: "Hardware",
      section: "3.2 Input and output devices",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Choose suitable input devices for scenarios.",
        "Choose suitable output devices for scenarios.",
        "Justify device choices using technical features."
      ],
      lessonFlow: ["Direction of data", "Device scenario sorting", "Exam justification practice"],
      assessment: "Device choice scenario.",
      resources: ["chapters/chapter3.html#review-notes"]
    },
    {
      week: 18,
      title: "Sensors and Actuators Bridge",
      chapter: 3,
      chapterTitle: "Hardware",
      section: "3.2 Devices + bridge to automation",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Explain how sensors measure physical properties.",
        "Explain ADC/DAC in device contexts.",
        "Introduce actuator as output/control device."
      ],
      lessonFlow: ["Sensor examples", "ADC/DAC diagram", "Actuator examples"],
      assessment: "Sensor and actuator explanation.",
      resources: ["chapters/chapter3.html#review-notes"]
    },
    {
      week: 19,
      title: "Primary Memory",
      chapter: 3,
      chapterTitle: "Hardware",
      section: "3.3 Data storage",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Compare RAM and ROM.",
        "Explain volatile and non-volatile memory.",
        "Explain why primary memory is needed."
      ],
      lessonFlow: ["RAM vs ROM table", "Volatile/non-volatile scenarios", "Short answer training"],
      assessment: "RAM/ROM comparison.",
      resources: ["chapters/chapter3.html#teacher-companion"]
    },
    {
      week: 20,
      title: "Secondary Storage Methods",
      chapter: 3,
      chapterTitle: "Hardware",
      section: "3.3 Data storage",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Describe magnetic, optical and solid-state storage.",
        "Compare HDD, SSD and optical media.",
        "Use speed, capacity, durability and cost in comparisons."
      ],
      lessonFlow: ["Storage method visual", "Comparison grid", "Scenario recommendations"],
      assessment: "Storage comparison question.",
      resources: ["chapters/chapter3.html#review-notes"]
    },
    {
      week: 21,
      title: "Cloud Storage",
      chapter: 3,
      chapterTitle: "Hardware",
      section: "3.3 Cloud storage",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Define cloud storage.",
        "Explain redundancy and scalability.",
        "Compare cloud and local storage."
      ],
      lessonFlow: ["Cloud vs local", "Advantages/disadvantages", "Scenario evaluation"],
      assessment: "Cloud storage evaluation.",
      resources: ["chapters/chapter3.html#review-notes"]
    },
    {
      week: 22,
      title: "Network Hardware",
      chapter: 3,
      chapterTitle: "Hardware",
      section: "3.4 Network hardware",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Explain NIC, MAC address and IP address.",
        "Compare switch and router.",
        "Describe packets in a network context."
      ],
      lessonFlow: ["LAN device map", "MAC/IP distinction", "Router vs switch exam answer"],
      assessment: "Network hardware short-answer check.",
      resources: ["chapters/chapter3.html#review-notes"]
    },
    {
      week: 23,
      title: "Hardware Exam Practice",
      chapter: 3,
      chapterTitle: "Hardware",
      section: "Chapter 3 consolidation",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Combine CPU, devices, memory, storage and network hardware.",
        "Improve scenario justification.",
        "Identify weak answer wording."
      ],
      lessonFlow: ["Mixed retrieval", "Exam answer training", "Correction task"],
      assessment: "Chapter 3 mixed paper-style questions.",
      resources: ["chapters/chapter3.html#exam-training"]
    },
    {
      week: 24,
      title: "Hardware Checkpoint and Reteach",
      chapter: 3,
      chapterTitle: "Hardware",
      section: "Assessment and correction",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Complete Chapter 3 checkpoint.",
        "Repair common hardware misconceptions.",
        "Prepare for data transmission."
      ],
      lessonFlow: ["Checkpoint", "Feedback", "Targeted reteach"],
      assessment: "Checkpoint 3.",
      resources: ["chapters/chapter3.html#quiz"]
    },
    {
      week: 25,
      title: "Data Packets",
      chapter: 2,
      chapterTitle: "Data Transmission",
      section: "2.1 Types and methods of transmission",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Explain why data is split into packets.",
        "Describe packet header, payload and trailer.",
        "Explain packet reassembly."
      ],
      lessonFlow: ["Postal packet analogy", "Packet structure diagram", "Exam explanation"],
      assessment: "Packet structure exit ticket.",
      resources: ["chapters/chapter2.html#review-notes"]
    },
    {
      week: 26,
      title: "Transmission Modes and Methods",
      chapter: 2,
      chapterTitle: "Data Transmission",
      section: "2.1 Types and methods of transmission",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Compare simplex, half-duplex and full-duplex.",
        "Compare serial and parallel transmission.",
        "Choose suitable transmission methods for scenarios."
      ],
      lessonFlow: ["Mode sorting", "Serial/parallel demo", "Scenario justification"],
      assessment: "Mode and method comparison.",
      resources: ["chapters/chapter2.html#review-notes"]
    },
    {
      week: 27,
      title: "Error Detection",
      chapter: 2,
      chapterTitle: "Data Transmission",
      section: "2.2 Methods of error detection",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Describe parity check.",
        "Describe checksum and echo check.",
        "Explain limitations of error detection."
      ],
      lessonFlow: ["Parity worked example", "Checksum concept", "Limitation answer"],
      assessment: "Parity/checksum short answer.",
      resources: ["chapters/chapter2.html#review-notes"]
    },
    {
      week: 28,
      title: "Encryption",
      chapter: 2,
      chapterTitle: "Data Transmission",
      section: "2.3 Symmetric and asymmetric encryption",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Define encryption and ciphertext.",
        "Compare symmetric and asymmetric encryption.",
        "Explain public and private keys."
      ],
      lessonFlow: ["Lock/key model", "Key comparison table", "Exam compare answer"],
      assessment: "Encryption comparison.",
      resources: ["chapters/chapter2.html#review-notes"]
    },
    {
      week: 29,
      title: "Data Transmission Practice",
      chapter: 2,
      chapterTitle: "Data Transmission",
      section: "Chapter 2 consolidation",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Connect packets, error detection and encryption.",
        "Improve explanation of limitations.",
        "Use scenario-linked answers."
      ],
      lessonFlow: ["Mixed retrieval", "Timed question", "Model answer comparison"],
      assessment: "Chapter 2 mixed practice.",
      resources: ["chapters/chapter2.html#review-notes"]
    },
    {
      week: 30,
      title: "Transmission Checkpoint",
      chapter: 2,
      chapterTitle: "Data Transmission",
      section: "Assessment and correction",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Complete Chapter 2 checkpoint.",
        "Reteach error-detection misconceptions.",
        "Bridge into system and application software."
      ],
      lessonFlow: ["Checkpoint", "Feedback", "Correction task"],
      assessment: "Chapter 2 checkpoint.",
      resources: ["chapters/chapter2.html#quiz"]
    },
    {
      week: 31,
      title: "Types of Software",
      chapter: 4,
      chapterTitle: "Software",
      section: "4.1 Types of software",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Classify system software and application software.",
        "Explain operating systems, utilities, drivers and firmware.",
        "Use examples accurately."
      ],
      lessonFlow: ["Software sorting", "OS role explanation", "Driver scenario"],
      assessment: "Software classification exit ticket.",
      resources: ["chapters/chapter4.html#review-notes"]
    },
    {
      week: 32,
      title: "Operating Systems and Interrupts",
      chapter: 4,
      chapterTitle: "Software",
      section: "4.1 Interrupts",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Describe OS functions.",
        "Explain interrupt handling sequence.",
        "Use interrupt service routine in answers."
      ],
      lessonFlow: ["OS function map", "Interrupt timeline", "Ordered-answer practice"],
      assessment: "Interrupt sequence question.",
      resources: ["chapters/chapter4.html#review-notes"]
    },
    {
      week: 33,
      title: "Translators",
      chapter: 4,
      chapterTitle: "Software",
      section: "4.2 Programming languages and translators",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Explain assembler, compiler and interpreter.",
        "Compare compiler and interpreter.",
        "Choose translators for development scenarios."
      ],
      lessonFlow: ["Source-to-machine-code route", "Compiler/interpreter comparison", "Scenario choices"],
      assessment: "Translator comparison.",
      resources: ["chapters/chapter4.html#review-notes"]
    },
    {
      week: 34,
      title: "IDEs and Software Review",
      chapter: 4,
      chapterTitle: "Software",
      section: "4.2 IDEs",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Explain IDE features.",
        "Connect IDE features to programmer benefits.",
        "Review Chapter 4 with exam-style answers."
      ],
      lessonFlow: ["IDE feature demo", "Benefit matching", "Chapter 4 practice"],
      assessment: "Chapter 4 review task.",
      resources: ["chapters/chapter4.html#review-notes"]
    },
    {
      week: 35,
      title: "Year 1 Cumulative Review",
      chapter: "review",
      chapterTitle: "Year 1 Review",
      section: "Chapters 1, 10, 3, 2, 4",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Review the five Year 1 chapters.",
        "Identify cross-chapter links.",
        "Practise mixed exam-style answers."
      ],
      lessonFlow: ["Retrieval carousel", "Mixed paper practice", "Student target sheet"],
      assessment: "Year 1 review practice.",
      resources: ["dashboard.html#chapterLibrary"]
    },
    {
      week: 36,
      title: "Year 1 End Assessment and Year 2 Bridge",
      chapter: "review",
      chapterTitle: "Year 1 Review",
      section: "Assessment + next-year readiness",
      lessons: 3,
      defaultStatus: "not start",
      objectives: [
        "Complete a Year 1 assessment.",
        "Record strengths and weaknesses.",
        "Preview Internet, cybersecurity, automation, algorithms and programming for Year 2."
      ],
      lessonFlow: ["End assessment", "Feedback and reflection", "Year 2 preview"],
      assessment: "Year 1 end-of-year assessment.",
      resources: ["dashboard.html#chapterLibrary"]
    }
  ]
};
