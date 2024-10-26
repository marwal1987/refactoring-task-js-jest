/*
Be careful this code will enrage the goblin and make it go berserk.
The class Shop is changed!

Explanation
- Item Subclasses: Each subclass (AgedBrie, Sulfuras, BackstagePass, Conjured) overrides updateQuality to implement the unique logic for that item type.

- Factory Function (createItem): The factory checks the item name and returns an instance of the appropriate subclass, ensuring the correct behavior for each item type.

- Shop Class: Shop no longer needs to contain any item-specific logic. It simply calls updateQuality on each item, and the items handle their own behavior.

Advantages of This Refactoring
- Easier to Maintain and Extend: Adding a new item type only requires creating a new subclass and updating the factory function.

- Readability: The behavior for each item type is encapsulated in its respective class, making the code more modular and easier to understand.

- Testability: Each item subclass can be tested independently, which is especially helpful for ensuring unique behaviors.

Usage Example
With the factory pattern in place, creating and updating items looks the same as before (see: gildedRoseApp.mjs)
*/

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  // Base updateQuality method for normal items
  updateQuality() {
    this.sellIn -= 1;
    this.decreaseQuality();

    // Degrade quality twice as fast if past sell date
    if (this.sellIn < 0) this.decreaseQuality();
  }

  increaseQuality() {
    if (this.quality < MAX_QUALITY) this.quality += 1;
  }

  decreaseQuality(amount = 1) {
    this.quality = Math.max(0, this.quality - amount);
  }
}

class AgedBrie extends Item {
  updateQuality() {
    this.sellIn -= 1;
    this.increaseQuality();
    if (this.sellIn < 0) this.increaseQuality();
  }
}

class Sulfuras extends Item {
  // Sulfuras does not decrease in sellIn or quality, so updateQuality is empty
  updateQuality() {}
}

class BackstagePass extends Item {
  updateQuality() {
    this.sellIn -= 1;
    if (this.sellIn < 0) {
      this.quality = 0;
    } else {
      this.increaseQuality();
      if (this.sellIn < 10) this.increaseQuality();
      if (this.sellIn < 5) this.increaseQuality();
    }
  }
}

class Conjured extends Item {
  updateQuality() {
    this.sellIn -= 1;
    this.decreaseQuality(2); // Degrade twice as fast
    if (this.sellIn < 0) this.decreaseQuality(2);
  }
}

const MAX_QUALITY = 50;

function createItem(name, sellIn, quality) {
  switch (name) {
    case "Aged Brie":
      return new AgedBrie(name, sellIn, quality);
    case "Sulfuras, Hand of Ragnaros":
      return new Sulfuras(name, sellIn, quality);
    case "Backstage passes to a TAFKAL80ETC concert":
      return new BackstagePass(name, sellIn, quality);
    case "Conjured":
      return new Conjured(name, sellIn, quality);
    default:
      return new Item(name, sellIn, quality);
  }
}

class Shop {
  constructor(items = []) {
    this.items = items.map(item => createItem(item.name, item.sellIn, item.quality));
  }

  updateQuality() {
    this.items.forEach(item => item.updateQuality());
    return this.items;
  }
}

module.exports = { Item, Shop, createItem }; // Export the factory function for testing
