import { useNavigate } from "react-router-dom"
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner"
import styled from "styled-components"
import { useEffect } from "react"


const FullPage= styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isAuthenticated, isLoading: isLoadingUser } = useUser();

useEffect(() => {
  if (!isAuthenticated && !isLoadingUser) {
    navigate("/login");
  }
}, [isAuthenticated, isLoadingUser, navigate]);

  if (isLoadingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;

}