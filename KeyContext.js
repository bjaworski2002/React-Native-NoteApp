import React, {useContext, useState} from 'react'

const KeyContext = React.createContext()
const KeyUpdateContext = React.createContext()

export function useKeys(){
    return useContext(KeyContext)
}
export function useKeyUpdate(){
    return useContext(KeyUpdateContext)
}
export function KeyProvider({children}){
    const [keyList, setKeyList] = useState([])
    function updateKey(value){
        setKeyList(keyList.concat(value))
        console.log(value)
    }
    return (
        <KeyContext.Provider value={keyList}>
            <KeyUpdateContext.Provider value={(value) => updateKey(value)}>
                {children}
            </KeyUpdateContext.Provider>
        </KeyContext.Provider>
    )
}