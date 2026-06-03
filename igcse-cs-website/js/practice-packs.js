window.PRACTICE_PACKS = [
  {
    id: 1,
    chapter: "Data Representation",
    examStyle: ["conversion tables", "file-size calculations", "compression comparisons", "short definitions with examples"],
    highlights: ["Binary place values", "hexadecimal nibbles", "ASCII/Unicode", "image and sound sampling", "lossy/lossless compression"],
    frequentAnswers: [
      ["Hexadecimal is used because:", "it is shorter than binary; easier for humans to read; maps exactly to 4-bit groups."],
      ["Lossless compression means:", "the original data can be restored exactly; suitable for text, programs and critical images."],
      ["Sound file size answers need:", "sample rate, sample resolution, channels, duration, bit-to-byte conversion and units."]
    ],
    worksheet: [
      ["Convert 10110110 to denary and hexadecimal. Show your working.", "Denary: 128+32+16+4+2=182. Hex: 1011 0110 = B6."],
      ["A bitmap is 400 by 300 pixels with 16-bit colour depth. Calculate the file size in KiB.", "400*300*16 = 1,920,000 bits; /8 = 240,000 bytes; /1024 = 234.375 KiB."],
      ["Explain one advantage and one disadvantage of lossy compression for an online music service.", "Advantage: smaller files/less bandwidth/faster streaming. Disadvantage: removed audio detail/lower quality; original cannot be fully recovered."]
    ],
    homework: [
      ["A sound clip is sampled at 44,100 Hz, 16 bits, stereo, for 20 seconds. Calculate the size in MiB.", "44100*16*2*20 = 28,224,000 bits; /8 = 3,528,000 bytes; /1024/1024 = about 3.36 MiB."],
      ["Describe how Unicode differs from ASCII and why this matters for global software.", "Unicode supports a much larger range of characters; represents many languages/symbols; avoids needing separate character sets."],
      ["A student says JPEG compression is always better than PNG. Evaluate this statement.", "JPEG/lossy is good for photos and small files; PNG/lossless is better when exact detail/text/transparent graphics are needed; choice depends on purpose."]
    ]
  },
  {
    id: 2,
    chapter: "Data Transmission",
    examStyle: ["mode selection", "packet switching explanations", "error detection limits", "encryption comparison"],
    highlights: ["simplex/half/full duplex", "serial vs parallel", "packets", "parity/checksum", "symmetric/asymmetric encryption"],
    frequentAnswers: [
      ["Serial is preferred over distance because:", "fewer wires are needed and bits do not arrive out of step due to skew."],
      ["Parity detects but does not fix:", "errors; it can also miss an even number of changed bits."],
      ["Asymmetric encryption uses:", "a public key for encryption/sharing and a private key kept secret for decryption/signing."]
    ],
    worksheet: [
      ["Choose simplex, half-duplex or full-duplex for a video call and justify your answer.", "Full-duplex; both users can send and receive audio/video at the same time."],
      ["Explain why a large file is split into packets before being sent across a network.", "Packets can take different routes; easier to resend damaged/missing packets; includes addresses and sequence numbers for reassembly."],
      ["A byte uses even parity. The received byte is 10110011 with parity bit 1. State whether an error is detected.", "Data has five 1s; parity bit makes six 1s; even parity is satisfied, so no error is detected."]
    ],
    homework: [
      ["Compare checksum and echo check for detecting transmission errors.", "Checksum calculates a value from a block and compares at receiver; echo sends data back for comparison; both detect likely errors but do not guarantee all errors are found."],
      ["Explain why parallel transmission can be unreliable over long distances.", "Multiple bits travel on separate channels; timing differences/skew can cause bits to arrive at different times; more interference/cabling."],
      ["A company sends confidential customer records online. Explain how encryption helps and give one limitation.", "Encryption makes intercepted data unreadable without the key; limitation: key management/human error/does not stop deletion or phishing."]
    ]
  },
  {
    id: 3,
    chapter: "Hardware",
    examStyle: ["component roles", "scenario device choice", "CPU cycle sequencing", "storage comparisons"],
    highlights: ["ALU/CU/registers", "fetch-decode-execute", "RAM/ROM/cache", "input/output devices", "magnetic/optical/solid-state storage"],
    frequentAnswers: [
      ["The ALU:", "performs arithmetic calculations and logical comparisons."],
      ["RAM is volatile because:", "its contents are lost when power is switched off."],
      ["A router:", "connects networks and forwards packets using IP addresses."]
    ],
    worksheet: [
      ["Complete the sequence: PC, MAR, MDR, CIR in the fetch stage. Explain each register role.", "PC stores next instruction address; address copied to MAR; instruction fetched into MDR; instruction copied to CIR for decoding."],
      ["A supermarket needs to read product codes quickly. Choose an input device and justify it.", "Barcode scanner/QR scanner; fast, reduces typing errors, reads product code directly."],
      ["Compare SSD and HDD for a student laptop.", "SSD: faster, more durable, silent, lower power; HDD: cheaper per GB, often larger capacity; context decides."]
    ],
    homework: [
      ["Explain two ways cache memory can improve CPU performance.", "Stores frequently used instructions/data close to CPU; faster access than RAM; reduces waiting for main memory."],
      ["Choose suitable output devices for a school office printing reports and posters.", "Laser printer for high-volume reports; inkjet/large-format printer for colour posters; justify cost/speed/quality."],
      ["Describe the purpose of a NIC, switch and router in a school network.", "NIC connects device to network; switch connects devices in LAN and forwards frames; router connects LAN to other networks/internet."]
    ]
  },
  {
    id: 4,
    chapter: "Software",
    examStyle: ["software classification", "interrupt sequence", "translator comparison", "IDE feature purpose"],
    highlights: ["system/application software", "operating systems", "utilities", "interrupts", "compiler/interpreter/assembler", "IDEs"],
    frequentAnswers: [
      ["A device driver:", "allows the operating system to communicate with specific hardware."],
      ["A compiler:", "translates the whole program and produces executable/object code."],
      ["An interrupt:", "is a signal that causes the processor to suspend its current task and run a service routine."]
    ],
    worksheet: [
      ["Classify antivirus, word processor, operating system and device driver as system or application software.", "System: antivirus utility, operating system, device driver. Application: word processor."],
      ["Explain how an interrupt from a keyboard may be handled.", "Interrupt flag/register set; CPU completes current instruction; saves current state; runs interrupt service routine; restores state and continues."],
      ["Give two IDE features and explain how each helps a programmer.", "Editor/syntax highlighting; translator/run tool; debugger/breakpoints; error diagnostics; auto-complete."]
    ],
    homework: [
      ["Compare compiler and interpreter for developing a new program.", "Compiler gives fast executable and hides source; interpreter helps testing line-by-line with immediate errors; compiler may report after translation."],
      ["Explain why utility software is needed even when an operating system is installed.", "Maintains/protects/optimises system: backup, compression, antivirus, defragmentation, file management."],
      ["A printer stops working after an OS update. Explain why updating a driver may solve it.", "Driver translates OS commands for printer; old driver may be incompatible; updated driver restores correct communication."]
    ]
  },
  {
    id: 5,
    chapter: "The Internet and Its Uses",
    examStyle: ["internet vs WWW definitions", "URL/DNS process", "cyber threat identification", "security recommendation"],
    highlights: ["internet/WWW", "DNS and URLs", "cookies", "digital currency", "malware/phishing/pharming/DoS", "firewalls and 2FA"],
    frequentAnswers: [
      ["The internet is:", "the global network infrastructure; the WWW is a service of linked web pages accessed with browsers."],
      ["DNS:", "translates a domain name into an IP address."],
      ["Phishing:", "uses fake messages/websites to trick users into giving confidential data."]
    ],
    worksheet: [
      ["Explain the difference between the internet and the World Wide Web.", "Internet: global network of connected networks. WWW: web pages/sites using HTTP/HTTPS over the internet."],
      ["Put these in order when loading a web page: browser renders, DNS lookup, request sent, URL entered.", "URL entered; DNS lookup; request sent to server; server response; browser renders."],
      ["Identify the threat: a fake bank email asks a user to confirm login details. Give one protection.", "Phishing; protection: check URL/sender, do not click suspicious links, 2FA, user training, spam filtering."]
    ],
    homework: [
      ["Explain how a firewall can protect a school network and state one limitation.", "Filters traffic by rules/ports/IP; blocks unauthorised access; limitation: cannot stop all user mistakes/phishing/encrypted malicious traffic."],
      ["Describe how pharming differs from phishing.", "Pharming redirects users to a fake site, often via DNS/host changes; phishing usually tricks through messages/links."],
      ["Evaluate the use of digital currency for online purchases.", "Advantages: fast, online, may reduce banking intermediaries. Disadvantages: volatility, fraud, lost keys, limited acceptance, regulation concerns."]
    ]
  },
  {
    id: 6,
    chapter: "Automated and Emerging Technologies",
    examStyle: ["sensor-control-actuator descriptions", "advantages/disadvantages", "robot characteristics", "AI data and decisions"],
    highlights: ["sensors", "microprocessors", "actuators", "feedback", "robotics", "AI/machine learning"],
    frequentAnswers: [
      ["An automated system:", "uses sensors for input, a processor for decisions and actuators for output."],
      ["Feedback:", "uses new sensor readings to adjust the system repeatedly."],
      ["AI systems need:", "data, rules/models and processing to simulate intelligent behaviour."]
    ],
    worksheet: [
      ["Describe how an automatic greenhouse controls temperature.", "Temperature sensor reads value; processor compares with set range; turns heater/fan/window actuator on or off; repeats using feedback."],
      ["Give two advantages and two disadvantages of using robots in manufacturing.", "Advantages: accurate, consistent, work continuously, safe in dangerous areas. Disadvantages: high setup cost, job loss, maintenance, less flexible."],
      ["Identify sensor, processor and actuator in an automatic door.", "Sensor: motion/pressure/infrared; processor: microprocessor/control unit; actuator: motor opening/closing door."]
    ],
    homework: [
      ["Explain why ADC may be needed in an automated control system.", "Sensors often produce analogue signals; processors use digital data; ADC converts analogue readings to digital values."],
      ["A hospital uses AI to help diagnose scans. Give benefits and risks.", "Benefits: fast, pattern recognition, supports doctors. Risks: bias, incorrect prediction, need expert checking, privacy/data quality."],
      ["Compare human and robot use for exploring a dangerous area.", "Robot: safer, can withstand hazards, repeat tasks; human: judgement/flexibility; robot may fail, cost, remote-control delay."]
    ]
  },
  {
    id: 7,
    chapter: "Algorithm Design and Problem Solving",
    examStyle: ["trace tables", "test data selection", "validation/verification", "pseudocode completion"],
    highlights: ["decomposition", "flowcharts/pseudocode", "validation", "verification", "normal/boundary/abnormal data", "dry runs"],
    frequentAnswers: [
      ["Validation checks:", "whether input is reasonable/allowed, not whether it is true."],
      ["Verification checks:", "whether data has been copied or entered accurately."],
      ["Boundary data:", "tests values at the edge of valid ranges."]
    ],
    worksheet: [
      ["For a percentage mark 0 to 100, give normal, boundary and abnormal test data.", "Normal: 55. Boundary: 0 and 100 or -1/101 around boundary. Abnormal: -5, 120, text."],
      ["Explain decomposition using a school report system as an example.", "Break into input marks, calculate grades, store records, produce reports; each sub-problem is easier to design/test."],
      ["Dry-run: total=0. FOR i=1 TO 4: total=total+i. State final total.", "1+2+3+4 = 10."]
    ],
    homework: [
      ["Write pseudocode to input 10 numbers and output the largest.", "Use loop, input number, initialise largest with first value or very small value, compare each number, update largest, output largest."],
      ["Explain why both normal and abnormal test data are needed.", "Normal checks valid data accepted and processed; abnormal checks invalid data rejected and program handles errors."],
      ["A date is entered twice before saving. Name and explain this check.", "Verification; double entry compares both versions to reduce transcription errors."]
    ]
  },
  {
    id: 8,
    chapter: "Programming",
    examStyle: ["code tracing", "loop choice", "array manipulation", "file handling steps"],
    highlights: ["variables/constants", "data types", "operators", "IF/CASE", "FOR/WHILE/REPEAT", "arrays", "files"],
    frequentAnswers: [
      ["A Boolean stores:", "TRUE or FALSE."],
      ["Use FOR when:", "the number of repetitions is known."],
      ["Use WHILE when:", "the condition must be checked before each repetition."]
    ],
    worksheet: [
      ["Choose suitable data types for name, age, test score and enrolled/not enrolled.", "String, integer, real/integer depending score format, Boolean."],
      ["Explain the difference between WHILE and REPEAT loops.", "WHILE checks condition before loop so may run zero times; REPEAT checks after loop so runs at least once."],
      ["An array Scores[1:5] stores 6, 8, 5, 9, 7. Find the total and average.", "Total 35; average 7."]
    ],
    homework: [
      ["Write pseudocode to count how many values in an array of 20 marks are >= 50.", "Initialise count to 0; loop through array; IF mark >= 50 THEN count=count+1; output count."],
      ["Explain why constants are useful in a program.", "Meaningful names; easier maintenance; value cannot accidentally change; update in one place."],
      ["Describe steps to read all records from a text file until end of file.", "Open file for read; loop until EOF; read record/line; process; close file."]
    ]
  },
  {
    id: 9,
    chapter: "Databases",
    examStyle: ["definitions", "field type choice", "validation checks", "SQL query writing"],
    highlights: ["table/record/field", "primary key", "data types", "validation", "SELECT/FROM/WHERE/ORDER BY"],
    frequentAnswers: [
      ["A record is:", "one row in a table."],
      ["A primary key:", "uniquely identifies each record."],
      ["WHERE:", "filters records that meet a condition."]
    ],
    worksheet: [
      ["For a Students table, choose suitable fields and a primary key.", "StudentID primary key; Name, Class, DateOfBirth, Email, Enrolled etc."],
      ["Choose validation checks for Age and Email.", "Age: range/type check. Email: format/presence/length check."],
      ["Write SQL to show Name and Class from Students where Class is '9A'.", "SELECT Name, Class FROM Students WHERE Class = '9A';"]
    ],
    homework: [
      ["Explain two advantages of using a database instead of separate flat files.", "Reduced duplication; improved consistency; easier queries/reports; multi-user access; security/validation."],
      ["Write SQL to list all books with Price less than 50, ordered by Title.", "SELECT * FROM Books WHERE Price < 50 ORDER BY Title;"],
      ["Explain why StudentName is a poor primary key.", "Names may repeat; names can change; may not uniquely identify a record."]
    ]
  },
  {
    id: 10,
    chapter: "Boolean Logic",
    examStyle: ["truth tables", "circuit tracing", "Boolean expression writing", "problem statement translation"],
    highlights: ["NOT/AND/OR", "NAND/NOR/XOR", "truth table rows", "intermediate outputs", "two-input gates"],
    frequentAnswers: [
      ["AND outputs 1 when:", "all inputs are 1."],
      ["OR outputs 1 when:", "at least one input is 1."],
      ["XOR outputs 1 when:", "exactly one input is 1."]
    ],
    worksheet: [
      ["Complete the truth table for X = A AND NOT B.", "00->0, 01->0, 10->1, 11->0."],
      ["How many rows are needed for four inputs? Explain.", "16 rows because 2^4 input combinations."],
      ["Write a Boolean expression for: alarm sounds if door is open AND system is armed.", "Alarm = DoorOpen AND Armed."]
    ],
    homework: [
      ["Complete a truth table for X = (A OR B) AND C.", "List 8 rows; OR intermediate; X is 1 only when C=1 and A or B is 1."],
      ["A lamp turns on when exactly one of two switches is on. Name the gate and explain.", "XOR; output is 1 when inputs are different/exactly one input is 1."],
      ["Explain how to avoid mistakes in multi-gate truth tables.", "Add intermediate columns for each gate; fill rows systematically; check all input combinations."]
    ]
  }
];

window.getPracticePack = id => window.PRACTICE_PACKS.find(pack => pack.id === Number(id));
