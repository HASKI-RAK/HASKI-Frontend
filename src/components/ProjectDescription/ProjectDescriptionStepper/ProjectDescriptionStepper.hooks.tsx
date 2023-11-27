import {useState, RefObject, useCallback, useMemo} from 'react'

/**
 * @props defaultBodyState - The default value for the body state.
 * @props defaultHeaderState - The default value for the header state.
 * @props defaultAvatarState - The default value for the avatar (picture) state.
 * @props defaultAvatarNameState - The default value for the avatar name state.
 * @props defaultAvatarDescriptionState - The default value for the avatar description state.
 * @category Hooks
 * @interface
 */
export type useProjectDescriptionStepperHookParams = {
    defaultBodyState?: string[]
    defaultHeaderState?: string
    defaultAvatarState?: boolean
    defaultAvatarNameState?: string
    defaultAvatarDescriptionState?: string
}

/**
 * @props bodyState - The state that is used to animate the body texts.
 * @props avatarState - The state that is used to animate the avatar picture.
 * @props avatarNameState - The state that is used to animate the avatar name texts.
 * @props avatarDescriptionState - The state that is used to animate the avatar description texts.
 * @props headerState - The state that is used to animate the header text.
 * @props setBodyState - The function that sets the body state.
 * @props setAvatarState - The function that sets the avatar state.
 * @props setAvatarNameState - The function that sets the avatar name state.
 * @props setAvatarDescriptionState - The function that sets the avatar description state.
 * @props setHeaderState - The function that sets the header state.
 * @props animateBody - The function that animates the body texts.
 * @props animateAvatar - The function that animates the avatar picture.
 * @props animateAvatarName - The function that animates the avatar name texts.
 * @props animateAvatarDescription - The function that animates the avatar description texts.
 * @props animateHeader - The function that animates the header text.
 * @props fadeInEffect - The function that realizes the fade in effect for the body.
 * @props fadeInEffectAvatar - The function that realizes the fade in effect for the avatar picture.
 * @props typewriterEffect - The function that realizes the typewriter effect for the header.
 * @props typewriterEffectAN - The function that realizes the typewriter effect for the avatar name.
 * @props typewriterEffectAD - The function that realizes the typewriter effect for the avatar description.
 * @category Hooks
 * @interface
 */
export type ProjectDescriptionStepperHookReturn = {
    readonly bodyState: string[]
    readonly avatarState: boolean
    readonly avatarNameState: string
    readonly avatarDescriptionState: string
    readonly headerState: string
    readonly setBodyState: (body: string[]) => void
    readonly setAvatarState: (avatar: boolean) => void
    readonly setAvatarNameState: (avatarName: string) => void
    readonly setAvatarDescriptionState: (avatarDescription: string) => void
    readonly setHeaderState: (header: string) => void
    readonly animateBody: (ref: RefObject<HTMLDivElement>, body: string[]) => void
    readonly animateAvatar: (ref: RefObject<HTMLDivElement>, avatar: boolean) => void
    readonly animateAvatarName: (ref: RefObject<HTMLDivElement>, avatarName: string) => void
    readonly animateAvatarDescription: (ref: RefObject<HTMLDivElement>, avatarDescription: string) => void
    readonly animateHeader: (ref: RefObject<HTMLDivElement>, header: string) => void
    readonly fadeInEffect: (body: string[]) => () => void
    readonly fadeInEffectAvatar: (avatar: boolean) => () => void
    readonly typewriterEffect: (header: string) => () => void
    readonly typewriterEffectAN: (avatarName: string) => () => void
    readonly typewriterEffectAD: (avatarDescription: string) => () => void
}

/**
 * useProjectDescriptionStepper hook.
 *
 * @param props - The default values for the stepper.
 *
 * @remarks
 * Hook for the ProjectDescriptionStepper logic.
 * Handles states and provides functions to animate the body and header texts and avatar elements if present.
 *
 * @returns - States and logic to animate the body and header texts and avatar elements if present.
 *
 * @category Hooks
 */
