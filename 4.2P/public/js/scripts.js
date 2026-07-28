const cardList = [
    {
    title: "goat",
    image: "images/jr.jpeg",
    link: "lebrawn",
    desciption: "embiid or bron"
    },
    {
    title: "cant believe",
    image: "images/cant.jpeg",
    link: "cant believe",
    desciption: "cant believe this is my life rn"
    }
]

const clickMe = () => {
    alert("chip or nah?")
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#clickMeButton').click(()=>{clickMe();})
});

const addCards = (items) => {items.forEach(item => {
let itemToAppend = '<div class="col s4 center-align">'+
'<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
'</div><div class="card-content">'+
'<span class="card-title activator white-text">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
'<div class="card-reveal">'+
'<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
'<p class="card-text">'+item.desciption+'</p>'+
'</div></div></div>';
$("#card-section").append(itemToAppend)
});}

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();
    console.log("Form Data Submitted: ", formData);
}


$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('.modal').modal();
    $('#clickMeButton').click(()=>{
    clickMe();
    })
    $('#formSubmit').click(() => {submitForm();})
    addCards(cardList);
});