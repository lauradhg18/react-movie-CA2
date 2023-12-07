import { useEffect, useState } from "react";
import {getActorDetails} from '../api/tmdb-api'

const useActor = id => {
  const [actor, setActor] = useState(null);
  useEffect(() => {
    getActorDetails(id).then(actor => {
      setActor(actor);
    });
  }, [id]);
  return [actor, setActor];
};

export default useActor;