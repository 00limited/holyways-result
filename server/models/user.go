package models

type User struct {
	ID          int           `json:"id" form:"id" gorm:"primary_key:auto_increment"`
	Name        string        `json:"name" gorm:"type: varchar(255)"`
	Email       string        `json:"email" gorm:"type: varchar(255)"`
	Password    string        `json:"password" gorm:"type: varchar(255)"`
	Phone       string        `json:"phone" gorm:"type:varchar(225)"`
	Donation    []Donation    `json:"donation" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Transaction []Transaction `json:"transaction" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type UsersProfileResponse struct {
	ID    int    `json:"user_id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Phone string `json:"phone" gorm:"type:varchar(225)"`
}

func (UsersProfileResponse) TableName() string {
	return "users"
}
