import Button from "../../ui/Button";
import Modal from '../../ui/Modal'
import CreateCabinForm from "./CreateCabinForm";
export default function AddCabins(){
  return(
   <div>
    <Modal>
      <Modal.Open opens= 'cabin-form'>
      <Button size='large'  variation ='danger'>addNewCabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm/>
      </Modal.Window>
      </Modal> 
     </div>
  )
}


