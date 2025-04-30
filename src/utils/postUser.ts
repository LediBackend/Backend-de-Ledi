export const save_user = async (
    idUser: string, preference: string[]) => {
    const data = {
        idUser,
        preference
    };

    const response = await fetch('http://localhost:3300/userPreference'
        , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    const result = await response.json();
    console.log(result);
}

