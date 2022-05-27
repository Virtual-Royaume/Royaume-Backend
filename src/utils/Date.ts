export function getDateWithoutTime(date: Date = new Date()): Date {
    return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}Z`);
}