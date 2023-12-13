import {useStateContext} from "./context/ContextProvider";
import axiosClient from "./axios-client.js";
import {useEffect} from "react";

function Dashboard() {
  const {user, setUser} = useStateContext();

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  return (
    <div>
        <h1>Selamat Datang, {user.name}</h1>
    </div>
  )
}

export default Dashboard
