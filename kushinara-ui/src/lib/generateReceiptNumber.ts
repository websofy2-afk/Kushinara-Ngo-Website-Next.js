export const generateReceiptNumber = () => {
  const prefix = "BBKCT";
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return `${prefix}${datePart}${random}`;
}