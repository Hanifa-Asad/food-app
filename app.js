import {
    onAuthStateChanged,
    auth,
} from "./firebase.js"

//To check the user Status
onAuthStateChanged(auth, async (user) => {
    if (user) {
    } else {
        if (location.pathname === "../htmlPages/profile.html") {
            location.pathname = "../htmlPages/signup.html";
        }
    }
});

const para1Btn = document.getElementById("para1Btn");
const showPara1 = () => {
    let para1 = document.getElementById("para1");
    let shortPara = `Your recommendations are backed by our scientific advisory board, made of
    leading doctors, scientists, and nutritionists...`;
    let fullPara = `Your recommendations are backed by our scientific advisory board, made of
    leading doctors, scientists, and nutritionists. We are upfront about levels of clinical
    research and are transparent about our supply chain. So you can make healthy
    decisions you’re comfortable with.`;
    if (para1Btn.innerHTML === "See More") {
        para1.innerHTML = fullPara;
        para1Btn.innerHTML = "See Less";
    } else {
        para1.innerHTML = shortPara;
        para1Btn.innerHTML = "See More";
    }

}
para1Btn.addEventListener("click", showPara1);

const para2Btn = document.getElementById("para2Btn");
const showPara2 = () => {
    let para2 = document.getElementById("para2");
    let shortPara = `There are tons of healthy living blogs and resources online that it can feel overwhelming — with so many to choose from...`;
    let fullPara = `There are tons of healthy living blogs and resources online that it can feel overwhelming — with so many to choose from, how do you know which you should really
    pay attention to?.`;
    if (para2Btn.innerHTML === "See More") {
        para2.innerHTML = fullPara;
        para2Btn.innerHTML = "See Less";
    } else {
        para2.innerHTML = shortPara;
        para2Btn.innerHTML = "See More";
    }

}
para2Btn.addEventListener("click", showPara2);

const para3Btn = document.getElementById("para3Btn");
const showPara3 = () => {
    let para3 = document.getElementById("para3");
    let shortPara = `I tend to get a lot of questions this time of year about how to prevent and deal with stress, and between holiday part...`;
    let fullPara = `I tend to get a lot of questions this time of year about how
    to prevent and deal with stress, and between holiday parties, family obligations, travel, and about
    a billion other things, that’s probably no surprise. Stress can throw off your health,
    impacting everything from your skin to your digestion, so it’s.`;
    if (para3Btn.innerHTML === "See More") {
        para3.innerHTML = fullPara;
        para3Btn.innerHTML = "See Less";
    } else {
        para3.innerHTML = shortPara;
        para3Btn.innerHTML = "See More";
    }

}
para3Btn.addEventListener("click", showPara3);

const para4Btn = document.getElementById("para4Btn");
const showPara4 = () => {
    let para4 = document.getElementById("para4");
    let shortPara = `My health goals included improved digestion, energy, stress management,
    immunity, sleep,
    and aiding exercise performance...`;
    let fullPara = `My health goals included improved digestion, energy, stress management,
    immunity, sleep, and aiding exercise performance. The personalized recommendations I received included
    vitamins & supplements packaged in their awesome daily packs, making it super convenient
    and easy to remember to get my daily needs...`;
    if (para4Btn.innerHTML === "See More") {
        para4.innerHTML = fullPara;
        para4Btn.innerHTML = "See Less";
    } else {
        para4.innerHTML = shortPara;
        para4Btn.innerHTML = "See More";
    }

}
para4Btn.addEventListener("click", showPara4);

