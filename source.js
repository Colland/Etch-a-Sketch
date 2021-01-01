let size = 32;
let isClicked = false;

const grid = document.querySelector("#gridContainer");
const slider = document.querySelector("input[type = \"range\"]");
const sliderText = document.querySelectorAll("#sliderSize");
const body = document.querySelector("body");

slider.addEventListener("mousemove", updateSliderText);
slider.addEventListener("change", updateSlider);
body.addEventListener("mousedown", () => isClicked = true);
body.addEventListener("click", () => isClicked = false);

populateGrid(32);

function populateGrid(size)
{
    for(let i = 0; i < size; i++)
    {   
        for(let j = 0; j < size; j++)
        {
            let newDiv = document.createElement("div");
            newDiv.addEventListener("mouseover", changeColor);
            newDiv.setAttribute("draggable", "false");
            grid.appendChild(newDiv);
        }
    }

grid.style.setProperty("grid-template-columns", "repeat(" + size + ", 1fr)");
}

function changeColor(e)
{
    if(isClicked)
    {
        e.target.style.backgroundColor = "red";
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
    populateGrid(slider.value);
}