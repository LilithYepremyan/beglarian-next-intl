export default {
  co2disclaimer: `Grâce à cette commande, vous économiserez <strong>{{ co2 }}\xa0kg</strong> d'émissions de CO2, <strong>{{ ch4 }}\xa0kg</strong> d'émissions de CH4 et {{ water }}\xa0litres d'eau`,
  co2disclaimerShort: `Grâce à cette commande, vous économiserez <strong>{{ co2 }}\xa0kg</strong> d'émissions de CO2 et {{ water }}\xa0litres d'eau`,
  placeholder: {
    title: 'Votre panier est vide',
    text: 'Prenez votre temps et explorez notre catalogue pour trouver le tissu qui vous convient.',
    visitCatalog: 'Visiter le catalogue',
    visitOrders: 'À la liste des commandes',
  },
  card: {
    total: 'Total',
    delete: 'Supprimer du panier',
    edit: 'Modifier',
    sold: 'Épuisé',
    disclaimer: 'Veuillez noter que ce tissu est composé de plusieurs morceaux:',
    sample: 'Échantillon',
  },
  titles: {
    main: 'Panier',
    changed: 'A changé',
    sold: 'Épuisé',
    samples: 'Échantillons',
    delivery: 'Calcul de la livraison',
  },
  promoCode: {
    found:
      'Ce code promotionnel vous donne une remise de <strong>{{ currentDiscount }}</strong>. Le prix final sera déterminé par le conseiller, qui vous contactera après confirmation de la commande.',
    placeholder: 'Entrez le code promo',
    applyPromo: 'Appliquer le code promo',
    removePromo: 'Supprimer le code promo',
    error: 'Le code promo est invalide.',
    info: 'Code promo appliqué. Le prix final sera déterminé par le gérant, il vous contactera après confirmation de la commande',
  },
  checkout: {
    placeholder: {
      title: 'Commande pas trouvée ou en cours de traitement',
      text: 'Veuillez chercher dans la liste de commandes ou contacter le conseiller',
    },
    title: 'Votre commande',
    count: 'Total de tissus',
    cutsCount: 'Total de coupes',
    cutsDisclaimer: `Veuillez noter qu'il y a un tissu dans votre panier, composé de plusieurs morceaux`,
    meters: 'Longueur',
    weight: 'Poids',
    total: 'Total',
    confirm: 'Confirmer la commande',
    manager: 'Contacter le conseiller',
    delivery: 'Frais de livraison',
    minimumOrder: 'La commande minimale est de',
    save: 'Passer la commande',
    warehouse: "Adresse de l'entrepôt: 144 Allée des Caillotières, 69400 Gleizé, France",
    dimensions: 'Dimensions',
    offer: 'Compagnie de transport',
    offerNotFound: 'Aucune option de livraison trouvée',
    backToCart: 'Retour au panier',
    next: 'Plus loin',
    pay: 'Payer',
  },
  info: `Malheureusement, certains des tissus que vous avez ajoutés ne sont actuellement pas disponibles à la commande ou ont changé de disponibilité. Si vous avez des questions ou des problèmes, veuillez contacter notre service client.`,
  clearCart: 'Vider le panier',
  thanks: {
    title: `Merci pour votre commande !`,
    text: `Votre commande a été confirmée avec succès. Notre conseiller vous contactera sous peu pour discuter des détails.`,
  },
  confirmation: {
    title: 'Votre commande a été reçue',
    text: `Pour établir rapidement la facture, veuillez remplir le formulaire ci-dessous.`,
    manager: 'Contacter le conseiller',
    toCatalog: 'Vers catalogue',
    toOrders: 'À la liste des commandes',
    firstName: {
      label: 'Prénom',
    },
    secondName: {
      label: 'Nom',
    },
    delivery: {
      label: 'Livraison',
      description: `Indiquez le pays, la ville, l'adresse et le code postal pour la livraison`,
      country: {
        label: 'Pays de livraison',
      },
      city: {
        label: 'Ville de livraison',
      },
      address: {
        label: 'Adresse de livraison',
      },
      zipCode: {
        label: 'Code postal',
      },
    },

    invoice: {
      label: 'Adresse de facturation',
      description: `Spécifiez le pays, la ville, l'adresse et le code postal où la facture sera émise`,
      country: {
        label: 'Pays',
      },
      city: {
        label: 'Ville',
      },
      address: {
        label: 'Adresse',
      },
      zipCode: {
        label: 'Code postal',
      },
      sameAddress: `Identique à l'adresse de livraison`,
    },

    paymentMethod: {
      label: 'Mode de paiement',
      description: 'Veuillez choisir votre mode de paiement de la commande',
    },
    deliveryMethod: {
      label: 'Mode de livraison',
    },
    packageType: {
      label: `Type d'emballage`,
    },
    companyName: {
      label: `Nom de l'entreprise(si vous l'avez)`,
    },
    vat: {
      label: 'Numéro TVA',
      description: `Veuillez indiquer votre numéro TVA si vous l'avez`,
    },
    saveButton: 'Enregistrer',
  },
};
