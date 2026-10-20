import { describe, expect, it } from "vitest";
import { websiteTypes } from "./website-types";

describe("website type guide", () => {
  it("offers 15 distinct options with six visible first", () => {
    expect(websiteTypes).toHaveLength(15);
    expect(new Set(websiteTypes.map((item) => item.id)).size).toBe(15);
    expect(new Set(websiteTypes.map((item) => item.name)).size).toBe(15);
    expect(
      websiteTypes.filter((item) => item.featured).map((item) => item.id),
    ).toEqual([
      "digital-card",
      "business-site",
      "product-catalog",
      "online-store",
      "bookings",
      "estimator",
    ]);
  });
});
