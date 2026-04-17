const API_URL = "https://cinevault-x99x.onrender.com";

export async function registerUser(userData) {
    const email = userData.email.trim().toLowerCase();
    const password = userData.password.trim();

    const existingResponse = await fetch(
        `${API_URL}/users?email=${encodeURIComponent(email)}`
    );
    const existingUsers = await existingResponse.json();

    if (existingUsers.length > 0) {
        throw new Error("User already exists");
    }

    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to register user");
    }

    const newUser = await response.json();
    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
}

export async function loginUser(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const response = await fetch(
        `${API_URL}/users?email=${encodeURIComponent(cleanEmail)}`
    );

    if (!response.ok) {
        throw new Error("Failed to log in");
    }

    const users = await response.json();

    if (users.length === 0) {
        throw new Error("Invalid email or password");
    }

    const user = users[0];

    if (user.password !== cleanPassword) {
        throw new Error("Invalid email or password");
    }

    localStorage.setItem("user", JSON.stringify(user));
    return user;
}

export function logoutUser() {
    localStorage.removeItem("user");
}

export function getCurrentUser() {
    const storedUser = localStorage.getItem("user");
    return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
}