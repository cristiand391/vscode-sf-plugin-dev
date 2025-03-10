# VSCode extension for Salesforce CLI plugin development.

A small vscode extension to help when working on `sf` CLI plugins.
This was done for my team's dev-choice week and will continue as a side project for now.

## Features

### LSP integration (hover/goto def) for sfdx-core's messages framework

https://github.com/user-attachments/assets/7b7a5965-52ec-4770-8ecf-a3f10685af1a

### Open `oclif` command

https://github.com/user-attachments/assets/023adf92-7500-4a6f-a585-ccd7984054ef

### Copy ID of active command

https://github.com/user-attachments/assets/4e3de8a3-d0db-40cf-bcf1-72d2595a6b9d


## Install
Download the latest vsix from GH releases and install it in vscode via the `Extensions: Install from VSIX` command.

## Usage
Open a CLI plugin project and try running `oclif: Open a Command` or `oclif: Copy ID of Active Command` commands from the commmand palette.
I would suggest asigning them to keybinds for better usage (specially opening a command, it's a very common task in CLI development).
