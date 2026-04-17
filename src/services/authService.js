const API_URL = "https://cinevault-x99x.onrender.com";

export async function registerUser(userData) {
    const existingResponse = await fetch(
        `${API_URL}/users?email=${encodeURIComponent(userData.email)}`
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
            email: userData.email,
            password: userData.password,
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
    const response = await fetch(
        `${API_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    );

    if (!response.ok) {
        throw new Error("Failed to log in");
    }

    const users = await response.json();

    if (users.length === 0) {
        throw new Error("Invalid email or password");
    }

    const user = users[0];
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