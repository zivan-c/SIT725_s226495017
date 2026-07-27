const clickMe = () => { alert("Lebron will be going back to Cleveland.")};
$(document).ready(function(){$('.materialboxed').materialbox();
$('#clickMeButton').click(()=>{clickMe();})});