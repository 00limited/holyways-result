package repositories

import (
	"holyways/models"

	"gorm.io/gorm"
)

type DonationRepository interface {
	FindDonation() ([]models.Donation, error)
	FindDonationByUser(ID int) ([]models.Donation, error)
	GetDonation(ID int) (models.Donation, error)
	CreateDonation(donation models.Donation) (models.Donation, error)
	UpdateDonation(donation models.Donation) (models.Donation, error)
	DeleteDonation(donation models.Donation, ID int) (models.Donation, error)
	GetTransactionStatus(ID int) (models.Donation, error)
}

func RepositoryDonation(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindDonation() ([]models.Donation, error) {
	var Donations []models.Donation
	err := r.db.Preload("User").Preload("Transaction.User").Preload("Transaction.Donation").Find(&Donations).Error

	return Donations, err
}
func (r *repository) FindDonationByUser(ID int) ([]models.Donation, error) {
	var Donations []models.Donation
	err := r.db.Preload("Transaction").Preload("Transaction.User").Where("user_id = ?", ID).Find(&Donations).Error

	return Donations, err
}

func (r *repository) GetDonation(ID int) (models.Donation, error) {
	var Donation models.Donation
	err := r.db.Preload("Transaction").Preload("Transaction.User").Preload("Transaction.Donation").Preload("User").First(&Donation, ID).Error

	return Donation, err
}
func (r *repository) GetTransactionStatus(ID int) (models.Donation, error) {
	var Donation models.Donation
	err := r.db.Preload("Transaction").Preload("Transaction.User").Preload("Transaction.Donation").Where("Transaction.status = ?", "success").First(&Donation, ID).Error

	return Donation, err
}

func (r *repository) CreateDonation(donation models.Donation) (models.Donation, error) {
	err := r.db.Preload("Donation.User").Create(&donation).Error

	return donation, err
}

func (r *repository) UpdateDonation(donation models.Donation) (models.Donation, error) {
	err := r.db.Save(&donation).Error

	return donation, err
}
func (r *repository) DeleteDonation(donation models.Donation, ID int) (models.Donation, error) {
	err := r.db.Delete(&donation).Error

	return donation, err
}
