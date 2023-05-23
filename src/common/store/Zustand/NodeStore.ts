import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type Node = {
    id: number
    isOpen: boolean
}

interface StoreState {
    nodes: Node[]
    getNode: (id: number) => any
    setNode: (id: number, node: any) => void
}
export const useBoundNodeStore = create<StoreState>()(devtools((set, get) => ({
    nodes: [],
    getNode: (id) => get().nodes.find((node) => node.id === id),
    // add if not exists, update if exists
    setNode: (id, node) => set({ nodes: [...get().nodes.filter((n) => n.id !== id), node] })

}), { name: 'node-store' }))

