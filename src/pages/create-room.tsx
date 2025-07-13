import { CreateRoomForm } from '@/components/create-room-form';
import { RoomList } from '@/components/room-list';

export const CreateRoom = () => {
  return (
    <main className="h-screen min-h-screen p-8">
      <section className="mx-auto grid h-full max-w-4xl grid-cols-2 items-start gap-8">
        <CreateRoomForm />
        <RoomList />
      </section>
    </main>
  );
};
