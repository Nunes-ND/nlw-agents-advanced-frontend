import { useRoomQuestions } from '@/http/use-room-questions';
import type { RoomParams } from '@/pages/room';
import { QuestionItem } from './question-item';
import { Card, CardContent, CardTitle } from './ui/card';

export function QuestionList({ roomId }: RoomParams) {
  const { data, isLoading } = useRoomQuestions(roomId);

  return (
    <article className="space-y-4">
      <h2 className="font-semibold text-2xl text-foreground">
        Questions & Answers
      </h2>

      {isLoading && <p>Loading questions...</p>}

      {!data?.length && (
        <Card>
          <CardContent>
            <CardTitle className="text-muted-foreground">No questions yet.</CardTitle>
          </CardContent>
        </Card>
      )}

      {data?.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </article>
  );
}
