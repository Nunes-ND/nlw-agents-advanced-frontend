import { ArrowLeft, Radio } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { QuestionForm } from '@/components/question-form';
import { QuestionList } from '@/components/question-list';
import { Button } from '@/components/ui/button';

export type RoomParams = {
  roomId: string;
};

export function Room() {
  const { roomId } = useParams<RoomParams>();

  if (!roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <main className="min-h-screen p-8">
      <section className="mx-auto max-w-4xl items-start">
        <article className="mb-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Button>
          </Link>
          <Link to={`/rooms/${roomId}/audio`}>
            <Button className="flex items-center gap-2" variant="secondary">
              <Radio className="size-4" />
              Record Audio
            </Button>
          </Link>
        </article>

        <article className="mb-4">
          <h1 className="mb-1 font-bold text-2xl text-foreground">
            Question Room
          </h1>
          <p className="mb-4 text-muted-foreground">
            Ask questions and get AI-powered answers
          </p>
          <QuestionForm roomId={roomId} />
        </article>

        <QuestionList roomId={roomId} />
      </section>
    </main>
  );
}
