/* eslint-disable max-len */

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'FAQ',
  main: {
    title: 'Principal',
    text: `
            La commande minimale est de {{ firstOrder }} €<br/>
            Longueur de coupe minimale : 3 mètres<br/>
            Prépaiement : 100%<br><br/>
            Livraison mondiale<br><br/> 
            TVA incluse pour les entreprises et particuliers français<br/>
        `,
  },
  reservation: {
    title: 'Réservation de tissus',
    text: `
        Nous tenons à vous expliquer nos règles de réservation d'articles dans votre panier pour rendre votre expérience d'achat plus agréable. Voici ce que vous devez savoir :
            <ul>
                <li>Chaque tissu que vous ajoutez à votre panier sera réservé pendant seulement <strong>{{ time }}, exclusivement pour vous.</strong> </li>
                <li>Après l'expiration du temps de réservation, d'autres utilisateurs pourront voir le tissu dans le catalogue et l'ajouter à leur propre panier. Cependant, le tissu restera dans votre panier, et vous pourrez l'acheter si vous le faites plus rapidement que les autres utilisateurs.</li>
                <li>Si un autre utilisateur achète le tissu qui était dans votre panier et que le temps de réservation a déjà expiré, malheureusement, vous ne pourrez plus le récupérer.</li>
            </ul>
            Nous espérons que ces règles vous aideront à comprendre le fonctionnement de notre système de réservation de tissus dans votre panier. Si vous avez des questions, veuillez contacter notre équipe d'assistance.
        `,
  },
  newsletter: {
    title: 'Newsletter',
    text: `
            Abonnez-vous à notre newsletter pour la recevoir chaque semaine par WhatsApp et par e-mail, sauf pendant nos périodes de vacances, dont vous serez informé à l'avance.
            <br/><br/>
            Si vous ne recevez aucun e-mail pendant plus de deux semaines, veuillez nous contacter. Il se peut que, en raison de problèmes techniques liés à WhatsApp, votre numéro ait été supprimé de la liste de diffusion.
        `,
  },
  same: {
    title: 'Peut-on commander à nouveau les mêmes tissus ?',
    text: `
            Les tissus en stock que nous vendons sont disponibles en quantités limitées. Si nous n'avons plus le tissu qui vous plaît en stock, nous ne pouvons pas passer de commande supplémentaire. 
            <br/><br/>
            Il existe certains articles que nous pouvons commander à l'usine, mais le coût est de 2 à 5 fois supérieur à ce que nous vous proposons sur notre site. De plus, chaque fabricant a ses propres exigences de commande minimale, qui peuvent varier de 6 à 10 mètres à 50, 100, voire 500 mètres. Veuillez garder cette information à l'esprit lorsque vous achetez un certain tissu que vous souhaitez peut-être commander à nouveau à l'avenir.
        `,
  },
  processing: {
    title: 'Traitement de la commande',
    text: `
            Une fois que vous recevez le message "Commande acceptée", cela signifie que nous avons vu et accepté votre commande. Si vous n'avez pas reçu ce message, veuillez nous contacter dès que possible. 
            <br/><br/>
            Ensuite, nous finaliserons votre commande et vous transmettrons une facture dans un délai de 1 à 2 jours ouvrables.
        `,
  },
  blue: {
    title: 'Coche bleue',
    text: "Veuillez noter que les messages que vous nous envoyez sont automatiquement marqués comme lus par le programme avec lequel nous travaillons. Les coches bleues à côté d'un message ne sont pas toujours une confirmation de lecture. Nous vous répondrons dès que possible!",
  },
  invoice: {
    title: 'Facture et Paiement',
    text: `
            Tous les prix sur le site sont indiqués hors TVA. Pour déterminer si vous devez payer la TVA à un taux de 20%, considérez ce qui suit :
                <ul>
                    <li>Si vous êtes en France, vous paierez toujours la TVA.</li>
                    <li>Si vous êtes dans l'Union européenne (voir la liste des pays*), vous ne paierez pas la TVA si vous avez un numéro de TVA. Vous paierez la TVA si vous n'avez pas de numéro de TVA.</li>
                    <li>Si vous êtes en dehors de l'Union européenne, vous ne paierez pas la TVA.</li>
                </ul>
            Veuillez noter que même si vous ne payez pas la TVA lors de l'achat de tissus, il se peut que vous soyez tenu de la payer dans votre pays lors de la réception de marchandises importées de l'Union européenne. Il est recommandé de vérifier auprès de votre bureau de douane local avant de passer votre commande.<br/><br/>
            <strong>Voici une liste des États membres de l'Union européenne :</strong><br/><br/>
            Allemagne, Autriche, Belgique, Bulgarie, Chypre, Croatie, Danemark, Espagne, Estonie, Finlande, France, Grèce, Hongrie, Irlande, Italie, Lettonie, Lituanie, Luxembourg, Malte, Pays-Bas, Pologne, Portugal, République tchèque, Roumanie, Slovaquie, Slovénie et Suède.
        `,
  },
  delivery: {
    title: 'Livraison',
    text: `
            Proposant une expédition mondiale, nous optimisons les coûts en superposant les tissus avant de les emballer dans du plastique d'exportation noir. Les dimensions de l'envoi sont mesurées et intégrées à notre agrégateur logistique pour trouver l'option d'expédition la plus économique.
            <br /><br />
            En tant que seule entreprise dans notre domaine à fonctionner selon les termes de l'EX WORKS, nous simplifions votre processus d'achat en mettant les tissus à votre disposition dans nos locaux, assurant la responsabilité des marchandises jusqu'à leur départ de notre entrepôt. 
            <br /><br />
            Il est à noter que nous ne sommes pas responsables des coûts et des risques liés au transport depuis notre établissement jusqu'à l'adresse finale de livraison. Néanmoins, soyez assuré(e) que nous mettrons tout en œuvre pour résoudre tout problème lié à votre commande s'il venait à se présenter.
        `,
  },
  minimal: {
    title: 'Commande minimale',
    text: `Le montant minimum est de {{ firstOrder }} €. La coupe minimale est fixée pour chaque type de tissu séparément, en fonction du prix. Par exemple, nous vendons des tissus bon marché à partir de 10-15 mètres, moyens - à partir de 5 mètres, et chers - à partir de 3 mètres. Les achats en dessous du minimum établi sont négociés individuellement.`,
  },
  cut: {
    title: 'Écarts de longueur de coupe',
    text: `
            Voici quelques lignes directrices concernant les écarts de longueur de coupe :
            <ul>
                <li>La métrage réelle sur la facture peut différer de la quantité commandée jusqu'à 2 mètres.</li>
                <li>Les écarts de plus de 2 mètres doivent être convenus individuellement.</li>
                <li>L'écart de longueur peut aller jusqu'à 3% de la longueur de coupe.</li>
                <li>Une coupe peut être composée de deux parties, mais la plus petite partie ne doit pas être inférieure à 3 mètres.</li>
                <li>Dans des cas exceptionnels, certains tissus peuvent manquer en raison des caractéristiques du deadstock.</li>
            </ul>
        `,
  },
  defects: {
    title: 'Défauts acceptables',
    text: `
            <ul>
                <li>Un défaut est considéré comme un changement anormal visible sur l'endroit du tissu, à une distance de plus de 5 cm des bords. Les exemples incluent la teinture incorrecte, l'impression erronée, les pics serrés, les coupures, les taches, les mailles lâchées, etc.</li>
                <li>Les changements légèrement visibles ne sont pas considérés comme des défauts.</li>
                <li>Nombre de défauts acceptable : 1 défaut par 10 mètres de tissu.</li>
                <li>Les compensations et les retours pour chaque cas seront convenus individuellement.</li>
            </ul>
        `,
  },
};
