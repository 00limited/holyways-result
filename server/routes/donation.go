package routes

import (
	"holyways/handlers"
	"holyways/pkg/middleware"
	"holyways/pkg/mysql"
	"holyways/repositories"

	"github.com/gorilla/mux"
)

func Donation(r *mux.Router) {
	donationRepo := repositories.RepositoryDonation(mysql.DB)

	h := handlers.HandlerDonation(donationRepo)

	r.HandleFunc("/donation", h.FindDonation).Methods("GET")
	r.HandleFunc("/donation-user", middleware.Auth(h.FindDonationByUser)).Methods("GET")
	r.HandleFunc("/donation", middleware.Auth(middleware.UploadFile(h.CreateDonation))).Methods("POST")
	r.HandleFunc("/donation/{id}", middleware.Auth(middleware.UploadFile(h.UpdateDonation))).Methods("PATCH")
	r.HandleFunc("/donation/{id}", h.DeleteDonation).Methods("DELETE")
	r.HandleFunc("/donation/{id}", middleware.Auth(h.GetDonation)).Methods("GET")
	r.HandleFunc("/donationStatus/{id}", middleware.Auth(h.GetTransactionStatus)).Methods("GET")

}
