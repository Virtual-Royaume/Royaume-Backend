import { Dayjs } from "dayjs";
import DayJS from "$core/utils/DayJS";

export function getDateWithoutTime(date: Dayjs = DayJS().tz()): Dayjs {
    return date.startOf("day");
}