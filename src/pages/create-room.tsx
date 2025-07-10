import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import type { RoomProps } from '@/types/room';

type GetRoomsResponse = RoomProps[];

export const CreateRoom = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`);
      const result: GetRoomsResponse = await response.json();
      return result;
    },
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}

      <ul>
        {data?.map((room) => (
          <li key={room.id}>
            <Link to={`/room/${room.id}`}>{room.name}</Link>
          </li>
        ))}
      </ul>

      <h1>Create Room</h1>
    </div>
  );
};
