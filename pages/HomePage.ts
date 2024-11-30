import { Page } from "playwright";
import { BasePage } from "./BasePage";
import { expect } from "playwright/test";
import { TAssertionData } from "../utils/types/dateTypes";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public cityInput = this.page.locator('input[type="search"]');
  public cityOptions = this.page.locator("menu a");
  public dayTabs = this.page.locator("div main div").first().locator("a");

  public tabDescription = this.page.locator("main > div").nth(1);
  public tenDaysButton = this.page.getByText("10 днів");

  public async getTabDataByIndex(index: number) {
    const tab = await this.dayTabs.nth(index);

    return {
      titleDay: await tab.locator("p").first().innerText(),
      titleDate: await tab.locator("p").nth(1).innerText(),
      titleMonth: await tab.locator("p").nth(2).innerText(),
      descriptionDay: await this.tabDescription.locator("p").nth(0).innerText(),
      descriptionDate: await this.tabDescription
        .locator("p")
        .nth(1)
        .innerText(),
      descriptionMonth: await this.tabDescription
        .locator("p")
        .nth(2)
        .innerText(),
    };
  }

  public async assertTabsData(
    daysAmount: number,
    assertionData: TAssertionData,
  ) {
    const tabsQty = await this.dayTabs.count();
    await expect(tabsQty).toEqual(daysAmount);

    for (let i = daysAmount; i > 0; i--) {
      await this.dayTabs.nth(i - 1).click();
      const actualData = await this.getTabDataByIndex(i - 1);

      await expect(actualData.titleDay.toLowerCase()).toBe(
        assertionData[i - 1].day,
      );
      await expect(actualData.titleMonth.toLowerCase()).toBe(
        assertionData[i - 1].month,
      );
      await expect(actualData.titleDate.toLowerCase()).toBe(
        assertionData[i - 1].date,
      );
      if (i > 1) {
        await expect(actualData.descriptionDay.toLowerCase()).toBe(
          assertionData[i - 1].day,
        );
        await expect(actualData.descriptionMonth.toLowerCase()).toBe(
          assertionData[i - 1].month,
        );
        await expect(actualData.descriptionDate.toLowerCase()).toBe(
          assertionData[i - 1].date,
        );
      }
    }
  }
}
