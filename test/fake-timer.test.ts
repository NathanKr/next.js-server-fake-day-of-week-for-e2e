import { test, expect, vi } from "vitest";
import * as utils from "@/utils/utils";

import sinon from "sinon";
import handler from "@/pages/api/e2e-fake-server-time";
import { NextApiRequest, NextApiResponse } from "next";

test("should use fake timers for non-production and localhost", async () => {
  vi.spyOn(utils, "isProduction").mockReturnValue(false);

  // Create a fake request with a POST method
  const fakeRequest = {
    method: "POST",
    headers: {
      host: "localhost:3000", // Adjust the host as needed
    },
    body: {
      serverFakeTimeMs: 1234567890, // Adjust the fake time as needed
    },
  };

  // Create a fake response
  const fakeResponse = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };

  // Spy on sinon.useFakeTimers
  const useFakeTimersSpy = vi.spyOn(sinon, "useFakeTimers");

  // Call the handler function with the fake request and response
  await handler(
    fakeRequest as unknown as NextApiRequest,
    fakeResponse as unknown as NextApiResponse
  );

  // Assert that sinon.useFakeTimers was called
  expect(useFakeTimersSpy).toHaveBeenCalled();
});

test("should not use fake timers for production", async () => {
  vi.spyOn(utils, "isProduction").mockReturnValue(true);

  // Create a fake request with a POST method
  const fakeRequest = {
    method: "POST",
    headers: {
      host: "https://nathankrasney.com/", // Adjust the host as needed
    },
    body: {
      serverFakeTimeMs: 1234567890, // Adjust the fake time as needed
    },
  };

  // Create a fake response
  const fakeResponse = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };

  // Spy on sinon.useFakeTimers
  const useFakeTimersSpy = vi.spyOn(sinon, "useFakeTimers");

  // Call the handler function with the fake request and response
  await handler(
    fakeRequest as unknown as NextApiRequest,
    fakeResponse as unknown as NextApiResponse
  );

  // Assert that sinon.useFakeTimers was not called
  expect(useFakeTimersSpy).not.toHaveBeenCalled();
});


test("should not use fake timers for non localhost", async () => {
  vi.spyOn(utils, "isProduction").mockReturnValue(false);

  // Create a fake request with a POST method
  const fakeRequest = {
    method: "POST",
    headers: {
      host: "https://nathankrasney.com/", // Adjust the host as needed
    },
    body: {
      serverFakeTimeMs: 1234567890, // Adjust the fake time as needed
    },
  };

  // Create a fake response
  const fakeResponse = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };

  // Spy on sinon.useFakeTimers
  const useFakeTimersSpy = vi.spyOn(sinon, "useFakeTimers");

  // Call the handler function with the fake request and response
  await handler(
    fakeRequest as unknown as NextApiRequest,
    fakeResponse as unknown as NextApiResponse
  );

  // Assert that sinon.useFakeTimers was not called
  expect(useFakeTimersSpy).not.toHaveBeenCalled();
});
