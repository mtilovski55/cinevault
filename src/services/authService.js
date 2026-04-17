const baseUrl = "http://localhost:3001/users";

export const register = async (email, password) => {
    const res = await fetch("http://localhost:3030/users");
    const users = await res.json();

    const existingUser = users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
        throw new Error("Email is already registered");
    }

    const createRes = await fetch("http://localhost:3030/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const newUser = await createRes.json();

    localStorage.setItem("user", JSON.stringify(newUser));

    return newUser;
};

export async function loginUser(email, password) {
    const response = await fetch(baseUrl);
    const data = await response.json();

    const user = data.find(
        (currentUser) =>
            currentUser.email === email && currentUser.password === password
    );

    return user;
}