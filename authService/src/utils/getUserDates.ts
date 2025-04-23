import bcrypt from 'bcrypt'
export const save_user = async (email: string, password: string) => {
    const data = { password, email };

    const response = await fetch('http://localhost:3402/user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    const correctPassword = bcrypt.compareSync(password, result.result.password);

    if (correctPassword) {
        return result
    } else {
        return null
    }

};


// if (correctPassword) {
//     return result
// } else {
//     return null
// }



