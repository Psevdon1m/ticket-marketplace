import { apiFetch } from "@/utils/apiFetch";

const LandingPage = async () => {
  const res = await apiFetch("auth", "/api/users/currentuser");
  return (
    <div>
      {res.currentUser ? (
        <h1>You are signed in as {res.currentUser.email}</h1>
      ) : (
        <h1>You are not signed in</h1>
      )}
    </div>
  );
};

export default LandingPage;
