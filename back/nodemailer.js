const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
service: "Gmail",
auth: {
    user: "eskandersysteme@gmail.com",
    pass: "cqvg cyir iuuy csvp",
},
});

module.exports.sendConfirmationEmail = (email , activationCode ) => {
transport
.sendMail({
from: "eskandersysteme@gmail.com",
to: email,
subject: "Confirmer votre compte",
html: `<h1>Email de Confirmation</h1>
<h2>Bonjour </h2>
<p>Pour activer votre compte , veuillez cliquer sur ce lien </p>
<a href=http://localhost/confirm/${activationCode}> Cliquer ici | </a>
</div>`,
})
.catch((err) => console.log(err));
};


module.exports.sendPostule = (email , titre , prenom , id ) => {
    transport
    .sendMail({
    from: "eskandersysteme@gmail.com",
    to: email,
    subject: "Vous étes postuler avec succés",
    html: `
    <h2>Bonjour </h2>
    <p> Cher/Chère ${prenom},</p>
    <p>Nous avons bien reçu votre CV et votre lettre de motivation pour la poste <strong> ${titre} </strong> et nous les examinerons
     attentivement dans les prochains jours.
     Nous reviendrons vers vous dès que possible 
     pour vous informer de la suite du processus de recrutement.
     mais d'abord vous devez passer un test d'intelligence (IQ) en ligne  dans une date limite qui ne dépasse 3 jours dés maintenant 
     pour commencer le test merci de visiter <a href=http://localhost:4200/test/${id}> ce lien </a> ( notez bien que la durée de ce test est 10 min max)
    Merci encore pour votre candidature et votre patience</p>
    
    </div>`,
    })
    .catch((err) => console.log(err));
    };
    module.exports.sendentretien = (email, titre, lien, date, heure) => {
      const formattedDate = new Date(date).toLocaleDateString('fr-FR'); // Format de date personnalisé
    
      transport
        .sendMail({
          from: "eskandersysteme@gmail.com",
          to: email,
          subject: "Convocation à un entretien",
          html: `
          <h2>Bonjour,</h2>
          <p>Nous sommes heureux de vous informer que vous avez été convoqué(e) à un entretien pour le poste de <strong>${titre}</strong>.</p>
          <p>Date de l'entretien : ${formattedDate}</p>
          <p>Heure de l'entretien : ${heure}</p>
          <p>Vous trouverez le lien pour accéder à l'entretien ci-dessous :</p>
          <p><a href=${lien}>Cliquez ici pour accéder à l'entretien</a></p>
          <p>Nous vous prions d'être ponctuel(le) et de vous préparer pour cet entretien.</p>
          <p>Nous vous remercions pour l'intérêt que vous portez à notre entreprise et nous avons hâte de vous rencontrer.</p>
          <p>Cordialement,</p>
          <p>L'équipe de recrutement</p>
          </div>`,
        })
        .catch((err) => console.log(err));
    };
    



      module.exports.sendupdateentretien = (email, titre, lien, date, heure) => {
        transport
          .sendMail({
            from: "eskandersysteme@gmail.com",
            to: email,
            subject: "Mise à jour entretien",
            html: `
            <h2>Bonjour,</h2>
            <p>Cher/Chère candidat,</p>
            <p>La date et l'heure de votre entretien pour le poste <strong>${titre}</strong> ont été mises à jour.</p>
            <p>La nouvelle date est ${date} et l'heure est ${heure}.</p>
            <p>Vous pouvez accéder à votre entretien en suivant ce lien : <a href="${lien}">Cliquer ici</a>.</p>
            `,
          })
          .catch((err) => console.log(err));
      };
  
      module.exports.sendAnnulationEntretien = (email, titre, date, heure) => {
        transport
          .sendMail({
            from: "eskandersysteme@gmail.com",
            to: email,
            subject: "Annulation d'entretien",
            html: `
            <h2>Bonjour</h2>
            <p>Cher/Chère candidat,</p>
            <p>Nous regrettons de vous informer que l'entretien pour le poste <strong>${titre}</strong> prévu le ${formatDate(date)} à ${heure} a été annulé.</p>
            <p>Nous vous prions de nous excuser pour ce désagrément et nous vous remercions pour votre compréhension.</p>
            </div>`,
          })
          .catch((err) => console.log(err));
      };
      
      function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      }
      

    module.exports.sendPreselection = (email , titre , prenom ) => {
        transport
        .sendMail({
        from: "eskandersysteme@gmail.com",
        to: email,
        subject: "Candidature Présélectionnée",
        html: `
        <h2>Bonjour </h2>
      <div>  
        <p> Cher/Chère ${prenom},</p>

        <p> Nous sommes ravis de vous informer que votre candidature pour le poste de <strong> ${titre} </strong>  a été présélectionnée. Nous avons été impressionnés par votre parcours et vos qualifications,
    et nous aimerions vous inviter à passer à la prochaine étape du processus de recrutement.
    Nous vous contacterons sous peu pour organiser un entretien afin de discuter plus en détail 
    de votre expérience et de vos compétences. En attendant, si vous avez des questions, n'hésitez pas à nous contacter.
    Félicitations et à bientôt !
    <p> Cordialement, </p>
    </div>`,
        })
        .catch((err) => console.log(err));
        };


        module.exports.sendAccepte = (email , titre , prenom  ) => {
            transport
            .sendMail({
            from: "eskandersysteme@gmail.com",
            to: email,
            subject: "Candidature Acceptée",
            html: `
            <h2>Bonjour </h2>
            <div>  
              <p> Cher/Chère ${prenom},</p>
      
              <p>Nous avons le plaisir de vous informer que votre candidature pour le poste de <strong> ${titre} </strong>
             a été acceptée. Nous sommes convaincus que vous apporterez une contribution 
              précieuse à notre équipe et nous sommes impatients de vous accueillir parmi nous.

              Nous vous contacterons sous peu pour discuter des détails relatifs à votre intégration et à votre entrée 
              en fonction. En attendant, si vous avez des questions, n'hésitez pas à nous contacter.
              
              Félicitations et bienvenue dans notre équipe !
              
              <p> Cordialement, </p>
          </div>`,
            })
            .catch((err) => console.log(err));
            };



            module.exports.sendRefuse = (email , titre , prenom) => {
                transport
                .sendMail({
                from: "eskandersysteme@gmail.com",
                to: email,
                subject: "Candidature Refusée",
                html: `
                <h2>Bonjour </h2>
      <div>  
        <p> Cher/Chère ${prenom},</p>

        <p>Nous vous remercions pour l'intérêt que vous avez manifesté pour le poste de <strong> ${titre} </strong> .
         Après avoir examiné attentivement votre candidature, nous regrettons de vous
          informer que nous avons décidé de ne pas poursuivre le processus avec votre candidature.
        Nous vous souhaitons beaucoup de succès dans vos recherches futures et espérons avoir l'opportunité de collaborer à l'avenir.
        
        <p>Cordialement, </p>
    </div>`,
                })
                .catch((err) => console.log(err));
                };