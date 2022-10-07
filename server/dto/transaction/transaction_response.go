package transactiondto

import (
	"holyways/models"
	"time"
)

type TransactionResponse struct {
	ID           int                     `json:"id" gorm:"primary_key:auto_increment"`
	Donation     models.DonationResponse `json:"donation" gorm:"foreignKey:DonationID"`
	DonateAmount int                     `json:"donateamount"`
	Status       string                  `json:"status"  gorm:"type:varchar(25)"`
	CreatedAt    time.Time               `json:"created_at"`
}
