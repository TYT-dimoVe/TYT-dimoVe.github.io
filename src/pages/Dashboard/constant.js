export const CUSTOMER_STATUS = {
  NOT_PAID: "NOT_PAID",
  PAID: "PAID",
  NO_ACTIVITY: "NO_ACTIVITY",
};

export const PAGE = {
  DEFAULT: "default",
  ORDER: "order",
  TRIP: "trip",
};

export const PAYMENT_TYPE = [
  {
    value: "DIRECT",
    text: "Trực tiếp",
  },
  {
    value: "BANK_TRANSFER",
    text: "Chuyển khoản",
  },
  {
    value: "ATM_PAY",
    text: "Thẻ nội địa",
  },
  {
    value: "MASTER_VISA",
    text: "Thẻ Visa/Mastercard",
  },
  {
    value: "MOMO_PAY",
    text: "Ví điện tử MOMO",
  },
];

export const PAYMENT_TITLE = {
  DIRECT: "Trực tiếp",
  BANK_TRANSFER: "Chuyển khoản",
  ATM_PAY: "Thẻ nội địa",
  MASTER_VISA: "Thẻ Visa/Mastercard",
  MOMO_PAY: "Ví điện tử MOMO",
};
