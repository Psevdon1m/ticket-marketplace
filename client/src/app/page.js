import axios from "axios";
import https from "https";

//trust self-signed certificates, remove when deploy to production
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

async function getUserData() {
  const baseURL = process.env.API_URL || "https://ticket-marketplace.dev";
  const { data } = await axios.get(`${baseURL}/api/users/currentuser`, {
    httpsAgent,
  });
  return data;
}

const LandingPage = async () => {
  const { currentUser } = await getUserData();
  console.log(currentUser);
  return (
    <div>
      {currentUser ? (
        <h1>You are signed in as {currentUser.email}</h1>
      ) : (
        <h1>You are not signed in</h1>
      )}
    </div>
  );
};

export default LandingPage;
