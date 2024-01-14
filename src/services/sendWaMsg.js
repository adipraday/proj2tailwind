const [phonenumber, setPhoneNumber] = useState("");
const [text, setText] = useState("");

const sendMessage = async (e) => {
  e.preventDefault();
  const apiUrl =
    "https://api.360messenger.net/sendMessage/FlHHLUSjjcAWgramCMz9Mkvb4UHljWqf1sg";

  const formData = new FormData();
  formData.append("phonenumber", phonenumber);
  formData.append("text", text);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Bad Request: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
