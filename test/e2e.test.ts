import { afterEach, beforeEach, expect, test } from "vitest";
import puppeteer, { Browser } from "puppeteer";
import axios from "axios";
import IServerFakeTime from "@/types/i-server-fake-time";
import InternalRelativeApi from "@/types/e-internal-relative-api";

// --- make sure the app is running on http://localhost:3000 via npm run dev and open browser

let browser: Browser;

beforeEach(async () => {
  browser = await puppeteer.launch({ headless: "new" });
});

afterEach(async () => {
  await browser.close();
});

test('sale day is true for wednedsay', async () => {
  const page = await browser.newPage();
  // --- force sale day wedenesday 1702458733000 --> 13/12/23
  const body: IServerFakeTime = {
    serverFakeTimeMs: 1702458733000,
  };
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}${InternalRelativeApi.E2eFakeServerTime}`;
  await axios.post(url, { ...body });
  await page.goto(baseUrl);
  await page.click(".get-info");
  const val: string = await page.$eval(
    ".sale-day",
    (elem) => (elem as HTMLParagraphElement).innerText
  );
  expect(val).toBe("true");
});

test('sale day is false for non wednedsay', async () => {
    const page = await browser.newPage();
    // --- force sale day wedenesday 1702549920000 --> 14/12/23
    const body: IServerFakeTime = {
      serverFakeTimeMs: 1702549920000,
    };
    const baseUrl = "http://localhost:3000";
    const url = `${baseUrl}${InternalRelativeApi.E2eFakeServerTime}`;
    await axios.post(url, { ...body });
    await page.goto(baseUrl);
    await page.click(".get-info");
    const val: string = await page.$eval(
      ".sale-day",
      (elem) => (elem as HTMLParagraphElement).innerText
    );
    expect(val).toBe("false");
  });

