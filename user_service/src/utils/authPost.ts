export const save_user = async (idUser: string) => {
    const data = {
        idUser
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

