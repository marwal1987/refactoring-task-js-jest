class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  // Main function to update quality of all items in the shop
  updateQuality() {
    this.items.forEach((item) => {
      // Guard clause for Sulfuras: no updates
      if (item.name === "Sulfuras, Hand of Ragnaros") return;

      // Specific update logic based on item name
      switch (item.name) {
        case "Aged Brie":
          this.updateAgedBrie(item);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          this.updateBackstagePass(item);
          break;
        case "Conjured":
          this.updateConjured(item);
          break;
        default:
          this.updateNormalItem(item);
      }

      // Reduce sellIn for all items except Sulfuras
      item.sellIn -= 1;

      // Handle additional quality changes if sellIn has expired
      this.handleExpiration(item);
    });

    return this.items;
  }
  // Additional quality adjustments if item has expired
  handleExpiration(item) {
    if (item.sellIn >= 0) return;

    switch (item.name) {
      case "Aged Brie":
        this.increaseQuality(item);
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        item.quality = 0;
        break;
      case "Conjured":
        this.decreaseQuality(item, 2);
        break;
      default:
        this.decreaseQuality(item);
        break;
    }
  }

  /* ---  Quality adjustment methods --- */

  // Increase quality of an item, capped at 50
  increaseQuality(item) {
    if (item.quality < 50) item.quality += 1;
  }

  // Decrease quality of an item, ensuring it doesn't fall below 0
  decreaseQuality(item, amount = 1) {
    item.quality = Math.max(0, item.quality - amount);
  }

  // Update methods for specific items
  updateAgedBrie(item) {
    this.increaseQuality(item);
  }

  updateBackstagePass(item) {
    this.increaseQuality(item);
    if (item.sellIn <= 10) this.increaseQuality(item);
    if (item.sellIn <= 5) this.increaseQuality(item);
  }

  updateConjured(item) {
    this.decreaseQuality(item, 2);
  }

  updateNormalItem(item) {
    this.decreaseQuality(item);
  }
}

module.exports = {
  Item,
  Shop,
};
