# Responsive Testing with Puppeteer

## Overview

This repository contains a Puppeteer script designed for testing the responsiveness of a website across various devices. The script captures full-page screenshots for different devices and saves them in a dedicated `results` folder.

## Prerequisites

Before running the tests, ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (which includes npm)

## Installation

1. **Clone this repository:**

   ```
   git clone https://github.com/raksmala/puppeteer-responsive
   ```

2. **Navigate to the project folder:**

   ```
   cd puppeteer-responsive
   ```

3. **Install dependencies:**

   ```
   npm install
   ```

## Usage

Run the responsive testing script with the following command:

```
npm start
```

This will launch Puppeteer, navigate to the specified URL, and capture screenshots for various devices. The screenshots will be saved in the `results` folder.

## Configuration

Adjust the devices and other settings in the Puppeteer script (`index.js`) according to your testing requirements.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
