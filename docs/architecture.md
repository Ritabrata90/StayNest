# Architecture Notes

Requests follow `router -> middleware -> validation -> controller -> service -> repository/model`. The API is versioned under `/api/v1` and returns `{ success, data, message }` responses. Authentication is planned around secure HTTP-only cookies with short-lived access tokens and refresh-token rotation.

Booking creation will calculate price and recheck availability inside the server boundary. MongoDB indexes and transaction-aware writes will be introduced with the booking models.
