const baseUrl = "http://localhost:3001/users";

export async function registerUser(userData) {
    const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();
    return data;
}

export async function loginUser(email, password) {
    const response = await fetch(baseUrl);
    const data = await response.json();

    const user = data.find(
        (currentUser) =>
            currentUser.email === email && currentUser.password === password
    );

    return user;
}