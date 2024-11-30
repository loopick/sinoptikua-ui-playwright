import { expect } from "playwright/test";
import test from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import DateHelpers from "../utils/helpers/dateHelpers";
import { TAssertionData } from "../utils/types/dateTypes";

test.describe("Tests for Sinoptik UA", () => {
  let home: HomePage;
  const testData = {
    city: "Київ",
    cityFull: "Київ, Столиця України",
    url: "https://ua.sinoptik.ua/",
    days: [] as TAssertionData,
  };

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    const dateHelpers = new DateHelpers();
    testData.days = await dateHelpers.getDaysArray(10);
  });

  test("01 - Test for Sinoptik UA", async ({ page }) => {
    await test.step("Step 1 - Open main page", async () => {
      await page.goto(testData.url);
    });

    await test.step(`Step 2 - Input ${testData.city} into City field`, async () => {
      await home.cityInput.fill(testData.city);
    });

    await test.step(`Step 3 - Select ${testData.city} option from autocomplete options`, async () => {
      await home.cityOptions.getByText(testData.cityFull).click();
    });

    await test.step("Steps 4,5 - Click one-by-one on 7 Day Tabs", async () => {
      await home.assertTabsData(7, testData.days);
    });

    await test.step(`Step 6 - Click on the '10 Days' Button`, async () => {
      await home.tenDaysButton.click();
      const responseForDaysChange = await page.waitForResponse(
        "https://ua.sinoptik.ua/stats/visit/**",
      );
      expect(responseForDaysChange.status()).toBe(200);
    });

    await test.step(`Step 7 - Click one-by-one on 10 Day Tabs`, async () => {
      await home.assertTabsData(10, testData.days);
    });
  });
});
