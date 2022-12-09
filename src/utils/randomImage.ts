import image1 from "../assets/backgroundImage/1.jpeg";
import image2 from "../assets/backgroundImage/2.jpeg";
import image3 from "../assets/backgroundImage/3.jpeg";
import image4 from "../assets/backgroundImage/4.jpeg";
import image5 from "../assets/backgroundImage/5.jpeg";
import image6 from "../assets/backgroundImage/6.jpeg";
import image7 from "../assets/backgroundImage/7.jpeg";


const getRandomImage = ()=>{
    let min = 1;
    let max = 8;
   let difference = max - min; 
   let rand = Math.random();
   rand = Math.floor( rand * difference);
   rand = rand + min;

   return rand;

}
export const randomImage = ()=>{
return require(`../assets/backgroundImage/${getRandomImage()}.jpeg`);
}
