import { describe, expect, it } from "vitest";
import { getCampaignConcept } from "./campaign";

describe("conceptos de campaña", () => {
  it("cambia la invitación y la medida cuando cambia el objetivo", () => {
    const messages = getCampaignConcept("messages", "post");
    const awareness = getCampaignConcept("awareness", "post");

    expect(messages.callToAction).toBe("Escríbenos");
    expect(messages.measure).toContain("Conversaciones iniciadas");
    expect(awareness.callToAction).toBe("Conócenos");
    expect(awareness.measure).toContain("Alcance local");
  });
});
