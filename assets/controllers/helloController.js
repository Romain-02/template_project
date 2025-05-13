import { Controller } from "@hotwired/stimulus";

/*
 * This is an example Stimulus controller!
 *
 * Any element with a data-controller="hello" attribute will cause
 * this controller to be executed. The name "hello" comes from the filename:
 * helloController.js -> "hello"
 *
 * Delete this File or adapt it for your use!
 */
export default class extends Controller {
    connect() {
        this.element.textContent = "Hello Stimulus! Edit me in assets/controllers/helloController.js";
    }
}
