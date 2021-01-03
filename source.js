let size = 32;
let isClicked = false;
let isRandom = false;

const grid = document.querySelector("#gridContainer");
const slider = document.querySelector("input[type = \"range\"]");
const sliderText = document.querySelectorAll("#sliderSize");
const body = document.querySelector("body");
const primaryColor = document.querySelector("#primaryColor");
const backgroundColor = document.querySelector("#backgroundColor");
const clearButton = document.querySelector("#clearButton");
const randomButton = document.querySelector("#randomButton");

slider.addEventListener("mousemove", updateSliderText);
slider.addEventListener("change", updateSlider);

body.addEventListener("mousedown", function(e){
    isClicked = true;
    if(e.target.parentNode === grid)
    {
        e.target.setAttribute("data-painted", "true");
        
        if(isRandom === true)
        {
            e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        }
        else
        {
            e.target.style.backgroundColor = primaryColor.value;
        }
    }
});
body.addEventListener("mouseup", () => isClicked = false);

backgroundColor.addEventListener("input", function() { 
    document.querySelectorAll("#gridContainer div").forEach(function(div)
    {
        if(div.dataset.painted === "false")
        {
            div.style.backgroundColor = backgroundColor.value;
        }
    })
});

clearButton.addEventListener("click", () => 
{
    deleteGrid();
    populateGrid(size);
});

randomButton.addEventListener("click", () => isRandom = !isRandom);

populateGrid(size);

function populateGrid(size)
{
    for(let i = 0; i < size; i++)
    {   
        for(let j = 0; j < size; j++)
        {
            let newDiv = document.createElement("div");
            newDiv.style.backgroundColor = backgroundColor.value;
            newDiv.setAttribute("data-painted", "false");
            newDiv.addEventListener("mouseover", changeColor);
            grid.appendChild(newDiv);
        }
    }

grid.style.setProperty("grid-template-columns", "repeat(" + size + ", 1fr)");
}

function changeColor(e)
{
    if(isClicked)
    {
        e.target.setAttribute("data-painted", "true");

        if(isRandom === true)
        {
            e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        }
        else
        {
            e.target.style.backgroundColor = primaryColor.value;
        }
    }
}

function deleteGrid()
{
    grid.innerHTML = null;
}

function updateSliderText()
{
    sliderText[0].textContent = slider.value;
    sliderText[1].textContent = slider.value;
}

function updateSlider()
{
    sliderText[0].textContent = slider.value;
    sliderText[1].textContent = slider.value;
    deleteGrid();
    size = slider.value;
    populateGrid(slider.value);
}