/* 
 
 */

define([
    "esri/map",
//    "esri/views/MapView",
    "esri/dijit/Scalebar",
    "esri/layers/FeatureLayer",
    "esri/tasks/query",
    "esri/InfoTemplate",
    "esri/dijit/BasemapGallery",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/arcgis/utils",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/graphic",
    "esri/dijit/Print",
    "dojo/parser",
    "dojo/dom-style",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/layout/TabContainer",
    "dijit/TitlePane",
    "dojo/_base/Color",
    "dijit/form/TextBox",
    "dijit/form/NumberTextBox",
    "dijit/form/FilteringSelect",
    "dijit/form/ToggleButton",
    "agsjs/dijit/TOC",
    "dojo/store/Memory",
    "dijit/form/Button",
    "dijit/form/RadioButton",
    "dojo/dom",
    "dgrid/OnDemandGrid",
    "dgrid/Grid",
    "dojo/_base/array",
    "dijit/Dialog",
    "dojo/request",
    "esri/request",
    "dijit/Tooltip",
    "dojox/json/query",
    "dojo/domReady!"
], function (Map,  Scalebar, FeatureLayer, Query, InfoTemplate, BasemapGallery, ArcGISDynamicMapServiceLayer, arcgisUtils, SimpleMarkerSymbol, Graphic, Print, parser, domStyle, BorderContainer, ContentPane, TabContainer, TitlePane, Color, TextBox, NumberTextBox, FilteringSelect, ToggleButton, TOC, Memory, Button, RadioButton, dom, OnDemandGrid, Grid, arrayUtils, Dialog, request, esrirequest, Tooltip, JsonQuery) {


    return{
        
        myCallback: myCallback,
        showCoordinates: showCoordinates,
        mapInit: mapInit,
        addSuitabilityLayerCutblock:addSuitabilityLayerCutblock,
        populateSeedlot:populateSeedlot,
        populateSpeciesBEC:populateSpeciesBEC,
        addSuitabilityLayerSeedlot:addSuitabilityLayerSeedlot,
        loadgridSeed:loadgridSeed,
        loadgrid:loadgrid
    };
        var markerSymbol = new SimpleMarkerSymbol();
        markerSymbol.setPath("M5.5,5.5h20v20h-20z");
        markerSymbol.setColor(new Color("#00FF00"));
        markerSymbol.setOutline(null);
        
    esriConfig.defaults.io.corsEnabledServers.push("utility.arcgis.com");
    function myCallback(ioArgs) {
        if (ioArgs.url.indexOf("www.arcgis.com/sharing/tools/legend") === -1) {
            return ioArgs;
        } else {
            ioArgs.url = ioArgs.url.replace("www.arcgis.com", "utility.arcgis.com");
        }
        return ioArgs;
    }
    esrirequest.setRequestPreCallback(myCallback);

    var map, scalebar;
    
    //Buttons
        var addFeatureLayerCutblock = new Button({
            label: "     GO     ",
            onClick: addSuitabilityLayerCutblock
        }, "addButtonCutblock");

        var addSpeciesBecSeedlot = new Button({
            label: "Set Species & BEC",
            onClick: populateSpeciesBEC
        }, "addSpeciesBecSeedlot");

        var addSeedlotfromOrchard = new Button({
            label: "Set Representative Seedlot",
            onClick: populateSeedlot
        }, "addSeedlotfromOrchard");

        var addFeatureLayerSeedlot = new Button({
            label: "     GO     ",
            onClick: addSuitabilityLayerSeedlot
        }, "addButtonSeedlot");

    var speciesStore = new Memory({
        data: [
            {name: "AT"},
            {name: "BA"},
            {name: "BG"},
            {name: "BL"},
            {name: "CW"},
            {name: "DR"},
            {name: "EP"},
            {name: "FDC"},
            {name: "FDI"},
            {name: "HM"},
            {name: "HW"},
            {name: "LT"},
            {name: "LW"},
            {name: "PA"},
            {name: "PJ"},
            {name: "PLC"},
            {name: "PLI"},
            {name: "PW"},
            {name: "PY"},
            {name: "SB"},
            {name: "SS"},
            {name: "SX"},
            {name: "SXS"},
            {name: "YC"}
        ]
    });

    var gensuitdata = [
        {gensuit: "1", classA: "1 to 0.98", classB: "1 to 0.985"},
        {gensuit: "2", classA: "0.98 to 0.965", classB: "0.985 to 0.975"},
        {gensuit: "3", classA: "0.965 to 0.955", classB: "0.975 to 0.965"}
    ];

    var gensuitGrid = new Grid({
        columns: {
            gensuit: "Genetic Suitability",
            classA: "Class A Suitability",
            classB: "Class B Suitability"
        }
    }, "gensuitGrid");
    

    var yearStore = new Memory({
        data: [
            {name: "No Assisted Migration"},
            {name: "Assisted Migration"}
        ]
    });

    var becStore = new Memory({
        data: [
            {name: 'BAFAun', id: 1},
            {name: 'BAFAunp', id: 2},
            {name: 'BGxh1', id: 3},
            {name: 'BGxh2', id: 4},
            {name: 'BGxh3', id: 5},
            {name: 'BGxw1', id: 6},
            {name: 'BGxw2', id: 7},
            {name: 'BWBSdk', id: 8},
            {name: 'BWBSmk', id: 9},
            {name: 'BWBSmw', id: 10},
            {name: 'BWBSvk', id: 11},
            {name: 'BWBSwk1', id: 12},
            {name: 'BWBSwk2', id: 13},
            {name: 'BWBSwk3', id: 14},
            {name: 'CDFmm', id: 15},
            {name: 'CMAun', id: 16},
            {name: 'CMAunp', id: 17},
            {name: 'CMAwh', id: 18},
            {name: 'CWHdm', id: 19},
            {name: 'CWHds1', id: 20},
            {name: 'CWHds2', id: 21},
            {name: 'CWHmm1', id: 22},
            {name: 'CWHmm2', id: 23},
            {name: 'CWHms1', id: 24},
            {name: 'CWHms2', id: 25},
            {name: 'CWHun', id: 26},
            {name: 'CWHvh1', id: 27},
            {name: 'CWHvh2', id: 28},
            {name: 'CWHvh3', id: 29},
            {name: 'CWHvm1', id: 30},
            {name: 'CWHvm2', id: 31},
            {name: 'CWHwh1', id: 32},
            {name: 'CWHwh2', id: 33},
            {name: 'CWHwm', id: 34},
            {name: 'CWHws1', id: 35},
            {name: 'CWHws2', id: 36},
            {name: 'CWHxm1', id: 37},
            {name: 'CWHxm2', id: 38},
            {name: 'ESSFdc1', id: 39},
            {name: 'ESSFdc2', id: 40},
            {name: 'ESSFdc3', id: 41},
            {name: 'ESSFdcp', id: 42},
            {name: 'ESSFdcw', id: 43},
            {name: 'ESSFdk1', id: 44},
            {name: 'ESSFdk2', id: 45},
            {name: 'ESSFdkp', id: 46},
            {name: 'ESSFdkw', id: 47},
            {name: 'ESSFdv1', id: 48},
            {name: 'ESSFdv2', id: 49},
            {name: 'ESSFdvp', id: 50},
            {name: 'ESSFdvw', id: 51},
            {name: 'ESSFmc', id: 52},
            {name: 'ESSFmcp', id: 53},
            {name: 'ESSFmh', id: 54},
            {name: 'ESSFmk', id: 55},
            {name: 'ESSFmkp', id: 56},
            {name: 'ESSFmm1', id: 57},
            {name: 'ESSFmm2', id: 58},
            {name: 'ESSFmm3', id: 59},
            {name: 'ESSFmmp', id: 60},
            {name: 'ESSFmmw', id: 61},
            {name: 'ESSFmv1', id: 62},
            {name: 'ESSFmv2', id: 63},
            {name: 'ESSFmv3', id: 64},
            {name: 'ESSFmv4', id: 65},
            {name: 'ESSFmvp', id: 66},
            {name: 'ESSFmw', id: 67},
            {name: 'ESSFmw1', id: 68},
            {name: 'ESSFmw2', id: 69},
            {name: 'ESSFmwp', id: 70},
            {name: 'ESSFmww', id: 71},
            {name: 'ESSFun', id: 72},
            {name: 'ESSFunp', id: 73},
            {name: 'ESSFvc', id: 74},
            {name: 'ESSFvcp', id: 75},
            {name: 'ESSFvcw', id: 76},
            {name: 'ESSFwc2', id: 77},
            {name: 'ESSFwc2w', id: 78},
            {name: 'ESSFwc3', id: 79},
            {name: 'ESSFwc4', id: 80},
            {name: 'ESSFwcp', id: 81},
            {name: 'ESSFwcw', id: 82},
            {name: 'ESSFwh1', id: 83},
            {name: 'ESSFwh2', id: 84},
            {name: 'ESSFwh3', id: 85},
            {name: 'ESSFwk1', id: 86},
            {name: 'ESSFwk2', id: 87},
            {name: 'ESSFwm', id: 88},
            {name: 'ESSFwm1', id: 89},
            {name: 'ESSFwm2', id: 90},
            {name: 'ESSFwm3', id: 91},
            {name: 'ESSFwm4', id: 92},
            {name: 'ESSFwmp', id: 93},
            {name: 'ESSFwmw', id: 94},
            {name: 'ESSFwv', id: 95},
            {name: 'ESSFwvp', id: 96},
            {name: 'ESSFxc1', id: 97},
            {name: 'ESSFxc2', id: 98},
            {name: 'ESSFxc3', id: 99},
            {name: 'ESSFxcp', id: 100},
            {name: 'ESSFxcw', id: 101},
            {name: 'ESSFxv1', id: 102},
            {name: 'ESSFxv2', id: 103},
            {name: 'ESSFxvp', id: 104},
            {name: 'ESSFxvw', id: 105},
            {name: 'ICHdk', id: 106},
            {name: 'ICHdm', id: 107},
            {name: 'ICHdw1', id: 108},
            {name: 'ICHdw3', id: 109},
            {name: 'ICHdw4', id: 110},
            {name: 'ICHmc1', id: 111},
            {name: 'ICHmc1a', id: 112},
            {name: 'ICHmc2', id: 113},
            {name: 'ICHmk1', id: 114},
            {name: 'ICHmk2', id: 115},
            {name: 'ICHmk3', id: 116},
            {name: 'ICHmk4', id: 117},
            {name: 'ICHmk5', id: 118},
            {name: 'ICHmm', id: 119},
            {name: 'ICHmw1', id: 120},
            {name: 'ICHmw2', id: 121},
            {name: 'ICHmw3', id: 122},
            {name: 'ICHmw4', id: 123},
            {name: 'ICHmw5', id: 124},
            {name: 'ICHvc', id: 125},
            {name: 'ICHvk1', id: 126},
            {name: 'ICHvk2', id: 127},
            {name: 'ICHwc', id: 128},
            {name: 'ICHwk1', id: 129},
            {name: 'ICHwk2', id: 130},
            {name: 'ICHwk3', id: 131},
            {name: 'ICHwk4', id: 132},
            {name: 'ICHxw', id: 133},
            {name: 'ICHxwa', id: 134},
            {name: 'IDFdc', id: 135},
            {name: 'IDFdk1', id: 136},
            {name: 'IDFdk2', id: 137},
            {name: 'IDFdk3', id: 138},
            {name: 'IDFdk4', id: 139},
            {name: 'IDFdk5', id: 140},
            {name: 'IDFdm1', id: 141},
            {name: 'IDFdm2', id: 142},
            {name: 'IDFdw', id: 143},
            {name: 'IDFmw1', id: 144},
            {name: 'IDFmw2', id: 145},
            {name: 'IDFww', id: 146},
            {name: 'IDFww1', id: 147},
            {name: 'IDFxc', id: 148},
            {name: 'IDFxh1', id: 149},
            {name: 'IDFxh2', id: 150},
            {name: 'IDFxh4', id: 151},
            {name: 'IDFxk', id: 152},
            {name: 'IDFxm', id: 153},
            {name: 'IDFxw', id: 154},
            {name: 'IDFxx2', id: 155},
            {name: 'IMAun', id: 156},
            {name: 'IMAunp', id: 157},
            {name: 'MHmm1', id: 158},
            {name: 'MHmm2', id: 159},
            {name: 'MHmmp', id: 160},
            {name: 'MHun', id: 161},
            {name: 'MHunp', id: 162},
            {name: 'MHwh', id: 163},
            {name: 'MHwh1', id: 164},
            {name: 'MHwhp', id: 165},
            {name: 'MSdc1', id: 166},
            {name: 'MSdc2', id: 167},
            {name: 'MSdc3', id: 168},
            {name: 'MSdk', id: 169},
            {name: 'MSdk1', id: 170},
            {name: 'MSdk2', id: 171},
            {name: 'MSdm1', id: 172},
            {name: 'MSdm2', id: 173},
            {name: 'MSdm3', id: 174},
            {name: 'MSdm3w', id: 175},
            {name: 'MSdv', id: 176},
            {name: 'MSdw', id: 177},
            {name: 'MSmw1', id: 178},
            {name: 'MSmw2', id: 179},
            {name: 'MSun', id: 180},
            {name: 'MSxk1', id: 181},
            {name: 'MSxk2', id: 182},
            {name: 'MSxk3', id: 183},
            {name: 'MSxv', id: 184},
            {name: 'PPdh2', id: 185},
            {name: 'PPxh1', id: 186},
            {name: 'PPxh2', id: 187},
            {name: 'PPxh3', id: 188},
            {name: 'SBPSdc', id: 189},
            {name: 'SBPSmc', id: 190},
            {name: 'SBPSmk', id: 191},
            {name: 'SBPSxc', id: 192},
            {name: 'SBSdh1', id: 193},
            {name: 'SBSdh2', id: 194},
            {name: 'SBSdk', id: 195},
            {name: 'SBSdw1', id: 196},
            {name: 'SBSdw2', id: 197},
            {name: 'SBSdw3', id: 198},
            {name: 'SBSmc1', id: 199},
            {name: 'SBSmc2', id: 200},
            {name: 'SBSmc3', id: 201},
            {name: 'SBSmh', id: 202},
            {name: 'SBSmk1', id: 203},
            {name: 'SBSmk2', id: 204},
            {name: 'SBSmm', id: 205},
            {name: 'SBSmw', id: 206},
            {name: 'SBSun', id: 207},
            {name: 'SBSvk', id: 208},
            {name: 'SBSwk1', id: 209},
            {name: 'SBSwk2', id: 210},
            {name: 'SBSwk3', id: 211},
            {name: 'SBSwk3a', id: 212},
            {name: 'SWBmk', id: 213},
            {name: 'SWBmks', id: 214},
            {name: 'SWBun', id: 215},
            {name: 'SWBuns', id: 216},
            {name: 'SWBvk', id: 217},
            {name: 'SWBvks', id: 218}
        ]
    });

    var typeStore = new Memory({
        data: [
            {name: "Cutblock"},
            {name: "Seed"}
        ]
    });

    var seedlotNumber = new NumberTextBox({constraints: {fractional: false, pattern: "#"}}, 'seedlotNumber');
    var orchardNumber = new NumberTextBox({constraints: {fractional: false, pattern: "#"}}, 'orchardNumber');

    var becSelectCutblock = new FilteringSelect({
        id: "becSelectCutblock",
        name: "bec",
        value: "ESSFdk1",
        store: becStore,
        searchAttr: "name",
        onClick: function () {
            map.graphics.clear();
        }
    }, 'becInputCutblock');

    var becSelectSeedlot = new FilteringSelect({
        id: "becSelectSeedlot",
        name: "bec",
        value: "ESSFdk1",
        store: becStore,
        searchAttr: "name",
        onClick: function () {
            map.graphics.clear();
        }
    }, 'becInputSeedlot');

    var speciesSelectCutblock = new FilteringSelect({
        id: "speciesSelectCutblock",
        name: "species",
        value: "PL",
        store: speciesStore,
        searchAttr: "name",
        onChange: function () {
            updDefaultCutblock();
        }
    }, 'speciesInputCutblock');


    var speciesSelectSeedlot = new FilteringSelect({
        id: "speciesSelectSeedlot",
        name: "species",
        value: "PL",
        store: speciesStore,
        searchAttr: "name",
        invalidMessage: "This species is currently not in the system, please select a different seedlot"

    }, 'speciesInputSeedlot');


    var typeSelectCutblock = new FilteringSelect({
        id: "typeInputCutblock",
        name: "type",
        value: "Cutblock",
        displayedValue: "Cutblock",
        store: typeStore,
        searchAttr: "name"
    }, 'typeInputCutblock');

    var typeSelectSeedlot = new FilteringSelect({
        id: "typeInputSeedlot",
        name: "type",
        value: "Seedlot",
        displayedValue: "Seedlot",
        store: typeStore,
        searchAttr: "name"
    }, 'typeInputSeedlot');

    var zoomtoLat = new NumberTextBox({value: 51.7, constraints: {min: 47, max: 62}, style: "width:3em"}, 'mapLat');
    var zoomtoLong = new NumberTextBox({value: -121.9, constraints: {min: -140, max: -114}, style: "width:4em"}, 'mapLong');

    var currentinfoTemplate = new InfoTemplate("BEC Variant", "${map_label}");
    var infoSeedzone = new InfoTemplate("");
    
        var grid = new OnDemandGrid({

        columns: {
            BECvar_site: "Plantation BEC",
            BECvar_seed: "Seed BEC",
            Sp_suit_site: {label: "Species Suitabililty", formatter: suitClass},
            Limit: "Limit"
        },
        minRowsPerPage: 2500,
        bufferRows: 50
    }, "grid");


    var gridSeed = new OnDemandGrid({

        columns: {
            BECvar_site: "Plantation BEC",
            BECvar_seed: "Seed BEC",
            Sp_suit_site: {label: "Species Suitabililty", formatter: suitClass},
            Limit: "Limit"
        },
        minRowsPerPage: 2500,
        bufferRows: 50
    }, "gridSeed");


    var seedlotgrid = new OnDemandGrid({

        columns: {
            Seedlot: {label: "Seedlot", formatter: seedlotformat},
            Orchard: "Orchard",
            GW: {label: "GW", formatter: gwformat},
            GeneticClass: "Class",
            BECvar_seed: "Seed BEC"
        },
        minRowsPerPage: 2500,
        bufferRows: 50
    }, "seedlotgrid");
    
    // mapInit function
    function mapInit() {
        return new Tooltip({
            connectId: ["seedlotbecinput"],
            label: "Select from this window if you are considering a seedlot collection and want to see where seed from a particular BEC variant can be deployed"
        });

        map = new Map("map", {
            center: [-126.1, 54.6],
            zoom: 5,
//            view:view,
            basemap: "topo"
        });
        scalebar = new Scalebar({
            map: map,
            scalebarUnit: "metric"
        });
        
        addFeatureLayerCutblock.startup();
        addSpeciesBecSeedlot.startup();
        addSeedlotfromOrchard.startup();
        addFeatureLayerSeedlot.startup();
        speciesSelectCutblock.startup();
        speciesSelectSeedlot.startup();
        grid.startup();
        gridSeed.startup();
        seedlotgrid.startup();
        toc.startup();
        basemapGallery.startup();
        gensuitGrid.renderArray(gensuitdata);
        printer.startup();

        map.on("mouse-move", showCoordinates);
        map.on("mouse-drag", showCoordinates);
        currentLayer.on("selection-complete", sumBecArea);

        basemapGallery.on("error", function (msg) {
            console.log("basemap gallery error:  ", msg);
        });
    }
/// End of MapInit


// UI elements

    //Basemap Gallery

        var basemapGallery = new BasemapGallery({
            showArcGISBasemaps: true,
            map: map
        }, "basemapGallery");
        
        
    //Table of Contents/Legend		
        var toc = new TOC({
            map: map,

            layerInfos: [{
                    layer: spuLayer,
                    slider: false,
                    title: "Area of Use"
                }, {
                    layer: current2019Layer,
                    slider: false,
                    title: "CBST 2019"
                }, {
                    layer: nonsuit2019Layer,
                    slider: false,
                    title: "2019 Species May Not Be Suitable"
                }, {
                    layer: currentLayer,
                    slider: false,
                    title: "CBST"
                }, {
                    layer: nonsuitLayer,
                    slider: false,
                    title: "CBST Species May Not Be Suitable"
                }, {
                    layer: muLayer,
                    slider: false,
                    title: "Management Unit (TSA / TFL)"
                }]
        }, "tocDiv");

        var dlgseedloterror = new Dialog({
            title: "Seedlot Error",
            style: "width: 300px"
        });

        var currentLayer = new FeatureLayer("https://maps.forsite.ca/server/rest/services/204_2/CBST_BEC_v11/MapServer/0", {
            outFields: ["map_label", "SHAPE_Area"],
            infoTemplate: currentinfoTemplate,
            mode: FeatureLayer.MODE_ONDEMAND
        });

        var nonsuitLayer = new FeatureLayer("https://maps.forsite.ca/server/rest/services/204_2/CBST_BEC_v11/MapServer/1", {
            outFields: ["map_label", "SHAPE_Area"],
            infoTemplate: currentinfoTemplate,
            mode: FeatureLayer.MODE_ONDEMAND
        });

        var current2019Layer = new FeatureLayer("https://maps.forsite.ca/server/rest/services/204_2/CBST_BEC_v11/MapServer/2", {
            outFields: ["map_label", "SHAPE_Area"],
            infoTemplate: currentinfoTemplate,
            mode: FeatureLayer.MODE_ONDEMAND
        });

        var nonsuit2019Layer = new FeatureLayer("https://maps.forsite.ca/server/rest/services/204_2/CBST_BEC_v11/MapServer/3", {
            outFields: ["map_label", "SHAPE_Area"],
            infoTemplate: currentinfoTemplate,
            mode: FeatureLayer.MODE_ONDEMAND
        });

        var spuLayer = new FeatureLayer("https://maps.forsite.ca/server/rest/services/204_2/aou_web_class_a/MapServer/0", {
            outFields: ["Seedlot", "SPU"],
            mode: FeatureLayer.MODE_ONDEMAND
        });

        var muLayer = new ArcGISDynamicMapServiceLayer("https://maps.forsite.ca/server/rest/services/204_2/Management_Units/MapServer", {
            visible: false
        });

    function deg_to_dms(deg) {
        var d = Math.floor(deg);
        var minfloat = (deg - d) * 60;
        var m = Math.floor(minfloat);
        var secfloat = (minfloat - m) * 60;
        var s = Math.round(secfloat);
        // After rounding, the seconds might become 60. These two
        // if-tests are not necessary if no rounding is done.
        if (s === 60) {
            m++;
            s = 0;
        }
        if (m === 60) {
            d++;
            m = 0;
        }
        return ("" + d + "\u00B0 " + m + "\u0027 " + s + "\u0022");
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function roundOne(data) {
        return (data * 100).toFixed(1);
    }

    function gwformat(data) {
        if (isNaN(parseFloat(data))) {
            return 0;
        } else {
            return parseFloat(data);
        }
        ;
    }

    function seedlotformat(data) {
        if (isNaN(parseFloat(data))) {
            return 0;
        } else {
            return parseFloat(data);
        }
        ;
    }

    function suitClass(data) {

        suitfloat = parseFloat(data);
        if (suitfloat === 1) {
            sp_suit = "Suitable";
        } else {
            sp_suit = "*";
        }
        ;
        return sp_suit;
    }

    function roundNone(data) {
        y = data / 10;
        x = parseFloat(y);

        return y * 10;
    }

    function showCoordinates(evt) {
        //console.log("show");
        //get mapPoint from event
        //The map is in web mercator - modify the map point to display the results in geographic
        var mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);
        //display mouse coordinates
        dojo.byId("coords").innerHTML = deg_to_dms(mp.y) + " N, " + deg_to_dms(-1 * mp.x) + " W";
    }

    function addSuitabilityLayerCutblock() {
        //console.log(speciesSelectCutblock.get("displayedValue"))
        //typetxt = "migrated_height_list_cutblock_5"
        typetxt = "migrated_height_list_out";

        if (speciesSelectCutblock.get("displayedValue") === "BA")
        {
            sptxt = "Ba";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "BG")
        {
            sptxt = "Bg";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "BL")
        {
            sptxt = "Bl";
            minsuit = 97.0;
        } else if (speciesSelectCutblock.get("displayedValue") === "CW")
        {
            sptxt = "Cw";
            minsuit = 99.0;
        } else if (speciesSelectCutblock.get("displayedValue") === "FDC")
        {
            sptxt = "Fdc";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "FDI")
        {
            sptxt = "Fdi";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "HW")
        {
            sptxt = "Hw";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "LW")
        {
            sptxt = "Lw";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "PLC")
        {
            sptxt = "Plc";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "PLI")
        {
            sptxt = "Pli";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "PW")
        {
            sptxt = "Pw";
            minsuit = 96.0;
        } else if (speciesSelectCutblock.get("displayedValue") === "PY")
        {
            sptxt = "Py";
            minsuit = 96.0;
        } else if (speciesSelectCutblock.get("displayedValue") === "SS")
        {
            sptxt = "Ss";
            minsuit = 97.0;
        } else if (speciesSelectCutblock.get("displayedValue") === "SX")
        {
            sptxt = "Sx";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "SXS")
        {
            sptxt = "Sxs";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "YC")
        {
            sptxt = "Yc";
            minsuit = 96.0;
        } else if (speciesSelectCutblock.get("displayedValue") === "AT")
        {
            sptxt = "At";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "DR")
        {
            sptxt = "Dr";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "EP")
        {
            sptxt = "Ep";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "HM")
        {
            sptxt = "Hm";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "LT")
        {
            sptxt = "Lt";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "PA")
        {
            sptxt = "Pa";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "PJ")
        {
            sptxt = "Pj";
            minsuit = 97.5;
        } else if (speciesSelectCutblock.get("displayedValue") === "SB")
        {
            sptxt = "Sb";
            minsuit = 97.5;
        }
        jsontxt = "Version_8_0/" + sptxt + "_" + typetxt + ".json";
        jsonseedlot = "Version_8_0/" + sptxt + "_Seedlots.json";
        grid.store = "";
        seedlotgrid.store = "";
        seedlotgrid.refresh();
        //console.log(jsontxt)
        loadgrid(becSelectCutblock.get("displayedValue"), minsuit, 0, jsontxt);

        loadseedlotgrid(becSelectCutblock.get("displayedValue"), minsuit, 0, jsonseedlot);

        disconnectSuitabilityLayer();
    }

    function populateSeedlot() {
        orchard = orchardNumber.get("displayedValue");
        console.log(orchard);
        jsonseed = "Version_8_0/" + "Orchard_list.json";

        request.get(jsonseed, {
            handleAs: "json"
        }).then(function (response) {
            Seedlot = JsonQuery("[?Orchard=$1 ][=Seedlot]", response, orchard);

            console.log(Seedlot[0]);
            seedlotNumber.set("displayedValue", Seedlot[0]);

            populateSpeciesBEC();
        });
    }

    function populateSpeciesBEC() {
        seedlot = seedlotNumber.get("displayedValue");
        jsonseed = "Version_8_0/" + "Seedlot_list.json";

        request.get(jsonseed, {
            handleAs: "json"
        }).then(function (response) {

            BECvar = JsonQuery("[?Seedlot=$1 ][=BECvar]", response, seedlot);
            Species = JsonQuery("[?Seedlot=$1 ][=Species]", response, seedlot);
            Orchard = JsonQuery("[?Seedlot=$1 ][=Orchard]", response, seedlot);
            console.log(Orchard[0]);
            //console.log(Species[0]);
            becSelectSeedlot.set("displayedValue", BECvar[0]);
            speciesSelectSeedlot.set("displayedValue", Species[0]);
            orchardNumber.set("displayedValue", Orchard[0]);
            if (Species[0] !== "BA" & Species[0] !== "BG" & Species[0] !== "BL" & Species[0] !== "CW" & Species[0] !== "FDC" & Species[0] !== "FDI" & Species[0] !== "HW" & Species[0] !== "LW" & Species[0] !== "PLI" & Species[0] !== "PLC" & Species[0] !== "PW" & Species[0] !== "PY" & Species[0] !== "SS" & Species[0] !== "SX" & Species[0] !== "YC" & Species[0] !== "AT" & Species[0] !== "DR" & Species[0] !== "EP" & Species[0] !== "HM" & Species[0] !== "LT" & Species[0] !== "PA" & Species[0] !== "PJ" & Species[0] !== "SB")
            {
                dlgseedloterror.set("content", "That Seedlot contains a species that is not currently in the Climate Based Seed Transfer Tool, please select a new seedlot containing one of At,Ba,Bg,Bl,Cw,Dr,Ep,Fdi,Fdc,Hm,Hw,Lt,Lw,Pa,Pj,Pli,Plc,Pw,Py,Sb,Ss,Sx,Yc");
                dlgseedloterror.show();
            }
        });
    }

    function addSuitabilityLayerSeedlot() {

        typetxt = "migrated_height_list_out";

        if (speciesSelectSeedlot.get("displayedValue") === "BA")
        {
            sptxt = "Ba";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "BG")
        {
            sptxt = "Bg";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "BL")
        {
            sptxt = "Bl";
            minsuit = 97.0;
        } else if (speciesSelectSeedlot.get("displayedValue") === "CW")
        {
            sptxt = "Cw";
            minsuit = 99.0;
        } else if (speciesSelectSeedlot.get("displayedValue") === "FDI")
        {
            sptxt = "Fdi";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "FDC")
        {
            sptxt = "Fdc";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "HW")
        {
            sptxt = "Hw";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "LW")
        {
            sptxt = "Lw";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "PLC")
        {
            sptxt = "Plc";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "PLI")
        {
            sptxt = "Pli";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "PW")
        {
            sptxt = "Pw";
            minsuit = 96.0;
        } else if (speciesSelectSeedlot.get("displayedValue") === "PY")
        {
            sptxt = "Py";
            minsuit = 96.0;
        } else if (speciesSelectSeedlot.get("displayedValue") === "SS")
        {
            sptxt = "Ss";
            minsuit = 97.0;
        } else if (speciesSelectSeedlot.get("displayedValue") === "SX")
        {
            sptxt = "Sx";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "SXS")
        {
            sptxt = "Sxs";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "YC")
        {
            sptxt = "Yc";
            minsuit = 96.0;
        } else if (speciesSelectSeedlot.get("displayedValue") === "AT")
        {
            sptxt = "At";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "DR")
        {
            sptxt = "Dr";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "EP")
        {
            sptxt = "Ep";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "HM")
        {
            sptxt = "Hm";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "LT")
        {
            sptxt = "Lt";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "PA")
        {
            sptxt = "Pa";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "PJ")
        {
            sptxt = "Pj";
            minsuit = 97.5;
        } else if (speciesSelectSeedlot.get("displayedValue") === "SB")
        {
            sptxt = "Sb";
            minsuit = 97.5;
        }
        jsontxt = "Version_8_0/" + sptxt + "_" + typetxt + ".json";
        jsonseedlot = "Version_8_0/" + speciesSelectSeedlot.get("displayedValue") + "_seedlots.json";
        jsontxt2019 = "Version_8_0/" + sptxt + "_" + typetxt + ".json";
        gridSeed.store = "";
        seedlotgrid.store = "";
        seedlotgrid.refresh();
        loadgridSeed(becSelectSeedlot.get("displayedValue"), minsuit, 0, jsontxt, jsontxt2019);

        disconnectSuitabilityLayer();
    }

    function disconnectSuitabilityLayer() {
        map.removeAllLayers();
        map.setBasemap("topo");
    }

    function loadgrid(bec, min, spmin, json) {

        min = min / 100;
        spmin = spmin / 100;
        console.log(bec);
        console.log(min);
        console.log(json);
        request.get(json, {
            handleAs: "json"
        }).then(function (response) {

            console.log(bec);
            console.log(min);
            console.log(spmin);

            results = JsonQuery("[?BECvar_site=$1 & HTp_pred >= $2 & Sp_suit_site >= $3][\\HTp_pred,\\Sp_suit_seed,/BECvar_seed]", response, bec, min, 0);
            console.log(results);
            //output = JsonQuery("[?BECvar_site=$1 & HTp_pred >= $2 & Sp_suit_site >= $3][=BECvar_seed]", response,bec,min,spmin);

            output_suit = JsonQuery("[?BECvar_site=$1 & HTp_pred >= $2 & Sp_suit_site == $3][=BECvar_seed]", response, bec, min, 1);
            output_not_suit = JsonQuery("[?BECvar_site=$1 & HTp_pred >= $2 & Sp_suit_site == $3][=BECvar_seed]", response, bec, min, 0);

            output_suit_2019 = JsonQuery("[?BECvar_site=$1 & HTp_pred_2019 >= $2 & Sp_suit_site_2019 == $3][=BECvar_seed]", response, bec, min, 1);
            output_not_suit_2019 = JsonQuery("[?BECvar_site=$1 & HTp_pred_2019 >= $2 & Sp_suit_site_2019 == $3][=BECvar_seed]", response, bec, min, 0);

            species_suit = JsonQuery("[?BECvar_site=$1 & HTp_pred >= $2 & Sp_suit_site >= $3][=BECvar_seed]", response, bec, min, spmin);
            console.log(species_suit);
            if (results.length === 0) {
                alert("No results available for those parameters");
            }

            var store = new Memory({data: results});
            // Create an instance of OnDemandGrid referencing the store
            grid.set("store", store);

            grid.resize();

            outlist = '';

            if (output_suit.length > 0) {
                for (var i = 0; i < output_suit.length; i++) {
                    outlist = outlist + "'" + output_suit[i] + "'" + ", ";
                }
                outlist = outlist.substring(0, outlist.length - 2);
                currentLayer.setInfoTemplate(currentinfoTemplate);
                currentLayer.setDefinitionExpression("MAP_LABEL in (" + outlist + ")");
                map.addLayers([currentLayer]);
            }
            outlist_not_suit = '';
            //console.log(outlist);
            if (output_not_suit.length > 0) {
                for (var i = 0; i < output_not_suit.length; i++) {
                    outlist_not_suit = outlist_not_suit + "'" + output_not_suit[i] + "'" + ", ";
                }

                outlist_not_suit = outlist_not_suit.substring(0, outlist_not_suit.length - 2);

                nonsuitLayer.setInfoTemplate(currentinfoTemplate);
                nonsuitLayer.setDefinitionExpression("MAP_LABEL in (" + outlist_not_suit + ")");
                map.addLayers([nonsuitLayer]);
            }

            outlist_2019 = '';
            console.log(output_suit_2019);
            if (output_suit_2019.length > 0) {
                for (var i = 0; i < output_suit_2019.length; i++) {

                    outlist_2019 = outlist_2019 + "'" + output_suit_2019[i] + "'" + ", ";
                }
                console.log(outlist_2019);
                outlist_2019 = outlist_2019.substring(0, outlist_2019.length - 2);
                current2019Layer.setInfoTemplate(currentinfoTemplate);
                console.log(outlist_2019);
                current2019Layer.setDefinitionExpression("MAP_LABEL in (" + outlist_2019 + ")");
                console.log("Steve is great");
                map.addLayers([current2019Layer]);
            }
            outlist_not_suit_2019 = '';
            //console.log(outlist);
            if (output_not_suit_2019.length > 0) {
                for (var i = 0; i < output_not_suit_2019.length; i++) {

                    outlist_not_suit_2019 = outlist_not_suit_2019 + "'" + output_not_suit_2019[i] + "'" + ", ";
                }

                outlist_not_suit_2019 = outlist_not_suit_2019.substring(0, outlist_not_suit_2019.length - 2);

                nonsuit2019Layer.setInfoTemplate(currentinfoTemplate);
                nonsuit2019Layer.setDefinitionExpression("MAP_LABEL in (" + outlist_not_suit_2019 + ")");
                map.addLayers([nonsuit2019Layer]);
            }
            map.addLayers([muLayer]);

        });
    }

    function loadgridSeed(bec, min, spmin, json) {

        min = min / 100;
        spmin = spmin / 100;
        request.get(json, {
            handleAs: "json"
        }).then(function (response) {

            results = JsonQuery("[?BECvar_seed=$1 & HTp_pred >= $2 & Sp_suit_site >= $3 ][\\HTp_pred,/BECvar_seed]", response, bec, min, spmin);
            console.log(results);
            console.log(json);
            output_suit = JsonQuery("[?BECvar_seed=$1 & HTp_pred >= $2 & Sp_suit_site == $3][=BECvar_site]", response, bec, min, 1);
            output_not_suit = JsonQuery("[?BECvar_seed=$1 & HTp_pred >= $2 & Sp_suit_site == $3][=BECvar_site]", response, bec, min, 0);

            output_suit_2019 = JsonQuery("[?BECvar_seed=$1 & HTp_pred_2019 >= $2 & Sp_suit_site_2019 == $3][=BECvar_site]", response, bec, min, 1);
            output_not_suit_2019 = JsonQuery("[?BECvar_seed=$1 & HTp_pred_2019 >= $2 & Sp_suit_site_2019 == $3][=BECvar_site]", response, bec, min, 0);
            if (output_suit.length === 0) {
                alert("No results available for those parameters");
            }

            var store = new Memory({data: results});

            // Create an instance of OnDemandGrid referencing the store
            gridSeed.set("store", store);
            gridSeed.resize();
            outlist = '';
            //console.log(outlist);

            if (output_suit.length > 0) {
                for (var i = 0; i < output_suit.length; i++) {

                    outlist = outlist + "'" + output_suit[i] + "'" + ", ";
                }

                outlist = outlist.substring(0, outlist.length - 2);
                currentLayer.setInfoTemplate(currentinfoTemplate);
                currentLayer.setDefinitionExpression("MAP_LABEL in (" + outlist + ")");
                map.addLayers([currentLayer]);
            }
            outlist_not_suit = '';

            if (output_not_suit.length > 0) {
                for (var i = 0; i < output_not_suit.length; i++) {

                    outlist_not_suit = outlist_not_suit + "'" + output_not_suit[i] + "'" + ", ";
                }

                outlist_not_suit = outlist_not_suit.substring(0, outlist_not_suit.length - 2);

                nonsuitLayer.setInfoTemplate(currentinfoTemplate);
                nonsuitLayer.setDefinitionExpression("MAP_LABEL in (" + outlist_not_suit + ")");
                map.addLayers([nonsuitLayer]);
            }

            outlist_2019 = '';

            if (output_suit_2019.length > 0) {
                for (var i = 0; i < output_suit_2019.length; i++) {

                    outlist_2019 = outlist_2019 + "'" + output_suit_2019[i] + "'" + ", ";
                }
                console.log(outlist_2019);
                outlist_2019 = outlist_2019.substring(0, outlist_2019.length - 2);
                current2019Layer.setInfoTemplate(currentinfoTemplate);
                console.log(outlist_2019);
                current2019Layer.setDefinitionExpression("MAP_LABEL in (" + outlist_2019 + ")");
                console.log("Steve is great but forgets semicolons");
                map.addLayers([current2019Layer]);
            }
            outlist_not_suit_2019 = '';
            //console.log(outlist);
            if (output_not_suit_2019.length > 0) {
                for (var i = 0; i < output_not_suit_2019.length; i++) {

                    outlist_not_suit_2019 = outlist_not_suit_2019 + "'" + output_not_suit_2019[i] + "'" + ", ";
                }

                outlist_not_suit_2019 = outlist_not_suit_2019.substring(0, outlist_not_suit_2019.length - 2);



                nonsuit2019Layer.setInfoTemplate(currentinfoTemplate);
                nonsuit2019Layer.setDefinitionExpression("MAP_LABEL in (" + outlist_not_suit_2019 + ")");
                map.addLayers([nonsuit2019Layer]);
            }
            spuLayer.setDefinitionExpression("Seedlot = " + seedlotNumber.get("displayedValue"));

            map.addLayers([spuLayer]);
            map.addLayers([muLayer]);

            currentLayer.selectFeatures("*", FeatureLayer.SELECTION_NEW);
        });
    }

    var printer = new Print({
        map: map,
        templates: [{
                label: "Letter Portrait",
                format: "PDF",
                layout: "Letter ANSI A Portrait",
                preserveScale: false,
                layoutOptions: {
                    titleText: "Climate Based Seed Transfer",
                    authorText: "Forsite",
                    copyrightText: "Forsite",
                    scalebarUnit: "Kilometers"
                }
            }],
        url: "https://maps.forsite.ca/server/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
    }, dom.byId("printButton"));
    
    function sumBecArea(event) {

        var areaSum = 0;

        //summarize the cumulative gas production to display
        arrayUtils.forEach(event.features, function (feature) {
            //console.log(feature.attributes);
            areaSum += (feature.attributes.SHAPE_Area / 10000);
            //console.log(feature.attributes.Shape_Area);
        });

        dom.byId('messages').innerHTML = "<b>Area available to seedlot: " +
                numberWithCommas(areaSum.toFixed(0)) + " Ha. <p></p> * The selected species may not be suitable in this plantation BEC variant.  Please check the Reference Guide for Species Selection</b>";
    }

    function loadseedlotgrid(bec, min, spmin, json) {
        console.log(json);
        min = min / 100;

        request.get(json, {
            handleAs: "json"
        }).then(function (response) {

            field = "MigrationDistance";

            //console.log(bec);
            results = JsonQuery("[?BECvar_site=$1 & " + field + " >= $2][\\GW,\\" + field + "]", response, bec, min);

            //var store = new Memory({ data: results });
            var store = new Memory({});

            for (var i = 0; i < results.length; i++) {
                gwfloat = gwformat(results[i].GW);
                seedfloat = seedlotformat(results[i].Seedlot);
                store.add({
                    Seedlot: seedfloat,
                    Orchard: results[i].Orchard,
                    GW: gwfloat,
                    GeneticClass: results[i].GeneticClass,
                    BECvar_seed: results[i].BECvar_seed,
                    Distance: results[i].MigrationDistance

                });
            }
            // Create an instance of OnDemandGrid referencing the store
            seedlotgrid.set("store", store);
            seedlotgrid.set("sort", 'GW', descending = true);
            seedlotgrid.resize();

        });
    }

});


