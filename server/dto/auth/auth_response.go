package authdto

type AuthResp struct {
	Email string `json:"email" form:"email" validate:"required"`
	Token string `json:"token" validate:"required"`
}

type LoginResponse struct {
	Name  string `gorm:"type:varchar(300)" json:"Name"`
	Email string `gorm:"type:varchar(300)" json:"email"`
	Token string `gorm:"type:varchar(300)" json:"token"`
	Phone string `gorm:"type:varchar(300)" json:"phone"`
}

type CheckAuthResponse struct {
	Id    int    `gorm:"type: int" json:"id"`
	Name  string `gorm:"type: varchar(255)" json:"name"`
	Email string `gorm:"type: varchar(255)" json:"email"`
	Phone string `json:"phone"`
}
