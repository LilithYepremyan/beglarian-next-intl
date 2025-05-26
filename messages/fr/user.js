export default {
  profile: {
    title: 'Votre profil',
    saveButton: 'Enregistrer',
    cancelButton: 'Annuler',
    editButton: 'Modifier le profil',
    fields: {
      firstName: {
        label: 'Prénom',
        placeholder: '',
      },
      secondName: {
        label: 'Nom',
        placeholder: '',
      },
      phone: {
        label: 'Numéro de téléphone',
        placeholder: '',
      },
      email: {
        label: 'Email',
        placeholder: '',
      },
      vat: {
        label: 'TVA',
        placeholder: '',
      },
      deliveryAddress: {
        label: 'Adresse de livraison',
        placeholder: '',
        description: "Entrez l'adresse à laquelle la livraison sera effectuée",
      },
      invoiceAddress: {
        label: 'Adresse de facturation',
        placeholder: '',
        description:
          "Veuillez fournir l'adresse à laquelle vous souhaitez être facturé si elle est différente de votre adresse de livraison. Sinon, vous pouvez laisser le champ vide",
      },
    },
  },
  orders: {
    title: 'Commandes',
    orderCard: {
      status: 'Statut de la commande',
      composition: 'Composition de la commande',
      date: 'Date de la commande',
      updateDate: 'Date de mise à jour',
      weight: 'Poids estimé',
      view: 'Voir la commande',
    },
    placeholder: {
      title: 'Votre historique de commandes est vide',
      text: 'Prenez votre temps et explorez notre catalogue pour trouver le tissu qui vous convient.',
      visitCatalog: 'Visiter le catalogue',
    },
  },
  order: {
    title: 'Commande',
    summary: {
      yourOrder: 'Votre commande',
      status: 'Statut de la commande',
      count: 'Nombre de tissus',
      length: 'Longueur des tissus',
      weight: 'Poids estimé',
      total: 'Total',
    },
    fabricCard: {
      sum: 'Total',
    },
  },
  invoices: {
    title: 'Factures',
    invoiceCard: {
      discount: 'Réduction',
      date: 'Date',
      type: 'Type de commande',
      view: 'Voir la facture',
      payed: 'Payé',
      notPayed: 'Non payé',
    },
    placeholder: {
      title: 'Votre historique de factures est vide',
      text: 'Prenez votre temps et explorez notre catalogue pour trouver le tissu qui vous convient.',
      visitCatalog: 'Visiter le catalogue',
    },
  },
  invoice: {
    title: 'Facture',
    summary: {
      yourOrder: 'Votre commande',
      status: 'Statut de la commande',
      length: 'Longueur',
      balance: 'Solde',
      discount: 'Réduction',
      packings: 'Emballages',
      total: 'Total',
    },
  },
};
