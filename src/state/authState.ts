import { atom } from 'recoil' 

const authState = atom<{ userEmail: string }>({
    key: 'auth-state',
    default: {
        userEmail: '',
    },
}) 

export default authState