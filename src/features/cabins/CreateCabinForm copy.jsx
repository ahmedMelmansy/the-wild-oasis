import {useForm} from  'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';


function CreateCabinForm({cabinToEdit}) {
  const {register , handleSubmit ,reset , getValues ,formState}=useForm()
  const{errors} = formState
  const queryClient = useQueryClient()

  const {isLoading:isCreating,mutate}= useMutation({
    mutationFn:createCabin,
    onSuccess:()=>{
      toast.success("cabin is created success");
      queryClient.invalidateQueries({queryKey:["cabins"]});
      reset()
    } ,
    onError: (err) => {toast.error(err.message)}
  })  

  function onSubmit(data) {
  console.log("RAW:", data.image);
  console.log("FILE:", data.image?.[0]);
  console.log("IS FILE:", data.image?.[0] instanceof File);

  mutate({
    ...data,
    image: data.image[0],
  });
}
  function onError(errors){
  }

  return (  
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", 
        {required:"this field is required"})}  
        disabled={isCreating}
        />
      
      </FormRow>

     <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "this field is required"
          })}
          max={15}
          min={1}
          disabled={isCreating}
        
        />
        </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice",
        {required:"this field is required"}
        )}
        disabled={isCreating}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message} >
        
        <Input type="number" id="discount" defaultValue={0} {...register("discount",
        {required:"this field is required",
          validate: (value) =>
            Number(value) <= Number(getValues().regularPrice) ||
            "Discount must be less than regular price"}
           )} 
            disabled={isCreating}           
           />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message} >
        <Textarea 
        id="description" defaultValue="" {...register("description",
        {required:"this field is required"})}
        disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Cabin photo" >
        <FileInput id="image" accept="image/*" type="file"  {...register("image",
        {required:"this field is required"})}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" size='medium' type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating} size='medium'  $variation ='danger' >add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
