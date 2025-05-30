import { use } from "react";
import { useSelector } from "react-redux";

export const useSize = () => useSelector((state) => state.evoMap.size)
export const useItems = () => useSelector((state) => state.evoMap.items)
export const useMap = () => useSelector((state) => state.evoMap.map)
export const useGeneration = () => useSelector((state) => state.evoMap.generation)
export const useHighlighted = () => useSelector((state) => state.evoMap.highlighted)
export const useHistory = () => useSelector((state) => state.evoMap.history)
