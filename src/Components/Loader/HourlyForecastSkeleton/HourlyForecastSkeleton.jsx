import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HourlyForecastSkeleton = () =>{
    return(
        <>
            <Skeleton width={546} height={245} />
        </>
    )
}
export default HourlyForecastSkeleton;