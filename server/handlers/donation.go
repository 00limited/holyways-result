package handlers

import (
	"encoding/json"
	"fmt"
	donationdto "holyways/dto/donation"
	dto "holyways/dto/result"
	"holyways/models"
	"holyways/repositories"
	"net/http"
	"os"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type handlerDonation struct {
	donationRepository repositories.DonationRepository
}

func HandlerDonation(donationRepository repositories.DonationRepository) *handlerDonation {
	return &handlerDonation{donationRepository}
}

func (h *handlerDonation) CreateDonation(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	// get data user token
	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))
	// Get dataFile from midleware and store to filename variable here ...
	dataContex := r.Context().Value("dataFile") // add this code
	filename := dataContex.(string)             // add this code

	goal, err := strconv.Atoi(r.FormValue("goal"))
	if err != nil {
		fmt.Println(err)
		return
	}
	// data form pattern submit to pattern entity db user
	request := donationdto.DonationRequest{
		Title:       r.FormValue("title"),
		Thumbnail:   r.FormValue("thumbnail"),
		Goal:        goal,
		Description: r.FormValue("description"),
	}

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	donation := models.Donation{
		Title:       request.Title,
		Thumbnail:   filename,
		Goal:        request.Goal,
		Description: request.Description,
		UserID:      userId,
	}

	donation, err = h.donationRepository.CreateDonation(donation)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	donation, _ = h.donationRepository.GetDonation(donation.ID)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: donation}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerDonation) FindDonation(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	donations, err := h.donationRepository.FindDonation()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}
	// Create Embed Path File on Image & Video property here ...
	for i, p := range donations {
		donations[i].Thumbnail = os.Getenv("path_file") + p.Thumbnail
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: donations}
	json.NewEncoder(w).Encode(response)
}
func (h *handlerDonation) FindDonationByUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))
	donations, err := h.donationRepository.FindDonationByUser(userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	// Create Embed Path File on Image & Video property here ...
	for i, p := range donations {
		donations[i].Thumbnail = os.Getenv("path_file") + p.Thumbnail
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: donations}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerDonation) GetDonation(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	donation, err := h.donationRepository.GetDonation(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	donation.Thumbnail = os.Getenv("path_file") + donation.Thumbnail

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: (donation)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerDonation) GetTransactionStatus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	donation, err := h.donationRepository.GetTransactionStatus(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: (donation)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerDonation) DeleteDonation(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	donation, err := h.donationRepository.GetDonation(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	data, err := h.donationRepository.DeleteDonation(donation, id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: (data)}
	json.NewEncoder(w).Encode(response)
}
func (h *handlerDonation) UpdateDonation(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// get product id
	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	// //get data user token
	// userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	// userId := int(userInfo["id"].(float64))

	//get image filename
	dataContex := r.Context().Value("dataFile")
	filename := dataContex.(string)
	goal, _ := strconv.Atoi(r.FormValue("goal"))

	request := donationdto.DonationRequest{
		Title:       r.FormValue("title"),
		Description: r.FormValue("description"),
		Goal:        goal,
	}
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	donation, _ := h.donationRepository.GetDonation(id)

	if request.Title != "" {
		donation.Title = request.Title
	}
	if request.Description != "" {
		donation.Description = request.Description

	}
	if request.Goal != 0 {
		donation.Goal = request.Goal

	}
	if filename != "false" {
		donation.Thumbnail = filename
	}

	data, err := h.donationRepository.UpdateDonation(donation)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}
