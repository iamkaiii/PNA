class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card">
                    <img class="card-img-top" src="${data.src}" alt="картинка" width="200" height="200">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                        <button class="btn btn-danger" data-id="${data.id}" id="del-card-${data.id}">Удалить</button>
                    </div>
                </div>
            `
        );
    }

    addListeners(data, onOpenClick, onDelClick) {
        document
            .getElementById(`del-card-${data.id}`)
            .onclick = () => onDelClick(data.id);
    }

    

    render(data, onOpenClick, onDelClick) {
        const html = this.getHTML(data);
        const newCard = document.createElement('div');
        newCard.innerHTML = html;
        newCard.classList.add('card');
        newCard.style.display = 'inline-block';
        this.parent.appendChild(newCard);
        this.addListeners(data, onOpenClick, onDelClick);
    }
}

document.getElementById('addCardButton').addEventListener('click', addCard);

async function addCard() {
    const dateInput = document.getElementById('dateInput').value;
    const cardsContainer = document.getElementById('cardsContainer');
    const cardComponent = new ProductCardComponent(cardsContainer);
    
    let date;
    let data = {};
    if (cardsContainer.children.length % 2 === 0) {
        date = dateInput;
        if (!date) {
            alert('Пожалуйста, выберите дату.');
            return;
        }
        const usdRate = await getExchangeRate(date, 'R01235');
        data = {
            id: Date.now(),
            title: `Курс доллара на ${date}`,
            text: `${usdRate} RUB`,
            src: 'https://gas-kvas.com/grafic/uploads/posts/2024-01/gas-kvas-com-p-znachok-dollara-na-prozrachnom-fone-33.png' 
        };
        cardComponent.render(data, () => alert(`Открыть: ${data.title}`), (id) => removeCard(id));
    } else {
        date = new Date().toISOString().split('T')[0];
        const eurRate = await getExchangeRate(date, 'R01239');
        data = {
            id: Date.now(),
            title: `Курс евро на ${date}`,
            text: `${eurRate} RUB`,
            src: 'https://gas-kvas.com/grafic/uploads/posts/2024-01/gas-kvas-com-p-znachok-yevro-na-prozrachnom-fone-6.png' 
        };
        cardComponent.render(data, () => alert(`Открыть: ${data.title}`), (id) => removeCard(id));
    }
}

async function getExchangeRate(date, currencyCode) {
    const formattedDate = date.split('-').reverse().join('/');
    const response = await fetch(`https://www.cbr.ru/scripts/XML_daily.asp?date_req=${formattedDate}`);
    if (!response.ok) {
        alert('Не удалось получить данные от Центробанка. Проверьте дату и попробуйте снова.');
        throw new Error('Network response was not ok');
    }
    const data = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    const valutes = xmlDoc.getElementsByTagName('Valute');
    for (let i = 0; i < valutes.length; i++) {
        const valute = valutes[i];
        const charCode = valute.getElementsByTagName('CharCode')[0].textContent;
        const value = valute.getElementsByTagName('Value')[0].textContent;
        if (currencyCode === 'R01235' && charCode === 'USD') {
            return value;
        }
        if (currencyCode === 'R01239' && charCode === 'EUR') {
            return value;
        }
    }
}

function removeCard(id) {
    const card = document.querySelector(`.card button[data-id="${id}"]`).closest('.card');
    card.remove();
}
