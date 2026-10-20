import { describe, expect, it } from "vitest";
import { readDemoFromUrl } from "./demo-link";

describe("enlaces directos a demos", () => {
  it("acepta solo identificadores publicados", () => {
    expect(readDemoFromUrl("?demo=appointments")).toBe("appointments");
    expect(readDemoFromUrl("?demo=messages")).toBe("messages");
    expect(readDemoFromUrl("?demo=quotes")).toBe("quotes");
    expect(readDemoFromUrl("?demo=campaign")).toBe("campaign");
    expect(readDemoFromUrl("?demo=unknown")).toBeNull();
  });
});
