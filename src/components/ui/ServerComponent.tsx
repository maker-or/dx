import getMyImages from '../../server/quries'; // Assuming this is a server-side function
import ClientComponent from './ClientComponent'; // This will be your client-side code

export default async function ServerComponent() {
  const images = await getMyImages(); // Server-side fetch

  return <ClientComponent images={images ?? []} />; // Fallback to empty array if images is null
}
