require([
  "scripts/defineMap.js",
  "scripts/main.js",
  "esri/tasks/support/Query",
  "esri/layers/GeoJSONLayer",
], function (defineMap, main) {

  main.fillSelects();
  main.populateGenSuitList();

  defineMap.mapInit();
  var selected = [];
  
  $("#becInputCutblock").on(
    "changed.bs.select",
    function (e, clickedIndex, isSelected, previousValue) {
      console.log(e.target.selectedOptions);
      selected = [];
      window.table = e;
      var options = e.target.selectedOptions;
      for (var i = 0; i < options.length; i++) {
        selected.push(options[i].value);
      }
    }
  );

  // clicking Go button on "I have a cutblock tab"
  document
    .getElementById("addButtonCutblock")
    .addEventListener("click", function () {
      defineMap.clearLyrs();
      
      var suit = document.getElementById("cutblockInput").value;
      if (suit === "" || suit === null || suit === undefined || (isNaN(suit))) {
        alert("Please enter a cutblock number");
        return;
      }

      console.log(selected);
      main
        .addSuitabilityLayerCutblock(
          document.getElementById("speciesInputCutblock").value,
          selected,
          document.getElementById("cutblockInput").value,
          document.getElementById("genSuitLists").value
        )
        .then((layers) => {
          console.log(layers);
          defineMap.updateLayer(layers, "cutblock");
        });
    });

  // Go button "I have a Seedlot" tab
  document
    .getElementById("addButtonSeedlot")
    .addEventListener("click", function () {
      defineMap.clearLyrs();
      main
        .addSuitabilityLayerSeedlot(
          document.getElementById("speciesInputSeedlot").value,
          document.getElementById("becInputSeedlot").value,
          document.getElementById("seedLotInput").value,
          document.getElementById("seed_genSuitLists").value

        )
        .then((layers) => {
          defineMap.updateLayer(layers, "seedlot");
          console.log(layers);
          // defineMap.displaySPU(document.getElementById("seedlotNumber").value);
        });
    });

  document
    .getElementById("clearButtonCutblock")
    .addEventListener("click", function () {
      defineMap.clearCutBlock();
    });
});

function removeOptions(selectElement) {
  var i, L = selectElement.options.length - 1;
  for(i = L; i >= 0; i--) {
     selectElement.remove(i);
  }
}

