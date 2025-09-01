import { apiFetch } from "@/utils/apiFetch";

const LandingPage = async ({ user }) => {
    // Fetch user data directly in the server component
    const res = await apiFetch("auth", "/api/users/currentuser");
    const { currentUser } = res;

    return <div className="flex items-center justify-center min-h-screen">{currentUser ? <h1>You are signed in as {currentUser.email}</h1> : <h1>You are not signed in</h1>}</div>;
};

export default LandingPage;
