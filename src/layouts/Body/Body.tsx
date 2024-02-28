import { useEffect, useState } from "react";
import styles from "./Body.module.scss";
import { useGetAllPokemonsQuery } from "../../store/slices/pokemonSlice";
import { IPokemon } from "../../Types";

import StyledDiv from "../../components/Div.style";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import StyledButton from "../../components/Button.style";
import { useDispatch, useSelector } from "react-redux";
import { SelectorType } from "../../store/reducers";
import { useDebounce } from "../../hooks/useDebounce";
import { PacmanLoader } from "react-spinners";
import { actions as modalActions } from "../../store/slices/modalSlice";
import { actions as searchActions } from "../../store/slices/searchSlice";

const Body = () => {
  const dispatch = useDispatch();
  const className = classNames.bind(styles);
  const navigate = useNavigate();
  const filter = useSelector((state: SelectorType) => state.search.searchField);
  const isSearching = useSelector(
    (state: SelectorType) => state.search.isLoading
  );
  const isOpen = useSelector((state: SelectorType) => state.modal.isOpen);
  const currentPokemon = useSelector(
    (state: SelectorType) => state.search.currentPagePokemon
  );

  const debouncedSearch = useDebounce(filter!);
  const [page, setPage] = useState<number>(0);
  const [notFound, setNotFound] = useState<boolean>(false);
  const {
    data: pokemons,
    isLoading,
    refetch,
  } = useGetAllPokemonsQuery(page, {
    refetchOnMountOrArgChange: page,
  });

  useEffect(() => {
    if (
      pokemons?.results.filter((item: IPokemon) => {
        if (!filter) {
          return item;
        }
        if (item.name.includes(debouncedSearch!)) {
          return item;
        }
      }).length === 0
    ) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
    refetch();
  }, [page, debouncedSearch]);

  const backPageHandler = () => {
    setPage((prev) => prev - 9);
    dispatch(searchActions.nextPage(-9));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  const nextPageHandler = () => {
    setPage((prev) => prev + 9);
    dispatch(searchActions.nextPage(9));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={() => {
        if (isOpen) {
          dispatch(modalActions.closeModal());
          return;
        }
      }}
    >
      <div className={className("container", { close: isOpen })}>
        {isLoading || isSearching ? (
          <div className={className("loader")}>
            <PacmanLoader />
          </div>
        ) : (
          <div className={className("container_pokemons_list")}>
            {/* Not Found Result */}
            {notFound && <p className={className("not-found")}>Not Found</p>}
            {/* Found result */}
            {!notFound &&
              pokemons?.results
                .filter((item: IPokemon) => {
                  if (!filter) {
                    return item;
                  }
                  if (item.name.includes(debouncedSearch!)) {
                    return item;
                  }
                })
                .map((pokemon: IPokemon, index: number) => (
                  <StyledDiv
                    key={pokemon.name}
                    onClick={() => navigate(`/${currentPokemon + index}`)}
                  >
                    {pokemon.name}
                  </StyledDiv>
                ))}
          </div>
        )}
        <br />
        <div className={className("container_buttons", { disabled: isOpen })}>
          {page / 20 <= (pokemons?.count! - 20) / 20 &&
            !notFound &&
            !isSearching && (
              <StyledButton
                disabled={
                  !(page / 8 <= (pokemons?.count! - 8) / 8) || isLoading
                }
                onClick={nextPageHandler}
              >
                Next
              </StyledButton>
            )}
          {"     "}
          {!(page === 0) && !isSearching && !notFound && (
            <StyledButton
              disabled={page === 0 || isLoading}
              onClick={backPageHandler}
            >
              Back
            </StyledButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
