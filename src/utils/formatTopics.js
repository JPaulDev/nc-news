export default function formatTopics(topics) {
  return topics.map((topic) => {
    const { slug, description } = topic;
    const capitalisedTopic = slug[0].toUpperCase() + slug.slice(1);

    return {
      topic: capitalisedTopic,
      slug: `topic/${slug}`,
      description,
    };
  });
}