export const useProjectDescriptionStepper = (
    params?: useProjectDescriptionStepperHookParams
): ProjectDescriptionStepperHookReturn => {
    // Default values
    const {
        defaultHeaderState = '',
        defaultBodyState = [],
        defaultAvatarState = false,
        defaultAvatarNameState = '',
        defaultAvatarDescriptionState = ''
    } = params ?? {}

    // State data
    const [bodyState, setBodyState] = useState(defaultBodyState)
    const [avatarState, setAvatarState] = useState(defaultAvatarState)
    const [avatarNameState, setAvatarNameState] = useState(defaultAvatarNameState)
    const [avatarDescriptionState, setAvatarDescriptionState] = useState(defaultAvatarDescriptionState)
    const [headerState, setHeaderState] = useState(defaultHeaderState)

    // Logic
    // Animates body text by setting the bodyState after a short timeout.
    const fadeInEffect = useCallback(
        (body: string[]) => {
            const bodyTimeout = setTimeout(() => {
                setBodyState(body)
            }, 1000)
            return () => clearTimeout(bodyTimeout)
        },
        [bodyState, setBodyState]
    )

    const fadeInEffectAvatar = useCallback(
        (avatar: boolean) => {
            const avatarTimeout = setTimeout(() => {
                setAvatarState(avatar)
            }, 750)
            return () => clearTimeout(avatarTimeout)
        },
        [bodyState, setBodyState]
    )

    // Animates header text by writing one character at a time into the headerState with a short timeout.
    const typewriterEffect = useCallback(
        (header: string) => {
            const headerTimeout = setTimeout(() => {
                setHeaderState(header.slice(0, headerState.length + 1))
            }, 50)
            return () => clearTimeout(headerTimeout)
        },
        [headerState, setHeaderState]
    )
    // avatar name/description
    const typewriterEffectAN = useCallback(
        (avatarName: string) => {
            const avatarNameTimeout = setTimeout(() => {
                setAvatarNameState(avatarName.slice(0, avatarNameState.length + 1))
            }, 50)
            return () => clearTimeout(avatarNameTimeout)
        },
        [avatarNameState, setAvatarNameState]
    )
    const typewriterEffectAD = useCallback(
        (avatarDescription: string) => {
            const avatarDescriptionTimeout = setTimeout(() => {
                setAvatarDescriptionState(avatarDescription.slice(0, avatarDescriptionState.length + 1))
            }, 50)
            return () => clearTimeout(avatarDescriptionTimeout)
        },
        [avatarDescriptionState, setAvatarDescriptionState]
    )

    // Checks if top of component is in the viewport and animates body texts if states are not equal to param.
    const isElementInViewport = (ref: RefObject<HTMLDivElement>): boolean => {
        const topPosition = ref.current?.getBoundingClientRect().top;
        const viewportBottom = window.innerHeight;

        return topPosition !== null && typeof topPosition === 'number' && topPosition <= viewportBottom;
    };

    const animateBody = useCallback(
        (ref: RefObject<HTMLDivElement>, body: string[]) => {
            if (isElementInViewport(ref)) {
                if (body !== bodyState) {
                    fadeInEffect(body)
                }
            }
        },
        [isElementInViewport, bodyState, fadeInEffect]
    )
    const animateAvatar = useCallback(
        (ref: RefObject<HTMLDivElement>, avatar: boolean) => {
            if (isElementInViewport(ref)) {
                if (avatar !== avatarState) {
                    fadeInEffectAvatar(avatar)
                }
            }
        },
        [isElementInViewport, avatarState, fadeInEffectAvatar]
    )
    const animateAvatarName = useCallback(
        (ref: RefObject<HTMLDivElement>, avatarName: string) => {
            if (isElementInViewport(ref)) {
                if (avatarName !== avatarNameState) {
                    typewriterEffectAN(avatarName)
                }
            }
        },
        [isElementInViewport, avatarNameState, typewriterEffectAN]
    )
    const animateAvatarDescription = useCallback(
        (ref: RefObject<HTMLDivElement>, avatarDescription: string) => {
            if (isElementInViewport(ref)) {
                if (avatarDescription !== avatarDescriptionState) {
                    typewriterEffectAD(avatarDescription)
                }
            }
        },
        [isElementInViewport, avatarDescriptionState, typewriterEffectAD]
    )

    // Checks if top of component is in the viewport and animates header texts if states are not equal to param.
    const animateHeader = useCallback(
        (ref: RefObject<HTMLDivElement>, header: string) => {
            if (isElementInViewport(ref)) {
                if (header !== headerState) {
                    typewriterEffect(header)
                }
            }
        },
        [isElementInViewport, headerState, typewriterEffect]
    )

    return useMemo(
        () => ({
            bodyState,
            avatarState,
            avatarNameState,
            avatarDescriptionState,
            headerState,
            setBodyState,
            setAvatarState,
            setAvatarNameState,
            setAvatarDescriptionState,
            setHeaderState,
            animateBody,
            animateAvatar,
            animateAvatarName,
            animateAvatarDescription,
            animateHeader,
            fadeInEffect,
            fadeInEffectAvatar,
            typewriterEffect,
            typewriterEffectAN,
            typewriterEffectAD
        }),
        [bodyState, headerState, avatarState, avatarNameState, avatarDescriptionState,
            setBodyState, setAvatarState, setAvatarNameState, setAvatarDescriptionState, setHeaderState,
            animateBody, animateAvatar, animateAvatarName, animateAvatarDescription, animateHeader,
            fadeInEffect, fadeInEffectAvatar, typewriterEffect, typewriterEffectAN, typewriterEffectAD]
    )
}
