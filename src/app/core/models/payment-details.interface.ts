export interface PaymentDetailsResponse {
  status: string
  session: paymentDetails
}

export interface paymentDetails {
  url: string
  success_url: string
  cancel_url: string
}
