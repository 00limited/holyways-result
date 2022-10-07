package transactiondto

type TransactionRequest struct {
	DonationID   int    `gorm:"type: int" json:"donation_id" validate:"required"`
	Status       string `json:"status"`
	UserID       int    `gorm:"type: int" json:"user_id" validate:"required"`
	DonateAmount int    `json:"donateAmount"`
}
