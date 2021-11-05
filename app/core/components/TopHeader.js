import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"


const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
          style={{float: "left"}}
        >
          Logout
        </button>
        <div style={{float: "right"}}>
          User id: <code>{currentUser.id}</code>
          <br />
          User name: <code>{currentUser.name}</code>
          <br />
          User role: <code>{currentUser.role}</code>
          <br />
          <Link href="/projects"><p style={{color: "#FFF", margin: "0", textAlign: "left", textDecoration: "underline", cursor: "pointer"}}>Pages</p></Link>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

export default function TopHeader(props) {
  return (
    <div className="top-header" style={{width: "100%", height: "100px", padding: "10px", background: "#577ae3", color: "#FFF"}}>
      {/* <h1 style={{ float: "left" }}>{props.name}</h1> */}
      <h1 style={{float: "left"}}>Testies</h1>
      <div style={{float: "right"}}>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
        {/* <ul style={{ float: "right" }}>
          {props.links.map((link, i) => (
            <li key={i}>
              <Link href={`/${link.name}`}>{link.name}</Link>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  )
}
