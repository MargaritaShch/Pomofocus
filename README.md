# Pomofocus

## Overview:

Pomofocus is a productivity application that helps users focus on tasks using the "Pomodoro" time management technique. The main idea of this technique is to alternate short breaks with focused work intervals.
- **Pomodoro Timer**: Set a timer for 25 minutes of work, followed by a 5-minute break. After four such cycles, a longer break is recommended.
- **Task List**: Add, delete, and mark tasks as completed.

## Stack:
- **JavaScript + Modules**
- **SCSS**
- **HTML**

## Implementation of the Observer Pattern:

The Pomofocus application uses the Observer pattern to manage interactions between application components such as the timer, task list, and statistics module. This allows them to dynamically respond to each other's state changes without the need for tight coupling between components.

### How It Works:

- **Pomodoro Timer** acts as the publisher, notifying subscribers of the start of work, breaks, and the end of cycles.

## Features Implemented:

- **Dynamic Interface Update**: The interface automatically updates in response to changes in the timer and task list, thanks to the use of the Observer pattern.
- **Task Persistence**: Tasks are saved in `localStorage`, allowing users to return to their task list even after reloading the page.
- **Task Management**: Users can add new tasks, delete them, mark them as completed, and see the number of successfully completed pomodoros for each task.
- **Timer Customization**: Work time, short break, and long break durations can be customized via the `CONFIG` object.
- **Theme Switching**: Users can switch between work, short break, and long break modes, with visual indications of the current timer state.
- **Progress Bar**: Visualize the progress of the current pomodoro or break with a progress bar.

## Project Structure:

The project consists of several modules:
- `Timer.js`: Responsible for the timer logic.
- `UI.js`: Manages the entire user interface, including displaying the timer, task list, and handling user input events.
- `Tasks.js`: Manages the creation, storage, and updating of tasks.
- `state.js`: Stores the application's state, including the selected theme and current timer mode.
- `config.js`: Contains timer settings for different modes (work, short break, long break).
- `createTask.js`: Function for creating task HTML markup.
