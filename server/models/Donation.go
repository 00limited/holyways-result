package models

type Donation struct {
	ID          int                  `json:"id" form:"id" gorm:"primary_key:auto_increment"`
	Title       string               `json:"title" form:"title" gorm:"type: varchar(255)"`
	Thumbnail   string               `json:"thumbnail" form:"thumbnail"`
	Goal        int                  `json:"goal" form:"goal"`
	Description string               `json:"description" gorm:"type:text" form:"description"`
	User        UsersProfileResponse `json:"user"`
	UserID      int                  `json:"user_id" form:"user_id" `
	Transaction []Transaction        `json:"transaction"`
}

type DonationResponse struct {
	ID          int    `json:"id" form:"id" gorm:"primary_key:auto_increment"`
	Title       string `json:"title" form:"title" gorm:"type: varchar(255)"`
	Thumbnail   string `json:"thumbnail" form:"thumbnail"`
	Goal        int    `json:"goal" form:"goal"`
	Description string `json:"description" gorm:"type:text" form:"description"`
	UserID      int    `json:"user_id" form:"user_id" `
}

func (DonationResponse) TableName() string {
	return "donations"
}
