import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import styled from "styled-components";

export function useCabins(){
      const {data:cabins, isLoading , error} = useQuery({
        queryKey:['cabins'],
        queryFn:getCabins
      })
      return{isLoading,error,cabins}
}

 export const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  width: 100%;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;
export const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

export const Img = styled.img`
  display: block;
  width: 7rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

export const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

export const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
  font-size: large ;
`;

export const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
export const Btns = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  & button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--color-grey-600);
    background-color: var(--color-grey-100);
  }

  /* Hover عام */
  & span:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }

  /* Duplicate */
  & span:nth-child(1):hover {
    background-color: var(--color-indigo-100);
    color: var(--color-indigo-700);
  }

  /* Edit */
  & span:nth-child(2):hover {
    background-color: var(--color-brand-100);
    color: var(--color-brand-700);
  }

  /* Delete */
  & span:nth-child(3):hover {
    background-color: var(--color-red-100);
    color: var(--color-red-700);
  }

  /* Disabled */
  & span:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;