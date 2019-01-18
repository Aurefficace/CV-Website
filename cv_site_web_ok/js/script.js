//loader
$(window).load(function() {
$('.loader').show().delay(1500).fadeOut(300);
});
//fin loader

$(document).ready(function(){
	
//défilement fluide
$(document).on('click', 'a[href^="#"]', function (event) {
       event.preventDefault();

       $('html, body').animate({
           scrollTop: $($.attr(this, 'href')).offset().top
       }, 1500);
   });
//menu hamburger
		$('.menu-toggle').click(function() {

  		$('ul').toggleClass('opening');
  		$(this).toggleClass('open');
  		

});

//mentions légales
$(".click_pop").click(function(){
	$(".pop_up_mentions").fadeIn(300);
	$(".fond_pop_up").fadeIn(300);
});
$(".cancel").click(function(){
	$(".pop_up_mentions").fadeOut(300);
	$(".fond_pop_up").fadeOut(300);
});
//mentions legales fin

//politique de confidentialité
$(".click_pop_2").click(function(){
	$(".pop_up_conf").fadeIn(300);
	$(".fond_pop_up").fadeIn(300);
});
$(".cancel").click(function(){
	$(".pop_up_conf").fadeOut(300);
	$(".fond_pop_up").fadeOut(300);
});
//fin politique de confidentialité


//menu volant
if (window.matchMedia("(min-width: 64em)").matches) {
		$(window).scroll(function(){
			if ($("#accueil").visible(true)) {
				$(".menu_volant").slideUp();
				$(".up").slideUp();

			}
			else {
				$(".menu_volant").slideDown();
				$(".menu_volant").css("display","flex");
				$(".up").slideDown();
				$(".up").css("display","flex");
			}
		});
	}
$(".closeButton").click(function(){
	$(".menu_volant").slideUp();
});
//fin de menu volant


// Repetition des animations
   var $body = $('body');
   var $box = $('.box');
  for (var i = 0; i < 20; i++) {
  $box.clone().appendTo($body);
    }

 // Helper function for add element box list in WOW
 WOW.prototype.addBox = function(element) {
 this.boxes.push(element);
};

// Init WOW.js and get instance
var wow = new WOW();
wow.init();

// Attach scrollSpy to .wow elements for detect view exit events,
// then reset elements and add again for animation
 $('.wow').on('scrollSpy:exit', function() {
$(this).css({
 'visibility': 'hidden',
 'animation-name': 'none'
}).removeClass('animated');
wow.addBox(this);
}).scrollSpy();

wow = new WOW(
	{
	 boxClass:     'wow',      // default
	 animateClass: 'animated', // default
 	 offset:       0,          // default
     mobile:       true,       // default
	 live:         true        // default
	}
)
wow.init();
//fin de la repetition des animations


//verification du formulaire
$("#submit").click(function(e){
		e.preventDefault();
		var nom = $("#nom").val();
		var prenom = $("#prenom").val();
		var email = $("#emailform").val();
		var message = $("#message").val();
		var rgpd = $("#checkbox").is(':checked');
		var myRegex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
		if (!isNaN(nom) || nom.length == 0)
		{
		$("#result").html("Le nom ne peut être numérique et est obligatoire ");	
		}
		else
		{	if (!isNaN(prenom) || prenom.length == 0)
				{
				$("#result").html("Le prenom ne peut être numérique et est obligatoire");	
				}
				else
				{
			if (!myRegex.test(email))
			{
			$("#result").html("Le format de mail n'est pas correct");	
			}
			else
			{
					if (message.length==0) {
						$("#result").html("Le message est obligatoire ");
					} else {
						if (!$("#checkbox").is(':checked'))
					{
					$("#result").html("Merci valider notre politique de confidentialité des données ");	
					}
					else
					{					
						$.ajax({
						url : 'https://www.aurelien-frois.fr/fonction/envoi.php',
						type : 'POST',
						data : { "nom" : nom, "email" : email, "prenom" : prenom, "message" : message, "rgpd" : rgpd },
						dataType : 'json',
						success : function(donnees, statut){ // success est toujours en place, bien sûr !
						$("#result").html(donnees);
						},
						error : function(resultat, statut, erreur){
						$("#result").html("erreur : "+erreur+" status : "+status);	
						}
						});
						}
					}
				}
			}
		}

});


//test organit particules en mouvement
var mousePosX;
var mousePosY;
var mousePosVersion = 0;

function catchMousePosition(evt){
    mousePosX = evt.pageX;
    mousePosY = evt.pageY;
    mousePosVersion += 1;
}
document.onclick = catchMousePosition;

function selectGene(){
    return String(Math.ceil(Math.sqrt(Math.ceil(Math.random()*25))));
}

var organites = [];
var organiteSpeedMultiplier = 1;

function organiteToggleSpeed(){
    organiteSpeedMultiplier = organiteSpeedMultiplier == 1 ? 2 : 1;
}

var organitesInMotion = true;
function toggleAllOrganites(){
    if(organitesInMotion)
        stopAllOrganites();
    else
        startAllOrganites();
}

function startAllOrganites(){
    for(var i=organites.length;i--;){organites[i].start();}
    organitesInMotion = true;
}

function stopAllOrganites(){
    for(var i=organites.length;i--;){organites[i].stop();}
    organitesInMotion = false;
}

function destroyAllOrganites(){
    for(var i=organites.length;i--;){organites[i].destroy();}
    organites = [];
}

var Organite = function(geneA, geneC, geneD){
    this.geneA = geneA ? geneA : selectGene();
    // this.geneB = geneB ? geneB : selectGene();
    this.geneC = geneC ? geneC : selectGene();
    this.geneD = geneD ? geneD : selectGene();

    this.posVersion = 0;
    this.animation = null;

    this.place = function(posX, posY){
        body_w = $('#organite').width();
        body_h = $('#organite').height();
        if(!posX) posX = Math.ceil(Math.random()*body_w);
        if(!posY) posY = Math.ceil(Math.random()*body_h);
        this.node = $(document.createElement('div'))
        .addClass("organite geneA_" + this.geneA + " geneC_" + this.geneC)
        .css({top: posY, left: posX})
        .append($(document.createElement('div'))
            .addClass("core core" + this.geneD)
        );

        $('#organite').append(this.node);


        this.bringOrganiteToLife();
        organites.push(this);
    }
    this.stop = function(){
        this.animation.stop();
    }
    this.destroy = function(){
        this.animation.stop();
        $(this.node).remove();
    }
    this.start = function(){
        this.animation.play();
    }
    this.bringOrganiteToLife = function(){
        body_w = $('#organite').width();
        body_h = $('#organite').height();

        if(this.posVersion < mousePosVersion){
            this.posVersion = mousePosVersion;
            x_pos = mousePosX;
            y_pos = mousePosY;
        }
        else{
            x_pos = Math.ceil(Math.random() * body_w);
            y_pos = Math.ceil(Math.random() * body_h);
        }
        var self = this;

        $(this.node).animate(
            {top:y_pos,left:x_pos}
        ,
            {
                duration:(10000 + 20000 * Math.random()),
                complete: function(){self.bringOrganiteToLife()}
            }
        );
    }
}

$(function(){
  $('#organite').css('height', $("body").height() || $(window).height );
  for (i=0; i <= 15; i++) {
    (new Organite()).place();
  };
});






});
//fin du document ready






