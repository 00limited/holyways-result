package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	Auth(r)
	Donation(r)
	TransactionRoutes(r)
	UserRoutes(r)

}
