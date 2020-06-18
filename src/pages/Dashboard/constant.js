export const CUSTOMER_STATUS = {
  NOT_PAID: 'NOT_PAID',
  PAID: 'PAID',
  NO_ACTIVITY: 'NO_ACTIVITY'
}

export const PAYMENT_TYPE = [
  {
    value: "DIRECT",
    text: "Thanh toán trực tiếp",
  },
  {
    value: "BANK_TRANSFER",
    text: "Thanh toán bằng hình thức chuyển khoản",
  },
  {
    value: "ATM_PAY",
    text: "Thanh toán bằng thẻ nội địa",
  },
  {
    value: "MASTER_VISA",
    text: "Thanh toán bằng thẻ Visa/Mastercard",
  },
  {
    value: "MOMO_PAY",
    text: "Thanh toán bằng Ví điện tử MOMO",
  },
];