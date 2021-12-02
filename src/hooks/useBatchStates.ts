import { useState } from "react"
import Manager from "../core/Manager";

export default (manager: Manager) => {
   const [states, setStates] = useState([
      manager.areAllTrackersEnabled(),
      manager.areAllTrackersDisabled()
   ]);

   manager.on('update', () => {
      setStates([
         manager.areAllTrackersEnabled(),
         manager.areAllTrackersDisabled()
      ])
   })

   return states;
}