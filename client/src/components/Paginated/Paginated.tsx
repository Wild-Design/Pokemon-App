import { useAppDispatch } from "../../app/hooks";
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
    <ul>
      {numbersPerPage?.map((number) => {
        return (
          <li key={number}>
            <button onClick={() => paginated(number)}>{number}</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Paginated;
