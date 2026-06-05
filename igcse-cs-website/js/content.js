window.CHAPTERS = [
  {
    id:1,
    title:"Data Representation",
    section:"Computer Systems",
    accent:"#087f8c",
    summary:"How computers represent numbers, text, sound, images, file size and compression using binary patterns.",
    map:["Number systems","Text and media","File size","Compression","Exam conversions"],
    concepts:[
      ["Binary place value","Each bit is worth a power of 2. Convert by adding the place values where the bit is 1."],
      ["Hexadecimal","One hex digit represents 4 bits, so it is a compact way to write long binary values."],
      ["Character sets","ASCII and Unicode assign numeric codes to characters; Unicode can represent more languages and symbols."],
      ["Images and sound","Resolution, colour depth, sample rate and sample resolution increase quality and file size."],
      ["Compression","Lossless keeps all original data; lossy removes detail and is not suitable when exact recovery is needed."]
    ],
    diagram:{title:"Number Conversion Route",steps:["Denary","Binary place values","4-bit nibbles","Hex digits"]},
    exam:["Convert between denary, binary and hexadecimal.","Calculate image/sound/file size and show units clearly.","Compare lossy and lossless compression for a given scenario."],
    frequent:[
      ["Why is hex used instead of binary?","It is shorter, easier for humans to read, and maps directly to groups of four bits."],
      ["What earns marks in file-size questions?","Formula, substitution, correct unit conversion, and final answer with units."],
      ["When should lossless compression be chosen?","When the original must be recovered exactly, such as text, programs or medical images."]
    ],
    quiz:[
      ["What is the denary value of 00101101?",["37","45","53","101"],1],
      ["How many bits are represented by two hexadecimal digits?",["4","8","16","32"],1],
      ["Which factor directly increases image file size?",["Lower colour depth","Higher resolution","Fewer pixels","Lossy compression"],1]
    ]
  },
  {
    id:2,
    title:"Data Transmission",
    section:"Computer Systems",
    accent:"#2364aa",
    summary:"How data moves between devices, how errors are detected, and how encryption protects messages.",
    map:["Transmission modes","Serial vs parallel","Error checks","Encryption","Protocols"],
    concepts:[
      ["Simplex, half-duplex, full-duplex","Describe direction of communication: one-way, both ways but not simultaneously, or both ways at the same time."],
      ["Serial and parallel","Serial sends bits one at a time; parallel sends multiple bits together but can suffer skew over distance."],
      ["Packet switching","Data is split into packets with addresses, sequence numbers and error-checking data."],
      ["Error detection","Parity, checksum and echo checks detect likely errors but do not guarantee correction."],
      ["Encryption","Symmetric uses one shared key; asymmetric uses a public and private key pair."]
    ],
    diagram:{title:"Packet Journey",steps:["Message","Split into packets","Route independently","Reassemble","Check errors"]},
    exam:["Select the correct transmission mode for a real device.","Explain parity/checksum with a worked example.","Compare symmetric and asymmetric encryption."],
    frequent:[
      ["Why is serial better over long distances?","It avoids timing differences between many parallel wires and usually needs fewer channels."],
      ["Does parity find every error?","No. It can miss errors when an even number of bits change in one block."],
      ["What is in a packet header?","Usually source/destination address, packet number and control information."]
    ],
    quiz:[
      ["Which mode allows both devices to send at the same time?",["Simplex","Half-duplex","Full-duplex","Serial"],2],
      ["What is the main purpose of a checksum?",["Compress data","Detect errors","Encrypt data","Store a password"],1],
      ["Which encryption method uses public and private keys?",["Symmetric","Asymmetric","Lossless","Parallel"],1]
    ]
  },
  {
    id:3,
    title:"Hardware",
    section:"Computer Systems",
    accent:"#ef6f5e",
    summary:"CPU architecture, input and output devices, memory, storage and network hardware.",
    map:["CPU","Input/output","Memory","Storage","Networks"],
    concepts:[
      ["CPU components","The ALU performs calculations and logic, CU controls signals, registers hold temporary data."],
      ["Fetch-decode-execute","The CPU fetches an instruction from memory, decodes it, then executes it."],
      ["Primary memory","RAM is volatile and stores current data; ROM is non-volatile and stores startup instructions."],
      ["Storage media","Magnetic, optical and solid-state storage differ in capacity, speed, durability and cost."],
      ["Network hardware","Routers, switches, NICs and wireless access points move data around local and wide networks."]
    ],
    teachCards:[
      {
        concept:"RAM",
        simpleExplanation:"RAM is temporary memory used to store data and instructions that are currently being used by the computer.",
        teacherScript:"RAM is like your desk. When you are working, you put books, papers and tools on the desk because you need them now. When the power is turned off, the desk is cleared. This is why RAM is volatile.",
        visualAnalogy:"RAM = desk space. More RAM = more working space for several programs at the same time.",
        keyExamWords:["temporary memory","currently in use","volatile","data and instructions","faster access than secondary storage"],
        quickCheck:"Why is RAM called volatile memory?",
        quickCheckAnswer:"Because the data stored in RAM is lost when the power is turned off."
      },
      {
        concept:"ROM",
        simpleExplanation:"ROM is non-volatile memory that stores instructions needed when the computer starts up.",
        teacherScript:"ROM is like a fixed instruction card kept inside the computer. Students can read the card when they start, but they do not rewrite it during normal use. The computer uses ROM to begin the boot process.",
        visualAnalogy:"ROM = startup instruction card. The instructions stay there when power is off.",
        keyExamWords:["non-volatile","startup instructions","boot process","not normally changed","firmware"],
        quickCheck:"Why does a computer need ROM when it starts?",
        quickCheckAnswer:"ROM stores the startup instructions needed to begin the boot process."
      },
      {
        concept:"CPU",
        simpleExplanation:"The CPU processes instructions by fetching, decoding and executing them.",
        teacherScript:"The CPU is not just one magic box. The control unit organises the work, the ALU performs arithmetic and logic, and registers hold small pieces of data while the instruction is being processed.",
        visualAnalogy:"CPU = classroom team. CU gives instructions, ALU does calculations, registers hold the current working values.",
        keyExamWords:["fetch-decode-execute","ALU","control unit","registers","instructions"],
        quickCheck:"Which CPU component performs arithmetic and logic operations?",
        quickCheckAnswer:"The ALU performs arithmetic and logic operations."
      },
      {
        concept:"Hard Disk Drive",
        simpleExplanation:"A hard disk drive stores data magnetically on spinning disks using a moving read/write head.",
        teacherScript:"A hard disk drive is like a spinning record player. The disk spins and the arm moves to the correct place to read or write data. Because it has moving parts, it can be slower and easier to damage than solid-state storage.",
        visualAnalogy:"HDD = spinning plate and moving arm.",
        keyExamWords:["magnetic storage","moving parts","read/write head","large capacity","non-volatile"],
        quickCheck:"Give one feature of a hard disk drive.",
        quickCheckAnswer:"It stores data magnetically on spinning disks using a moving read/write head."
      },
      {
        concept:"Solid-state Storage",
        simpleExplanation:"Solid-state storage stores data electronically and has no moving parts.",
        teacherScript:"Think of SSD as many tiny electronic switches. Each switch can store a 0 or 1. Unlike a hard disk drive, there is no spinning disk and no moving read/write head.",
        visualAnalogy:"SSD = many tiny switches. HDD = spinning plate and moving arm.",
        keyExamWords:["electronic storage","no moving parts","non-volatile","faster read/write access","more durable"],
        quickCheck:"Give one feature of solid-state storage.",
        quickCheckAnswer:"It has no moving parts."
      },
      {
        concept:"Input Devices",
        simpleExplanation:"An input device sends data into a computer system.",
        teacherScript:"Ask students to follow the direction of data. If data goes from the real world into the computer, the device is input. A scanner captures an image into the system. A keyboard sends typed characters into the system.",
        visualAnalogy:"Input = outside world to computer.",
        keyExamWords:["data into the system","sensor","keyboard","scanner","captures data"],
        quickCheck:"Why is a scanner an input device?",
        quickCheckAnswer:"Because it captures data from a document or image and sends it into the computer."
      },
      {
        concept:"Output Devices",
        simpleExplanation:"An output device receives data from the computer and presents information to the user or environment.",
        teacherScript:"Output is the computer speaking back. A monitor shows visual information, speakers produce sound, and a printer produces a physical copy.",
        visualAnalogy:"Output = computer to user or environment.",
        keyExamWords:["data out of the system","monitor","printer","speaker","presents information"],
        quickCheck:"Why is a speaker an output device?",
        quickCheckAnswer:"Because it receives data from the computer and produces sound for the user."
      }
    ],
    commonMistakes:[
      {
        title:"Feature vs Advantage",
        mistake:"Feature of SSD: it is easy to carry.",
        whyWrong:"This is an advantage, not a feature. The question asks what the storage is or how it works.",
        correctThinking:"Feature = what it is or how it works. Advantage = why the feature is useful.",
        betterAnswer:"Feature: solid-state storage has no moving parts. Advantage: it is more durable because there are no moving parts that can be damaged easily."
      },
      {
        title:"RAM vs ROM",
        mistake:"RAM saves everything forever.",
        whyWrong:"RAM is volatile. Its contents are lost when the power is turned off.",
        correctThinking:"RAM is temporary working memory. ROM stores startup instructions and is non-volatile.",
        betterAnswer:"RAM stores data and instructions currently in use. RAM is volatile, so its contents are lost when the power is turned off."
      },
      {
        title:"HDD vs SSD",
        mistake:"SSD is good and fast.",
        whyWrong:"This answer is too vague. Good is not a technical feature, and fast needs more detail.",
        correctThinking:"Use precise technical properties, then explain why they matter.",
        betterAnswer:"Solid-state storage has no moving parts and stores data electronically using circuits. This gives faster read/write access and makes it more durable than magnetic storage."
      },
      {
        title:"Input vs Output",
        mistake:"A touchscreen is output because students can see it.",
        whyWrong:"A touchscreen can be both input and output. Touch is input; the display is output.",
        correctThinking:"Follow the direction of data between the user and the computer.",
        betterAnswer:"A touchscreen is an input device when it detects touch from the user. It is also an output device when it displays information."
      },
      {
        title:"Primary vs Secondary Storage",
        mistake:"Secondary storage is the same as RAM because both store data.",
        whyWrong:"RAM is primary memory used while programs run. Secondary storage keeps data long term.",
        correctThinking:"Memory is active working space. Storage keeps files and programs when power is off.",
        betterAnswer:"RAM is volatile primary memory used for data currently in use. Secondary storage is non-volatile and stores data permanently until it is deleted."
      }
    ],
    examAnswerTraining:[
      {
        question:"Give two features of solid-state storage.",
        weakAnswer:"It is fast and useful.",
        problem:"Useful is too vague. Fast may be an advantage, but the question asks for features.",
        betterAnswer:"Solid-state storage has no moving parts. It stores data electronically using circuits.",
        markPoints:["no moving parts","electronic storage","non-volatile storage","uses memory chips or circuits"],
        studentTask:"Write one feature and one advantage of solid-state storage."
      },
      {
        question:"Explain one difference between RAM and ROM.",
        weakAnswer:"RAM is bigger and ROM is smaller.",
        problem:"The answer does not use the key exam difference: volatile vs non-volatile, or temporary vs startup instructions.",
        betterAnswer:"RAM is volatile memory used to store data and instructions currently in use. ROM is non-volatile memory that stores startup instructions.",
        markPoints:["RAM is volatile","ROM is non-volatile","RAM stores current data/instructions","ROM stores startup instructions"],
        studentTask:"Write a two-mark comparison using the words volatile and non-volatile."
      },
      {
        question:"A student needs portable storage for school files. Give one advantage of an SSD compared with an HDD.",
        weakAnswer:"SSD is better.",
        problem:"Better is not a reason. The answer must link a technical feature to the scenario.",
        betterAnswer:"An SSD has no moving parts, so it is more durable if the portable device is carried around or knocked.",
        markPoints:["no moving parts","more durable","less likely to be damaged","linked to portability or being carried"],
        studentTask:"Rewrite the answer using because and the scenario."
      },
      {
        question:"Identify one suitable input device for entering printed text into a computer and justify your choice.",
        weakAnswer:"Keyboard, because it has letters.",
        problem:"The question says printed text. A keyboard would require retyping; a scanner with OCR is more suitable.",
        betterAnswer:"A scanner with OCR is suitable because it can capture the printed page and convert the text into editable digital text.",
        markPoints:["scanner","OCR","captures printed document","converts to editable text"],
        studentTask:"Choose the device and write one reason linked to printed text."
      }
    ],
    diagram:{title:"Fetch-Decode-Execute",steps:["PC holds address","Fetch into MDR","Decode in CU","Execute using ALU/registers","Update PC"]},
    exam:["Name CPU registers accurately and explain their role.","Choose input/output devices for a scenario with reasons.","Compare storage types using speed, capacity, portability and reliability."],
    frequent:[
      ["Why does more cache improve performance?","Frequently used data can be accessed faster than from RAM."],
      ["What is the difference between RAM and ROM?","RAM is temporary and writable during use; ROM is permanent and used for boot instructions."],
      ["Switch or router?","A switch connects devices inside a LAN; a router forwards data between networks."]
    ],
    quiz:[
      ["Which CPU part performs arithmetic and logic?",["CU","ALU","RAM","ROM"],1],
      ["Which memory is volatile?",["ROM","RAM","SSD","Blu-ray"],1],
      ["What does a router connect?",["Only monitors","Different networks","Only CPUs","A printer cartridge"],1]
    ]
  },
  {
    id:4,
    title:"Software",
    section:"Computer Systems",
    accent:"#16845b",
    summary:"System software, application software, interrupts, translators, programming languages and IDE tools.",
    map:["System software","Applications","Interrupts","Translators","IDEs"],
    concepts:[
      ["System software","Operating systems, utilities and drivers manage hardware and provide a platform for applications."],
      ["Application software","Programs made for user tasks, such as word processing, graphics, databases or browsers."],
      ["Interrupts","Signals that temporarily stop the CPU's current task so an urgent event can be serviced."],
      ["Translators","Assemblers, compilers and interpreters convert source code into machine-executable form."],
      ["IDE tools","Editors, error diagnostics, translators, debuggers and run-time environments support development."]
    ],
    diagram:{title:"Program Translation",steps:["Source code","Translator","Object code / execution","Errors reported","Debug and rerun"]},
    exam:["Distinguish operating system, utility and application examples.","Explain how interrupts are handled in sequence.","Compare compiler and interpreter advantages."],
    frequent:[
      ["Why use a compiler?","It creates executable code and can run quickly after translation."],
      ["Why use an interpreter?","It is useful for testing because it runs code line by line and reports errors immediately."],
      ["What does a device driver do?","It lets the operating system communicate with a specific hardware device."]
    ],
    quiz:[
      ["Which is system software?",["Photo editor","Operating system","Spreadsheet data","Email message"],1],
      ["Which translator converts assembly language?",["Compiler","Interpreter","Assembler","Debugger"],2],
      ["What is an interrupt?",["A storage device","A signal needing CPU attention","A type of image","A data type"],1]
    ]
  },
  {
    id:5,
    title:"The Internet and Its Uses",
    section:"Computer Systems",
    accent:"#f5b84b",
    summary:"Internet services, the World Wide Web, digital currency and the cyber-security threats students must recognise.",
    map:["Internet vs WWW","Web services","Digital currency","Threats","Protection"],
    concepts:[
      ["Internet and WWW","The internet is the global network infrastructure; the WWW is a service of linked web pages using browsers."],
      ["URLs and DNS","URLs identify resources; DNS translates domain names into IP addresses."],
      ["Digital currency","Electronic money can be transferred online and may use cryptography and distributed records."],
      ["Cyber threats","Malware, phishing, pharming, DoS, hacking and social engineering target systems or users."],
      ["Protection","Firewalls, anti-malware, strong passwords, two-factor authentication, updates and user awareness reduce risk."]
    ],
    diagram:{title:"Loading a Web Page",steps:["Enter URL","DNS lookup","Request sent","Server responds","Browser renders page"]},
    exam:["Explain internet vs WWW without mixing them up.","Identify a cyber threat from a scenario.","Recommend security measures with reasons linked to the threat."],
    frequent:[
      ["What is phishing?","Tricking users into revealing sensitive data, often through fake messages or websites."],
      ["What does a firewall do?","It monitors and filters network traffic using rules."],
      ["Why is 2FA stronger than a password alone?","An attacker needs a second proof, such as a code or device, not just the password."]
    ],
    quiz:[
      ["What does DNS do?",["Compresses images","Translates domain names to IP addresses","Creates passwords","Scans malware"],1],
      ["Which attack tricks users with fake messages?",["Phishing","Defragmentation","Checksum","Compilation"],0],
      ["The WWW is best described as:",["A service on the internet","The same as RAM","A storage device","A CPU cycle"],0]
    ]
  },
  {
    id:6,
    title:"Automated and Emerging Technologies",
    section:"Computer Systems",
    accent:"#7d5fff",
    summary:"Automated systems, robotics and AI: the sensors, processors, actuators and decisions behind modern systems.",
    map:["Sensors","Microprocessors","Actuators","Robotics","AI"],
    concepts:[
      ["Automated systems","Sensors collect data, a processor compares it with rules, and actuators cause physical action."],
      ["Feedback","Sensor readings are repeatedly checked so the system can adjust its output."],
      ["Robots","Programmable machines that can sense, process and act, often with accuracy and endurance."],
      ["AI characteristics","Systems can simulate intelligent behaviour such as learning, reasoning, recognition or decision-making."],
      ["Benefits and risks","Automation can improve safety and consistency, but may be costly, complex and affect jobs."]
    ],
    diagram:{title:"Control Loop",steps:["Sensor input","ADC if needed","Processor decision","Actuator output","New reading"]},
    exam:["Describe sensor-processor-actuator flow in a given system.","Give balanced advantages and disadvantages of robots.","Identify where AI is useful and what data it needs."],
    frequent:[
      ["Why use sensors in automation?","They provide real-world data that the system can process without human input."],
      ["What does an actuator do?","It converts a control signal into a physical action such as movement or heat."],
      ["Why can AI be biased?","It can learn patterns from incomplete or biased training data."]
    ],
    quiz:[
      ["Which device produces physical action?",["Sensor","Actuator","Register","Router"],1],
      ["What is feedback used for?",["To ignore new data","To adjust output using readings","To delete files","To format text"],1],
      ["AI systems usually need:",["Training data","Optical discs only","No algorithms","Only ROM"],0]
    ]
  },
  {
    id:7,
    title:"Algorithm Design and Problem Solving",
    section:"Algorithms, Programming and Logic",
    accent:"#c94f4f",
    summary:"Decomposition, flowcharts, pseudocode, validation, verification, test data, trace tables and debugging.",
    map:["Decomposition","Pseudocode","Validation","Trace tables","Testing"],
    concepts:[
      ["Decomposition","Break a system into smaller sub-problems that are easier to understand and solve."],
      ["Standard methods","Sequence, selection, iteration, counting, totalling, finding max/min and searching appear often."],
      ["Validation and verification","Validation checks data is reasonable; verification checks data was entered or copied accurately."],
      ["Test data","Normal, abnormal, boundary and extreme data show whether an algorithm behaves correctly."],
      ["Trace tables","Dry-run a program by recording variable values after each important step."]
    ],
    diagram:{title:"Problem-Solving Cycle",steps:["Understand problem","Decompose","Design algorithm","Trace/test","Refine"]},
    exam:["Complete or write pseudocode using Cambridge-style constructs.","Choose suitable test data and justify each item.","Use trace tables to find final output or locate errors."],
    frequent:[
      ["Boundary or extreme?","Boundary tests values at the edge of valid ranges; extreme tests the largest/smallest possible valid values."],
      ["Validation or verification?","Validation asks 'is it sensible?'; verification asks 'was it copied correctly?'"],
      ["What makes a trace table good?","Clear columns for variables and output, updated in execution order."]
    ],
    quiz:[
      ["Breaking a problem into smaller parts is called:",["Encryption","Decomposition","Compilation","Normalisation"],1],
      ["Which test data is outside the allowed range?",["Normal","Abnormal","Boundary","Valid"],1],
      ["A trace table records:",["Packet routes","Variable values during a dry run","Image pixels only","Passwords"],1]
    ]
  },
  {
    id:8,
    title:"Programming",
    section:"Algorithms, Programming and Logic",
    accent:"#087f8c",
    summary:"Variables, constants, data types, operators, input/output, selection, loops, arrays and file handling.",
    map:["Data types","Operators","Selection","Iteration","Arrays/files"],
    concepts:[
      ["Variables and constants","Variables can change during execution; constants should not change once set."],
      ["Data types","Integer, real, char, string and Boolean determine what values and operations are valid."],
      ["Operators","Arithmetic, relational and Boolean operators build calculations and decisions."],
      ["Selection and iteration","IF and CASE choose paths; FOR, WHILE and REPEAT loops repeat instructions."],
      ["Arrays and files","Arrays store many related values; file handling stores data beyond one program run."]
    ],
    diagram:{title:"Program Structure",steps:["Input","Process with variables","Selection/loops","Store in arrays/files","Output"]},
    exam:["Predict output from code snippets.","Write pseudocode using correct loops and array indexing.","Explain data type choice and file handling steps."],
    frequent:[
      ["When should a FOR loop be used?","When the number of repetitions is known or controlled by a counter."],
      ["When should WHILE be used?","When repetition depends on a condition tested before each loop."],
      ["Why choose Boolean?","It stores true/false states clearly, such as found/not found or valid/invalid."]
    ],
    quiz:[
      ["Which data type stores TRUE or FALSE?",["String","Real","Boolean","Char"],2],
      ["Which loop is best when repetitions are known?",["FOR","IF","CASE","INPUT"],0],
      ["An array is used to:",["Store multiple related values","Translate code","Route packets","Detect viruses"],0]
    ]
  },
  {
    id:9,
    title:"Databases",
    section:"Algorithms, Programming and Logic",
    accent:"#2364aa",
    summary:"Database tables, fields, records, keys, data types, validation and basic SQL queries.",
    map:["Tables","Records/fields","Keys","Validation","SQL"],
    concepts:[
      ["Tables, records, fields","A table stores one entity type; a record is a row; a field is a column/attribute."],
      ["Primary key","A field that uniquely identifies each record."],
      ["Data types","Text, integer, real, date/time and Boolean help store and validate suitable values."],
      ["Validation","Presence, range, length, type and format checks reduce incorrect data entry."],
      ["SQL","SELECT chooses fields, FROM chooses tables, WHERE filters records, ORDER BY sorts results."]
    ],
    diagram:{title:"SQL Query Shape",steps:["SELECT fields","FROM table","WHERE condition","ORDER BY field","Result set"]},
    exam:["Define table, record, field and primary key precisely.","Choose data types and validation checks for fields.","Write or complete simple SQL queries."],
    frequent:[
      ["What is one row called?","A record."],
      ["Why use a primary key?","To uniquely identify each record and avoid confusion between similar records."],
      ["What does WHERE do in SQL?","It filters records so only rows matching a condition are returned."]
    ],
    quiz:[
      ["Which term means one row in a database table?",["Field","Record","Primary key","Query"],1],
      ["What is the main purpose of a primary key?",["Sort records","Store images","Uniquely identify each record","Connect Wi-Fi"],2],
      ["Which SQL keyword retrieves data?",["SELECT","UPDATE","INSERT","DELETE"],0]
    ]
  },
  {
    id:10,
    title:"Boolean Logic",
    section:"Algorithms, Programming and Logic",
    accent:"#ef6f5e",
    summary:"Logic gates, truth tables, Boolean expressions and how to build circuits from problem statements.",
    map:["Gates","Truth tables","Expressions","Circuits","Problem statements"],
    concepts:[
      ["Logic gates","NOT, AND, OR, NAND, NOR and XOR produce outputs from binary inputs."],
      ["Truth tables","List every possible input combination and the resulting output."],
      ["Boolean expressions","Use symbols such as NOT, AND and OR to describe a circuit or condition."],
      ["Circuit tracing","Work from inputs through each gate, recording intermediate outputs."],
      ["Problem statements","Translate words such as all, either, neither and exactly one into suitable gates."]
    ],
    diagram:{title:"Build a Logic Answer",steps:["Read condition","Identify gates","Draw circuit","Complete truth table","Write expression"]},
    exam:["Complete truth tables accurately for combined gates.","Write Boolean expressions from circuits or scenarios.","Draw circuits using only two-input gates when required."],
    frequent:[
      ["What does XOR mean?","Output is 1 when exactly one input is 1."],
      ["How many rows for three inputs?","Eight rows, because 2^3 = 8."],
      ["What is the safest way to solve combined gates?","Label intermediate outputs and fill the table one gate at a time."]
    ],
    quiz:[
      ["Which gate outputs 1 only when both inputs are 1?",["OR","AND","XOR","NOT"],1],
      ["How many rows does a truth table with 3 inputs need?",["3","6","8","9"],2],
      ["XOR outputs 1 when:",["Both inputs are 0","Both inputs are 1","Exactly one input is 1","No input exists"],2]
    ]
  }
];

window.getChapter = id => window.CHAPTERS.find(chapter => chapter.id === Number(id));
