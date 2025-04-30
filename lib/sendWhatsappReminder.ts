import axios from "axios";

interface WhatsAppMessageProps {
  phoneNumber: string;
  templateName: string;
  variables: string[]; // Values to inject into {{1}}, {{2}}, {{3}}
}

export const sendWhatsappReminder = async ({
  phoneNumber,
  templateName,
  variables
}: WhatsAppMessageProps) => {
  try {
    const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
    const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      console.error("Missing WhatsApp credentials");
      return;
    }

    const url = `https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "template",
      template: {
        name: templateName,
        language: { code: "en_US" },
        components: [
          {
            type: "body",
            parameters: variables.map((val) => ({
              type: "text",
              text: val,
            })),
          },
        ],
      },
    };

    const headers = {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, payload, { headers });
    console.log("✅ WhatsApp sent:", response.data);
    return response.data;
  } catch (err: any) {
    console.error("❌ WhatsApp send error:", err?.response?.data || err.message);
    return null;
  }
};
