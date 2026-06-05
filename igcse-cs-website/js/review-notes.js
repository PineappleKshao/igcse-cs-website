window.REVIEW_NOTES = {
  rules: [
    ["State / Give / Identify", "Give one short, accurate fact, term, value or example."],
    ["Describe", "Write what happens, what something does, or the steps in order."],
    ["Explain", "Give a point and a reason. Use because, so that, therefore or this means."],
    ["Compare", "Mention both items and use the same feature for both sides."],
    ["Calculate", "Show the formula, substitution, working, conversion and final unit."],
    ["Write an algorithm", "Use correct pseudocode structure, indentation, assignment and loop logic."]
  ],
  chapters: {
    1: {
      title: "Data Representation",
      intro: "Learn short, accurate answers for binary, hexadecimal, character sets, image/sound storage, file-size calculations and compression.",
      sections: [
        {
          title: "Must-Know Definitions",
          type: "table",
          headers: ["Term", "Exam-style answer"],
          rows: [
            ["Bit", "A single binary digit, either 0 or 1."],
            ["Nibble", "A group of 4 bits."],
            ["Byte", "A group of 8 bits."],
            ["Binary", "A base 2 number system that uses only 0 and 1."],
            ["Denary", "A base 10 number system that uses digits 0 to 9."],
            ["Hexadecimal", "A base 16 number system that uses digits 0 to 9 and letters A to F."]
          ]
        },
        {
          title: "Why Computers Use Binary",
          type: "bullets",
          items: [
            "Computers are made from electronic circuits.",
            "These circuits have two stable states: on and off.",
            "On can be represented as 1 and off can be represented as 0."
          ]
        },
        {
          title: "Storage Units and Conversions",
          type: "table",
          headers: ["Unit / formula", "Exam reminder"],
          rows: [
            ["1 bit", "One binary digit."],
            ["1 nibble", "4 bits."],
            ["1 byte", "8 bits."],
            ["1 KiB", "1024 bytes."],
            ["1 MiB", "1024 KiB."],
            ["bits = bytes x 8", "Use when converting bytes to bits."],
            ["bytes = bits / 8", "Use when converting bits to bytes."]
          ]
        },
        {
          title: "Binary, Denary and Hexadecimal",
          type: "bullets",
          items: [
            "Binary to denary: add the place values where the binary digit is 1.",
            "Denary to binary: break the denary number into binary place values.",
            "One hexadecimal digit represents exactly 4 bits.",
            "Hexadecimal is shorter than binary and easier for humans to read.",
            "Hexadecimal is used for MAC addresses, memory addresses and colour codes."
          ]
        },
        {
          title: "Binary Addition and Overflow",
          type: "table",
          headers: ["Calculation", "Result"],
          rows: [
            ["0 + 0", "0"],
            ["0 + 1", "1"],
            ["1 + 0", "1"],
            ["1 + 1", "10"],
            ["1 + 1 + 1", "11"],
            ["Overflow", "The result is too large to fit into the number of bits available."]
          ]
        },
        {
          title: "Two's Complement",
          type: "steps",
          items: [
            "Two's complement is used to represent negative binary numbers.",
            "The leftmost bit is the sign bit.",
            "In 8-bit two's complement, the range is -128 to +127.",
            "To convert a positive number to a negative number: write the positive binary number, invert all bits, then add 1."
          ]
        },
        {
          title: "Text, Sound and Images",
          type: "table",
          headers: ["Term", "Exam-style answer"],
          rows: [
            ["Character set", "A set of characters that a computer can represent; each character is assigned a unique binary code."],
            ["ASCII", "A smaller character set mainly for basic English characters."],
            ["Unicode", "A larger character set that can represent many languages and symbols."],
            ["Sample rate", "The number of sound samples taken each second."],
            ["Sample resolution", "The number of bits used to store each sound sample."],
            ["Pixel", "The smallest identifiable part of a bitmap image."],
            ["Resolution", "The number of pixels in an image."],
            ["Colour depth", "The number of bits used to represent the colour of one pixel."]
          ]
        },
        {
          title: "File-Size Formulae",
          type: "table",
          headers: ["Data type", "Formula"],
          rows: [
            ["Sound file size in bits", "sample rate x sample resolution x duration x number of channels"],
            ["Image file size in bits", "width x height x colour depth"],
            ["Number of colours", "2^colour depth"]
          ]
        },
        {
          title: "Compression",
          type: "table",
          headers: ["Feature", "Lossy", "Lossless"],
          rows: [
            ["Data loss", "Some data is permanently removed.", "No data is permanently removed."],
            ["Original file", "Cannot be restored exactly.", "Can be restored exactly."],
            ["File size", "Usually much smaller.", "Usually less reduction."],
            ["Suitable for", "Images, audio and video.", "Text, programs and important data."]
          ]
        },
        {
          title: "RLE Answer Pattern",
          type: "bullets",
          items: [
            "Run Length Encoding is a lossless compression method.",
            "It stores repeated values as frequency/data pairs.",
            "It is effective when data contains long runs of repeated values."
          ]
        }
      ],
      checklist: [
        "Binary is used because circuits have two states.",
        "One hex digit equals four bits.",
        "Use correct units in file-size questions.",
        "Lossless means exact recovery; lossy permanently removes data."
      ]
    },
    2: {
      title: "Data Transmission",
      intro: "Use this chapter to answer questions about transmission modes, serial/parallel methods, packets, error detection and encryption.",
      sections: [
        {
          title: "Transmission Modes",
          type: "table",
          headers: ["Mode", "Exam-style answer"],
          rows: [
            ["Simplex", "Data can travel in one direction only."],
            ["Half-duplex", "Data can travel in both directions, but not at the same time."],
            ["Full-duplex", "Data can travel in both directions at the same time."]
          ]
        },
        {
          title: "Serial and Parallel Transmission",
          type: "table",
          headers: ["Method", "Exam-style answer"],
          rows: [
            ["Serial", "Bits are sent one at a time along one channel."],
            ["Parallel", "Several bits are sent at the same time along multiple channels."],
            ["Why serial over distance?", "It uses fewer wires and avoids timing differences between parallel channels."],
            ["Parallel limitation", "Bits can arrive out of step due to skew, especially over longer distances."]
          ]
        },
        {
          title: "Packet Switching",
          type: "bullets",
          items: [
            "Data is split into smaller packets before transmission.",
            "Each packet contains data, destination address, source address, sequence information and error-checking data.",
            "Packets may take different routes across a network.",
            "Packets are reassembled at the destination using sequence numbers.",
            "Only missing or damaged packets need to be resent."
          ]
        },
        {
          title: "Error Detection",
          type: "table",
          headers: ["Method", "Exam-style answer"],
          rows: [
            ["Parity check", "An extra parity bit is added so the number of 1s is odd or even."],
            ["Checksum", "A value is calculated from a block of data and compared after transmission."],
            ["Echo check", "The receiver sends the data back so the sender can compare it."],
            ["Check digit", "An extra digit is calculated from other digits to detect input or transmission errors."],
            ["Limitation", "Error-detection methods can detect many errors, but they do not guarantee every error is found or corrected."]
          ]
        },
        {
          title: "Encryption",
          type: "table",
          headers: ["Type", "Exam-style answer"],
          rows: [
            ["Encryption", "Converting readable data into unreadable ciphertext using an algorithm and key."],
            ["Symmetric encryption", "The same secret key is used to encrypt and decrypt data."],
            ["Asymmetric encryption", "A public key and a private key are used."],
            ["Public key", "Can be shared and used to encrypt data or verify a signature."],
            ["Private key", "Must be kept secret and can decrypt data encrypted with the matching public key."]
          ]
        }
      ],
      checklist: [
        "Do not confuse mode with method.",
        "Parity and checksum detect errors; they do not usually correct them.",
        "Packets need address and sequence information.",
        "Symmetric uses one shared key; asymmetric uses public/private keys."
      ]
    },
    3: {
      title: "Hardware",
      intro: "Use short component-role answers for CPU, input/output devices, sensors, storage, cloud storage and network hardware.",
      sections: [
        {
          title: "Input, Process, Output, Storage",
          type: "table",
          headers: ["Part", "Exam-style answer"],
          rows: [
            ["Input", "Data enters the computer system."],
            ["Process", "The CPU processes data and instructions."],
            ["Output", "Processed data is sent to the user or another system."],
            ["Storage", "Data and programs are saved for later use."]
          ]
        },
        {
          title: "CPU and Registers",
          type: "table",
          headers: ["Register / component", "Exam-style answer"],
          rows: [
            ["CPU", "Processes instructions and controls the hardware in the computer system."],
            ["PC", "Holds the address of the next instruction to be executed."],
            ["MAR", "Holds the memory address currently being accessed."],
            ["MDR", "Holds data or instructions being transferred to or from memory."],
            ["CIR", "Holds the instruction currently being decoded or executed."],
            ["ACC", "Holds the result of arithmetic or logical operations."],
            ["ALU", "Performs arithmetic calculations and logical comparisons."],
            ["CU", "Decodes instructions and coordinates CPU activity."]
          ]
        },
        {
          title: "Fetch-Decode-Execute Cycle",
          type: "steps",
          items: [
            "The address in the PC is copied to the MAR.",
            "The instruction is fetched from memory and copied to the MDR.",
            "The instruction is copied to the CIR.",
            "The PC is incremented.",
            "The control unit decodes the instruction.",
            "The instruction is executed by the CPU."
          ]
        },
        {
          title: "Embedded Systems",
          type: "bullets",
          items: [
            "An embedded system is a computer system built into another device.",
            "It is designed to perform a specific task.",
            "Examples include washing machines, traffic lights, printers, calculators and car engine control systems."
          ]
        },
        {
          title: "Input and Output Devices",
          type: "table",
          headers: ["Device", "Exam-style answer"],
          rows: [
            ["Keyboard", "Used to enter text, numbers and commands."],
            ["Microphone", "Inputs sound; an ADC converts analogue sound into digital data."],
            ["Barcode scanner", "Reads barcodes to input product or item data."],
            ["2D scanner", "Scans flat documents or images."],
            ["Speaker", "Outputs sound; a DAC converts digital data into analogue sound."],
            ["Inkjet printer", "Uses liquid ink to generate a physical output."],
            ["Laser printer", "Uses static electric charge on a drum and toner."],
            ["Actuator", "Moves or controls a mechanism."]
          ]
        },
        {
          title: "Sensors",
          type: "bullets",
          items: [
            "A sensor measures a physical property from the real world.",
            "The data is often analogue and may need to be converted into digital data.",
            "Common sensors include temperature, pressure, proximity, light, moisture, humidity, pH, gas and accelerometer sensors."
          ]
        },
        {
          title: "RAM, ROM and Secondary Storage",
          type: "table",
          headers: ["Feature", "RAM", "ROM", "Secondary storage"],
          rows: [
            ["Volatile?", "Yes.", "No.", "No."],
            ["Main purpose", "Stores running programs and data.", "Stores BIOS/startup instructions.", "Stores files, programs and data permanently."],
            ["Power off", "Data is lost.", "Data remains.", "Data remains."],
            ["CPU access", "Directly accessed by the CPU.", "Used during startup.", "Not directly accessed by the CPU."]
          ]
        },
        {
          title: "Secondary Storage Types",
          type: "table",
          headers: ["Type", "How data is stored", "Typical uses"],
          rows: [
            ["Magnetic", "Data is stored using magnetic regions on a disk or tape.", "HDDs, external hard drives and tape backup."],
            ["Optical", "Data is stored as pits and lands; a laser reads reflected light.", "CDs, DVDs, Blu-ray, media distribution and archiving."],
            ["Solid-state", "Data is stored on flash memory chips with no moving parts.", "SSDs, USB drives, SD cards, smartphones and tablets."]
          ]
        },
        {
          title: "Exam-Style Comparison Answers",
          type: "bullets",
          items: [
            "HDD vs SSD: an HDD uses magnetic storage and has moving parts, but an SSD uses flash memory and has no moving parts.",
            "SSD advantage: faster read/write speeds and more durable because there are no moving parts.",
            "HDD advantage: usually cheaper per gigabyte and can provide large capacity.",
            "Blu-ray stores more than CD because it uses a laser with a shorter wavelength, allowing smaller pits and lands."
          ]
        },
        {
          title: "Cloud Storage and Network Hardware",
          type: "table",
          headers: ["Term", "Exam-style answer"],
          rows: [
            ["Cloud storage", "Stores files and data on remote servers accessed through the Internet."],
            ["Redundancy", "Multiple copies of data are stored so another copy can be used if one is lost."],
            ["Scalability", "Storage capacity can be increased when needed."],
            ["NIC", "Allows a device to connect to a network; each NIC has a MAC address."],
            ["MAC address", "A unique address assigned to a network interface card, usually written in hexadecimal."],
            ["IP address", "Identifies a device on a network so data can be sent to the correct destination."],
            ["Router", "Sends data packets between networks and can connect a local network to the Internet."]
          ]
        }
      ],
      checklist: [
        "CPU answers need exact component names.",
        "Device answers need a scenario-linked reason.",
        "Storage comparisons need method, speed, durability, capacity and cost.",
        "Router connects networks; switch connects devices in a LAN."
      ]
    },
    4: {
      title: "Software",
      intro: "Use this chapter to answer classification, operating system, interrupt, translator and IDE questions.",
      sections: [
        {
          title: "Types of Software",
          type: "table",
          headers: ["Type", "Exam-style answer"],
          rows: [
            ["System software", "Software that manages hardware and provides a platform for application software."],
            ["Operating system", "Manages hardware, memory, files, processes, security and the user interface."],
            ["Utility software", "Performs maintenance or security tasks such as backup, compression or antivirus scanning."],
            ["Device driver", "Allows the operating system to communicate with a specific hardware device."],
            ["Application software", "Software designed to carry out user tasks such as word processing, browsing or editing images."],
            ["Firmware", "Software stored in ROM or flash memory that controls hardware at a low level."]
          ]
        },
        {
          title: "Operating System Functions",
          type: "bullets",
          items: [
            "Provides a user interface.",
            "Manages memory and processor time.",
            "Manages files and folders.",
            "Controls input and output devices using drivers.",
            "Provides security such as usernames, passwords and access rights.",
            "Handles interrupts and errors."
          ]
        },
        {
          title: "Interrupt Handling",
          type: "steps",
          items: [
            "An interrupt signal is generated by hardware or software.",
            "The CPU completes the current instruction.",
            "The current state of the program is saved.",
            "The correct interrupt service routine is loaded and executed.",
            "The saved state is restored.",
            "The original program continues."
          ]
        },
        {
          title: "Translators",
          type: "table",
          headers: ["Translator", "Exam-style answer"],
          rows: [
            ["Assembler", "Translates assembly language into machine code."],
            ["Compiler", "Translates the whole program into object code or executable code before it runs."],
            ["Interpreter", "Translates and runs source code one statement at a time."],
            ["Compiler advantage", "The executable can run quickly after translation and source code does not need to be supplied."],
            ["Interpreter advantage", "Useful during development because errors can be reported as each statement is executed."]
          ]
        },
        {
          title: "IDE Features",
          type: "table",
          headers: ["Feature", "How it helps the programmer"],
          rows: [
            ["Code editor", "Allows source code to be written and edited."],
            ["Syntax highlighting", "Makes keywords, strings and errors easier to see."],
            ["Error diagnostics", "Reports errors and may suggest where the problem is."],
            ["Debugger", "Allows breakpoints, single-stepping and variable inspection."],
            ["Run-time environment", "Allows the program to be run and tested inside the IDE."],
            ["Auto-completion", "Suggests keywords, identifiers or function names."]
          ]
        }
      ],
      checklist: [
        "Do not call every program application software.",
        "Drivers connect the OS to hardware devices.",
        "Compiler translates the whole program; interpreter works statement by statement.",
        "Interrupt answers need save, service routine and restore."
      ]
    },
    5: {
      title: "The Internet and Its Uses",
      intro: "Use this chapter for Internet vs WWW, web loading, cookies, digital currency and cyber-security threats/protection.",
      sections: [
        {
          title: "Internet and World Wide Web",
          type: "table",
          headers: ["Term", "Exam-style answer"],
          rows: [
            ["Internet", "A global network of connected networks."],
            ["World Wide Web", "A service that uses the Internet to access linked web pages using browsers."],
            ["Web browser", "Software used to request, receive and display web pages."],
            ["Web server", "A computer that stores and sends web pages or web resources."],
            ["URL", "The address used to locate a resource on the web."],
            ["DNS", "Translates a domain name into an IP address."]
          ]
        },
        {
          title: "Loading a Web Page",
          type: "steps",
          items: [
            "The user enters a URL into the browser.",
            "DNS translates the domain name into an IP address.",
            "The browser sends a request to the web server.",
            "The server sends the requested web page or resource back.",
            "The browser renders the page for the user."
          ]
        },
        {
          title: "Cookies",
          type: "bullets",
          items: [
            "A cookie is a small text file stored by a website on a user's device.",
            "Cookies can remember login state, preferences, shopping baskets and tracking information.",
            "Cookies can improve user experience but may raise privacy concerns."
          ]
        },
        {
          title: "Cyber-Security Threats",
          type: "table",
          headers: ["Threat", "Exam-style answer"],
          rows: [
            ["Malware", "Malicious software designed to damage, disrupt, steal data or gain unauthorised access."],
            ["Virus", "Malware that attaches to files and replicates when the file is run."],
            ["Phishing", "Fake messages or websites trick users into giving confidential data."],
            ["Pharming", "Redirects users to a fake website, often by changing DNS or host settings."],
            ["Hacking", "Gaining unauthorised access to a system or data."],
            ["DoS attack", "Floods a server or network with traffic so legitimate users cannot access it."],
            ["Social engineering", "Manipulates people into revealing information or performing unsafe actions."]
          ]
        },
        {
          title: "Protection Methods",
          type: "table",
          headers: ["Protection", "Exam-style answer"],
          rows: [
            ["Firewall", "Monitors and filters traffic according to rules."],
            ["Anti-malware", "Detects, quarantines and removes malicious software."],
            ["Strong password", "Makes guessing or brute-force attacks harder."],
            ["Two-factor authentication", "Requires a second proof of identity in addition to a password."],
            ["Encryption", "Makes intercepted data unreadable without the correct key."],
            ["User education", "Helps users recognise phishing, unsafe links and social engineering."]
          ]
        },
        {
          title: "Digital Currency",
          type: "bullets",
          items: [
            "Digital currency is money represented and transferred electronically.",
            "Some digital currencies use cryptography to secure transactions.",
            "Advantages can include fast online transfer and reduced physical cash handling.",
            "Risks can include fraud, lost credentials, volatility, privacy issues and limited acceptance."
          ]
        }
      ],
      checklist: [
        "Internet is infrastructure; WWW is a service on it.",
        "DNS translates domain names into IP addresses.",
        "Threat answers need the method of attack, not just the name.",
        "Protection answers must match the threat."
      ]
    },
    6: {
      title: "Automated and Emerging Technologies",
      intro: "Use this chapter for sensor-control-actuator answers, robotics evaluation and AI benefits/risks.",
      sections: [
        {
          title: "Automated Systems",
          type: "bullets",
          items: [
            "An automated system operates with little or no human control.",
            "Sensors collect data from the real world.",
            "A processor compares sensor data with rules or set values.",
            "Actuators cause physical action.",
            "Feedback uses new sensor readings to adjust the system repeatedly."
          ]
        },
        {
          title: "Control System Answer Pattern",
          type: "steps",
          items: [
            "Name the sensor and what it measures.",
            "State that the sensor data is sent to a processor or microprocessor.",
            "If needed, explain that an ADC converts analogue readings to digital data.",
            "The processor compares the reading with a set value or rule.",
            "The processor sends a signal to an actuator.",
            "The actuator changes the environment, and the process repeats using feedback."
          ]
        },
        {
          title: "Common Sensors and Actuators",
          type: "table",
          headers: ["Component", "Exam-style answer"],
          rows: [
            ["Temperature sensor", "Measures temperature in a room, car, greenhouse or machine."],
            ["Light sensor", "Measures light intensity."],
            ["Moisture sensor", "Measures water content in soil."],
            ["Pressure sensor", "Measures pressure such as tyre or fluid pressure."],
            ["Proximity sensor", "Detects nearby objects."],
            ["Motor", "An actuator that produces movement."],
            ["Heater", "An actuator that increases temperature."],
            ["Valve", "An actuator that opens or closes to control flow."]
          ]
        },
        {
          title: "Robotics",
          type: "table",
          headers: ["Point", "Exam-style answer"],
          rows: [
            ["Robot", "A programmable machine that can sense, process and act."],
            ["Advantages", "Robots can work accurately, consistently, continuously and in dangerous environments."],
            ["Disadvantages", "Robots can be expensive to buy and maintain, may replace jobs and may be less flexible than humans."],
            ["Best evaluation style", "Give advantages, disadvantages and a final judgement linked to the scenario."]
          ]
        },
        {
          title: "Artificial Intelligence",
          type: "table",
          headers: ["Term", "Exam-style answer"],
          rows: [
            ["AI", "Systems that simulate intelligent behaviour such as learning, reasoning, recognition or decision-making."],
            ["Machine learning", "A system learns patterns from data and uses them to make predictions or decisions."],
            ["Benefit", "AI can process large amounts of data quickly and recognise patterns."],
            ["Risk", "AI can produce biased or incorrect results if the training data is poor or incomplete."],
            ["Exam warning", "Do not say AI is always correct; important decisions should be checked by humans."]
          ]
        }
      ],
      checklist: [
        "Automated-system answers need sensor, processor and actuator.",
        "Mention ADC when analogue sensor data must be processed digitally.",
        "Evaluation needs both benefits and risks.",
        "AI depends on data quality."
      ]
    },
    7: {
      title: "Algorithm Design and Problem Solving",
      intro: "Use templates for decomposition, flowcharts, standard algorithms, validation, verification, test data, trace tables and errors.",
      sections: [
        {
          title: "Program Development Life Cycle",
          type: "table",
          headers: ["Stage", "Exam-style answer"],
          rows: [
            ["Analysis", "Identify the problem, requirements, abstraction and decomposition."],
            ["Design", "Plan the solution using structure diagrams, flowcharts or pseudocode."],
            ["Coding", "Write the program code."],
            ["Testing", "Test the program using suitable test data."]
          ]
        },
        {
          title: "Key Algorithm Terms",
          type: "table",
          headers: ["Term", "Exam-style answer"],
          rows: [
            ["Algorithm", "A set of instructions used to solve a problem or complete a task."],
            ["Decomposition", "Breaking a problem into smaller sub-problems."],
            ["Abstraction", "Removing unnecessary detail to focus on the important parts."],
            ["Pseudocode", "Structured English used to describe an algorithm."],
            ["Flowchart", "A diagram that shows the steps in an algorithm."],
            ["Structure diagram", "A diagram showing how a problem is broken into sub-systems."]
          ]
        },
        {
          title: "Flowchart Symbols",
          type: "table",
          headers: ["Symbol", "Purpose"],
          rows: [
            ["Terminator", "Start or stop."],
            ["Input/output", "Input data or output information."],
            ["Process", "Assignment or calculation."],
            ["Decision", "A condition with yes/no or true/false branches."],
            ["Subroutine", "Calls a procedure or function."],
            ["Flowline", "Shows the direction of flow."]
          ]
        },
        {
          title: "Standard Algorithms",
          type: "table",
          headers: ["Algorithm", "Purpose"],
          rows: [
            ["Totalling", "Adds values together."],
            ["Counting", "Counts how many values meet a condition."],
            ["Maximum", "Finds the largest value."],
            ["Minimum", "Finds the smallest value."],
            ["Average", "Calculates total divided by number of values."],
            ["Linear search", "Checks each item in order until the search item is found or the list ends."],
            ["Bubble sort", "Repeatedly compares adjacent items and swaps them if they are in the wrong order."]
          ]
        },
        {
          title: "Pseudocode Templates",
          type: "code",
          code: "Total <- 0\nINPUT Number\nWHILE Number <> 9999.9 DO\n    Total <- Total + Number\n    INPUT Number\nENDWHILE\nOUTPUT Total\n\nCount <- 0\nFOR Index <- 1 TO LENGTH(List)\n    IF List[Index] > 100\n    THEN\n        Count <- Count + 1\n    ENDIF\nNEXT Index\nOUTPUT Count"
        },
        {
          title: "Validation, Verification and Test Data",
          type: "table",
          headers: ["Term", "Exam-style answer"],
          rows: [
            ["Validation", "Checks whether data is sensible and follows rules."],
            ["Verification", "Checks whether data has been copied or entered correctly."],
            ["Normal data", "Valid data that should be accepted."],
            ["Abnormal data", "Invalid data that should be rejected."],
            ["Extreme data", "The smallest and largest valid values."],
            ["Boundary data", "Values at the edge of validity and just outside the edge."]
          ]
        },
        {
          title: "Trace Table Method",
          type: "steps",
          items: [
            "Follow the algorithm line by line.",
            "Record a variable only when its value changes.",
            "Record loop counter values.",
            "Record output only when an OUTPUT statement is executed.",
            "Stop when the algorithm terminates."
          ]
        },
        {
          title: "Errors",
          type: "table",
          headers: ["Error", "Exam-style answer"],
          rows: [
            ["Syntax error", "The code breaks the grammar rules of the programming language."],
            ["Logic error", "The program runs but gives an incorrect result."],
            ["Runtime error", "The program stops or crashes while running."]
          ]
        }
      ],
      checklist: [
        "Validation checks sensible input, not truth.",
        "Boundary data includes values at and just outside the edge.",
        "Trace tables follow execution order.",
        "Pseudocode must initialise variables before use."
      ]
    },
    8: {
      title: "Programming",
      intro: "Use this chapter for data types, variables, constants, operators, control structures, arrays, files and maintainability.",
      sections: [
        {
          title: "Data Types",
          type: "table",
          headers: ["Data type", "Exam-style answer"],
          rows: [
            ["INTEGER", "A whole number, for example 1475, 0 or -5."],
            ["REAL", "A number with a decimal point."],
            ["CHAR", "A single character."],
            ["STRING", "A sequence of characters."],
            ["BOOLEAN", "A value that can only be TRUE or FALSE."]
          ]
        },
        {
          title: "Variables and Constants",
          type: "bullets",
          items: [
            "A variable is a named memory location whose value can change while the program is running.",
            "A constant is a named value whose value cannot change while the program is running.",
            "Meaningful identifiers make the program easier to read and maintain."
          ]
        },
        {
          title: "Operators",
          type: "table",
          headers: ["Operator", "Meaning"],
          rows: [
            ["+", "Addition or string concatenation."],
            ["-", "Subtraction."],
            ["*", "Multiplication."],
            ["/", "Division."],
            ["^", "Power."],
            ["DIV", "Integer division; gives the quotient."],
            ["MOD", "Gives the remainder."]
          ]
        },
        {
          title: "Control Structures",
          type: "table",
          headers: ["Structure", "Exam-style answer"],
          rows: [
            ["Sequence", "Statements are executed in order."],
            ["Selection", "A decision chooses which statements are executed."],
            ["Iteration", "A section of code is repeated."],
            ["FOR loop", "Use when the number of repetitions is known."],
            ["WHILE loop", "Use when the condition is tested before the loop."],
            ["REPEAT UNTIL loop", "Runs at least once because the condition is tested after the loop body."]
          ]
        },
        {
          title: "Selection and Iteration Templates",
          type: "code",
          code: "IF Mark >= 50\nTHEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Fail\"\nENDIF\n\nFOR Count <- 1 TO 50\n    INPUT Number\nNEXT Count\n\nWHILE Password <> \"abc123\" DO\n    INPUT Password\nENDWHILE\n\nREPEAT\n    INPUT Number\nUNTIL Number >= 1 AND Number <= 100"
        },
        {
          title: "Procedures and Functions",
          type: "table",
          headers: ["Subroutine term", "Exam-style answer"],
          rows: [
            ["Procedure", "A named block of code that performs a task and does not return a value."],
            ["Function", "A named block of code that performs a task and returns a value."],
            ["Parameter", "A value passed into a procedure or function."],
            ["Local variable", "A variable that can only be used inside the subroutine where it is declared."]
          ]
        },
        {
          title: "Arrays",
          type: "bullets",
          items: [
            "An array stores multiple values under one identifier.",
            "All values in an array have the same data type.",
            "Each item is accessed using an index.",
            "A 2D array can be treated as rows and columns."
          ]
        },
        {
          title: "File Handling",
          type: "steps",
          items: [
            "Open the file.",
            "Read from or write to the file.",
            "Close the file.",
            "Files are used because variables and arrays are in RAM and are lost when the program ends."
          ]
        },
        {
          title: "Maintainable Programs",
          type: "bullets",
          items: [
            "Maintainable programs are easy to read, understand, correct and improve.",
            "Meaningful identifiers make the purpose of variables clear.",
            "Comments explain difficult parts of code.",
            "Procedures and functions reduce repeated code.",
            "Indentation makes program structure easier to follow."
          ]
        }
      ],
      checklist: [
        "Choose the correct data type before writing code.",
        "FOR is for known repetitions.",
        "REPEAT runs at least once.",
        "Arrays need indexes; files need open, read/write and close."
      ]
    },
    9: {
      title: "Databases and SQL",
      intro: "Use this chapter for database vocabulary, primary keys, data types and SQL templates.",
      sections: [
        {
          title: "Database Terms",
          type: "table",
          headers: ["Term", "Exam-style answer"],
          rows: [
            ["Database", "A structured way to store data so it can be searched and retrieved."],
            ["Table", "A structure that stores related data."],
            ["Field", "A column in a table."],
            ["Record", "A row in a table."],
            ["Primary key", "A field that uniquely identifies each record."],
            ["Query", "A request for data from a database."],
            ["SQL", "Structured Query Language used to query databases."]
          ]
        },
        {
          title: "Primary Key",
          type: "bullets",
          items: [
            "A primary key uniquely identifies each record in a table.",
            "Each value in the primary key field must be unique.",
            "A primary key should not be empty.",
            "Names are often poor primary keys because two people can have the same name."
          ]
        },
        {
          title: "Database Data Types",
          type: "table",
          headers: ["Data type", "Suitable use"],
          rows: [
            ["Text / Alphanumeric", "Names, addresses and phone numbers."],
            ["Boolean", "TRUE/FALSE values."],
            ["Character", "A single character."],
            ["Integer", "Whole numbers."],
            ["Real", "Decimal numbers."],
            ["Date/Time", "Dates or times."]
          ]
        },
        {
          title: "SQL Templates",
          type: "code",
          code: "SELECT FirstName, Surname\nFROM members;\n\nSELECT *\nFROM members;\n\nSELECT FirstName, Surname\nFROM members\nWHERE Town = 'Ipswich';\n\nSELECT FirstName, Surname\nFROM members\nWHERE Town = 'Ipswich' AND Gender = 'F';\n\nSELECT FirstName, Surname\nFROM members\nORDER BY Surname ASC;\n\nSELECT COUNT(*)\nFROM members;\n\nSELECT SUM(NumberOfCustomerOrders)\nFROM customers;"
        },
        {
          title: "Common SQL Mistakes",
          type: "bullets",
          items: [
            "Forgetting the table name after FROM.",
            "Using the wrong field name.",
            "Forgetting quotation marks around text values.",
            "Mixing up AND and OR.",
            "Using ORDER BY before WHERE."
          ]
        }
      ],
      checklist: [
        "Record means row; field means column.",
        "A primary key uniquely identifies each record.",
        "SQL order: SELECT, FROM, WHERE, ORDER BY.",
        "Text values in SQL need quotation marks."
      ]
    },
    10: {
      title: "Boolean Logic",
      intro: "Use this chapter for truth tables, logic gates, Boolean expressions and circuit tracing.",
      sections: [
        {
          title: "Boolean Logic",
          type: "bullets",
          items: [
            "Boolean logic uses TRUE and FALSE values.",
            "In computing, TRUE can be represented as 1 and FALSE as 0.",
            "Logic gates use binary inputs to produce a binary output."
          ]
        },
        {
          title: "Truth Tables",
          type: "bullets",
          items: [
            "A truth table shows every possible combination of inputs.",
            "It shows the output for each input combination.",
            "Number of input combinations = 2^n, where n is the number of inputs."
          ]
        },
        {
          title: "Logic Gates",
          type: "table",
          headers: ["Gate", "Rule"],
          rows: [
            ["NOT", "Outputs the opposite of the input."],
            ["AND", "Outputs 1 only if both inputs are 1."],
            ["OR", "Outputs 1 if at least one input is 1."],
            ["NAND", "The opposite of AND."],
            ["NOR", "The opposite of OR."],
            ["XOR / EOR", "Outputs 1 if the inputs are different."]
          ]
        },
        {
          title: "Two-Input Truth Tables",
          type: "table",
          headers: ["A", "B", "AND", "OR", "NAND", "NOR", "XOR"],
          rows: [
            ["0", "0", "0", "0", "1", "1", "0"],
            ["0", "1", "0", "1", "1", "0", "1"],
            ["1", "0", "0", "1", "1", "0", "1"],
            ["1", "1", "1", "1", "0", "0", "0"]
          ]
        },
        {
          title: "Safe Method for Combined Gates",
          type: "steps",
          items: [
            "Write every possible input combination.",
            "Add intermediate columns for each gate.",
            "Fill the table one gate at a time from left to right.",
            "Only write the final output after all intermediate outputs are correct.",
            "Check the final result against the original problem statement."
          ]
        }
      ],
      checklist: [
        "Use 2^n rows for n inputs.",
        "AND means all inputs are 1.",
        "OR means at least one input is 1.",
        "XOR means exactly one input is 1.",
        "Use intermediate columns for combined gates."
      ]
    }
  }
};

window.getReviewNotes = id => window.REVIEW_NOTES.chapters[Number(id)];
