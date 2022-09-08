// import modules
import "./form";
import "./submit";

// import CSS
import "../css/index.css";
import { Tooltip, Toast, Popover } from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

// import images
import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';
import Sam from '../images/sam-avatar.png';

// import db
import { initdb  } from "./database";


window.addEventListener('load', function() {
  initdb();
  document.getElementById('logo').src = Sam;
  document.getElementById('bearThumbnail').src = Bear;
  document.getElementById('dogThumbnail').src = Dog;
});