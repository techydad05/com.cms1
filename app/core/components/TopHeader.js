import { Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import Hamburger from "hamburger-react"


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
        >
          Logout
        </button>
        <div>
          <br />
          Name: <code>{currentUser.name}</code>
          <br />
          Role: <code>{currentUser.role}</code>
          <br />
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
  console.log("props", props)

  const [isOpen, setOpen] = useState(false);

  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };


  return (
    <div className="top-header" style={{width: "100%", padding: "10px", background: "#577ae3", color: "#FFF"}}>
      {/* <h1 style={{ float: "left" }}>{props.name}</h1> */}
      <h1 style={{float: "left"}}>CMS?</h1>
      <Hamburger toggled={isOpen} onToggle={() => isOpen ? setOpen(false) : setOpen() & handleToggle()} />
      <div id="menu-container" className={isActive ? "" : "slide"}>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
        <ul>
          <strong>Admin:</strong>
          <li><Link href="/sections"><p style={{color: "#FFF", margin: "0", textAlign: "left", textDecoration: "underline", cursor: "pointer"}}>Sections</p></Link></li>
          <li><Link href="/projects"><p style={{color: "#FFF", margin: "0", textAlign: "left", textDecoration: "underline", cursor: "pointer"}}>Projects</p></Link></li>
          <br />
          <strong>Pages:</strong>
          {props.links.map((link, i) => (
            <li key={i}>
              <Link href={`/${link.slug}`}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <style jsx global>{`
        .hide {
          display: none !important;
        }
        .hamburger-react {
          position: absolute !important;
          z-index: 1 !important;
          top: 10px;
          right: 10px;
        }
        #menu-container ul a {
          color: #FFF;
        }
        #menu-container ul {
           list-style: none;
           padding: 0;
        }
        #menu-container {
            height: 100%;
            background: #577ae3;
            border: 1px solid black;
            padding: 80px 10px;
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            right: 0;
            animation: slideout .5s forwards;
        }
        #menu-container.slide {
            animation: slidein .5s forwards;
        }
        @keyframes slidein {
          from {
            transform: translateX(0%);
          }

          to {
            transform: translateX(100%);
          }
        }
        @keyframes slideout {
          from {
            transform: translateX(100%);
          }

          to {
            transform: translateX(0%);
          }
        }

      `}</style>
    </div>
  )
}
