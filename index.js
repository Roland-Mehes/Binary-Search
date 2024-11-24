const container = document.getElementById("animation");
const searchedElementInput = document.querySelector('input[type="number"]');
const enterBtn = document.querySelector('input[type="number"]~button');


let randomNoList = [];
let animationSteps = [];
let step = 0;

const renderList = (list, customElem) => {
    container.innerHTML = "";
    list.forEach((no, index) => {
        const box = document.createElement("div");
        box.className = "list-element";
        box.style.left = `${index * 30}px`
        box.style.height = `${(no*2) + 20}px`
        box.innerText = no;

        if(customElem && (index === customElem.min || index === customElem.max)){
            box.style.backgroundColor = "darkblue";
            box.style.color = "white";
        }
        if(customElem && index === customElem.mid){
            box.style.backgroundColor = "darkred";
            box.style.color = "white";
        }
        container.appendChild(box);
    })
}

const generateList = (length=10, max=100, min=0) => {
    const resultsArr = [];
    for (let i=0; i<length; i++) {
        const newNumber = Math.floor(Math.random() * (max - min)) + min;

        if(resultsArr.includes(newNumber)){
            length += 1;
        }
        else {
            resultsArr.push(newNumber)
        }

    }
    return resultsArr;
}

const binarySearch = (list, searchElem) => {
    let min = 0;
    let max = list.length - 1;

    while(max >= min) {
        mid = min + Math.floor((max-min)/2);
        animationSteps.push({min, max, mid});
        if(list[mid] === searchElem)return mid;

        if(list[mid] > searchElem){
            max = mid - 1;
            // min-------mid---------max
            // min------max
        }
        
        else {
            min = mid + 1
            // min-------mid---------max
            //             min-------max
        }
    }
    return -1;
}

const handleNextStep = () => {
    if(step === animationSteps.length){
        return;
    }
    renderList(randomNoList, animationSteps[step++])
}

const main = () => {
    randomNoList = generateList().sort((a, b) => a - b);
    renderList(randomNoList);
}

nextStep.addEventListener("click", handleNextStep);
enterBtn.addEventListener("click", () => {
    step = 0;
    animationSteps = [];
    const searchedElement = searchedElementInput.value;
    binarySearch(randomNoList, searchedElement);
})
window.addEventListener("load", main);