import { create } from 'zustand'

interface AppState {
  activeModule: string | null
  setActiveModule: (id: string | null) => void
  scrollPhase: number
  setScrollPhase: (phase: number) => void
  calculatorIntensity: number
  setCalculatorIntensity: (val: number) => void
  isMaxIntensity: boolean
  setMaxIntensity: (val: boolean) => void
  blockNumber: number
  setBlockNumber: (val: number) => void
  timeLeft: number
  setTimeLeft: (val: number) => void
}

export const useStore = create<AppState>((set) => ({
  activeModule: null,
  setActiveModule: (id) => set({ activeModule: id }),
  scrollPhase: 0,
  setScrollPhase: (phase) => set({ scrollPhase: phase }),
  calculatorIntensity: 0,
  setCalculatorIntensity: (val) => set({ calculatorIntensity: val }),
  isMaxIntensity: false,
  setMaxIntensity: (val) => set({ isMaxIntensity: val }),
  blockNumber: 89427,
  setBlockNumber: (val) => set({ blockNumber: val }),
  timeLeft: 60,
  setTimeLeft: (val) => set({ timeLeft: val }),
}))
