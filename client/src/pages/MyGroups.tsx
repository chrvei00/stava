import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Triangle } from "../styles/Form";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useGetGroupsQuery } from "../utils/api";
import CreateGroupPopUp from "../components/CreateGroupPopUp";

const StyledHeader = styled.h1`
  font-size: 3em;
  text-align: center;
  color: #f16a00;
`;

const OuterExercisesContainer = styled.div`
  margin: 0px;
  padding: 0.1em;
  max-height: 400px;
  min-height: 500px;
  width: 50%;
  background-color: #ffc08e;
  border: 3px solid black;
  overflow-y: auto;
`;

const InnerExercisesContainer = styled.div`
  min-width: 650px;
  margin: 0px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const DataContainer = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  padding: 2em;
`;

const GroupFunctionsContainer = styled.div`
  width: 40%;
  height: 500px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const GroupFunction = styled.div`
  width: 100%;
  background-color: #ffc08e;
  height: 100px;
  border: 2px solid black;
  display: flex;
`;

const GroupButton = styled.button`
  width: 90%;
  height: 60%;
  margin: auto;
  border-radius: 20px;
  background-color: #f16a00;
  border: 0px;
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const GroupName = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-left: 2rem;
  margin-top: 1rem;
`;

const MyGroups: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const { data, isLoading, isError } = useGetGroupsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <Navbar />
      <StyledHeader>Your groups</StyledHeader>
      <DataContainer>
        <OuterExercisesContainer>
          <InnerExercisesContainer>
            {data.length > 0 ? (
              data.map((element) => {
                return <GroupName>{element.groupName}</GroupName>;
              })
            ) : (
              <GroupName>You are not a member of any groups</GroupName>
            )}
          </InnerExercisesContainer>
        </OuterExercisesContainer>
        <GroupFunctionsContainer>
          <GroupFunction>
            <GroupButton
              disabled={isVisible ? true : false}
              onClick={() => setIsVisible(!isVisible)}
            >
              Create group
            </GroupButton>
          </GroupFunction>
          <GroupFunction>
            <GroupButton onClick={() => navigate("/joincommunity")}>
              Join community
            </GroupButton>
          </GroupFunction>
        </GroupFunctionsContainer>
        {isVisible ? <CreateGroupPopUp setIsVisible={setIsVisible} /> : null}
      </DataContainer>
      <Triangle
        style={{ height: "20px", position: "absolute", bottom: 0 }}
      ></Triangle>
    </div>
  );
};

export default MyGroups;