const ip = '192.168.0.101'

export function loginApi(data) {
    return new Promise((resolve, reject) => {
        const url = `http://${ip}:3008/login` 
        fetch(url, {
            method:'POST',
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify(data)
        })
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error));
    });
}
export function registerApi(data) {
    return new Promise((resolve, reject) => {
        const url = `http://${ip}:3008/register`
        fetch(url, {
            method:'POST',
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify(data)
        })
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error));
    });
}

export function forgotPass(data) {
    return new Promise((resolve, reject) => {
        const url = `http://${ip}:3008/forgot`
        fetch(url, {
            method:'POST',
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify(data)
        })
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error));
    });
}

export function searchApi(textSearch,categories) {
    return new Promise((resolve, reject) => {
        const url = `http://${ip}:3008/?textSearch=${textSearch}&categories=${categories}`
        fetch(url, {
            method:'GET'
        })
        .then((response) => response.json())
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error);
            })
    })
} 


export function searchApiFav(textSearch,categories,userName) {
    return new Promise((resolve, reject) => {
        const url = `http://${ip}:3008/fav?textSearch=${textSearch}&categories=${categories}&userName=${userName}`
        fetch(url, {
            method:'GET'
        })
        .then((response) => response.json())
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error);
            })
    })
} 



export function searchCategories() {
    return new Promise((resolve, reject) => {
        const url = `http://${ip}:3008/categories`
        fetch(url, {
            method:'GET'
        })
        .then((response) => response.json())
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error);
            })
    })
} 

export function postCart(data) {
    return new Promise((resolve, reject) => {
        const url = `http://${ip}:3008/cart`
        fetch(url, {
            method:'POST',
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify(data)
        })
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error));
    });
}

export function getCart(data) {
    return new Promise((resolve, reject) => {
        const url = `http://${ip}:3008/cart/?userName=${data.userName}`
        fetch(url, {
            method:'GET'
        })
        .then((response) => response.json())
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export function deleteCart(data) {
    return new Promise((resolve, reject) => {
        const url = `http://${ip}:3008/cart`
        fetch(url, {
            method:'DELETE',
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify(data)
        })
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error));
    });
}

export function updateFav(data) {
    return new Promise((resolve, reject) => {
        const url = `http://${ip}:3008/fav`
        fetch(url, {
            method:'POST',
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify(data)
        })
            .then((response) => resolve(response.json()))
            .catch((error) => reject(error));
    });
}