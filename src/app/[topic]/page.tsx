
import { TweetCard } from '@/components/TweetCard';
import { createClient } from '@/lib/supabase/client';

type Params = Promise<{ topic: string }>

const TopicPage = async (props: {
  params: Params
}) => {
  const params = await props.params
  const supabase = createClient();
  const { data } = await supabase
    .from('tweets')
    .select('*')
    .eq('keyword', params.topic)
    .limit(10);

  if (!data) {
    return <p className="text-center">No data available for this topic.</p>;
  }

  return (
    <div className="flex flex-col space-y-6">
      {data?.map(item => (
        <TweetCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default TopicPage;