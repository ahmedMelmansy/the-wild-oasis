import { useDeleteCabin } from "./useDeleteCabin";
import{formatCurrency} from '../../utils/helpers'
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import CreateCabinForm from "./CreateCabinForm";
import { IoDuplicate } from "react-icons/io5";
import { Img,Cabin,Price,Discount,Btns } from './useCabins';
import { useCreateCabin } from './useCreateCabin';
import Modal from "../../ui/Modal";
import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

export default function CabinRow({cabin}) {
  const {isDeleting,deleteCabin} = useDeleteCabin()

  const {id:cabinId,name,maxCapacity,
    regularPrice,discount,description,image}=cabin
  
  const{createCabin,isCreating}=useCreateCabin() 
  function handleDuplicate(){
    createCabin({
      name :` copy of ${name}`,
      maxCapacity,regularPrice,discount,image,description
    })
  }
  return (

    <Table.Row role='row'>
   
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div> {maxCapacity} guests </div>
      <Price>{formatCurrency(regularPrice)}</Price> 
      {discount?<Discount>{formatCurrency(discount)}</Discount>:<span>&mdash;</span>} 
        <div>

          <Modal>
       <Menus.Menu >
          <Menus.Toggle id={cabinId}/>
          <Menus.List id={cabinId}>
            <Menus.Button icon={ <IoDuplicate />} onClick={handleDuplicate}>
              duplicate
            </Menus.Button>
               <Modal.Open opens="delete" >
          <Menus.Button icon={  <MdDelete />}>
            delete 
            </Menus.Button>
          </Modal.Open>
            <Modal.Open opens="edit">
           <Menus.Button icon={<CiEdit />}>edit</Menus.Button>
          </Modal.Open>
          
          </Menus.List>
        
          <Modal.Window name="edit">

            <CreateCabinForm  cabinToEdit={cabin}/>
          </Modal.Window>
          
     
          <Modal.Window name="delete">
            <ConfirmDelete  resourceName="cabin" disabled={isDeleting} onConfirm={() => deleteCabin(cabinId)}/>
          </Modal.Window>
        </Menus.Menu>
          </Modal> 

   
       </div>
    </Table.Row>
  

)
}
