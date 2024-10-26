import fetch from 'node-fetch';
import fs from 'fs';
const { Item, Shop } = await import('./gilded_rose.cjs');

// Extract command-line arguments
const updateCount = parseInt(process.argv[2], 10);
const initialRequestCount = parseInt(process.argv[3], 10);

// Function to make a single API request
async function makeApiRequest() {
  const response = await fetch('https://yesno.wtf/api');
  const data = await response.json();
  return data.answer === 'yes';
}

// Function to make multiple API requests in parallel
async function makeMultipleRequests(count) {
  const requests = Array.from({ length: count }, makeApiRequest);
  const results = await Promise.all(requests);
  return results.filter(Boolean).length; // Count positive responses
}

// Function to log positive responses
function logPositiveResponses(count) {
  fs.appendFileSync('log.txt', `Positive responses: ${count}\n`);
}

// Function to update shop items based on API results
async function runUpdates(shop, updateCount, requestCount) {
  for (let i = 0; i < updateCount; i++) {
    console.log(`\nStarting update cycle ${i + 1}`);

    // Make initial API requests
    let positiveResponses = await makeMultipleRequests(requestCount);
    logPositiveResponses(positiveResponses);

    // Continue requesting until no positive responses are left
    while (positiveResponses > 0) {
      positiveResponses = await makeMultipleRequests(positiveResponses);
      logPositiveResponses(positiveResponses);
    }

    // Update the shop items once no positive responses remain
    shop.updateQuality();
    console.log("Updated shop items:", shop.items);
  }
}

// Initialize shop with some sample items
const items = [
  new Item("Aged Brie", 10, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30),
  new Item("Conjured Mana Cake", 3, 6),
];
const shop = new Shop(items);

// Run the update function
runUpdates(shop, updateCount, initialRequestCount);
