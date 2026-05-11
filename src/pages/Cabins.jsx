import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperation from "../features/cabins/CabinTableOperation";

export default function Cabins() {
  
  return (
<>
    <Row type="horizontal">
      <Heading > all cabins</Heading>
      <CabinTableOperation/>
    </Row>
      <Row>
      <CabinTable/>
    </Row>
     <AddCabin/>

  </>
  )
}

 
    
