import React, { useEffect } from 'react'
import createComponent from '@/tools/components/createComponent';
import { useDispatch } from 'react-redux'
import { actions } from '@/redux/slices'

export default createComponent(({ children }) => {
    const dispatch = useDispatch()

    const onUpgradeTick = () => dispatch(actions.evoMap.upgradeTick())
    const onReset = () => dispatch(actions.evoMap.reset())
    const onAddLivingBioMass = () => dispatch(actions.evoMap.addLivingBioMass())
    const onSwapWalls = () => dispatch(actions.evoMap.swapWalls())

    const intervalRef = React.useRef(null)

    const onKey = (e) => {
        if (e.ctrlKey || e.altKey || e.metaKey) {
            // Ignore key events with control, alt, or meta keys pressed
            return false;
        }
        switch (e.code) {
            case 'NumpadAdd':
            case 'KeyN':
                {
                    onUpgradeTick();
                    e.preventDefault()
                    e.stopPropagation()
                    return true
                }
            case 'NumpadMultiply':
            case 'KeyR':
                {
                    onReset();
                    e.preventDefault()
                    e.stopPropagation()
                    return true
                }
            case 'NumpadDivide':
            case 'KeyM':
                {
                    onAddLivingBioMass()
                    e.preventDefault()
                    e.stopPropagation()
                    return true
                }
            case 'KeyZ':
                {
                    onSwapWalls()
                    e.preventDefault()
                    e.stopPropagation()
                    return true
                }
            case 'KeyI':
                {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current)
                        intervalRef.current = null
                    } else {
                        const id = setInterval(onUpgradeTick, 200)
                        intervalRef.current = id
                    }
                    e.preventDefault()
                    e.stopPropagation()
                    return true
                }
            case 'KeyU':
                {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current)
                        intervalRef.current = null
                    }
                    e.preventDefault()
                    e.stopPropagation()
                    return true
                }
            default:
                return false
        }
    }

    useEffect(() => {

        document.addEventListener('keydown', onKey)

        return () => {
            document.removeEventListener('keydown', onKey)
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
})
