import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";
function CreateCabinForm({ cabinToEdit = {},onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const  {isCreating , createCabin} = useCreateCabin()
  
  const { updateCabinMutate, isUpdating } = useUpdateCabin();
  
  const isWorking = isCreating || isUpdating;


function onSubmit(data) {
  const image =
    data.image?.[0] instanceof File ? data.image[0] : data.image;
    if (isEditSession) {
      updateCabinMutate({ data: { ...data, image }, id: editId },
        
        { onSuccess: ()=> { reset();  onClose?.()}});
      } 
      else {
      createCabin({ ...data, image },
        { onSuccess: ()=>{ reset(); onClose?.() } }
      );}
} 

  return (
    <Form onSubmit={handleSubmit(onSubmit)}
    type ={onClose ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
  
          disabled={isWorking}
          {...register("regularPrice", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount must be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>

       <Button type="button" size="large" variation="danger"
       onClick={() => onClose?.()}
       >
        Cancel
        </Button>

       
        <Button disabled={isWorking}  size='large'  variation ='danger' type="submit"  >
          {isEditSession ? "Edit " : "Add cabin"}
        </Button>
        </FormRow>
      
    </Form>
  );
}

export default CreateCabinForm;