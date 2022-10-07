package donationdto

import (
	"holyways/models"
)

type DonationResponse struct {
	ID          int                        `json:"id" gorm:"primary_key:auto_increment"`
	Transaction models.TransactionResponse `json:"transaction" gorm:"foreignKey:TransactionID"`
}
