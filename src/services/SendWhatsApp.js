export const sendWa = async (data) => {
  const apiUrl =
    "https://api.360messenger.net/sendMessage/FlHHLUSjjcAWgramCMz9Mkvb4UHljWqf1sg";

  const formData = new FormData();
  formData.append("phonenumber", data.phonenumber);
  formData.append("text", data.text);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Bad Request: ${response.statusText}`);
    }

    const responseData = await response.json();
    // Do something with the responseData if needed
    console.log(responseData);
  } catch (error) {
    // Handle errors
    console.error(error);
  }
};
