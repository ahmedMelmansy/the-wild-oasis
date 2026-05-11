import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import CheckBox from '../../ui/Checkbox'
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  margin-bottom: 2.5rem;
`;

function CheckinBooking() {
  const [confirmPaid,setConfirmPaid]=useState(false)
  const [addBreakfast,setAddBreakfast] = useState(false)
  const{settings, isLoading:isLoadingSettings} = useSettings()
  console.log(settings)
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const{checkin , isCheckingIn}=useCheckin()
  useEffect(()=>
  
    setConfirmPaid(booking?.isPaid ?? false )

  ,[booking?.isPaid])

  if (isLoading || !booking || isLoadingSettings) return <Spinner />;



  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking || {};

  const optionalBreakFast = settings.breakFastPrice * numGuests *numNights
  function handleCheckin() {
    if(!confirmPaid) return
    if(addBreakfast){
      checkin({bookingId,breakfast:{
        hasBreakfast :true,
        extrasPrice : optionalBreakFast,
        totalPrice : totalPrice + optionalBreakFast
      }}) 
    }
    else{
      checkin({bookingId, breakfast:{}}) 
     }
    
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast &&
        <Box>
      <CheckBox checked={addBreakfast}
        onChange={()=>{setAddBreakfast((add)=>!add);
          setConfirmPaid(false)
        }
        }
        id='breakfast'
      > 
      want to add breakfast for {formatCurrency(optionalBreakFast)} ?
      </CheckBox>
      </Box>}
      <Box>
        <CheckBox
        checked={confirmPaid}
        onChange={()=>setConfirmPaid((confirm)=>!confirm)}
        id="confirm"
        disabled={confirmPaid || isCheckingIn}
        > 
          i confirm that {guests.fullName} has paid the total amount  
            { !addBreakfast? formatCurrency(totalPrice) 
          :` ${formatCurrency(totalPrice + optionalBreakFast)} + 
          ${formatCurrency(optionalBreakFast)} +${formatCurrency(totalPrice)}`}
          </CheckBox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} variation="primary" size='medium'  disabled={!confirmPaid || isCheckingIn} >Check in booking #{bookingId}</Button>
        <Button variation="secondary" size='medium'   onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
