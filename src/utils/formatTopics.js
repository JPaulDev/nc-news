import capitaliseString from './capitaliseString';

export default function formatTopics(topics) {
  return topics.map((topic) => {
    const { slug, description } = topic;
    const capitalisedTopic = capitaliseString(slug);

    return {
      topic: capitalisedTopic,
      slug: `/articles/${slug}`,
      description,
    };
  });
}
