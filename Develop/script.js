let m = moment();
let currentDate = m.format('dddd, MMMM Do');
let currentTime = m.format('LT');
let currentHour = m.format('H');

$("#currentDay").append(currentDate);
$("#currentTime").append(currentTime);

for (let i = 0; i < 9; i++){
    // Creating and appending each row to HTML
    makeRows(i);

    // Using moment to set the time
    let time = moment.utc((i+9)+":00", "HH:mm");
    
    // Creating First column in row and appending the time
    makeTimes(i, time);

    // Creating middle column for text input and appending to row
    makeColumns(i, time);

    // Appending text input field to middle column
    makeTextInputs(i);

    // Creating last row for save button and appending to end of row
    makeSaveBlock(i);

    // Appending created save button to last column
    makeSaveButton(i);
}

$(".saveNow").on("click", function(){
    let numberData = $(this).attr("data-type");
    let inputData = $("#textContent-"+numberData).val();
    localStorage.setItem("text-"+numberData, inputData);
});

function makeRows(i){
    let newRow = $("<div>");
    newRow.attr("class", "row time-block block-" + (i));
    $(".container").append(newRow);
};

function makeTimes(i, time){
    let timeBlock = $("<div>");
    timeBlock.attr("class", "col-2 hour");
    timeBlock.text(time.format('HH:mm'));
    $(".block-"+i).append(timeBlock);
};

function makeColumns(i, time){
    let textBlock = $("<div>");
    textBlock.attr("class", "col-8 description text-"+i);
    $(".block-"+i).append(textBlock);

    //Setting Color of Text Column
    if (currentHour < time.format('HH')){
        textBlock.addClass("future");
    }
    else if (currentHour > time.format('HH')) {
        textBlock.addClass("past");
    }
    else {
        textBlock.addClass("present");
    }
};

function makeTextInputs(i){
    let inputContent = $("<input>");
    inputContent.attr("class", "textContent");
    inputContent.attr("id", "textContent-"+i);
    inputContent.width("100%");
    inputContent.height("100%");
    $(".text-"+i).append(inputContent);
};

function makeSaveBlock(i){
    let saveBlock = $("<div>");
    saveBlock.attr("class", "col-2 saveBtn btn-"+i);
    $(".block-"+i).append(saveBlock);
};

function makeSaveButton(i){
    let btn = $("<button>");
    btn.attr("class", "saveNow");
    btn.attr("data-type", i);
    btn.html('<i class="fas fa-save"></i>');    
    $(".btn-"+i).append(btn);
};

window.onload = function(){
    for ( i=0; i<9; i++ ) {
        let loadContent = localStorage.getItem("text-"+i);
        $("#textContent-"+i).attr("value", loadContent);
    }
};
