import axios from "axios";

export async function makeWayforPayAPICall(paymentData) {
    try {
        const response = await axios.post('https://secure.wayforpay.com/pay', paymentData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to make Wayforpay API call');
    }
}