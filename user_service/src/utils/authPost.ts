export const save_user = async (email: string, password: string) => {
    const data = {
        email: email,
        password: password
    };

    const response = await fetch('http://localhost:3403/save_auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
}

