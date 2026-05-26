/** Delete registrants is only allowed during local development */
export function isLocalDeleteEnabled(): boolean {
  return process.env.NODE_ENV === "development";
}
