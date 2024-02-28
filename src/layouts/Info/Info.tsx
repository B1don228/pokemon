import { useEffect } from "react";
import styles from "./Info.module.scss";
import { useGetOnePokemonQuery } from "../../store/slices/pokemonSlice";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { IAbility } from "../../Types";
import { IoCaretBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { SelectorType } from "../../store/reducers";
import { actions as modalActions } from "../../store/slices/modalSlice";
import { actions as searchActions } from "../../store/slices/searchSlice";

const Info = () => {
  const className = classNames.bind(styles);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const idNumber = Number(id);
  const isOpen = useSelector((state: SelectorType) => state.modal.isOpen);

  const {
    data: pokemon,
    isLoading,
    refetch,
  } = useGetOnePokemonQuery(idNumber, {
    refetchOnMountOrArgChange: idNumber,
  });

  useEffect(() => {
    refetch();
  }, [id]);

  return (
    <div
      onClick={() => {
        if (isOpen) {
          dispatch(modalActions.closeModal());
          return;
        }
      }}
    >
      <div className={className("container", { disabled: isOpen })}>
        <div className={className("container_content")}>
          <div
            onClick={() => {
              dispatch(searchActions.nullPage());
              navigate("/");
            }}
            className={className("back_arrow")}
          >
            <IoCaretBack size={20} />
          </div>
          <div className={className("container_content_info")}>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className={className("container_content_info_stat")}>
                <div className={className("stat_point")}>
                  <span className={className("stat")}>Name:</span>
                  {pokemon?.name}
                </div>
                <div className={className("stat_point")}>
                  <span className={className("stat")}>Abilities:</span>
                  <div className={className("stat_point_row")}>
                    {pokemon?.abilities.map((item: IAbility, index: number) => (
                      <div key={index}>{item.ability.name}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className={className("stat")}>Height:</span>
                  {pokemon?.height}
                  {"  "}feet
                </div>
                <div>
                  <span className={className("stat")}>Weight:</span>
                  {pokemon?.weight}
                  {"  "}lbs
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
