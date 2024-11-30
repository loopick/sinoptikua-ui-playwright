import { weekdays, months } from "../../fixtures/dateFixtures";
import { TAssertionData } from "../types/dateTypes";

export default class DateHelpers {
  getDaysArray(numDaysFromNow: number): TAssertionData {
    const daysArray: TAssertionData = [];

    for (let i = 0; i < numDaysFromNow; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);

      const day = weekdays[currentDate.getDay()];
      const date = currentDate.getDate().toString().padStart(2, "0");
      const monthIndex = currentDate.getMonth();
      const month = months[monthIndex];

      daysArray.push({
        day,
        date,
        month,
      });
    }

    return daysArray;
  }
}
