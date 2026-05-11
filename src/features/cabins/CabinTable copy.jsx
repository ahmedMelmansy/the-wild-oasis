import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner'
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import { Table,TableHeader } from './useCabins';

export default function CabinTable() {
  const {cabins, isLoading} = useCabins()
  
  if (isLoading) return <Spinner/>
  if(!cabins.length) return <Empty resource={"cabins"}/>
  return (
    <Table role ='table'>
      <TableHeader role ='row'>
        <div>image</div>
        <div>cabin</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div></div>
      </TableHeader>
      {
        cabins.map((cabin) => (
          <CabinRow cabin={cabin} key={cabin.id}/>
        ))
      }
    </Table>
  )
}
