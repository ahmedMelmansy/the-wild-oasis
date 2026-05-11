import { useSearchParams } from 'react-router-dom';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table';
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);
//   width: 100%;
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

export default function CabinTable() {
  const {cabins, isLoading} = useCabins()

  const [searchParams]=useSearchParams()  
  
  let filterCabin;

  if (isLoading) return <Spinner/>
  // filter
  const filterValue = searchParams.get('discount') || "all"

  if(filterValue === 'all') filterCabin = cabins
  if(filterValue === "With-discount") filterCabin = cabins.filter((cabin)=> cabin.discount !== 0)
  if(filterValue === "No-discount") filterCabin = cabins.filter((cabin)=> cabin.discount === 0)
  
  // sorted  
  const sortValue= searchParams.get("sortBy") || "sort by name (A-Z)"
  const[field,direction]= sortValue.split("-") 
  const modifier = direction === 'asc'? 1 : -1
  const sortedCabins = filterCabin.sort((a,b)=>(a[field]-b[field])*modifier)

return (
    <Menus>
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header role ='row'>
        <div>image</div>
        <div>cabin</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div></div>
      </Table.Header>
      <Table.Body data={sortedCabins} render={(cabin) => (<CabinRow cabin={cabin} key={cabin.id}/>)}/>
    </Table>
    </Menus>
  )
}
