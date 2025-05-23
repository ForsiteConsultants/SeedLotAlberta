/* 
 seedlot selector functionality and data
 */

define(function () {
  var jsontxt, jsonseedlot, jsontxt2019;
  // var defineMap = require('defineMap.js');

  var speciesStore1 = [
    { name: "AT", minsuit: 97.5 },
    { name: "BA", minsuit: 97.5 },
    { name: "BG", minsuit: 97.5 },
    { name: "BL", minsuit: 97.0 },
    { name: "CW", minsuit: 99.0 },
    { name: "DR", minsuit: 97.5 },
    { name: "EP", minsuit: 97.5 },
    { name: "FDC", minsuit: 97.5 },
    { name: "FDI", minsuit: 97.5 },
    { name: "HM", minsuit: 97.5 },
    { name: "HW", minsuit: 97.5 },
    { name: "LT", minsuit: 97.5 },
    { name: "LW", minsuit: 97.5 },
    { name: "PA", minsuit: 97.5 },
    { name: "PJ", minsuit: 97.5 },
    { name: "PLC", minsuit: 97.5 },
    { name: "PLI", minsuit: 97.5 },
    { name: "PW", minsuit: 96.0 },
    { name: "PY", minsuit: 96.0 },
    { name: "SB", minsuit: 97.5 },
    { name: "SS", minsuit: 97.0 },
    { name: "SX", minsuit: 97.5 },
    { name: "SXS", minsuit: 97.5 },
    { name: "YC", minsuit: 96.0 },
  ];

  var gensuitdata = [
    { gensuit: "1", classA: "1 to 0.98", classB: "1 to 0.985" },
    { gensuit: "2", classA: "0.98 to 0.965", classB: "0.985 to 0.975" },
    { gensuit: "3", classA: "0.965 to 0.955", classB: "0.975 to 0.965" },
  ];

  var becStore = [
    { name: "BAFAun", id: 1 },
    { name: "BAFAunp", id: 2 },
    { name: "BGxh1", id: 3 },
    { name: "BGxh2", id: 4 },
    { name: "BGxh3", id: 5 },
    { name: "BGxw1", id: 6 },
    { name: "BGxw2", id: 7 },
    { name: "BWBSdk", id: 8 },
    { name: "BWBSmk", id: 9 },
    { name: "BWBSmw", id: 10 },
    { name: "BWBSvk", id: 11 },
    { name: "BWBSwk1", id: 12 },
    { name: "BWBSwk2", id: 13 },
    { name: "BWBSwk3", id: 14 },
    { name: "CDFmm", id: 15 },
    { name: "CMAun", id: 16 },
    { name: "CMAunp", id: 17 },
    { name: "CMAwh", id: 18 },
    { name: "CWHdm", id: 19 },
    { name: "CWHds1", id: 20 },
    { name: "CWHds2", id: 21 },
    { name: "CWHmm1", id: 22 },
    { name: "CWHmm2", id: 23 },
    { name: "CWHms1", id: 24 },
    { name: "CWHms2", id: 25 },
    { name: "CWHun", id: 26 },
    { name: "CWHvh1", id: 27 },
    { name: "CWHvh2", id: 28 },
    { name: "CWHvh3", id: 29 },
    { name: "CWHvm1", id: 30 },
    { name: "CWHvm2", id: 31 },
    { name: "CWHwh1", id: 32 },
    { name: "CWHwh2", id: 33 },
    { name: "CWHwm", id: 34 },
    { name: "CWHws1", id: 35 },
    { name: "CWHws2", id: 36 },
    { name: "CWHxm1", id: 37 },
    { name: "CWHxm2", id: 38 },
    { name: "ESSFdc1", id: 39 },
    { name: "ESSFdc2", id: 40 },
    { name: "ESSFdc3", id: 41 },
    { name: "ESSFdcp", id: 42 },
    { name: "ESSFdcw", id: 43 },
    { name: "ESSFdk1", id: 44 },
    { name: "ESSFdk2", id: 45 },
    { name: "ESSFdkp", id: 46 },
    { name: "ESSFdkw", id: 47 },
    { name: "ESSFdv1", id: 48 },
    { name: "ESSFdv2", id: 49 },
    { name: "ESSFdvp", id: 50 },
    { name: "ESSFdvw", id: 51 },
    { name: "ESSFmc", id: 52 },
    { name: "ESSFmcp", id: 53 },
    { name: "ESSFmh", id: 54 },
    { name: "ESSFmk", id: 55 },
    { name: "ESSFmkp", id: 56 },
    { name: "ESSFmm1", id: 57 },
    { name: "ESSFmm2", id: 58 },
    { name: "ESSFmm3", id: 59 },
    { name: "ESSFmmp", id: 60 },
    { name: "ESSFmmw", id: 61 },
    { name: "ESSFmv1", id: 62 },
    { name: "ESSFmv2", id: 63 },
    { name: "ESSFmv3", id: 64 },
    { name: "ESSFmv4", id: 65 },
    { name: "ESSFmvp", id: 66 },
    { name: "ESSFmw", id: 67 },
    { name: "ESSFmw1", id: 68 },
    { name: "ESSFmw2", id: 69 },
    { name: "ESSFmwp", id: 70 },
    { name: "ESSFmww", id: 71 },
    { name: "ESSFun", id: 72 },
    { name: "ESSFunp", id: 73 },
    { name: "ESSFvc", id: 74 },
    { name: "ESSFvcp", id: 75 },
    { name: "ESSFvcw", id: 76 },
    { name: "ESSFwc2", id: 77 },
    { name: "ESSFwc2w", id: 78 },
    { name: "ESSFwc3", id: 79 },
    { name: "ESSFwc4", id: 80 },
    { name: "ESSFwcp", id: 81 },
    { name: "ESSFwcw", id: 82 },
    { name: "ESSFwh1", id: 83 },
    { name: "ESSFwh2", id: 84 },
    { name: "ESSFwh3", id: 85 },
    { name: "ESSFwk1", id: 86 },
    { name: "ESSFwk2", id: 87 },
    { name: "ESSFwm", id: 88 },
    { name: "ESSFwm1", id: 89 },
    { name: "ESSFwm2", id: 90 },
    { name: "ESSFwm3", id: 91 },
    { name: "ESSFwm4", id: 92 },
    { name: "ESSFwmp", id: 93 },
    { name: "ESSFwmw", id: 94 },
    { name: "ESSFwv", id: 95 },
    { name: "ESSFwvp", id: 96 },
    { name: "ESSFxc1", id: 97 },
    { name: "ESSFxc2", id: 98 },
    { name: "ESSFxc3", id: 99 },
    { name: "ESSFxcp", id: 100 },
    { name: "ESSFxcw", id: 101 },
    { name: "ESSFxv1", id: 102 },
    { name: "ESSFxv2", id: 103 },
    { name: "ESSFxvp", id: 104 },
    { name: "ESSFxvw", id: 105 },
    { name: "ICHdk", id: 106 },
    { name: "ICHdm", id: 107 },
    { name: "ICHdw1", id: 108 },
    { name: "ICHdw3", id: 109 },
    { name: "ICHdw4", id: 110 },
    { name: "ICHmc1", id: 111 },
    { name: "ICHmc1a", id: 112 },
    { name: "ICHmc2", id: 113 },
    { name: "ICHmk1", id: 114 },
    { name: "ICHmk2", id: 115 },
    { name: "ICHmk3", id: 116 },
    { name: "ICHmk4", id: 117 },
    { name: "ICHmk5", id: 118 },
    { name: "ICHmm", id: 119 },
    { name: "ICHmw1", id: 120 },
    { name: "ICHmw2", id: 121 },
    { name: "ICHmw3", id: 122 },
    { name: "ICHmw4", id: 123 },
    { name: "ICHmw5", id: 124 },
    { name: "ICHvc", id: 125 },
    { name: "ICHvk1", id: 126 },
    { name: "ICHvk2", id: 127 },
    { name: "ICHwc", id: 128 },
    { name: "ICHwk1", id: 129 },
    { name: "ICHwk2", id: 130 },
    { name: "ICHwk3", id: 131 },
    { name: "ICHwk4", id: 132 },
    { name: "ICHxw", id: 133 },
    { name: "ICHxwa", id: 134 },
    { name: "IDFdc", id: 135 },
    { name: "IDFdk1", id: 136 },
    { name: "IDFdk2", id: 137 },
    { name: "IDFdk3", id: 138 },
    { name: "IDFdk4", id: 139 },
    { name: "IDFdk5", id: 140 },
    { name: "IDFdm1", id: 141 },
    { name: "IDFdm2", id: 142 },
    { name: "IDFdw", id: 143 },
    { name: "IDFmw1", id: 144 },
    { name: "IDFmw2", id: 145 },
    { name: "IDFww", id: 146 },
    { name: "IDFww1", id: 147 },
    { name: "IDFxc", id: 148 },
    { name: "IDFxh1", id: 149 },
    { name: "IDFxh2", id: 150 },
    { name: "IDFxh4", id: 151 },
    { name: "IDFxk", id: 152 },
    { name: "IDFxm", id: 153 },
    { name: "IDFxw", id: 154 },
    { name: "IDFxx2", id: 155 },
    { name: "IMAun", id: 156 },
    { name: "IMAunp", id: 157 },
    { name: "MHmm1", id: 158 },
    { name: "MHmm2", id: 159 },
    { name: "MHmmp", id: 160 },
    { name: "MHun", id: 161 },
    { name: "MHunp", id: 162 },
    { name: "MHwh", id: 163 },
    { name: "MHwh1", id: 164 },
    { name: "MHwhp", id: 165 },
    { name: "MSdc1", id: 166 },
    { name: "MSdc2", id: 167 },
    { name: "MSdc3", id: 168 },
    { name: "MSdk", id: 169 },
    { name: "MSdk1", id: 170 },
    { name: "MSdk2", id: 171 },
    { name: "MSdm1", id: 172 },
    { name: "MSdm2", id: 173 },
    { name: "MSdm3", id: 174 },
    { name: "MSdm3w", id: 175 },
    { name: "MSdv", id: 176 },
    { name: "MSdw", id: 177 },
    { name: "MSmw1", id: 178 },
    { name: "MSmw2", id: 179 },
    { name: "MSun", id: 180 },
    { name: "MSxk1", id: 181 },
    { name: "MSxk2", id: 182 },
    { name: "MSxk3", id: 183 },
    { name: "MSxv", id: 184 },
    { name: "PPdh2", id: 185 },
    { name: "PPxh1", id: 186 },
    { name: "PPxh2", id: 187 },
    { name: "PPxh3", id: 188 },
    { name: "SBPSdc", id: 189 },
    { name: "SBPSmc", id: 190 },
    { name: "SBPSmk", id: 191 },
    { name: "SBPSxc", id: 192 },
    { name: "SBSdh1", id: 193 },
    { name: "SBSdh2", id: 194 },
    { name: "SBSdk", id: 195 },
    { name: "SBSdw1", id: 196 },
    { name: "SBSdw2", id: 197 },
    { name: "SBSdw3", id: 198 },
    { name: "SBSmc1", id: 199 },
    { name: "SBSmc2", id: 200 },
    { name: "SBSmc3", id: 201 },
    { name: "SBSmh", id: 202 },
    { name: "SBSmk1", id: 203 },
    { name: "SBSmk2", id: 204 },
    { name: "SBSmm", id: 205 },
    { name: "SBSmw", id: 206 },
    { name: "SBSun", id: 207 },
    { name: "SBSvk", id: 208 },
    { name: "SBSwk1", id: 209 },
    { name: "SBSwk2", id: 210 },
    { name: "SBSwk3", id: 211 },
    { name: "SBSwk3a", id: 212 },
    { name: "SWBmk", id: 213 },
    { name: "SWBmks", id: 214 },
    { name: "SWBun", id: 215 },
    { name: "SWBuns", id: 216 },
    { name: "SWBvk", id: 217 },
    { name: "SWBvks", id: 218 },
    { name: "AP11", id: 219 },
    { name: "CM21", id: 220 },
    { name: "SA32", id: 221 },
  ];

  return {
    fillSelects: fillSelects,
    addSuitabilityLayerCutblock: addSuitabilityLayerCutblock,
    addSuitabilityLayerSeedlot: addSuitabilityLayerSeedlot,
    populateSeedlot: populateSeedlot,
    populateSpeciesBEC: populateSpeciesBEC,
    getIntersection: getIntersection,
    updateData: updateData,
    populateGenSuitList: populateGenSuitList,
    returnBecId: returnBecId,
    populateGenSuitThresholdList: populateGenSuitThresholdList,
  };

  function filterUniqueByColumn(data, column) {
    const seen = new Set();
    return data.filter((row) => {
      const value = row[column];
      if (seen.has(value)) {
        return false;
      } else {
        seen.add(value);
        return true;
      }
    });
  }

  function populateGenSuitThresholdList() {
    let data = new Promise((resolve, reject) => {
      var test_data;

      // manually add in a threshold of 0.9
      const temp = document.createElement("option");
      temp.label = 0.9;
      temp.value = 0.9;
      temp.innerHTML = temp.label;
      temp.selected = true;
      document.getElementById("cutblockInput").options.add(temp);

      for (var i = 0.995; i > 0.845; i -= 0.005) {
        const temp = document.createElement("option");
        temp.label = i.toFixed(3);
        temp.value = i;
        temp.innerHTML = temp.label;

        document.getElementById("cutblockInput").options.add(temp);
      }

      const temp2 = document.createElement("option");
      temp2.label = 0.9;
      temp2.value = 0.9;
      temp2.innerHTML = temp2.label;
      temp2.selected = true;
      document.getElementById("seedLotInput").options.add(temp2);

      for (var i = 0.995; i > 0.845; i -= 0.005) {
        const temp2 = document.createElement("option");
        temp2.label = i.toFixed(3);
        temp2.value = i;
        temp2.innerHTML = temp2.label;
        document.getElementById("seedLotInput").options.add(temp2);
      }

      resolve(test_data);
    });
  }

  // adds all the options to the Species and BEC Variant dropdowns
  function fillSelects() {
    let data = new Promise((resolve, reject) => {
      var test_data;
      var speciesStore_json = "scripts/min_gen_suit_11.json";
      var becStore_json = "byyear/2025/PL_migrated_height_list_5.json";

      $.getJSON(becStore_json, function (data) {
        becStore = data;
        console.log(data);

        // filter the data to only show the unique values for BECvar_site
        becStore = filterUniqueByColumn(becStore, "BECvar_site");

        // for each item in the becStore, add a new data field called id and set it to the index of the item
        for (var i = 0; i < becStore.length; i++) {
          becStore[i].id = i;
          becStore[i].name = becStore[i].BECvar_site;
        }

        console.log(becStore);

        for (const i in becStore) {
          const temp = document.createElement("option");
          temp.label = becStore[i].name;
          temp.value = becStore[i].id;
          temp.innerHTML = temp.label;
          const temp3 = document.createElement("option");
          temp3.label = becStore[i].name;
          temp3.value = becStore[i].id;
          temp3.innerHTML = temp3.label;
          document.getElementById("becInputCutblock").options.add(temp);
          document.getElementById("becInputSeedlot").options.add(temp3);
        }
      });

      $.getJSON(speciesStore_json, function (data) {
        speciesStore = data;
        // change all the "name" to upper case
        for (var i = 0; i < speciesStore.length; i++) {
          speciesStore[i].name = speciesStore[i].name.toUpperCase();
          speciesStore[i].minsuit = speciesStore[i].minsuit * 100;
        }

        console.log(speciesStore);

        for (const j in speciesStore) {
          const temp2 = document.createElement("Option");
          temp2.value = speciesStore[j].name;
          temp2.label = speciesStore[j].name;
          temp2.innerHTML = temp2.label;
          const temp4 = document.createElement("Option");
          temp4.value = speciesStore[j].name;
          temp4.label = speciesStore[j].name;
          temp4.innerHTML = temp4.label;
          document.getElementById("speciesInputCutblock").options.add(temp2);
          document.getElementById("speciesInputSeedlot").options.add(temp4);
        }

        $("select").selectpicker();
        $(".selectpicker").selectpicker("refresh");
      });

      resolve(test_data);
    });
  }

  function populateGenSuitList() {
    // populate the genSuitList with : "Version 7" and "Version 8"
    console.log("populateGenSuitList");

    let data = new Promise((resolve, reject) => {
      var test_data;

      // var option = document.createElement("option");
      // option.label = "Version 7";
      // option.value = "Version_7_0";
      // option.innerHTML = option.label;
      // document.getElementById("genSuitLists").options.add(option);

      // var option = document.createElement("option");
      // option.label = "Version 8";
      // option.value = "Version_8_0";
      // option.innerHTML = option.label;
      // document.getElementById("genSuitLists").options.add(option);

      for (var i = 2025; i < 2056; i += 10) {
        var option = document.createElement("option");
        option.label = i;
        option.value = i;
        option.innerHTML = option.label;
        document.getElementById("genSuitLists").options.add(option);
      }

      for (var i = 2025; i < 2056; i += 10) {
        var option = document.createElement("option");
        option.label = i;
        option.value = i;
        option.innerHTML = option.label;
        document.getElementById("seed_genSuitLists").options.add(option);
      }

      // var option2 = document.createElement("option");
      // option2.label = "Version 7";
      // option2.value = "Version_7_0";
      // option2.innerHTML = option2.label;
      // document.getElementById("seed_genSuitLists").options.add(option2);

      // var option2 = document.createElement("option");
      // option2.label = "Version 8";
      // option2.value = "Version_8_0";
      // option2.innerHTML = option2.label;
      // document.getElementById("seed_genSuitLists").options.add(option2);

      console.log(option);

      // $("select").selectpicker();
      // $(".selectpicker").selectpicker("refresh");

      resolve(test_data);
    });
  }

  function returnBecId(bec_name) {
    console.log(bec_name);
    return becStore.find((x) => x.id == bec_name).name;
  }

  // create the paths and locations for the selected cutblock and species
  function addSuitabilityLayerCutblock(sp, bec, suit, folder) {
    console.log(folder);

    jsontxt =
      "byyear/" +
      folder +
      "/" +
      sp.charAt(0).toUpperCase() +
      sp.slice(1).toLowerCase() +
      "_migrated_height_list_5.json";
    jsonseedlot = "byyear/" + folder + "/AB_seedlots_ver3.json";

    console.log(sp);
    // let suit = speciesStore.find((x) => x.name === sp).minsuit;

    console.log(suit);

    // suit = suit / 100;
    console.log(suit);
    spmin = 0;
    spmin = spmin / 100;
    window.dat = becStore;
    console.log(bec);

    // getSeedLot(bec, suit, 0, jsonseedlot, sp);

    outlist_suit = [];
    outlist_non_suit = [];
    outlist_2019 = [];
    outlist_non_2019 = [];
    output_suit = [];
    output_non_suit = [];

    let cutblock = new Promise((resolve, reject) => {
      // FDI IDFdk1 (lots of outputs; in v5 12 layers outputting)
      $.getJSON(jsontxt, function (data) {
        // good way of testing a new variable live in devtools when the page is loaded
        // window.json_obj = data;
        // window.suit = output_suit;
        // window.non_suit = output_non_suit;

        // CWHvh1, CWHvh2, CWHvm2

        // find the name in becStore associated to the bec id chosen
        var results = [];
        var intersection = [];

        let becPromise = new Promise((resolve, reject) => {
          if (bec.length == 1) {
            bec_name = becStore.find((x) => x.id == bec).name;
            results = data.filter(function (x) {
              return x["BECvar_site"] == bec_name && x["HTp_pred"] >= suit;
            });
            output_suit = data.filter(function (x) {
              return x["BECvar_site"] == bec_name && x["HTp_pred"] >= suit;
            });
            output_non_suit = data.filter(function (x) {
              return x["BECvar_site"] == bec_name && x["HTp_pred"] >= suit;
            });
            console.log(results);

            if (results.length == 0) {
              alert("No results available for those parameters");
            }

            updateData(results).then(function (data) {
              console.log(data);
              var temp_data = JSON.parse(JSON.stringify(data)); // Create a deep copy of the data array
              populateCutblockTable(temp_data); // Pass the copy to the function
              console.log(data); // Original data remains unchanged
              getSeedLot(bec, suit, 0, jsonseedlot, sp, data); // Pass the original data
            });

            // ========= SUITABLE OUTPUT ======================
            if (output_suit.length > 0) {
              for (var i = 0; i < output_suit.length; i++) {
                // outlist.push(output_suit[i].BECvar_seed);
                outlist_suit += "'" + output_suit[i].BECvar_seed + "'" + ", ";
              }
            }
            outlist_suit = outlist_suit.slice(0, -2);

            // ========= NON SUITABLE OUTPUT ==========
            if (output_non_suit.length > 0) {
              for (var i = 0; i < output_non_suit.length; i++) {
                // outlist.push(output_suit[i].BECvar_seed);
                outlist_non_suit +=
                  "'" + output_non_suit[i].BECvar_seed + "'" + ", ";
              }
            }
            outlist_non_suit = outlist_non_suit.slice(0, -2);

            resolve(outlist_suit, outlist_non_suit);
          } else {
            let all_outputs = new Promise((resolve, reject) => {
              console.log("all_outputs");
              for (var i = 0; i < bec.length; i++) {
                bec_name = becStore.find((x) => x.id == bec[i]).name;
                results.push(
                  data.filter(function (x) {
                    return (
                      x["BECvar_site"] == bec_name &&
                      x["HTp_pred"] >= suit &&
                      x["Sp_suit_site"] >= spmin
                    );
                  })
                );
                output_suit.push(
                  data.filter(function (x) {
                    return (
                      x["BECvar_site"] == bec_name &&
                      x["HTp_pred"] >= suit &&
                      x["Sp_suit_site"] == 1
                    );
                  })
                );
                output_non_suit.push(
                  data.filter(function (x) {
                    return (
                      x["BECvar_site"] == bec_name &&
                      x["HTp_pred"] >= suit &&
                      x["Sp_suit_site"] == 0
                    );
                  })
                );
              }
              resolve(results, output_suit, output_non_suit);
            }).then(function (data) {
              console.log(data);
              getUniqueUnion(data).then(function (data) {
                updateData(data).then(function (data3) {
                  populateCutblockTable(data3);
                });
              });

              // getIntersection(data).then(function (intersection) {
              //     if (intersection.length == 0) { alert("No results available for those parameters"); }
              //     console.log(intersection);
              //     updateData(intersection).then(function (data2) {
              //         console.log(data2);
              //         populateCutblockTable(data2);
              //     });
              // });
            });

            // ========= SUITABLE OUTPUT ======================

            getIntersection(output_suit).then(function (output) {
              // ========= SUITABLE OUTPUT ======================
              if (output.length > 0) {
                for (var i = 0; i < output.length; i++) {
                  // outlist.push(output_suit[i].BECvar_seed);
                  outlist_suit += "'" + output[i].BECvar_seed + "'" + ", ";
                }
              }
              outlist_suit = outlist_suit.slice(0, -2);
              console.log(outlist_suit);
            });
            getIntersection(output_non_suit).then(function (output) {
              // ========= NON SUITABLE OUTPUT ==========
              if (output.length > 0) {
                for (var i = 0; i < output.length; i++) {
                  // outlist.push(output_suit[i].BECvar_seed);
                  outlist_non_suit += "'" + output[i].BECvar_seed + "'" + ", ";
                }
              }
              outlist_non_suit = outlist_non_suit.slice(0, -2);
              console.log(outlist_non_suit);
            });

            resolve(results, intersection, output_suit, output_non_suit);
          }
        }).then(function (results, intersection, output_suit, output_non_suit) {
          return [
            [outlist_suit],
            [outlist_non_suit],
            [outlist_2019],
            [outlist_non_2019],
          ];
        });

        resolve(becPromise);
      });
    });

    return cutblock;
  }

  function getUniqueUnion(array) {
    console.log("Inside getUniqueUnion");
    var union = [];

    let gettingUnion = new Promise((resolve, reject) => {
      if (array.length == 1) {
        union = array[0];
      } else if (array.length == 2) {
        // find all the unique elements in the first array based off of BECvar_seed and BECvar_site and add them to the union array and do the same with the second array
        for (var i = 0; i < array[0].length; i++) {
          if (
            union.find(
              (x) =>
                x.BECvar_seed == array[0][i].BECvar_seed &&
                x.BECvar_site == array[0][i].BECvar_site
            ) == undefined
          ) {
            union.push(array[0][i]);
          }
        }
        for (var i = 0; i < array[1].length; i++) {
          if (
            union.find(
              (x) =>
                x.BECvar_seed == array[1][i].BECvar_seed &&
                x.BECvar_site == array[1][i].BECvar_site
            ) == undefined
          ) {
            union.push(array[1][i]);
          }
        }
      }
      resolve(union);
    });
    console.log(union);
    return gettingUnion;
  }

  function getIntersection(array) {
    console.log(array);
    var intersection = [];
    let gettingIntersection = new Promise(function (resolve, reject) {
      if (array.length == 1) {
        intersection = array[0];
      } else if (array.length == 2) {
        // get the intersection of two arrays based on "BECvar_seed"
        intersection = array[0].filter(function (x) {
          return array[1].find(function (y) {
            return x["BECvar_seed"] == y["BECvar_seed"];
          });
        });
      } else if (array.length == 3) {
        // get the intersection of three arrays based on "BECvar_seed"
        intersection = array[0].filter(function (x) {
          return (
            array[1].find(function (y) {
              return x["BECvar_seed"] == y["BECvar_seed"];
            }) &&
            array[2].find(function (z) {
              return x["BECvar_seed"] == z["BECvar_seed"];
            })
          );
        });
      }

      resolve(intersection);
    });

    return gettingIntersection;
  }

  function getSeedLot(bec, spmin, min, jsonseedlot, sp, cutblock_data) {
    // bec, spmin, 0, jsonseedlot
    console.log(spmin);
    console.log(cutblock_data);
    // get all values from BECvar_seed from cutblock data and add it to a list
    var seedzones = [];
    for (var i = 0; i < cutblock_data.length; i++) {
      seedzones.push(cutblock_data[i].BECvar_seed);
    }
    console.log(seedzones);

    $.getJSON(jsonseedlot, function (data) {
      var bec_name = "";
      var results = [];
      var finalarray = [];

      console.log("IN GETSEEDLOT");

      if (bec.length == 1) {
        console.log("One item selected");
        bec_name = becStore.find((x) => x.id == bec).name;
        bec_name = bec_name.length > 4 ? bec_name.substring(3) : bec_name;
        console.log(bec_name);
        console.log(data);
        results = data.filter(
          (item) => seedzones.includes(item.seedzone) && item.Sp === sp
        );
        console.log(results);
        finalarray = results;
        console.log(finalarray);
        for (var i = 0; i < finalarray.length; i++) {
          if (finalarray[i].Seedlot == "") {
            finalarray[i].Seedlot = 0;
          }
          if (finalarray[i].GW == "") {
            finalarray[i].GW = 0;
          }
          finalarray[i].seedzone =
            finalarray[i].seedzone.slice(0, finalarray[i].seedzone.length - 1) +
            "." +
            finalarray[i].seedzone.slice(-1);
        }
      } else {
        console.log("Multiple items selected");
        console.log(bec.length);
        for (var i = 0; i < bec.length; i++) {
          bec_name = becStore.find((x) => x.id == bec[i]).name;
          results.push(
            data.filter(function (x) {
              return (
                x["BECvar_site"] == bec_name && x["MigrationDistance"] >= spmin
              );
            })
          );
        }
        console.log(results);

        getIntersection(results).then(function (intersection) {
          finalarray = intersection;
          console.log(finalarray);

          for (var i = 0; i < finalarray.length; i++) {
            if (finalarray[i].Seedlot == "") {
              finalarray[i].Seedlot = 0;
            }
            if (finalarray[i].GW == "") {
              finalarray[i].GW = 0;
            }
            finalarray[i].seedzone =
              finalarray[i].seedzone.slice(
                0,
                finalarray[i].seedzone.length - 1
              ) +
              "." +
              finalarray[i].seedzone.slice(-1);
          }
        });
      }

      // filter finalarray to round the values of uit

      $("#seedlot_table").DataTable({
        scrollY: "200px",
        paging: false,
        destroy: true,
        data: finalarray,
        columns: [
          { data: "seedzone" },
          { data: "Orchard" },
          { data: "Sp" },
          { data: "registration no" },
          { data: "owner" },
          { data: "stream" },
        ],
      });
    });
  }

  function populateSeedlotTable(results) {
    // adding all the data to the bootstrap table

    console.log(results);

    // round the htp_pred values to 3 decimal places
    for (var i = 0; i < results.length; i++) {
      // Add a decimal between the first and second number
      results[i].BECvar_seed =
        results[i].BECvar_seed.slice(0, results[i].BECvar_seed.length - 1) +
        "." +
        results[i].BECvar_seed.slice(-1);
      results[i].BECvar_site =
        results[i].BECvar_site.slice(0, results[i].BECvar_site.length - 1) +
        "." +
        results[i].BECvar_site.slice(-1);
    }

    table = $("#seed").DataTable({
      scrollY: "300px",
      paging: false,
      destroy: true,
      data: results,
      columns: [
        { data: "BECvar_site" },
        { data: "BECvar_seed" },
        { data: "HTp_pred" },
      ],
    });
  }

  function updateData(data) {
    let new_res = new Promise(function (resolve, reject) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].Sp_suit_seed == "1") {
          data[i].Sp_suit_seed = "Suitable";
        } else {
          data[i].Sp_suit_seed = "Not Suitable";
        }
      }
      resolve(data);
    });

    return new_res;
  }

  function populateCutblockTable(results) {
    // round the htp_pred values to 3 decimal places
    for (var i = 0; i < results.length; i++) {
      results[i].HTp_pred = Math.round(results[i].HTp_pred * 1000) / 1000;
      // Add a decimal between the first and second number
      results[i].BECvar_seed =
        results[i].BECvar_seed.slice(0, results[i].BECvar_seed.length - 1) +
        "." +
        results[i].BECvar_seed.slice(-1);
      results[i].BECvar_site =
        results[i].BECvar_site.slice(0, results[i].BECvar_site.length - 1) +
        "." +
        results[i].BECvar_site.slice(-1);
    }

    $("#cutblock_table").DataTable({
      scrollY: "200px",
      paging: false,
      destroy: true,
      data: results,
      columns: [
        { data: "BECvar_site" },
        { data: "BECvar_seed" },
        { data: "HTp_pred" },
      ],
    });
  }

  function addSuitabilityLayerSeedlot(sp, bec, suit, folder) {
    console.log("Seedlot Go button. Species: " + sp + " BEC: " + bec);
    jsontxt =
      "byyear/" +
      folder +
      "/" +
      sp.charAt(0).toUpperCase() +
      sp.slice(1).toUpperCase() +
      "_migrated_height_list_5.json";
    // jsonseedlot = "Version_7_0/" + sp.charAt(0).toUpperCase() + sp.slice(1) + "_Seedlots.json";
    // let suit = speciesStore.find((x) => x.name === sp).minsuit;
    //        loadgridSeed(sp, suit, 0, jsontxt, jsontxt2019);

    // suit = suit / 100;
    console.log(jsontxt);
    console.log(suit);

    spmin = 0;
    spmin = spmin / 100;
    window.dat = becStore;

    outlist_suit = [];
    outlist_non_suit = [];
    outlist_2019 = [];
    outlist_non_2019 = [];
    let cutblock = new Promise((resolve, reject) => {
      // FDI IDFdk1 (lots of outputs; in v5 12 layers outputting)
      $.getJSON(jsontxt, function (data) {
        // good way of testing a new variable live in devtools when the page is loaded
        window.json_obj = data;
        // window.suit = output_suit;
        // window.non_suit = output_non_suit;

        // find the name in becStore associated to the bec id chosen
        var bec_name = becStore.find((x) => x.id == bec).name;
        bec_name = bec_name.length > 4 ? bec_name.substring(3) : bec_name;
        var results = data.filter(function (x) {
          return x["BECvar_seed"] == bec_name && x["HTp_pred"] >= suit;
        });
        console.log(results);

        updateData(results).then(function (data) {
          var temp_data = JSON.parse(JSON.stringify(data)); // Create a deep copy of the data array
          populateSeedlotTable(temp_data); // Pass the copy to the function
        });

        // 1 means the area is suitable and 0 means it is not a suitable area
        output_suit = data.filter(function (x) {
          return x["BECvar_seed"] == bec_name && x["HTp_pred"] >= suit;
        });
        output_non_suit = data.filter(function (x) {
          return x["BECvar_seed"] == bec_name && x["HTp_pred"] >= suit;
        });

        // output_suit_2019 = data.filter(function (x) { return x["BECvar_seed"] == bec_name && x["HTp_pred_2019"] >= suit && x["Sp_suit_site_2019"] == 1});
        // output_non_suit_2019 = data.filter(function (x) { return x["BECvar_seed"] == bec_name && x["HTp_pred_2019"] >= suit && x["Sp_suit_site_2019"] == 0});

        if (results.length == 0) {
          alert("No results available for those parameters");
        }

        // ========= SUITABLE OUTPUT ==========
        if (output_suit.length > 0) {
          for (var i = 0; i < output_suit.length; i++) {
            // outlist.push(output_suit[i].BECvar_seed);
            outlist_suit += "'" + output_suit[i].BECvar_site + "'" + ", ";
          }
        }
        outlist_suit = outlist_suit.slice(0, -2);

        // ========= NON SUITABLE OUTPUT ==========
        if (output_non_suit.length > 0) {
          for (var i = 0; i < output_non_suit.length; i++) {
            // outlist.push(output_suit[i].BECvar_seed);
            outlist_non_suit +=
              "'" + output_non_suit[i].BECvar_site + "'" + ", ";
          }
        }
        outlist_non_suit = outlist_non_suit.slice(0, -2);
        // console.log(outlist_non_suit);

        resolve([
          outlist_suit,
          outlist_non_suit,
          outlist_2019,
          outlist_non_2019,
        ]);
      });
    });

    return cutblock;
  }

  function populateSeedlot(orch, folder) {
    console.log("Seedlot top button. Value entered " + orch);
    jsonorch = "byyear/" + folder + "/" + "Orchard_list.json";
    jsonseed = "byyear/" + folder + "/" + "Seedlot_list.json";
    results = "";

    $.getJSON(jsonorch, function (orch_data) {
      var seedlot = orch_data.filter(function (x) {
        return x["Orchard"] == orch;
      });
      if (seedlot.length > 0) {
        document.getElementById("seedlotNumber").value = parseInt(
          seedlot[0].Seedlot
        );

        $.getJSON(jsonseed, function (seed_data) {
          let seedlot_data = new Promise((resolve, reject) => {
            results = seed_data.filter(function (x) {
              return x["Orchard"] == orch;
            });
            resolve(results);
          }).then(() => {
            // Clears the species and bec variant dropdown lists
            $("select").selectpicker("val", "mustard");

            window.res = results;
            console.log(results[0].BECvar);
            let becVar = becStore.find((x) => x.name == results[0].BECvar).id;
            console.log(becVar);
            document.getElementById("becInputSeedlot").value =
              results[0].BECvar;
            // document.getElementById("becInputSeedlot").title = results[0].BECvar;
            // $('.becInputSeedlot').val(becVar).trigger('change');
            // $('.becInputSeedlot').val(becVar).trigger('change');

            document.getElementById("becInputSeedlot").selectedIndex =
              becVar - 1;

            $("#becInputSeedlot").on("show.bs.dropdown", function () {
              window.location.reload();
            });

            document.getElementById("speciesInputSeedlot").value =
              results[0].Species;
            console.log(results[0].Species);

            // rerenders the bec variant dropdown list
            $("select").selectpicker("refresh");
          });
        });
      } else {
        alert("Not a valid option");
      }
    });
  }

  function populateSeedlot2(orch) {
    console.log("Seedlot top button. Value entered " + orch);
    jsonorch = "Version_7_0/" + "Orchard_list.json";
    jsonseed = "Version_7_0/" + "Seedlot_list.json";
    results = "";

    $.getJSON(jsonorch, function (orch_data) {
      var seedlot = orch_data.filter(function (x) {
        return x["Orchard"] == orch;
      });
      if (seedlot.length > 0) {
        document.getElementById("seedlotNumber").value = parseInt(
          seedlot[0].Seedlot
        );

        $.getJSON(jsonseed, function (seed_data) {
          let seedlot_data = new Promise((resolve, reject) => {
            results = seed_data.filter(function (x) {
              return x["Orchard"] == orch;
            });
            resolve(results);
          }).then(() => {
            let becVar = becStore.find((x) => x.name == results[0].BECvar).id;
            document.getElementById("becInputSeedlot").value =
              results[0].BECvar;
            $(".becInputSeedlot").val(becVar).trigger("change");
            document.getElementById("becInputSeedlot").selectedIndex =
              becVar - 1;
            $("#becInputSeedlot").on("show.bs.dropdown", function () {
              window.location.reload();
            });
            document.getElementById("speciesInputSeedlot").value =
              results[0].Species;
            $("select").selectpicker("refresh");
          });
        });
      } else {
        alert("Not a valid option");
      }
    });
  }

  function populateSpeciesBEC(lot, folder) {
    console.log("Seedlot middle button. Value entered " + lot);
    jsonseed = "byyear/" + folder + "/Seedlot_list.json";

    $.getJSON(jsonseed, function (seed_data) {
      let seedlot_data = new Promise((resolve, reject) => {
        results = seed_data.filter(function (x) {
          return x["Seedlot"] == lot;
        });
        resolve(results);
      }).then(() => {
        $("select").selectpicker("val", "mustard");

        let becVar = becStore.find((x) => x.name === results[0].BECvar).id;

        document.getElementById("becInputSeedlot").selectedIndex = becVar - 1;

        $("#becInputSeedlot").on("show.bs.dropdown", function () {
          window.location.reload();
        });

        document.getElementById("orchardNumber").value = results[0].Orchard;
        document.getElementById("becInputSeedlot").value = becVar;
        document.getElementById("speciesInputSeedlot").value =
          results[0].Species;
        $("select").selectpicker("refresh");
      });
    });
  }
});
