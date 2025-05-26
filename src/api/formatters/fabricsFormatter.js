import fabricFormatter from './fabricFormatter';

export default function fabricsFormatter(unformattedData) {
  const {
    page,
    data,
    totalPages: pagesTotal,
    total: fabricsTotal,
    facets,
    ordering: sorts,
    currentOrdering: sortId,
  } = unformattedData.response || {};




  const optionFilters = facets.reduce((acc, facet) => {
    const options = facet.data.map(option => ({
      title: option?.value?.code ? `${option?.value?.code} - ${option?.value?.name}` : option?.value?.name,
      id: option?.value?.id,
      count: option.count,
    }));

    return {
      ...acc,
      [facet.tpe]: {
        title: facet.name,
        options,
      },
    };
  }, {});

  const fabrics = data.map(x => fabricFormatter(x));

  return {
    page,
    pagesTotal,
    fabricsTotal,
    fabrics,
    optionFilters,
    sorts,
    sortId,
  };
}
