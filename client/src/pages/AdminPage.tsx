import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { Triangle } from "../styles/Form";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useFetchUser,
  useGetGroupQuery,
  useUpdateGroupMutation,
} from "../utils/api";
import Loading from "../components/Loading";
import AdminViewPosts from "../components/adminViewPosts";
import AdminAddUsers from "../components/adminAddUsers";
import AdminRemoveUsers from "../components/adminRemoveUsers";

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
  overflow-y: scroll;
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

const AdminFunctionsContainer = styled.div`
  width: 40%;
  height: 500px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const AdminFunction = styled.div`
  width: 100%;
  background-color: #ffc08e;
  height: 100px;
  border: 2px solid black;
  display: flex;
`;

const AdminButton = styled.button`
  width: 90%;
  height: 60%;
  margin: auto;
  border-radius: 20px;
  background-color: #f16a00;
  border: 0px;
  color: white;
  font-size: 24px;
  font-weight: bold;

  &:disabled {
    background-color: #958686;
  }
`;

const GroupName = styled.label`
  font-size: 24px;
  font-weight: bold;
  margin-left: 2rem;
  margin-top: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

// There will have to be a way to get all users from a certain group, and display them here.
const AdminPage: React.FC = () => {
  const [selectedMembers, setSelectedMembers] = useState<
    { userName: string; userID: string }[]
  >([]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const groupid = searchParams.get("groupid");
  const [showPosts, setShowPosts] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showRemoveUser, setShowRemoveUser] = useState(false);

  const { data, isLoading, isError } = useGetGroupQuery(groupid || "");
  const { mutate } = useUpdateGroupMutation(groupid || "");

  const user = useFetchUser();

  const goBackToGroup = () => {
    // redirect to group page
    navigate(`/viewgroup?groupid=${groupid}`);
  };

  const handleCreateAdmin = (
    userList: { userName: string; userID: string }[]
  ) => {
    userList.forEach((user) => {
      if (!data?.owners.some((tempUser) => tempUser.userID === user.userID)) {
        data?.owners.push(user);
      }
    });
    mutate(data!);
    window.location.reload();
  };

  const handleRemoveMember = (
    userList: { userName: string; userID: string }[]
  ) => {
    userList.forEach((user) => {
      const index = data?.members.findIndex(
        (tempUser) => tempUser.userID === user.userID
      );
      if (index! > -1) {
        data?.members.splice(index!, 1);
      }
    });
    mutate(data!);
  };

  useEffect(() => {
    //reload page when data is updated
  }, [showPosts]);

  if (isError || user.isError) return <h1>Something went wrong</h1>;

  if (isLoading || user.isLoading) return <Loading />;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Navbar />
      <StyledHeader>Manage admins</StyledHeader>
      <DataContainer>
        <OuterExercisesContainer>
          <InnerExercisesContainer>
            {data.members.length > 0 ? (
              data.members
                .filter((member) => member.userName !== user.data.username)
                .map((member) => {
                  return (
                    <div>
                      <input
                        type={"checkbox"}
                        id={member.userID}
                        name={"userID"}
                        value={(member.userID, member.userName)}
                        style={{
                          margin: "1rem",
                          height: "20px",
                          width: "20px",
                          marginRight: "0rem",
                        }}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMembers([
                              ...selectedMembers,
                              {
                                userName: member.userName,
                                userID: member.userID,
                              },
                            ]);
                          } else {
                            setSelectedMembers(
                              selectedMembers.filter(
                                (user) => user.userID !== member.userID
                              )
                            );
                          }
                        }}
                      />
                      <GroupName htmlFor={member.userID}>
                        {member.userName}
                      </GroupName>
                    </div>
                  );
                })
            ) : (
              <h1>No members in this group</h1>
            )}
          </InnerExercisesContainer>
        </OuterExercisesContainer>
        <AdminFunctionsContainer>
          <AdminFunction>
            <AdminButton
              disabled={!(selectedMembers.length > 0)}
              onClick={() => handleCreateAdmin(selectedMembers)}
            >
              Create admin
            </AdminButton>
          </AdminFunction>
          <AdminFunction>
            <AdminButton onClick={() => setShowPosts(!showPosts)}>
              View posts
            </AdminButton>
            {showPosts ? (
              <AdminViewPosts group={data} setShowPosts={setShowPosts} />
            ) : null}
          </AdminFunction>
          <AdminFunction>
            <AdminButton onClick={() => setShowUsers(!showUsers)}>
              Add user
            </AdminButton>
            {showUsers ? (
              <AdminAddUsers group={data} setShowUsers={setShowUsers} />
            ) : null}
          </AdminFunction>
          <AdminFunction>
            <AdminButton onClick={() => setShowRemoveUser(!showRemoveUser)}>
              Remove User
            </AdminButton>
            {showRemoveUser ? (
              <AdminRemoveUsers
                group={data}
                setShowRemoveUser={setShowRemoveUser}
              />
            ) : null}
          </AdminFunction>
        </AdminFunctionsContainer>
      </DataContainer>
    </div>
  );
};

export default AdminPage;
