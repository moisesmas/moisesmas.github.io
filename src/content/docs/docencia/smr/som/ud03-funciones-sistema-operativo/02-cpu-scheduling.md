---
title: "2. CPU scheduling"
description: "How the scheduler chooses the next process: FIFO, SJF, SRTF, priorities and Round Robin with worked examples, waiting and response times, starvation, and synchronisation problems such as deadlock."
---

There are many more ready processes than CPU cores. Someone must decide which process runs next and for how long. That someone is the **scheduler**, and its choice changes how fast your computer feels. In this page you will learn the main scheduling algorithms and, more important, how to calculate their results by hand.

:::tip[How to use this page]
1. Read sections 1 to 4 and follow every example with pen and paper (about 70 minutes).
2. Check your work with the tabs **Scheduler simulator** and **Algorithm shoot-out** of the [Process & CPU Scheduler Lab](/docencia/smr/som/ud03-funciones-sistema-operativo/laboratorios/planificador-de-procesos/#scheduler). Sections 5 and 6 match the tab **Critical section & deadlock**.
3. Do [Activities 3 and 4](/docencia/smr/som/ud03-funciones-sistema-operativo/actividades/).
:::

## 1. The scheduler

You already know the states of a process (see [page 1](/docencia/smr/som/ud03-funciones-sistema-operativo/01-processes/)). The **ready queue** holds the processes that wait for the CPU. The OS uses three decision makers, named by how often they act:

- The **long-term scheduler** decides which new programs are admitted into the system (and into the ready queue). Windows and Linux do this almost without limits, but a server can refuse new jobs when it is full.
- The **medium-term scheduler** moves processes out of RAM to the disk and back (*swapping*), for example a process that has been idle for a long time. You will see this in [page 3](/docencia/smr/som/ud03-funciones-sistema-operativo/03-memory-management/).
- The **short-term scheduler**, also called the *CPU scheduler*, chooses which ready process runs next. It acts many times per second. When people say "the scheduler", they mean this one.

The **dispatcher** is the small piece of code that gives the CPU to the process chosen by the scheduler. It makes the context switch.

A scheduling algorithm is **non-preemptive** if a process keeps the CPU until it ends or waits for I/O. It is **preemptive** (*expulsive*) if the OS can take the CPU from a running process, for example when its time is over or when a more important process arrives. All modern desktop systems are preemptive, because otherwise one program that never ends would freeze the computer.

## 2. Data and measures

To simulate an algorithm you need these data for each process:

- **Arrival time** (A): the moment when the process enters the ready queue.
- **Burst time** (B), or execution time: the total CPU time the process needs. In our exercises we use whole numbers of *time units* and we ignore I/O.
- **Priority**, only for priority algorithms. In this course, **a lower number means a higher priority**.

When the simulation ends, you calculate for each process:

| Measure | Formula | Meaning |
|---|---|---|
| **Completion time** (C) | read it from the Gantt chart | The moment when the process ends |
| **Response time** (R) | C − A | Time from arrival until the result is ready (many books call it *turnaround time*) |
| **Waiting time** (W) | R − B | Time spent in the ready queue, not running |

And then the **averages** of W and R, which tell you how good the algorithm is for this load. Some books use "response time" for the time from arrival until the *first* time the process gets the CPU. The lab shows this as **Start delay**. In this course, response time is C − A.

The tool to draw the result is the **Gantt chart**: a time line that shows which process owns the CPU in each time unit.

Other measures you should know: **CPU utilisation** (the percentage of time the CPU is working), **throughput** (processes finished per unit of time) and the number of **context switches**, because each one wastes some time.

### The example load

We will use the same four processes in all the algorithms of the next section:

| Process | Arrival (A) | Burst (B) | Priority |
|---|---|---|---|
| P1 | 0 | 6 | 4 |
| P2 | 1 | 3 | 1 |
| P3 | 2 | 1 | 3 |
| P4 | 3 | 4 | 2 |

The total CPU time is 6 + 3 + 1 + 4 = 14 units, and the CPU is never idle, so every algorithm ends at time 14.

## 3. Scheduling algorithms, step by step

### 3.1 FIFO (First In, First Out)

Processes run in the order of arrival. It is non-preemptive. It is simple and fair in the sense of "first come, first served", but a long process at the front makes all the others wait (the *convoy effect*).

```text
Gantt:  P1 [0-6]  P2 [6-9]  P3 [9-10]  P4 [10-14]
```

| Process | C | R = C − A | W = R − B |
|---|---|---|---|
| P1 | 6 | 6 − 0 = 6 | 6 − 6 = 0 |
| P2 | 9 | 9 − 1 = 8 | 8 − 3 = 5 |
| P3 | 10 | 10 − 2 = 8 | 8 − 1 = 7 |
| P4 | 14 | 14 − 3 = 11 | 11 − 4 = 7 |

Average waiting time = (0 + 5 + 7 + 7) / 4 = **4.75**. Average response time = (6 + 8 + 8 + 11) / 4 = **8.25**. Context switches: 3.

### 3.2 SJF (Shortest Job First)

When the CPU is free, the OS chooses the ready process with the **shortest burst**. It is non-preemptive. It gives the best average waiting time among non-preemptive algorithms, but it needs to know the burst in advance (real systems can only estimate it) and long processes can wait forever.

At time 0 only P1 is ready, so it starts and runs until 6. At time 6, P2 (3), P3 (1) and P4 (4) are ready: P3 is the shortest, then P2, then P4.

```text
Gantt:  P1 [0-6]  P3 [6-7]  P2 [7-10]  P4 [10-14]
```

Completion times: P1 = 6, P3 = 7, P2 = 10, P4 = 14. Waiting times: P1 = 0, P2 = 6, P3 = 4, P4 = 7. Average waiting time = 17 / 4 = **4.25**. Response times: 6, 9, 5, 11; average **7.75**.

### 3.3 SRTF (Shortest Remaining Time First)

This is the preemptive version of SJF. At every moment the CPU goes to the process with the **least remaining time**. If a new process arrives with less remaining time than the running one, it takes the CPU.

- t = 0: only P1 (remaining 6). It runs.
- t = 1: P2 arrives with 3. P1 has 5 left, so P2 preempts it.
- t = 2: P3 arrives with 1. P2 has 2 left, so P3 preempts it. P3 ends at 3.
- t = 3: P4 arrives (4). Ready: P1 (5), P2 (2), P4 (4). P2 runs and ends at 5.
- t = 5: P1 (5) and P4 (4): P4 runs until 9. Then P1 finishes.

```text
Gantt:  P1 [0-1]  P2 [1-2]  P3 [2-3]  P2 [3-5]  P4 [5-9]  P1 [9-14]
```

| Process | C | R | W |
|---|---|---|---|
| P1 | 14 | 14 | 8 |
| P2 | 5 | 4 | 1 |
| P3 | 3 | 1 | 0 |
| P4 | 9 | 6 | 2 |

Average waiting time = 11 / 4 = **2.75**. Average response time = 25 / 4 = **6.25**. Context switches: 5. It has the best average here, but it is not realistic for the same reason as SJF.

### 3.4 Priorities (non-preemptive and preemptive)

Each process has a priority and the CPU goes to the ready process with the **highest priority** (lowest number). If two have the same priority, FIFO decides.

**Non-preemptive.** P1 starts at 0 (it is alone) and runs to 6. At 6 the priorities are P2 = 1, P4 = 2, P3 = 3, so the order is P2, P4, P3.

```text
Gantt:  P1 [0-6]  P2 [6-9]  P4 [9-13]  P3 [13-14]
```

Waiting times: P1 = 0, P2 = 5, P3 = 11, P4 = 6. Average **5.50**. Response times: 6, 8, 12, 10; average **9.00**.

**Preemptive.** At t = 1 P2 (priority 1) arrives and takes the CPU from P1. Nobody can beat priority 1, so P2 runs to 4. At 4 the ready processes are P1 (4), P3 (3) and P4 (2): P4 runs to 8; then P3 (priority 3) runs to 9, and P1 ends at 14.

```text
Gantt:  P1 [0-1]  P2 [1-4]  P4 [4-8]  P3 [8-9]  P1 [9-14]
```

Waiting times: P1 = 8, P2 = 0, P3 = 6, P4 = 1. Average **3.75**. Response times: 14, 3, 7, 5; average **7.25**.

### 3.5 Round Robin (RR)

Round Robin gives each process a short slice of CPU time, the **quantum** (q), in the order of the ready queue (FIFO). When the quantum ends and the process is not finished, it goes to the **end of the queue**. If it finishes before the quantum ends, the next process starts immediately. It is preemptive and it is the base of time-sharing systems.

:::note[A convention you must know]
What if a new process arrives at the same moment as a quantum ends? There are two possible orders. In this course (and in the lab) **the new process enters the queue first, then the process that was preempted**. If an exercise does not say otherwise, use this rule.
:::

Example with q = 2. The state of the queue is shown after each decision:

| Time | Runs | Queue after (front on the left) | Note |
|---|---|---|---|
| 0–2 | P1 (6 → 4) | P2, P3, P1 | P2 arrived at 1; P3 arrives at 2 and enters **before** P1 |
| 2–4 | P2 (3 → 1) | P3, P1, P4, P2 | P4 arrived at 3 |
| 4–5 | P3 (1 → 0) | P1, P4, P2 | P3 ends before the quantum is over |
| 5–7 | P1 (4 → 2) | P4, P2, P1 | |
| 7–9 | P4 (4 → 2) | P2, P1, P4 | |
| 9–10 | P2 (1 → 0) | P1, P4 | |
| 10–12 | P1 (2 → 0) | P4 | |
| 12–14 | P4 (2 → 0) | empty | |

```text
Gantt:  P1 [0-2]  P2 [2-4]  P3 [4-5]  P1 [5-7]  P4 [7-9]  P2 [9-10]  P1 [10-12]  P4 [12-14]
```

Completion times: P1 = 12, P2 = 10, P3 = 5, P4 = 14. Waiting times: P1 = 6, P2 = 6, P3 = 2, P4 = 7. Average waiting time = 21 / 4 = **5.25**. Response times: 12, 9, 3, 11; average **8.75**. Context switches: 7.

**The quantum matters.** If q is huge, RR behaves like FIFO. If q is tiny, the CPU spends more time switching than working. A typical real quantum is some milliseconds. Try the quantum slider in the tab **Algorithm shoot-out**.

### 3.6 Comparison

| Algorithm | Preemptive | Avg. waiting | Avg. response | Context switches | Main problem |
|---|---|---|---|---|---|
| FIFO | No | 4.75 | 8.25 | 3 | Convoy effect |
| SJF | No | 4.25 | 7.75 | 3 | Needs the burst; starvation |
| SRTF | Yes | 2.75 | 6.25 | 5 | Needs the burst; starvation |
| Priorities (non-preemptive) | No | 5.50 | 9.00 | 3 | Starvation |
| Priorities (preemptive) | Yes | 3.75 | 7.25 | 4 | Starvation |
| Round Robin (q = 2) | Yes | 5.25 | 8.75 | 7 | Many context switches |

No algorithm is the best for everything. Averages hide the fact that RR is fairer: nobody waits long without running.

## 4. What real systems do

Windows and Linux use **multilevel queues with feedback**, a mix of priorities and Round Robin:

- There is a queue for each priority level. The scheduler always runs a process from the highest non-empty queue.
- Inside one level, the processes share the CPU in Round Robin.
- The system **changes the priority** of processes while they run: a process that uses its whole quantum is treated as CPU-hungry and can lose priority, and a process that waits for the keyboard or the disk is rewarded. This keeps the windows you use responsive.

Windows has 32 priority levels and always runs the highest ready thread. Linux uses a *fair* scheduler that shares CPU time among tasks according to their nice value. In fact modern systems schedule **threads**, which are the parts of a process that can run separately, but the ideas are the same.

### Starvation and aging

In priority and SJF algorithms a process can wait **forever** if more important or shorter processes keep arriving. This is **starvation**. The solution is **aging**: the longer a process waits, the more its priority grows, until it gets the CPU. The tab **Algorithm shoot-out** of the lab has a demonstration with and without aging.

## 5. Sharing resources: critical sections

Processes that work alone are *independent*. Processes that share something, such as a file, a printer or a variable in shared memory, are *cooperating*, and this can cause errors.

Imagine two processes that print a report on the same printer without any control. The scheduler can switch between them after every line, and the paper would have lines of both reports mixed. In the same way, if two processes add 1 to the same variable, they can read the same old value and one update is lost. This error is a **race condition**: the result depends on the exact order in which the scheduler runs the processes.

The part of a program that uses a shared resource is its **critical section**. The solution is **mutual exclusion**: only one process can be in its critical section at a time. The OS offers tools such as **locks (mutex)** and **semaphores**:

1. A process asks for the lock before entering the critical section.
2. If the lock is taken, the process goes to the **Waiting** state.
3. When the owner finishes, it releases the lock and the waiting process goes to **Ready**.

The first part of the tab **Critical section & deadlock** lets you see the mixed pages with and without the lock.

## 6. Deadlock

A lock solves one problem and can create another. In a **deadlock**, two or more processes wait for each other forever:

- P1 holds the printer and asks for the scanner.
- P2 holds the scanner and asks for the printer.

Neither can continue and neither releases what it has. For a deadlock to happen, **four conditions** must be true at the same time:

| Condition | Meaning in the example |
|---|---|
| Mutual exclusion | A resource can be used by only one process at a time |
| Hold and wait | A process keeps what it has while it waits for more |
| No preemption | You cannot take a resource away from its owner |
| Circular wait | P1 waits for P2 and P2 waits for P1 |

If you break one condition, deadlock cannot happen. The easiest way is to make all processes ask for resources **in the same order** (first the printer, then the scanner): there is no circle. Other options: ask for all resources at once, allow the OS to take a resource away, or detect the deadlock and end one of the processes. Many desktop systems simply do nothing and rely on the user to close the frozen program.

In the lab you can create a deadlock step by step and then break it.

## Comprueba lo aprendido

1. Three processes arrive at t = 0 with bursts 8, 2 and 4 (in this order of arrival). Calculate the average waiting time with FIFO and with SJF.

   <details>
   <summary>Answer</summary>

   FIFO: the order is 8, 2, 4. Waiting times are 0, 8 and 10, so the average is 18 / 3 = **6**. SJF: the order is 2, 4, 8. Waiting times are 0, 2 and 6, so the average is 8 / 3 = **2.67**.

   </details>

2. Why is SRTF "better" in the averages but not used in real systems?

   <details>
   <summary>Answer</summary>

   It needs to know the remaining time of every process in advance, which the OS cannot know; it only has estimates. It also makes long processes starve if short ones keep arriving, and it causes more context switches.

   </details>

3. In Round Robin with q = 3, a process with a burst of 2 runs. How long does it keep the CPU?

   <details>
   <summary>Answer</summary>

   Only 2 time units. If a process ends before the quantum is over, it releases the CPU at once and the next process in the queue starts.

   </details>

4. A process of priority 5 has been waiting for two minutes because processes of priority 1 keep arriving. What is this problem called and how is it solved?

   <details>
   <summary>Answer</summary>

   It is **starvation**. It is solved with **aging**: raising the priority of a process as its waiting time grows.

   </details>

5. Which of the four conditions of deadlock do you break if all processes request resources in the same order?

   <details>
   <summary>Answer</summary>

   The **circular wait**. With a fixed order, a cycle of processes waiting for each other cannot appear.

   </details>

## Glossary

| English | Castellano |
|---|---|
| scheduler | planificador |
| dispatcher | despachador |
| ready queue | cola de listos |
| preemptive / non-preemptive | expulsivo / no expulsivo |
| arrival time | tiempo de llegada |
| burst time / execution time | tiempo de ráfaga / de ejecución |
| completion time | tiempo de finalización |
| response time (turnaround) | tiempo de respuesta (retorno) |
| waiting time | tiempo de espera |
| Gantt chart | diagrama de Gantt |
| quantum / time slice | quantum / porción de tiempo |
| starvation | inanición |
| aging | envejecimiento |
| race condition | condición de carrera |
| critical section | sección crítica |
| mutual exclusion | exclusión mutua |
| lock (mutex) / semaphore | cerrojo (mutex) / semáforo |
| deadlock | interbloqueo (abrazo mortal) |

:::note[Credits]
This page adapts the SOM course notes by Moisés Mas Rocamora, Daniel Álvarez Santamaría and Jana Taboada León, licensed under CC BY-NC-SA 4.0. This page is shared under the same licence.
:::
