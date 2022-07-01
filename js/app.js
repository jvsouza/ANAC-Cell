/*
    https://stackoverflow.com/questions/42218699/chrome-violation-violation-handler-took-83ms-of-runtime
*/

// ...
const letter_up = ["A", "B", "C", "D"];
const baseUrl = 'https://raw.githubusercontent.com/jvsouza/ANAC-Cell/main/json/';
//const baseUrl = 'http://localhost/ANAC-Cell/json/';
const coursesUpdated = {
    "courses_updated":[
        {"file_json":"cel01", "course_unit":"Technical English"},
        {"file_json":"cel03", "course_unit":"Fabricing"},
        {"file_json":"cel04", "course_unit":"Coating, Painting And Finishing Of Aircraft"},
        {"file_json":"cel05", "course_unit":"Repairs To Metallic Structures"},
        {"file_json":"cel06", "course_unit":"Welding In Aircraft"},
        {"file_json":"cel07", "course_unit":"Advanced Compound Materials"},
        {"file_json":"cel10", "course_unit":"Communication And Navigation Systems"},
        {"file_json":"cel11", "course_unit":"Hydraulic And Landing Gear System"},
        {"file_json":"cel12", "course_unit":"Protection Systems Against The Effects Of Ice And Rain And Against Fire"},
        {"file_json":"cel13", "course_unit":"Pneumatic And Cabin Environment Control Systems"},
        {"file_json":"cel_aerotd_2020-2", "course_unit":"Mock exam :: Aerotd 2020-2"},
    ]
};
var questions_available = [];

// ...
function createList() {
    let questions = questions_available.questions;
    if ( questions != null ){
        var list = '<ul class="ulTop list-group">';
        var letter = '';
        for (var n=0; n < questions.length ; n++) {
            list += '<li class="liTop list-group-item" data-li="'+n+'">';   
                list += '<ul class="ulMid list-group">';
                    list += '<li class="liMed title list-group-item">';
                        list += '<div class="row">';
                            list += '<div class="col-1 text-center align-items-center justify-content-center d-inline-flex"><label>';
                                list += parseInt(n+1, 10);
                            list += '</label></div>';
                            list += '<div class="col-9">';
                                list += questions[n].title;
                            list += '</div>';
                            list += '<div class="col-2">';
                                list += '<button type="button" class="btn btn-outline-primary w-100 h-100" data-question="'+ n +'"></button>';
                            list += '</div>';
                        list += '</div>';
                    list += '<li class="liMed options">';
                        list += '<div class="list-group" data-select="'+n+'">';
                            for (var i = 0; i < questions[n].options.length; i++) {
                                list += '<button type="button" class="list-group-item list-group-item-action" value="'+ i +'">' + letter_up[i] + ': '+ questions[n].options[i] + '</button>';
                            }
                        list += '</div>';
                    list += '</li>';
                list += '</ul>';
            list += '</li>';
        }
        list += '</ul>';
        $("#questions").append(list);
    }
}

// ...
function getJson( nameFileJson ) {
    fetch(nameFileJson)
    .then(question_file => {
        return question_file.json(); 
    })
    .then( questions_loaded => {
        questions_available = questions_loaded;
        createList();
    })
    .catch( err => {
        console.error(err);
    })
}

// ...
function createSelect( baseUrl, cu ){
    var options = '<option value="title" selected>Select content</option>';
    for (var n=0; n < cu.courses_updated.length ; n++) {
        jsonUrl = baseUrl + cu.courses_updated[n].file_json + '.json'
        courseUnit = cu.courses_updated[n].course_unit;
        options += '<option value="' + jsonUrl + '">' + courseUnit + '</option>';
    }
     $("#select").append(options);
}

// ...
$(document).ready(function(){
    // ...
    $(document).on('click','.btn', function() {
        let questionNumber = $(this).data('question');
        let correctOption = questions_available[questionNumber].result;
        $("li[data-li="+questionNumber+"] li.options div button[value="+correctOption+"]").addClass( "optionCorrect" );
    });

    // ...
    $(document).on("change","#select",function(){
        let nameJson = $(this).val();
        $("#questions").empty();
        if (nameJson != 'title'){
            getJson(nameJson);
        }
    });

    // ...
    createSelect( baseUrl, coursesUpdated );
});
