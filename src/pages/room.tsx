import { useQuery } from '@tanstack/react-query';
import { Link, Navigate, useParams } from 'react-router-dom';
import type { RoomProps } from '@/types/room';

type RoomParams = {
  roomId: string;
};

export function Room() {
  const { roomId } = useParams<RoomParams>();
  const { data, isLoading } = useQuery({
    queryKey: ['get-room'],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/rooms/${roomId}`
      );
      const result: RoomProps = await response.json();
      return result;
    },
  });

  if (!roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <h1>{data?.name}</h1>
      <Link to="/">Go to home</Link>
    </div>
  );
}
