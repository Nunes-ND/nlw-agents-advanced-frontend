import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { RoomProps } from '@/types/room';
import { timeAgo } from '@/utils/time';

type GetRoomsResponse = RoomProps[];

export const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`);
      const result: GetRoomsResponse = await response.json();
      return result;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (roomData: { name: string; description: string }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });
      const result: RoomProps = await response.json();
      return result;
    },
    onSuccess: () => {
      const queryClient = new QueryClient();
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] });
    },
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await mutateAsync({ name: roomName, description: roomDescription });
    setRoomName('');
    setRoomDescription('');
  }

  return (
    <main className="h-screen min-h-screen p-8">
      <section className="mx-auto grid h-full max-w-4xl grid-cols-2 items-start gap-8">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-zinc-200">Create Room</CardTitle>
            <CardDescription className="text-balance">
              Create a room to start asking questions and get AI-powered
              answers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form method="post" onSubmit={handleSubmit}>
              <fieldset className="mb-2">
                <label
                  className="mb-1 block text-muted-foreground text-xs"
                  htmlFor="room-name"
                >
                  Room name
                </label>
                <input
                  className="my-1 block w-full rounded-md border border-muted px-2 py-1 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
                  id="room-name"
                  name="room-name"
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Room name"
                  type="text"
                  value={roomName}
                />
              </fieldset>
              <fieldset>
                <label
                  className="mb-1 block text-muted-foreground text-xs"
                  htmlFor="room-description"
                >
                  Room description
                </label>
                <textarea
                  className="my-1 block w-full resize-none rounded-md border border-mutated px-2 py-1 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
                  id="room-description"
                  name="room-description"
                  onChange={(e) => setRoomDescription(e.target.value)}
                  placeholder="Room description"
                  rows={5}
                  value={roomDescription}
                />
              </fieldset>

              <Button
                className="mt-3 w-full bg-zinc-300 text-black uppercase hover:bg-zinc-100"
                size="sm"
                type="submit"
              >
                Create Room
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="relative h-full overflow-y-hidden">
          <CardHeader className="border-b">
            <CardTitle className="text-zinc-200">Recent Rooms</CardTitle>
            <CardDescription className="text-balance">
              Explore the latest public rooms and join the conversation to get
              AI-powered answers.
            </CardDescription>
          </CardHeader>
          <CardContent className="group/scroll scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-hidden overflow-y-scroll">
            <Badge className="-translate-x-1/2 absolute bottom-4 left-1/2 animate-[bounce_1.5s_ease-in-out_infinite] rounded-full bg-accent px-1.5 py-1.5 group-hover/scroll:hidden [&>svg]:size-5">
              <ArrowDown />
            </Badge>
            {isLoading && <p>Loading rooms...</p>}
            <ul className="flex flex-col gap-2">
              {data?.map((room) => (
                <li
                  className="group/room flex flex-col rounded-lg border py-3 hover:bg-accent"
                  key={room.id}
                >
                  <Link
                    className="flex flex-col gap-1 px-3"
                    to={`/room/${room.id}`}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className=" line-clamp-1 text-sm text-zinc-300">
                        {room.name}
                      </h3>
                      <Badge
                        className="flex items-center gap-1 text-muted-foreground text-xs group-hover/room:bg-zinc-900/50"
                        variant="secondary"
                      >
                        Join
                        <ArrowRight />
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <Badge
                          className="text-muted-foreground group-hover/room:bg-zinc-900/50"
                          variant="secondary"
                        >
                          {timeAgo(room.createdAt)}
                        </Badge>
                      </div>
                      <div>
                        <Badge
                          className="text-muted-foreground group-hover/room:bg-zinc-900/50"
                          variant="secondary"
                        >
                          {room.questionCount === 1
                            ? `${room.questionCount} Question`
                            : `${room.questionCount} Questions`}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};
