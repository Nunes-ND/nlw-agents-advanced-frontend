import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { useCreateRoom } from '@/http/use-create-room';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const createRoomSchema = z.object({
  name: z.string().min(3, { message: 'Include at least 3 characters' }),
  description: z.string(),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
  const { mutateAsync: createRoom } = useCreateRoom();

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  async function handleCreateRoom({
    name: roomName,
    description: roomDescription,
  }: CreateRoomFormData) {
    await createRoom({ name: roomName, description: roomDescription });
    createRoomForm.reset();
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-zinc-200">Create Room</CardTitle>
        <CardDescription className="text-balance">
          Create a room to start asking questions and get AI-powered answers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel
                      className="text-muted-foreground"
                      htmlFor="room-name"
                    >
                      Room name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-md border border-muted px-2 py-1 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
                        id="room-name"
                        placeholder="Enter the name of the room..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel
                      className="text-muted-foreground"
                      htmlFor="room-description"
                    >
                      Room description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[80px] resize-none rounded-md border border-mutated px-2 py-1 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
                        id="room-description"
                        placeholder="Enter the room description..."
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button
              className="mt-2 w-full bg-zinc-300 text-black uppercase hover:bg-zinc-100"
              size="sm"
              type="submit"
            >
              Create Room
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
