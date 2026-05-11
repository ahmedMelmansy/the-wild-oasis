import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

export default function CabinTableOperation() {
  return (
    <TableOperations>
        <Filter filterField={"discount"} 
        options=
        {[{value:"all",label:"all"},
        {value:"With-discount",label:"with discount"},
        {value:"No-discount",label:"no discount"}]}/>

        <SortBy
        options={
          [
            {
              value:"name-asc",
              label:"sort by name (A-Z)"
            },
            {
              value:"name-desc",
              label:"sort by name (Z-A)"
            },
            {
              value:"regularPrice-asc",
              label:"sort by price (low first)"
            },
            {
              value:"regularPrice-desc",
              label:"sort by price (high first)"
            },
            {
              value:"maxCapacity-asc",
              label:"sort by maxCapacity (low first)"
            },
            {
              value:"maxCapacity-desc",
              label:"sort by maxCapacity (high first)"
            },
          ]
        }
        />
    </TableOperations>
  )
}
