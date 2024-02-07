import { formatDateToDisplay } from "@/utils"
import { RideDetailsStyled } from "../profil.styled"

const RideDetails = ({ ride }: { ride: { id: string, label: string, distance: number, date: string, transportation: { label: string }} }) => {
    return(
        <RideDetailsStyled>
            <h4>{ride.label}</h4>
            <p>{ride.transportation.label}</p>
            <p>{formatDateToDisplay(ride.date)}</p>
            <p>distance parcourue: {ride.distance} km</p>
            <p>dépense carbone: ??? CO2/kg</p>
        </RideDetailsStyled>
    )
}

export default RideDetails