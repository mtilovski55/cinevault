const baseUrl = "http://localhost:3001/users";

export async function registerUser(email, password) {
    const response = await fetch(baseUrl);
    const users = await response.json();

    const existingUser = users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
        throw new Error("Email is already registered");
    }

    const createResponse = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const newUser = await createResponse.json();
    return newUser;
}

export async function loginUser(email, password) {
    const response = await fetch(baseUrl);
    const users = await response.json();

    const user = users.find(
        (user) =>
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
    );

    if (!user) {
        throw new Error("Invalid email or password");
    }

    return user;
}