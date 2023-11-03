# Vultr Compute Server Removal Script

This Node.js script automates the process of stopping and destroying all compute servers on your Vultr account.

## Warning

**Use this script with caution.** Stopping and destroying servers is an irreversible action that will result in data loss. Ensure you have backups of any important data before running this script.

## Prerequisites

- Node.js installed on your system.
- Axios installed in your project (can be installed via npm with `npm install axios`).
- Dotenv installed in your project (can be installed via npm with `npm install dotenv`).
- Your Vultr API key.

## Setup

1. Clone or download this repository to your local machine.
2. Navigate to the directory where the script is located.
3. Install the required Node.js packages using npm:

   ```sh
   npm install
