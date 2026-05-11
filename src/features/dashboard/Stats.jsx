import Stat from './Stat'
import { FaBriefcase } from "react-icons/fa";
import { GiBanknote } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { FaChartBar } from "react-icons/fa";
import { formatCurrency } from '../../utils/helpers';

export default function Stats({bookings  ,confirmedStays, numDays ,cabinCount}) {

  // 1. num booking
  const numBooking = bookings.length
  // 2. totalSales
  const sales = bookings.reduce((acc,cur)=> acc + cur.totalPrice,0)
  // 3. total check-ins
  const checkins = confirmedStays.length
  // 4-occupancy
  // num checked-in nights / all available Nights
  const occupancy = confirmedStays.reduce((acc,cur)=> acc + cur.numNights,0) / (numDays*cabinCount)
  return (
    <>
    <Stat title='bookings' color='blue' value={numBooking} icon={<FaBriefcase/>}/>      
    <Stat title='sales' color='green' value={formatCurrency(sales)} icon={<GiBanknote />}/>      
    <Stat title='checkIns' color='indigo' value={checkins} icon={<SlCalender/>}/>      
    <Stat title='occupancy' color='yellow' value={Math.round(occupancy*100) + "%" } icon={<FaChartBar />}/>      

    </>
  )
}
