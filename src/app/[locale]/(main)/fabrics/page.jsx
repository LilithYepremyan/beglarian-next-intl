"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import AddToCartModal from "@/components/AddToCartModal";
import Banner from "@/components/Banner";
import CO2Modal from "@/components/CO2Modal";
import FabricCard from "@/components/FabricCard";
import FabricChangedModal from "@/components/FabricChangedModal";
import { FabricSearch, filters } from "@/components/FabricSearch";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import Placeholder from "@/components/Placeholder";
import FabricCardSkeleton from "@/components/skeletons/FabricCardSkeleton";
import { events, track } from "@/metrics";
import {
  addFabricToCart,
  addFabricToWishlist,
  fetchFabrics,
  removeFabricFromWishlist,
  resetState,
  setIsAddToCartModalOpen,
  setIsFabricChangedModalOpen,
  setIsFilterOpen,
} from "@/store/slices/fabricsPageSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AddToCartModal from "@/components/AddToCartModal";
import { useTranslations } from "next-intl";

function Fabrics() {
  const dispatch = useDispatch();
  const tCommon = useTranslations("common");

  const [isCO2ModalOpen, setIsCO2ModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const storedItemsPerPage = localStorage.getItem("bfItemsPerPage");
    if (storedItemsPerPage) {
      setItemsPerPage(Number(storedItemsPerPage));
    }
  }, []);

  const {
    data: {
      pagesTotal,
      fabrics,
      page,
      optionFilters,
      sorts,
      sortId = null,
      fabricsTotal = 0,
    },
    isLoading,
    isAddToCartLoading,
    isFilterOpen,
    addedFabricId,
    isAddToCartModalOpen,
    isFabricChangedModalOpen,
    fabricChangedInfo,
  } = useSelector((state) => state.fabricsPage);

  const {
    data: { isLoggedIn, reservationTimeoutInMinutes },
  } = useSelector((state) => state.user);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateSearchParams = (params) => {
    const newSearchParams = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const [needFiltersReset, setNeedFiltersReset] = useState(false);

  const filterNames = Object.keys(filters);

  const filterValuesFromSearchParams = filterNames.reduce((acc, filterName) => {
    const filterValue = searchParams.getAll(filterName)[0];

    if (!filterValue) {
      return acc;
    }

    return {
      ...acc,
      [filterName]: filterValue.split(","),
    };
  }, filters);

  const [currentFilters, setCurrentFilters] = useState(
    filterValuesFromSearchParams
  );
  const [searchString, setSearchString] = useState("");

  const onSearchStringChange = (newSearchString) => {
    updateSearchParams({ page: 1 });

    setSearchString(newSearchString);

    dispatch(
      fetchFabrics({
        page: 1,
        filters: currentFilters,
        sort: sortId,
        itemsPerPage,
        searchString: newSearchString,
      })
    );
  };

  const onSortChange = (newSortId) => {
    updateSearchParams({ sort: newSortId, page: 1 });

    dispatch(
      fetchFabrics({
        page: 1,
        filters: currentFilters,
        sort: newSortId,
        itemsPerPage,
        searchString,
      })
    );
  };

  const onItemsPerPageChange = (count) => {
    setItemsPerPage(count);
    localStorage.setItem("bfItemsPerPage", count);

    updateSearchParams({ page: 1 });

    dispatch(
      fetchFabrics({
        page: 1,
        filters: currentFilters,
        sort: sortId,
        itemsPerPage: count,
        searchString,
      })
    );
  };

  const onPageChange = (newPage) => {
    updateSearchParams({ page: newPage });

    dispatch(
      fetchFabrics({
        page: newPage,
        filters: currentFilters,
        sort: sortId,
        itemsPerPage,
        searchString,
      })
    );
  };

  const onFiltersChange = (values) => {
    const newFilters = Object.fromEntries(
      Object.entries(values).filter(
        ([_, value]) => Number.isFinite(value) || value?.length
      )
    );
    updateSearchParams({ ...newFilters, page: 1 });

    dispatch(
      fetchFabrics({
        page: 1,
        filters: values,
        sort: sortId,
        itemsPerPage,
        searchString,
      })
    );

    setCurrentFilters(values);
  };

  useEffect(() => {
    dispatch(
      fetchFabrics({
        page: Number(searchParams.get("page")) || page,
        filters: filterValuesFromSearchParams,
        sort: Number(searchParams.get("sort")) || sortId,
        itemsPerPage,
        searchString,
      })
    );

    return () => {
      dispatch(resetState());
    };
  }, []);

  const cartAction = (id, length) => {
    dispatch(addFabricToCart({ id, length }));
  };

  const wishlistAction = (id, like) => {
    if (like) {
      dispatch(addFabricToWishlist({ id }));
    } else {
      dispatch(removeFabricFromWishlist({ id }));
    }
  };

  useEffect(() => {
    if (!fabrics[0]) {
      return;
    }

    track(events.fabricsPage.shown, {
      page,
      currentFilters,
      sortId,
      itemsPerPage,
      searchString,
    });
  }, [page, currentFilters, sortId, fabricsTotal]);
  console.log(optionFilters);
  return (
    <>
      <PageHeader title={tCommon("fabrics.title")} isLoading={false} />

      {/* <Banner  sx={{ mb: "16px", mt: "-20px" }} location="fabrics" /> */}

      <FabricSearch
        isLoading={isLoading}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={(isOpen) => {
          dispatch(setIsFilterOpen(isOpen));
        }}
        fabricsTotal={fabricsTotal}
        optionFilters={optionFilters}
        initialFilterValues={filterValuesFromSearchParams}
        onFiltersChange={onFiltersChange}
        onSortChange={onSortChange}
        currentSortId={Number(sortId)}
        onSearchStringChange={onSearchStringChange}
        setNeedFiltersReset={setNeedFiltersReset}
        needFiltersReset={needFiltersReset}
        sorts={sorts}
        sx={{ mb: "24px" }}
      />

      {!!fabrics?.length && (
        <>
          <Grid
            container
            spacing={3}
            sx={{ width: "100%", justifyContent: "center" }}
          >
            {fabrics.map((props, i) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={props?.id || page + i}
                sx={{
                  maxWidth: "300px",
                  display: "grid",
                  justifyItems: "center",
                  alignItems: "start",
                }}
              >
                {!isLoading && props ? (
                  <FabricCard
                    {...props}
                    isLoading={isAddToCartLoading && addedFabricId === props.id}
                    isUnAuth={!isLoggedIn}
                    reservationTimeoutInMinutes={reservationTimeoutInMinutes}
                    cartAction={cartAction}
                    wishlistAction={wishlistAction}
                    openCO2Modal={() => {
                      setIsCO2ModalOpen(true);
                    }}
                  />
                ) : (
                  <FabricCardSkeleton />
                )}
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: "32px" }}>
            <Pagination
              current={page}
              to={pagesTotal}
              handlePageChange={onPageChange}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
            />
          </Box>
        </>
      )}

      {!fabrics?.length && (
        <Placeholder onClearFilters={() => setNeedFiltersReset(true)} />
      )}

      <AddToCartModal
        isOpen={isAddToCartModalOpen}
        close={() => dispatch(setIsAddToCartModalOpen(false))}
      />

      {isFabricChangedModalOpen && (
        <FabricChangedModal
          isOpen={true}
          fabricChangedInfo={fabricChangedInfo}
          close={() => {
            dispatch(setIsFabricChangedModalOpen(false));
          }}
          onAddClick={(length) => {
            cartAction(addedFabricId, length);
          }}
        />
      )}

      <CO2Modal
        reservationTimeoutInMinutes={reservationTimeoutInMinutes}
        isOpen={isCO2ModalOpen}
        close={() => setIsCO2ModalOpen(false)}
      />
    </>
  );
}

export default Fabrics;
