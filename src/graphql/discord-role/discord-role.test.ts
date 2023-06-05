/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe, expect, test } from "vitest";

describe("discord-role resolver", () => {
  test("roles", async() => {
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        query: `
          query Channels {
            channels {
              category
              channelId
            }
          }
        `
      })
    });

    const json = await response.json();

    expect(typeof json.data.channels[0].category === "string").toBeTruthy();
    expect(typeof json.data.channels[0].channelId === "string").toBeTruthy();
  });
});