window.TEXTBOOK_GUIDES = [
  {
    id: 1,
    textbookSections: ["1.1 Number systems", "1.2 Text, sound and images", "1.3 Data storage and file compression"],
    lessonObjective: "Students explain how data is represented in binary and choose the correct representation method for numbers, text, images, sound and compressed files.",
    teacherFlow: [
      ["Hook", "Show the same data as text, image and sound. Ask students what the computer actually stores."],
      ["Teach", "Model binary place value, then connect four-bit groups to hexadecimal."],
      ["Model", "Work one file-size calculation slowly: formula, substitution, bit-to-byte conversion and final unit."],
      ["Check", "Students decide whether lossy or lossless compression is suitable for three short scenarios."],
      ["Exam Link", "Insist on working, units and a scenario-linked reason."]
    ],
    boardPlan: ["Binary place values", "Hex groups of four bits", "Character set", "Resolution and sampling", "Compression choice"],
    exitTicket: "State one reason hexadecimal is used and calculate the byte size of a short binary file."
  },
  {
    id: 2,
    textbookSections: ["2.1 Types and methods of data transmission", "2.2 Methods of error detection", "2.3 Symmetric and asymmetric encryption"],
    lessonObjective: "Students select suitable transmission methods, explain error detection and compare encryption approaches.",
    teacherFlow: [
      ["Hook", "Compare a video call, a keyboard and a walkie-talkie to introduce direction of communication."],
      ["Teach", "Separate transmission mode from transmission method: simplex, duplex, serial and parallel."],
      ["Model", "Trace a packet journey and annotate the header information needed for reassembly."],
      ["Check", "Use parity and checksum examples to show what is detected and what is not guaranteed."],
      ["Exam Link", "Force the answer to include the limitation of each error-checking method."]
    ],
    boardPlan: ["Mode", "Method", "Packet", "Error check", "Encryption key"],
    exitTicket: "Explain why serial transmission is preferred over long distance and give one error-detection limitation."
  },
  {
    id: 3,
    textbookSections: ["3.1 Computer architecture", "3.2 Input and output devices", "3.3 Data storage", "3.4 Network hardware"],
    lessonObjective: "Students connect hardware components to their roles and justify device or storage choices in realistic scenarios.",
    teacherFlow: [
      ["Hook", "Ask students what happens between pressing a key and seeing output on screen."],
      ["Teach", "Build the fetch-decode-execute cycle around PC, MAR, MDR, CIR, CU, ALU and registers."],
      ["Model", "Compare SSD, HDD, optical and magnetic storage using speed, capacity, cost and durability."],
      ["Check", "Give three scenarios and require one device choice plus a reason linked to that scenario."],
      ["Exam Link", "Reject device-name-only answers; every hardware choice needs a reason."]
    ],
    boardPlan: ["CPU cycle", "Registers", "Input", "Output", "Storage choice", "Network device"],
    exitTicket: "Explain the role of two CPU registers and choose a storage device for a portable laptop."
  },
  {
    id: 4,
    textbookSections: ["4.1 Types of software and interrupts", "4.2 Programming languages, translators and IDEs"],
    lessonObjective: "Students classify software, explain interrupt handling and compare translators and IDE tools.",
    teacherFlow: [
      ["Hook", "Show a printer, a game and an antivirus program; ask which software controls each part of the system."],
      ["Teach", "Separate system software, application software, utilities, drivers and firmware."],
      ["Model", "Walk through an interrupt sequence from signal to service routine and return."],
      ["Check", "Students choose compiler, interpreter or assembler for short development scenarios."],
      ["Exam Link", "Comparison answers must mention both sides and one context advantage."]
    ],
    boardPlan: ["System software", "Application software", "Utility", "Driver", "Interrupt", "Translator", "IDE"],
    exitTicket: "Compare a compiler and interpreter for a student testing a new program."
  },
  {
    id: 5,
    textbookSections: ["5.1 The internet and the World Wide Web", "5.2 Digital currency", "5.3 Cyber security"],
    lessonObjective: "Students distinguish internet services, explain web processes and recommend cyber-security protection for threats.",
    teacherFlow: [
      ["Hook", "Ask whether the internet and the web are the same; collect quick student definitions."],
      ["Teach", "Draw the path from URL entry to DNS lookup, server request, response and browser rendering."],
      ["Model", "Classify phishing, pharming, malware, hacking, DoS and social engineering from scenarios."],
      ["Check", "Students recommend one protection and explain why it matches the threat."],
      ["Exam Link", "Security answers need threat, method and protection; vague password answers are not enough."]
    ],
    boardPlan: ["Internet", "WWW", "URL", "DNS", "Threat", "Protection", "Limitation"],
    exitTicket: "Explain DNS and identify the threat in a fake-bank-message scenario."
  },
  {
    id: 6,
    textbookSections: ["6.1 Automated systems", "6.2 Robotics", "6.3 Artificial intelligence"],
    lessonObjective: "Students describe automated control loops and evaluate robotics and AI in realistic contexts.",
    teacherFlow: [
      ["Hook", "Use an automatic door or greenhouse as a familiar control-system example."],
      ["Teach", "Draw sensor input, ADC if required, processor decision, actuator output and feedback."],
      ["Model", "Compare human and robot work in a dangerous or repetitive environment."],
      ["Check", "Students label sensors, processors and actuators in three automated systems."],
      ["Exam Link", "Evaluation needs advantages, disadvantages and a final judgement linked to the scenario."]
    ],
    boardPlan: ["Sensor", "ADC", "Processor", "Actuator", "Feedback", "Robot", "AI data"],
    exitTicket: "Describe an automated greenhouse using sensor, processor, actuator and feedback."
  },
  {
    id: 7,
    textbookSections: ["7.1 Program development life cycle", "7.2 Decomposition", "7.3 Purpose of an algorithm", "7.4 Standard methods", "7.5 Validation and verification", "7.6 Test data", "7.7 Trace tables", "7.8 Errors", "7.9 Writing algorithms"],
    lessonObjective: "Students design, test, trace and improve algorithms using Cambridge-style problem-solving methods.",
    teacherFlow: [
      ["Hook", "Give a messy school-report problem and ask students to break it into smaller jobs."],
      ["Teach", "Model decomposition, inputs, processing, outputs and standard methods such as counting and totalling."],
      ["Model", "Dry-run pseudocode with a trace table and update variables in execution order."],
      ["Check", "Students choose normal, abnormal, boundary and extreme test data for a validation rule."],
      ["Exam Link", "Trace-table marks depend on order; test-data marks depend on reason."]
    ],
    boardPlan: ["Decompose", "Algorithm", "Validation", "Verification", "Test data", "Trace table", "Error"],
    exitTicket: "Give boundary and abnormal test data for a percentage input and justify both."
  },
  {
    id: 8,
    textbookSections: ["8.1 Programming concepts", "8.2 Arrays", "8.3 File handling"],
    lessonObjective: "Students read and write pseudocode using correct data types, operators, selection, iteration, arrays and file operations.",
    teacherFlow: [
      ["Hook", "Ask students why a program needs different data types for name, score and enrolled status."],
      ["Teach", "Build from variables and constants to operators, selection and loops."],
      ["Model", "Trace a loop over an array and calculate total, count or maximum value."],
      ["Check", "Students choose FOR, WHILE or REPEAT for three repetition scenarios."],
      ["Exam Link", "Pseudocode answers must use correct assignment, indentation, loop boundaries and array indexes."]
    ],
    boardPlan: ["Type", "Variable", "Operator", "Selection", "Loop", "Array", "File"],
    exitTicket: "Choose the best loop for a known number of marks and explain why."
  },
  {
    id: 9,
    textbookSections: ["9.1 Databases"],
    lessonObjective: "Students use database vocabulary precisely and write basic SQL queries with suitable validation choices.",
    teacherFlow: [
      ["Hook", "Show a class register and ask what counts as a table, row and column."],
      ["Teach", "Define table, record, field, primary key, data type and validation."],
      ["Model", "Write SELECT, FROM, WHERE and ORDER BY from a plain-English request."],
      ["Check", "Students choose a primary key and validation checks for a student table."],
      ["Exam Link", "Validation checks reduce invalid input; they do not prove the data is true."]
    ],
    boardPlan: ["Table", "Record", "Field", "Primary key", "Validation", "SQL"],
    exitTicket: "Write SQL to select two fields from a table where one condition is true."
  },
  {
    id: 10,
    textbookSections: ["10.1 Standard logic gate symbols", "10.2 Function of the six logic gates", "10.3 Circuits, expressions, truth tables and problem statements"],
    lessonObjective: "Students complete truth tables, trace circuits and translate problem statements into Boolean logic.",
    teacherFlow: [
      ["Hook", "Use a simple alarm condition: the alarm sounds only when the door is open and the system is armed."],
      ["Teach", "Review NOT, AND, OR, NAND, NOR and XOR with one output rule for each gate."],
      ["Model", "Build a truth table with intermediate columns before the final output."],
      ["Check", "Students identify the gate needed for all, at least one, neither and exactly one."],
      ["Exam Link", "Multi-gate answers need intermediate working; do not jump straight to the final output."]
    ],
    boardPlan: ["Gate", "Input", "Output", "Intermediate column", "Expression", "Truth table"],
    exitTicket: "Complete the output for a two-input XOR gate and explain the rule."
  }
];

window.getTextbookGuide = id => window.TEXTBOOK_GUIDES.find(guide => guide.id === Number(id));
