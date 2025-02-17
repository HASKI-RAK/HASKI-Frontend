import {  ComponentType } from "react"
import { withXAPI } from "../library/withXAPI" //TODO: LiBRARY IMPORT OR DEFAULT?
import { usePersistedStore } from '@store'

const useXAPIWrapper = <P extends object>(    
    componentName: string,
    filePath: string,
    WrappedComponent: ComponentType<P>) =>{

        const XAPIWrapperComponent = (props: P) => {
            const getXAPI = usePersistedStore((state) => state.getXAPI)
            const EnhancedComponent = withXAPI(WrappedComponent, componentName, filePath, getXAPI())
            return <EnhancedComponent {...props} />
        }

    return XAPIWrapperComponent
}

export default useXAPIWrapper