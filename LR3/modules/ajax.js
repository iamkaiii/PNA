class Ajax {
    post(url, callback) {
        const getDataFromServer = async () => {
            try { 
                const result = await fetch(url);
                const resu = await result.json();
                callback(resu);
            } catch (e) {
                console.log(e);
            }
        }
        getDataFromServer();
    }
}

export const ajax = new Ajax();

