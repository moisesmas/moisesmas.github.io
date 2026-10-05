---
title: "1. The computer system"
description: "The four elements of a computer system, its basic hardware, the types of software and the main types of computers."
---

Before you can install or manage an operating system, you need to know what it runs on and what it works with. In this page you will learn the vocabulary that the rest of the module uses: system, hardware, software, firmware and the different kinds of computers.

:::tip[How to use this page]
1. Read sections 1 to 4 (about 40 minutes).
2. Practise with the [Computer System Explorer](/docencia/smr/som/ud01-introduccion/laboratorios/explorador-del-sistema/#parts) lab: the tabs **System parts**, **Inside the box**, **Software types** and **Right computer for the job** match sections 1 to 4.
3. Answer the questions at the end and do [Activity 1, 2 and 3](/docencia/smr/som/ud01-introduccion/actividades/).
:::

## 1. What is a computer system?

A **system** is a set of interrelated parts that work together for a purpose. A bicycle is a system, and so is the human body. A **computer system** is a set of elements that work together to turn raw **data** into useful **information**.

A computer system has four basic elements:

| Element | What it is | Examples |
|---|---|---|
| **Hardware** | The physical parts you can touch. | Processor, memory, disk, screen, keyboard, cables |
| **Software** | The programs and instructions that tell the hardware what to do. | Operating system, web browser, games, drivers |
| **Data** | The symbols the system stores and processes. They become *information* when they have context and meaning. | Photos, documents, a list of temperatures, a database |
| **Users** | The people who use, install, configure and maintain the system. | A student, a technician, an administrator |

Many authors add a fifth element: **procedures**, the rules for using the system (backup policy, access rules, update schedule).

Think about a school library. The building, the shelves and the barcode reader are the hardware. The loan rules and the catalogue program are the software. The list of books and loans is the data. Students and librarians are the users. If one part fails (a broken reader, a bug in the program, wrong data, a user who does not know the rules), the whole service suffers.

### 1.1 What a computer system does

All computer systems perform five basic functions:

1. **Input.** They receive data or orders (keyboard, touchscreen, microphone, sensors, network).
2. **Processing.** The processor executes instructions to transform the data.
3. **Storage.** They keep data for later, in memory (short term) and on disks (long term).
4. **Output.** They show the results (screen, printer, speakers, network).
5. **Control.** Every step is a sequence of instructions that the processor fetches, decodes and executes, coordinated by the operating system.

Example: you take a photo with your phone and send it to a friend. The camera sensor captures the image (input). The phone processes it and compresses it (processing). The photo is saved in the storage (storage). The screen shows a preview (output) and the network sends it (output). The operating system coordinates all of this while you decide what to do (user).

## 2. Hardware and basic components

**Hardware** is every physical part of the computer system. Inside a typical PC you find these components:

| Component | What it does | Notes |
|---|---|---|
| **Case** (chassis) | Holds and protects the parts and directs the air flow. | Different sizes: tower, mini tower, small form factor |
| **Motherboard** | Connects all the other parts and lets them communicate. | It decides which processor, memory and cards you can install |
| **CPU** (processor) | Executes the instructions of the programs and controls the other parts. | Measured in cores and GHz |
| **Heat sink and fan** | Take the heat away from the CPU. | Without cooling the CPU slows down or switches off |
| **RAM** (main memory) | Stores the programs and data that are in use now. | **Volatile**: it loses its content without power |
| **Storage** (SSD or HDD) | Keeps the operating system, programs and files. | **Non-volatile**: it keeps data without power |
| **Graphics card** (GPU) | Creates the image that you see on the screen. | It can be integrated into the CPU or be a separate card |
| **Power supply** (PSU) | Converts the mains electricity into the low voltages that the parts need. | Measured in watts |
| **Expansion cards** | Add features: network, sound, TV, capture. | Many are already integrated into the motherboard |

Two ideas appear all the time in this module:

- **RAM versus storage.** RAM is fast and temporary: it is the work table. Storage is slower and permanent: it is the archive. When you open a program, the operating system copies it from the storage into the RAM.
- **SSD versus HDD.** An SSD stores data in flash memory chips and has no moving parts. An HDD stores data on spinning magnetic platters. The SSD is faster and silent, and the HDD usually gives more capacity for less money.

### 2.1 Peripherals

**Peripherals** are the devices that you connect to the computer to communicate with it or to store information. We classify them by the direction of the data:

| Type | Function | Examples |
|---|---|---|
| **Input** | Send data into the computer. | Keyboard, mouse, webcam, microphone, scanner |
| **Output** | Show or reproduce information. | Monitor, printer, speakers, headphones |
| **Input and output** | Do both. | Touchscreen, headset with microphone |
| **Storage** | Save data (inside or outside the case). | External disk, USB flash drive, memory card |
| **Communication** | Connect computers with each other or with other devices. | Network card, Wi-Fi adapter, Bluetooth adapter |

Most peripherals need a small program called a **driver**. The driver explains to the operating system how to talk to that specific device.

## 3. Software

**Software** is the set of programs, libraries and instructions that tell the hardware what to do. Without software the hardware is useless, and without suitable hardware the software cannot run. Software is not data: data is what programs work *with*, software is what works *on* the data.

### 3.1 Types of software

| Type | What it is | Examples |
|---|---|---|
| **System software** | Software that the computer needs to work. It hides the hardware details from the user. | Operating system, drivers, system utilities |
| **Application software** | Programs for a specific task that the user wants to do. | Office suite, browser, games, video editor |
| **Programming software** | Tools that help programmers to create programs. | Compiler, interpreter, code editor, debugger |
| **Firmware** | Low-level software stored in a non-volatile memory inside a device. It controls that device's circuits. | UEFI (or BIOS) of a PC, the software of a router, a TV or a washing machine |

Applications cannot run without system software: a spreadsheet needs an operating system to use the memory, the disk and the screen.

:::note[Firmware: software inside hardware]
Firmware lives in a chip (usually flash memory) soldered to the device. It is the first software that runs when you switch on a PC: the UEFI firmware checks the hardware and then starts the operating system. Printers, mice, USB drives, cameras and smart TVs also have firmware. You can update it, but only rarely, for example to fix a bug or add a feature.
:::

### 3.2 Programming languages: compiler or interpreter?

A processor only understands **machine language**: instructions made of ones and zeros that depend on the type of processor. Programmers prefer languages that are easier to read, so their programs must be translated.

- **Low-level languages** are close to the hardware. Machine language is the real language of the CPU. **Assembly** uses short names for each machine instruction (one assembly instruction is one machine instruction).
- **High-level languages** are closer to human language and do not depend on a specific processor. Examples are Python, Java, C and JavaScript.

A high-level program is translated into machine language in one of two ways:

| | Compiler | Interpreter |
|---|---|---|
| How it works | Translates the **whole** program before it runs and creates an executable file. | Reads and executes the program **one instruction at a time**. |
| Errors | Syntax errors are found before the program starts. | The program runs until it reaches the error. |
| Speed | The executable file usually runs fast. | Usually slower, because it translates while running. |
| Typical examples | C, C++ | Python, JavaScript (many languages mix both ideas) |

The tab **Software types** of the lab has a small simulator that compiles and interprets the same program, so you can see the difference with an error.

## 4. Types of computers

We can classify computers by their use and by their features.

**By use:** a *general-purpose* computer can run many different programs (a PC). A *specific-purpose* computer is built to do one task or a few tasks (an industrial robot).

**By features:**

| Type | Typical use | Key features |
|---|---|---|
| **Supercomputer** | Weather forecasts, scientific simulation, large AI training | Thousands or millions of processor cores working in parallel; very high cost and energy use. Performance is measured in FLOPS. Almost all of them run Linux. |
| **Mainframe** | Banks, insurance, government: huge numbers of transactions | Built for reliability and for moving a lot of data; far fewer processors than a supercomputer; very expensive. |
| **Server** | Websites, databases, file and print services, virtualisation | Serves other computers (clients) over a network; works 24/7; has redundancy (RAID disks, two power supplies); often mounted in a rack. |
| **Personal computer (PC)** | Study, office work, internet, media | General purpose and low cost. Desktops, laptops, tablets and 2-in-1 devices. |
| **Workstation** | CAD, 3D modelling, video editing, data science | A powerful PC: many cores, a lot of RAM (often ECC), fast SSD, professional graphics card. |
| **Embedded system** | Cars, appliances, medical devices, sensors, routers | A small computer inside a larger product that does a fixed task, often with firmware or a real-time OS. Limited resources. |

### 4.1 Supercomputer or mainframe?

They sound similar, but they solve different problems:

- A **supercomputer** is optimised for *very complex calculations* (science, engineering, military research). It has many thousands of processors working in parallel, and it is hard to program.
- A **mainframe** is optimised for *a huge volume of simple operations* (payments, bookings) that must never stop. Its key values are reliability, security and continuous operation.

:::caution[The categories are not rigid]
Cloud computing, virtualisation and system-on-chip designs blur the borders. A "server" can be a virtual machine in a data centre, and your phone is a PC with a different shape. Use the categories to understand the requirements of each system, not as strict boxes.
:::

## Check what you have learned

1. A friend says: "I changed my Windows laptop for a MacBook." What changed more, hardware or software? Explain.

   <details>
   <summary>Answer</summary>

   Both changed, because a laptop is hardware and the operating system is software. The processor, memory, screen and case are different (hardware), and the operating system and most applications are different too (software).

   </details>

2. Classify these devices as input, output, input and output, storage or communication: scanner, projector, touchscreen, USB flash drive, Wi-Fi adapter.

   <details>
   <summary>Answer</summary>

   Scanner: input. Projector: output. Touchscreen: input and output. USB flash drive: storage. Wi-Fi adapter: communication.

   </details>

3. What is the difference between RAM and an SSD? Give one similarity and two differences.

   <details>
   <summary>Answer</summary>

   Similarity: both store data. Differences: RAM is volatile (it loses the data without power), the SSD is non-volatile; RAM is much faster but smaller and more expensive per gigabyte, and it only keeps what is in use now, while the SSD keeps the files for a long time.

   </details>

4. Which type of software is the UEFI of a PC, and where is it stored?

   <details>
   <summary>Answer</summary>

   It is firmware. It is stored in a non-volatile flash memory chip on the motherboard.

   </details>

5. A hospital needs a computer for a CT scanner's control unit, a bank needs one for millions of card payments, and a school needs one for its internal website. Which type of computer fits each case best?

   <details>
   <summary>Answer</summary>

   The control unit of the CT scanner is an embedded system. The bank's payment processing fits a mainframe. The school website fits a server.

   </details>

## Glossary

| English | Castellano |
|---|---|
| computer system | sistema informático |
| hardware | hardware, componentes físicos |
| software | software, programas |
| firmware | firmware, programa residente en el dispositivo |
| data / information | datos / información |
| user | usuario |
| motherboard | placa base |
| processor (CPU) | procesador (CPU) |
| RAM (main memory) | memoria RAM (memoria principal) |
| volatile / non-volatile | volátil / no volátil |
| storage | almacenamiento |
| peripheral | periférico |
| driver | controlador |
| compiler / interpreter | compilador / intérprete |
| supercomputer | superordenador |
| mainframe | ordenador central, mainframe |
| server | servidor |
| workstation | estación de trabajo |
| embedded system | sistema empotrado |

:::note[Credits]
This page adapts the SOM course notes by Moisés Mas Rocamora, Daniel Álvarez Santamaría and Jana Taboada León, licensed under CC BY-NC-SA 4.0. This page is shared under the same licence.
:::
