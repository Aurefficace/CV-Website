<?php
if (isset($_POST["nom"]) && isset($_POST["prenom"]) && isset($_POST["email"]) && isset($_POST["message"]) && isset($_POST["rgpd"])) 
{


  if (empty($_POST["nom"]) || empty($_POST["email"]) || empty($_POST["prenom"]) || empty($_POST["message"]))
  {
    echo json_encode("Les champs marqués * sont obligatoires");
  }
  else 
  {

    if ( !preg_match( " /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/ " , $_POST["email"] ))
    {  echo json_encode("mail non valide"); }
    else
    {
      $message = utf8_decode($_POST["nom"]." a envoyé le message suivant : ".$_POST["message"]);
      $to = "aurelien.frois@gmail.com";
      $subject = "mail issu de mon formulaire";
      $from = $_POST["email"];
      $headers = "From:" . $from;
        if(mail($to,$subject,$message, $headers)){
        echo json_encode("Mail envoyé avec succès");
      }else{
        echo json_encode("Erreur sur ce mail :") ;
      }
    }
  }
}


?>