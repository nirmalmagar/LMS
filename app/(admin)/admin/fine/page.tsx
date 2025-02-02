import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api";
import "./Khalti.css";
import axios from "axios";
import { toast } from "sonner";

const KhaltiPayment = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await api.get(`/bookings/${bookingId}/`);
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setError("Failed to load booking details.");
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (error) return <p>{error}</p>;
  if (!booking) return <div className="loader">Loading...</div>;

  // Khalti payment handler (just an example; Khalti payment implementation goes here)
  const handleKhaltiPayment = async () => {
    const payload = {
      website_url: "http://localhost:5173",
      amount: booking.total_amount,
      purchase_order_id: bookingId,
      purchase_order_name: booking.activity.name,
    };

    try {
      const response = await api.post(
        `/bookings/${bookingId}/payment/khalti/initiate/`,
        payload
      );
      if ("pidx" in response.data) {
        const paymentUrl = response.data["payment_url"];
        window.location.href = paymentUrl;
      }
    } catch (error) {
      toast.error("Payment initiation error");
      console.log(error);
      console.error("Payment initiation error:", error);
    }
  };

  const handleEsewaPayment = async () => {
    try {
      const response = await api.post("/bookings/payment/esewa/initiate/", {
        booking_id: bookingId,
      });

      const formData = response.data;

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = formData[key];
          form.appendChild(input);
        }
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment initiation error: ", error);
    }
  };

  return (
    <div className="payment-page">
      <h1>Booking Details</h1>
      <div className="booking-details">
        <p>
          <strong>Activity:</strong> {booking.activity.name}
        </p>
        <p>
          <strong>Travel Date:</strong> {booking.travel_date}
        </p>
        <p>
          <strong>Number of People:</strong> {booking.number_of_people}
        </p>
        <p>
          <strong>Total Price:</strong> ${booking.total_amount}
        </p>
        <p>
          <strong>Booking Reference:</strong> {booking.booking_reference}
        </p>
      </div>

      <button className="btn-khalti" onClick={handleKhaltiPayment}>
        Pay with Khalti
      </button>

      <button
        id="esewa-payment-button"
        className="esewa-button"
        onClick={handleEsewaPayment}
      >
        Pay with eSewa
      </button>
    </div>
  );
};

export default KhaltiPayment;