const para5Btn = document.getElementById("para5Btn");
const showPara5 = () => {
    let para5 = document.getElementById("para5");
    let shortPara = `Vegetables are packed with essential nutrients, vitamins, and minerals crucial
    for maintaining a healthy diet...`;
    let fullPara = `Vegetables are packed with essential nutrients, vitamins, and minerals crucial
    for maintaining a healthy diet. They offer a variety of flavors, colors, and textures,
    making meals both nutritious and enjoyable. Consuming a diverse range of vegetables
    daily helps boost the immune system, improve digestion, and reduce the risk of chronic
    diseases, contributing to overall well-being.`;
    if (para5Btn.innerHTML === "See More") {
        para5.innerHTML = fullPara;
        para5Btn.innerHTML = "See Less";
    } else {
        para5.innerHTML = shortPara;
        para5Btn.innerHTML = "See More";
    }

}
para5Btn.addEventListener("click", showPara5);

const para6Btn = document.getElementById("para6Btn");
const showPara6 = () => {
    let para6 = document.getElementById("para6");
    let shortPara = `Fast food is known for its convenience and quick service, making it a popular choice for busy individuals...`;
    let fullPara = `Fast food is known for its convenience and quick service, making it a popular choice for busy individuals. It typically includes items like burgers, fries, pizza, and fried chicken. While often criticized for being high in calories and low in nutritional value, many fast food chains are introducing healthier options to meet the growing demand for nutritious, on-the-go meals.

    `;
    if (para6Btn.innerHTML === "See More") {
        para6.innerHTML = fullPara;
        para6Btn.innerHTML = "See Less";
    } else {
        para6.innerHTML = shortPara;
        para6Btn.innerHTML = "See More";
    }

}
para6Btn.addEventListener("click", showPara6);

const para7Btn = document.getElementById("para7Btn");
const showPara7 = () => {
    let para7 = document.getElementById("para7");
    let shortPara = `Mixtures Food combines various ingredients and cooking styles, creating unique and flavorful dishes...`;
    let fullPara = `Mixtures Food combines various ingredients and cooking styles, creating unique and flavorful dishes. This approach allows for culinary creativity, blending different cuisines to cater to diverse tastes. Whether it's a fusion of traditional recipes or an innovative new dish, mixtures food provides an exciting dining experience that can appeal to a wide range of palates.`;
    if (para7Btn.innerHTML === "See More") {
        para7.innerHTML = fullPara;
        para7Btn.innerHTML = "See Less";
    } else {
        para7.innerHTML = shortPara;
        para7Btn.innerHTML = "See More";
    }

}
para7Btn.addEventListener("click", showPara7);

const para8Btn = document.getElementById("para8Btn");
const showPara8 = () => {
    let para8 = document.getElementById("para8");
    let shortPara = `Fast & Green Food offers a quick, healthy alternative to traditional fast food by incorporating fresh, plant-based ingredients...`;
    let fullPara = `Fast & Green Food offers a quick, healthy alternative to traditional fast food by incorporating fresh, plant-based ingredients. This concept focuses on providing nutritious meals like salads, grain bowls, and veggie wraps, which are both satisfying and environmentally friendly. Fast & Green Food caters to health-conscious consumers seeking convenience without sacrificing nutritional value.`;
    if (para8Btn.innerHTML === "See More") {
        para8.innerHTML = fullPara;
        para8Btn.innerHTML = "See Less";
    } else {
        para8.innerHTML = shortPara;
        para8Btn.innerHTML = "See More";
    }

}
para8Btn.addEventListener("click", showPara8);



const whatsappNo = () => {
    const number = `+92-328-830-2289`;
    const whastsappNo = document.getElementById("whastsappNo");
    whastsappNo.value = number;
}

const whatsapp = document.getElementById("whatsapp");
whatsapp.addEventListener("click", whatsappNo);



//Scrolling Effect
document.addEventListener("DOMContentLoaded", function () {
    const exploreLink = document.querySelector('.navbar a[href="#explore-section"]');
    if (exploreLink) {
        exploreLink.addEventListener('click', function (event) {
            event.preventDefault();
            const exploreSection = document.getElementById('explore-section');
            if (exploreSection) {
                // Scroll to the explore section smoothly
                exploreSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
