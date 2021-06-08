import Layout from 'assets/components/Layout'
import { useSession } from 'next-auth/client'
import Loading from 'utils/Loading'

export default function Profile() {
  const [session, loading] = useSession()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    )
  } else if (!session) {
    return (
      <div>
        <Layout>Boop, no session</Layout>
      </div>
    )
  } else {
    return (
      <div>
        <Layout>Boop. session yes</Layout>
      </div>
    )
  }
}
