import diceImage from "./dice1.jpg";
import "./style.css";
import { greeting } from "./greeting.js";

const image = document.createElement("img");
image.src = diceImage;
image.width = "200";

document.body.appendChild(image);

console.log(greeting);
