const { Shop, Item } = require("../src/gilded_rose_alternative");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("fixme", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("fixme");
  });
});

// Helper function to create a new Shop instance and update quality
function updateAndRetrieve(item) {
  const shop = new Shop([item]);
  shop.updateQuality();
  return shop.items[0];
}

describe("Shop updateQuality method", () => {
  test("Normal items degrade in quality by 1 and sellIn by 1", () => {
    const item = new Item("Normal Item", 10, 20);
    const updatedItem = updateAndRetrieve(item);
    expect(updatedItem.sellIn).toBe(9);
    expect(updatedItem.quality).toBe(19);
  });

  test("Normal items degrade in quality twice as fast after sell date", () => {
    const item = new Item("Normal Item", 0, 10);
    const updatedItem = updateAndRetrieve(item);
    expect(updatedItem.sellIn).toBe(-1);
    expect(updatedItem.quality).toBe(8);
  });

  test("Aged Brie increases in quality as it ages", () => {
    const item = new Item("Aged Brie", 10, 20);
    const updatedItem = updateAndRetrieve(item);
    expect(updatedItem.quality).toBe(21);
    expect(updatedItem.sellIn).toBe(9);
  });

  test("Aged Brie quality is capped at 50", () => {
    const item = new Item("Aged Brie", 10, 50);
    const updatedItem = updateAndRetrieve(item);
    expect(updatedItem.quality).toBe(50);
  });

  test("Sulfuras never changes quality or sellIn", () => {
    const item = new Item("Sulfuras, Hand of Ragnaros", 10, 80);
    const updatedItem = updateAndRetrieve(item);
    expect(updatedItem.quality).toBe(80);
    expect(updatedItem.sellIn).toBe(10);
  });

  test("Backstage passes increase in quality as sellIn date approaches", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20);
    const updatedItem = updateAndRetrieve(item);
    expect(updatedItem.quality).toBe(21);
  });

  test("Backstage passes quality increases by 2 when sellIn <= 10", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20);
    const updatedItem = updateAndRetrieve(item);
    expect(updatedItem.quality).toBe(22);
  });

  test("Backstage passes quality increases by 3 when sellIn <= 5", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20);
    const updatedItem = updateAndRetrieve(item);
    expect(updatedItem.quality).toBe(23);
  });

  test("Backstage passes quality drops to 0 after concert date", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20);
    const updatedItem = updateAndRetrieve(item);
    expect(updatedItem.quality).toBe(0);
  });

  test("Quality is never negative", () => {
    const item = new Item("Normal Item", 10, 0);
    const updatedItem = updateAndRetrieve(item);
    expect(updatedItem.quality).toBe(0);
  });
});
