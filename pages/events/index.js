import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import Pagination from '@/components/Pagination'
import { API_URL, PER_PAGE } from '@/config/index'

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events To Show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  )
}

// getStaticProps iig pagination hiihiin tuld getServerSideProps bolgoloo
// events?page=2      2-r pagination iig harah
export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  // (+) ni parseInt ium. Uchir ni deer bga page ni string helbertei
  // (+page-1) ni "current page"
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  // Fetch Events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  )
  const events = await eventRes.json()

  return {
    props: { events, page: +page, total },
    // revalidate: 1,    // getServerSideProps -d hereggui
    // revalidate at every 1 sec data has changed
  }
}
