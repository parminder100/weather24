import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DisplayWeatherSkeleton = () =>{
    return(
        <>
            <Skeleton width={550} height={210}/>
        </>
    )
}
export default DisplayWeatherSkeleton;