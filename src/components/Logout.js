import React from 'react'

export default function Logout() {
  localStorage.setItem("isLoggedIn", "false");
  localStorage.setItem("token",null);
  return (
    <div>Logout Successfull</div>
  )
}
