import Navbar from './navbar';


type Session = {

  user: string
}

const getServerSession = () => {

  return {
    user: "yo"
  } as Session

}

export default function Nav() {
  const session = getServerSession();
  return <Navbar user={session?.user} />;
}
