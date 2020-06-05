d3.csv("data.csv").then(function (dataset) {
    //#region ConstructDropDownBox
    //#region  questionDict
    // questions about life
    const questionsDict_life = {
        default: "Select a question about Personal Life...",
        gender: "Male or Female?",
        nation: "Where do they come from?",
        glass: "Do they wear glasses?",
        zodiac: "What are the zodiac signs of them?",
        young: "What were they look like when they were young/ younger?",
        old: "Which of them had passed away?",
    }
    const questions_life = Object.values(questionsDict_life)
    const keys_life = Object.keys(questionsDict_life)

    // questions about education
    const questionsDict_education = {
        default: "Select a question about Education...",
        education_1: "Did they learn architecture design in the college?",
        education_2: "Did they learn architecture design in the college abroad?",
        teach: "Had they taught in the colleges?",

    }
    const questions_education = Object.values(questionsDict_education)
    const keys_education = Object.keys(questionsDict_education)

    // questions about prize
    const questionsDict_career = {
        default: "Select a question about Career...",
        education_3: "Did they consider other careers before becoming an architect?",
        travel: "Were there some trips that had big impacts to their career?",
        age: "How old were they when they won the prize?",
        work: "Did they work with other winners?",
        esTime: "When did they establish their own practice after graduation?",
        wonTime: "When did they receive the prize after starting their own practice?",
    }

    const questions_career = Object.values(questionsDict_career)
    const keys_career = Object.keys(questionsDict_career)
    //#endregion   
    const valueSelection = ["selected"]
    const categorySelected = d3.select("#questionSelect_categories")

    const questionSelect_life = d3.select("#questionSelect_update")
    const questionOptions_life = questionSelect_life.selectAll("option")
        .data(questions_life)
        .enter().append("option")
        .text(function (d) {
            return d;
        })
        .attr("value", (d, i) => keys_life[i])
        .attr("class", "option_update")

    questionSelect_life.on("change", updateGridImages)

    categorySelected
        .on("change", UpdateQuestionGroup)

    // show the intro of "Personal Life" by default
    const introOfLife = d3.select("#updatedIntro_life");
    const introOfEducation = d3.select("#updatedIntro_education")
    const introOfCareer = d3.select("#updatedIntro_career")
    introOfLife.style("visibility", "visible");

    var selectedCategory = "life";
    function UpdateQuestionGroup() {
        ResetImgGallery();
        
        architect.attr("class", "architect")

        var SelectedCategory = d3.select(this).property("value")
        selectedCategory = SelectedCategory;

        if (SelectedCategory == "life") {
            $("option").remove(".option_update");
            const questionSelect_life = d3.select("#questionSelect_update")
            const questionOptions_life = questionSelect_life.selectAll("option")
                .data(questions_life)
                .enter().append("option")
                .text(function (d) {
                    return d;
                })
                .attr("value", (d, i) => keys_life[i])
                .attr("class", "option_update")

            questionSelect_life.on("change", updateGridImages);
            CleanIntro();
            introOfLife.style("visibility", "visible");
            

        } else if (SelectedCategory == "education") {
            $("option").remove(".option_update");
            const questionSelect_education = d3.select("#questionSelect_update")
            const questionOptions_education = questionSelect_education.selectAll("option")
                .data(questions_education)
                .enter().append("option")
                .text(function (d) {
                    return d;
                })
                .attr("value", (d, i) => keys_education[i])
                .attr("class", "option_update")

            questionSelect_education.on("change", updateGridImages);
            CleanIntro();
            introOfEducation.style("visibility", "visible");

        } else if (SelectedCategory == "career") {
            $("option").remove(".option_update");
            const questionSelect_career = d3.select("#questionSelect_update")
            const questionOptions_career = questionSelect_career.selectAll("option")
                .data(questions_career)
                .enter().append("option")
                .text(function (d) {
                    return d;
                })
                .attr("value", (d, i) => keys_career[i])
                .attr("class", "option_update")
                .attr("text-decoration", "underline")

            questionSelect_career.on("change", updateGridImages)
            CleanIntro();
            introOfCareer.style("visibility", "visible");
        }
        function ResetImgGallery() {
            d3.select("#education_11d").text("")
            pictures
              .attr("class", "otherProperty default")
              .attr("src", d => "img/default/" + d.default + ".png")
            SelectedQuestion = "default"
        }
    }

    function CleanIntro() {
        jQuery(".updatedIntro").css("visibility", "hidden");
    }

    //#region results of OptionChanged
    var SelectedQuestion;
    function updateGridImages() {

        // get the "value" of the selected option
        var selectedQuestion = d3.select(this).property("value")
        CleanIntro();
        if (selectedQuestion == "default"){
            if (selectedCategory == "life"){
                introOfLife.style("visibility", "visible");
            } else if (selectedCategory == "education"){
                introOfEducation.style("visibility", "visible");
            } else if (selectedCategory == "career"){
                introOfCareer.style("visibility", "visible");
            }
        } else {
            d3.select("#updatedIntro_" + selectedQuestion).style("visibility", "visible")
        }

        // pass the selected option to "SelectedQuestion"
        SelectedQuestion = selectedQuestion;
        update(selectedQuestion);

        // change class name when change default option
        if (selectedQuestion == "default") {
            architect.attr("class", "architect")
        } else {
            architect.attr("class", "Architect")
        }
        // update Intro
        const questionsWithMoreInfo = [
            "education_1",
            "education_2",
            "education_3",
            "travel",
            "work",
            "esTime",
        ]
        if ($.inArray(selectedQuestion, questionsWithMoreInfo) != -1) {
            d3.select("#education_11d")
                .text("Hover over the images to learn more info...")
            } else {
            d3.select("#education_11d")
                .text("")
        }
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
        .attr("class", "otherProperty default")
        .attr("id", d => "img" + d.index)
        .attr("src", d => "img/" + keys_life[0] + "/" + d.default + ".png")
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
        "img7",
        "img9",
        "img15",
        "img17",
        "img20",
        "img25",
        "img26",
        "img32",
        "img34",
        "img41",
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
    const originalImgPath = "img/work/Y.png"

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
            .attr("src", "img/default/" + d.default + ".png")

        if (SelectedQuestion == "work" && $.inArray(imgId, newWorkTogetherArray) != -1) {
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
                ImgRelatedPath_1 = "img/default/" + workTogetherDict[ImgRelated_1] + ".png";
                ImgRelatedPath_2 = "img/default/" + workTogetherDict[ImgRelated_2] + ".png"
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

            if ($.inArray(imgId, education_2imgArray) != -1) {
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
        if (SelectedQuestion == "work") {
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