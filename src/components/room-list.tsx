import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRooms } from '@/http/use-rooms';
import { timeAgo } from '@/utils/time';
import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

export function RoomList() {
  const { data, isLoading } = useRooms();

  return (
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
                      {room.questionsCount === 1
                        ? `${room.questionsCount} Question`
                        : `${room.questionsCount} Questions`}
                    </Badge>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
