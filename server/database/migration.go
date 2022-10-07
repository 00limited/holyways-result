package database

import (
	"fmt"
	"holyways/models"
	"holyways/pkg/mysql"
)

// Automatic Migration if Running App
func RunMigration() {
	err := mysql.DB.AutoMigrate(&models.User{}, &models.Donation{}, &models.Transaction{})

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
