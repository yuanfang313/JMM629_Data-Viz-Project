d3.csv("data.csv").then(function (dataset) {
    //#region ConstructDropDownBox
    //#region  questionDict
    // questions about life
    const questionsDict_life = {
        photo: "select a question",
        gender: "Male or Female?",
        nation: "Where do they come from?",
        glass: "Do they wear glasses?",
        zodiac: "What are the zodiac signs of them?",
        youngPhoto: "What were they look like when they were young/ younger?",
        alivePhoto: "Which of them had passed away?",
    }
    const questions_life = Object.values(questionsDict_life)
    const keys_life = Object.keys(questionsDict_life)

    // questions about career
    const questionsDict_career = {
        photo: "select a question",
        education_1: "Did they learn architecture design in the college?",
        education_2: "Did they learn architecture design in the college abroad?",
        teach: "Had they taught in the colleges?",
          
    }
    const questions_career = Object.values(questionsDict_career)
    const keys_career = Object.keys(questionsDict_career)

    // questions about prize
    const questionsDict_prize = {
        photo: "select a question",
        education_3: "Did they consider other careers before becoming an architect?",
        travel: "Did they mention about the trips that had big impact to their career?",
        age: "How old were they when they won the prize?",
        workTogether: "Did they work with other winners?",
    }

    const questions_prize = Object.values(questionsDict_prize)
    const keys_prize = Object.keys(questionsDict_prize)
    //#endregion   
    const valueSelection = ["selected"]
    const categorySelected = d3.select("#questionSelect_categories")
    
    // 1. construct dropDownBox_life
    const questionSelect_1 = d3.select("#questionSelect_1")
    const questionOptions_1 = questionSelect_1.selectAll("option")
        .data(questions_life)
        .enter().append("option")
        .text(function (d) {
            return d;
        })
        .attr("value", (d, i) => keys_life[i])

    // add "selected" property to the first option for each dropDownBox
    questionOptions_1
        .attr("selected", (d, i) => valueSelection[i])

    // 2. construct dropDownBox_career
    const questionSelect_2 = d3.select("#questionSelect_2")
    const questionOptions_2 = questionSelect_2.selectAll("option")
        .data(questions_career)
        .enter().append("option")
        .text(function (d) {
            return d;
        })
        .attr("value", (d, i) => keys_career[i])

    // add "selected" property to the first option for each dropDownBox
    questionOptions_2
        .attr("selected", (d, i) => valueSelection[i])

    // 3. construct dropDownBox_prize
    const questionSelect_3 = d3.select("#questionSelect_3")
    const questionOptions_3 = questionSelect_3.selectAll("option")
        .data(questions_prize)
        .enter().append("option")
        .text(function (d) {
            return d;
        })
        .attr("value", (d, i) => keys_prize[i])

    // add "selected" property to the first option for each dropDownBox
    questionOptions_3
        .attr("selected", (d, i) => valueSelection[i])
    //#endregion

    //#region Execute results of OptionChanged  
    questionSelect_1.on("change", updateGridImages)
    questionSelect_2.on("change", updateGridImages)
    questionSelect_3.on("change", updateGridImages)
    //#endregion

    //#region results of OptionChanged
    // select an element in the DOM to update its texts
    const updatedQuestion = d3.select("#updatedQuestion")
    var SelectedQuestion;

    function updateGridImages() {

        // get the "value" of the selected option
        var selectedQuestion = d3.select(this).property("value")

        // pass the selected option to "SelectedQuestion"
        SelectedQuestion = selectedQuestion;

        // building three categories of questions
        const questionSelection_1 = ["photo", "alivePhoto", "youngPhoto", "gender", "nation", "glass", "zodiac"]
        const questionSelection_2 = ["photo", "education_1", "education_2", "teach"]
        const questionSelection_3 = ["photo", "education_3", "age", "travel","workTogether"]

        // change class name when change default option
        if (selectedQuestion == "photo") {
            architect.attr("class", "architect")
        } else {
            architect.attr("class", "Architect")
        }
        // if selectedQuestion is not in the questionSelection_1
        if ($.inArray(selectedQuestion, questionSelection_1) != -1) {
            // update img 
            updateImgForQSelection_1();
            // update text
            updatedQuestion
                .text(questionsDict_life[selectedQuestion])
        } else if ($.inArray(selectedQuestion, questionSelection_2) != -1) {
            updateImgForQSelection_2();
            updatedQuestion
                .text(questionsDict_career[selectedQuestion])
        } else if ($.inArray(selectedQuestion, questionSelection_3) != -1) {
            updateImgForQSelection_3();
            updatedQuestion
                .text(questionsDict_prize[selectedQuestion])
        }

        if (selectedQuestion == "education_1" || selectedQuestion == "education_2") {
            d3.select("#education_11d")
                .text("Hover over the images to learn more info...")
        }

        function updateImgForQSelection_1() {
            update(selectedQuestion);
            // reset other dropDownBox
            questionOptions_2
                .property("selected", returnDefaultOption)
            questionOptions_3
                .property("selected", returnDefaultOption)
        }

        function updateImgForQSelection_2() {
            update(selectedQuestion);
            questionOptions_1
                .property("selected", returnDefaultOption)
            questionOptions_3
                .property("selected", returnDefaultOption)
        }

        function updateImgForQSelection_3() {
            update(selectedQuestion);
            questionOptions_1
                .property("selected", returnDefaultOption)
            questionOptions_2
                .property("selected", returnDefaultOption)
        }
    }

    function returnDefaultOption() {
        return this.defaultSelected;
    }

    function update(selectedOption) {
        pictures
            .attr("class", "otherProperty " + selectedOption)
            .attr("src", d => "img/" + selectedOption + "/" + d[selectedOption] + ".png")
    }
    //#endregion

    //#region ConstructImgGallery
    // construct image gallery
    const index = d => d.index;
    let portraitsContainer = d3.select('#portraitsContainer');
    let nest = d3.nest()
        .key(function (d) {
            return d.name;
        })
        .entries(dataset);

    let section = portraitsContainer
        .append("div")
        .attr("id", "section");

    let architect = section.selectAll('div')
        .data(nest)
        .enter().append('div')
        .attr("id", "architect")
        .attr("class", "architect");
    let pictures = architect.selectAll('img')
        .data(function (d) {
            return d.values;
        })
        .enter().append('img')
        .attr("class", "otherProperty photo")
        .attr("id", d => "img" + d.index)
        .attr("src", d => "img/" + keys_life[0] + "/" + d.photo + ".png")
        .on("mouseenter", ShowInfo)
        .on("mouseout", DismissInfo);
    //#endregion

    //#region results of ImgHovered 
    const workTogetherDict = {
        10: "2013",
        12: "2011",
        13: "2010_1",
        14: "2010_2",
        17: "2007",
        20: "2004",
        21: "2003",
        26: "1999",
        25: "2000",
        27: "1998",
        28: "1997",
        29: "1996",
        33: "1992",
    }
    const education_2imgArray = [
    "img8",
    "img9",
    "img15",
    "img17",
    "img20",
    "img25",
    "img26",
    "img32",
    "img43",
    "img44",
    ]
    const keys_workTogether = Object.keys(workTogetherDict)
    const newWorkTogetherArray = [];
    var i;
    for (i = 0; i < keys_workTogether.length; i++) {
        newWorkTogetherArray[i] = "img" + keys_workTogether[i]
    }
    console.log(newWorkTogetherArray)

    var ImgPath;
    var ImgId;
    var ImgRelated_1;
    var ImgRelated_2;
    var ImgRelatedPath_1;
    var ImgRelatedPath_2;
    const originalImgPath = "img/workTogether/Y.png"

    function ShowInfo(d) {
        var imgPath = d3.select(this).property("src");
        var imgId = d3.select(this).property("id");
        ImgPath = imgPath;
        ImgId = imgId;
        //console.log(ImgPath)
        // show tooltip
        d3.select("#tooltip" + index(d)).style("opacity", 0.9);
        // show photo
        d3.select("#img" + index(d))
            .attr("src", "img/" + keys_life[0] + "/" + d.photo + ".png")

        if (SelectedQuestion == "workTogether" && $.inArray(imgId, newWorkTogetherArray) != -1) {
            switch (imgId) {
                // 2013 & 2010
                case "img10":
                    ImgRelated_1 = "13";
                    ImgRelated_2 = "14";
                    break;
                case "img13":
                    ImgRelated_1 = "10";
                    break;
                case "img14":
                    ImgRelated_1 = "10";
                    break;
                    // 2011 & 1992
                case "img12":
                    ImgRelated_1 = "33";
                    break;
                case "img33":
                    ImgRelated_1 = "12"
                    break;
                    // 1998 & 1999 & 2007
                case "img17":
                    ImgRelated_1 = "26";
                    ImgRelated_2 = "27";
                    break;
                case "img26":
                    ImgRelated_1 = "17";
                    break;
                case "img27":
                    ImgRelated_1 = "17";
                    break;
                    // 2004 & 2000
                case "img20":
                    ImgRelated_1 = "25";
                    break;
                case "img25":
                    ImgRelated_1 = "20";
                    break;
                    // 2003 & 1997 & 1996
                case "img21":
                    ImgRelated_1 = "28";
                    ImgRelated_2 = "29";
                    break;
                case "img28":
                    ImgRelated_1 = "21";
                    break;
                case "img29":
                    ImgRelated_1 = "21";
                    break;
                default:
                    break;
            }
            triggerRelatedImg();

            function triggerRelatedImg() {
                ImgRelatedPath_1 = "img/photo/" + workTogetherDict[ImgRelated_1] + ".png";
                ImgRelatedPath_2 = "img/photo/" + workTogetherDict[ImgRelated_2] + ".png"
                d3.select("#img" + ImgRelated_1).attr("src", ImgRelatedPath_1);
                d3.select("#img" + ImgRelated_2).attr("src", ImgRelatedPath_2);
            }

        }

        if (SelectedQuestion == "education_1") {
            // d3.select("#updatedInfo_name")
            //   .data(dataset)
            //   .text(d.name + "had studied in")

            d3.select("#education_11d")
                .data(dataset)
                .text(">> " + d.education_1_11d)
            d3.select("#education_12d")
                .data(dataset)
                .text(d.education_1_12d)
            d3.select("#education_21d")
                .data(dataset)
                .text(d.education_1_21d)
            d3.select("#education_22d")
                .data(dataset)
                .text(d.education_1_22d)
            d3.select("#education_31d")
                .data(dataset)
                .text(d.education_1_31d)
            d3.select("#education_32d")
                .data(dataset)
                .text(d.education_1_32d)
        } else if (SelectedQuestion == "education_2") {

            if ($.inArray(imgId, education_2imgArray) != -1){
            d3.select("#divOfEducation_2")
                .append("img")
                .attr("id", "education_2img")
                .attr("class", "education_2img")
    
            d3.select("#education_2img")
                .data(dataset)
                .attr("src", "img/education_2img/" + d.education_2img + ".png")
            }
            
            
            d3.select("#education_11d")
                .data(dataset)
                .text(d.education_2_11d)
            d3.select("#education_12d")
                .data(dataset)
                .text(d.education_2_12d)
            d3.select("#education_21d")
                .data(dataset)
                .text(d.education_2_21d)
            d3.select("#education_22d")
                .data(dataset)
                .text(d.education_2_22d)
            d3.select("#education_31d")
                .data(dataset)
                .text(d.education_2_31d)
            d3.select("#education_32d")
                .data(dataset)
                .text(d.education_2_32d)
        }

        //console.log(this)
    }

    function DismissInfo(d) {
        // dismiss tooltip
        d3.select("#tooltip" + index(d)).style("opacity", 0);
        // dismiss img 
        d3.select("#img" + index(d))
            .attr("src", ImgPath)
        if (SelectedQuestion == "workTogether") {
            d3.select("#img" + ImgRelated_1)
                .attr("src", originalImgPath);
            d3.select("#img" + ImgRelated_2)
                .attr("src", originalImgPath);
        }
        if (SelectedQuestion == "education_1" || SelectedQuestion == "education_2") {
            
            d3.select("#education_2img")
                .data(dataset)
                .attr("src", "")
            d3.select("#education_11d")
                .data(dataset)
                .text("Hover over the images to learn more info...")
            d3.select("#education_12d")
                .data(dataset)
                .text("")
            d3.select("#education_21d")
                .data(dataset)
                .text("")
            d3.select("#education_22d")
                .data(dataset)
                .text("")
            d3.select("#education_31d")
                .data(dataset)
                .text("")
            d3.select("#education_32d")
                .data(dataset)
                .text("")

            d3.select("#education_2img")
                .remove()
        }
        ImgRelated_1 = null;
        ImgRelated_2 = null;

    }
    //#endregion

    //#region BuildingTooltip
    // add a tooltip to each architect
    let tooltip = architect
        .append('g')
        .attr("id", "tooltip")
        .attr("class", "tooltip")
        .style("opacity", 0);

    $("#section img")
        .each(function (i) {
            $("#tooltip")
                .attr("id", "tooltip" + i)
                .appendTo($(this).parent());
        });

    // add name to tooltip
    let tooltipName = tooltip
        .append('div')
        .attr("class", "tooltipName");
    let name = tooltipName.selectAll("text")
        .data(function (d) {
            return d.values;
        })
        .enter().append("text")
        .attr("id", "name")
        .text((d) => d.name)

    // add year to tooltip
    let tooltipYear = tooltip
        .append('div')
        .attr("class", "tooltipYear")
    let year = tooltipYear.selectAll("text")
        .data(function (d) {
            return d.values;
        })
        .enter().append("text")
        .attr("id", "year")
        .text((d) => d.year + "  Laureate");
    //#endregion
});