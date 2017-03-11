"use strict";

function renderDimensionsProp(value, nonNumeric) {
    var td = document.createElement("td");
            td.textContent = value;

    if (nonNumeric) {
        td.classList.add("mdl-data-table__cell--non-numeric");
    }
    return td;
};

function renderPackImageCol(imageURL) {
    var td = document.createElement("td");
    var img = document.createElement("img");
    img.src = imageURL;
    img.style.width = "100%";
    td.appendChild(img);
    td.classList.add("mdl-data-table__cell--non-numeric");
    return td;
};

function renderDimensions(pack) {
    var tr = document.createElement("tr");

    tr.appendChild(renderPackImageCol(pack.image));
    tr.appendChild(renderDimensionsProp(pack.title, true));
    tr.appendChild(renderDimensionsProp(pack.number, true));
    tr.appendChild(renderDimensionsProp(pack.characters, true));
    tr.appendChild(renderDimensionsProp(pack.type, true));
    
    return tr;
};

function renderLegoDimensions(packs) {
    var tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    packs.forEach(function(p){
        tbody.appendChild(renderDimensions(p));
    });
}

//sort by sales (descending)
DIMENSIONS.sort(function(s1, s2) {
    return s1.number - s2.number;
});
renderLegoDimensions(DIMENSIONS);

//Dynamic search, using multiple levels of input
var titleInput = document.getElementById("title-input");

titleInput.addEventListener("input", function() {
   var searchString = titleInput.value.toLowerCase();
   
   var titleFilter = DIMENSIONS.filter(function(p) {
        return p.title.toLowerCase().indexOf(searchString) >=0 || p.characters.toLowerCase().indexOf(searchString) >=0 || p.type.toLowerCase().indexOf(titleInput.value) >=0 || p.number.indexOf(searchString) >=0;
   });
   renderLegoDimensions(titleFilter);
});

/*
Add a Pack Button. Currently color changing button with response. To be updated in the future with an input option. 
Check for a matching number property in the UNOWNED array, if found, push object to DIMENSIONS array, give response via snackbar. 
Didn't have enough time to make this work properly for this assignment, so I kept it as a color changer.
*/
var snackbarContainer = document.querySelector('#add-pack');
  var showSnackbarButton = document.querySelector('#add-pack-snackbar');
  var handler = function(event) {
    showSnackbarButton.style.backgroundColor = '';
  };
  showSnackbarButton.addEventListener('click', function() {
    'use strict';
    showSnackbarButton.style.backgroundColor = '#' +
        Math.floor(Math.random() * 0xFFFFFF).toString(16);
    var data = {
      message: 'Add a Pack functionality coming soon.',
      timeout: 4000,
      actionHandler: handler,
      actionText: 'OK'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  });
