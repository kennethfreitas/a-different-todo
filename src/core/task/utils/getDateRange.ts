export function getDateRange(origin: Date, upcomingDays: number): [Date, Date] {
  const start = new Date(origin);
  start.setHours(0, 0, 0, 0);

  const end = new Date(origin);

  if (upcomingDays < 0) {
    start.setHours(23, 59, 59, 999);
    end.setDate(start.getDate() - Math.abs(upcomingDays));
    end.setHours(0, 0, 0, 0);
    return [end, start];
  }

  end.setDate(end.getDate() + upcomingDays);
  end.setHours(23, 59, 59, 999);

  return [start, end];
}
