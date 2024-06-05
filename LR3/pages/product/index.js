import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        ajax.post(urls.getUserInfo(this.id), (data) => {
            this.renderData(data.response[0])
        })
        ajax.post(urls.getFriendInfo(this.id), (data1) => {
           
            data1.response.items.forEach(element => {
                if (element.sex == 1 && element.city && element.city.id == 1){
                    this.renderData(element)
                    console.log(element)
                }
            });
            
        })
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot)
        product.render(item)
    }

    getHTML(data) {
        return (
            `
            <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    Popper(){
        var popovers = document.querySelectorAll('[role="tooltip"]')
        if (popovers.length == 1)
        {
            popovers[0].remove()
        }
        else
        {
            const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
            const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
        }
    }
 
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
        
        this.getData()
    }
}