export const calculateDaysUntilImplementation = (endDate: string) =>
  Math.round((new Date(endDate).getTime() - new Date().getTime()) / 86400000);

export const calculateTotalDays = (endDate: string, startDate: string) =>
  Math.round(new Date(endDate).getTime() - new Date(startDate).getTime()) /
  86400000;
