// Razorpay Payment Service
// Handles initialization and opening of the Razorpay modal

interface PaymentSuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
}

interface PaymentOptions {
    amount: number; // in paise
    currency: string;
    description: string;
    prefill: {
        name: string;
        contact: string;
        email: string;
    };
}

export const initializePayment = async (
    options: PaymentOptions,
    onSuccess: (response: PaymentSuccessResponse) => void,
    onFailure: (error: any) => void,
) => {
    const key = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!key) {
        console.error("Razorpay key not found");
        onFailure(new Error("Payment configuration missing"));
        return;
    }

    if (!window.Razorpay) {
        console.error("Razorpay SDK not loaded");
        onFailure(new Error("Payment SDK failed to load"));
        return;
    }

    try {
        const razorpayOptions = {
            key: key,
            amount: options.amount,
            currency: options.currency,
            name: "Heartstring",
            description: options.description,
            image: "/heart-icon.png", // Optional: add your logo
            handler: function (response: any) {
                onSuccess(response);
            },
            prefill: {
                name: options.prefill.name,
                email: options.prefill.email,
                contact: options.prefill.contact,
            },
            theme: {
                color: "#ff4081", // Matches your app pink theme
            },
        };

        const rzp = new window.Razorpay(razorpayOptions);

        rzp.open();
    } catch (error) {
        console.error("Payment initialization error:", error);
        onFailure(error);
    }
};
