package donationdto

type DonationRequest struct {
	Title       string `json:"title" form:"title" gorm:"type: varchar(255)"`
	Thumbnail   string `json:"thumbnail" form:"thumbnail"`
	Goal        int    `json:"goal" form:"goal" gorm:"type: int" `
	Description string `json:"description" gorm:"type:text" form:"description"`
}
