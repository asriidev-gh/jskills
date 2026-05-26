export function buildRegistrantsFilter(
  searchParams: URLSearchParams
): Record<string, unknown> {
  const filter: Record<string, unknown> = {};

  const name = searchParams.get("name")?.trim();
  const email = searchParams.get("email")?.trim();
  const contact = searchParams.get("contact")?.trim();
  const packageId = searchParams.get("packageId")?.trim();
  const skillLevel = searchParams.get("skillLevel")?.trim();
  const payment = searchParams.get("payment")?.trim();
  const dateFrom = searchParams.get("dateFrom")?.trim();
  const dateTo = searchParams.get("dateTo")?.trim();

  if (name) filter.name = { $regex: name, $options: "i" };
  if (email) filter.email = { $regex: email, $options: "i" };
  if (contact) filter.contact = { $regex: contact, $options: "i" };
  if (packageId) filter.packageId = packageId;
  if (skillLevel) filter.skillLevelRaw = skillLevel;
  if (payment) filter.paymentRaw = payment;

  if (dateFrom || dateTo) {
    const createdAt: Record<string, Date> = {};
    if (dateFrom && /^\d{4}-\d{2}-\d{2}$/.test(dateFrom)) {
      createdAt.$gte = new Date(`${dateFrom}T00:00:00.000Z`);
    }
    if (dateTo && /^\d{4}-\d{2}-\d{2}$/.test(dateTo)) {
      createdAt.$lte = new Date(`${dateTo}T23:59:59.999Z`);
    }
    if (Object.keys(createdAt).length > 0) {
      filter.createdAt = createdAt;
    }
  }

  return filter;
}
