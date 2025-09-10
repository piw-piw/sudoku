// document.querySelectorAll("td").forEach((e)=>{

// e.addEventListener("keydown", (function(e) {
//     if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
// }));

// })

// https://stackoverflow.com/questions/39223887/return-numbers-which-appear-only-once-javascript
Array.prototype.getShowingOnce = function() {
    let th = this;
    return th.filter(function(v) {
        // get the count of the current element in array
        // and filter based on the count
        return th.filter(function(v1) {
            // compare with current element
            return v1 == v;
            // check length
        }).length == 1;
    });
}


var su = new Sudoku();

function getCell(x_num, y_num) {
    return document.querySelector("table").children[0].children[y_num].children[x_num]
}

function setCell(x_num, y_num, num, debug = false) {
    return document.querySelector("table").children[0].children[y_num].children[x_num].innerHTML = debug ? "<span class='u'>"+num+"</span>" : num;
}

function loadSudoku() {
    document.querySelector("#load").disabled = true;
    document.querySelector("#step").disabled = false;
    document.querySelector("#debug").disabled = false;
    document.querySelector("#export").disabled = false;
    document.querySelector("#import").disabled = true;
    document.querySelector("#import-btn").disabled = true;
    let y = 0;
    Array.from(document.querySelector("table").children[0].children).forEach(row => {
        let x = 0;
        Array.from(row.children).forEach((e) => {
            let val = Number(e.innerText);
            if (!(e.innerText == "" || e.innerText == "\n")) {
                su.setCellValue(x,y,val);
                e.innerHTML = "<b>"+val+"</b>";
            }
            x++;
        });
        y++;
    });
}

function importSudoku() {
    let str = document.getElementById("import").value;
    if (str.length!=81) {
        alert("Invalid data.");
        return;
    }
    // su.import(str);

    let n = 0;
    Array.from(document.querySelector("table").children[0].children).forEach(row => {
        Array.from(row.children).forEach((e) => {
            if (str[n]==".") {
                e.innerText = "";
            } else {
                let val = Number(str[n]);
                if (isNaN(val) || val == 0) {
                    alert("Invalid data.");
                    return;
                }
                e.innerText = val;
            }
            n++;
        });
    });
}
function exportSudoku() {
    navigator.clipboard.writeText(su.export());
}

//////////////////
 Array.from(document.querySelector("table").children[0].children).forEach(row => {
        Array.from(row.children).forEach((e) => {
            if (e.children[0]?.nodeName == "INPUT") {
                e.children[0].addEventListener("input", iN);
            }
        });
    });


// evt - event
function iN(evt) {
    evt.target.value = evt.data!=0 ? evt.data : "";
    //evt.preventDefault();
    document.querySelector("#import").focus()
    let arr = Array.from(document.querySelectorAll(".sudoku input"));
    arr[(arr.indexOf(evt.target)+1)%arr.length].focus();
    //document.querySelectorAll(".sudoku input").
}