// //fonction pour verifier le formulaire
// function veriform1() {

// 	var form1= document.getElementById('form1');
// 	var result= document.getElementById('result');
// 	var myRegex= /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/
// 	result.innerHTML= "";
// 	if (form1.nom.value.length==0) {
// 		result.innerHTML= "Le nom est obligatoire";
// 		return false;
// 	}
// 	if (!isNaN(form1.nom.value)) {
// 		result.innerHTML= "Le nom ne peut pas être numérique";
// 		return false;
// 	}
// 	if (form1.prenom.value.length==0) {
// 		result.innerHTML= "Le prénom est obligatoire";
// 		return false;
// 	}
// 	if (!isNaN(form1.prenom.value)) {
// 		result.innerHTML= "Le prénom ne peut pas être numérique";
// 		return false;
// 	}
// 	if (form1.message.value.length==0) {
// 		result.innerHTML= "Merci de saisir votre message";
// 		return false;
// 	}
// 	if(!myRegex.test(form1.adressemail.value)) {
// 			result.innerHTML="Merci de saisir un format de mail valide";
// 			return false;
// 		}
	
// 	if(form1.confidential.checked==true){
// 		return false;
// 		}
// 		else {
//     	result.innerHTML="Merci de cocher notre politique de confidentialité";
// 		return false;
// 		}
// };	