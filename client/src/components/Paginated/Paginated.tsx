import style from "./Paginated.module.css";
interface Props {
  elementsPerPage: any;
  allLength: number;
  paginated: any;
}

const Paginated = ({ elementsPerPage, allLength, paginated }: Props) => {
  const numbersPerPage = [];
  for (let i = 0; i < Math.ceil(allLength / elementsPerPage); i++) {
    numbersPerPage.push(i + 1);
  }

  return (
    <div className={style.paginatedContainer}>
      {numbersPerPage?.map((number: number) => {
        return (
          <button key={number} onClick={() => paginated(number)}>
            {number}
          </button>
        );
      })}
    </div>
  );
};

export default Paginated;
