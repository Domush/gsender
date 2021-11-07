# ![cncjs4marlin logo](https://github.com/Sienci-Labs/sender/blob/master/src/app/images/icon-git.png?raw=true)cncjs4marlin: connect to and control [Marlin](https://github.com/Marlin/Marlin)-based CNCs

cncjs4marlin is a feature-packed CNC interface software designed to be clean and easy to learn while retaining a depth of capabilities for advanced users. Its development was begun out of a passion for hobby CNC machines: an interface rebuilt to suit the needs of the at-home CNC user.
* Accepts standard, Marlin-compliant g-code and has been verified to work with many of the common CAM programs
* Began development to bring new concepts to the existing landscape of Marlin senders in an effort to advance functionality and ease-of-use
* Javascript-based CNC interface software which leverages [Electron](https://www.electronjs.org/) for cross platform use
* Is a branch off of the popular [CNCjs CNC controller interface](https://github.com/cncjs/cncjs)

Some things that we’re looking to accomplish with this sender:
* Reliability of operation
* Accommodates all ranges of computing systems (low-end PC to RasPi | ‘light mode’)
* Clean and easy to use no matter your previous CNC experience
* Makes available all normally expected functions
* Addresses common error throwing conditions automatically
* Built-in gadgets for surface probing, stock flattening, firmware editing, and g-code editing with syntax highlighting, command navigation, and more
* 3D cutting visualization

[Check out the latest releases here.](https://github.com/Domush/cncjs4marlin/releases/)


## 📦 Current Features

* [Marlin] controllers supported
* Smart machine connection
* 3-axis digital readout (DRO) with manual value entry
* All-directional jogging with XY diagonals, jog presets, and incremental/continuous single-button handling
* Zero-setting and gotos (independent and combined)
* Probing in any direction plus safe continuity detection ensures no broken cutting tools
* Full imperial/metric compatibility
* Responsive screen design and workspace customizations including visualizer light and dark theme
* 3D toolpath visualization (no machine connection required)
* File insight on load (feed range, spindle range, tools used, estimated cutting time, and overall, max, and min dimensions)
* Feed override and active job status indicators
* Fully exposed keyboard shortcuts for external keyboard/keypad control
* Joystick support built-in for a variety of controllers
* Safe height movements - accommodates machines with or without endstops
* Homing cycle and quick-movement locations available for machines with homing hardware
* Full spindle/laser support via manual control widgets, active alerting, and live overrides
* Full mist/flood coolant support via manual control widgets and active alerting
* Macros buttons (rearrangeable) with enhanced macro variables and individually assignable keyboard shortcuts
* Lightweight mode reduces processing intensity on less powerful hardware or when running larger files
* Easy workspace swapping for more advanced jigging or alignment work
* Optional automatic handling for common error throwing g-code
* Firmware tool for easier GRBL EEPROM changes, loading defaults, and GRBL flashing
* Surfacing tool auto-generates surfacing g-code based on machine cutting area and other preferences, ready to execute
* Calibration tool for axis alignment - a step by step process to make sure your CNC is square
* Movement tuning tool for calibrating motor axis movements
* Tool change functionality - pause, ignore, or run code blocks on M6 commands
* Start-from-line functionality to resume jobs part-way through in case of failure of abort
* Outline functionality indicates the rough bounds of the job before cutting
* Customizable g-code injection at job start & end
* Tooltips for data entry points
* Alarm warning explanations to better contextualize CNC errors
* Sleep management to keep PC awake during g-code sending
* Pre-built machine profiles, including:
    - LongMill
    - Shapeoko
    - X-carve
    - OpenBuilds CNCs
    - 3018 CNC & PROVer
    - BobsCNC CNCs
    - CNC4Newbie CNCs
    - Mill Right CNCs
    - Ooznest WorkBee
    - Nomad
    - Carvey
    - Mill One, and more...
