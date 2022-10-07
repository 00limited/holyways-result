package models

import "time"

type Transaction struct {
	ID           int                  `json:"id" form:"id" gorm:"primary_key:auto_increment"`
	DonateAmount int                  `json:"donateamount"`
	Status       string               `json:"status" form:"status"`
	UserID       int                  `json:"user_id" `
	User         UsersProfileResponse `json:"user" gorm:"foreignKey:UserID"`
	DonationID   int                  `json:"donation_id"`
	Donation     DonationResponse     `json:"donation"`
	CreatedAt    time.Time            `json:"created_at"`
}
type TransactionResponse struct {
	ID           int       `json:"id" form:"id" gorm:"primary_key:auto_increment"`
	DonateAmount int       `json:"donateamount"`
	Status       string    `json:"status" form:"status"`
	CreatedAt    time.Time `json:"-"`
}
