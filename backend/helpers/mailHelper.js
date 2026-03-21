import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];

apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

console.log(process.env.BREVO_API_KEY)

export const sendMail = async ({ to, subject, htmlContent }) => {
  try {
    await apiInstance.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_USER,
        name: "Pet Adoption",
      },
      to: [{ email: to }],
      subject,
      htmlContent,
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.error("Mail error:", err);
  }
};