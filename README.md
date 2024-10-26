# Gilded Rose in Javascript with Jest

## About This Project

This project is an implementation of the Gilded Rose kata in JavaScript using Jest for unit testing.

**Note**: This has been an experiment to see how well ChatGPT could handle complicated instructions and additional requirements in refactoring and improving code. As well as building the backend to let the user handle updates in the shop via commandline.

## 📜 Acknowledgments

Original Gilded Rose Refactoring Challenges can be found via the following link:
[GildedRose Refactoring Kata](https://github.com/emilybache/GildedRose-Refactoring-Kata)

### 🚀 Getting started

Install dependencies

```sh
npm install
```

### 🧪 Run unit tests

To run all tests

```sh
npm test
```

To run all tests in watch mode

```sh
npm run test:watch
```

To generate test coverage report

```sh
npm run test:coverage
```

### 🛠️ Run the Node application

The Node application `src/gildedRoseApp.mjs` simulates daily updates to the Gilded Rose inventory. For each update cycle, it:

1. **Makes API Requests:** Calls an external API [yesno.wtf/api](https://yesno.wtf/api) a specified number of times (based on command-line input).

- It checks each response for positive results ("yes" responses).
- If there are positive responses, it logs the count to log.txt.
- It continues making requests in batches based on the previous positive count until there are no more positive responses.

2. **Updates Inventory:** Once the API requests yield no positive responses, it updates each item’s `SellIn` and Quality values according to the Gilded Rose requirements. This includes:

- Reducing `sellIn` daily for all items except “`Sulfuras`”
- Adjusting quality based on each item’s type (e.g., “`Aged Brie`” increases in quality, “`Conjured`” items degrade faster, etc.).

**Usage:**

`node src/gildedRoseApp.mjs <updateCycles> <initialRequests>`

- `<updateCycles>` - The number of times to repeat the entire update sequence.
- `<initialRequests>` - The initial number of API requests to make at the beginning of each cycle.

**Example:**

```sh
node src/gildedRoseApp.mjs 10 5
```
