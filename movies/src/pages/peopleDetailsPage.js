import React from "react";
import ActorDetails from "../components/peopleDetails";
import { useParams } from 'react-router-dom';
import ActorPageTemplate from "../components/templateActorPage";
import { getPeopleDetails } from '../api/movies'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const ActorPage = () => {
  const { id } = useParams();
  const { data: actorData, error, isLoading, isError } = useQuery(
    ["actors", { id: id }], getPeopleDetails);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {actorData ? (
        <>
          <ActorPageTemplate actor={actorData}>
            <ActorDetails actor={actorData} />
          </ActorPageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default ActorPage;